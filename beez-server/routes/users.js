const express = require("express");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth")
const User = require("../models/User");
const Favorite = require("../models/Favorite");
const router = express.Router();

const userSchema = joi.object({
    firstName: joi.string().required("first name length must be at least 2 characters long").min(2),
    middleName: joi.string().min(0),
    lastName: joi.string().required("last name length must be at least 2 characters long").min(2),
    phone: joi.string().required("phone number length must be at least 9 characters long").min(9).max(14),
    email: joi.string().required("please enter a valid email").email(),
    password: joi.string().required("password must be at least 8 characters long").min(8),
    imageUrl: joi.string().min(0),
    imageAlt: joi.string().min(0),
    state: joi.string().min(0),
    country: joi.string().required("country name must be at least 2 characters long").min(2),
    city: joi.string().required("city name must be at least 2 characters long").min(2),
    street: joi.string().required("street name  must be at least 2 characters long").min(2),
    houseNumber: joi.number().required("enter a valid house number").min(0),
    zip: joi.string().min(0),
    role: joi.string()
});
const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8)
});

// Register
router.post("/", async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).send(error)

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered");

        user = new User(req.body);

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        await user.save();

        // Create user's favorites
        let favorites = new Favorite({ userId: user._id, cards: [] });

        await favorites.save();

        const token = jwt.sign({ _id: user._id, role: user.role, email: user.email }, process.env.jwtKey);

        res.status(201).send(token)
    } catch (error) {
        res.status(400).send(error);
    }
})

// Login
router.post("/login", async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Wrong email or password");

        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(400).send("Wrong email or password");

        const token = jwt.sign({ _id: user._id, role: user.role, email: user.email }, process.env.jwtKey);
        res.status(200).send(token);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all users
router.get("/", auth, async (req, res) => {
    try {
        if (!req.payload.role === "admin") return res.status(400).send("Access denied! User is not Admin");
        let users = await User.find()
        if (!users) return res.status(404).send("No users found");
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get specific user by Id
router.get("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.role === "admin" || !req.payload._id == req.params.id) return res.status(400).send("Access denied!");
        let user = await User.findById({ _id: req.params.id })
        if (!user) return res.status(404).send("No such user");
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Edit the users profile
router.put("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.role === "admin" || !req.payload._id == req.params.id) return res.status(400).send("Access denied! You cannot edit this profile.");

        const { error } = userSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Update user's role 
router.patch("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.role === "admin" || !req.payload._id == req.params.id) return res.status(400).send("Access denied! You cannot edit this profile.");

        let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete specific user
router.delete("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.role === "admin" || !req.payload._id == req.params.id) return res.status(400).send("Access denied! You cannot edit this profile.");
        const user = await User.findByIdAndDelete({ _id: req.params.id });

        if (!user) return res.status(404).send("There is no such registered user");

        await Favorite.deleteMany({ userId: req.params.id });

        res.status(200).send("User deleted successfully");

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
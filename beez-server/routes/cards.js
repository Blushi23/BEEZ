const express = require("express");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const router = express.Router();

const cardSchema = joi.object({
    title: joi.string().required().min(2),
    subtitle: joi.string().required().min(2),
    description: joi.string().required().min(2),
    phone: joi.string().required().min(9).max(14),
    email: joi.string().required().email(),
    web: joi.string().min(0),
    imageUrl: joi.string().min(0),
    imageAlt: joi.string().min(0),
    state: joi.string().min(0),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.number().required(),
    zip: joi.string().min(0),
    owner: joi.string().min(0)
})

// Create new card
// router.post("/", auth, async (req, res) => {
//     try {
//         if (!req.payload.role === "admin" || !req.payload.role === "business") return res.status(400).send("You are not allowed to add a business card.")

//         const { error } = cardSchema.validate(req.body);
//         if (error) return res.status(400).send(error);

//         let card = await Card.findOne({ title: req.body.title, email: req.body.email });
//         if (card) return res.status(400).send("Card already exists");

//         card = new Card(req.body);
//         await card.save();
//         res.status(200).send(card)

//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

// Get all cards
router.get("/", async (req, res) => {
    try {
        let cards = await Card.find()
        if (!cards) return chalk.red(res.status(404).send("No cards found"));
        res.status(200).send(cards)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get specific card
router.get("/:id", async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).send("There is no such card");
        res.status(200).send(card);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Edit cards by owner or by admin
router.put("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.role === "admin" || !req.payload._id == req.params.id) return res.status(400).send("You are not allowed to edit this card");

        const { error } = cardSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        let card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (!card) return res.status(400).send("Card already exists")
        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error)
    }

})

// Mark a card as favorite - לתקן
router.patch("/:id", auth, async (req, res) => {
    if (!req.payload.email == req.params.email) return res.status(400).send("Permition denied. Available only for registered users");
})


// Get all cards created by the specific user (owner) - לתקן
router.get("/my-cards/:owner", auth, async (req, res) => {
    try {
        if (!req.payload.owner == req.params.email) return res.status(400).send("Access denied")
        const cards = await Card.find({ owner: req.params.owner });
        if (!cards) return res.status(404).send("No cards found");
        res.status(200).send(cards)
    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete a card
router.delete("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.role === "admin" || !req.payload._id == req.params.id) return res.status(400).send("You are not allowed to delete this card");

        let card = await Card.findOneAndDelete({ _id: req.params.id })
        if (!card) return res.status(404).send("No such card");
        res.status(200).send("Card deleted successfully");
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;

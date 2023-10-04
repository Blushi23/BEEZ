const express = require("express");
const auth = require("../middlewares/auth");
const joi = require("joi");
const Favorite = require("../models/Favorite");

const router = express.Router()

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

// add card to favorites
router.post("/", auth, async (req, res) => {
    try {
        //joi validation
        // const { error } = cardSchema.validate(req.body)
        // if (error) return res.status(400).send(error);

        // find the user's favorites
        let favorites = await Favorite.findOne({ userId: req.payload._id })

        if (!favorites) return res.status(404).send("There are no favorite cards for this user")

        //check if the card already exists in favorites
        let cardinFavorites = favorites.cards.find((c) => c._id == req.body._id)
        if (cardinFavorites) {
            let indexToDelete = favorites.cards.findIndex((c) => c._id == req.body._id)
            favorites.cards.splice(indexToDelete, 1);
            favorites.markModified("favorites");
        } else {
            favorites.cards.push(req.body);
        }

        // add card to favorites
        await favorites.save();

        // return a response
        res.status(201).send("Card added successfully to your favorites!")

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/", auth, async (req, res) => {
    try {
        let favorites = await Favorite.findOne({ userId: req.payload._id });
        if (!favorites) return res.status(404).send("There are no favorite cards for this user");
        res.status(200).send(favorites.cards);
    } catch (error) {
        res.status(400).send(error);
    }
});
// router.get("/:id", auth, async (req, res) => {
//     try {
//         let favorites = await Favorite.findOne({ userId: req.params._id });
//         if (!favorites) return res.status(404).send("There are no favorite cards for this user");
//         res.status(200).send(favorites.cards);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

module.exports = router;

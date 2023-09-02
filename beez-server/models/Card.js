const mongoose = require("mongoose")
const cardSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 2
    },
    subtitle: {
        type: String,
        required: true,
        minlength: 2

    },
    description: {
        type: String,
        required: true,
        minlength: 2

    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 14

    },
    email: {
        type: String,
        required: true,
    },
    web: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    imageAlt: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: true,
        minlength: 2
    },
    city: {
        type: String,
        required: true,
        minlength: 2
    },
    street: {
        type: String,
        required: true,
        minlength: 2
    },
    houseNumber: {
        type: Number,
        required: true
    },
    zip: {
        type: String,
        required: false,
    },
    owner: {
        type: String,
        required: false
    }

})

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
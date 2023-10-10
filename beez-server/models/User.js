const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: false,
        minlength: 2
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false,
        minlength: 2
    },

    phone: {
        type: String,
        required: false,
        minlength: 9,
        maxlength: 14
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    imageUrl: {
        type: String,
        required: false
    },
    imageAlt: {
        type: String,
        required: false
    },

    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false,
        minlength: 2
    },
    city: {
        type: String,
        required: false,
        minlength: 2
    },
    street: {
        type: String,
        required: false,
        minlength: 2
    },
    houseNumber: {
        type: Number,
        required: false
    },
    zip: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }
})

const User = mongoose.model("users", userSchema);
module.exports = User;
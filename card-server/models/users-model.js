const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: {
            first: String,
            middle: String,
            last: String
        },
        phone: String,
        email: String,
        password: String,
        address: {
            state: String,
            country: String,
            city: String,
            street: String,
            zip: Number,
            houseNumber: Number
        },
        image: {
            url: String,
            alt: String
        },
        isBusiness: Boolean,
        isAdmin: Boolean
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", User);
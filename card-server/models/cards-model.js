const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Card = new Schema(
    {
        //_id: { type: String, index: true, unique: true},
        title: String,
        subtitle: String,
        description: String,
        phone: String,
        email: String,
        web: String,
        image: {
            url: String,
            alt: String
        },        
        address: {
            state: String,
            country: String,
            street: String,
            houseNumber: Number,
            city: String,
            zip: Number
        },
        bizNumber: Number,
        likes: Array,
        user_id: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("cards", Card);
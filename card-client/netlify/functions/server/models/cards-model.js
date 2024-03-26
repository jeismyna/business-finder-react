const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    state: { type: String, min: 2, max: 50, default: "" },
    country: { type: String, min: 2, max: 200, required: true },
    city: { type: String, min: 2, max: 200, required: true },
    street: { type: String, min: 2, max: 150, required: true },
    zip: {
        type: Number,
        default: 0,
        validate: {
            validator: function (v) {
                return v.toString().length <= 15
            },
            message: props => `${props.value} must be a safe number!`
        }
    },
    houseNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v.toString().length <= 15
            },
            message: props => `${props.value} must be a safe number!`
        }
    }
}, { _id: false })

const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|\/(?:[\w-]+\/)*[\w-]+\.(?:jpg|jpeg|png|gif|bmp|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|html|htm|js|css))/;

const imageSchema = new Schema({
    url: {
        type: String,
        default: "",
        validate: {
            validator: function (v) {
                if (v !== "")
                    return urlRegex.test(v);
            },
            message: props => `${props.value} is not a valid url!`
        }
    },
    alt: { type: String, min: 2, max: 50, default: "" }
}, { _id: false })


const Card = new Schema(
    {
        title: { type: String, min: 2, max: 50, required: true },
        subtitle: { type: String, min: 2, max: 100, required: true },
        description: { type: String, min: 2, max: 500, required: true },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        email: {
            type: String,
            max: 350,
            required: true,
            validate: {
                validator: function (v) {
                    return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        web: {
            type: String,
            default: "",
            validate: {
                validator: function (v) {
                    if (v !== "")
                        return urlRegex.test(v);
                },
                message: props => `${props.value} is not a valid url!`
            }
        },
        address: {
            type: addressSchema,
            required: true
        },
        image: {
            type: imageSchema,
            default: { url: "", alt: "" }
        },
        bizNumber: {
            type: Number,
            unique: true,
            required: true,
            validate: {
                validator: function (v) {
                    return v.toString().length <= 15
                },
                message: props => `${props.value} must be a safe number!`
            }
        },
        likes: { type: Array, default: [] },
        user_id: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("cards", Card);
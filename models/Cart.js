const mongoose = require("mongoose")
const Schema = mongoose.Schema

// cart Blueprint

const cartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    details: {
        type: Array
    },
    old_price: {
        type: Number
    },
    new_price: {
        type: Number
    },
    imgUrl: {
        type: String
    },
    type: {
        type: String
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Cart", cartSchema)
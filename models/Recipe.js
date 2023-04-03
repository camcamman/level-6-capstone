const mongoose = require("mongoose")
const Schema = mongoose.Schema

// recipe Blueprint

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    ingredients: {
        type: Array
    },
    instructions: {
        type: Array
    },
    imgUrl: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Recipe", recipeSchema)
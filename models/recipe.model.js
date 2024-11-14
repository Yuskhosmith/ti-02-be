const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Recipe title is required"],
        },
        ingredients: {
            type: [{ type: String, trim: true }],
            required: [true, "Recipe ingredients are required"],
            validate: [arrayLimit, "Ingredients cannot be empty"],
        },
        instructions: {
            type: [{ type: String, trim: true }],
            required: [true, "Recipe instructions are required"],
            validate: [arrayLimit, "Instructions cannot be empty"]
        },
        image: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

function arrayLimit(val) {
    return val.length > 0;
}

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
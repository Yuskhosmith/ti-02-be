const Joi = require('joi');

const recipeSchema = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": "Recipe title is required",
    }),
    ingredients: Joi.array().items(Joi.string()).min(1).required().messages({
        "array.min": "Recipe ingredients cannot be empty",
    }),
    instructions: Joi.array().items(Joi.string()).min(1).required().messages({
        "array.min": "Recipe instructions cannot be empty",
    }),
    image: Joi.string().uri().optional().messages({
        "string.uri": "Image must be a valid URL",
    })
});

const validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { validateRecipe };

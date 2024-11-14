const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipe.controller');
const { validateRecipe } = require('../middlewares/validators');
const upload = require('../middlewares/upload');

router.get('/', getRecipes);

router.get('/:id', getRecipeById);

router.post('/', upload.single('image'), validateRecipe, createRecipe);

// update a Recipe
router.put('/:id', upload.single('image'), validateRecipe, updateRecipe);

// delete a Recipe
router.delete('/:id', deleteRecipe);

module.exports = router;
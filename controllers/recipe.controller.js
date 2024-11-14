const Recipe = require("../models/recipe.model");

const getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    const recipes = await Recipe.find().skip(startIndex).limit(limit);
    const total = await Recipe.countDocuments();
    const totalPages = Math.ceil(total / limit);
    res.status(200).json({
      data: recipes,
      currentPage: page,
      totalPages,
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ data: recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : null;

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      image,
    });
    res.status(201).json({ data: recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : undefined;
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
      title,
      ingredients,
      instructions,
      ...(image && { image }),
    });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const updatedRecipe = await Recipe.findById(req.params.id);
    res.status(200).json({ data: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipeRepository_1 = __importDefault(require("../repositories/recipeRepository"));
const multer_1 = __importDefault(require("multer"));
// Set up multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, "uploads/"),
    filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = (0, multer_1.default)({ storage });
/**
 * Creates a new recipe.
 *
 * @param {Request} req - The request object, containing recipe data in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const createRecipe = async (req, res) => {
    try {
        const recipeId = await recipeRepository_1.default.createRecipe(req.body);
        if (!recipeId) {
            res.status(500).json({ message: "Failed to create recipe" });
            return;
        }
        res.status(201).json({ message: "Recipe created successfully", recipeId });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating recipe", error });
    }
};
/**
 * Retrieves a recipe by its ID.
 *
 * @param {Request} req - The request object, containing recipeId in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getRecipeById = async (req, res) => {
    try {
        const recipe = await recipeRepository_1.default.findById(Number(req.params.id));
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        res.json(recipe);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching recipe", error });
    }
};
/**
 * Searches for recipes based on a query parameter.
 *
 * @param {Request} req - The request object, containing the search query in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const searchRecipes = async (req, res) => {
    try {
        const recipes = await recipeRepository_1.default.searchRecipes(req.params.query);
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Error searching recipes", error });
    }
};
/**
 * Retrieves all recipes with pagination support.
 *
 * @param {Request} req - The request object, containing pagination parameters in the query.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getAllRecipes = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const recipes = await recipeRepository_1.default.getAllRecipes(Number(limit), offset);
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
};
/**
 * Updates a recipe by its ID.
 *
 * @param {Request} req - The request object, containing recipeId in the params and updated data in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const updateRecipe = async (req, res) => {
    try {
        const updated = await recipeRepository_1.default.updateRecipe(Number(req.params.id), req.body);
        if (!updated) {
            res.status(404).json({ message: "Recipe not found or not updated" });
            return;
        }
        res.json({ message: "Recipe updated successfully" });
    }
    catch (error) {
        console.error("Error updating recipe:", error); // Log the error for debugging
        res.status(500).json({ message: "Error updating recipe", error: error.message || error });
    }
};
/**
 * Deletes a recipe by its ID.
 *
 * @param {Request} req - The request object, containing recipeId in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const deleteRecipe = async (req, res) => {
    try {
        const deleted = await recipeRepository_1.default.deleteRecipe(Number(req.params.id));
        if (!deleted) {
            res.status(404).json({ message: "Recipe not found or already deleted" });
            return;
        }
        res.json({ message: "Recipe deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error });
    }
};
/**
 * Retrieves recipes by cuisine type.
 *
 * @param {Request} req - The request object, containing cuisine type in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getRecipesByCuisine = async (req, res) => {
    try {
        const recipes = await recipeRepository_1.default.getRecipesByCuisine(req.params.cuisine);
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
};
/**
 * Retrieves recipes by meal type (e.g., breakfast, lunch, dinner).
 *
 * @param {Request} req - The request object, containing meal type in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getRecipesByMealType = async (req, res) => {
    try {
        const recipes = await recipeRepository_1.default.getRecipesByMealType(req.params.mealType);
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
};
/**
 * Retrieves recipes uploaded by a specific user.
 *
 * @param {Request} req - The request object, containing userId in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getUserRecipes = async (req, res) => {
    try {
        const recipes = await recipeRepository_1.default.getUserRecipes(Number(req.params.userId));
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
};
exports.default = { createRecipe, getRecipeById, searchRecipes, getAllRecipes, updateRecipe, deleteRecipe, getRecipesByCuisine, getRecipesByMealType, getUserRecipes, upload };

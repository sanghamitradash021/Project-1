"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeController_1 = __importDefault(require("../controllers/recipeController")); // Default import
const router = express_1.default.Router();
/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new recipe
 *     description: Uploads an image and creates a new recipe.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image of the recipe
 *       - in: body
 *         name: recipe
 *         description: Recipe data
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - user_id
 *             - description
 *             - ingredients
 *             - instructions
 *             - preparationTime
 *             - difficulty
 *             - cuisine
 *             - mealType
 *           properties:
 *             title:
 *               type: string
 *             user_id:
 *               type: integer
 *             description:
 *               type: string
 *             ingredients:
 *               type: array
 *               items:
 *                 type: string
 *             instructions:
 *               type: string
 *             preparationTime:
 *               type: integer
 *             difficulty:
 *               type: string
 *             cuisine:
 *               type: string
 *             mealType:
 *               type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       500:
 *         description: Error creating recipe
 */
router.post('/create', recipeController_1.default.upload.single('image'), recipeController_1.default.createRecipe);
/**
 * @swagger
 * /getall:
 *   get:
 *     summary: Retrieve all recipes with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         type: integer
 *         required: false
 *         description: Number of recipes per page
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get("/getall", recipeController_1.default.getAllRecipes);
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a specific recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the recipe
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
router.get("/:id", recipeController_1.default.getRecipeById);
/**
 * @swagger
 * /search/{query}:
 *   get:
 *     summary: Search recipes by title, ingredients, or tags
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of matching recipes
 */
router.get("/search/:query", recipeController_1.default.searchRecipes);
/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a specific recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the recipe to update
 *       - in: body
 *         name: recipe
 *         description: Updated recipe data
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       403:
 *         description: Unauthorized
 */
router.put("/:id", recipeController_1.default.updateRecipe);
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a specific recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the recipe to delete
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       403:
 *         description: Unauthorized
 */
router.delete("/:id", recipeController_1.default.deleteRecipe);
/**
 * @swagger
 * /cuisine/{cuisine}:
 *   get:
 *     summary: Retrieve recipes filtered by cuisine type
 *     parameters:
 *       - in: path
 *         name: cuisine
 *         required: true
 *         type: string
 *         description: Cuisine type
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get("/cuisine/:cuisine", recipeController_1.default.getRecipesByCuisine);
/**
 * @swagger
 * /mealtype/{mealType}:
 *   get:
 *     summary: Retrieve recipes filtered by meal type
 *     parameters:
 *       - in: path
 *         name: mealType
 *         required: true
 *         type: string
 *         description: Meal type
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get("/mealtype/:mealType", recipeController_1.default.getRecipesByMealType);
/**
 * @swagger
 * /my-recipes/{userId}:
 *   get:
 *     summary: Retrieve user-specific recipes
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user recipes
 */
router.get("/my-recipes/:userId", recipeController_1.default.getUserRecipes);
exports.default = router;

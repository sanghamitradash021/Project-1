import express from "express";
import recipeController, { createRecipe, upload } from "../controllers/recipeController";

const router = express.Router();

// Create a new recipe (protected route)
router.post('/create', upload.single('image'), createRecipe); // 'image' is the field name in the form

// Retrieve all recipes with pagination
router.get("/getall", recipeController.getAllRecipes);

// Retrieve a specific recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Search recipes by title, ingredients, or tags
router.get("/search/:query", recipeController.searchRecipes);

// Update a specific recipe (only the creator can update)
router.put("/:id", recipeController.updateRecipe);

// Delete a specific recipe (only the creator can delete)
router.delete("/:id", recipeController.deleteRecipe);

// Retrieve recipes filtered by cuisine type
router.get("/cuisine/:cuisine", recipeController.getRecipesByCuisine);

// Retrieve recipes filtered by meal type
router.get("/mealtype/:mealType", recipeController.getRecipesByMealType);

// Retrieve a list of all available cuisine types
router.get("/allcuisine", recipeController.getAllCuisines);

// Retrieve user-specific recipes (using user_id)
router.get("/my-recipes/:userId", recipeController.getUserRecipes); // Changed route to use query param instead of route param

// router.get("/xyz/:userId", (req, res) => {
//     console.log("Received request for '/my-recipes' route.");
//     recipeController.getUserRecipes(req, res);
// });

export default router;

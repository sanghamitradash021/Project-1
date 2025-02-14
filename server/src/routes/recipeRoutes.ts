import express from "express";
import recipeController from "../controllers/recipeController";
// import { authenticateUser } from "../middleware/authMiddleware";
import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";

const router = express.Router();

// Create a new recipe (protected route)
router.post("/create", recipeController.createRecipe);

// Retrieve all recipes with pagination
router.get("/getall", recipeController.getAllRecipes);

// router.get("/abc", (req, res) => {
//     console.log('Route /APIS/RECIPES/abc is being hit');
//     res.send('Route working!');
// });


// Retrieve a specific recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Search recipes by title, ingredients, or tags
router.get("/search/:query", recipeController.searchRecipes);

// Retrieve all recipes with pagination

// router.get("/recipes", async (req, res)=>{
//     try {
//         console.log("hii")
//         const page = 1
//         const  limit = 10 
//         const offset = (Number(page) - 1) * Number(limit);

//         const [recipes] = await sequelize.query("SELECT * FROM Recipes LIMIT :limit OFFSET :offset", {
//             replacements: { limit: Number(limit), offset },
//             type: QueryTypes.SELECT,
//         });

//         console.log("Raw Query Result:", recipes);
//         res.json({ recipes });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recipes", error });
//     }
//     }
//    );

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

// // Retrieve a list of all available meal types
router.get("/mealTypes", recipeController.getAllMealTypes);

export default router;

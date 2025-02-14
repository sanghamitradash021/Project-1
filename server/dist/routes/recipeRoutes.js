"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeController_1 = __importDefault(require("../controllers/recipeController"));
const router = express_1.default.Router();
// Create a new recipe (protected route)
router.post("/create", recipeController_1.default.createRecipe);
// Retrieve all recipes with pagination
router.get("/getall", recipeController_1.default.getAllRecipes);
// router.get("/abc", (req, res) => {
//     console.log('Route /APIS/RECIPES/abc is being hit');
//     res.send('Route working!');
// });
// Retrieve a specific recipe by ID
router.get("/:id", recipeController_1.default.getRecipeById);
// Search recipes by title, ingredients, or tags
router.get("/search/:query", recipeController_1.default.searchRecipes);
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
router.put("/:id", recipeController_1.default.updateRecipe);
// Delete a specific recipe (only the creator can delete)
router.delete("/:id", recipeController_1.default.deleteRecipe);
// Retrieve recipes filtered by cuisine type
router.get("/cuisine/:cuisine", recipeController_1.default.getRecipesByCuisine);
// Retrieve recipes filtered by meal type
router.get("/mealtype/:mealType", recipeController_1.default.getRecipesByMealType);
// Retrieve a list of all available cuisine types
router.get("/allcuisine", recipeController_1.default.getAllCuisines);
// // Retrieve a list of all available meal types
router.get("/mealTypes", recipeController_1.default.getAllMealTypes);
exports.default = router;

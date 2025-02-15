"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeController_1 = __importStar(require("../controllers/recipeController"));
const router = express_1.default.Router();
// Create a new recipe (protected route)
router.post('/create', recipeController_1.upload.single('image'), recipeController_1.createRecipe); // 'image' is the field name in the form
// Retrieve all recipes with pagination
router.get("/getall", recipeController_1.default.getAllRecipes);
// Retrieve a specific recipe by ID
router.get("/:id", recipeController_1.default.getRecipeById);
// Search recipes by title, ingredients, or tags
router.get("/search/:query", recipeController_1.default.searchRecipes);
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
// Retrieve user-specific recipes (using user_id)
router.get("/my-recipes/:userId", recipeController_1.default.getUserRecipes); // Changed route to use query param instead of route param
// router.get("/xyz/:userId", (req, res) => {
//     console.log("Received request for '/my-recipes' route.");
//     recipeController.getUserRecipes(req, res);
// });
exports.default = router;

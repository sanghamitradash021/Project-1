

// import { Request, Response } from "express";
// import recipeRepository from "../repositories/recipeRepository";
// import multer from "multer";

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (_req, _file, cb) => cb(null, "uploads/"),
//     filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage });

// const createRecipe = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const recipeId = await recipeRepository.createRecipe(req.body);
//         if (!recipeId) {
//             res.status(500).json({ message: "Failed to create recipe" });
//             return;
//         }
//         res.status(201).json({ message: "Recipe created successfully", recipeId });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating recipe", error });
//     }
// };

// const getRecipeById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const recipe = await recipeRepository.findById(Number(req.params.id));
//         if (!recipe) {
//             res.status(404).json({ message: "Recipe not found" });
//             return;
//         }
//         res.json(recipe);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recipe", error });
//     }
// };

// const searchRecipes = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const recipes = await recipeRepository.searchRecipes(req.params.query);
//         res.json(recipes);
//     } catch (error) {
//         res.status(500).json({ message: "Error searching recipes", error });
//     }
// };

// const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { page = 1, limit = 100 } = req.query;
//         const offset = (Number(page) - 1) * Number(limit);
//         const recipes = await recipeRepository.getAllRecipes(Number(limit), offset);
//         res.json(recipes);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recipes", error });
//     }
// };

// const updateRecipe = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const updated = await recipeRepository.updateRecipe(Number(req.params.id), req.body);
//         if (!updated) {
//             res.status(404).json({ message: "Recipe not found or not updated" });
//             return;
//         }
//         res.json({ message: "Recipe updated successfully" });
//     } catch (error: any) {
//         console.error("Error updating recipe:", error); // Log the error for debugging
//         res.status(500).json({ message: "Error updating recipe", error: error.message || error });
//     }
// };


// const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const deleted = await recipeRepository.deleteRecipe(Number(req.params.id));
//         if (!deleted) {
//             res.status(404).json({ message: "Recipe not found or already deleted" });
//             return;
//         }
//         res.json({ message: "Recipe deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting recipe", error });
//     }
// };

// const getRecipesByCuisine = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const recipes = await recipeRepository.getRecipesByCuisine(req.params.cuisine);
//         res.json(recipes);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recipes", error });
//     }
// };

// const getRecipesByMealType = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const recipes = await recipeRepository.getRecipesByMealType(req.params.mealType);
//         res.json(recipes);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recipes", error });
//     }
// };

// const getUserRecipes = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const recipes = await recipeRepository.getUserRecipes(Number(req.params.userId));
//         res.json(recipes);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recipes", error });
//     }
// };

// export default { createRecipe, getRecipeById, searchRecipes, getAllRecipes, updateRecipe, deleteRecipe, getRecipesByCuisine, getRecipesByMealType, getUserRecipes, upload };

import { Request, Response } from "express";
import recipeRepository from "../repositories/recipeRepository";
import multer from "multer";

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, "uploads/"),
    filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/**
 * Creates a new recipe.
 * 
 * @param {Request} req - The request object, containing recipe data in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipeId = await recipeRepository.createRecipe(req.body);
        if (!recipeId) {
            res.status(500).json({ message: "Failed to create recipe" });
            return;
        }
        res.status(201).json({ message: "Recipe created successfully", recipeId });
    } catch (error) {
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
const getRecipeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipe = await recipeRepository.findById(Number(req.params.id));
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        res.json(recipe);
    } catch (error) {
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
const searchRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await recipeRepository.searchRecipes(req.params.query);
        res.json(recipes);
    } catch (error) {
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
const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const recipes = await recipeRepository.getAllRecipes(Number(limit), offset);
        res.json(recipes);
    } catch (error) {
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
const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const updated = await recipeRepository.updateRecipe(Number(req.params.id), req.body);
        if (!updated) {
            res.status(404).json({ message: "Recipe not found or not updated" });
            return;
        }
        res.json({ message: "Recipe updated successfully" });
    } catch (error: any) {
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
const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await recipeRepository.deleteRecipe(Number(req.params.id));
        if (!deleted) {
            res.status(404).json({ message: "Recipe not found or already deleted" });
            return;
        }
        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
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
const getRecipesByCuisine = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await recipeRepository.getRecipesByCuisine(req.params.cuisine);
        res.json(recipes);
    } catch (error) {
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
const getRecipesByMealType = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await recipeRepository.getRecipesByMealType(req.params.mealType);
        res.json(recipes);
    } catch (error) {
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
const getUserRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await recipeRepository.getUserRecipes(Number(req.params.userId));
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
};

export default { createRecipe, getRecipeById, searchRecipes, getAllRecipes, updateRecipe, deleteRecipe, getRecipesByCuisine, getRecipesByMealType, getUserRecipes, upload };

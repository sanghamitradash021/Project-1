import { Request, Response } from "express";
import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";
// import Recipe from "../models/recipe";

/**
 * Create a new recipe
 */

const createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            title,
            user_id,
            description,
            ingredients, // Array
            instructions,
            preparationTime,
            difficulty,
            cuisine,
            mealType,

        } = req.body;

        // Convert `ingredients` array to JSON string
        const ingredientsJson = JSON.stringify(ingredients);

        // Insert recipe into database
        const [newRecipe] = await sequelize.query(
            `INSERT INTO Recipes (title, user_id, description, ingredients, instructions, preparationTime, difficulty, cuisine, mealType, createdAt, updatedAt) 
             VALUES (:title, :user_id, :description, :ingredients, :instructions, :preparationTime, :difficulty, :cuisine, :mealType, NOW(), NOW())`,
            {
                replacements: {
                    title,
                    user_id,
                    description,
                    ingredients: ingredientsJson,
                    instructions,
                    preparationTime,
                    difficulty,
                    cuisine,
                    mealType
                },
                type: QueryTypes.INSERT,
            }
        );

        const [idResult] = await sequelize.query("SELECT LAST_INSERT_ID() as id", { type: QueryTypes.SELECT });
        const recipeId = (idResult as { id: number }).id;

        if (!recipeId) {
            res.status(500).json({ message: "Failed to create recipe" });
            return;
        }

        // Add tags to recipe (if any)
        // if (tags && tags.length > 0) {
        //     for (const tag of tags) {
        //         await sequelize.query("INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (:recipe_id, :tag_id)", {
        //             replacements: { recipe_id: recipeId, tag_id: tag },
        //             type: QueryTypes.INSERT,
        //         });
        //     }
        // }

        res.status(201).json({ message: "Recipe created successfully", recipeId });
    } catch (error) {
        res.status(500).json({ message: "Error creating recipe", error });
    }
};


/**
 * Retrieve a specific recipe by ID
 */
const getRecipeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [recipe] = await sequelize.query("SELECT * FROM Recipes WHERE recipe_id = :id", {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

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
 * Search recipes by title, ingredients, or tags
 */
const searchRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const { query } = req.query;

        const recipes = await sequelize.query(
            `SELECT * FROM Recipes 
             WHERE title LIKE :query OR ingredients LIKE :query OR cuisine LIKE :query OR meal_type LIKE :query`,
            {
                replacements: { query: `%${query}%` },
                type: QueryTypes.SELECT,
            }
        );

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error searching recipes", error });
    }
};

/**
 * Retrieve all recipes with pagination
 */
const getAllRecipes = async (req: Request, res: Response) => {
    try {
        console.log("hii");

        // Get page and limit from query parameters, default to 1 and 10 if not provided
        const { page = 1, limit = 10 } = req.query;

        // Ensure page and limit are numbers
        const offset = (Number(page) - 1) * Number(limit);

        const [recipes] = await sequelize.query("SELECT * FROM Recipes LIMIT :limit OFFSET :offset", {
            replacements: { limit: Number(limit), offset },
            type: QueryTypes.SELECT,
        });

        console.log("Raw Query Result:", recipes);
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
};


/**
 * Update a recipe (only creator can update)
 */
const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, user_id, description, ingredients, instructions, preparationTime, difficulty, cuisine, mealType } = req.body;

        // Check if recipe exists and get its user_id
        const [recipe]: any = await sequelize.query(
            "SELECT user_id FROM Recipes WHERE recipe_id = :id",
            {
                replacements: { id },
                type: QueryTypes.SELECT,
            }
        );

        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }

        // Ensure only the creator can update the recipe
        if (recipe.user_id !== user_id) {
            res.status(403).json({ message: "Unauthorized to update this recipe" });
            return;
        }
        const ingredientsJSON = JSON.stringify(ingredients);
        // Update the recipe
        await sequelize.query(
            `UPDATE Recipes 
             SET title = :title, description = :description, ingredients = :ingredients, 
                 instructions = :instructions, preparationTime = :preparationTime, difficulty = :difficulty, 
                 cuisine = :cuisine, mealType = :mealType, updatedAt = NOW()
             WHERE recipe_id = :id`,
            {
                replacements: { id, title, description, ingredients: ingredientsJSON, instructions, preparationTime, difficulty, cuisine, mealType },
                type: QueryTypes.UPDATE,
            }
        );

        res.json({ message: "Recipe updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating recipe", error });
    }
};


/**
 * Delete a recipe (only creator can delete)
 */
const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        // const user_id = (req as any).user.id; // Extract user_id from authenticated request (JWT)

        // Check if recipe exists and get the creator's ID
        // const [recipe]: any = await sequelize.query(
        //     "SELECT user_id FROM Recipes WHERE recipe_id = :id",
        //     {
        //         replacements: { id },
        //         type: QueryTypes.SELECT,
        //     }
        // );

        // if (!recipe) {
        //     res.status(404).json({ message: "Recipe not found" });
        //     return;
        // }

        // Ensure only the creator can delete the recipe
        // if (recipe.user_id !== user_id) {
        //     res.status(403).json({ message: "Unauthorized to delete this recipe" });
        //     return;
        // }

        // Delete the recipe
        await sequelize.query("DELETE FROM Recipes WHERE recipe_id = :id", {
            replacements: { id },
            type: QueryTypes.DELETE,
        });

        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error });
    }
};

/**
 * Retrieve recipes filtered by cuisine type
 */
const getRecipesByCuisine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cuisine } = req.params;

        const recipes = await sequelize.query("SELECT * FROM Recipes WHERE cuisine = :cuisine", {
            replacements: { cuisine },
            type: QueryTypes.SELECT,
        });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes by cuisine", error });
    }
};

/**
 * Retrieve recipes filtered by meal type
 */
const getRecipesByMealType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mealType } = req.params;

        const recipes = await sequelize.query("SELECT * FROM Recipes WHERE mealType = :mealType", {
            replacements: { mealType },
            type: QueryTypes.SELECT,
        });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes by meal type", error });
    }
};

/**
 * Retrieve all available cuisine types
 */
const getAllCuisines = async (req: Request, res: Response): Promise<void> => {
    try {
        const [cuisines] = await sequelize.query("SELECT DISTINCT cuisine FROM Recipes", { type: QueryTypes.SELECT });

        res.json({cuisines});
    } catch (error) {
        res.status(500).json({ message: "Error fetching cuisines", error });
    }
};

/**
 * Retrieve all available meal types
 */
const getAllMealTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("hii")
        const mealTypes = await sequelize.query("SELECT DISTINCT meal_type FROM Recipes", { type: QueryTypes.SELECT });

        res.json(mealTypes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching meal types", error });
    }
};

// export default {
//     createRecipe,
//     getRecipeById,
//     searchRecipes,
//     getAllRecipes,
//     updateRecipe,
//     deleteRecipe,
//     getRecipesByCuisine,
//     getRecipesByMealType,
//     // getAllCuisines,
//     // getAllMealTypes,
// };

const recipeController = {
    createRecipe: createRecipe,
    getRecipeById: getRecipeById,
    searchRecipes: searchRecipes,
    getAllRecipes: getAllRecipes,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe,
    getRecipesByCuisine: getRecipesByCuisine,
    getRecipesByMealType: getRecipesByMealType,
    getAllCuisines: getAllCuisines,
    getAllMealTypes: getAllMealTypes
}
export default recipeController;
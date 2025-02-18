


// import { Request, Response } from "express";
// import RatingRepository from "../repositories/ratingRepository";

// const addRating = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { recipeId, userId, rating } = req.body;

//         // Check if the user has already rated the recipe
//         const existingRating = await RatingRepository.getRatingByUserAndRecipe(recipeId, userId);

//         if (existingRating) {
//             // Update existing rating
//             await RatingRepository.updateRating(recipeId, userId, rating);
//             res.status(200).json({ message: "Rating updated successfully" });
//         } else {
//             // Add new rating
//             await RatingRepository.addRating(recipeId, userId, rating);
//             res.status(201).json({ message: "Rating added successfully" });
//         }
//     } catch (error) {
//         console.error("❌ Error adding/updating rating:", error);
//         res.status(500).json({ message: "Error adding/updating rating", error });
//     }
// };

// const getRating = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { recipeId } = req.params;

//         // Get average rating for the recipe
//         const averageRating = await RatingRepository.getAverageRating(Number(recipeId));

//         res.status(200).json({ averageRating });
//     } catch (error) {
//         console.error("❌ Error in getRating:", error);
//         res.status(500).json({ message: "Error fetching rating", error });
//     }
// };

// const updateRating = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { ratingId, userId, rating } = req.body;

//         // Check if the rating exists and belongs to the user
//         const existingRating = await RatingRepository.getRatingByIdAndUser(ratingId, userId);

//         if (!existingRating) {
//             res.status(404).json({ message: "Rating not found or unauthorized" });
//             return;
//         }

//         // Update the rating
//         await RatingRepository.updateRating(existingRating.recipe_id, userId, rating);
//         res.status(200).json({ message: "Rating updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating rating", error });
//     }
// };

// const deleteRating = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { ratingId, userId } = req.body;

//         // Check if the rating exists and belongs to the user
//         const existingRating = await RatingRepository.getRatingByIdAndUser(ratingId, userId);

//         if (!existingRating) {
//             res.status(404).json({ message: "Rating not found or unauthorized" });
//             return;
//         }

//         // Delete the rating
//         await RatingRepository.deleteRating(ratingId);
//         res.status(200).json({ message: "Rating deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting rating", error });
//     }
// };

// export default {
//     addRating,
//     getRating,
//     updateRating,
//     deleteRating,
// };

import { Request, Response } from "express";
import RatingRepository from "../repositories/ratingRepository";

/**
 * Adds a rating for a recipe or updates an existing rating if the user has already rated it.
 * 
 * @param {Request} req - The request object, containing recipeId, userId, and rating in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const addRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { recipeId, userId, rating } = req.body;

        // Check if the user has already rated the recipe
        const existingRating = await RatingRepository.getRatingByUserAndRecipe(recipeId, userId);

        if (existingRating) {
            // Update existing rating
            await RatingRepository.updateRating(recipeId, userId, rating);
            res.status(200).json({ message: "Rating updated successfully" });
        } else {
            // Add new rating
            await RatingRepository.addRating(recipeId, userId, rating);
            res.status(201).json({ message: "Rating added successfully" });
        }
    } catch (error) {
        console.error("❌ Error adding/updating rating:", error);
        res.status(500).json({ message: "Error adding/updating rating", error });
    }
};

/**
 * Retrieves the average rating for a specific recipe.
 * 
 * @param {Request} req - The request object, containing recipeId in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { recipeId } = req.params;

        // Get average rating for the recipe
        const averageRating = await RatingRepository.getAverageRating(Number(recipeId));

        res.status(200).json({ averageRating });
    } catch (error) {
        console.error("❌ Error in getRating:", error);
        res.status(500).json({ message: "Error fetching rating", error });
    }
};

/**
 * Updates an existing rating for a recipe.
 * 
 * @param {Request} req - The request object, containing ratingId, userId, and rating in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const updateRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ratingId, userId, rating } = req.body;

        // Check if the rating exists and belongs to the user
        const existingRating = await RatingRepository.getRatingByIdAndUser(ratingId, userId);

        if (!existingRating) {
            res.status(404).json({ message: "Rating not found or unauthorized" });
            return;
        }

        // Update the rating
        await RatingRepository.updateRating(existingRating.recipe_id, userId, rating);
        res.status(200).json({ message: "Rating updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating rating", error });
    }
};

/**
 * Deletes a rating for a recipe.
 * 
 * @param {Request} req - The request object, containing ratingId and userId in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const deleteRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ratingId, userId } = req.body;

        // Check if the rating exists and belongs to the user
        const existingRating = await RatingRepository.getRatingByIdAndUser(ratingId, userId);

        if (!existingRating) {
            res.status(404).json({ message: "Rating not found or unauthorized" });
            return;
        }

        // Delete the rating
        await RatingRepository.deleteRating(ratingId);
        res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting rating", error });
    }
};

export default {
    addRating,
    getRating,
    updateRating,
    deleteRating,
};

import { Request, Response } from "express";
import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";

const addRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { recipeId, userId, rating } = req.body;

        // Check if the user has already rated the recipe
        const [existingRating] = await sequelize.query(
            "SELECT * FROM Ratings WHERE recipe_id = :recipeId AND user_id = :userId",
            {
                replacements: { recipeId, userId },
                type: QueryTypes.SELECT,
            }
        );

        if (existingRating) {
            // ✅ If rating exists, update it instead of blocking
            await sequelize.query(
                "UPDATE Ratings SET rating = :rating, updatedAt = NOW() WHERE recipe_id = :recipeId AND user_id = :userId",
                {
                    replacements: { recipeId, userId, rating },
                    type: QueryTypes.UPDATE,
                }
            );

            res.status(200).json({ message: "Rating updated successfully" });
            return;
        }

        // If no existing rating, insert a new one
        await sequelize.query(
            "INSERT INTO Ratings (recipe_id, user_id, rating, createdAt, updatedAt) VALUES (:recipeId, :userId, :rating, NOW(), NOW())",
            {
                replacements: { recipeId, userId, rating },
                type: QueryTypes.INSERT,
            }
        );

        res.status(201).json({ message: "Rating added successfully" });
    } catch (error) {
        console.error("❌ Error adding/updating rating:", error);
        res.status(500).json({ message: "Error adding/updating rating", error });
    }
};


const getRating = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("✅ getRating controller called with recipeId:", req.params.recipeId);

        const { recipeId } = req.params;

        // Get average rating for the recipe
        const [averageRating] = await sequelize.query(
            "SELECT AVG(rating) AS avg_rating FROM Ratings WHERE recipe_id = :recipeId",
            {
                replacements: { recipeId },
                type: QueryTypes.SELECT,
            }
        );

        console.log("✅ Retrieved rating:", averageRating);

        // ✅ Ensure a response is sent
        res.status(200).json({ averageRating: averageRating });
    } catch (error) {
        console.error("❌ Error in getRating:", error);
        res.status(500).json({ message: "Error fetching rating", error });
    }
};
const updateRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ratingId, userId, rating } = req.body;

        // Check if the rating exists and belongs to the user
        const [existingRating] = await sequelize.query(
            "SELECT * FROM Ratings WHERE rate_id = :ratingId AND user_id = :userId",
            {
                replacements: { ratingId, userId },
                type: QueryTypes.SELECT,
            }
        );

        if (!existingRating) {
            res.status(404).json({ message: "Rating not found or unauthorized" });
            return;
        }

        // Update the rating
        await sequelize.query(
            "UPDATE Ratings SET rating = :rating, updatedAt = NOW() WHERE rate_id = :ratingId",
            {
                replacements: { rating, ratingId },
                type: QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Rating updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating rating", error });
    }
};

const deleteRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ratingId, userId } = req.body;

        // Check if the rating exists and belongs to the user
        const [existingRating] = await sequelize.query(
            "SELECT * FROM Ratings WHERE rate_id = :ratingId AND user_id = :userId",
            {
                replacements: { ratingId, userId },
                type: QueryTypes.SELECT,
            }
        );

        if (!existingRating) {
            res.status(404).json({ message: "Rating not found or unauthorized" });
            return;
        }

        // Delete the rating
        await sequelize.query(
            "DELETE FROM Ratings WHERE rate_id = :ratingId",
            {
                replacements: { ratingId },
                type: QueryTypes.DELETE,
            }
        );

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

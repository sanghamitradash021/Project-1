"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const addRating = async (req, res) => {
    try {
        const { recipeId, userId, rating } = req.body;
        // Check if the user has already rated the recipe
        const [existingRating] = await database_1.sequelize.query("SELECT * FROM Ratings WHERE recipe_id = :recipeId AND user_id = :userId", {
            replacements: { recipeId, userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (existingRating) {
            res.status(400).json({ message: "User has already rated this recipe" });
            return;
        }
        // Insert the new rating
        await database_1.sequelize.query("INSERT INTO Ratings (recipe_id, user_id, rating, created_at, updated_at) VALUES (:recipeId, :userId, :rating, NOW(), NOW())", {
            replacements: { recipeId, userId, rating },
            type: sequelize_1.QueryTypes.INSERT,
        });
        res.status(201).json({ message: "Rating added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding rating", error });
    }
};
const getRating = async (req, res) => {
    try {
        const { recipeId } = req.params;
        // Get average rating for the recipe
        const [averageRating] = await database_1.sequelize.query("SELECT AVG(rating) AS avg_rating FROM Ratings WHERE recipe_id = :recipeId", {
            replacements: { recipeId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        // res.status(200).json({ averageRating: averageRating.avg_rating });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching rating", error });
    }
};
const updateRating = async (req, res) => {
    try {
        const { ratingId, userId, rating } = req.body;
        // Check if the rating exists and belongs to the user
        const [existingRating] = await database_1.sequelize.query("SELECT * FROM Ratings WHERE rating_id = :ratingId AND user_id = :userId", {
            replacements: { ratingId, userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!existingRating) {
            res.status(404).json({ message: "Rating not found or unauthorized" });
            return;
        }
        // Update the rating
        await database_1.sequelize.query("UPDATE Ratings SET rating = :rating, updated_at = NOW() WHERE rating_id = :ratingId", {
            replacements: { rating, ratingId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        res.status(200).json({ message: "Rating updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating rating", error });
    }
};
const deleteRating = async (req, res) => {
    try {
        const { ratingId, userId } = req.body;
        // Check if the rating exists and belongs to the user
        const [existingRating] = await database_1.sequelize.query("SELECT * FROM Ratings WHERE rating_id = :ratingId AND user_id = :userId", {
            replacements: { ratingId, userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!existingRating) {
            res.status(404).json({ message: "Rating not found or unauthorized" });
            return;
        }
        // Delete the rating
        await database_1.sequelize.query("DELETE FROM Ratings WHERE rating_id = :ratingId", {
            replacements: { ratingId },
            type: sequelize_1.QueryTypes.DELETE,
        });
        res.status(200).json({ message: "Rating deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting rating", error });
    }
};
exports.default = {
    addRating,
    getRating,
    updateRating,
    deleteRating,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const addComment = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const { recipeId } = req.params;
        const [newComment] = await database_1.sequelize.query(`INSERT INTO Comments (recipe_id, user_id, content, createdAt, updatedAt) 
                VALUES (:recipeId, :userId, :content, NOW(), NOW())`, {
            replacements: {
                recipeId,
                userId,
                content,
            },
            type: sequelize_1.QueryTypes.INSERT,
        });
        res.status(201).json({ message: "Comment added successfully" });
    }
    catch (error) {
        // Log the detailed error for debugging
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};
const getComments = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const comments = await database_1.sequelize.query("SELECT * FROM Comments WHERE recipe_id = :recipeId", {
            replacements: { recipeId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};
const updateComment = async (req, res) => {
    try {
        const { commentId, userId, content } = req.body;
        // Check if the comment exists and belongs to the user
        const [existingComment] = await database_1.sequelize.query("SELECT * FROM Comments WHERE comment_id = :commentId AND user_id = :userId", {
            replacements: { commentId, userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!existingComment) {
            res.status(404).json({ message: "Comment not found or unauthorized" });
            return;
        }
        // Update comment content
        await database_1.sequelize.query("UPDATE Comments SET content = :content, updatedAt = NOW() WHERE comment_id = :commentId", {
            replacements: { content, commentId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        res.status(200).json({ message: "Comment updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating comment", error });
    }
};
const deleteComment = async (req, res) => {
    try {
        const { commentId, userId } = req.body;
        // Check if the comment exists and belongs to the user
        const [existingComment] = await database_1.sequelize.query("SELECT * FROM Comments WHERE comment_id = :commentId AND user_id = :userId", {
            replacements: { commentId, userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!existingComment) {
            res.status(404).json({ message: "Comment not found or unauthorized" });
            return;
        }
        // Mark the comment as deleted
        await database_1.sequelize.query("UPDATE Comments SET is_deleted = 1 WHERE comment_id = :commentId", {
            replacements: { commentId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
};
exports.default = {
    addComment,
    getComments,
    updateComment,
    deleteComment,
};

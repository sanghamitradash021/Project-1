"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
/**
 * Repository for handling comment-related database operations.
 * This includes adding, retrieving, updating, and deleting comments from the database.
 *
 * @namespace CommentRepository
 */
const CommentRepository = {
    /**
     * Adds a new comment to the database.
     *
     * @param {number} recipeId - The ID of the recipe to which the comment belongs.
     * @param {number} userId - The ID of the user who is adding the comment.
     * @param {string} content - The content of the comment.
     * @returns {Promise<void>} - A promise that resolves when the comment is successfully added.
     */
    async addComment(recipeId, userId, content) {
        await database_1.sequelize.query(`INSERT INTO Comments (recipe_id, user_id, content, createdAt, updatedAt) 
            VALUES (:recipeId, :userId, :content, NOW(), NOW())`, {
            replacements: { recipeId, userId, content },
            type: sequelize_1.QueryTypes.INSERT,
        });
    },
    /**
     * Retrieves all comments associated with a particular recipe.
     *
     * @param {number} recipeId - The ID of the recipe to retrieve comments for.
     * @returns {Promise<Comment[]>} - A promise that resolves to an array of comments.
     */
    async getCommentsByRecipe(recipeId) {
        const result = await database_1.sequelize.query("SELECT * FROM Comments WHERE recipe_id = :recipeId AND is_deleted = 0", {
            replacements: { recipeId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return result;
    },
    /**
     * Retrieves a specific comment by its ID and the user ID who created it.
     *
     * @param {number} commentId - The ID of the comment to retrieve.
     * @param {number} userId - The ID of the user who created the comment.
     * @returns {Promise<Comment | undefined>} - A promise that resolves to the comment if found, or undefined.
     */
    async getCommentByIdAndUser(commentId, userId) {
        const result = await database_1.sequelize.query("SELECT * FROM Comments WHERE comment_id = :commentId AND user_id = :userId", {
            replacements: { commentId, userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return result[0]; // Return the first result or undefined if not found
    },
    /**
     * Updates the content of an existing comment.
     *
     * @param {number} commentId - The ID of the comment to update.
     * @param {string} content - The new content for the comment.
     * @returns {Promise<void>} - A promise that resolves when the comment is successfully updated.
     */
    async updateComment(commentId, content) {
        await database_1.sequelize.query("UPDATE Comments SET content = :content, updatedAt = NOW() WHERE comment_id = :commentId", {
            replacements: { content, commentId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
    },
    /**
     * Soft deletes a comment by marking it as deleted (is_deleted = 1).
     *
     * @param {number} commentId - The ID of the comment to delete.
     * @returns {Promise<void>} - A promise that resolves when the comment is successfully deleted.
     */
    async deleteComment(commentId) {
        await database_1.sequelize.query("UPDATE Comments SET is_deleted = 1 WHERE comment_id = :commentId", {
            replacements: { commentId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
    },
};
exports.default = CommentRepository;

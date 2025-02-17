// import express from "express";
// import commentController from "../controllers/commentController"; // Adjust the import path as needed

// const router = express.Router();

// // Route to add a comment
// router.post("/newcomment", commentController.addComment);

// // Route to get all comments for a specific recipe
// router.get("/comments/:recipeId", commentController.getComments);

// // Route to update a comment
// router.put("/comments", commentController.updateComment);

// // Route to delete a comment
// router.delete("/comments", commentController.deleteComment);

// export default router;

import express from "express";
import commentController from "../controllers/commentController"; // Adjust the import path as needed

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments on recipes
 */

/**
 * @swagger
 * /newcomment:
 *   post:
 *     summary: Add a new comment to a recipe
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - userId
 *               - content
 *             properties:
 *               recipeId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 42
 *               content:
 *                 type: string
 *                 example: "This recipe is amazing!"
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       500:
 *         description: Error adding comment
 */
router.post("/newcomment", commentController.addComment);

/**
 * @swagger
 * /comments/{recipeId}:
 *   get:
 *     summary: Get all comments for a specific recipe
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe
 *     responses:
 *       200:
 *         description: List of comments for the recipe
 *       500:
 *         description: Error fetching comments
 */
router.get("/comments/:recipeId", commentController.getComments);

/**
 * @swagger
 * /comments:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentId
 *               - userId
 *               - content
 *             properties:
 *               commentId:
 *                 type: integer
 *                 example: 5
 *               userId:
 *                 type: integer
 *                 example: 42
 *               content:
 *                 type: string
 *                 example: "Updated comment text."
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found or unauthorized
 *       500:
 *         description: Error updating comment
 */
router.put("/comments", commentController.updateComment);

/**
 * @swagger
 * /comments:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentId
 *               - userId
 *             properties:
 *               commentId:
 *                 type: integer
 *                 example: 5
 *               userId:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found or unauthorized
 *       500:
 *         description: Error deleting comment
 */
router.delete("/comments", commentController.deleteComment);

export default router;


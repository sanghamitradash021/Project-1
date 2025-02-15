import express from "express";
import commentController from "../controllers/commentController"; // Adjust the import path as needed

const router = express.Router();

// Route to add a comment
router.post("/newcomment", commentController.addComment);

// Route to get all comments for a specific recipe
router.get("/comments/:recipeId", commentController.getComments);

// Route to update a comment
router.put("/comments", commentController.updateComment);

// Route to delete a comment
router.delete("/comments", commentController.deleteComment);

export default router;

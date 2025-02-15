import express from "express";
import ratingController from "../controllers/ratingController";

const router = express.Router();

// Add rating
router.post("/rate", ratingController.addRating);


// Get average rating for a recipe
router.get("/rate/:recipeId", ratingController.getRating);

// Update rating
router.put("/rate", ratingController.updateRating);

// Delete rating
router.delete("/rate", ratingController.deleteRating);

export default router;

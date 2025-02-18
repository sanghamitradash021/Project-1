"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ratingController_1 = __importDefault(require("../controllers/ratingController"));
const router = express_1.default.Router();
/**
 * @swagger
 * /rate:
 *   post:
 *     summary: Add a rating for a recipe
 *     description: Add a rating for a specific recipe by a user. If the user has already rated the recipe, it will be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 description: Rating value (1-5)
 *     responses:
 *       201:
 *         description: Rating added successfully
 *       200:
 *         description: Rating updated successfully
 *       500:
 *         description: Error adding or updating rating
 */
router.post("/rate", ratingController_1.default.addRating);
/**
 * @swagger
 * /rate/{recipeId}:
 *   get:
 *     summary: Get the average rating for a recipe
 *     description: Retrieve the average rating of a specific recipe.
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         type: integer
 *         description: Recipe ID to get the average rating for
 *     responses:
 *       200:
 *         description: Average rating retrieved successfully
 *       500:
 *         description: Error fetching rating
 */
router.get("/rate/:recipeId", ratingController_1.default.getRating);
/**
 * @swagger
 * /rate:
 *   put:
 *     summary: Update a rating for a recipe
 *     description: Update an existing rating for a specific recipe by a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratingId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       404:
 *         description: Rating not found or unauthorized
 *       500:
 *         description: Error updating rating
 */
router.put("/rate", ratingController_1.default.updateRating);
/**
 * @swagger
 * /rate:
 *   delete:
 *     summary: Delete a rating for a recipe
 *     description: Delete a specific rating for a recipe based on the rating ID and user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratingId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found or unauthorized
 *       500:
 *         description: Error deleting rating
 */
router.delete("/rate", ratingController_1.default.deleteRating);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = __importDefault(require("../controllers/commentController")); // Adjust the import path as needed
const router = express_1.default.Router();
// Route to add a comment
router.post("/newcomment", commentController_1.default.addComment);
// Route to get all comments for a specific recipe
router.get("/comments/:recipeId", commentController_1.default.getComments);
// Route to update a comment
router.put("/comments", commentController_1.default.updateComment);
// Route to delete a comment
router.delete("/comments", commentController_1.default.deleteComment);
exports.default = router;

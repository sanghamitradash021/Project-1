"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ratingController_1 = __importDefault(require("../controllers/ratingController"));
const router = express_1.default.Router();
// Add rating
router.post("/rate", ratingController_1.default.addRating);
// Get average rating for a recipe
router.get("/rate/:recipeId", ratingController_1.default.getRating);
// Update rating
router.put("/rate", ratingController_1.default.updateRating);
// Delete rating
router.delete("/rate", ratingController_1.default.deleteRating);
exports.default = router;

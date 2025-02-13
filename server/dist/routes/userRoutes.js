"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
// Register Route (POST)
router.post("/register", userController_1.default.register);
// Login Route (POST)
router.post("/login", userController_1.default.login);
// Get Profile Route (GET) - ID passed in URL
router.get("/profile/:id", userController_1.default.getProfile);
// Update Profile Route (PATCH) - ID passed in URL
router.patch("/profile/:id", userController_1.default.updateProfilePatch);
// Delete User Route (DELETE) - ID passed in URL
router.delete("/user/:id", userController_1.default.deleteUser);
exports.default = router;

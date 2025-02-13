import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// Register Route (POST)
router.post("/register", userController.register);

// Login Route (POST)
router.post("/login", userController.login);

// Get Profile Route (GET) - ID passed in URL
router.get("/profile/:id", userController.getProfile);

// Update Profile Route (PATCH) - ID passed in URL
router.patch("/profile/:id", userController.updateProfilePatch);

// Delete User Route (DELETE) - ID passed in URL
router.delete("/user/:id", userController.deleteUser);

export default router;

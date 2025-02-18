


import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import User from "../models/user";

/**
 * Registers a new user.
 * 
 * @param {Request} req - The request object, containing the user registration data in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const userExists = await userRepository.findByEmail(req.body.email);
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const userId = await userRepository.create(req.body);
        if (!userId) {
            res.status(500).json({ message: "Failed to create user" });
            return;
        }

        res.json({ message: "Profile created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in registering", error });
    }
};

/**
 * Logs in an existing user and provides a JWT token.
 * 
 * @param {Request} req - The request object, containing the user's email and password in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepository.validateCredentials(req.body.email, req.body.password);
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

        res.json({ user: { id: user.user_id, username: user.username, email: user.email, fullname: user.fullname }, token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

/**
 * Retrieves the profile information of a user by their ID.
 * 
 * @param {Request} req - The request object, containing the user ID in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepository.findById(Number(req.params.id));
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};

/**
 * Updates the profile information of a user.
 * 
 * @param {Request} req - The request object, containing the updated user data in the body and user ID in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await userRepository.update(Number(req.params.id), req.body);
        if (!success) {
            res.status(400).json({ message: "Failed to update profile" });
            return;
        }
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
};

/**
 * Deletes a user by their ID.
 * 
 * @param {Request} req - The request object, containing the user ID in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await userRepository.delete(Number(req.params.id));
        if (!success) {
            res.status(400).json({ message: "Failed to delete user" });
            return;
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

export default { register, login, getProfile, updateProfile, deleteUser };

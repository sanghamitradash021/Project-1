"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const register = async (req, res) => {
    try {
        const { username, email, password, fullname, role } = req.body;
        const [existinguser] = (await database_1.sequelize.query("SELECT * FROM Users WHERE email = :email", {
            replacements: { email },
            type: sequelize_1.QueryTypes.SELECT,
        }));
        if (existinguser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const [newuser] = await database_1.sequelize.query(`INSERT INTO Users (username,email,password,fullname, role, createdAt, updatedAt)
        VALUES (:username, :email, :password, :fullname, :role, NOW(), NOW())`, {
            replacements: {
                username,
                email,
                password: hashedPassword,
                fullname,
                role,
            },
            type: sequelize_1.QueryTypes.INSERT,
        });
        const [idResult] = await database_1.sequelize.query("SELECT LAST_INSERT_ID() as id", {
            type: sequelize_1.QueryTypes.SELECT,
        });
        const user_id = idResult.id;
        if (!user_id) {
            res.status(500).json({ message: "Failed to create user" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error in registering", error });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [user] = await database_1.sequelize.query("SELECT user_id, username, email, password AS password_hash, fullname FROM Users WHERE email = :email", { replacements: { email }, type: sequelize_1.QueryTypes.SELECT });
        console.log("User fetched:", user); // Debugging
        if (!user || !user.password_hash) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        console.log("Stored hash:", user.password_hash);
        console.log("Entered password:", password);
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.user_id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d",
        });
        res.json({ user: { id: user.user_id, username: user.username, email: user.email, fullname: user.fullname }, token });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};
const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const [user] = await database_1.sequelize.query("SELECT * FROM Users WHERE user_id = :id", {
            replacements: { id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};
const updateProfilePatch = async (req, res) => {
    try {
        const { username, email, password, fullname, role } = req.body;
        const { id } = req.params;
        // Update only the provided fields
        const [updatedUser] = await database_1.sequelize.query(`UPDATE Users SET username = :username, email = :email, 
             fullname = :fullname, role= :role, createdAt = Now(),updatedAt = NOW() WHERE user_id = :id`, {
            replacements: { id, username, email, fullname, role },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        res.json({ message: "Profile updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
};
// Delete User (DELETE)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await database_1.sequelize.query("DELETE FROM Users WHERE user_id = :id", {
            replacements: { id },
            type: sequelize_1.QueryTypes.DELETE,
        });
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.default = {
    register,
    login,
    getProfile,
    updateProfilePatch,
    deleteUser,
};

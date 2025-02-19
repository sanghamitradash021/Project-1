"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to authenticate user via JWT.
 *
 * This middleware checks for the presence of a valid JWT in the Authorization header of the request.
 * If the token is valid, the user information is attached to the request object. If invalid or absent,
 * the request is rejected with a 401 Unauthorized status.
 *
 * @param {Request} req - The request object containing the Authorization header.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function to be called if authentication is successful.
 * @returns {void} - The function does not return a value, but either passes control to the next middleware or sends a response.
 */
const authenticateUser = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Access denied. No token provided." });
            return;
        }
        const token = authHeader.split(" ")[1];
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        // Attach user info to the request object
        req.user = decoded;
        // Proceed to the next middleware or route
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
exports.authenticateUser = authenticateUser;

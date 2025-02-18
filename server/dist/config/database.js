"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
/**
 * Sequelize instance for connecting to the MySQL database.
 *
 * This instance is used to interact with the database for CRUD operations,
 * migrations, and syncing models.
 *
 * The configuration uses environment variables to set up the connection,
 * with fallback values in case they are not defined.
 *
 * @constant
 * @type {Sequelize}
 * @example
 * sequelize.authenticate() // Test the connection to the database
 */
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "recipe_sharing_platform", // Database name
process.env.DB_USER || "root", // Database user
process.env.DB_PASSWORD || "localhost", // Database password
{
    host: process.env.DB_HOST || "localhost", // Database host
    dialect: "mysql", // Database dialect (MySQL)
    logging: false, // Disable logging of SQL queries
});

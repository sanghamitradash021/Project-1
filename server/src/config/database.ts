import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

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
export const sequelize = new Sequelize(
    process.env.DB_NAME || "recipe_sharing_platform", // Database name
    process.env.DB_USER || "root",                   // Database user
    process.env.DB_PASSWORD || "localhost",          // Database password
    {
        host: process.env.DB_HOST || "localhost",    // Database host
        dialect: "mysql",                            // Database dialect (MySQL)
        logging: false,                              // Disable logging of SQL queries
    }
);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const syncmodel_1 = __importDefault(require("./models/syncmodel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const startServer = async () => {
    try {
        await database_1.sequelize.authenticate();
        console.log("Database connected successfully.");
        await (0, syncmodel_1.default)();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
startServer();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import syncTables from "./models/syncmodel";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        await syncTables();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer();

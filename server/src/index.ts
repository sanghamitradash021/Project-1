import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import syncTables from "./models/syncmodel";
import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import ratingRoutes from "./routes/ratingRoutes";
import commentRoutes from "./routes/commentRoutes";
import { swaggerDocs } from './swagger';

import { QueryTypes } from "sequelize";
import path from "path";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
// const bodyParser = require('body-parser');
swaggerDocs(app, PORT);

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/USERS", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/comments", commentRoutes);
// Retrieve all recipes with pagination
// app.get("/recipes", async (req, res)=>{

//     try {
//         console.log("hii")
//         const page = 1
//         const  limit = 10 
//         const offset = (Number(page) - 1) * Number(limit);

//         const [recipes] = await sequelize.query("SELECT * FROM Recipes LIMIT :limit OFFSET :offset", {
//             replacements: { limit: Number(limit), offset },
//             type: QueryTypes.SELECT,
//         });

//         console.log("Raw Query Result:", recipes);
//         res.json({ recipes });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recipes", error });
//     }
// }
// );

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

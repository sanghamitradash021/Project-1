"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from "body-parser";
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const syncmodel_1 = __importDefault(require("./models/syncmodel"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const ratingRoutes_1 = __importDefault(require("./routes/ratingRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
// const bodyParser = require('body-parser');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(bodyParser.json());
// Serve static files from the 'uploads' directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use("/api/USERS", userRoutes_1.default);
app.use("/api/recipes", recipeRoutes_1.default);
app.use("/api/ratings", ratingRoutes_1.default);
app.use("/api/comments", commentRoutes_1.default);
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

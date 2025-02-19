Recipe Sharing Platform A full-stack recipe-sharing platform built with Node.js, Express.js, MySQL, Sequelize, React.js, TypeScript, and Tailwind CSS. Users can create, view, edit, and delete recipes, comment on other users' recipes, rate recipes, and filter recipes based on meal type and cuisine. Features

User Authentication: Sign up, login, and manage authentication with JWT and bcrypt Recipe Management: Users can create, view, edit, and delete their recipes Comments: Users can comment on other users' recipes Ratings: Users can rate recipes to provide feedback Filters: Recipes can be filtered by meal type and cuisine type Admin Analytics: Admins can manage users and view platform analytics

Technologies Used Backend

Node.js Express.js Sequelize ORM (with MySQL) JWT Authentication bcrypt (for password hashing)

Frontend

React.js TypeScript Tailwind CSS

Project Setup Prerequisites

Node.js and npm installed MySQL database setup TypeScript installed globally

Backend Setup

1.Clone the repository:

bash git clone https://github.com/sanghamitradash021/Project-1.git
cd recipe-sharing-platform

2.Install dependencies:

bash npm install

3.Set up your .env file with the following environment variables:

plaintext 
DB_HOST=localhost 
DB_USER=root DB_PASSWORD=password 
DB_NAME=recipe_sharing_platform 
JWT_SECRET=your_jwt_secret



Start the backend server:

1.bash npm start The backend will run on http://localhost:3000. Frontend Setup

Navigate to the frontend directory:

bash cd frontend

Install dependencies:

bash npm install

Start the frontend:

bash npm start The frontend will run on http://localhost:3001. API Endpoints Authentication

POST /api/auth/signup: Register a new user POST /api/auth/login: Login and get JWT token

Recipes

GET /api/recipes: Get all recipes GET /api/recipes/:id: Get a specific recipe by ID POST /api/recipes: Create a new recipe PUT /api/recipes/:id: Edit an existing recipe DELETE /api/recipes/:id: Delete a recipe

Comments

POST /api/recipes/:recipeId/comments: Add a comment to a recipe GET /api/recipes/:recipeId/comments: Get all comments for a specific recipe

Ratings

POST /api/recipes/:recipeId/rating: Rate a recipe GET /api/recipes/:recipeId/ratings: Get all ratings for a specific recipe

Filters

GET /api/recipes?mealType=<mealType>&cuisineType=<cuisineType>: Get recipes filtered by meal type and cuisine type



Database Schema Tables

Users: Stores user information Recipes: Stores recipe details including name, ingredients, description, meal type, and cuisine type Comments: Stores user comments for recipes Ratings: Stores ratings for recipes Favorites: Stores favorite recipes for users Tags: Stores tags associated with recipes

Contributing

Acknowledgements

Inspired by various recipe-sharing platforms Thanks to the open-source community for helpful libraries and tools

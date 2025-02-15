// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const MyRecipes: React.FC = () => {
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // ✅ Function to navigate to recipe details
//   const handleViewMore = (recipeId: number) => {
//     navigate(`/recipe/${recipeId}`); // Navigate with the recipe ID
//   };

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const token = sessionStorage.getItem('token');
//         const userId = sessionStorage.getItem('user_id'); // Get user_id from sessionStorage

//         if (!token || !userId) {
//           setError('User is not authenticated.');
//           console.error('User is not authenticated.');
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:3000/api/recipes/my-recipes/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.length === 0) {
//           setError('No recipes found.');
//         }

//         setRecipes(response.data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setError('Error fetching recipes.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <div key={recipe.id} className="border rounded-lg p-4 shadow-md">
//               <h3 className="font-bold">{recipe.title}</h3>
//               <p className="text-sm text-gray-600">{recipe.description}</p>
//               {/* <button

//                 onClick={() => handleViewMore(recipe.id)} // Pass the recipe id
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//               > */}
//               <button
//                 onClick={() => {
//                   console.log('Clicked recipe ID:', recipe.recipe_id); // Log the recipe ID
//                   handleViewMore(recipe.recipe_id);
//                 }}
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 View More
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No recipes available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyRecipes;

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

const MyRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleViewMore = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("user_id");

        if (!token || !userId) {
          setError("User is not authenticated.");
          console.error("User is not authenticated.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/recipes/my-recipes/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length === 0) {
          setError("No recipes found.");
        }

        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Error fetching recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 min-h-screen p-8">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800">
        My Culinary Creations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
                  {recipe.cuisine}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{recipe.preparationTime} mins</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                    {recipe.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => handleViewMore(recipe.recipe_id)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-2xl text-gray-500">No recipes available.</p>
            <button
              onClick={() => navigate("/create-recipe")}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Create Your First Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;

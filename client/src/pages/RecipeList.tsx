// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const RecipeList: React.FC = () => {
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/recipes/getall"
//         );
//         console.log("Fetched recipes:", response.data); // ✅ Debugging API response
//         setRecipes(response.data);
//       } catch (error) {
//         setRecipes([
//           {
//             recipe_id: 1,
//             user_id: 1,
//             title: "Spaghetti Carbonara",
//             description: "A classic Italian pasta dish.",
//             ingredients: [
//               "spaghetti",
//               "eggs",
//               "cheese",
//               "bacon",
//               "black pepper",
//             ],
//             instructions:
//               "Cook pasta. Fry bacon. Mix eggs and cheese. Combine everything.",
//             preparationTime: 20,
//             difficulty: "Medium",
//             image: "carbonara.jpg",
//             cuisine: "Italian",
//             mealType: "Dinner",
//             createdAt: "2025-02-12T22:43:20.000Z",
//             updatedAt: "2025-02-12T22:43:20.000Z",
//           },
//           {
//             recipe_id: 2,
//             user_id: 5,
//             title: "Chicken dum Biryani",
//             description:
//               "A fragrant and flavorful rice dish made with marinated chicken, spices, and basmati rice.",
//             ingredients: [
//               "Basmati rice",
//               "Chicken",
//               "Yogurt",
//               "Onions",
//               "Tomatoes",
//               "Garlic",
//               "Ginger",
//               "Green chilies",
//               "Biryani masala",
//               "Turmeric",
//               "Coriander",
//               "Cumin",
//               "Ghee",
//               "Saffron",
//               "Milk",
//               "Salt",
//             ],
//             instructions:
//               "Marinate chicken with yogurt and spices. Cook onions and tomatoes with chicken. Layer with rice. Add saffron milk. Cook on low heat until rice is fully done.",
//             preparationTime: 45,
//             difficulty: "Hard",
//             image: null,
//             cuisine: "Indian",
//             mealType: "Lunch",
//             createdAt: "2025-02-12T18:46:41.000Z",
//             updatedAt: "2025-02-13T02:27:22.000Z",
//           },
//           {
//             recipe_id: 6,
//             user_id: 4,
//             title: "Indian Green Curry",
//             description:
//               "A flavorful and spicy Thai curry made with coconut milk, green curry paste, and fresh vegetables.",
//             ingredients: [
//               "Chicken breast",
//               "Coconut milk",
//               "Green curry paste",
//               "Thai basil",
//               "Kaffir lime leaves",
//               "Fish sauce",
//               "Sugar",
//               "Bell peppers",
//               "Zucchini",
//               "Eggplant",
//               "Garlic",
//               "Ginger",
//               "Lemongrass",
//               "Cilantro",
//               "Jasmine rice",
//             ],
//             instructions:
//               "Sauté green curry paste with coconut milk. Add chicken and cook. Stir in vegetables, fish sauce, and sugar. Simmer until veggies are tender. Garnish with Thai basil and serve with jasmine rice.",
//             preparationTime: 30,
//             difficulty: "Medium",
//             image: null,
//             cuisine: "Thai",
//             mealType: "Dinner",
//             createdAt: "2025-02-13T05:50:46.000Z",
//             updatedAt: "2025-02-13T05:50:46.000Z",
//           },
//           {
//             recipe_id: 8,
//             user_id: 11,
//             title: "Potato Discs",
//             description:
//               "Crispy, golden, and perfectly seasoned potato discs, perfect as a side dish or a snack.",
//             ingredients:
//               "4 large potatoes\r\n2 tbsp olive oil\r\n1 tsp garlic powder\r\n1 tsp onion powder\r\n1 tsp paprika\r\nSalt and pepper to taste\r\nFresh parsley (for garnish)",
//             instructions:
//               "Preheat the oven to 400°F (200°C).\r\nWash and peel the potatoes. Slice them into ¼-inch thick discs.\r\nIn a bowl, toss the potato slices with olive oil, garlic powder, onion powder, paprika, salt, and pepper until well-coated.\r\nArrange the potato slices in a single layer on a baking sheet, ensuring they do not overlap.\r\nBake in the preheated oven for 25-30 minutes, flipping halfway through, until golden brown and crispy.\r\nGarnish with fresh parsley before serving.",
//             preparationTime: 20,
//             difficulty: "Easy",
//             image: "1739599798614-potatodisc.jpeg",
//             cuisine: "mexican",
//             mealType: "snack",
//             createdAt: "2025-02-15T06:09:58.000Z",
//             updatedAt: "2025-02-15T11:36:20.000Z",
//           },
//         ]);

//         console.error("Failed to fetch recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   // Function to handle recipe click
//   const handleRecipeClick = (id: number) => {
//     navigate(`/recipes/${id}`); // Navigate to recipe details page
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">All Recipes</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <div
//               key={recipe.recipe_id} // Ensure unique key
//               className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg"
//               onClick={() => handleRecipeClick(recipe.recipe_id)} // Handle click to navigate
//             >
//               <img
//                 src={recipe.image || "/images/default-recipe.jpg"}
//                 alt={recipe.title}
//                 className="w-full h-56 object-cover transition-transform group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                 <h3 className="text-white text-lg font-bold">{recipe.title}</h3>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-full">
//             No recipes available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecipeList;

import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
  image: string;
  preparationTime: number;
  difficulty: string;
  cuisine: string;
  mealType: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/recipes/getall'
        );
        setRecipes(response.data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h2>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleRecipeClick(recipe.recipe_id)}
            >
              <div className="relative h-48">
                <img
                  src={recipe.image || '/images/default-recipe.jpg'}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
                  {recipe.cuisine}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {recipe.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{recipe.preparationTime} mins</span>
                  <span className="px-2 py-1 bg-gray-200 rounded-full">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600 text-center">
          No recipes available.
        </p>
      )}
    </div>
  );
};

export default RecipeList;

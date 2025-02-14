// 'use client';

// import type React from 'react';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Loader from '../components/Loader';

// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
// }

// const RecipeList: React.FC = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(
//           'http://localhost:3000/api/recipes/getall'
//         );
//         const data = await response.json();
//         console.log('API Response:', data);

//         if (data.recipes && !Array.isArray(data.recipes)) {
//           setRecipes([data.recipes]);
//         } else {
//           setRecipes(data.recipes);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">All Recipes</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {recipes.map((recipe) => (
//           <div key={recipe.id} className="bg-white p-4 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
//             <p className="text-gray-600 mb-4">{recipe.description}</p>
//             <Link
//               to={`/recipe/${recipe.id}`}
//               className="text-blue-500 hover:underline"
//             >
//               View Recipe
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecipeList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/recipes/getall'
        );
        const data = await response.json();
        console.log('API Response:', data); // Log the API response for debugging

        // Assuming the API returns an array of recipe objects
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('Invalid recipe data:', data);
          setRecipes([]); // Fallback if the data is not as expected
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.recipe_id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            <Link
              to={`/recipe/${recipe.recipe_id}`}
              className="text-blue-500 hover:underline"
            >
              View Recipe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;

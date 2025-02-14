// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Loader from '../components/Loader';

// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   ingredients: string[];
//   instructions: string;
//   preparationTime: number;
//   difficulty: string;
//   cuisine: string;
//   mealType: string;
//   image?: string;
// }

// const RecipeDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
//         const data = await response.json();
//         setRecipe(data);
//       } catch (error) {
//         console.error('Error fetching recipe:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (loading) return <Loader />;
//   if (!recipe) return <p>Recipe not found.</p>;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>

//       <p className="text-gray-600 mt-2">{recipe.description}</p>

//       <div className="mt-4 text-sm text-gray-500">
//         <p>
//           <strong>Preparation Time:</strong> {recipe.preparationTime} minutes
//         </p>
//         <p>
//           <strong>Difficulty:</strong> {recipe.difficulty}
//         </p>
//         <p>
//           <strong>Cuisine:</strong> {recipe.cuisine}
//         </p>
//         <p>
//           <strong>Meal Type:</strong> {recipe.mealType}
//         </p>
//       </div>

//       <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
//       <ul className="list-disc list-inside text-gray-700">
//         {recipe.ingredients.map((ingredient, index) => (
//           <li key={index}>{ingredient}</li>
//         ))}
//       </ul>

//       <h3 className="text-lg font-semibold mt-4">Steps:</h3>
//       <p className="text-gray-700">{recipe.instructions}</p>

//       {recipe.image && (
//         <div className="mt-4">
//           <img
//             src={`/images/${recipe.image}`}
//             alt={recipe.title}
//             className="w-full h-auto rounded-md shadow-sm"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
  image: string | null;
  instructions: string;
  ingredients: string[];
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
        const data = await response.json();

        // If the API returns the recipe successfully
        if (data) {
          setRecipe(data);
        } else {
          console.error('Recipe not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={recipe.image || 'default-image.jpg'} // Use a default image if none exists
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-gray-700 mb-6">{recipe.description}</p>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Instructions
            </h2>
            <div className="text-gray-700 whitespace-pre-line">
              {recipe.instructions}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

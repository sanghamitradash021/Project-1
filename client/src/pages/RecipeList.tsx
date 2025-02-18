// import type React from 'react';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface Recipe {
//   recipe_id: number;
//   title: string;
//   description: string;
//   image: string;
//   preparationTime: number;
//   difficulty: string;
//   cuisine: string;
//   mealType: string;
// }

// const RecipeList: React.FC = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:3000/api/recipes/getall'
//         );
//         setRecipes(response.data);
//       } catch (error) {
//         console.error('Failed to fetch recipes:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleRecipeClick = (id: number) => {
//     navigate(`/recipes/${id}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h2>
//       {recipes.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {recipes.map((recipe) => (
//             <div
//               key={recipe.recipe_id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//               onClick={() => handleRecipeClick(recipe.recipe_id)}
//             >
//               <div className="relative h-48">
//                 <img
//                   src={recipe.image || '/images/default-recipe.jpg'}
//                   alt={recipe.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
//                   {recipe.cuisine}
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {recipe.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 line-clamp-2 mb-3">
//                   {recipe.description}
//                 </p>
//                 <div className="flex justify-between items-center text-sm text-gray-500">
//                   <span>{recipe.preparationTime} mins</span>
//                   <span className="px-2 py-1 bg-gray-200 rounded-full">
//                     {recipe.difficulty}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-xl text-gray-600 text-center">
//           No recipes available.
//         </p>
//       )}
//     </div>
//   );
// };

// export default RecipeList;

// import type React from 'react';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// /**
//  * Interface representing the structure of a Recipe object.
//  */
// interface Recipe {
//   recipe_id: number; // Unique identifier for the recipe
//   title: string; // Title of the recipe
//   description: string; // Short description of the recipe
//   image: string; // URL of the recipe image
//   preparationTime: number; // Preparation time for the recipe in minutes
//   difficulty: string; // Difficulty level of the recipe
//   cuisine: string; // Cuisine type of the recipe
//   mealType: string; // Meal type (e.g., breakfast, lunch, dinner)
// }

// /**
//  * RecipeList component that fetches and displays a list of recipes.
//  *
//  * @component
//  * @example
//  * return (
//  *   <RecipeList />
//  * )
//  */
// const RecipeList: React.FC = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]); // State to hold the list of recipes
//   const [loading, setLoading] = useState(true); // State to track the loading status
//   const navigate = useNavigate(); // Hook to navigate to different routes

//   /**
//    * Fetches all the recipes from the server and updates the state.
//    * This function is called once when the component mounts.
//    */
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:3000/api/recipes/getall'
//         );
//         setRecipes(response.data); // Sets the recipes state with fetched data
//       } catch (error) {
//         console.error('Failed to fetch recipes:', error);
//       } finally {
//         setLoading(false); // Set loading to false after the fetch attempt
//       }
//     };

//     fetchRecipes(); // Call the function to fetch recipes
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   /**
//    * Handles the click event on a recipe item and navigates to the recipe's detail page.
//    *
//    * @param {number} id - The unique ID of the recipe
//    */
//   const handleRecipeClick = (id: number) => {
//     navigate(`/recipes/${id}`); // Navigate to the recipe detail page with the recipe ID
//   };

//   // Show a loading spinner while recipes are being fetched
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h2>
//       {recipes.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {recipes.map((recipe) => (
//             <div
//               key={recipe.recipe_id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//               onClick={() => handleRecipeClick(recipe.recipe_id)}
//             >
//               <div className="relative h-48">
//                 <img
//                   src={recipe.image || '/images/default-recipe.jpg'}
//                   alt={recipe.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
//                   {recipe.cuisine}
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {recipe.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 line-clamp-2 mb-3">
//                   {recipe.description}
//                 </p>
//                 <div className="flex justify-between items-center text-sm text-gray-500">
//                   <span>{recipe.preparationTime} mins</span>
//                   <span className="px-2 py-1 bg-gray-200 rounded-full">
//                     {recipe.difficulty}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-xl text-gray-600 text-center">
//           No recipes available.
//         </p>
//       )}
//     </div>
//   );
// };

// export default RecipeList;

import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONSTANTS } from '../constants/RecipelistConstant'; // Import constants

/**
 * Interface representing the structure of a Recipe object.
 */
interface Recipe {
  recipe_id: number; // Unique identifier for the recipe
  title: string; // Title of the recipe
  description: string; // Short description of the recipe
  image: string; // URL of the recipe image
  preparationTime: number; // Preparation time for the recipe in minutes
  difficulty: string; // Difficulty level of the recipe
  cuisine: string; // Cuisine type of the recipe
  mealType: string; // Meal type (e.g., breakfast, lunch, dinner)
}

/**
 * RecipeList component that fetches and displays a list of recipes.
 *
 * @component
 * @example
 * return (
 *   <RecipeList />
 * )
 */
const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // State to hold the list of recipes
  const [loading, setLoading] = useState(true); // State to track the loading status
  const navigate = useNavigate(); // Hook to navigate to different routes

  /**
   * Fetches all the recipes from the server and updates the state.
   * This function is called once when the component mounts.
   */
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(CONSTANTS.API_URL); // Use constant API URL
        setRecipes(response.data); // Sets the recipes state with fetched data
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    fetchRecipes(); // Call the function to fetch recipes
  }, []); // Empty dependency array means this effect runs once when the component mounts

  /**
   * Handles the click event on a recipe item and navigates to the recipe's detail page.
   *
   * @param {number} id - The unique ID of the recipe
   */
  const handleRecipeClick = (id: number) => {
    navigate(`/recipes/${id}`); // Navigate to the recipe detail page with the recipe ID
  };

  // Show a loading spinner while recipes are being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className={CONSTANTS.LOADING_SPINNER_CLASSES}></div>{' '}
        {/* Use constant spinner classes */}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {CONSTANTS.ALL_RECIPES_TITLE}
      </h2>{' '}
      {/* Use constant title */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className={CONSTANTS.RECIPE_ITEM_CLASSES} // Use constant recipe item classes
              onClick={() => handleRecipeClick(recipe.recipe_id)}
            >
              <div className="relative h-48">
                <img
                  src={recipe.image || '/images/default-recipe.jpg'}
                  alt={recipe.title}
                  className={CONSTANTS.RECIPE_IMAGE_CLASSES} // Use constant image classes
                />
                <div className={CONSTANTS.RECIPE_CUISINE_CLASSES}>
                  {recipe.cuisine}
                </div>
              </div>
              <div className="p-4">
                <h3 className={CONSTANTS.RECIPE_TITLE_CLASSES}>
                  {recipe.title}
                </h3>{' '}
                {/* Use constant title classes */}
                <p className={CONSTANTS.RECIPE_DESCRIPTION_CLASSES}>
                  {recipe.description}
                </p>{' '}
                {/* Use constant description classes */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{recipe.preparationTime} mins</span>
                  <span className={CONSTANTS.RECIPE_DIFFICULTY_CLASSES}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600 text-center">
          {CONSTANTS.NO_RECIPES_MESSAGE} {/* Use constant no recipes message */}
        </p>
      )}
    </div>
  );
};

export default RecipeList;

// import type React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import { motion } from "framer-motion";

// const MyRecipes: React.FC = () => {
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleViewMore = (recipeId: number) => {
//     navigate(`/recipe/${recipeId}`);
//   };

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const token = sessionStorage.getItem('token');
//         const userId = sessionStorage.getItem('user_id');

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

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div
//           className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//           role="alert"
//         >
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="bg-gradient-to-r from-indigo-50 to-blue-50 min-h-screen p-8">
//       <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800 mt-5">
//         My Culinary Creations
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <div
//               key={recipe.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105
//               whileHover={{ y: -5 }}"
//             >
//               <div className="relative h-48">
//                 <img
//                   src={recipe.image || '/placeholder.svg'}
//                   alt={recipe.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
//                   {recipe.cuisine}
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="font-bold text-xl mb-2 text-gray-800">
//                   {recipe.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4 line-clamp-2">
//                   {recipe.description}
//                 </p>
//                 <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
//                   <span>{recipe.preparationTime} mins</span>
//                   <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
//                     {recipe.difficulty}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleViewMore(recipe.recipe_id)}
//                   className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
//                 >
//                   View Recipe
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center">
//             <p className="text-2xl text-gray-500">No recipes available.</p>
//             <button
//               onClick={() => navigate('/create-recipe')}
//               className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
//             >
//               Create Your First Recipe
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyRecipes;

// import type React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import { motion } from "framer-motion";

// /**
//  * MyRecipes component displays the user's recipes.
//  * It handles loading state, error handling, fetching recipes from the API, and navigating to individual recipes.
//  */
// const MyRecipes: React.FC = () => {
//   /**
//    * List of recipes owned by the user
//    */
//   const [recipes, setRecipes] = useState<any[]>([]);

//   /**
//    * Loading state for fetching data
//    */
//   const [loading, setLoading] = useState(false);

//   /**
//    * Error state for displaying errors
//    */
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   /**
//    * Handles navigation to the individual recipe page when a "View Recipe" button is clicked
//    * @param {number} recipeId - The ID of the recipe to navigate to
//    */
//   const handleViewMore = (recipeId: number) => {
//     navigate(`/recipe/${recipeId}`);
//   };

//   /**
//    * Effect hook that fetches the user's recipes from the API upon component mount
//    */
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const token = sessionStorage.getItem('token');
//         const userId = sessionStorage.getItem('user_id');

//         // Check if user is authenticated
//         if (!token || !userId) {
//           setError('User is not authenticated.');
//           console.error('User is not authenticated.');
//           return;
//         }

//         // Fetch user's recipes from the backend API
//         const response = await axios.get(
//           `http://localhost:3000/api/recipes/my-recipes/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Handle the case where no recipes are found
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

//   // If the data is still loading, display a loading spinner
//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );

//   // If an error occurs, display an error message
//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div
//           className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//           role="alert"
//         >
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="bg-gradient-to-r from-indigo-50 to-blue-50 min-h-screen p-8">
//       <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800 mt-5">
//         My Culinary Creations
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <div
//               key={recipe.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105
//               whileHover={{ y: -5 }}"
//             >
//               <div className="relative h-48">
//                 <img
//                   src={recipe.image || '/placeholder.svg'}
//                   alt={recipe.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
//                   {recipe.cuisine}
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="font-bold text-xl mb-2 text-gray-800">
//                   {recipe.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4 line-clamp-2">
//                   {recipe.description}
//                 </p>
//                 <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
//                   <span>{recipe.preparationTime} mins</span>
//                   <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
//                     {recipe.difficulty}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleViewMore(recipe.recipe_id)}
//                   className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
//                 >
//                   View Recipe
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center">
//             <p className="text-2xl text-gray-500">No recipes available.</p>
//             <button
//               onClick={() => navigate('/create-recipe')}
//               className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
//             >
//               Create Your First Recipe
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyRecipes;

// MyRecipes.tsx
import type React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyRecipesConstants } from '../constants/MyrecipesConstant'; // Import the constants

/**
 * MyRecipes component displays the user's recipes.
 * It handles loading state, error handling, fetching recipes from the API, and navigating to individual recipes.
 */
const MyRecipes: React.FC = () => {
  /**
   * List of recipes owned by the user
   */
  const [recipes, setRecipes] = useState<any[]>([]);

  /**
   * Loading state for fetching data
   */
  const [loading, setLoading] = useState(false);

  /**
   * Error state for displaying errors
   */
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Handles navigation to the individual recipe page when a "View Recipe" button is clicked
   * @param {number} recipeId - The ID of the recipe to navigate to
   */
  const handleViewMore = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  /**
   * Effect hook that fetches the user's recipes from the API upon component mount
   */
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        // const token = sessionStorage.getItem('token');
        // const userId = sessionStorage.getItem('user_id');
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        const token = sessionStorage.getItem('token');

        // Check if user is authenticated
        if (!token || !user.id) {
          setError(MyRecipesConstants.userNotAuthenticated); // Use constant
          console.error(MyRecipesConstants.userNotAuthenticated); // Use constant
          return;
        }

        // Fetch user's recipes from the backend API
        const response = await axios.get(
          `${MyRecipesConstants.apiUrl}${user.id}`, // Use constant
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the case where no recipes are found
        if (response.data.length === 0) {
          setError(MyRecipesConstants.noRecipesFound); // Use constant
        }

        setRecipes(response.data);
      } catch (error) {
        console.error(MyRecipesConstants.errorFetchingRecipes, error); // Use constant
        setError(MyRecipesConstants.errorFetchingRecipes); // Use constant
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // If the data is still loading, display a loading spinner
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  // If an error occurs, display an error message
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
      <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800 mt-5">
        {MyRecipesConstants.title} {/* Use constant */}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={MyRecipesConstants.recipeCardClasses}
            >
              <div className="relative h-48">
                <img
                  src={recipe.image || '/placeholder.svg'}
                  alt={recipe.title}
                  className={MyRecipesConstants.recipeImageClasses}
                />
                <div className={MyRecipesConstants.recipeCuisineClasses}>
                  {recipe.cuisine}
                </div>
              </div>
              <div className={MyRecipesConstants.recipeDetailsClasses}>
                {' '}
                {/* Use constant */}
                <h3 className={MyRecipesConstants.recipeTitleClasses}>
                  {' '}
                  {/* Use constant */}
                  {recipe.title}
                </h3>
                <p className={MyRecipesConstants.recipeDescriptionClasses}>
                  {' '}
                  {/* Use constant */}
                  {recipe.description}
                </p>
                <div className={MyRecipesConstants.recipeTimeClasses}>
                  {' '}
                  {/* Use constant */}
                  <span>{recipe.preparationTime} mins</span>
                  <span className={MyRecipesConstants.recipeDifficultyClasses}>
                    {' '}
                    {/* Use constant */}
                    {recipe.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => handleViewMore(recipe.recipe_id)}
                  className={MyRecipesConstants.viewRecipeButtonClasses}
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-2xl text-gray-500">
              {MyRecipesConstants.noRecipesAvailableMessage}
            </p>{' '}
            {/* Use constant */}
            <button
              onClick={() => navigate('/create-recipe')}
              className={MyRecipesConstants.createRecipeButtonClasses}
            >
              {MyRecipesConstants.createFirstRecipeMessage} {/* Use constant */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;

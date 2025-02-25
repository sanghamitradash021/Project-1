// import type React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { MyRecipesConstants } from '../constants/MyrecipesConstant'; // Import the constants

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
//         // const token = sessionStorage.getItem('token');
//         // const userId = sessionStorage.getItem('user_id');
//         const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//         const token = sessionStorage.getItem('token');

//         // Check if user is authenticated
//         if (!token || !user.id) {
//           setError(MyRecipesConstants.userNotAuthenticated); // Use constant
//           console.error(MyRecipesConstants.userNotAuthenticated); // Use constant
//           return;
//         }

//         // Fetch user's recipes from the backend API
//         const response = await axios.get(
//           `${MyRecipesConstants.apiUrl}${user.id}`, // Use constant
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Handle the case where no recipes are found
//         if (response.data.length === 0) {
//           setError(MyRecipesConstants.noRecipesFound); // Use constant
//         }

//         setRecipes(response.data);
//       } catch (error) {
//         console.error(MyRecipesConstants.errorFetchingRecipes, error); // Use constant
//         setError(MyRecipesConstants.errorFetchingRecipes); // Use constant
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
//         {MyRecipesConstants.title} {/* Use constant */}
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <div
//               key={recipe.id}
//               className={MyRecipesConstants.recipeCardClasses}
//             >
//               <div className="relative h-48">
//                 <img
//                   src={recipe.image || '/placeholder.svg'}
//                   alt={recipe.title}
//                   className={MyRecipesConstants.recipeImageClasses}
//                 />
//                 <div className={MyRecipesConstants.recipeCuisineClasses}>
//                   {recipe.cuisine}
//                 </div>
//               </div>
//               <div className={MyRecipesConstants.recipeDetailsClasses}>
//                 {' '}
//                 {/* Use constant */}
//                 <h3 className={MyRecipesConstants.recipeTitleClasses}>
//                   {' '}
//                   {/* Use constant */}
//                   {recipe.title}
//                 </h3>
//                 <p className={MyRecipesConstants.recipeDescriptionClasses}>
//                   {' '}
//                   {/* Use constant */}
//                   {recipe.description}
//                 </p>
//                 <div className={MyRecipesConstants.recipeTimeClasses}>
//                   {' '}
//                   {/* Use constant */}
//                   <span>{recipe.preparationTime} mins</span>
//                   <span className={MyRecipesConstants.recipeDifficultyClasses}>
//                     {' '}
//                     {/* Use constant */}
//                     {recipe.difficulty}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleViewMore(recipe.recipe_id)}
//                   className={MyRecipesConstants.viewRecipeButtonClasses}
//                 >
//                   View Recipe
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center">
//             <p className="text-2xl text-gray-500">
//               {MyRecipesConstants.noRecipesAvailableMessage}
//             </p>{' '}
//             {/* Use constant */}
//             <button
//               onClick={() => navigate('/create-recipe')}
//               className={MyRecipesConstants.createRecipeButtonClasses}
//             >
//               {MyRecipesConstants.createFirstRecipeMessage} {/* Use constant */}
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
// import { MyRecipesConstants } from '../constants/MyrecipesConstant';

// const MyRecipes: React.FC = () => {
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Default: Newest First

//   const navigate = useNavigate();

//   const handleViewMore = (recipeId: number) => {
//     navigate(`/recipe/${recipeId}`);
//   };

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//         const token = sessionStorage.getItem('token');

//         if (!token || !user.id) {
//           setError(MyRecipesConstants.userNotAuthenticated);
//           console.error(MyRecipesConstants.userNotAuthenticated);
//           return;
//         }

//         const response = await axios.get(
//           `${MyRecipesConstants.apiUrl}${user.id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (response.data.length === 0) {
//           setError(MyRecipesConstants.noRecipesFound);
//         }

//         setRecipes(response.data);
//       } catch (error) {
//         console.error(MyRecipesConstants.errorFetchingRecipes, error);
//         setError(MyRecipesConstants.errorFetchingRecipes);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   // Sorting function
//   const sortedRecipes = [...recipes].sort((a, b) => {
//     const dateA = new Date(a.createdAt).getTime();
//     const dateB = new Date(b.createdAt).getTime();
//     return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//   });

//   return (
//     <div className="bg-gradient-to-r from-indigo-50 to-blue-50 min-h-screen p-8">
//       <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800 mt-5">
//         {MyRecipesConstants.title}
//       </h2>

//       {/* Sorting Dropdown */}
//       <div className="flex justify-end mb-4">
//         <select
//           className="border rounded-lg px-4 py-2 text-gray-700 shadow-md"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
//         >
//           <option value="desc">Newest First</option>
//           <option value="asc">Oldest First</option>
//         </select>
//       </div>

//       {loading && (
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
//         </div>
//       )}

//       {error ? (
//         <div className="flex justify-center items-center h-screen">
//           <div
//             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//             role="alert"
//           >
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {sortedRecipes.length > 0 ? (
//             sortedRecipes.map((recipe) => (
//               <div
//                 key={recipe.id}
//                 className={MyRecipesConstants.recipeCardClasses}
//               >
//                 <div className="relative h-48">
//                   <img
//                     src={recipe.image || '/placeholder.svg'}
//                     alt={recipe.title}
//                     className={MyRecipesConstants.recipeImageClasses}
//                   />
//                   <div className={MyRecipesConstants.recipeCuisineClasses}>
//                     {recipe.cuisine}
//                   </div>
//                 </div>
//                 <div className={MyRecipesConstants.recipeDetailsClasses}>
//                   <h3 className={MyRecipesConstants.recipeTitleClasses}>
//                     {recipe.title}
//                   </h3>
//                   <p className={MyRecipesConstants.recipeDescriptionClasses}>
//                     {recipe.description}
//                   </p>
//                   <div className={MyRecipesConstants.recipeTimeClasses}>
//                     <span>{recipe.preparationTime} mins</span>
//                     <span
//                       className={MyRecipesConstants.recipeDifficultyClasses}
//                     >
//                       {recipe.difficulty}
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => handleViewMore(recipe.recipe_id)}
//                     className={MyRecipesConstants.viewRecipeButtonClasses}
//                   >
//                     View Recipe
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center">
//               <p className="text-2xl text-gray-500">
//                 {MyRecipesConstants.noRecipesAvailableMessage}
//               </p>
//               <button
//                 onClick={() => navigate('/create-recipe')}
//                 className={MyRecipesConstants.createRecipeButtonClasses}
//               >
//                 {MyRecipesConstants.createFirstRecipeMessage}
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyRecipes;

import type React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyRecipesConstants } from '../constants/MyrecipesConstant';
import Cookies from 'js-cookie';

const MyRecipes: React.FC = ({ theme }) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Default: Newest First

  const navigate = useNavigate();

  const handleViewMore = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      // const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      // const token = sessionStorage.getItem('token');
      const user = JSON.parse(Cookies.get('user') || '{}');
      const token = Cookies.get('auth_token');

      if (!token || !user.id) {
        console.log('checkinggggg', token);
        setError(MyRecipesConstants.userNotAuthenticated);
        console.error(MyRecipesConstants.userNotAuthenticated);
        return;
      }

      const response = await axios.get(
        `${MyRecipesConstants.apiUrl}${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.length === 0) {
        setError(MyRecipesConstants.noRecipesFound);
      }

      setRecipes(response.data);
    } catch (error) {
      console.error(MyRecipesConstants.errorFetchingRecipes, error);
      setError(MyRecipesConstants.errorFetchingRecipes);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes on mount or when a new recipe is added
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Sorting function
  const sortedRecipes = [...recipes].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Handle new recipe creation and trigger re-fetch
  // const handleAddNewRecipe = async (newRecipe: any) => {
  //   try {
  //     const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  //     const token = sessionStorage.getItem('token');

  //     if (!token || !user.id) {
  //       setError(MyRecipesConstants.userNotAuthenticated);
  //       console.error(MyRecipesConstants.userNotAuthenticated);
  //       return;
  //     }

  //     // Add the new recipe
  //     await axios.post(`${MyRecipesConstants.apiUrl}${user.id}`, newRecipe, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     // After the recipe is added, fetch the updated list of recipes
  //     fetchRecipes();
  //   } catch (error) {
  //     console.error('Error adding recipe', error);
  //     setError('Error adding recipe');
  //   }
  // };

  // return (
  //   <div className="bg-gradient-to-r from-indigo-50 to-blue-50 min-h-screen p-8">
  //     <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800 mt-5">
  //       {MyRecipesConstants.title}
  //     </h2>

  //     {/* Sorting Dropdown */}
  //     <div className="flex justify-end mb-4">
  //       <select
  //         className="border rounded-lg px-4 py-2 text-gray-700 shadow-md"
  //         value={sortOrder}
  //         onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
  //       >
  //         <option value="desc">Newest First</option>
  //         <option value="asc">Oldest First</option>
  //       </select>
  //     </div>

  //     {loading && (
  //       <div className="flex justify-center items-center h-screen">
  //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
  //       </div>
  //     )}

  //     {error ? (
  //       <div className="flex justify-center items-center h-screen">
  //         <div
  //           className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
  //           role="alert"
  //         >
  //           <p className="font-bold">Error</p>
  //           <p>{error}</p>
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  //         {sortedRecipes.length > 0 ? (
  //           sortedRecipes.map((recipe) => (
  //             <div
  //               key={recipe.id}
  //               className={MyRecipesConstants.recipeCardClasses}
  //             >
  //               <div className="relative h-48">
  //                 <img
  //                   src={recipe.image || '/placeholder.svg'}
  //                   alt={recipe.title}
  //                   className={MyRecipesConstants.recipeImageClasses}
  //                 />
  //                 <div className={MyRecipesConstants.recipeCuisineClasses}>
  //                   {recipe.cuisine}
  //                 </div>
  //               </div>
  //               <div className={MyRecipesConstants.recipeDetailsClasses}>
  //                 <h3 className={MyRecipesConstants.recipeTitleClasses}>
  //                   {recipe.title}
  //                 </h3>
  //                 <p className={MyRecipesConstants.recipeDescriptionClasses}>
  //                   {recipe.description}
  //                 </p>
  //                 <div className={MyRecipesConstants.recipeTimeClasses}>
  //                   <span>{recipe.preparationTime} mins</span>
  //                   <span
  //                     className={MyRecipesConstants.recipeDifficultyClasses}
  //                   >
  //                     {recipe.difficulty}
  //                   </span>
  //                 </div>
  //                 <button
  //                   onClick={() => handleViewMore(recipe.recipe_id)}
  //                   className={MyRecipesConstants.viewRecipeButtonClasses}
  //                 >
  //                   View Recipe
  //                 </button>
  //               </div>
  //             </div>
  //           ))
  //         ) : (
  //           <div className="col-span-full text-center">
  //             <p className="text-2xl text-gray-500">
  //               {MyRecipesConstants.noRecipesAvailableMessage}
  //             </p>
  //             <button
  //               onClick={() => navigate('/create-recipe')}
  //               className={MyRecipesConstants.createRecipeButtonClasses}
  //             >
  //               {MyRecipesConstants.createFirstRecipeMessage}
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div
      className={`${
        theme === 'light'
          ? 'bg-gradient-to-r from-indigo-50 to-blue-50'
          : 'bg-gradient-to-r from-gray-800 to-gray-900'
      } min-h-screen p-8`} // Conditional background gradient
    >
      <h2
        className={`text-4xl font-extrabold text-center mb-12 mt-5 ${
          theme === 'light' ? 'text-indigo-800' : 'text-white'
        }`} // Conditional text color based on theme
      >
        {MyRecipesConstants.title}
      </h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className={`border rounded-lg px-4 py-2 text-gray-700 shadow-md ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'
          }`} // Conditional background and text color for the dropdown
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div
            className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 ${
              theme === 'light' ? 'border-indigo-500' : 'border-white'
            }`}
          ></div>
        </div>
      )}

      {error ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className={`${
              theme === 'light'
                ? 'bg-red-100 border-red-500 text-red-700'
                : 'bg-red-900 border-red-700 text-red-100'
            } border-l-4 p-4`}
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRecipes.length > 0 ? (
            sortedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className={`${MyRecipesConstants.recipeCardClasses} ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'
                }`} // Conditional background for recipe cards
              >
                <div className="relative h-48">
                  <img
                    src={recipe.image || '/placeholder.svg'}
                    alt={recipe.title}
                    className={MyRecipesConstants.recipeImageClasses}
                  />
                  <div
                    className={`${MyRecipesConstants.recipeCuisineClasses} ${
                      theme === 'light' ? 'text-gray-900' : 'text-gray-300'
                    }`}
                  >
                    {recipe.cuisine}
                  </div>
                </div>
                <div
                  className={`${MyRecipesConstants.recipeDetailsClasses} ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`} // Conditional text color
                >
                  <h3
                    className={`${MyRecipesConstants.recipeTitleClasses} ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {recipe.title}
                  </h3>
                  <p
                    className={`${
                      MyRecipesConstants.recipeDescriptionClasses
                    } ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                  >
                    {recipe.description}
                  </p>
                  <div
                    className={`${MyRecipesConstants.recipeTimeClasses} ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  >
                    <span>{recipe.preparationTime} mins</span>
                    <span
                      className={MyRecipesConstants.recipeDifficultyClasses}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={() => handleViewMore(recipe.recipe_id)}
                    className={`${MyRecipesConstants.viewRecipeButtonClasses} ${
                      theme === 'light'
                        ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                        : 'bg-indigo-700 text-white hover:bg-indigo-600'
                    }`}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p
                className={`${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-300'
                } text-2xl`}
              >
                {MyRecipesConstants.noRecipesAvailableMessage}
              </p>
              <button
                onClick={() => navigate('/create-recipe')}
                className={`${MyRecipesConstants.createRecipeButtonClasses} ${
                  theme === 'light'
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : 'bg-indigo-700 text-white hover:bg-indigo-600'
                }`}
              >
                {MyRecipesConstants.createFirstRecipeMessage}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;

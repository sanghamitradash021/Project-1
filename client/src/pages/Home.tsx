// import React, { useEffect, useState } from 'react';
// // import { Recipe } from '../../types/types';
// import { Link } from 'react-router-dom';

// const Home: React.FC = () => {
//   // const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         // API call will go here
//         // const response = await getAllRecipes();
//         // setRecipes(response);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch recipes:', error);
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {recipes.map((recipe) => (
//           <Link
//             key={recipe.id}
//             to={`/recipe/${recipe.id}`}
//             className="block group"
//           >
//             <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:transform hover:scale-105">
//               <img
//                 src={recipe.imageUrl}
//                 alt={recipe.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
//                   {recipe.title}
//                 </h3>
//                 <p className="mt-2 text-sm text-gray-500 line-clamp-2">
//                   {recipe.description}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import RecipeList from './RecipeList'; // Import the RecipeList component

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Display RecipeList component */}
      <RecipeList />
    </div>
  );
};

export default Home;

// pages/Home.tsx
// import React from 'react';

// const Home: React.FC = () => {
//   return (
//     <div className=" relative mt-20">
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>
//       <h1>Welcome to the Home Page!</h1>

//       <h1>Welcome to the Home Page!</h1>
//     </div>
//   );
// };

// export default Home;

// import type React from 'react';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/swiper-bundle.css';

// /**
//  * Represents a recipe object.
//  * @typedef {Object} Recipe
//  * @property {number} recipe_id - The unique identifier for the recipe.
//  * @property {string} title - The title of the recipe.
//  * @property {string} description - A brief description of the recipe.
//  * @property {string} image - The image URL for the recipe.
//  * @property {number} [rating] - The rating of the recipe (optional).
//  * @property {string} [cuisine] - The cuisine type of the recipe (optional).
//  * @property {string} [mealType] - The type of meal (optional).
//  * @property {string} [preparationTime] - Time taken to prepare the recipe (optional).
//  * @property {string} [difficulty] - Difficulty level of the recipe (optional).
//  */

// /**
//  * Home component to display featured categories, meal type recipes, and popular cuisines.
//  * Fetches recipes based on cuisine and meal type and displays them in a carousel and grid.
//  *
//  * @returns {JSX.Element} The rendered Home component.
//  */

// interface Recipe {
//   recipe_id: number;
//   title: string;
//   description: string;
//   image: string;
//   rating?: number;
//   cuisine?: string;
//   mealType?: string;
//   preparationTime?: string;
//   difficulty?: string;
// }

// const Home: React.FC = () => {
//   const navigate = useNavigate();
//   const [cuisineRecipes, setCuisineRecipes] = useState<{
//     [key: string]: Recipe[];
//   }>({});
//   const [mealTypeRecipes, setMealTypeRecipes] = useState<Recipe[]>([]);
//   const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

//   //list of cuisine types
//   const cuisineTypes = [
//     'Italian',
//     'Indian',
//     'Chinese',
//     'Mexican',
//     'Japanese',
//     'American',
//     'Thai',
//     'Anglo-Indian',
//   ];
//   const featuredCategories = [
//     { name: 'Breakfast', image: '/assets/breakfast.jpeg' },
//     { name: 'Healthy', image: '/assets/healthy.jpeg' },
//     { name: 'Vegetarian', image: '/assets/vegetarian.jpeg' },
//     { name: 'Desserts', image: '/assets/dessert.jpeg' },
//     { name: 'Lunch', image: '/assets/lunch.jpeg' },
//     { name: 'Dinner', image: '/assets/dinner.jpeg' },
//   ];

//   /**
//    * Fetches recipes by cuisine and sets the state for cuisine recipes.
//    *
//    * @async
//    * @function
//    */

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const cuisineData: { [key: string]: Recipe[] } = {};
//         await Promise.all(
//           cuisineTypes.map(async (cuisine) => {
//             const response = await axios.get(
//               `http://localhost:3000/api/recipes/cuisine/${cuisine}`
//             );
//             cuisineData[cuisine] = response.data;
//           })
//         );
//         setCuisineRecipes(cuisineData);
//       } catch (error) {
//         console.error('Failed to fetch recipes:', error);
//       }
//     };
//     fetchRecipes();
//   }, []);

//   /**
//    * Fetches recipes by meal type and updates the meal type recipes state.
//    *
//    * @param {string} mealType - The meal type to fetch recipes for.
//    * @async
//    */

//   const fetchMealTypeRecipes = async (mealType: string) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/recipes/mealtype/${mealType}`
//       );
//       setMealTypeRecipes(response.data);
//       setSelectedMealType(mealType);
//     } catch (error) {
//       console.error('Failed to fetch meal type recipes:', error);
//     }
//   };

//   /**
//    * Navigates to the recipe detail page for the selected recipe.
//    *
//    * @param {number} [id] - The ID of the selected recipe.
//    */
//   const handleRecipeClick = (id?: number) => {
//     if (id) {
//       navigate(`/recipes/${id}`);
//     } else {
//       console.error('Invalid Recipe ID:', id);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
//       <section>
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">
//           Featured Categories
//         </h2>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={20}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 },
//           }}
//           className="rounded-xl"
//         >
//           {featuredCategories.map((category, index) => (
//             <SwiperSlide key={index}>
//               <div
//                 className="relative h-72 rounded-xl overflow-hidden cursor-pointer group"
//                 onClick={() => fetchMealTypeRecipes(category.name)}
//               >
//                 <img
//                   src={category.image || '/placeholder.svg'}
//                   alt={category.name}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
//                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                   <h3 className="text-white text-2xl font-bold mb-2">
//                     {category.name}
//                   </h3>
//                   <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     Explore {category.name.toLowerCase()} recipes
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* New Section to Render Meal Type Recipes */}
//       {selectedMealType && (
//         <section>
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">
//             {selectedMealType
//               ? `${selectedMealType} Recipes`
//               : 'Meal Type Recipes'}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {mealTypeRecipes.length > 0 ? (
//               mealTypeRecipes.map((recipe) => (
//                 <div
//                   key={recipe.recipe_id}
//                   className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//                   onClick={() => handleRecipeClick(recipe.recipe_id)}
//                 >
//                   <img
//                     src={recipe.image || '/images/default-recipe.jpg'}
//                     alt={recipe.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       {recipe.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 line-clamp-2 mb-3">
//                       {recipe.description}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No recipes found for {selectedMealType}.</p>
//             )}
//           </div>
//         </section>
//       )}

//       <section>
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Popular Cuisines</h2>
//           <button
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
//             onClick={() => navigate('/recipes')}
//           >
//             View All Recipes
//           </button>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {Object.entries(cuisineRecipes).map(([cuisine, recipes]) => (
//             <div key={cuisine} className="space-y-4 ">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {cuisine} Cuisine
//               </h3>
//               {recipes.slice(0, 3).map((recipe) => (
//                 <div
//                   key={recipe.recipe_id}
//                   className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//                   onClick={() => handleRecipeClick(recipe.recipe_id)}
//                 >
//                   <img
//                     src={recipe.image || '/images/default-recipe.jpg'}
//                     alt={recipe.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       {recipe.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 line-clamp-2 mb-3">
//                       {recipe.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { HomeConstants } from '../constants/HomeConstant'; // Import the constants

interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
  image: string;
  rating?: number;
  cuisine?: string;
  mealType?: string;
  preparationTime?: string;
  difficulty?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [cuisineRecipes, setCuisineRecipes] = useState<{
    [key: string]: Recipe[];
  }>({});
  const [mealTypeRecipes, setMealTypeRecipes] = useState<Recipe[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

  // Access constants from HomeConstants
  const { cuisineTypes, featuredCategories } = HomeConstants;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const cuisineData: { [key: string]: Recipe[] } = {};
        await Promise.all(
          cuisineTypes.map(async (cuisine) => {
            const response = await axios.get(
              `http://localhost:3000/api/recipes/cuisine/${cuisine}`
            );
            cuisineData[cuisine] = response.data;
          })
        );
        setCuisineRecipes(cuisineData);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };
    fetchRecipes();
  }, [cuisineTypes]);

  const fetchMealTypeRecipes = async (mealType: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/recipes/mealtype/${mealType}`
      );
      setMealTypeRecipes(response.data);
      setSelectedMealType(mealType);
    } catch (error) {
      console.error('Failed to fetch meal type recipes:', error);
    }
  };

  const handleRecipeClick = (id?: number) => {
    if (id) {
      navigate(`/recipes/${id}`);
    } else {
      console.error('Invalid Recipe ID:', id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Categories
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="rounded-xl"
        >
          {featuredCategories.map((category, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-72 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => fetchMealTypeRecipes(category.name)}
              >
                <img
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore {category.name.toLowerCase()} recipes
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {selectedMealType && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedMealType} Recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mealTypeRecipes.length > 0 ? (
              mealTypeRecipes.map((recipe) => (
                <div
                  key={recipe.recipe_id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => handleRecipeClick(recipe.recipe_id)}
                >
                  <img
                    src={recipe.image || '/images/default-recipe.jpg'}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {recipe.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found for {selectedMealType}.</p>
            )}
          </div>
        </section>
      )}

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Cuisines</h2>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
            onClick={() => navigate('/recipes')}
          >
            View All Recipes
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(cuisineRecipes).map(([cuisine, recipes]) => (
            <div key={cuisine} className="space-y-4 ">
              <h3 className="text-xl font-semibold text-gray-800">
                {cuisine} Cuisine
              </h3>
              {recipes.slice(0, 3).map((recipe) => (
                <div
                  key={recipe.recipe_id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => handleRecipeClick(recipe.recipe_id)}
                >
                  <img
                    src={recipe.image || '/images/default-recipe.jpg'}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {recipe.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
  image: string;
}

const CuisineRecipes: React.FC = ({ theme }) => {
  const { cuisine } = useParams<{ cuisine: string }>();
  const navigate = useNavigate(); // Add navigation
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/cuisine/${cuisine}`
        );
        setRecipes(response.data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };
    fetchRecipes();
  }, [cuisine]);

  // return (
  //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  //     <h2 className="text-3xl font-bold text-gray-900 mb-8">
  //       {cuisine} Recipes
  //     </h2>

  //     {recipes.length > 0 ? (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  //         {recipes.map((recipe) => (
  //           <div
  //             key={recipe.recipe_id}
  //             className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
  //             onClick={() => navigate(`/recipes/${recipe.recipe_id}`)} // Navigate to RecipeDetails.tsx
  //           >
  //             <img
  //               src={recipe.image || '/images/default-recipe.jpg'}
  //               alt={recipe.title}
  //               className="w-full h-48 object-cover"
  //             />
  //             <div className="p-4">
  //               <h3 className="text-lg font-semibold text-gray-900 mb-2">
  //                 {recipe.title}
  //               </h3>
  //               <p className="text-sm text-gray-600 line-clamp-2 mb-3">
  //                 {recipe.description}
  //               </p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <p>No recipes found for {cuisine}.</p>
  //     )}
  //   </div>
  // );

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${
        theme === 'light' ? 'bg-white' : 'bg-gray-900'
      }`} // Conditional background color based on theme
    >
      <h2
        className={`text-3xl font-bold mb-8 ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
        }`} // Conditional text color based on theme
      >
        {cuisine} Recipes
      </h2>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className={`${
                theme === 'light' ? 'bg-white' : 'bg-gray-800'
              } rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              onClick={() => navigate(`/recipes/${recipe.recipe_id}`)} // Navigate to RecipeDetails.tsx
            >
              <img
                src={recipe.image || '/images/default-recipe.jpg'}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div
                className={`p-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                }`} // Conditional text color based on theme
              >
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                  }`} // Conditional title color based on theme
                >
                  {recipe.title}
                </h3>
                <p
                  className={`text-sm line-clamp-2 mb-3 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`} // Conditional description color based on theme
                >
                  {recipe.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className={`${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}
        >
          No recipes found for {cuisine}.
        </p>
      )}
    </div>
  );
};

export default CuisineRecipes;

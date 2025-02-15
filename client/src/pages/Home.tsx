"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface Recipe {
  id: number;
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

  const cuisineTypes = ["Italian", "Indian", "Chinese", "Mexican", "Japanese"];
  const featuredCategories = [
    { name: "Breakfast", image: "/images/quick-easy.jpg" },
    { name: "Healthy", image: "/images/healthy.jpg" },
    { name: "Vegetarian", image: "/images/vegetarian.jpg" },
    { name: "Desserts", image: "/images/desserts.jpg" },
    { name: "Lunch", image: "/images/breakfast.jpg" },
    { name: "Dinner", image: "/images/breakfast.jpg" },
  ];

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
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const fetchMealTypeRecipes = async (mealType: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/recipes/mealtype/${mealType}`
      );
      setMealTypeRecipes(response.data);
      setSelectedMealType(mealType);
    } catch (error) {
      console.error("Failed to fetch meal type recipes:", error);
    }
  };

  const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <img
        src={recipe.image || "/images/default-recipe.jpg"}
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
        <div className="flex items-center justify-between">
          {recipe.rating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(recipe.rating ?? 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-600">
                {recipe.rating.toFixed(1)}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-indigo-600">
            {recipe.cuisine}
          </span>
        </div>
      </div>
    </div>
  );

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
                  src={category.image || "/placeholder.svg"}
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

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Cuisines</h2>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
            onClick={() => navigate("/recipes")}
          >
            View All Recipes
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(cuisineRecipes).map(([cuisine, recipes]) => (
            <div key={cuisine} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {cuisine} Cuisine
              </h3>
              {recipes.slice(0, 3).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {selectedMealType && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedMealType} Recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mealTypeRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

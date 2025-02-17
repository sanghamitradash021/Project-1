// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// interface Comment {
//   id: number;
//   text: string;
//   user: string;
// }

// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   ingredients: string | any;
//   preparationTime?: string | any;
//   difficulty?: string;
//   rating?: number; // Average rating
//   comments?: Comment[];
// }

// const RecipeDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Ensure we extract `id` correctly from URL
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const userId = 4; // 🔹 Mocked User ID (should be dynamic based on auth)

//   useEffect(() => {
//     if (!id) {
//       console.error("❌ Error: Recipe ID is undefined");
//       return;
//     }

//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/recipes/${id}`
//         );
//         setRecipe(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching recipe:", error);
//         setRecipe({
//           recipe_id: 1,
//           user_id: 1,
//           title: "Spaghetti Carbonara",
//           description: "A classic Italian pasta dish.",
//           ingredients: ["spaghetti", "eggs", "cheese", "bacon", "black pepper"],
//           instructions:
//             "Cook pasta. Fry bacon. Mix eggs and cheese. Combine everything.",
//           preparationTime: 20,
//           difficulty: "Medium",
//           image: "carbonara.jpg",
//           cuisine: "Italian",
//           mealType: "Dinner",
//           createdAt: "2025-02-12T22:43:20.000Z",
//           updatedAt: "2025-02-12T22:43:20.000Z",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchRating = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/ratings/rate/${id}`
//         );
//         setRating(response.data.avg_rating || 0);
//       } catch (error) {
//         console.error("❌ Error fetching rating:", error);
//       }
//     };

//     fetchRecipe();
//     fetchRating();
//   }, [id]); // ✅ Ensure the effect runs when `id` changes

//   // 🔹 Handle Comment Submission
//   const handleCommentSubmit = async () => {
//     if (!comment.trim()) return;
//     try {
//       await axios.post(`http://localhost:3000/api/recipes/${id}/comments`, {
//         text: comment,
//       });
//       setRecipe((prev) =>
//         prev
//           ? {
//               ...prev,
//               comments: [
//                 ...(prev.comments || []),
//                 { id: Date.now(), text: comment, user: "You" },
//               ],
//             }
//           : prev
//       );
//       setComment("");
//     } catch (error) {
//       console.error("❌ Error posting comment:", error);
//     }
//   };

//   // 🔹 Handle Rating Submission
//   const handleRatingChange = async (newRating: number) => {
//     if (!id) {
//       console.error("❌ Error: Recipe ID is undefined");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/ratings/rate`,
//         {
//           recipeId: parseInt(id, 10), // Ensure it's sent as a number
//           userId: userId, // Replace with actual user ID from auth
//           rating: newRating,
//         }
//       );

//       console.log("✅ Rating submitted:", response.data);
//       setRating(newRating);
//     } catch (error: any) {
//       console.error(
//         "❌ Error submitting rating:",
//         error.response?.data || error
//       );
//     }
//   };

//   if (loading) return <p className="text-center text-lg">Loading...</p>;
//   if (!recipe)
//     return <p className="text-center text-lg text-red-500">Recipe not found</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <img
//         src={recipe.image || "/images/default-recipe.jpg"}
//         alt={recipe.title}
//         className="w-full h-64 object-cover rounded-lg"
//       />
//       <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
//       <p className="text-gray-600 mt-2">{recipe.description}</p>

//       {/* 🔹 Ingredients */}
//       <div className="mt-4">
//         <h3 className="text-xl font-semibold">Ingredients</h3>
//         <p className="text-gray-700 mt-2">{recipe.ingredients}</p>
//       </div>

//       {/* 🔹 Preparation Time & Difficulty */}
//       <div className="mt-4 flex gap-6">
//         <p className="text-gray-700">
//           <strong>Preparation Time:</strong> {recipe.preparationTime || "N/A"}
//         </p>
//         <p className="text-gray-700">
//           <strong>Difficulty:</strong> {recipe.difficulty || "N/A"}
//         </p>
//       </div>

//       {/* 🔹 Rating Section */}
//       <div className="mt-4">
//         <h3 className="text-xl font-semibold">Rate this Recipe</h3>
//         <div className="flex gap-1 mt-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => handleRatingChange(star)}
//               className={`text-2xl ${
//                 rating >= star ? "text-yellow-400" : "text-gray-300"
//               }`}
//             >
//               ★
//             </button>
//           ))}
//         </div>
//         <p className="text-gray-700 mt-2">Current Rating: {rating}/5</p>
//       </div>

//       {/* 🔹 Comments Section */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold">Comments</h3>
//         <div className="mt-2 space-y-2">
//           {recipe.comments && recipe.comments.length > 0 ? (
//             recipe.comments.map((c) => (
//               <div key={c.id} className="bg-gray-100 p-2 rounded-lg">
//                 <p className="text-gray-800">
//                   <strong>{c.user}:</strong> {c.text}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No comments yet.</p>
//           )}
//         </div>
//       </div>

//       {/* 🔹 Add Comment */}
//       <div className="mt-4">
//         <textarea
//           className="w-full p-2 border rounded-lg"
//           rows={3}
//           placeholder="Write a comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <button
//           onClick={handleCommentSubmit}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;

'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Comment {
  id: number;
  text: string;
  user: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  ingredients: string[] | string;
  instructions: string;
  preparationTime: number;
  difficulty: string;
  cuisine: string;
  mealType: string;
  rating: number;
  comments: Comment[];
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const userId = 4; // Mocked User ID

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        // Set mock data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !recipe) return;
    try {
      await axios.post(`http://localhost:3000/api/recipes/${id}/comments`, {
        text: comment,
        userId: userId,
      });
      setRecipe((prev) =>
        prev
          ? {
              ...prev,
              comments: [
                ...prev.comments,
                { id: Date.now(), text: comment, user: 'You' },
              ],
            }
          : prev
      );
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    if (!id) return;

    try {
      await axios.post(`http://localhost:3000/api/ratings/rate`, {
        recipeId: Number.parseInt(id, 10),
        userId: userId,
        rating: newRating,
      });
      setUserRating(newRating);
      setRecipe((prev) => (prev ? { ...prev, rating: newRating } : prev));
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!recipe)
    return (
      <p className="text-center text-2xl text-red-500 mt-8">Recipe not found</p>
    );
  const ingredientsArray = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : typeof recipe.ingredients === 'string'
    ? recipe.ingredients.split(',').map((item) => item.trim())
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <img
        src={recipe.image || '/images/default-recipe.jpg'}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-xl mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
      <p className="text-xl text-gray-600 mb-6">{recipe.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ingredients
          </h3>
          {/* Ingredients Section */}
          {/* <ul className="list-disc list-inside space-y-2">
            {Array.isArray(recipe?.ingredients) &&
            recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No ingredients available.</p>
            )}
          </ul> */}
          <ul className="list-inside list-disc space-y-2">
            {ingredientsArray.length > 0 ? (
              ingredientsArray.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No ingredients available.</p>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Instructions
          </h3>
          <p className="text-gray-700 whitespace-pre-line">
            {recipe.instructions}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-gray-100 rounded-full px-4 py-2">
          <span className="font-semibold">Prep Time:</span>{' '}
          {recipe.preparationTime} mins
        </div>
        <div className="bg-gray-100 rounded-full px-4 py-2">
          <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
        </div>
        <div className="bg-gray-100 rounded-full px-4 py-2">
          <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
        </div>
        <div className="bg-gray-100 rounded-full px-4 py-2">
          <span className="font-semibold">Meal Type:</span> {recipe.mealType}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Rate this Recipe
        </h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`text-3xl ${
                userRating >= star ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="text-gray-700 mt-2">
          {/* Current Rating: {recipe.rating.toFixed(1)}/5 */}
        </p>
      </div>

      {/* <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>
        <div className="space-y-4">
          {recipe.comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-800">
                <span className="font-semibold">{c.user}:</span> {c.text}
              </p>
            </div>
          ))}
        </div>
      </div> */}
      {/* Comments Section */}
      <div className="space-y-4">
        {recipe?.comments?.length ? (
          recipe.comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-800">
                <span className="font-semibold">{c.user}:</span> {c.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Add a Comment
        </h3>
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;

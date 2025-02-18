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

    // Retrieve the userId from sessionStorage
    const userId = sessionStorage.getItem('user_id');
    console.log('User ID from sessionStorage:', userId);

    if (!userId) {
      console.error(' Error: User is not logged in');
      return;
    }

    try {
      // Send the comment with the recipeId, userId, and content (comment)
      const response = await axios.post(
        `http://localhost:3000/api/comments/recipes/${id}`,
        {
          recipeId: id, // Recipe ID from URL
          userId: userId, // User ID from sessionStorage
          content: comment, // Comment content from textarea
        }
      );

      // Assuming the response contains the newly added comment with its ID and other details
      const newComment = response.data;

      // Update recipe state with new comment
      setRecipe((prev) => {
        if (prev && Array.isArray(prev.comments)) {
          return {
            ...prev,
            comments: [...prev.comments, newComment],
          };
        }
        return prev;
      });

      setComment(''); // Clear the comment input after submission
    } catch (error) {
      console.error(' Error posting comment:', error);
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

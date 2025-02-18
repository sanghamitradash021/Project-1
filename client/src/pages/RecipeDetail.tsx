import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RecipeDetailConstants } from '../constants/RecipedetailsConstant'; // Import constants

/**
 * Represents a comment on a recipe.
 */
interface Comment {
  id: number;
  text: string;
  user: string;
}

/**
 * Represents a recipe with its details, ingredients, and comments.
 */
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

/**
 * RecipeDetail component displays the detailed information about a single recipe,
 * including its ingredients, instructions, comments, and allows users to rate and comment.
 */
const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  /**
   * State for storing recipe details.
   */
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  /**
   * State for storing the current comment input.
   */
  const [comment, setComment] = useState('');

  /**
   * State for storing the user's rating for the recipe.
   */
  const [userRating, setUserRating] = useState(0);

  /**
   * State for tracking the loading state while fetching recipe data.
   */
  const [loading, setLoading] = useState(true);

  /**
   * Mocked User ID (replace with actual authentication logic).
   */
  const userId = 4;

  /**
   * Fetches the recipe details when the component mounts or when the recipe ID changes.
   */
  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${RecipeDetailConstants.apiUrl}${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  /**
   * Handles the submission of a new comment.
   */
  const handleCommentSubmit = async () => {
    if (!comment.trim() || !recipe) return;

    const userId = sessionStorage.getItem('user_id');
    if (!userId) {
      console.error('Error: User is not logged in');
      return;
    }

    try {
      const response = await axios.post(
        `${RecipeDetailConstants.commentApiUrl}${id}`,
        {
          recipeId: id,
          userId: userId,
          content: comment,
        }
      );

      const newComment = response.data;

      setRecipe((prev) => {
        if (prev && Array.isArray(prev.comments)) {
          return {
            ...prev,
            comments: [...prev.comments, newComment],
          };
        }
        return prev;
      });

      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  /**
   * Handles changes in the user's rating for the recipe.
   * @param newRating - The new rating value.
   */
  const handleRatingChange = async (newRating: number) => {
    if (!id) return;

    try {
      await axios.post(`${RecipeDetailConstants.apiUrl}ratings/rate`, {
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

  // If the data is still loading, display a loading spinner
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className={RecipeDetailConstants.loadingSpinnerClass}></div>{' '}
        {/* Use constant */}
      </div>
    );

  // If no recipe was found, display a "Recipe not found" message
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
        className={RecipeDetailConstants.recipeImageClass}
      />
      <h1 className={RecipeDetailConstants.recipeTitleClass}>{recipe.title}</h1>{' '}
      {/* Use constant */}
      <p className={RecipeDetailConstants.recipeDescriptionClass}>
        {recipe.description}
      </p>{' '}
      {/* Use constant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ingredients
          </h3>

          <ul className={RecipeDetailConstants.ingredientListClass}>
            {' '}
            {/* Use constant */}
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
          <p className={RecipeDetailConstants.instructionTextClass}>
            {recipe.instructions}
          </p>{' '}
          {/* Use constant */}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className={RecipeDetailConstants.detailTagClass}>
          <span className="font-semibold">Prep Time:</span>{' '}
          {recipe.preparationTime} mins
        </div>
        <div className={RecipeDetailConstants.detailTagClass}>
          <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
        </div>
        <div className={RecipeDetailConstants.detailTagClass}>
          <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
        </div>
        <div className={RecipeDetailConstants.detailTagClass}>
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
              className={`${RecipeDetailConstants.ratingButtonClass} ${
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
      {/* Comments Section */}
      <div className="space-y-4">
        {recipe?.comments?.length ? (
          recipe.comments.map((c) => (
            <div
              key={c.id}
              className={RecipeDetailConstants.commentContainerClass}
            >
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
          className={RecipeDetailConstants.commentTextAreaClass}
          rows={3}
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          className={RecipeDetailConstants.submitButtonClass}
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;

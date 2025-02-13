import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  preparationTime: number; // ✅ Add this
  difficulty: string; // ✅ Add this
  cuisine: string; // ✅ Add this
  mealType: string; // ✅ Add this
  image?: string; // ✅ Optional image
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Loader />;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Recipe Title */}
      <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>

      {/* Description */}
      <p className="text-gray-600 mt-2">{recipe.description}</p>

      {/* Recipe Details */}
      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Preparation Time:</strong> {recipe.preparationTime} minutes
        </p>
        <p>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </p>
        <p>
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p>
          <strong>Meal Type:</strong> {recipe.mealType}
        </p>
      </div>

      {/* Ingredients List */}
      <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
      <ul className="list-disc list-inside text-gray-700">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h3 className="text-lg font-semibold mt-4">Steps:</h3>
      <p className="text-gray-700">{recipe.instructions}</p>

      {/* Recipe Image */}
      {recipe.image && (
        <div className="mt-4">
          <img
            src={`/images/${recipe.image}`} // Assuming images are stored in public/images
            alt={recipe.title}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;

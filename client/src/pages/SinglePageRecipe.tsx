import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditRecipeModal from '../components/EditRecipeModal';
import { toast, ToastContainer } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
  ingredients: string[] | string; //
  instructions: string;
  preparationTime: number;
  difficulty: string;
  image: string;
  cuisine: string;
  mealType: string;
  createdAt: string;
  updatedAt: string;
}

const SingleRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('No recipe ID found in the URL');
      setLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );

        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, recipe]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (confirmed) {
      try {
        const token = sessionStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success('Recipe deleted successfully!'); // Show success toast
        navigate('/my-recipes'); // Redirect after deletion
      } catch (error) {
        console.error('Error deleting recipe:', error);
        toast.error('Failed to delete recipe.'); // Show error toast
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>; // Show error message
  if (!recipe) return <p>Recipe not found.</p>;

  const ingredientsArray = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : typeof recipe.ingredients === 'string'
    ? recipe.ingredients.split(',').map((item) => item.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16">
      <article className="mx-auto max-w-4xl space-y-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="relative h-[400px] w-full">
            <img
              src={recipe.image || '/placeholder.svg'}
              alt={recipe.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="mb-2 text-4xl font-bold text-white">
                {recipe.title}
              </h1>
              <p className="text-lg text-gray-200">{recipe.description}</p>
            </div>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-3">
            <div className="lg:col-span-2 lg:border-r lg:pr-8">
              <section className="mb-8">
                <h2 className="mb-4 flex items-center text-xl font-semibold">
                  Ingredients
                </h2>
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
              </section>

              <section>
                <h2 className="mb-4 flex items-center text-xl font-semibold">
                  Instructions
                </h2>
                <p className="whitespace-pre-wrap text-gray-600">
                  {recipe.instructions}
                </p>
              </section>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-semibold">Recipe Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      Preparation Time
                    </dt>
                    <dd className="mt-1">{recipe.preparationTime} minutes</dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      Difficulty
                    </dt>
                    <dd className="mt-1">{recipe.difficulty}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      Cuisine
                    </dt>
                    <dd className="mt-1">{recipe.cuisine}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Edit Recipe
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center rounded-lg border border-red-200 px-6 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
      {showEditModal && (
        <EditRecipeModal
          recipe={recipe}
          onClose={() => setShowEditModal(false)}
          onUpdate={(updatedRecipe) => {
            setRecipe(updatedRecipe);
            toast.success('Recipe updated successfully!'); // Success toast on update
            // setRecipe();
          }}
        />
      )}
      <ToastContainer /> {/* Add ToastContainer here to render toasts */}
    </div>
  );
};

export default SingleRecipe;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import EditRecipeModal from "../components/EditRecipeModal";

// const SinglePageRecipe: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get ID from URL
//   const [recipe, setRecipe] = useState<any | null>({
//     recipe_id: 1,
//     user_id: 1,
//     title: "Spaghetti Carbonara",
//     description: "A classic Italian pasta dish.",
//     ingredients: ["spaghetti", "eggs", "cheese", "bacon", "black pepper"],
//     instructions:
//       "Cook pasta. Fry bacon. Mix eggs and cheese. Combine everything.",
//     preparationTime: 20,
//     difficulty: "Medium",
//     image: "carbonara.jpg",
//     cuisine: "Italian",
//     mealType: "Dinner",
//     createdAt: "2025-02-12T22:43:20.000Z",
//     updatedAt: "2025-02-12T22:43:20.000Z",
//   });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Recipe ID:", id); // Log the ID from URL to check
//     alert("jhsdjkdskjsdkjdskj")
//    setRecipe({
//      recipe_id: 1,
//      user_id: 1,
//      title: "Spaghetti Carbonara",
//      description: "A classic Italian pasta dish.",
//      ingredients: ["spaghetti", "eggs", "cheese", "bacon", "black pepper"],
//      instructions:
//        "Cook pasta. Fry bacon. Mix eggs and cheese. Combine everything.",
//      preparationTime: 20,
//      difficulty: "Medium",
//      image: "carbonara.jpg",
//      cuisine: "Italian",
//      mealType: "Dinner",
//      createdAt: "2025-02-12T22:43:20.000Z",
//      updatedAt: "2025-02-12T22:43:20.000Z",
//    });
//     // if (!id) {
//     //   setError("No recipe ID found in the URL");
//     //   setLoading(false);
//     //   return;
//     // }

//     // const fetchRecipe = async () => {
//     //   try {
//     //     const response = await axios.get(
//     //       `http://localhost:3000/api/recipes/${id}` // Ensure recipe ID is passed here
//     //     );
//     //     console.log("Fetched Recipe:", response.data); // Log response data to check API result
//     //     setRecipe(response.data);
//     //   } catch (error) {
//     //     alert("jdsjkdjkdskj")
//     //     console.error("Error fetching recipe:", error);
//     //     setError("Failed to fetch recipe details");

//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     // fetchRecipe();
//   }, [id]);

//   const handleDelete = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this recipe?"
//     );
//     if (confirmed) {
//       try {
//         const token = sessionStorage.getItem("token");
//         await axios.delete(`http://localhost:3000/api/recipes/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         alert("Recipe deleted successfully!");
//         navigate("/my-recipes"); // Redirect to recipes list after delete
//       } catch (error) {
//         console.error("Error deleting recipe:", error);
//         alert("Failed to delete recipe.");
//       }
//     }
//   };

//   // if (loading) return <p>Loading...</p>;
//   // if (error) return <p className="text-red-500">{error}</p>; // Show error if it exists
//   // if (!recipe) return <p>Recipe not found.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>

//       {/* Recipe Description */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Description:</h3>
//         <p>{recipe.description}</p>
//       </div>

//       {/* Ingredients */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Ingredients:</h3>
//         <pre>{recipe.ingredients}</pre>
//       </div>

//       {/* Instructions */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Instructions:</h3>
//         <pre>{recipe.instructions}</pre>
//       </div>

//       {/* Preparation Time */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Preparation Time:</h3>
//         <p>{recipe.preparationTime} minutes</p>
//       </div>

//       {/* Difficulty */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Difficulty:</h3>
//         <p>{recipe.difficulty}</p>
//       </div>

//       {/* Cuisine Type */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Cuisine:</h3>
//         <p>{recipe.cuisine}</p>
//       </div>

//       {/* Meal Type */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Meal Type:</h3>
//         <p>{recipe.mealType}</p>
//       </div>

//       {/* Recipe Image */}
//       {recipe.image && (
//         <div className="mb-4">
//           <h3 className="font-semibold text-lg">Recipe Image:</h3>
//           <img
//             src={`http://localhost:3000/images/${recipe.image}`}
//             alt={recipe.title}
//             className="w-full max-w-md"
//           />
//         </div>
//       )}

//       {/* Created and Updated Dates */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-lg">Dates:</h3>
//         <p>Created At: {new Date(recipe.createdAt).toLocaleString()}</p>
//         <p>Updated At: {new Date(recipe.updatedAt).toLocaleString()}</p>
//       </div>

//       {/* Edit Recipe Button */}
//       <button
//         onClick={() => setShowEditModal(true)}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Edit Recipe
//       </button>

//       {/* Delete Recipe Button */}
//       <button
//         onClick={handleDelete}
//         className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Delete Recipe
//       </button>

//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/my-recipes")}
//         className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded"
//       >
//         Back
//       </button>

//       {/* Render Edit Modal only when needed */}
//       {showEditModal && (
//         <EditRecipeModal
//           recipe={recipe}
//           onClose={() => setShowEditModal(false)}
//           onUpdate={(updatedRecipe) => setRecipe(updatedRecipe)}
//         />
//       )}
//     </div>
//   );
// };

// export default SinglePageRecipe;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditRecipeModal from "../components/EditRecipeModal";

interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
  ingredients: string[];
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
  const [recipe, setRecipe] = useState<any | null>();
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Recipe ID:", id); // Log the ID from URL to check

    if (!id) {
      setError("No recipe ID found in the URL");
      setLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}` // Ensure recipe ID is passed here
        );
        console.log("Fetched Recipe:", response.data); // Log response data to check API result
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to fetch recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmed) {
      try {
        const token = sessionStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Recipe deleted successfully!");
        navigate("/my-recipes"); // Redirect to recipes list after delete
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete recipe.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>; // Show error if it exists
  if (!recipe) return <p>Recipe not found.</p>;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16">
      <article className="mx-auto max-w-4xl space-y-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="relative h-[400px] w-full">
            <img
              src={recipe.image || "/placeholder.svg"}
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
                  <svg
                    className="mr-2 h-5 w-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Ingredients
                </h2>
                <ul className="list-inside list-disc space-y-2">
                  {recipe.ingredients.map((ingredient: any, index: any) => (
                    <li key={index} className="text-gray-600">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="mb-4 flex items-center text-xl font-semibold">
                  <svg
                    className="mr-2 h-5 w-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
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
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Preparation Time
                    </dt>
                    <dd className="mt-1">{recipe.preparationTime} minutes</dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Difficulty
                    </dt>
                    <dd className="mt-1">{recipe.difficulty}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
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
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Recipe
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center rounded-lg border border-red-200 px-6 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
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
          onUpdate={(updatedRecipe) => setRecipe(updatedRecipe)}
        />
      )}
    </div>
  );
};

export default SingleRecipe;

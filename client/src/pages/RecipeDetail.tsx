// import type React from 'react';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { RecipeDetailConstants } from '../constants/RecipedetailsConstant'; // Import constants

// /**
//  * Represents a comment on a recipe.
//  */
// interface Comment {
//   id: number;
//   text: string;
//   user: string;
// }

// /**
//  * Represents a recipe with its details, ingredients, and comments.
//  */
// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   ingredients: string[] | string;
//   instructions: string;
//   preparationTime: number;
//   difficulty: string;
//   cuisine: string;
//   mealType: string;
//   rating: number;
//   comments: Comment[];
// }

// /**
//  * RecipeDetail component displays the detailed information about a single recipe,
//  * including its ingredients, instructions, comments, and allows users to rate and comment.
//  */
// const RecipeDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   /**
//    * State for storing recipe details.
//    */
//   const [recipe, setRecipe] = useState<Recipe | null>(null);

//   /**
//    * State for storing the current comment input.
//    */
//   const [comment, setComment] = useState('');

//   /**
//    * State for storing the user's rating for the recipe.
//    */
//   const [userRating, setUserRating] = useState(0);

//   /**
//    * State for tracking the loading state while fetching recipe data.
//    */
//   const [loading, setLoading] = useState(true);

//   /**
//    * Mocked User ID (replace with actual authentication logic).
//    */
//   const userId = 4;

//   /**
//    * Fetches the recipe details when the component mounts or when the recipe ID changes.
//    */
//   useEffect(() => {
//     if (!id) return;

//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.apiUrl}${id}`
//         );
//         setRecipe(response.data);
//       } catch (error) {
//         console.error('Error fetching recipe:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   /**
//    * Handles the submission of a new comment.
//    */
//   const handleCommentSubmit = async () => {
//     if (!comment.trim() || !recipe) return;

//     const userId = sessionStorage.getItem('user_id');
//     if (!userId) {
//       console.error('Error: User is not logged in');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${RecipeDetailConstants.commentApiUrl}${id}`,
//         {
//           recipeId: id,
//           userId: userId,
//           content: comment,
//         }
//       );

//       const newComment = response.data;

//       setRecipe((prev) => {
//         if (prev && Array.isArray(prev.comments)) {
//           return {
//             ...prev,
//             comments: [...prev.comments, newComment],
//           };
//         }
//         return prev;
//       });

//       setComment('');
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   /**
//    * Handles changes in the user's rating for the recipe.
//    * @param newRating - The new rating value.
//    */
//   const handleRatingChange = async (newRating: number) => {
//     if (!id) return;

//     try {
//       await axios.post(`${RecipeDetailConstants.apiUrl}ratings/rate`, {
//         recipeId: Number.parseInt(id, 10),
//         userId: userId,
//         rating: newRating,
//       });
//       setUserRating(newRating);
//       setRecipe((prev) => (prev ? { ...prev, rating: newRating } : prev));
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//     }
//   };

//   // If the data is still loading, display a loading spinner
//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className={RecipeDetailConstants.loadingSpinnerClass}></div>{' '}
//         {/* Use constant */}
//       </div>
//     );

//   // If no recipe was found, display a "Recipe not found" message
//   if (!recipe)
//     return (
//       <p className="text-center text-2xl text-red-500 mt-8">Recipe not found</p>
//     );

//   const ingredientsArray = Array.isArray(recipe.ingredients)
//     ? recipe.ingredients
//     : typeof recipe.ingredients === 'string'
//     ? recipe.ingredients.split(',').map((item) => item.trim())
//     : [];

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
//       <img
//         src={recipe.image || '/images/default-recipe.jpg'}
//         alt={recipe.title}
//         className={RecipeDetailConstants.recipeImageClass}
//       />
//       <h1 className={RecipeDetailConstants.recipeTitleClass}>{recipe.title}</h1>{' '}
//       {/* Use constant */}
//       <p className={RecipeDetailConstants.recipeDescriptionClass}>
//         {recipe.description}
//       </p>{' '}
//       {/* Use constant */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Ingredients
//           </h3>

//           <ul className={RecipeDetailConstants.ingredientListClass}>
//             {' '}
//             {/* Use constant */}
//             {ingredientsArray.length > 0 ? (
//               ingredientsArray.map((ingredient, index) => (
//                 <li key={index} className="text-gray-600">
//                   {ingredient}
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No ingredients available.</p>
//             )}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Instructions
//           </h3>
//           <p className={RecipeDetailConstants.instructionTextClass}>
//             {recipe.instructions}
//           </p>{' '}
//           {/* Use constant */}
//         </div>
//       </div>
//       <div className="flex flex-wrap gap-4 mb-8">
//         <div className={RecipeDetailConstants.detailTagClass}>
//           <span className="font-semibold">Prep Time:</span>{' '}
//           {recipe.preparationTime} mins
//         </div>
//         <div className={RecipeDetailConstants.detailTagClass}>
//           <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
//         </div>
//         <div className={RecipeDetailConstants.detailTagClass}>
//           <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
//         </div>
//         <div className={RecipeDetailConstants.detailTagClass}>
//           <span className="font-semibold">Meal Type:</span> {recipe.mealType}
//         </div>
//       </div>
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           Rate this Recipe
//         </h3>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => handleRatingChange(star)}
//               className={`${RecipeDetailConstants.ratingButtonClass} ${
//                 userRating >= star ? 'text-yellow-400' : 'text-gray-300'
//               }`}
//             >
//               ★
//             </button>
//           ))}
//         </div>
//         <p className="text-gray-700 mt-2">
//           {/* Current Rating: {recipe.rating.toFixed(1)}/5 */}
//         </p>
//       </div>
//       {/* Comments Section */}
//       <div className="space-y-4">
//         {recipe?.comments?.length ? (
//           recipe.comments.map((c) => (
//             <div
//               key={c.id}
//               className={RecipeDetailConstants.commentContainerClass}
//             >
//               <p className="text-gray-800">
//                 <span className="font-semibold">{c.user}:</span> {c.text}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>
//       <div>
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           Add a Comment
//         </h3>
//         <textarea
//           className={RecipeDetailConstants.commentTextAreaClass}
//           rows={3}
//           placeholder="Write your comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <button
//           onClick={handleCommentSubmit}
//           className={RecipeDetailConstants.submitButtonClass}
//         >
//           Submit Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Import useAuth from context
// import { RecipeDetailConstants } from '../constants/RecipedetailsConstant'; // Import constants

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
//   ingredients: string[] | string;
//   instructions: string;
//   preparationTime: number;
//   difficulty: string;
//   cuisine: string;
//   mealType: string;
//   rating: number;
//   comments: Comment[];
// }

// const RecipeDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth(); // Get user from context
//   const navigate = useNavigate(); // Used for redirection

//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [comment, setComment] = useState('');
//   const [userRating, setUserRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false); // State to control login modal

//   useEffect(() => {
//     if (!id) return;
//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.apiUrl}${id}`
//         );
//         setRecipe(response.data);
//       } catch (error) {
//         console.error('Error fetching recipe:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRecipe();
//   }, [id]);

//   const handleCommentSubmit = async () => {
//     if (!user) {
//       setShowModal(true); // Show login modal if user is not logged in
//       return;
//     }

//     if (!comment.trim() || !recipe) return;

//     try {
//       const response = await axios.post(
//         `${RecipeDetailConstants.commentApiUrl}${id}`,
//         {
//           recipeId: id,
//           userId: user.id,
//           content: comment,
//         }
//       );

//       const newComment = response.data;
//       // setRecipe((prev) =>
//       //   prev ? { ...prev, comments: [...prev.comments, newComment] } : prev
//       // );
//       setRecipe((prev) => {
//         if (!prev) return null; // Ensure prev is not null

//         return {
//           ...prev,
//           comments: Array.isArray(prev.comments)
//             ? [...prev.comments, newComment]
//             : [newComment],
//         };
//       });

//       setComment('');
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className={RecipeDetailConstants.loadingSpinnerClass}></div>
//       </div>
//     );

//   if (!recipe)
//     return (
//       <p className="text-center text-2xl text-red-500 mt-8">Recipe not found</p>
//     );

//   const ingredientsArray = Array.isArray(recipe.ingredients)
//     ? recipe.ingredients
//     : typeof recipe.ingredients === 'string'
//     ? recipe.ingredients.split(',').map((item) => item.trim())
//     : [];

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
//       <img
//         src={recipe.image || '/images/default-recipe.jpg'}
//         alt={recipe.title}
//         className={RecipeDetailConstants.recipeImageClass}
//       />
//       <h1 className={RecipeDetailConstants.recipeTitleClass}>{recipe.title}</h1>
//       <p className={RecipeDetailConstants.recipeDescriptionClass}>
//         {recipe.description}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Ingredients
//           </h3>
//           <ul className={RecipeDetailConstants.ingredientListClass}>
//             {ingredientsArray.length > 0 ? (
//               ingredientsArray.map((ingredient, index) => (
//                 <li key={index} className="text-gray-600">
//                   {ingredient}
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No ingredients available.</p>
//             )}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Instructions
//           </h3>
//           <p className={RecipeDetailConstants.instructionTextClass}>
//             {recipe.instructions}
//           </p>
//         </div>
//       </div>

//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           Rate this Recipe
//         </h3>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => setUserRating(star)}
//               className={`${RecipeDetailConstants.ratingButtonClass} ${
//                 userRating >= star ? 'text-yellow-400' : 'text-gray-300'
//               }`}
//             >
//               ★
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Comments Section */}
//       <div className="space-y-4">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>
//         {recipe?.comments?.length ? (
//           recipe.comments.map((c) => (
//             <div
//               key={c.id}
//               className={RecipeDetailConstants.commentContainerClass}
//             >
//               <p className="text-gray-800">
//                 <span className="font-semibold">{c.user}:</span> {c.text}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>

//       {/* Comment Input */}
//       <div>
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           Add a Comment
//         </h3>
//         <textarea
//           className={RecipeDetailConstants.commentTextAreaClass}
//           rows={3}
//           placeholder="Write your comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <button
//           onClick={handleCommentSubmit}
//           className={RecipeDetailConstants.submitButtonClass}
//         >
//           Submit Comment
//         </button>
//       </div>

//       {/* Modal for Login Prompt */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-xl font-bold mb-4">Login Required</h2>
//             <p className="text-gray-700 mb-4">
//               You must be logged in to comment.
//             </p>
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Go to Login
//             </button>
//             <button
//               onClick={() => setShowModal(false)}
//               className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetail;
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { RecipeDetailConstants } from '../constants/RecipedetailsConstant';

// interface Comment {
//   id: number;
//   content: string;
//   user: string;
//   username: string;
// }
// interface User {
//   username: string;
// }

// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   ingredients: string[] | string;
//   instructions: string;
//   preparationTime: number;
//   difficulty: string;
//   cuisine: string;
//   mealType: string;
//   rating: number;
// }

// const RecipeDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [comment, setComment] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [showAllComments, setShowAllComments] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.apiUrl}${id}`
//         );
//         setRecipe(response.data);
//       } catch (error) {
//         console.error('Error fetching recipe:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.commentApiUrl}/comments/${id}`
//         );
//         console.log('Fetched Comments:', response.data);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchRecipe();
//     fetchComments();
//   }, [id]);

//   const handleCommentSubmit = async () => {
//     if (!user) {
//       setShowModal(true);
//       return;
//     }

//     if (!comment.trim() || !id) return;

//     try {
//       const response = await axios.post(
//         `${RecipeDetailConstants.commentApiUrl}/recipes/${id}`,
//         {
//           recipeId: id,
//           userId: user.id,
//           content: comment,
//         }
//       );

//       const newComment = response.data;

//       setComments((prev) => [newComment, ...prev]);
//       setComment('');
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className={RecipeDetailConstants.loadingSpinnerClass}></div>
//       </div>
//     );

//   if (!recipe)
//     return (
//       <p className="text-center text-2xl text-red-500 mt-8">Recipe not found</p>
//     );

//   const ingredientsArray = Array.isArray(recipe.ingredients)
//     ? recipe.ingredients
//     : typeof recipe.ingredients === 'string'
//     ? recipe.ingredients.split(',').map((item) => item.trim())
//     : [];

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
//       <img
//         src={recipe.image || '/images/default-recipe.jpg'}
//         alt={recipe.title}
//         className={RecipeDetailConstants.recipeImageClass}
//       />
//       <h1 className={RecipeDetailConstants.recipeTitleClass}>{recipe.title}</h1>
//       <p className={RecipeDetailConstants.recipeDescriptionClass}>
//         {recipe.description}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Ingredients
//           </h3>
//           <ul className={RecipeDetailConstants.ingredientListClass}>
//             {ingredientsArray.length > 0 ? (
//               ingredientsArray.map((ingredient, index) => (
//                 <li key={index} className="text-gray-600">
//                   {ingredient}
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No ingredients available.</p>
//             )}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Instructions
//           </h3>
//           <p className={RecipeDetailConstants.instructionTextClass}>
//             {recipe.instructions}
//           </p>
//         </div>
//       </div>

//       {/* Comments Section */}
//       {/* <div className="space-y-4">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>

//         {comments.length ? (
//           <>
//             {comments
//               .slice(0, showAllComments ? comments.length : 3)
//               .map((c) => (
//                 <div
//                   key={c.id}
//                   className={RecipeDetailConstants.commentContainerClass}
//                 >
//                   <p className="text-gray-800">
//                     <span className="font-semibold">{c.user}:</span> {c.content}
//                   </p>
//                 </div>
//               ))}

//             {comments.length > 3 && (
//               <button
//                 onClick={() => setShowAllComments((prev) => !prev)}
//                 className="text-blue-500 hover:underline mt-2"
//               >
//                 {showAllComments ? 'Show Less' : 'Show All Comments'}
//               </button>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div> */}
//       <div className="space-y-4">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>

//         {comments.length ? (
//           <>
//             {comments
//               .slice(0, showAllComments ? comments.length : 3)
//               .map((c) => (
//                 <div
//                   key={c.id} // Use the unique comment_id
//                   className={RecipeDetailConstants.commentContainerClass}
//                 >
//                   <p className="text-gray-800">
//                     <span className="font-semibold">
//                       {c.username || 'Anonymous'}:
//                     </span>{' '}
//                     {c.content}
//                   </p>
//                 </div>
//               ))}

//             {comments.length > 3 && (
//               <button
//                 onClick={() => setShowAllComments((prev) => !prev)}
//                 className="text-blue-500 hover:underline mt-2"
//               >
//                 {showAllComments ? 'Show Less' : 'Show All Comments'}
//               </button>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>

//       {/* Comment Input */}
//       <div className="mt-4">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           Add a Comment
//         </h3>
//         <textarea
//           className={RecipeDetailConstants.commentTextAreaClass}
//           rows={3}
//           placeholder="Write your comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <button
//           onClick={handleCommentSubmit}
//           className={RecipeDetailConstants.submitButtonClass}
//         >
//           Submit Comment
//         </button>
//       </div>

//       {/* Modal for Login Prompt */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-xl font-bold mb-4">Login Required</h2>
//             <p className="text-gray-700 mb-4">
//               You must be logged in to comment.
//             </p>
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Go to Login
//             </button>
//             <button
//               onClick={() => setShowModal(false)}
//               className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { RecipeDetailConstants } from '../constants/RecipedetailsConstant';

// interface Comment {
//   id: number;
//   content: string;
//   user: string;
//   username: string;
//   createdAt: string;
// }
// interface User {
//   username: string;
// }

// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   ingredients: string[] | string;
//   instructions: string;
//   preparationTime: number;
//   difficulty: string;
//   cuisine: string;
//   mealType: string;
//   rating: number;
//   user_id: number; // Add user_id to identify recipe owner
// }
// interface Rating{
//   rateid:number;
//   rate:number;

// }

// const RecipeDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [comment, setComment] = useState('');
//   // const [userRating, setUserRating] = useState(0);
//   const [userRating, setUserRating]= useState<Rating[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAllComments, setShowAllComments] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.apiUrl}${id}`
//         );
//         setRecipe(response.data);
//       } catch (error) {
//         console.error('Error fetching recipe:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.commentApiUrl}/comments/${id}`
//         );
//         console.log('Fetched Comments:', response.data);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchRecipe();
//     fetchComments();
//   }, [id]);

//   // const handleCommentSubmit = async () => {
//   //   if (!user) {
//   //     setShowModal(true);
//   //     return;
//   //   }

//   //   if (!comment.trim() || !id) return;

//   //   // Check if the logged-in user is the recipe owner
//   //   if (recipe && recipe.user_id === user.id) {
//   //     alert("You can't comment on your own recipe.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post(
//   //       `${RecipeDetailConstants.commentApiUrl}/recipes/${id}`,
//   //       {
//   //         recipeId: id,
//   //         userId: user.id,
//   //         content: comment,
//   //       }
//   //     );

//   //     const newComment = response.data;
//   //     setComments((prev) => [newComment, ...prev]);
//   //     setComment('');
//   //   } catch (error) {
//   //     console.error('Error posting comment:', error);
//   //   }
//   // };

//   const handleCommentSubmit = async () => {
//     if (!user) {
//       setShowModal(true);
//       return;
//     }

//     if (!comment.trim() || !id) return;

//     if (recipe && recipe.user_id === user.id) {
//       alert("You can't comment on your own recipe.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${RecipeDetailConstants.commentApiUrl}/recipes/${id}`,
//         {
//           recipeId: id,
//           userId: user.id,
//           content: comment,
//         }
//       );

//       if (response.data) {
//         console.log('New comment response:', response.data); // Debugging

//         const newComment: Comment = {
//           id: response.data.comment_id,
//           content: response.data.content,
//           user: response.data.user_id,
//           username: response.data.username || user.username, // Ensure username is assigned
//           createdAt: response.data.createdAt,
//         };

//         setComments((prev) => [newComment, ...prev]); // Update state with new comment
//       }

//       setComment('');
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   //rating
//   useEffect(() => {
//     if (!id) return;

//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.apiUrl}${id}`
//         );
//         setRecipe(response.data);
//       } catch (error) {
//         console.error('Error fetching recipe:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchRating = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/ratings/rate/${id}`
//         );
//         console.log('Fetched rating:', response.data);
//         setUserRating(response.data);
//       } catch (error) {
//         console.error('Error fetching rating:', error);
//       }
//     };

//     fetchRecipe();
//     fetchRating();
//   }, [id]);

//   const handlerateSubmit = async () => {
//     if (!user) {
//       setShowModal(true);
//       return;
//     }

//     // if (!comment.trim() || !id) return;

//     if (recipe && recipe.user_id === user.id) {
//       alert("You can't rate on your own recipe.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/ratings/rate`,
//         {
//           recipeId: id,
//           userId: user.id,
//           rating: rate,
//         }
//       );

//       if (response.data) {
//         console.log('New rate response:', response.data); // Debugging

//         const newComment: Comment = {
//           id: response.data.comment_id,
//           content: response.data.content,
//           user: response.data.user_id,
//           username: response.data.username || user.username, // Ensure username is assigned
//           createdAt: response.data.createdAt,
//         };

//         setComments((prev) => [newComment, ...prev]); // Update state with new comment
//       }

//       setComment('');
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className={RecipeDetailConstants.loadingSpinnerClass}></div>
//       </div>
//     );

//   if (!recipe)
//     return (
//       <p className="text-center text-2xl text-red-500 mt-8">Recipe not found</p>
//     );

//   const ingredientsArray = Array.isArray(recipe.ingredients)
//     ? recipe.ingredients
//     : typeof recipe.ingredients === 'string'
//     ? recipe.ingredients.split(',').map((item) => item.trim())
//     : [];

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
//       <img
//         src={recipe.image || '/images/default-recipe.jpg'}
//         alt={recipe.title}
//         className={RecipeDetailConstants.recipeImageClass}
//       />
//       <h1 className={RecipeDetailConstants.recipeTitleClass}>{recipe.title}</h1>
//       <p className={RecipeDetailConstants.recipeDescriptionClass}>
//         {recipe.description}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Ingredients
//           </h3>
//           <ul className={RecipeDetailConstants.ingredientListClass}>
//             {ingredientsArray.length > 0 ? (
//               ingredientsArray.map((ingredient, index) => (
//                 <li key={index} className="text-gray-600">
//                   {ingredient}
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No ingredients available.</p>
//             )}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Instructions
//           </h3>
//           <p className={RecipeDetailConstants.instructionTextClass}>
//             {recipe.instructions}
//           </p>
//         </div>
//       </div>

//       {/* Rating */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           Rate this Recipe
//         </h3>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => setUserRating(star)}
//               className={`${RecipeDetailConstants.ratingButtonClass} ${
//                 userRating >= star ? 'text-yellow-400' : 'text-gray-300'
//               }`}
//             >
//               ★
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Comments Section */}
//       <div className="space-y-4">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>

//         {comments.length ? (
//           <>
//             {comments
//               .slice(0, showAllComments ? comments.length : 3)
//               .map((c) => (
//                 <div
//                   key={c.id} // Use the unique comment_id
//                   className={RecipeDetailConstants.commentContainerClass}
//                 >
//                   <p className="text-gray-800">
//                     <span className="font-semibold">
//                       {c.username || 'Anonymous'}:
//                     </span>{' '}
//                     {c.content}
//                   </p>
//                 </div>
//               ))}

//             {comments.length > 3 && (
//               <button
//                 onClick={() => setShowAllComments((prev) => !prev)}
//                 className="text-blue-500 hover:underline mt-2"
//               >
//                 {showAllComments ? 'Show Less' : 'Show All Comments'}
//               </button>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>

//       {/* Comment Input */}
//       {recipe.user_id !== user?.id && (
//         <div className="mt-4">
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Add a Comment
//           </h3>
//           <textarea
//             className={RecipeDetailConstants.commentTextAreaClass}
//             rows={3}
//             placeholder="Write your comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <button
//             onClick={handleCommentSubmit}
//             className={RecipeDetailConstants.submitButtonClass}
//           >
//             Submit Comment
//           </button>
//         </div>
//       )}

//       {/* Modal for Login Prompt */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-xl font-bold mb-4">Login Required</h2>
//             <p className="text-gray-700 mb-4">
//               You must be logged in to comment.
//             </p>
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Go to Login
//             </button>
//             <button
//               onClick={() => setShowModal(false)}
//               className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { RecipeDetailConstants } from '../constants/RecipedetailsConstant';

// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   ingredients: string[] | string;
//   instructions: string;
//   preparationTime: number;
//   difficulty: string;
//   cuisine: string;
//   mealType: string;
//   rating: number;
//   user_id: number;
// }

// interface Comment {
//   id: number;
//   content: string;
//   username: string;
//   createdAt: string;
// }

// const RecipeDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [comment, setComment] = useState('');
//   const [userRating, setUserRating] = useState<number>(0);
//   const [loading, setLoading] = useState(true);
//   const [showAllComments, setShowAllComments] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.apiUrl}${id}`
//         );
//         setRecipe(response.data);
//       } catch (error) {
//         console.error('Error fetching recipe:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(
//           `${RecipeDetailConstants.commentApiUrl}/comments/${id}`
//         );
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     const fetchUserRating = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/ratings/rate/${id}`
//         );
//         setUserRating(response.data?.rating || 0);
//       } catch (error) {
//         console.error('Error fetching rating:', error);
//       }
//     };

//     fetchRecipe();
//     fetchComments();
//     fetchUserRating();
//   }, [id]);

//   const handleCommentSubmit = async () => {
//     if (!user) {
//       setShowModal(true);
//       return;
//     }

//     if (!comment.trim() || !id) return;

//     if (recipe && recipe.user_id === user.id) {
//       alert("You can't comment on your own recipe.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${RecipeDetailConstants.commentApiUrl}/recipes/${id}`,
//         {
//           recipeId: id,
//           userId: user.id,
//           content: comment,
//         }
//       );

//       const newComment: Comment = {
//         id: response.data.comment_id,
//         content: response.data.content,
//         username: response.data.username || user.username,
//         createdAt: response.data.createdAt,
//       };

//       setComments((prev) => [newComment, ...prev]);
//       setComment('');
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   const handleRateSubmit = async (ratingValue: number) => {
//     if (!user) {
//       setShowModal(true);
//       return;
//     }

//     if (recipe && recipe.user_id === user.id) {
//       alert("You can't rate your own recipe.");
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:3000/api/ratings/rate`, {
//         recipeId: id,
//         userId: user.id,
//         rating: ratingValue,
//       });

//       setUserRating(ratingValue);
//     } catch (error) {
//       console.error('Error posting rating:', error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className={RecipeDetailConstants.loadingSpinnerClass}></div>
//       </div>
//     );

//   if (!recipe)
//     return (
//       <p className="text-center text-2xl text-red-500 mt-8">Recipe not found</p>
//     );

//   const ingredientsArray = Array.isArray(recipe.ingredients)
//     ? recipe.ingredients
//     : typeof recipe.ingredients === 'string'
//     ? recipe.ingredients.split(',').map((item) => item.trim())
//     : [];

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
//       <img
//         src={recipe.image || '/images/default-recipe.jpg'}
//         alt={recipe.title}
//         className={RecipeDetailConstants.recipeImageClass}
//       />
//       <h1 className={RecipeDetailConstants.recipeTitleClass}>{recipe.title}</h1>
//       <p className={RecipeDetailConstants.recipeDescriptionClass}>
//         {recipe.description}
//       </p>

//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           Rate this Recipe
//         </h3>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => handleRateSubmit(star)}
//               className={`${RecipeDetailConstants.ratingButtonClass} ${
//                 userRating >= star ? 'text-yellow-400' : 'text-gray-300'
//               }`}
//             >
//               ★
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>
//         {comments.length ? (
//           <>
//             {comments
//               .slice(0, showAllComments ? comments.length : 3)
//               .map((c) => (
//                 <div
//                   key={c.id}
//                   className={RecipeDetailConstants.commentContainerClass}
//                 >
//                   <p className="text-gray-800">
//                     <span className="font-semibold">{c.username}:</span>{' '}
//                     {c.content}
//                   </p>
//                 </div>
//               ))}
//             {comments.length > 3 && (
//               <button
//                 onClick={() => setShowAllComments((prev) => !prev)}
//                 className="text-blue-500 hover:underline mt-2"
//               >
//                 {showAllComments ? 'Show Less' : 'Show All Comments'}
//               </button>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>

//       {recipe.user_id !== user?.id && (
//         <div className="mt-4">
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//             Add a Comment
//           </h3>
//           <textarea
//             className={RecipeDetailConstants.commentTextAreaClass}
//             rows={3}
//             placeholder="Write your comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <button
//             onClick={handleCommentSubmit}
//             className={RecipeDetailConstants.submitButtonClass}
//           >
//             Submit Comment
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { RecipeDetailConstants } from '../constants/RecipedetailsConstant';

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
  user_id: number;
}

interface Comment {
  id: number;
  content: string;
  username: string;
  createdAt: string;
}

const RecipeDetail: React.FC = ({ theme }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number | null>(null); // NEW: State for average rating
  const [loading, setLoading] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);
  // const [showModal, setShowModal] = useState(false);

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

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${RecipeDetailConstants.commentApiUrl}/comments/${id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchUserRating = () => {
      // Get the rating from localStorage (if exists)
      const storedRating = localStorage.getItem(`userRating_${id}`);
      if (storedRating) {
        setUserRating(Number(storedRating));
      }
    };

    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/ratings/rate/${id}`
        );
        if (response.data && response.data.averageRating !== undefined) {
          const averageRating = parseFloat(response.data.averageRating); // Parse the string to a float
          if (!isNaN(averageRating)) {
            setAverageRating(averageRating); // Set the numeric value
          }
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchRecipe();
    fetchComments();
    fetchUserRating();
    fetchAverageRating(); // Ensure to fetch average rating
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    if (!comment.trim() || !id) return;

    if (recipe && recipe.user_id === user.id) {
      alert("You can't comment on your own recipe.");
      return;
    }

    try {
      const response = await axios.post(
        `${RecipeDetailConstants.commentApiUrl}/recipes/${id}`,
        {
          recipeId: id,
          userId: user.id,
          content: comment,
        }
      );

      const newComment: Comment = {
        id: response.data.comment_id,
        content: response.data.content,
        username: response.data.username || user.username,
        createdAt: response.data.createdAt,
      };

      setComments((prev) => [newComment, ...prev]);
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleRateSubmit = async (ratingValue: number) => {
    if (!user) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    if (recipe && recipe.user_id === user.id) {
      alert("You can't rate your own recipe.");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/ratings/rate`, {
        recipeId: id,
        userId: user.id,
        rating: ratingValue,
      });

      localStorage.setItem(`userRating_${id}`, ratingValue.toString());
      setUserRating(ratingValue);
    } catch (error) {
      console.error('Error posting rating:', error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className={RecipeDetailConstants.loadingSpinnerClass}></div>
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

  // return (
  //   <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
  //     <img
  //       src={recipe.image || '/images/default-recipe.jpg'}
  //       alt={recipe.title}
  //       className={RecipeDetailConstants.recipeImageClass}
  //     />
  //     <h1 className={RecipeDetailConstants.recipeTitleClass}>{recipe.title}</h1>

  //     {/* NEW: Average Rating Display */}
  //     <div className="flex items-center gap-2 mt-2">
  //       <span className="text-xl font-semibold">Rating:</span>
  //       {typeof averageRating === 'number' && !isNaN(averageRating) ? (
  //         <span className="text-yellow-500 text-lg font-bold">
  //           {averageRating.toFixed(1)} ★
  //         </span>
  //       ) : (
  //         <span className="text-gray-500">No ratings yet</span>
  //       )}
  //     </div>

  //     <p className={RecipeDetailConstants.recipeDescriptionClass}>
  //       {recipe.description}
  //     </p>
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
  //       <div>
  //         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
  //           Ingredients
  //         </h3>

  //         <ul className={RecipeDetailConstants.ingredientListClass}>
  //           {ingredientsArray.length > 0 ? (
  //             ingredientsArray.map((ingredient, index) => (
  //               <li key={index} className="text-gray-600">
  //                 {ingredient}
  //               </li>
  //             ))
  //           ) : (
  //             <p className="text-gray-500">No ingredients available.</p>
  //           )}
  //         </ul>
  //       </div>
  //       <div>
  //         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
  //           Instructions
  //         </h3>
  //         <p className={RecipeDetailConstants.instructionTextClass}>
  //           {recipe.instructions}
  //         </p>
  //       </div>

  //       <div className="flex flex-wrap gap-4 mb-8">
  //         <div className={RecipeDetailConstants.detailTagClass}>
  //           <span className="font-semibold">Prep Time:</span>
  //           {recipe.preparationTime} mins
  //         </div>

  //         <div className={RecipeDetailConstants.detailTagClass}>
  //           <span className="font-semibold">Difficulty:</span>{' '}
  //           {recipe.difficulty}
  //         </div>

  //         <div className={RecipeDetailConstants.detailTagClass}>
  //           <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
  //         </div>

  //         <div className={RecipeDetailConstants.detailTagClass}>
  //           <span className="font-semibold">Meal Type:</span> {recipe.mealType}
  //         </div>
  //       </div>
  //     </div>

  //     <div className="mb-8">
  //       <h3 className="text-2xl font-semibold text-gray-900 mb-4">
  //         Rate this Recipe
  //       </h3>
  //       <div className="flex gap-2">
  //         {[1, 2, 3, 4, 5].map((star) => (
  //           <button
  //             key={star}
  //             onClick={() => handleRateSubmit(star)}
  //             className={`${RecipeDetailConstants.ratingButtonClass} ${
  //               userRating >= star ? 'text-yellow-400' : 'text-gray-300'
  //             }`}
  //           >
  //             ★
  //           </button>
  //         ))}
  //       </div>
  //     </div>

  //     <div className="space-y-4">
  //       <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>
  //       {comments.length ? (
  //         <>
  //           {comments
  //             .slice(0, showAllComments ? comments.length : 3)
  //             .map((c) => (
  //               <div
  //                 key={c.id}
  //                 className={RecipeDetailConstants.commentContainerClass}
  //               >
  //                 <p className="text-gray-800">
  //                   <span className="font-semibold">{c.username}:</span>{' '}
  //                   {c.content}
  //                 </p>
  //               </div>
  //             ))}
  //           {comments.length > 3 && (
  //             <button
  //               onClick={() => setShowAllComments((prev) => !prev)}
  //               className="text-blue-500 hover:underline mt-2"
  //             >
  //               {showAllComments ? 'Show Less' : 'Show All Comments'}
  //             </button>
  //           )}
  //         </>
  //       ) : (
  //         <p className="text-gray-500">No comments yet.</p>
  //       )}
  //     </div>

  //     {recipe.user_id !== user?.id && (
  //       <div className="mt-4">
  //         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
  //           Add a Comment
  //         </h3>
  //         <textarea
  //           className={RecipeDetailConstants.commentTextAreaClass}
  //           rows={3}
  //           placeholder="Write your comment..."
  //           value={comment}
  //           onChange={(e) => setComment(e.target.value)}
  //         />
  //         <button
  //           onClick={handleCommentSubmit}
  //           className={RecipeDetailConstants.submitButtonClass}
  //         >
  //           Submit Comment
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-xl shadow-lg mt-8 ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'
      }`} // Conditional background and text color
    >
      <img
        src={recipe.image || '/images/default-recipe.jpg'}
        alt={recipe.title}
        className={RecipeDetailConstants.recipeImageClass}
      />
      <h1
        className={`${RecipeDetailConstants.recipeTitleClass} ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`} // Conditional text color for title
      >
        {recipe.title}
      </h1>

      {/* Average Rating Display */}
      <div className="flex items-center gap-2 mt-2">
        <span
          className={`text-xl font-semibold ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
        >
          Rating:
        </span>
        {typeof averageRating === 'number' && !isNaN(averageRating) ? (
          <span
            className={`text-yellow-500 text-lg font-bold ${
              theme === 'light' ? 'text-yellow-500' : 'text-yellow-400'
            }`}
          >
            {averageRating.toFixed(1)} ★
          </span>
        ) : (
          <span
            className={`text-gray-500 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            No ratings yet
          </span>
        )}
      </div>

      <p
        className={`${RecipeDetailConstants.recipeDescriptionClass} ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}
      >
        {recipe.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3
            className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Ingredients
          </h3>

          <ul className={RecipeDetailConstants.ingredientListClass}>
            {ingredientsArray.length > 0 ? (
              ingredientsArray.map((ingredient, index) => (
                <li
                  key={index}
                  className={`${
                    theme === 'light' ? 'text-gray-600' : 'text-white'
                  }`}
                >
                  {ingredient}
                </li>
              ))
            ) : (
              <p
                className={`${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                No ingredients available.
              </p>
            )}
          </ul>
        </div>

        <div>
          <h3
            className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Instructions
          </h3>
          <p
            className={`${RecipeDetailConstants.instructionTextClass} ${
              theme === 'light' ? 'text-gray-500' : 'text-white'
            }`}
          >
            {recipe.instructions}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div
            className={`${RecipeDetailConstants.detailTagClass} ${
              theme === 'light' ? 'text-gray-800' : 'text-black'
            }`}
          >
            <span className="font-semibold">Prep Time:</span>
            {recipe.preparationTime} mins
          </div>

          <div
            className={`${RecipeDetailConstants.detailTagClass} ${
              theme === 'light' ? 'text-gray-800' : 'text-black'
            }`}
          >
            <span className="font-semibold">Difficulty:</span>{' '}
            {recipe.difficulty}
          </div>

          <div
            className={`${RecipeDetailConstants.detailTagClass} ${
              theme === 'light' ? 'text-gray-800' : 'text-black'
            }`}
          >
            <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
          </div>

          <div
            className={`${RecipeDetailConstants.detailTagClass} ${
              theme === 'light' ? 'text-gray-800' : 'text-black'
            }`}
          >
            <span className="font-semibold">Meal Type:</span> {recipe.mealType}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3
          className={`text-2xl font-semibold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
        >
          Rate this Recipe
        </h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRateSubmit(star)}
              className={`${RecipeDetailConstants.ratingButtonClass} ${
                userRating >= star ? 'text-yellow-400' : 'text-gray-300'
              } ${
                theme === 'light'
                  ? 'hover:text-yellow-400'
                  : 'hover:text-yellow-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3
          className={`text-2xl font-semibold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
        >
          Comments
        </h3>
        {comments.length ? (
          <>
            {comments
              .slice(0, showAllComments ? comments.length : 3)
              .map((c) => (
                <div
                  key={c.id}
                  className={RecipeDetailConstants.commentContainerClass}
                >
                  <p
                    className={`${
                      theme === 'light' ? 'text-gray-800' : 'text-black'
                    }`}
                  >
                    <span className="font-semibold">{c.username}:</span>{' '}
                    {c.content}
                  </p>
                </div>
              ))}
            {comments.length > 3 && (
              <button
                onClick={() => setShowAllComments((prev) => !prev)}
                className={`text-blue-500 hover:underline mt-2 ${
                  theme === 'light' ? 'text-blue-500' : 'text-blue-300'
                }`}
              >
                {showAllComments ? 'Show Less' : 'Show All Comments'}
              </button>
            )}
          </>
        ) : (
          <p
            className={`${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            No comments yet.
          </p>
        )}
      </div>

      {recipe.user_id !== user?.id && (
        <div className="mt-4">
          <h3
            className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Add a Comment
          </h3>
          <textarea
            className={`${RecipeDetailConstants.commentTextAreaClass} ${
              theme === 'light'
                ? 'bg-white text-gray-900'
                : 'bg-gray-700 text-white'
            }`}
            rows={3}
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className={`${RecipeDetailConstants.submitButtonClass} ${
              theme === 'light'
                ? 'bg-indigo-500 text-white'
                : 'bg-indigo-700 text-white'
            }`}
          >
            Submit Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;

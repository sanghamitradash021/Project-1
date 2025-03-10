// import type React from "react";
// import { useState } from "react";
// import axios from "axios";

// interface EditRecipeModalProps {
//   recipe: any;
//   onClose: () => void;
//   onUpdate: (updatedRecipe: any) => void;
// }

// const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
//   recipe,
//   onClose,
//   onUpdate,
// }) => {
//   const [formData, setFormData] = useState({
//     title: recipe.title,
//     description: recipe.description,
//     ingredients: recipe.ingredients,
//     instructions: recipe.instructions,
//     preparationTime: recipe.preparationTime,
//     difficulty: recipe.difficulty,
//     cuisine: recipe.cuisine,
//     mealType: recipe.mealType,
//     image: recipe.image || "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await axios.put(
//         `http://localhost:3000/api/recipes/${recipe.recipe_id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("Recipe updated successfully!");
//       onUpdate(response.data);
//       onClose();
//     } catch (error) {
//       console.error("Error updating recipe:", error);
//       alert("Failed to update recipe.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
//           {/* Header */}
//           <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
//             <h2 className="text-xl font-semibold text-white">Edit Recipe</h2>
//             <button
//               onClick={onClose}
//               className="absolute right-4 top-4 rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
//             >
//               <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleUpdate} className="space-y-6 p-6">
//             <div className="space-y-4">
//               {/* Title */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Recipe Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Ingredients */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Ingredients
//                 </label>
//                 <textarea
//                   name="ingredients"
//                   value={formData.ingredients}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Instructions */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Instructions
//                 </label>
//                 <textarea
//                   name="instructions"
//                   value={formData.instructions}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Two Column Grid */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {/* Preparation Time */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Preparation Time (mins)
//                   </label>
//                   <input
//                     type="number"
//                     name="preparationTime"
//                     value={formData.preparationTime}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>

//                 {/* Difficulty */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Difficulty
//                   </label>
//                   <select
//                     name="difficulty"
//                     value={formData.difficulty}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   >
//                     <option value="Easy">Easy</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Hard">Hard</option>
//                   </select>
//                 </div>

//                 {/* Cuisine */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Cuisine
//                   </label>
//                   <input
//                     type="text"
//                     name="cuisine"
//                     value={formData.cuisine}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>

//                 {/* Meal Type */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Meal Type
//                   </label>
//                   <input
//                     type="text"
//                     name="mealType"
//                     value={formData.mealType}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Recipe Image
//                 </label>
//                 <div className="mt-1 flex items-center space-x-4">
//                   {formData.image && (
//                     <img
//                       src={
//                         typeof formData.image === "string"
//                           ? formData.image
//                           : URL.createObjectURL(formData.image)
//                       }
//                       alt="Recipe preview"
//                       className="h-16 w-16 rounded-lg object-cover"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFormData({ ...formData, image: file });
//                       }
//                     }}
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-end space-x-4 border-t pt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="mr-2 h-4 w-4 animate-spin"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Updating...
//                   </>
//                 ) : (
//                   "Update Recipe"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditRecipeModal;

// import type React from 'react';
// import { useState } from 'react';
// import axios from 'axios';

// /**
//  * Props for EditRecipeModal component
//  * @interface EditRecipeModalProps
//  * @property {any} recipe - The recipe to be edited
//  * @property {() => void} onClose - Callback function to close the modal
//  * @property {(updatedRecipe: any) => void} onUpdate - Callback function to update the recipe
//  */
// interface EditRecipeModalProps {
//   recipe: any;
//   onClose: () => void;
//   onUpdate: (updatedRecipe: any) => void;
// }

// /**
//  * EditRecipeModal component to edit a recipe
//  * @component
//  * @param {EditRecipeModalProps} props - The props for the modal
//  * @returns {React.FC} - The rendered component
//  */
// const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
//   recipe,
//   onClose,
//   onUpdate,
// }) => {
//   // State to hold the form data
//   const [formData, setFormData] = useState({
//     title: recipe.title,
//     description: recipe.description,
//     ingredients: recipe.ingredients,
//     instructions: recipe.instructions,
//     preparationTime: recipe.preparationTime,
//     difficulty: recipe.difficulty,
//     cuisine: recipe.cuisine,
//     mealType: recipe.mealType,
//     image: recipe.image || '',
//   });

//   // State to track loading state
//   const [loading, setLoading] = useState(false);

//   /**
//    * Handle input change and update form data
//    * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The change event
//    */
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /**
//    * Handle form submission to update the recipe
//    * @param {React.FormEvent} e - The form submit event
//    * @returns {Promise<void>} - Updates the recipe or shows an error
//    */
//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = sessionStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:3000/api/recipes/${recipe.recipe_id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       alert('Recipe updated successfully!');
//       onUpdate(response.data);
//       onClose();
//     } catch (error) {
//       console.error('Error updating recipe:', error);
//       alert('Failed to update recipe.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
//           {/* Header */}
//           <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
//             <h2 className="text-xl font-semibold text-white">Edit Recipe</h2>
//             <button
//               onClick={onClose}
//               className="absolute right-4 top-4 rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
//             >
//               <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleUpdate} className="space-y-6 p-6">
//             <div className="space-y-4">
//               {/* Title */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Recipe Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Ingredients */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Ingredients
//                 </label>
//                 <textarea
//                   name="ingredients"
//                   value={formData.ingredients}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Instructions */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Instructions
//                 </label>
//                 <textarea
//                   name="instructions"
//                   value={formData.instructions}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               {/* Two Column Grid */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {/* Preparation Time */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Preparation Time (mins)
//                   </label>
//                   <input
//                     type="number"
//                     name="preparationTime"
//                     value={formData.preparationTime}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>

//                 {/* Difficulty */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Difficulty
//                   </label>
//                   <select
//                     name="difficulty"
//                     value={formData.difficulty}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   >
//                     <option value="Easy">Easy</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Hard">Hard</option>
//                   </select>
//                 </div>

//                 {/* Cuisine */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Cuisine
//                   </label>
//                   <input
//                     type="text"
//                     name="cuisine"
//                     value={formData.cuisine}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>

//                 {/* Meal Type */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Meal Type
//                   </label>
//                   <input
//                     type="text"
//                     name="mealType"
//                     value={formData.mealType}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Recipe Image
//                 </label>
//                 <div className="mt-1 flex items-center space-x-4">
//                   {formData.image && (
//                     <img
//                       src={
//                         typeof formData.image === 'string'
//                           ? formData.image
//                           : URL.createObjectURL(formData.image)
//                       }
//                       alt="Recipe preview"
//                       className="h-16 w-16 rounded-lg object-cover"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFormData({ ...formData, image: file });
//                       }
//                     }}
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-end space-x-4 border-t pt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="mr-2 h-4 w-4 animate-spin"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Updating...
//                   </>
//                 ) : (
//                   'Update Recipe'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditRecipeModal;

// import type React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import { FORM_LABELS } from '../constants/formLabels'; // Import the constants

// interface EditRecipeModalProps {
//   recipe: any;
//   onClose: () => void;
//   onUpdate: (updatedRecipe: any) => void;
// }

// const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
//   recipe,
//   onClose,
//   onUpdate,
// }) => {
//   const [formData, setFormData] = useState({
//     title: recipe.title,
//     description: recipe.description,
//     ingredients: recipe.ingredients,
//     instructions: recipe.instructions,
//     preparationTime: recipe.preparationTime,
//     difficulty: recipe.difficulty,
//     cuisine: recipe.cuisine,
//     mealType: recipe.mealType,
//     image: recipe.image || '',
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = sessionStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:3000/api/recipes/${recipe.recipe_id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       alert('Recipe updated successfully!');
//       onUpdate(response.data);
//       onClose();
//     } catch (error) {
//       console.error('Error updating recipe:', error);
//       alert('Failed to update recipe.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
//           <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
//             <h2 className="text-xl font-semibold text-white">Edit Recipe</h2>
//             <button
//               onClick={onClose}
//               className="absolute right-4 top-4 rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
//             >
//               <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>

//           <form onSubmit={handleUpdate} className="space-y-6 p-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   {FORM_LABELS.recipeTitle}
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   {FORM_LABELS.description}
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   {FORM_LABELS.ingredients}
//                 </label>
//                 <textarea
//                   name="ingredients"
//                   value={formData.ingredients}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   {FORM_LABELS.instructions}
//                 </label>
//                 <textarea
//                   name="instructions"
//                   value={formData.instructions}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     {FORM_LABELS.preparationTime}
//                   </label>
//                   <input
//                     type="number"
//                     name="preparationTime"
//                     value={formData.preparationTime}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     {FORM_LABELS.difficulty}
//                   </label>
//                   <select
//                     name="difficulty"
//                     value={formData.difficulty}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   >
//                     <option value="Easy">Easy</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Hard">Hard</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     {FORM_LABELS.cuisine}
//                   </label>
//                   <input
//                     type="text"
//                     name="cuisine"
//                     value={formData.cuisine}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     {FORM_LABELS.mealType}
//                   </label>
//                   <input
//                     type="text"
//                     name="mealType"
//                     value={formData.mealType}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   {FORM_LABELS.recipeImage}
//                 </label>
//                 <div className="mt-1 flex items-center space-x-4">
//                   {formData.image && (
//                     <img
//                       src={
//                         typeof formData.image === 'string'
//                           ? formData.image
//                           : URL.createObjectURL(formData.image)
//                       }
//                       alt="Recipe preview"
//                       className="h-16 w-16 rounded-lg object-cover"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFormData({ ...formData, image: file });
//                       }
//                     }}
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-end space-x-4 border-t pt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="mr-2 h-4 w-4 animate-spin"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Updating...
//                   </>
//                 ) : (
//                   'Update Recipe'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditRecipeModal;

import type React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FORM_LABELS } from '../constants/formLabels'; // Import the constants

interface EditRecipeModalProps {
  recipe: any;
  onClose: () => void;
  onUpdate: (updatedRecipe: any) => void;
}

const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
  recipe,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients, // Adding ingredients field
    instructions: recipe.instructions,
    preparationTime: recipe.preparationTime,
    difficulty: recipe.difficulty,
    cuisine: recipe.cuisine,
    mealType: recipe.mealType,
    image: recipe.image || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/recipes/${recipe.recipe_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      onUpdate(response.data);
      onClose();
      window.location.reload(); // Automatically refresh the page
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl max-h-[90vh]">
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Edit Recipe</h2>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {FORM_LABELS.recipeTitle}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {FORM_LABELS.description}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {FORM_LABELS.ingredients} {/* Added Ingredients Label */}
                </label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 transition-colors focus:border-purple-500 focus:bg-white focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {FORM_LABELS.cuisine}
                </label>
                <input
                  type="text"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {FORM_LABELS.mealType}
                </label>
                <input
                  type="text"
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {FORM_LABELS.recipeImage}
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 border-t pt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {loading ? 'Updating...' : 'Update Recipe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeModal;

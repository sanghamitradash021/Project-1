// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CreateRecipe: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     instructions: '',
//     imageUrl: '',
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // API call will go here
//       // const response = await createRecipe(formData);
//       navigate('/');
//     } catch (error) {
//       console.error('Failed to create recipe:', error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6">Create New Recipe</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             id="description"
//             required
//             rows={3}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="instructions"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Instructions
//           </label>
//           <textarea
//             name="instructions"
//             id="instructions"
//             required
//             rows={6}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={formData.instructions}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="imageUrl"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Image URL
//           </label>
//           <input
//             type="url"
//             name="imageUrl"
//             id="imageUrl"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={formData.imageUrl}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Create Recipe
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateRecipe;

"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call will go here
      // const response = await createRecipe(formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-center space-x-3">
          <svg
            className="h-8 w-8 text-indigo-600"
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
          <h2 className="text-3xl font-bold tracking-tight">
            Create New Recipe
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="group relative rounded-lg border border-gray-200 p-4 hover:border-indigo-500/50">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Enter a catchy title for your recipe"
                className="mt-1 block w-full border-0 bg-transparent p-0 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="group relative rounded-lg border border-gray-200 p-4 hover:border-indigo-500/50">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                required
                rows={3}
                placeholder="Describe your recipe in a few sentences"
                className="mt-1 block w-full border-0 bg-transparent p-0 placeholder:text-gray-400 focus:ring-0"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="group relative rounded-lg border border-gray-200 p-4 hover:border-indigo-500/50">
              <label
                htmlFor="instructions"
                className="block text-sm font-medium text-gray-700"
              >
                Cooking Instructions
              </label>
              <textarea
                name="instructions"
                id="instructions"
                required
                rows={6}
                placeholder="Write step-by-step instructions for your recipe"
                className="mt-1 block w-full border-0 bg-transparent p-0 placeholder:text-gray-400 focus:ring-0"
                value={formData.instructions}
                onChange={handleChange}
              />
            </div>

            <div className="group relative rounded-lg border border-gray-200 p-4 hover:border-indigo-500/50">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Recipe Image
              </label>
              <div className="mt-1 flex items-center space-x-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  required
                  placeholder="Paste the URL of your recipe image"
                  className="block w-full border-0 bg-transparent p-0 placeholder:text-gray-400 focus:ring-0"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Component to create a new recipe.
 * Provides a form with fields for title, description, instructions, and image URL.
 * On form submission, it will send the data to an API (API call to be implemented)
 * and navigate to the home page.
 *
 * @returns {JSX.Element} The rendered `CreateRecipe` component.
 */
const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();

  // State to store the form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    imageUrl: '',
  });

  /**
   * Handles changes in input fields and updates the form data.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event triggered by input or textarea field.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles form submission. Prevents default form behavior,
   * sends the data to an API (API call to be implemented),
   * and navigates to the home page.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call will go here
      // const response = await createRecipe(formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create recipe:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Create New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700"
          >
            Instructions
          </label>
          <textarea
            name="instructions"
            id="instructions"
            required
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.instructions}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;

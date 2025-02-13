import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Fetch the username from session storage to decide if the user is logged in
  const username = sessionStorage.getItem('username');

  return (
    <div className="pt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Recipe App</h1>
        {username ? (
          <div className="space-y-4">
            {/* Show these options only if the user is logged in */}
            <Link
              to="/create-recipe"
              className="block w-64 mx-auto bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Create New Recipe
            </Link>
            <Link
              to="/recipes"
              className="block w-64 mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              View All Recipes
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Show login/signup options if the user is not logged in */}
            <Link
              to="/login"
              className="block w-64 mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-64 mx-auto bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

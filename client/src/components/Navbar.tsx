import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const username = sessionStorage.getItem('username');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    navigate('/login');
  };

  // Function to fetch recipes based on search input
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/recipes/search/${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        if (response.ok) {
          setSearchResults(data);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchRecipes();
    }, 500); // Debounce API calls to avoid excessive requests

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Navigate to recipe details when a recipe is selected
  const handleSelectRecipe = (recipeId: number) => {
    setShowDropdown(false);
    setSearchQuery('');
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="logo.png" alt="Recipe App" />
            <span className="ml-2 text-xl font-bold">Recipe App</span>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 flex items-center justify-center px-2">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-lg flex relative"
            >
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-white rounded-r-lg hover:bg-indigo-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Search'}
              </button>
            </form>

            {/* Search Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {searchResults.map((recipe) => (
                  <li
                    key={recipe.recipe_id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectRecipe(recipe.recipe_id)}
                  >
                    {recipe.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User Dropdown */}
          <div className="flex items-center">
            <Link
              to="/create-recipe"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-yellow-400 hover:bg-indigo-700"
            >
              Create Recipe
            </Link>

            <div className="ml-4 relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>{username}</span>
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <Link
                    to="/my-recipes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Recipes
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

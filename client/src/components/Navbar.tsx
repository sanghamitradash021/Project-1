import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(
    sessionStorage.getItem('username')
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // This will run on initial render to check if there is a session stored username
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername); // Set username from session storage
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    setUsername(null); // Update state immediately
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md w-full fixed top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          🍽️ FOODIEVERSE
        </Link>

        {/* Right: Username & Dropdown */}
        {username ? (
          <div className="relative">
            {/* Hamburger icon showing username */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-white font-semibold flex items-center gap-2 focus:outline-none"
            >
              {username} ⏷ {/* Username displayed here */}
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-40">
                <Link
                  to="/my-recipes" // Link to "My Recipes" page
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  My Recipes
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            {/* Login and Signup buttons */}
            <Link to="/login" className="text-white font-semibold">
              Login
            </Link>
            <Link to="/signup" className="text-white font-semibold">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

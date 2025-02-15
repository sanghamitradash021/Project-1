// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import CreateRecipeModal from './CreateRecipeModal';

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);

//   const username = sessionStorage.getItem('username');

//   const handleLogout = () => {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('username');
//     navigate('/login');
//   };

//   // Function to fetch recipes based on search input
//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setSearchResults([]);
//       setShowDropdown(false);
//       return;
//     }

//     const fetchRecipes = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/recipes/search/${encodeURIComponent(
//             searchQuery
//           )}`
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setSearchResults(data);
//           setShowDropdown(true);
//         } else {
//           setSearchResults([]);
//           setShowDropdown(false);
//         }
//       } catch (error) {
//         console.error('Search failed:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const delayDebounce = setTimeout(() => {
//       fetchRecipes();
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   const handleSelectRecipe = (recipeId: number) => {
//     setShowDropdown(false);
//     setSearchQuery('');
//     navigate(`/recipe/${recipeId}`);
//   };

//   const handleCreateRecipeSuccess = () => {
//     // Refresh the recipe list or show a success message
//     // You can implement this based on your needs
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-10">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between h-16 items-center">
//             {/* Logo */}
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <img className="h-8 w-auto" src="/logo.png" alt="Recipe App" />
//               <span className="ml-2 text-xl font-bold">Recipe App</span>
//             </Link>

//             {/* Search Bar */}
//             <div className="relative flex-1 flex items-center justify-center px-2 max-w-lg">
//               <form
//                 onSubmit={(e) => e.preventDefault()}
//                 className="w-full flex relative"
//               >
//                 <input
//                   type="text"
//                   placeholder="Search recipes..."
//                   className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 disabled:opacity-50"
//                   disabled={loading}
//                 >
//                   {loading ? 'Loading...' : 'Search'}
//                 </button>
//               </form>

//               {/* Search Dropdown */}
//               {showDropdown && searchResults.length > 0 && (
//                 <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 top-full">
//                   {searchResults.map((recipe) => (
//                     <li
//                       key={recipe.id}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => handleSelectRecipe(recipe.id)}
//                     >
//                       <div className="flex items-center">
//                         {recipe.image && (
//                           <img
//                             src={recipe.image}
//                             alt={recipe.title}
//                             className="w-10 h-10 object-cover rounded-full mr-3"
//                           />
//                         )}
//                         <div>
//                           <div className="font-medium">{recipe.title}</div>
//                           <div className="text-sm text-gray-500">
//                             {recipe.description.substring(0, 60)}...
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* Right side buttons */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
//               >
//                 Create Recipe
//               </button>

//               {username ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
//                   >
//                     <span>{username}</span>
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   {isDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//                       <Link
//                         to="/profile"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Profile
//                       </Link>
//                       {/* My Recipes Link */}
//                       <Link
//                         to="/my-recipes"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         My Recipes
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="text-gray-700 hover:text-gray-900 font-medium"
//                 >
//                   Login
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Create Recipe Modal */}
//       <CreateRecipeModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSuccess={handleCreateRecipeSuccess}
//       />
//     </>
//   );
// };

// export default Navbar;

"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateRecipeModal from "./CreateRecipeModal";
import { useLocation } from "react-router-dom";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState<any>(null);
  const [searchResults] = useState<SearchResult[]>([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description:
        "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
      image: "https://source.unsplash.com/random/80x80/?pasta",
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      description: "Grilled chicken chunks in spiced curry sauce.",
      image: "https://source.unsplash.com/random/80x80/?curry",
    },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    let user = sessionStorage.getItem("username");
    setUsername(user);
  }, [location]);
  const handleLogout = () => {
    setUsername(null);
    // Handle logout logic
    sessionStorage.clear();
    navigate("/login");
  };
  const handleCreateRecipeSuccess = () => {
    // Refresh the recipe list or show a success message
    // You can implement this based on your needs
  };
  // fixed top-0 left-0 z-10
  return (
    <>
      <nav
        className="bg-white/80 shadow-lg w-full fixed top-0 left-0 z-10 backdrop-blur-sm"
        // className="fixed top-0 z-10 left-0 border-b bg-white/80 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
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
              <span className="text-xl font-bold">Recipe Hub</span>
            </Link>

            <div className="flex-1 px-8">
              <div className="relative max-w-lg">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    className="w-full rounded-full border-gray-200 bg-gray-50 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                  />
                </div>

                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-lg border bg-white shadow-lg">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/recipe/${result.id}`}
                        className="flex items-center space-x-4 p-4 hover:bg-gray-50"
                        onClick={() => setShowDropdown(false)}
                      >
                        <img
                          src={result.image || "/placeholder.svg"}
                          alt={result.title}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{result.title}</h3>
                          <p className="text-sm text-gray-500">
                            {result.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {username && (
                <div
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
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
                </div>
              )}

              {username && (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <span>{username}</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/my-recipes"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <svg
                          className="h-4 w-4"
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
                        <span>My Recipes</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
              {!username && (
                <Link to="/login">
                  <div className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                    Login
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      {
        <CreateRecipeModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateRecipeSuccess}
        />
      }
    </>
  );
};

export default Navbar;

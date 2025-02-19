// import type React from 'react';
// import { useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import CreateRecipeModal from './CreateRecipeModal';
// import { NavbarConstants } from '../constants/NavbarConstant';
// import { useAuth } from '../context/AuthContext'; // ✅ Import Auth Context

// /**
//  * Interface representing a single search result in the navbar.
//  */
// interface SearchResult {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }

// /**
//  * Navbar component that contains search functionality, user authentication,
//  * and recipe management options.
//  */
// const Navbar: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth(); // ✅ Use Auth Context
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [recipeNotFound, setRecipeNotFound] = useState(false); // State to track recipe not found

//   /**
//    * Effect hook that handles search query updates and fetches recipes based on the query.
//    */
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
//           `${NavbarConstants.API_BASE_URL}${encodeURIComponent(searchQuery)}`
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

//   /**
//    * Handles the selection of a recipe from the search results.
//    * Adds error handling for the "Recipe not found" scenario.
//    */
//   const handleSelectRecipe = async (recipeId: number) => {
//     setShowDropdown(false);
//     setSearchQuery('');
//     try {
//       const response = await fetch(`/api/recipes/${recipeId}`);
//       if (!response.ok) {
//         setRecipeNotFound(true); // Set state to true if recipe is not found
//         navigate('/404'); // Redirect to a "Not Found" page
//         return;
//       }
//       const recipe = await response.json();
//       if (recipe) {
//         navigate(`/recipes/${recipeId}`);
//       } else {
//         setRecipeNotFound(true);
//         navigate('/404');
//       }
//     } catch (error) {
//       setRecipeNotFound(true);
//       navigate('/404'); // Redirect to error page if fetching fails
//       console.error('Error selecting recipe:', error);
//     }
//   };

//   /**
//    * Logs the user out, clears the session, and redirects to the login page.
//    */
//   const handleLogout = () => {
//     logout(); //
//     navigate('/login');
//     setIsDropdownOpen(false);
//   };

//   return (
//     <>
//       <nav className="bg-white/80 shadow-lg w-full fixed top-0 left-0 z-10 backdrop-blur-sm">
//         <div className="mx-auto max-w-7xl px-4">
//           <div className="flex h-16 items-center justify-between">
//             <Link to="/" className="flex items-center space-x-3">
//               <svg
//                 className="h-8 w-8 text-indigo-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M8 2v10M6 2v10M10 2v10M8 14v8"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M16 4c1.657 0 3 1.79 3 4s-1.343 4-3 4-3-1.79-3-4 1.343-4 3-4zM16 12v10"
//                 />
//               </svg>
//               <span className="text-xl font-bold">
//                 {NavbarConstants.LOGO_TEXT}
//               </span>
//             </Link>

//             <div className="flex-1 px-8">
//               <div className="relative max-w-lg">
//                 <input
//                   type="text"
//                   placeholder={NavbarConstants.SEARCH_PLACEHOLDER}
//                   className="w-full rounded-full border-gray-200 bg-gray-50 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={() => setShowDropdown(true)}
//                 />
//                 {showDropdown && searchResults.length > 0 && (
//                   <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-lg border bg-white shadow-lg">
//                     {searchResults.map((result) => (
//                       <Link
//                         key={result.id}
//                         to={`/recipes/${result.id}`}
//                         className="flex items-center space-x-4 p-4 hover:bg-gray-50"
//                         onClick={() => handleSelectRecipe(result.id)} // Handle recipe selection
//                       >
//                         <img
//                           src={
//                             result.image || NavbarConstants.PLACEHOLDER_IMAGE
//                           }
//                           alt={result.title}
//                           className="h-16 w-16 rounded-lg object-cover"
//                         />
//                         <div>
//                           <h3 className="font-medium">{result.title}</h3>
//                           <p className="text-sm text-gray-500">
//                             {result.description}
//                           </p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               {user && (
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
//                 >
//                   {NavbarConstants.CREATE_RECIPE_TEXT}
//                 </button>
//               )}

//               {user && (
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     className="flex items-center space-x-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
//                   >
//                     <span>{user.username}</span>
//                   </button>

//                   {isDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg">
//                       <Link
//                         to="/my-recipes"
//                         onClick={() => setIsDropdownOpen(false)}
//                         className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       >
//                         {NavbarConstants.MY_RECIPES_TEXT}
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                       >
//                         {NavbarConstants.LOGOUT_TEXT}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {!user && (
//                 <Link to="/login">
//                   <div className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
//                     {NavbarConstants.LOGIN_TEXT}
//                   </div>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <CreateRecipeModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSuccess={() => {}}
//       />
//     </>
//   );
// };

// export default Navbar;
import type React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CreateRecipeModal from './CreateRecipeModal';
import { NavbarConstants } from '../constants/NavbarConstant';
import { useAuth } from '../context/AuthContext';

/**
 * Interface representing a single search result in the navbar.
 */
interface SearchResult {
  recipe_id: number;
  title: string;
  description: string;
  image: string;
}

/**
 * Navbar component that contains search functionality, user authentication,
 * and recipe management options.
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recipeNotFound, setRecipeNotFound] = useState(false);

  /**
   * Fetches recipes based on the search query.
   */
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
          `${NavbarConstants.API_BASE_URL}${encodeURIComponent(searchQuery)}`,
          {
            method: 'GET',
            headers: { Accept: 'application/json' },
          }
        );

        if (!response.ok) {
          console.error(`Search failed with status: ${response.status}`);
          setSearchResults([]);
          setShowDropdown(false);
          return;
        }

        const data = await response.json();
        setSearchResults(data);
        setShowDropdown(data.length > 0);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    };
    console.log('Search results:', searchResults);

    const delayDebounce = setTimeout(fetchRecipes, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  /**
   * Handles the selection of a recipe from the search results.
   */
  const handleSelectRecipe = async (recipeId?: number) => {
    if (!recipeId) {
      console.error('Error: recipeId is undefined');
      return;
    }

    setShowDropdown(false);
    setSearchQuery('');

    const apiUrl = `http://localhost:3000/api/recipes/${recipeId}`;
    console.log('Fetching recipe from:', apiUrl);

    try {
      const response = await fetch(apiUrl);
      const textResponse = await response.text();
      console.log('Raw API response:', textResponse);

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        setRecipeNotFound(true);
        navigate('/404');
        return;
      }

      const recipe = JSON.parse(textResponse);
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      console.error('Error selecting recipe:', error);
      setRecipeNotFound(true);
      navigate('/404');
    }
  };

  /**
   * Logs the user out and redirects to the login page.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-white/80 shadow-lg w-full fixed top-0 left-0 z-10 backdrop-blur-sm">
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
                  d="M8 2v10M6 2v10M10 2v10M8 14v8"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 4c1.657 0 3 1.79 3 4s-1.343 4-3 4-3-1.79-3-4 1.343-4 3-4zM16 12v10"
                />
              </svg>
              <span className="text-xl font-bold">
                {NavbarConstants.LOGO_TEXT}
              </span>
            </Link>

            <div className="flex-1 px-8">
              <div className="relative max-w-lg">
                <input
                  type="text"
                  placeholder={NavbarConstants.SEARCH_PLACEHOLDER}
                  className="w-full rounded-full border-gray-200 bg-gray-50 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-lg border bg-white shadow-lg">
                    {searchResults.map((result) => (
                      <Link
                        key={result.recipe_id}
                        to={`/recipes/${result.recipe_id}`}
                        className="flex items-center space-x-4 p-4 hover:bg-gray-50"
                        onClick={() => handleSelectRecipe(result.recipe_id)}
                      >
                        <img
                          src={
                            result.image || NavbarConstants.PLACEHOLDER_IMAGE
                          }
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
              {user && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  {NavbarConstants.CREATE_RECIPE_TEXT}
                </button>
              )}

              {user && (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <span>{user.username}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg">
                      <Link
                        to="/my-recipes"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {NavbarConstants.MY_RECIPES_TEXT}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        {NavbarConstants.LOGOUT_TEXT}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!user && (
                <Link to="/login">
                  <div className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                    {NavbarConstants.LOGIN_TEXT}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <CreateRecipeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {}}
      />
    </>
  );
};

export default Navbar;

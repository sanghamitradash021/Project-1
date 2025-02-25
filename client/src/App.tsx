// import type React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Layout from './components/Layout';
// import Navbar from './components/Navbar';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import CreateRecipe from './pages/CreateReipe';
// import RecipeList from './pages/RecipeList';
// import RecipeDetail from './pages/RecipeDetail';
// import MyRecipes from './pages/MyRecipes';
// import SinglePageRecipe from './pages/SinglePageRecipe';
// import { AuthProvider } from './context/AuthContext';

// /**
//  * Main App component that handles routing and layout of the recipe-sharing platform.
//  * It uses React Router to navigate between different pages and wraps the content in a Layout with a Navbar.
//  *
//  * @returns {JSX.Element} The main application component with routing for various pages.
//  */
// const App: React.FC = () => {
//   return (
//     <Router>
//       <Layout>
//         <AuthProvider>
//           <Navbar />
//           <Routes>
//             {/* Route for the SignUp page */}
//             <Route path="/signup" element={<SignUp />} />
//             {/* Route for the Login page */}
//             <Route path="/login" element={<Login />} />
//             {/* Route for the CreateRecipe page */}
//             <Route path="/create-recipe" element={<CreateRecipe />} />
//             {/* Route for the RecipeList page */}
//             <Route path="/recipes" element={<RecipeList />} />
//             {/* Route for the RecipeDetail page, dynamically rendered based on recipe ID */}
//             <Route path="/recipes/:id" element={<RecipeDetail />} />
//             {/* Route for the Home page */}
//             <Route path="/" element={<Home />} />
//             {/* Route for the MyRecipes page */}
//             <Route path="/my-recipes" element={<MyRecipes />} />
//             {/* Route for the SinglePageRecipe page, dynamically rendered based on recipe ID */}
//             <Route path="/recipe/:id" element={<SinglePageRecipe />} />
//           </Routes>
//         </AuthProvider>
//       </Layout>
//     </Router>
//   );
// };

// export default App;

// import type React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Layout from './components/Layout';
// import Navbar from './components/Navbar';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import CreateRecipe from './pages/CreateReipe';
// import RecipeList from './pages/RecipeList';
// import RecipeDetail from './pages/RecipeDetail';
// import MyRecipes from './pages/MyRecipes';
// import SinglePageRecipe from './pages/SinglePageRecipe';
// import { AuthProvider } from './context/AuthContext';
// import UserProfile from './pages/Userprofile';
// import CuisineRecipes from './pages/cuisineRecipe';
// import ProtectedRoute from './components/Protectedroutes'; // Import ProtectedRoute

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Layout>
//         <AuthProvider>
//           <Navbar />
//           <Routes>
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/recipes" element={<RecipeList />} />
//             <Route path="/recipes/:id" element={<RecipeDetail />} />
//             <Route path="/" element={<Home />} />
//             <Route path="/userprofile" element={<UserProfile />} />
//             <Route
//               path="/recipes/cuisine/:cuisine"
//               element={<CuisineRecipes />}
//             />

//             {/*  Protected Routes - Requires Login */}
//             <Route element={<ProtectedRoute />}>
//               <Route path="/create-recipe" element={<CreateRecipe />} />
//               <Route path="/my-recipes" element={<MyRecipes />} />
//               <Route path="/recipe/:id" element={<SinglePageRecipe />} />
//             </Route>
//           </Routes>
//         </AuthProvider>
//       </Layout>
//     </Router>
//   );
// };

// export default App;

import type React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateReipe';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import MyRecipes from './pages/MyRecipes';
import SinglePageRecipe from './pages/SinglePageRecipe';
import { AuthProvider } from './context/AuthContext';
import UserProfile from './pages/Userprofile';
import CuisineRecipes from './pages/cuisineRecipe';
import ProtectedRoute from './components/Protectedroutes'; // Import ProtectedRoute
import { useTheme } from './context/ThemeContext';
import { useEffect } from 'react';

const App: React.FC = () => {
  const { theme } = useTheme();
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  return (
    <Router>
      <Layout>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipes" element={<RecipeList theme={theme} />} />
            <Route
              path="/recipes/:id"
              element={<RecipeDetail theme={theme} />}
            />
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route
              path="/recipes/cuisine/:cuisine"
              element={<CuisineRecipes theme={theme} />}
            />

            {/*  Protected Routes - Requires Login */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/my-recipes" element={<MyRecipes theme={theme} />} />
              <Route
                path="/recipe/:id"
                element={<SinglePageRecipe theme={theme} />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Layout>
    </Router>
  );
};

export default App;

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

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

// import { Navigate, Outlet } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const ProtectedRoute = () => {
//   // const token = sessionStorage.getItem('token'); // Check if token exists

//   const token = Cookies.get('token');

//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { user } = useAuth();
  const token = Cookies.get('auth_token'); // Get token from cookies
  useEffect(() => {
    console.log(user, token);
  }, [user, token]);

  // Redirect to login if user is not authenticated
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

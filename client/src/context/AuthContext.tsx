// import { createContext, useContext, useState } from 'react';

// // Define user interface
// interface User {
//   id: number;
//   username: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User, token: string) => void;
//   logout: () => void;
// }

// // Create Auth Context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Custom hook to use Auth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // Auth Provider Component
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     // Get user from sessionStorage when the component first mounts
//     const storedUser = sessionStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Login function (Updates user & triggers re-render)
//   const login = (userData: User, token: string) => {
//     sessionStorage.setItem('user', JSON.stringify(userData));
//     sessionStorage.setItem('token', token);
//     setUser(userData); // Updates state & triggers re-render
//   };

//   // Logout function (Clears session & triggers re-render)
//   const logout = () => {
//     sessionStorage.removeItem('user');
//     sessionStorage.removeItem('token');
//     setUser(null); //  Clears state & triggers re-render
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useContext, useState } from 'react';

// // Define user interface
// interface User {
//   id: number;
//   username: string;
//   email: string;
//   fullName: string;
//   password: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User, token: string) => void;
//   logout: () => void;
// }

// // Create Auth Context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Custom hook to use Auth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // Auth Provider Component
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     // Get user from sessionStorage when the component first mounts
//     const storedUser = sessionStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Login function (Updates user & triggers re-render)
//   const login = (userData: User, token: string) => {
//     sessionStorage.setItem('user', JSON.stringify(userData));
//     sessionStorage.setItem('token', token);
//     setUser(userData); // Updates state & triggers re-render
//   };

//   // Logout function (Clears session & triggers re-render)
//   const logout = () => {
//     sessionStorage.removeItem('user');
//     sessionStorage.removeItem('token');
//     setUser(null); // Clears state & triggers re-render
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// // Define user interface
// interface User {
//   id: number;
//   username: string;
//   email: string;
//   fullName: string;
//   password: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User, token: string) => void;
//   logout: () => void;
// }

// // Create Auth Context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Custom hook to use Auth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // Auth Provider Component
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     // Get user from cookies when the component first mounts
//     const storedUser = Cookies.get('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Get token from cookies
//   const token = Cookies.get('auth_token');

//   // Login function (Updates user & triggers re-render)
//   const login = (userData: User, token: string) => {
//     Cookies.set('user', JSON.stringify(userData), { expires: 7, path: '/' }); // Store user in cookie
//     Cookies.set('auth_token', token, { expires: 7, path: '/' }); // Store token in cookie
//     setUser(userData); // Updates state & triggers re-render
//   };

//   // Logout function (Clears cookies & triggers re-render)
//   const logout = () => {
//     Cookies.remove('user');
//     Cookies.remove('auth_token');
//     setUser(null); // Clears state & triggers re-render
//   };

//   useEffect(() => {
//     // Check if token exists and if not, log the user out
//     if (!token) {
//       logout();
//     }
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Define user interface
interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    // Get user from cookies when the component first mounts
    const storedUser = Cookies.get('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to get token safely
  const getToken = () => Cookies.get('auth_token');

  // Login function (Updates user & stores in cookies)
  const login = (userData: User, token: string) => {
    Cookies.set('user', JSON.stringify(userData), { expires: 7, path: '/' });
    Cookies.set('auth_token', token, { expires: 7, path: '/' });
    console.log('auth token n user is', token, userData);
    setUser(userData); // Update state
  };

  // Logout function (Removes cookies & updates state)
  const logout = () => {
    Cookies.remove('user');
    Cookies.remove('auth_token');
    console.log('cookie cleared');
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();

    // Only log out if both user and token are missing
    if (!user && !token) {
      logout();
    }
  }, []); // Run only once on mount

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

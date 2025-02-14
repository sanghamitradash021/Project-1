// 'use client';

// import type React from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:3000/api/USERS/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();

//       sessionStorage.setItem('user', JSON.stringify(data.user));
//       sessionStorage.setItem('username', data.user.username);
//       sessionStorage.setItem('token', data.token);

//       toast.success('Login successful!');
//       navigate('/home');
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className={`w-full p-2 rounded text-white ${
//             loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <svg
//                 className="animate-spin h-5 w-5 mr-3 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm2 0a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"
//                 ></path>
//               </svg>
//               Loading...
//             </>
//           ) : (
//             'Login'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Login failed');
      }

      const data = await response.json();
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('username', data.user.username);
      sessionStorage.setItem('token', data.token);

      navigate('/'); // Redirect to homepage after successful login
    } catch (error: any) {
      setError(error.message); // Display error message
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}{' '}
        {/* Display error if any */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-yellow-400 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

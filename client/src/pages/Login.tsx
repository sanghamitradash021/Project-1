// // import type React from 'react';
// // import { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import toast from 'react-hot-toast';

// // const Login: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });
// //   const [error, setError] = useState('');

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     try {
// //       const response = await fetch('http://localhost:3000/api/users/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (!response.ok) {
// //         const responseData = await response.json();
// //         throw new Error(responseData.message || 'Login failed');
// //       }

// //       const data = await response.json();
// //       sessionStorage.setItem('user', JSON.stringify(data.user));
// //       sessionStorage.setItem('username', data.user.username);
// //       sessionStorage.setItem('user_id', data.user.id);
// //       sessionStorage.setItem('token', data.token);

// //       toast.success('Logged in successfully!');

// //       navigate('/');
// //     } catch (error: any) {
// //       setError(error.message);
// //       toast.error(error.message || 'Login failed. Please try again.');
// //       console.error('Login failed:', error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
// //         <div>
// //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// //             Welcome Back
// //           </h2>
// //           <p className="mt-2 text-center text-sm text-gray-600">
// //             Sign in to your account
// //           </p>
// //         </div>
// //         {error && (
// //           <div
// //             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
// //             role="alert"
// //           >
// //             <p className="font-bold">Error</p>
// //             <p>{error}</p>
// //           </div>
// //         )}
// //         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
// //           <div className="rounded-md shadow-sm -space-y-px">
// //             <div>
// //               <label htmlFor="email" className="sr-only">
// //                 Email address
// //               </label>
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 required
// //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// //                 placeholder="Email address"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="password" className="sr-only">
// //                 Password
// //               </label>
// //               <input
// //                 id="password"
// //                 name="password"
// //                 type="password"
// //                 required
// //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// //                 placeholder="Password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <button
// //               type="submit"
// //               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
// //             >
// //               Sign in
// //             </button>
// //           </div>
// //         </form>
// //         <div className="text-center">
// //           <Link
// //             to="/signup"
// //             className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
// //           >
// //             Don't have an account? Sign up
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import type React from 'react';
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

// /**
//  * Login component handles the user login process.
//  * It includes form input handling, submitting login data, error handling, and redirection upon successful login.
//  */
// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   /**
//    * Form data for login
//    */
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   /**
//    * Error message for login failure
//    */
//   const [error, setError] = useState('');

//   /**
//    * Handles input changes for the login form
//    * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
//    */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /**
//    * Handles form submission for login
//    * @param {React.FormEvent} e - The form submit event
//    */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       // Sending login request to the backend
//       const response = await fetch('http://localhost:3000/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       // If response is not successful, throw an error
//       if (!response.ok) {
//         const responseData = await response.json();
//         throw new Error(responseData.message || 'Login failed');
//       }

//       // On successful login, store the user data in sessionStorage
//       const data = await response.json();
//       sessionStorage.setItem('user', JSON.stringify(data.user));
//       sessionStorage.setItem('username', data.user.username);
//       sessionStorage.setItem('user_id', data.user.id);
//       sessionStorage.setItem('token', data.token);

//       // Show success message
//       toast.success('Logged in successfully!');

//       // Redirect to the homepage
//       navigate('/');
//     } catch (error: any) {
//       // Set error state if login fails
//       setError(error.message);
//       toast.error(error.message || 'Login failed. Please try again.');
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Sign in to your account
//           </p>
//         </div>

//         {/* Error message display */}
//         {error && (
//           <div
//             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//             role="alert"
//           >
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Login form */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             {/* Email input */}
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             {/* Password input */}
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Submit button */}
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         {/* Signup link */}
//         <div className="text-center">
//           <Link
//             to="/signup"
//             className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
//           >
//             Don't have an account? Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// Login.tsx
// import type React from 'react';
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { LoginConstants } from '../constants/LoginConstant'; // Import the constants

// /**
//  * Login component handles the user login process.
//  * It includes form input handling, submitting login data, error handling, and redirection upon successful login.
//  */
// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   /**
//    * Form data for login
//    */
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   /**
//    * Error message for login failure
//    */
//   const [error, setError] = useState('');

//   /**
//    * Handles input changes for the login form
//    * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
//    */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /**
//    * Handles form submission for login
//    * @param {React.FormEvent} e - The form submit event
//    */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       // Sending login request to the backend
//       const response = await fetch(LoginConstants.loginUrl, {
//         // Use constant
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       // If response is not successful, throw an error
//       if (!response.ok) {
//         const responseData = await response.json();
//         throw new Error(responseData.message || 'Login failed');
//       }

//       // On successful login, store the user data in sessionStorage
//       const data = await response.json();
//       sessionStorage.setItem('user', JSON.stringify(data.user));
//       sessionStorage.setItem('username', data.user.username);
//       sessionStorage.setItem('user_id', data.user.id);
//       sessionStorage.setItem('token', data.token);

//       // Show success message
//       toast.success(LoginConstants.successMessage); // Use constant

//       // Redirect to the homepage
//       navigate('/');
//     } catch (error: any) {
//       // Set error state if login fails
//       setError(error.message);
//       toast.error(error.message || LoginConstants.errorMessage); // Use constant
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {LoginConstants.welcomeBackMessage} {/* Use constant */}
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             {LoginConstants.signInPrompt} {/* Use constant */}
//           </p>
//         </div>

//         {/* Error message display */}
//         {error && (
//           <div
//             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//             role="alert"
//           >
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Login form */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             {/* Email input */}
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 {LoginConstants.emailPlaceholder} {/* Use constant */}
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder={LoginConstants.emailPlaceholder}
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             {/* Password input */}
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 {LoginConstants.passwordPlaceholder} {/* Use constant */}
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder={LoginConstants.passwordPlaceholder}
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Submit button */}
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
//             >
//               {LoginConstants.buttonText} {/* Use constant */}
//             </button>
//           </div>
//         </form>

//         {/* Signup link */}
//         <div className="text-center">
//           <Link
//             to="/signup"
//             className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
//           >
//             {LoginConstants.signUpPrompt} {/* Use constant */}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginConstants } from '../constants/LoginConstant';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // ✅ Import useAuth

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use Auth Context
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');

  const onSubmit = async (formData: any) => {
    setError('');
    try {
      const response = await fetch(LoginConstants.loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Login failed');
      }

      const data = await response.json();

      // ✅ Use AuthContext login function to update user state
      login(data.user, data.token);

      toast.success(LoginConstants.successMessage);
      navigate('/'); // ✅ Redirects to trigger re-render
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message || LoginConstants.errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {LoginConstants.welcomeBackMessage}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {LoginConstants.signInPrompt}
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                id="email"
                type="email"
                placeholder={LoginConstants.emailPlaceholder}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm">
                  {String(errors.email?.message)}
                </p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                id="password"
                type="password"
                placeholder={LoginConstants.passwordPlaceholder}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm">
                  {String(errors.password?.message)}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
          >
            {LoginConstants.buttonText}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {LoginConstants.signUpPrompt}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

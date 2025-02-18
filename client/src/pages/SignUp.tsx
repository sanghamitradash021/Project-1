// import type React from 'react';
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     fullname: '',
//     role: 'user',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await fetch('http://localhost:3000/api/users/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const responseData = await response.json();
//       if (!response.ok) {
//         throw new Error(responseData.message || 'Signup failed');
//       }
//       toast.success('Account created successfully!');
//       navigate('/login');
//     } catch (error: any) {
//       setError(error.message);
//       toast.error(error.message || 'Signup failed. Please try again.');
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Join Our Culinary Community
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Create your account and start sharing recipes
//           </p>
//         </div>

//         {error && (
//           <div
//             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//             role="alert"
//           >
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="fullname" className="sr-only">
//                 Full Name
//               </label>
//               <input
//                 id="fullname"
//                 name="fullname"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Full Name"
//                 value={formData.fullname}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="role" className="sr-only">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <Link
//             to="/login"
//             className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
//           >
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// import type React from 'react';
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

// /**
//  * SignUp component for user registration.
//  *
//  * This component allows a new user to sign up by providing their full name,
//  * username, email, password, and role (either user or admin).
//  * On successful registration, the user is redirected to the login page.
//  *
//  * @component
//  * @example
//  * return (
//  *   <SignUp />
//  * )
//  */
// const SignUp: React.FC = () => {
//   const navigate = useNavigate(); // Hook to navigate to different routes
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     fullname: '',
//     role: 'user',
//   }); // State to hold form data
//   const [error, setError] = useState(''); // State to hold error message

//   /**
//    * Handles the change of input fields in the form.
//    *
//    * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event triggered by the input fields
//    */
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /**
//    * Handles the form submission.
//    * Sends a POST request to the server to register the user.
//    * On success, shows a success toast and redirects the user to the login page.
//    * On failure, shows an error toast.
//    *
//    * @param {React.FormEvent} e - The form submission event
//    */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await fetch('http://localhost:3000/api/users/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const responseData = await response.json();
//       if (!response.ok) {
//         throw new Error(responseData.message || 'Signup failed');
//       }
//       toast.success('Account created successfully!');
//       navigate('/login'); // Redirect to login page after successful signup
//     } catch (error: any) {
//       setError(error.message);
//       toast.error(error.message || 'Signup failed. Please try again.');
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Join Our Culinary Community
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Create your account and start sharing recipes
//           </p>
//         </div>

//         {/* Display error message if there's any */}
//         {error && (
//           <div
//             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//             role="alert"
//           >
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Form for user signup */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             {/* Full Name input field */}
//             <div>
//               <label htmlFor="fullname" className="sr-only">
//                 Full Name
//               </label>
//               <input
//                 id="fullname"
//                 name="fullname"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Full Name"
//                 value={formData.fullname}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Username input field */}
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Email input field */}
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Password input field */}
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Role selection input field */}
//             <div>
//               <label htmlFor="role" className="sr-only">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//           </div>

//           {/* Submit button */}
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>

//         {/* Link to login page */}
//         <div className="text-center">
//           <Link
//             to="/login"
//             className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
//           >
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useForm, Controller } from 'react-hook-form';
// import { FaUser, FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';
// import {
//   SIGNUP_MESSAGES,
//   FORM_PLACEHOLDERS,
//   URLS,
// } from '../constants/SignupConstant';

// /**
//  * SignUp component for user registration.
//  *
//  * This component allows a new user to sign up by providing their full name,
//  * username, email, password, and role (either user or admin).
//  * On successful registration, the user is redirected to the login page.
//  *
//  * @component
//  * @example
//  * return (
//  *   <SignUp />
//  * )
//  */
// const SignUp: React.FC = () => {
//   const navigate = useNavigate(); // Hook to navigate to different routes
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [error, setError] = useState(''); // State to hold error message

//   /**
//    * Handles the form submission.
//    * Sends a POST request to the server to register the user.
//    * On success, shows a success toast and redirects the user to the login page.
//    * On failure, shows an error toast.
//    *
//    * @param {React.FormEvent} e - The form submission event
//    */
//   const onSubmit = async (data: any) => {
//     setError('');
//     try {
//       const response = await fetch(URLS.register, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       const responseData = await response.json();
//       if (!response.ok) {
//         throw new Error(
//           responseData.message || SIGNUP_MESSAGES.error.registrationFailed
//         );
//       }
//       toast.success(SIGNUP_MESSAGES.success.accountCreated);
//       navigate('/login'); // Redirect to login page after successful signup
//     } catch (error: any) {
//       setError(error.message);
//       toast.error(error.message || SIGNUP_MESSAGES.error.registrationFailed);
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Join Our Culinary Community
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Create your account and start sharing recipes
//           </p>
//         </div>

//         {/* Display error message if there's any */}
//         {error && (
//           <div
//             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//             role="alert"
//           >
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Form for user signup */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             {/* Full Name input field */}
//             <div>
//               <label htmlFor="fullname" className="sr-only">
//                 {FORM_PLACEHOLDERS.fullname}
//               </label>
//               <div className="flex items-center border-b py-2">
//                 <FaUser className="text-gray-400 mr-3" />
//                 <Controller
//                   name="fullname"
//                   control={control}
//                   rules={{ required: 'Full name is required' }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       id="fullname"
//                       type="text"
//                       className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
//                         errors.fullname ? 'border-red-500' : 'border-gray-300'
//                       } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                       placeholder={FORM_PLACEHOLDERS.fullname}
//                     />
//                   )}
//                 />
//               </div>
//               {errors.fullname?.message && (
//                 <span className="text-red-500 text-sm">
//                   {String(errors.fullname.message)}
//                 </span>
//               )}
//             </div>

//             {/* Username input field */}
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 {FORM_PLACEHOLDERS.username}
//               </label>
//               <div className="flex items-center border-b py-2">
//                 <FaUser className="text-gray-400 mr-3" />
//                 <Controller
//                   name="username"
//                   control={control}
//                   rules={{ required: 'Username is required' }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       id="username"
//                       type="text"
//                       className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
//                         errors.username ? 'border-red-500' : 'border-gray-300'
//                       } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                       placeholder={FORM_PLACEHOLDERS.username}
//                     />
//                   )}
//                 />
//               </div>
//               {errors.username?.message && (
//                 <span className="text-red-500 text-sm">
//                   {String(errors.username?.message)}
//                 </span>
//               )}
//             </div>

//             {/* Email input field */}
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 {FORM_PLACEHOLDERS.email}
//               </label>
//               <div className="flex items-center border-b py-2">
//                 <FaEnvelope className="text-gray-400 mr-3" />
//                 <Controller
//                   name="email"
//                   control={control}
//                   rules={{
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//                       message: 'Invalid email address',
//                     },
//                   }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       id="email"
//                       type="email"
//                       className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
//                         errors.email ? 'border-red-500' : 'border-gray-300'
//                       } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                       placeholder={FORM_PLACEHOLDERS.email}
//                     />
//                   )}
//                 />
//               </div>
//               {errors.email?.message && (
//                 <span className="text-red-500 text-sm">
//                   {String(errors.email?.message)}
//                 </span>
//               )}
//             </div>

//             {/* Password input field */}
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 {FORM_PLACEHOLDERS.password}
//               </label>
//               <div className="flex items-center border-b py-2">
//                 <FaLock className="text-gray-400 mr-3" />
//                 <Controller
//                   name="password"
//                   control={control}
//                   rules={{
//                     required: 'Password is required',
//                     minLength: {
//                       value: 6,
//                       message: 'Password must be at least 6 characters',
//                     },
//                   }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       id="password"
//                       type="password"
//                       className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
//                         errors.password ? 'border-red-500' : 'border-gray-300'
//                       } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                       placeholder={FORM_PLACEHOLDERS.password}
//                     />
//                   )}
//                 />
//               </div>
//               {errors.password?.message && (
//                 <span className="text-red-500 text-sm">
//                   {String(errors.password?.message)}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Submit button */}
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>

//         {/* Link to login page */}
//         <div className="text-center">
//           <Link
//             to="/login"
//             className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
//           >
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  SIGNUP_MESSAGES,
  FORM_PLACEHOLDERS,
  URLS,
} from '../constants/SignupConstant';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    setError('');
    try {
      const response = await fetch(URLS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.message || SIGNUP_MESSAGES.error.registrationFailed
        );
      }
      toast.success(SIGNUP_MESSAGES.success.accountCreated);
      navigate('/login');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message || SIGNUP_MESSAGES.error.registrationFailed);
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Join Our Culinary Community
        </h2>
        <p className="text-center text-sm text-gray-600">
          Create your account and start sharing recipes
        </p>

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
          {/* Full Name */}
          <div>
            <label className="flex items-center border rounded-lg px-3 py-2 w-full bg-white shadow-sm">
              <FaUser className="text-gray-400 mr-3" />
              <Controller
                name="fullname"
                control={control}
                rules={{ required: 'Full name is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={FORM_PLACEHOLDERS.fullname}
                    className="flex-1 outline-none"
                  />
                )}
              />
            </label>
            {errors.fullname?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.fullname?.message)}
              </span>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="flex items-center border rounded-lg px-3 py-2 w-full bg-white shadow-sm">
              <FaUser className="text-gray-400 mr-3" />
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={FORM_PLACEHOLDERS.username}
                    className="flex-1 outline-none"
                  />
                )}
              />
            </label>
            {errors.username?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.username?.message)}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center border rounded-lg px-3 py-2 w-full bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-3" />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder={FORM_PLACEHOLDERS.email}
                    className="flex-1 outline-none"
                  />
                )}
              />
            </label>
            {errors.email?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.email?.message)}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center border rounded-lg px-3 py-2 w-full bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-3" />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={FORM_PLACEHOLDERS.password}
                    className="flex-1 outline-none"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </label>
            {errors.password?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.password?.message)}
              </span>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Role
            </label>
            <Controller
              name="role"
              control={control}
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              )}
            />
            {errors.role?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.role?.message)}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Sign up
          </button>
        </form>

        <div className="text-center">
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const SignUp: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           fullname,
//           role,
//         }),
//       });

//       const responseData = await response.json();
//       if (!response.ok) {
//         throw new Error(responseData.message || 'Signup failed');
//       }

//       toast.success('Signup successful!');
//       navigate('/login');
//     } catch (error: any) {
//       console.error('Signup error:', error);
//       toast.error(error.message || 'Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
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
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullname: '',
    role: 'user', // Default role
  });
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Signup failed');
      }

      navigate('/login'); // Redirect on successful signup
    } catch (error: any) {
      setError(error.message);
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <input
              name="fullname"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
            />
            <input
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Role Selection Dropdown */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

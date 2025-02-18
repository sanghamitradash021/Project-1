import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginConstants } from '../constants/LoginConstant';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; //  Import useAuth

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use Auth Context
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

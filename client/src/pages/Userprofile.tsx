import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.username || '',
    fullName: user?.fullName || '',
    email: user?.email || '',
    password: user?.password || '',
  });

  const handleUpdate = async () => {
    if (!user?.id) return;
    try {
      await axios.patch(`/api/profile/${user.id}`, userData);
      setIsModalOpen(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDelete = async () => {
    if (!user?.id) return;
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`/api/user/${user.id}`);
        alert('Account deleted successfully');
        // Redirect or handle logout here
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (!user) {
    return (
      <p className="text-center text-red-500 text-xl mt-6">
        User not found. Please log in.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Full Name:</strong> {user.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Password:</strong> {user.password}
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-4"
      >
        Delete
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={userData.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
            />

            <label className="block mt-4 mb-2">Email</label>
            <input
              type="email"
              className="border p-2 w-full"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <label className="block mt-4 mb-2">Password</label>
            <input
              type="password"
              className="border p-2 w-full"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

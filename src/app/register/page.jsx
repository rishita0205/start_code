"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Repassword, setRepassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!name) {
      toast.error('Name is required.');
      return;
    }

    if (!email) {
      toast.error('Email is required.');
      return;
    }

    if (!password) {
      toast.error('Enter password');
      return;
    }

    if (!Repassword) {
      toast.error('Re-enter your password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (Repassword !== password) {
      toast.error('Password must match');
      return;
    }

    try {
      const { data } = await axios.post(`/api/auth/register`, { name, email, password });

      if (data.success) {
        toast.success(data.message);
        router.push('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Re-Enter Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={Repassword}
            onChange={(e) => setRepassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
        <div className="mt-4 text-center w-full max-w-sm">
          <p>
            Have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

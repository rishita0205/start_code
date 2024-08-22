"use client";

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  useEffect(() => {
    const verificationSuccess = Cookies.get('verification-success');
    if (verificationSuccess) {
      toast.success('Your email has been successfully verified. Please log in.');
      Cookies.remove('verification-success'); // Remove the flag after showing the toast
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email) {
      toast.error('Email is required.');
      return;
    }

    

    try {
      const { data } = await axios.post(`/api/auth/login`, { email, password });

      if (data.success) {
        toast.success('Login successful!');
        router.push('/home');
      } else {
        toast.error(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <div className="mt-4 text-center w-full max-w-sm">
          <p>
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

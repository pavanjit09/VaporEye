import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-10 transition-colors">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">Create Your Account</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">Join us to access Boiler Maintenance dashboard.</p>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-500 underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;



import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-12 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-16 transition-colors">
      <img
        src={logo}
        alt="Boiler Maintenance Logo"
        className="w-40 h-auto mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">Welcome Back</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">Login to access your dashboard.</p>

      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-sm text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-500 underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>

      {/* Guest Login Button */}
      <button
        type="button"
        onClick={() => navigate('/dashboard', { state: { isGuest: true } })}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mt-4 w-full"
      >
        Enter as Guest
      </button>

    </div>
  );
}

export default Login;



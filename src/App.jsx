import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import FaqPage from './components/FaqPage';
import ChangelogPage from './components/ChangelogPage';
import './i18n';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Only apply dark mode toggle on login/signup routes
  useEffect(() => {
    const isAuthPage = location.pathname === '/' || location.pathname === '/signup';
    document.documentElement.classList.toggle('dark', isAuthPage && darkMode);
  }, [darkMode, location]);

  const isAuthPage = location.pathname === '/' || location.pathname === '/signup';

  return (
    <div
      className={
        isAuthPage
          ? 'min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300'
          : 'min-h-screen flex items-center justify-center bg-gray-100 text-black'
      }
    >
      {/* Show toggle button only on login/signup pages */}
      {isAuthPage && (
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="absolute top-4 right-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
      </Routes>
    </div>
  );
}

export default App;




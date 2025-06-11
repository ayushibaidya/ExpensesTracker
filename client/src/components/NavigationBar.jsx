import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const showNav = location.pathname === '/';

  if (!showNav) return null;

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center gap-12">
        <NavLink
          to="/"
          className={({ isActive }) =>
             `text-white text-lg font-semibold transition-colors duration-300 hover:text-yellow-300`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-white text-lg font-semibold transition-colors duration-300 ${
              isActive ? 'underline decoration-yellow-300' : 'hover:text-yellow-300'
            }`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `text-white text-lg font-semibold transition-colors duration-300 ${
              isActive ? 'underline decoration-yellow-300' : 'hover:text-yellow-300'
            }`
          }
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;

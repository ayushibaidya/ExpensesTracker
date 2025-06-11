import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Expense Tracker</h1>
      <p className="mb-8 text-lg text-center max-w-md">
        Track your expenses, visualize your spending, and stay in control of your budget.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;

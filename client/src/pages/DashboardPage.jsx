import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/expenses'); // You create this route
        setExpenses(res.data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err.message);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense._id} className="p-4 bg-gray-100 rounded shadow">
              <div className="font-semibold">{expense.title}</div>
              <div className="text-sm text-gray-600">${expense.amount}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;

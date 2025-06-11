import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000/api/auth/expenses';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'Other' });
  const [editingExpense, setEditingExpense] = useState(null);
  const categories = ["Food", "Transport", "Rent", "Shopping", "Entertainment", "Other"];
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addExpense = async () => {
    const token = localStorage.getItem('token');
    if (!newExpense.title || !newExpense.amount) return alert('Please enter title and amount');

    try {
      const res = await axios.post(BASE_URL, newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses([...expenses, res.data]);
      setNewExpense({ title: '', amount: '' });
    } catch (err) {
      console.error('Failed to add expense:', err.message);
    }
  };

  const startEditing = (expense) => {
    setEditingExpense(expense);
  };

  const cancelEditing = () => {
    setEditingExpense(null);
  };

  const saveExpense = async () => {
    const token = localStorage.getItem('token');
    if (!editingExpense.title || !editingExpense.amount) return alert('Please enter title and amount');

    try {
      const res = await axios.put(
        `${BASE_URL}/${editingExpense._id}`,
        { title: editingExpense.title, amount: editingExpense.amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExpenses(expenses.map(exp => (exp._id === editingExpense._id ? res.data : exp)));
      setEditingExpense(null);
    } catch (err) {
      console.error('Failed to update expense:', err.message);
    }
  };

  const deleteExpense = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Expenses</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded shadow">
        <h3 className="font-semibold mb-2">Add New Expense</h3>
        <input
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          className="border px-2 py-1 mr-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="border px-2 py-1 mr-2 rounded"
        />
        <select value={newExpense.category}
  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
  className="border px-2 py-1 mr-2 rounded">
          {categories.map((cat, index) => (
    <option key={index} value={cat}>{cat}</option>
  ))}
        </select>
        <button
          onClick={addExpense}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="p-4 bg-gray-100 rounded shadow flex justify-between items-center"
            >
              {editingExpense?._id === expense._id ? (
                <>
                  <input
                    type="text"
                    value={editingExpense.title}
                    onChange={(e) =>
                      setEditingExpense({ ...editingExpense, title: e.target.value })
                    }
                    className="border px-2 py-1 rounded mr-2"
                  />
                  <input
                    type="number"
                    value={editingExpense.amount}
                    onChange={(e) =>
                      setEditingExpense({ ...editingExpense, amount: e.target.value })
                    }
                    className="border px-2 py-1 rounded mr-2"
                  />
                  <button
                    onClick={saveExpense}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <div className="font-semibold">{expense.title}</div>
                    <div className="text-sm text-gray-600">${expense.amount} | {expense.category} | {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => startEditing(expense)}
                      className="text-blue-600 mr-2 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteExpense(expense._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;

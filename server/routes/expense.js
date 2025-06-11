import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Expense from '../models/Expense.js';

const router = express.Router();

// Get all expenses for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or Create a new expense
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || !amount) return res.status(400).json({ message: 'Title and amount required' });

    const newExpense = new Expense({
      userId: req.user.userId,
      title,
      amount,
      category: category || 'Other', 
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an expense
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, amount } = req.body;
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    expense.title = title ?? expense.title;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category; 

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an expense
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

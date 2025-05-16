// server/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Protected route for user profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);  // Accessing the userId from the decoded JWT
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
        username: user.username,
        email: user.email,
        message: 'Profile data retrieved successfully',
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
});
  
  // Protected route for all users (admin or authorized)
  router.get('/users', verifyToken, async (req, res) => {
    try {
      // Example of an admin check, only proceed if the user is an admin
      const user = await User.findById(req.user.userId);  // Get the user from the token payload
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
  
      // If the user is an admin, return the list of all users
      const users = await User.find({});
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/expenses', async (req, res) => {
  // Sample hardcoded data
  res.json([
    { _id: '1', title: 'Groceries', amount: 50 },
    { _id: '2', title: 'Gym Membership', amount: 30 },
    { _id: '3', title: 'Netflix', amount: 15 }
  ]);
});

export default router;

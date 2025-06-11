// index.js
import dotenv from 'dotenv';         // ES module import
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expense.js';
import cors from 'cors';

dotenv.config();                     // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: 'http://localhost:5173',  // Allow your frontend origin
  credentials: true, // if you need cookies/auth headers
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/expenses', expenseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

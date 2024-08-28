const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/expense_tracker';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for expenses
const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post('/expenses', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json(newExpense);
});

app.put('/expenses/:id', async (req, res) => {
  const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedExpense);
});

app.delete('/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted' });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

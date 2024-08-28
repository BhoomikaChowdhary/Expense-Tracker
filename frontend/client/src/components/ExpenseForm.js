// src/components/ExpenseForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/expenses', {
        description,
        amount,
        category
      });

      onExpenseAdded(response.data);
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error('There was an error adding the expense!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Category:</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;

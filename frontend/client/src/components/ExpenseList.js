import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpenseList.css'; // Ensure this path is correct

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('There was an error fetching the expenses!', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="container">
      <header>
        <h2>Expense List</h2>
      </header>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.description} - ${expense.amount} ({expense.category})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

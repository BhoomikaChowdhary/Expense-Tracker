// src/App.js

import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onExpenseAdded={() => {}} />
      <ExpenseList />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import AccountSummary from './components/AccountSummary';
import TransactionHistory from './components/TransactionHistory';
import TransferFunds from './components/TransferFunds';
import LoginForm from './components/LoginForm';
import DepositFunds from './components/DepositFunds';
import CurrencyConverter from './components/CurrencyConverter';


function App() {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
      setIsAuthenticated(true)
  };

  const handleTransfer = ({ amount, description }) => {
    if (amount > balance) {
      alert('Insufficient funds');
    } else {
      setBalance(balance - amount);
      setTransactions([
        ...transactions,
        { description, amount: -amount },
      ]);
    }
  };

  const handleLogout = () => {
   
    setIsAuthenticated(false);
  }; 

  const handleDeposit = (amount) => {
    
    setBalance(balance + amount);

    
    const depositTransaction = {
      description: 'Deposit',
      amount,
    };
    setTransactions([...transactions, depositTransaction]);
  };

  return (
    <div className="App">
      <Header />
      {isAuthenticated ? (
        <>
          <AccountSummary balance={balance} />
          <TransferFunds onTransfer={handleTransfer} />
          <TransactionHistory transactions={transactions} />
          <DepositFunds onDeposit={handleDeposit} /> 
          <CurrencyConverter/> 
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
export default App;
import React, { useState } from 'react';

const DepositFunds = ({ onDeposit }) => {
  const [amount, setAmount] = useState(0);

  const handleDeposit = () => {
    if (amount > 0) {
      onDeposit(amount);
      setAmount(0);
    }
  };

  return (
    <div className="deposit-funds">
      <h2>Deposit Funds</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Amount"
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
};

export default DepositFunds;
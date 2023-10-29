import React from 'react';

const AccountSummary = ({ balance }) => {
  return (
    <div className="account-summary">
      <h2>Account Summary</h2>
      <p>Current Balance: ${balance}</p>
    </div>
  );
};

export default AccountSummary;
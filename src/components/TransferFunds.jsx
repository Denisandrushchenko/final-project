import React, { useState } from 'react';

const TransferFunds = ({ onTransfer }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = (input) => {
    // Убираем все нецифровые символы и пробелы
    const cleanedInput = input.replace(/[^0-9]/g, '');
    
    // Добавляем пробел после каждой группы из 4 цифр
    const formattedInput = cleanedInput.replace(/(.{4})/g, '$1 ');

    // Убираем лишние пробелы в конце
    const trimmedInput = formattedInput.trim();

    return trimmedInput;
  };

  const handleCardNumberChange = (event) => {
    const inputNumber = event.target.value;
    const formattedNumber = formatCardNumber(inputNumber);
    setCardNumber(formattedNumber);
  };

  const handleTransfer = () => {
    if (amount > 0 && description && cardNumber.length === 19) {
      onTransfer({ amount, description, cardNumber });
      setAmount(0);
      setDescription('');
      setCardNumber('');
    } else {
      alert('Please enter a valid amount, description, and 16-digit card number.');
    }
  };

  return (
    <div className="transfer-funds">
      <h2>Transfer Funds</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={cardNumber}
        onChange={handleCardNumberChange}
        placeholder="Card Number (16 digits with spaces)"
        maxLength="19" // Учитывайте пробелы
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TransferFunds;
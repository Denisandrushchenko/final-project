import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data);
      })
      .catch((error) => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  useEffect(() => {
   
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${fromCurrency}&json`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setExchangeRate(data[0].rate);
        }
      })
      .catch((error) => {
        console.error('Error fetching exchange rate:', error);
      });
  }, [fromCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      // Расчет конвертированной суммы
      setConvertedAmount(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleSwapCurrencies = () => {
    // Меняем местами валюты
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency.cc} value={currency.cc}>
              {currency.txt}
            </option>
          ))}
        </select>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency.cc} value={currency.cc}>
              {currency.txt}
            </option>
          ))}
        </select>
        <input value={toCurrency} disabled={true} />
        <span>Converted Amount: {convertedAmount ? convertedAmount : '0'}</span>
      </div>
      <button onClick={handleSwapCurrencies}>Swap Currencies</button>
    </div>
  );
};

export default CurrencyConverter;
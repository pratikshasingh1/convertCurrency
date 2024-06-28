import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [originalCurrency, setOriginalCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('https://v6.exchangerate-api.com/v6/42904960468003d924b4d5c7/codes');
      setCurrencies(response.data.supported_codes);
    } catch (error) {
      console.error('Error fetching currencies:', error);
      setError('Failed to fetch currencies');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/conversions', {
        original_currency: originalCurrency,
        target_currency: targetCurrency,
        amount: amount,
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error converting currency:', error);
      setError('Failed to convert currency');
    }
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Original Currency:</label>
          <select value={originalCurrency} onChange={(e) => setOriginalCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Target Currency:</label>
          <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Convert</button>
      </form>
      {error && <div className="error">{error}</div>}
      {result && (
        <div className="result">
          <h2>Conversion Result</h2>
          <p>{`${result.original_amount} ${result.original_currency} = ${result.converted_amount} ${result.target_currency}`}</p>
          <p>Exchange Rate: {result.exchange_rate}</p>
        </div>
      )}
    </div>
  );
};

export default App;

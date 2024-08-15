// src/AverageCalculator.js
import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('p'); // Default to prime numbers
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);
  const [error, setError] = useState(null);

  const handleFetchNumbers = async () => {
    setError(null);
    try {
      const response = await axios.post(`http://localhost:9876/numbers/${numberId}`);
      const data = response.data;
      setWindowPrevState(data.windowPrevState);
      setWindowCurrState(data.windowCurrState);
      setNumbers(data.numbers);
      setAvg(data.avg);
    } catch (err) {
      setError("Error fetching data or request timed out.");
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <label>Select Number Type: </label>
        <select value={numberId} onChange={(e) => setNumberId(e.target.value)}>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Previous Window State:</h2>
        <pre>{JSON.stringify(windowPrevState, null, 2)}</pre>
      </div>
      <div>
        <h2>Current Window State:</h2>
        <pre>{JSON.stringify(windowCurrState, null, 2)}</pre>
      </div>
      <div>
        <h2>Fetched Numbers:</h2>
        <pre>{JSON.stringify(numbers, null, 2)}</pre>
      </div>
      <div>
        <h2>Average:</h2>
        <p>{avg}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;
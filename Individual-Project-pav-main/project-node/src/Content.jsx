

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/Content.css'

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching the quote', error);
      setQuote('Sorry, something went wrong. Try again later.');
      setAuthor('');
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Motivational Quote Generator</h1>
        <div className="quote-container">
          <p className="quote">{quote}</p>
          <p className="author">{author}</p>
        </div>
        <button onClick={fetchQuote}>Get Another Quote</button>
      </header>
    </div>
  );
};

export default App;




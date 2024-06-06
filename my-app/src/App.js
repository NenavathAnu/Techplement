import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");

  const fetchQuote = (authorName) => {
    let url = "http://api.quotable.io/random";
    if (authorName) {
      url = `http://api.quotable.io/random?author=${authorName}`;
    }

    
    fetch(url)
      .then(res => res.json())
      .then(
        (quote) => {
          setQuote(quote.content);  
          setAuthor(quote.author);
        }
      )
      .catch(error => {
        setQuote("No quote found for this author.");
        setAuthor("");
      });
  };

  useEffect(() => {
    fetchQuote("");
  }, []);

  const handleInputChange = (event) => {
    setInputAuthor(event.target.value);
  };

  const handleSearchClick = () => {
    fetchQuote(inputAuthor);
  };

  const fetchNewQuote = () => {
    fetchQuote("");
  };

  return (
    <div className="App">
       <div className="input-container">
        <input
          className="searchInput"
          type='search'
          placeholder="Enter Author Name"
          value={inputAuthor}
          onChange={handleInputChange}
        />
        <button className="btn search-btn" onClick={handleSearchClick}>Search Quote</button>
      </div>
      <div className="quote">
        <h2>{quote}</h2>
        <small>- {author} -</small>
      </div><br />
      <button className="btnn" onClick={fetchNewQuote}>Generate New Quote</button>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Video } from './Video';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Video />
        <img src={logo} className="App-logo" alt="logo" />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { Router, Route } from 'react-router'
import logo from './logo.svg';
import './App.css';

import Main from './views/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;

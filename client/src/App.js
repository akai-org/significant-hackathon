import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Main from './views/Main';

/* Exercises */
import Plane from './views/exercises/Plane';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/plane" component={Plane}></Route>
        </div>
      </Router>
    );
  }
}

export default App;

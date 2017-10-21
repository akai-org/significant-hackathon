import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Main from './views/Main';
import Naviagtion from './components/Navigation';

/* Exercises */
import Plane from './views/exercises/Plane';

class App extends Component {
  render() {
    return (
      <div class="App">
        <Router>
          <div>
            <Naviagtion />
            <Route path="/" component={Main}></Route>
            <Route path="/lesson/plane" component={Plane}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'dragula/dist/dragula.css';

import Naviagtion from './components/Navigation';
import Kinematics from './views/Kinematics';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Kinematics />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.2/dragula.min.js'></script>
      </div>
    );
  }
}

export default App;

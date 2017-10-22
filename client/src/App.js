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

const SplashScreen = () => (
  <img src="/images/Splash.png" alt="" style={ {width: '100vw', height: '100vh', left:'0', top:'0', transform: 'none'} } />
);

let starter = false;

class App extends Component {
  start() {
    console.log('aasa');
    starter = true;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        { !starter ? <div onClick={ this.start.bind(this) }><SplashScreen /></div> : <Kinematics/> }
        <script src='https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.2/dragula.min.js'></script>
      </div>
    );
  }
}

export default App;

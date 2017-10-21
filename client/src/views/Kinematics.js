import React, { Component } from 'react';
import './Kinematics.css';

class Kinematics extends Component {
  render() {
    return (
      <div className="cartesian">
        <div className="y-axis-description">y axis</div>
        <div className="y-axis"></div>
        <div className="board">

        </div>
        <div className="x-axis"></div>
        <div className="x-axis-description">x axis</div>
      </div>
    );
  }
}

export default Kinematics;

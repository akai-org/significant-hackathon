import React, { Component } from 'react';
import './Kinematics.css';
import Equation from "../Equation";
const math = require('mathjs');
const dragula = require('dragula');

import

const Value = (props) => (
  <div draggable className="element">
    <div className="label">{ props.data.name}</div>
    { props.data.known ? <div className="known">&#x2713;</div> : <div className="unknown">?</div> }
  </div>
);

const DropArea = (props) => (
  <div className="drop-area"></div>
);

class Kinematics extends Component {
  constructor(){
    super();

    this.state = {
      elementsArray: []
    };
  }

  componentWillMount() {
    fetch('https://akai-math.herokuapp.com/api/tasks')
      .then(res => res.json())
      .then(data => {
        let elementsArray = [];
        data.Elements.forEach( (e) => {
          elementsArray.push(e);
        });
        this.setState({
          elementsArray : elementsArray,
          values : data.Values,
          results : data.Results
        });
        this.forceUpdate();

        console.log("printing resultsArray");
        let resultsArray = [];
        data.Results.forEach( (e) => {
            //resultsArray.push(new Result(e, this.state.elementsArray));
        });
        this.setState({resultsArray : resultsArray});
        this.forceUpdate();
        });

    console.log(this.resultsArray);
  }

  componentDidUpdate() {
    dragula([...[].slice.call(document.querySelectorAll('.drop-area')), document.querySelector('.elements')]);
  }

  render() {
    if (!this.state.elementsArray[0]) return '';

    const elements = [];
    for (let i=0; i < this.state.elementsArray.length; i++) {
      elements.push(<Element key={i} data={this.state.elementsArray[i]} />);
    }

    const values = [];
    for (let i=0; i < this.state.values.length; i++) {
      values.push(<Value key={i} data={this.state.values[i]} />);
    }

    const results = [];
    for (let i=0; i < this.state.values.length; i++) {
      results.push(<DropArea key={i} data={this.state.results[i]} />);
      if( (this.state.values.length>1) && (i!==this.state.values.length-1) ){
        results.push(<div key={this.state.values+i}>and</div>);
      }
    }

    return (
      <div className="lesson">
        <div className="cartesian">
          <div className="y-axis-description">y axis</div>
          <div className="y-axis"></div>
          <div className="board">
            {elements}
          </div>
          <div className="x-axis"></div>
          <div className="x-axis-description">x axis</div>
        </div>
        <div className="elements">
          <h3>Elements</h3>
          {values}
        </div>
        <div className="result">
          <h3>Result</h3>
          {results}
        </div>
      </div>
    );
  }

  start(){

  }

}

export default Kinematics;

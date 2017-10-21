import React, { Component } from 'react';
import './Kinematics.css';
import Equation from "../Equation";
const dragula = require('dragula');

class Result {
    constructor(result, elementsArray){
        console.log("Result.constructor: start");
        this.leftSide = result.leftSide;
        this.relation = result.relation;
        this.rightSide = result.rightSide;

        this.isMet = this.isTrue(elementsArray);
    }

    isTrue(elementsArray){
        if(this.relation.localeCompare('=') === 0)
        {
            console.log('= relation');
            return Equation.calculate(this.leftSide, elementsArray) === Equation.calculate(this.rightSide, elementsArray);
        }
        else if(this.relation.localeCompare('>=') === 0)
        {
            console.log('>= relation');
            return Equation.calculate(this.leftSide, elementsArray) >= Equation.calculate(this.rightSide, elementsArray);
        }
        else if(this.relation.localeCompare('>') === 0)
        {
            console.log('> relation');
            return Equation.calculate(this.leftSide, elementsArray) > Equation.calculate(this.rightSide, elementsArray);
        }
        else if(this.relation.localeCompare('<=') === 0)
        {
            console.log('<= relation');
            return Equation.calculate(this.leftSide, elementsArray) <= Equation.calculate(this.rightSide, elementsArray);
        }
        else if(this.relation.localeCompare('<') === 0)
        {
            console.log('< relation');
            return Equation.calculate(this.leftSide, elementsArray) < Equation.calculate(this.rightSide, elementsArray);
        }
        else if(this.relation.localeCompare('isIn') === 0)
        {
            let left = Element.getElement(this.leftSide, elementsArray);
            let right = Element.getElement(this.rightSide, elementsArray);

            return Element.isElementInAnotherElement(left, right);
        }
        else
        {
            console.log('Relation unknown ' + this.relation);
            return false;
        }
    }
}

class Element extends Component {
  constructor(){
    super();
  }

  componentWillMount() {
    if(!this.props) return false;
    for(const key in this.props.data) {
      this[key] = this.props.data[key];
    }

    this.imgStyle = {
      width: this.xSize,
      position: 'absolute',
      top: this.yStart,
      left: this.xStart,
    };
  }

  render() {
    return (
      <img src={this.props.data.imageUrl} style={this.imgStyle}/>
    )
  }

    static isElementInAnotherElement(thisOne, inThisOne)
    {
        console.log("Element.isElementInAnotherElement start, elements: ");
        console.log(thisOne);
        console.log(inThisOne);

        let leftX = inThisOne.x - inThisOne.xSize/2;
        let rightX = inThisOne.x + inThisOne.xSize/2;

        let upperY = inThisOne.y - inThisOne.ySize/2;
        let lowerY = inThisOne.y + inThisOne.ySize/2;

        let result = false

        if(thisOne.x >= leftX  &&  thisOne.x <= rightX)
        {
            if(thisOne.y >= upperY  &&  thisOne.y <= lowerY)
            {
                result = true;
            }
        }
        console.log("isElementInAnotherElement returns " + result);

        return result;
    }

    static getElement(reference, elementsArray) {
        while(reference.indexOf('%') !== -1)
        {
            reference = reference.replace('%', '');
        }
        let objectName = reference;

        let result;

        elementsArray.forEach((o, i) => {
                if(o.name.localeCompare(objectName) === 0)
                    result = i;
            }
        );

        return result;
    }
}

const Value = (props) => (
  <div draggable className="element">
    <div className="label">{props.name}</div>
    { props.known ? <div className="known">&#10004</div> : <div className="unknown">?</div> }
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
            resultsArray.push(new Result(e, this.state.elementsArray));
        });
        this.setState({resultsArray : resultsArray});
        this.forceUpdate();
        });

    console.log(this.resultsArray);
  }

  componentDidUpdate() {
    dragula([document.querySelector('.drop-area'), document.querySelector('.elements')]);
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

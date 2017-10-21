import React, { Component } from 'react';
import './Kinematics.css';
const math = require('mathjs');

class Result {
    constructor(result){
        this.leftSide=result.leftSide;
        this.relation=result.relation;
        this.rightSide=result.rightSide;

        this.isMet = this.isTrue();
    }

    isTrue(){
        if(this.relation.localeCompare('=') === 0)
        {
            console.log('= relation');
            return this.calculate(this.leftSide) === this.calculate(this.rightSide);
        }
        else if(this.relation.localeCompare('>=') === 0)
        {
            console.log('>= relation');
            return this.calculate(this.leftSide) >= this.calculate(this.rightSide);
        }
        else if(this.relation.localeCompare('>') === 0)
        {
            console.log('> relation');
            return this.calculate(this.leftSide) > this.calculate(this.rightSide);
        }
        else if(this.relation.localeCompare('<=') === 0)
        {
            console.log('<= relation');
            return this.calculate(this.leftSide) <= this.calculate(this.rightSide);
        }
        else if(this.relation.localeCompare('<') === 0)
        {
            console.log('< relation');
            return this.calculate(this.leftSide) < this.calculate(this.rightSide);
        }
        else if(this.relation.localeCompare('isIn') === 0)
        {
            console.log('isIn relation');
            // return this.isElementInAnotherElement()
        }
        else
        {
            console.log('Relation unknown ' + this.relation);
            return false;
        }
    }

    calculate(equation){
        let helper = equation;
        while(helper.indexOf('%') !== -1)
        {
            helper = this.replaceReferenceWithValue(helper);
        }

        console.log("about to eval " + helper);

        let result = math.eval(helper);
        return result;
    }

    replaceReferenceWithValue(helper)
    {
        console.log("helper is " + helper);
        let firstPercent = helper.indexOf('%');
        let secondPercent = helper.indexOf('%', firstPercent + 1);

        console.log("first and second" + firstPercent + ", " + secondPercent);

        let oldSubString = helper.substring(firstPercent, secondPercent - firstPercent + 1);
        let newSubString = this.getReferenceValue(oldSubString);

        console.log("old and new" + oldSubString + ", " + newSubString);

        let result = helper.replace(oldSubString, newSubString);

        console.log("result : " + result);
        return result;
    }

    isElementInAnotherElement(thisOne, inThisOne)
    {
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

        return result;
    }

    getReferenceValue(reference) {
        reference = reference.replaceAll('%', '');

        let objectName = reference.substring(0, reference.indexOf('.'));
        let fieldName = reference.substring(reference.indexOf('.') + 1);

        let result = '';
        Element.elementsArray.forEach(o => {
                if(o.name.localeCompare(objectName) === 0) {
                    result = o[fieldName];
                }
            }
        );

        return result;
    }
}

class Element extends Component {
  constructor(element){
    super();

    console.log(this.props);

    this.data = element;

    for(const key in this.data) {
      this[key] = this.data[key];
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
      <img src={this.data.imageUrl} style={this.imgStyle}/>
    )
  }
}

class Kinematics extends Component {
  constructor(){
    super();
    this.state = {
      elementsArray: []
    };
  }

  componentWillMount() {
    fetch('https://akai-math.herokuapp.com/api/task')
      .then(res => res.json())
      .then(data => {
        console.log("json:");
        console.log(data);

        let elementsArray = [];
        data.Elements.forEach( (e) => {
          elementsArray.push(new Element(e));
        });

        this.setState({elementsArray : elementsArray});
        this.forceUpdate();

        console.log("printing resultsArray");
        let resultsArray = [];
        data.Results.forEach( (e) => {
            resultsArray.push(new Result(e));
        });

        this.setState({resultsArray : resultsArray});
        this.forceUpdate();
        });

    console.log(this.resultsArray);
  }

  render() {
    if (!this.state.elementsArray[0]) return '';



    console.log(this.state);
    return (
      <div className="lesson">
        <div className="cartesian">
          <div className="y-axis-description">y axis</div>
          <div className="y-axis"></div>
          <div className="board">
            { this.state.elementsArray[0].render() }
            { this.state.elementsArray[1].render() }
            { this.state.elementsArray[2].render() }
          </div>
          <div className="x-axis"></div>
          <div className="x-axis-description">x axis</div>
        </div>
        <div className="elements">
          <h3>Elements</h3>

        </div>
        <div className="result">
          <h3>Result</h3>
          <div className="drop-area">
          </div>

        </div>
      </div>
    );
  }

}

export default Kinematics;

import React, { Component } from 'react';
import './Kinematics.css';

class Result {
    constructor(result){
        this.leftSide=result.leftSide;
        this.relation=result.relation;
        this.rightSide=result.rightSide;
    }

    isTrue(){
    }

}

class Element extends Component {
  constructor(element){
    super();

    this.data = element;

    for(const key in this.data) {
      this[key] = this.data[key];
    }

    this.imgStyle = {
        width: this.xSize,
        //height: this.ySize,
        position: 'absolute',
        top: this.yStart,
        left: this.xStart,
     };

  }
  render() {
    return (
      <div>
        <img src={this.data.imageUrl} style={this.imgStyle}/>
        <h1>{this.name}</h1>
      </div>
    )
  }
}

class Kinematics extends Component {
  constructor(){
    super();
      const data = JSON.parse(`{
    "Name":{
        "taskname":"Plane Potato",
        "author":"Adrian"
    },
    "Elements":[
        {
            "name":"Tomato",
            "imageUrl":"/images/Tomato.png",
            "xSize":"4%",
            "ySize":"2%",
            "xStart":"Plane.xStart",
            "yStart":"Plane.yStart",
            "isConstant":"false",
            "xVelocity":"Plane.xVelocity",
            "yVelocity":"Plane.yVelocity",
            "x":"",
            "y":""
        },
        {
            "name":"Plane",
            "imageUrl":"/images/Plane.png",
            "xSize":"20%",
            "ySize":"10%",
            "xStart":"80%",
            "yStart":"60%",
            "isConstant":"false",
            "xVelocity":"100",
            "yVelocity":"0",
            "x":"",
            "y":""
        },
        {
            "name":"Pot",
            "imageUrl":"/images/Pot.png",
            "xSize":"5%",
            "ySize":"2%",
            "xStart":"90%",
            "yStart":"0%",
            "isConstant":"true",
            "xVelocity":"",
            "yVelocity":"",
            "x":"",
            "y":""
        }
    ],
    "Results":[
        {
            "leftSide":"Potato",
            "relation":"isIn",
            "rightSide":"Pot"
        },
        {
            "leftSide":"Plane.y",
            "relation":">",
            "rightSide":"0"
        }
    ],
    "Values":[
        {
            "name":"Hp",
            "known":"false",
            "place":"Plane.y",
            "value":""
        },
        {
            "name":"Vxp",
            "known":"true",
            "place":"Plane.xVelocity",
            "value":""
        },
        {
            "name":"X",
            "known":"true",
            "for":"Pot.x-Plane.x",
            "value":""
        }
    ]
}`);

      console.log(data);
    this.elementsArray = [];
    data.Elements.forEach( (e) => {
      this.elementsArray.push(new Element(e));
    });
    console.log(this.elementsArray);
  }
  render() {
    return (
      <div className="lesson">
        <div className="cartesian">
          <div className="y-axis-description">y axis</div>
          <div className="y-axis"></div>
          <div className="board">
            { this.elementsArray[0].render() }
            { this.elementsArray[1].render() }
            { this.elementsArray[2].render() }
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

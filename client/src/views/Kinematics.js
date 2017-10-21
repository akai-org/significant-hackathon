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
    this.state = {};
    this.state.elementsArray = [];
    //this.data = {};

      const data = JSON.parse(`{
    "Name":{
        "taskname":"Plane Potato",
        "author":"Adrian"
    },
    "Elements":[
        {
            "name":"Puf",
            "imageUrl":"/images/Puf.png",
            "xSize":"5%",
            "ySize":"5%",
            "xStart":"40%",
            "yStart":"5%",
            "isConstant":"false",
            "xVelocity":"100",
            "yVelocity":"0",
            "x":"",
            "y":""
        },
        {
            "name":"Plane",
            "imageUrl":"/images/Plane.png",
            "xSize":"20%",
            "ySize":"20%",
            "xStart":"50%",
            "yStart":"5%",
            "isConstant":"false",
            "xVelocity":"100",
            "yVelocity":"0",
            "x":"",
            "y":""
        },
        {
            "name":"Tomato",
            "imageUrl":"/images/Tomato.png",
            "xSize":"4%",
            "ySize":"2%",
            "xStart":"53%",
            "yStart":"5%",
            "isConstant":"false",
            "xVelocity":"Plane.xVelocity",
            "yVelocity":"Plane.yVelocity",
            "x":"",
            "y":""
        },
        {
            "name":"Pot",
            "imageUrl":"/images/Pot.png",
            "xSize":"10%",
            "ySize":"2%",
            "xStart":"70%",
            "yStart":"95%",
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


  }

  componentWillMount() {
    fetch('https://akai-math.herokuapp.com/api/task')
      .then(res=>res.json())
      .then(data => {
        //console.log(data);
        let elementsArray = [];
        data.Elements.forEach( (e) => {
          elementsArray.push(new Element(e));
        });
        //console.log(elementsArray);
        this.setState({elementsArray : elementsArray});
        this.forceUpdate();
      });
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

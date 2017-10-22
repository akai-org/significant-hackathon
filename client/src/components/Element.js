import React, { Component } from 'react';
import Equation from './Equation';

class Element extends Component {
  constructor(){
    super();
  }

  componentWillMount() {
    if(!this.props) return false;
    for(const key in this.props.data) {
      if( this.props.data[key].indexOf('%')!= -1) {
        this[key] = Equation.replaceReferenceWithValue(key, this.props.elements);
      } else {
        this[key] = this.props.data[key];
      }
    }

    console.log(this.props);
    this.imgStyle = {
      width: `${this.xSize}%`,
      position: 'absolute',
      top: `${this.yStart}%`,
      left: `${this.xStart}%`,
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

export default Element;
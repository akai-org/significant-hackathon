import React, {Component} from 'react';
import Equation from './Equation';

class Element extends Component {
    constructor() {
        super();
    }

    startAnimation(st) {
        this.imgStyle = {
            width: `${this.xSize}%`,
            position: 'absolute',
            top: `${this.yEnd}%`,
            left: `${this.xEnd}%`,
        };
    }

    componentWillMount() {

    }

    render() {
        if (!this.props) return false;
        if (!this.props.data) return false;
        for (const key in this.props.data) {
            if (this.props.data[key].indexOf && this.props.data[key].indexOf('%') != -1) {
                this[key] = Equation.replaceReferenceWithValue(this.props.data[key], this.props.elements);
            } else {
                this[key] = this.props.data[key];
            }
        }

        let pot = this.props.elements.filter(e => {
                return e.name === 'Pot'
            }
    )
        ;

        this.imgStyle = {
            width: `${this.xSize}%`,
            position: 'absolute',
            top: `${!this.props.anim ? this.yStart : this.yEnd}%`,
            left: `${!this.props.anim ? this.xStart : this.xEnd}%`,
        };

        return (
            <div>
            <img
                id = {this.props.data.name}
                src = {
                    ((this.props.data.imageAfterAnimationUrl && (this.yEnd > 95) && (this.props.anim)
                        && (( parseInt(this.xEnd) < parseInt(pot[0].xStart) ) ||
                        (parseInt(this.xEnd) + parseInt(this.xSize) > parseInt(pot[0].xStart) + parseInt(pot[0].xSize)) ))
                        || this.yEnd > 100) ? this.props.data.imageAfterAnimationUrl : this.props.data.imageUrl
                }
                style = {this.imgStyle}
            />

        </div>
        )
    }


    static isElementInAnotherElement(thisOne, inThisOne) {

        let leftX = inThisOne.x - inThisOne.xSize / 2;
        let rightX = inThisOne.x + inThisOne.xSize / 2;

        let upperY = inThisOne.y - inThisOne.ySize / 2;
        let lowerY = inThisOne.y + inThisOne.ySize / 2;

        let result = false;

        if (thisOne.x >= leftX && thisOne.x <= rightX) {
            if (thisOne.y >= upperY && thisOne.y <= lowerY) {
                result = true;
            }
        }

        return result;
    }

    static getElement(reference, elementsArray) {
        while (reference.indexOf('%') !== -1) {
            reference = reference.replace('%', '');
        }
        let objectName = reference;

        let result;

        elementsArray.forEach((o, i) => {
            if(o.name.localeCompare(objectName) === 0
    )
        result = i;
    }
    )
        ;

        return result;
    }
}

export default Element;
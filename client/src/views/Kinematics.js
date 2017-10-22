import React, { Component } from 'react';
import './Kinematics.css';
import Equation from '../components/Equation';
import Result from '../components/Result';
import Element from '../components/Element';

const math = require('mathjs');
const dragula = require('dragula');

const Value = (props) => (
  <div className="element">
    <div className="label">{ props.data.name}</div>
    { props.data.known ? <div className="known">&#x2713;</div> : <div className="unknown">?</div> }
  </div>
);

const DropArea = (props) => (
  <div className="drop-area"></div>
);

class Kinematics extends Component {
    constructor() {
        super();

        this.state = {
            elementsArray: []
        };
    }

    componentWillMount() {
        fetch(`https://akai-math.herokuapp.com/api/tasks/${this.props.task}`)
            .then(res => res.json())
            .then(data => {
                let elementsArray = [];
                data.Elements.forEach((e) => {
                    elementsArray.push(e);
                });

                this.setState({
                    elementsArray: elementsArray,
                    values: data.Values,
                    results: data.Results
                });
                this.forceUpdate();


                let resultsArray = [];
                data.Results.forEach((e) => {
                    //resultsArray.push(new Result(e, this.state.elementsArray));
                });
                this.setState({resultsArray: resultsArray});
                this.forceUpdate();
            });
    }

    componentDidUpdate() {
      if(!this.dragula) {
        dragula([...[].slice.call(document.querySelectorAll('.drop-area')), document.querySelector('.elements')], {
          copy: function (el, source) {
            return source === document.querySelector('.elements')//document.getElementById(left)
          },
          accepts: function (el, target) {
            return target !== document.querySelector('.elements')//document.getElementById(left)
          },
          removeOnSpill: true
        });
        this.dragula = 1;
      }
    }

    render() {
        if (!this.state.elementsArray[0]) return '';

        const elements = [];
        for (let i = 0; i < this.state.elementsArray.length; i++) {
            elements.push(<Element anim={this.state.anim} elements={this.state.elementsArray} key={i} data={this.state.elementsArray[i]}/>);
        }

        const values = [];
        for (let i = 0; i < this.state.values.length; i++) {
            values.push(<Value key={i} data={this.state.values[i]}/>);
        }

        const results = [];
        for (let i = 0; i < this.state.results.length; i++) {
            results.push(<DropArea key={i} data={this.state.results[i]}/>);
            if ((this.state.values.length > 1) && (i !== this.state.results.length - 1)) {
                results.push(<div key={this.state.values + i}>and</div>);
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
                <button onClick={this.start.bind(this)}>START</button>
                <div className="result">
                    <h3>Result</h3>
                    {results}
                </div>
            </div>
        );
    }

  start() {
    let dropareas = document.getElementsByClassName('drop-area');
    let r = [];
    for (let i = 0; i < dropareas.length; i++) {
        r.push('');
    }

  [...[].slice.call(
      dropareas
  )].forEach((e, i) => {
      [...[].slice.call(
          e.getElementsByClassName('element')
      )].forEach(ee => {
          r[i] += ee.querySelector('.label').innerHTML
      })
    })
    console.log(r);

    this.state.elementsArray.forEach( (e) => {
        Object.keys(e).forEach( (key) => {
            if(e[key].indexOf && e[key].indexOf('%') != -1){
                e[key] = Equation.replaceReferenceWithValue(e[key], this.state.elementsArray);
            }
        });
    });


    let equations = r;//["t=X/Vxp", 'Hp=0.5*g*t^2'];
    let result = '';

    for( let j=0 ; j<equations.length ; j++) {//this many tries, cause there are this many equations
        for (let i=0 ; i<equations.length ; i++) {
            try{
                //try to calculate value on the right, and assign it to the left variable
                //update known values
                this.state.values.forEach( (v) => {
                    if(v.known != null && v.known.localeCompare('true') === 0  &&  equations[i].indexOf(v.name) != -1){
                        equations[i] = equations[i].replace(v.name, v.value);
                    }
                });

                //evaluate
                let eq = new Equation(equations[i]);

                for(let k=0 ; k<this.state.values.length ; k++) {
                    if(eq.leftSide.localeCompare(this.state.values[k].name) == 0) {
                        this.state.values[k].known = 'true';
                        this.state.values[k].value = eq.calculatedRightSide;
                    }
                }
            }
            catch(e) {
                //nothing yet
            }
        }
    }

    let timeValue, gValue;
    let valuesResolved = true;

    for(let i=0 ; i<this.state.values.length ; i++) {
        if (this.state.values[i].known != null && this.state.values[i].name.localeCompare('t') == 0) {
            timeValue = this.state.values[i].value;
        }
        else if(this.state.values[i].known != null && this.state.values[i].name.localeCompare('g') == 0) {
            gValue = this.state.values[i].value;
        }

        if (this.state.values[i].known != null && this.state.values[i].known.localeCompare('false') == 0) {
            valuesResolved = false;
        }
    }

    if(valuesResolved == false){
        return 'Not all variables have been resolved';
    }


    let tomato;
    for(let i=0 ; i<this.state.elementsArray.length ; i++) {
      if(this.state.elementsArray[i].name.localeCompare('Tomato') == 0) {
      tomato = this.state.elementsArray[i];

      tomato.xEnd = math.eval(tomato.xVelocity + '*' + timeValue);
      tomato.yEnd = math.eval('0.5' + '*' + gValue + '*' + timeValue + '^2');
      console.log(tomato, timeValue, gValue);
      break;
    }
  }

      this.setState( {anim: true} );
      console.log(tomato);
    return tomato.xEnd + ',' + tomato.yEnd;
  }
}

export default Kinematics;




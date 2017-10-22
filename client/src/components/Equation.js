/**
 * Created by xplolel on 21/10/2017.
 */
const math = require('mathjs');

class Equation {
    constructor(equation){
        let equaltyIndex = equation.indexOf('=');
        this.leftSide = equation.substring(0, equaltyIndex);
        this.rightSide = equation.substring(equaltyIndex + 1);
        this.calculatedRightSide = Equation.calculate(this.rightSide);
    }

    static calculate(equation, elementsArray){
        let helper = equation;
        while(helper.indexOf('%') !== -1)
        {
            helper = this.replaceReferenceWithValue(helper, elementsArray);
        }

        let result = math.eval(helper);

        return result;
    }

    static replaceReferenceWithValue(helper, elementsArray)
    {

        let firstPercent = helper.indexOf('%');
        let secondPercent = helper.indexOf('%', firstPercent + 1);

        let oldSubString = helper.substring(firstPercent, secondPercent - firstPercent + 1);
        let newSubString = Equation.getReferenceValue(oldSubString, elementsArray);

        let result = helper.replace(oldSubString, newSubString);

        return result;
    }

    static getReferenceValue(reference, elementsArray) {
        while(reference.indexOf('%') !== -1)
        {
            reference = reference.replace('%', '');
        }

        let objectName = reference.substring(0, reference.indexOf('.'));
        let fieldName = reference.substring(reference.indexOf('.') + 1);

        let result = '';
        elementsArray.forEach(o => {
                if(o.name.localeCompare(objectName) === 0) {
                    result = o[fieldName];
                }
            }
        );

        if(result.localeCompare('') === 0)
        {
            result = '0';
        }

        return result;
    }
}

export default Equation;


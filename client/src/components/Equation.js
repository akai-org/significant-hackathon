/**
 * Created by xplolel on 21/10/2017.
 */
const math = require('mathjs');

class Equation {
    static calculate(equation, elementsArray){
        console.log("Equation.calculate: start");
        let helper = equation;
        while(helper.indexOf('%') !== -1)
        {
            helper = this.replaceReferenceWithValue(helper, elementsArray);
        }

        console.log("Equation.calculate: about to eval: " + helper);
        let result = math.eval(helper);

        console.log("Equation.calculate: after eval: " + helper);
        return result;
    }

    static replaceReferenceWithValue(helper, elementsArray)
    {
        let firstPercent = helper.indexOf('%');
        let secondPercent = helper.indexOf('%', firstPercent + 1);

        let oldSubString = helper.substring(firstPercent, secondPercent - firstPercent + 1);
        let newSubString = Equation.getReferenceValue(oldSubString, elementsArray);

        let result = helper.replace(oldSubString, newSubString);

        console.log("Equation.replaceReferenceWithValue: result : " + result);
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

        console.log('Equation.getReferenceValue: returns: ' + result);
        return result;
    }
}

export default Equation;


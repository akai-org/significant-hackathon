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
        console.log('Equation.replaceReferenceWithValue: elementsArray is');
        console.log(elementsArray);
        console.log("Equation.replaceReferenceWithValue: helper is " + helper);
        let firstPercent = helper.indexOf('%');
        let secondPercent = helper.indexOf('%', firstPercent + 1);

        console.log("Equation.replaceReferenceWithValue: first and second" + firstPercent + ", " + secondPercent);

        let oldSubString = helper.substring(firstPercent, secondPercent - firstPercent + 1);
        console.log("Equation.replaceReferenceWithValue: oldSubString : " + oldSubString);
        let newSubString = Equation.getReferenceValue(oldSubString, elementsArray);

        console.log("Equation.replaceReferenceWithValue: old and new" + oldSubString + ", " + newSubString);

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

        console.log('Equation.getReferenceValue: objectName is ' + objectName);
        console.log('Equation.getReferenceValue: fieldName is ' + fieldName);

        console.log('Equation.getReferenceValue: looking in elementsArray:');
        console.log(elementsArray);
        console.log('Equation.getReferenceValue: foreach starts');
        let result = '';
        elementsArray.forEach(o => {
                if(o.name.localeCompare(objectName) === 0) {
                    console.log('found matching name for ');
                    console.log(o);
                    result = o[fieldName];
                }
            }
        );

        console.log('Equation.getReferenceValue: returns: ');
        console.log(result);
        console.log("AFASFASD");

        return result;
    }
}

export default Equation;


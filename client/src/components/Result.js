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

export default Result;
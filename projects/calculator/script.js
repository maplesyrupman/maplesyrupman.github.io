function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return roundTo4(a/b);
}

displayPara = document.getElementById('displayPara');
ce = document.getElementById('ce');

let valueOne = '';
let valueTwo = '';
let operator = '';


function updateDisplay(valueOne, operator, valueTwo) {
    displayPara.textContent = valueOne + operator + valueTwo;
}

function equals(valueOne, operator, valueTwo) {
    if(valueOne && operator && valueTwo) {
        valueOne = Number(valueOne);
        valueTwo = Number(valueTwo);
        switch(true) {
            case operator === "x":
                valueOne = multiply(valueOne, valueTwo);
                break;
            case operator === "/":
                valueOne = divide(valueOne, valueTwo);
                break;
            case operator === "+":
                valueOne = add(valueOne, valueTwo);
                break;
            case operator === "-":
                valueOne = subtract(valueOne, valueTwo);
                break;
        }
        valueTwo = '';
        operator = '';
        updateDisplay(valueOne, operator, valueTwo);
        return valueOne;
    }
}

ce.addEventListener('click', function() {
    valueOne = '';
    valueTwo = '';
    operator = '';
    displayPara.textContent = updateDisplay(valueOne, valueTwo, operator);
}); 

calculatorBody.onclick = (e) => {
    let target = e.target;

    if(target.classList.contains('number')) {
        if(!operator) {
            valueOne += target.textContent;
        } else {
            valueTwo += target.textContent;
        }
        updateDisplay(valueOne, operator, valueTwo);
    }

    if(target.classList.contains('decimal')) {
        if(!operator && !valueOne.includes('.')) {
            valueOne += '.';
            updateDisplay(valueOne, operator, valueTwo);
        } else if(!valueTwo.includes('.')) {
            valueTwo += '.';
            updateDisplay(valueOne, operator, valueTwo);
        }
    }

    if(target.classList.contains('operator')) {

        if(!operator && !valueTwo) {
            operator = target.textContent;
            updateDisplay(valueOne, operator, valueTwo);

        } else if(operator && !valueTwo) {
            operator = target.textContent;
            updateDisplay(valueOne, operator, valueTwo);
            
        } else if(operator && valueTwo) { //evaluates the expression on display, then creates new expression awaiting valueTwo
            valueOne = equals(valueOne, operator, valueTwo);
            operator = target.textContent;
            valueTwo = '';
            updateDisplay(valueOne, operator, valueTwo);
        }

    }

    if(target.classList.contains('equals')) {

        if(operator === '/' && valueTwo === '0') {
            alert('oops! you can\'t divide by zero!');
            valueTwo = '';
            updateDisplay(valueOne, operator, valueTwo);
        }

        if(!operator || !valueTwo) {return}; //prevents errors on equals without operator or valueTwo
        valueOne = equals(valueOne, operator, valueTwo);
        valueTwo = '';
        operator = '';
    }

    if(target.classList.contains('percentage')) {
        valueOne = divide(valueOne, 100);
        updateDisplay(valueOne, operator, valueTwo);
    }

    if(target.classList.contains('positiveNegative')) {
        if(!operator) {
            valueOne = multiply(valueOne, -1);
            updateDisplay(valueOne, operator, valueTwo);
        } else {
            valueTwo = multiply(valueTwo, -1);
            updateDisplay(valueOne, operator, valueTwo);
        }
    }
}

function roundTo4(num) {
    return Math.floor(num * 10000)/10000;
}
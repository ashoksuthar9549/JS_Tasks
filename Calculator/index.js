const operandButtons = document.querySelectorAll("[data-operand]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearAllButton = document.querySelector(".clearAllBtn");
const equalButton = document.querySelector(".equalBtn");
const clearButton = document.querySelector(".clearBtn");
const previousScreen = document.querySelector(".previous-screen");
const currentScreen = document.querySelector(".current-screen");

let operator = "";
let previousValue = "";
let currentValue = "";

operandButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleOperator(e.target.dataset.operator);
        previousScreen.textContent = `${previousValue} ${operator}`
        currentScreen.textContent = currentValue;
    });
});

clearAllButton.addEventListener("click", () => {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousScreen.textContent = "";
    currentScreen.textContent = "";
});

clearButton.addEventListener("click", (e) => {
    currentValue = currentValue.slice(0, -1);
    currentScreen.textContent = currentValue;
});

equalButton.addEventListener("click", () => {
   if(previousValue && currentValue) {
        calculate();
        previousScreen.textContent = "";
        previousValue = previousValue.toString();
        if(previousValue.length <= 7) {
            currentScreen.textContent = previousValue;
        } else{
            currentScreen.textContent = previousValue.slice(0, 8) + "...";
        }
   } else if(previousValue && !currentValue) {
        calculateWithOneOperand();
        previousValue = previousValue.toString();
        if(previousValue.length <= 7) {
            currentScreen.textContent = previousValue;
        } else{
            currentScreen.textContent = previousValue.slice(0, 8) + "...";
        }
   } else if(!previousValue && currentValue) {
        calculateTrigonometryValues();
        previousScreen.textContent = "";
        previousValue = previousValue.toString();
        if(previousValue.length <= 7) {
            currentScreen.textContent = previousValue;
        } else{
            currentScreen.textContent = previousValue.slice(0, 8) + "...";
        }
   }
});

const handleNumber = (num) => {
    if(currentValue.length <= 5){
        currentValue += num;
    }
}

const handleOperator = (op) => {
    operator = op;
    previousValue = currentValue;
    currentValue = "";
}

const calculate = () => {
    previousValue = parseFloat(previousValue);
    currentValue = parseFloat(currentValue);

    switch(operator) {
        case "+":
            previousValue += currentValue;
            break;
        case "-":
            previousValue -= currentValue;
            break;
        case "*":
            previousValue *= currentValue;
            break;
        case "/":
            previousValue /= currentValue;
            break;
        case "%":
            previousValue %= currentValue;
            break;
        default:
            break;
    }
}

const calculateWithOneOperand = () => {
    console.log("calculate with one operand")
    previousValue = parseFloat(previousValue);

    switch(operator) {
        case "square":
            previousValue = previousValue * previousValue;
            break;
        case "cube":
            previousValue = previousValue * previousValue * previousValue;
            break;
        case "pie":
            previousValue = Math.PI * previousValue;
            break;
        case "exp":
            previousValue = Math.exp(previousValue);
            break;
        case "1/x":
            previousValue = 1 / previousValue;
            break;
        case "!":
            previousValue = factorial(previousValue);
            break;
        default:
            break;
    }
}

const factorial = (num) => {
    let result = 1;
    for(let i = 1; i <= num; i++) {
        result *= i;
    }
    return result;
}

const calculateTrigonometryValues = () => {
    currentValue = parseFloat(currentValue);
    switch(operator) {
        case "sin":
            previousValue = Math.sin(currentValue);
            break;
        case "cos":
            previousValue = Math.cos(currentValue);
            break;
        case "tan":
            previousValue = Math.tan(currentValue);
            break;
        case "sin-inverse":
            previousValue = Math.asin(currentValue);
            break;
        case "cos-inverse":
            previousValue = Math.acos(currentValue);
            break;
        case "tan-inverse":
            previousValue = Math.atan(currentValue);
            break;
        default:
            break;
    }
}
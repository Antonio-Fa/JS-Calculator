class Calculator {
    constructor(lowerDisplay, upperDisplay) {
        this.upperDisplay = upperDisplay;
        this.lowerDisplay = lowerDisplay;
        this.clear();
    }

    clear() {
        this.currentDisplay = "";
        this.previousDisplay = "";
        this.operator = undefined;
    }

    writeNumber(number) {
        // Checks if the next input is a decimal and if there is already a decimal in the string
        if (number === "." && `${this.currentDisplay}`.includes(".")) {
            return;
        }
        // concats the numbers together on the display
        this.currentDisplay = `${this.currentDisplay}` + `${number}`;
    }

    selectOperator(operator) {
        if (this.currentDisplay === "") {
            return;
        }
        this.operator = operator;
        this.previousDisplay = `${this.currentDisplay}` + `${operator}`;
        this.currentDisplay = "";
    }

    doMath() {
        let result;
        const prevNum = parseFloat(this.previousDisplay);
        const currentNum = parseFloat(this.currentDisplay);
        if (isNaN(prevNum) || isNaN(currentNum)) {
            return;
        }
        switch (this.operator) {
            case "+":
                result = prevNum + currentNum;
                break;
            case "-":
                result = prevNum - currentNum;
                break;
            case "/":
                result = prevNum / currentNum;
                break;
            case "*":
                result = prevNum * currentNum;
                break;
            case "^":
                result = prevNum ** currentNum;
                break;
            default:
                return;
        }
        this.currentDisplay = result;
        this.operator = undefined;
        this.previousDisplay = "";
    }

    updateDisplay() {
        this.lowerDisplay.innerHTML = this.currentDisplay;
        this.upperDisplay.innerHTML = this.previousDisplay;
    }
}

const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const lowerDisplay = document.querySelector("#lowerDisplay");
const upperDisplay = document.querySelector("#upperDisplay");

const calc = new Calculator(upperDisplay, lowerDisplay);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calc.writeNumber(button.innerHTML);
        calc.updateDisplay();
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calc.selectOperator(button.innerHTML);
        calc.updateDisplay();
    });
});

equalsButton.addEventListener("click", (button) => {
    calc.doMath();
    calc.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
    calc.clear();
    calc.updateDisplay();
});

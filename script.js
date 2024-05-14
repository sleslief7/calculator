const buttons = document.getElementById('buttons');
const screen = document.getElementById('mainDisplay');
const miniScreen = document.getElementById('littleDisplay');
const numbers = Array.from(document.querySelectorAll('.numbers'));
let operators = Array.from(document.querySelectorAll('.operators'));
let clearBtn = document.getElementById('clear');
let equalBtn = document.getElementById('equal');
let num1;
let operator;
let num2;
let isInProgress = false;
let currentValue;

const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);

const setIsInProgress = (val) => {
    isInProgress = val;
}

const operate = (num1, num2, operator) => {
    switch (operator) {
        case '+':
            currentValue = add(num1, num2);
            updateScreen(currentValue);
            break;
        case '-':
            currentValue = subtract(num1, num2);
            updateScreen(currentValue);
            break;
        case '*':
            currentValue = multiply(num1, num2);
            updateScreen(currentValue);
            break;
        case '/':
            currentValue = divide(num1, num2);
            updateScreen(currentValue);
            break;
        default:
            break;
    }
}

const clearScreen = () => {
    screen.textContent = '';
}
const clearLittleScreen = () => {
    miniScreen.textContent = '';
}
const updateScreen = (text) => {
    screen.textContent += text.toString().substring(0, 9);
}
const updateMiniScreen = (text) => {
    miniScreen.textContent += text;
}
const handleAfterEqual = () => {
    if(!isInProgress) {
        clearScreen();
        clearLittleScreen();
        setIsInProgress(true);
    }
}

const handleNumberClick = key => {
    if (key === "." && screen.innerText.includes('.')) return;
    if(!isInProgress && currentValue) {
        handleClear();
    }
    setIsInProgress(true);
    handleAfterEqual();
    if(isInProgress) {
        updateScreen(key);
        updateMiniScreen(key);
        if (key === ".") handlePeriodClick();
    } 
}

const handleOperator = key => {
    if(isInProgress && num1 !== undefined && operator && screen.innerText) {
        const temp = [num1, num2];
        handleEnterPress();
        num1 = temp[0];
        num2 = temp[1];
    }
    const operatingOnPreviousResult = !isInProgress && currentValue;
    if((isInProgress && !operator) || operatingOnPreviousResult) {
        operator = key;
        num1 = Number(screen.innerText);
        if(operatingOnPreviousResult) {
            clearLittleScreen();
            updateMiniScreen(currentValue);
        }
        updateMiniScreen(key);
        clearScreen();
        setIsInProgress(true);
    }   
}

const handleClear = () => {
    clearScreen();
    clearLittleScreen();
    currentValue = 0;
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    setIsInProgress(false);
    period.classList.remove('disabled');
}

const handleKeysPress = (e) => {
    const key = e.key;
    let code = Number(e.key);

    if (key === ' ' || key.toLowerCase() === 'c') {
        handleClear();
    } else if(code >= 0 && code <= 9 || key === '.') {
        handleNumberClick(key);
    } else if(key === '+' || key === '-' || key === '/' || key === '*') {
        handleOperator(key);
    } else if(key === 'Enter' || key === '=') {
        handleEnterPress();
    }  else if(key === "Backspace") {
        if(!isInProgress) {
            handleClear();
            return;
        }

        const isOperator = !screen.innerText && miniScreen.innerText;
        if(isOperator) {
            miniScreen.textContent = miniScreen.innerText.slice(0, -1);
            screen.textContent = num1;
            num1 = undefined;
            operator = undefined;
        } else { // isNumber
            miniScreen.textContent = miniScreen.innerText.slice(0, -1);
            screen.textContent = screen.innerText.slice(0, -1);
        }
         
        const lastNumberWasErased = !miniScreen.innerText && !screen.innerText;
        if (lastNumberWasErased) handleClear();
    }
}
const handlePeriodClick = () => {
    let period = document.getElementById('period');
    if (screen.innerText.includes('.')) {
        period.classList.add('disabled');
    } else {
        period.classList.remove('disabled');
    }
} 

numbers.forEach(el => el.addEventListener('click', e => {
    e.stopPropagation();
    handleNumberClick(e.target.innerText)
}));
operators.forEach(el => el.addEventListener('click', e => handleOperator(e.target.innerText)));
document.addEventListener('keydown', handleKeysPress);

clearBtn.addEventListener('click', handleClear);

const handleEnterPress = () => {
    if(isInProgress && num1 !== undefined && operator) {
        num2 = Number(screen.innerText);
        if (num2 == undefined) return;
        clearScreen();
        operate(num1, num2, operator);
        num1 = undefined;
        num2 = undefined;
        setIsInProgress(false);
    }
}

equalBtn.addEventListener('click', handleEnterPress);
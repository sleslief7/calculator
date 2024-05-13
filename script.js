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

const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);

const operate = (num1, num2, operator) => {
    if(operator === '+') updateScreen(add(num1, num2));
    if(operator === '-') updateScreen(subtract(num1, num2));
    if(operator === '*') updateScreen(multiply(num1, num2));
    if(operator === '/') updateScreen(divide(num1, num2));
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

const handleNumberClick = e => {
    isInProgress = true;
    e.stopPropagation();
    const el = e.target;
    updateScreen(el.innerText);
    updateMiniScreen(el.innerText);
    if (el.id === "period") handlePeriodClick();
}

const handleOperatorClick = e => {
    isInProgress = true;
    operator = e.target.innerText
    num1 = Number(screen.innerText);
    updateMiniScreen(e.target.innerText);
    clearScreen();
} 
const handleOperatorPress = key => {
    isInProgress = true;
    operator = key;
    num1 = Number(screen.innerText);
    updateMiniScreen(key);
    clearScreen();
}

const handleEnterPress = () => {
    num2 = Number(screen.innerText);
    clearScreen();
    operate(num1, num2, operator);
}

const handleKeysPress = (e) => {
    isInProgress = true;
    const key = e.key;
    let code = Number(e.key);
    console.log(key)
    if (key === "." && screen.innerText.includes('.')) return;
    if(code >= 0 && code <= 9 || key === '.') {
        updateScreen(key);
        updateMiniScreen(key);
    }
    if(key === '+' || key === '-' || key === '/' || key === '*') {
        handleOperatorPress(key);
    }
    if(key === 'Enter') {
        handleEnterPress();
    }
    if(key === "Backspace") {
        clearScreen();
        clearLittleScreen();
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


numbers.forEach(el => el.addEventListener('click', handleNumberClick));
operators.forEach(el => el.addEventListener('click', handleOperatorClick));
document.addEventListener('keydown', handleKeysPress);

clearBtn.addEventListener('click', () => {
    clearScreen();
    clearLittleScreen();
});

equalBtn.addEventListener('click', () => {
    num2 = Number(screen.innerText);
    clearScreen();
    operate(num1, num2, operator);
});

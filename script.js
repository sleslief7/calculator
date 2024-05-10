const buttons = document.getElementById('buttons');
const screen = document.getElementById('screen');
const numbers = Array.from(document.querySelectorAll('.numbers'));
let operators = Array.from(document.querySelectorAll('.operators'));
let num1;
let num2;
let operator;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (num1, num2, operator) => {

    if(operator === '+') screenDisplay(add(num1, num2));
    if(operator === '-') screenDisplay(subtract(num1, num2));
    if(operator === '*') screenDisplay(multiply(num1, num2));
    if(operator === '/') screenDisplay(divide(num1, num2));

}

const clearScreen = () => {
    screen.textContent = '';
}

const screenDisplay = (text) => {
    screen.textContent += text;
}

numbers.forEach(el => el.addEventListener('click', (event) => {
    const target = event.target;
    screenDisplay(target.innerText);
    
}));

operators.forEach(el => el.addEventListener('click', (event) => {
    num1 = Number(screen.innerText);
    clearScreen();
}));

buttons.addEventListener('click', (event) => {
    const target = event.target;
    const id = target.id;

    if(id === 'clear') return clearScreen();
    if(target.classList.contains('operators')) operator = target.innerText;
    if(id === 'equals') {
        num2 = Number(screen.innerText);
        clearScreen();
        operate(num1, num2, operator);
    }
});
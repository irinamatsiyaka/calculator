import { adjustFontSize } from './adjustFontSize.js';
import './styles.css';

let expression = '';
let newNumber = '';
let current = null;
let lastOperator = null;
const display = document.getElementById('display');

function updateDisplay() {
  display.textContent = expression === '' ? '0' : expression;
  adjustFontSize('display', 'displayContainer', 20);
}

function addNumber(value) {
  if (newNumber === '' && value === '0') {
    newNumber = '0';
    expression += '0';
    updateDisplay();
    return;
  }
  if (newNumber === '0' && value === '0') {
    return;
  }
  if (newNumber === '0' && value !== '.') {
    newNumber = '';
    if (expression.slice(-1) === '0') {
      expression = expression.slice(0, -1);
    }
  }
  if (newNumber === '' && value === '.') {
    newNumber = '0';
    expression += '0';
  }
  if (value === '.' && newNumber.includes('.')) {
    return;
  }

  newNumber += value;
  expression += value;
  updateDisplay();
}

function setOperator(op) {
  if (['+', '-', '/', '*'].includes(expression.slice(-1))) {
    expression = expression.slice(0, -1);
  }
  if (newNumber === '' && current === null) {
    return;
  }
  if (newNumber !== '') {
    if (current === null) {
      current = parseFloat(newNumber);
    } else if (current !== null) {
      current = calculation(current, lastOperator, parseFloat(newNumber));
    }
  }

  lastOperator = op;
  newNumber = '';
  expression += op;
  updateDisplay();
}
function calculateResult() {
  if (newNumber === '' || lastOperator === null) return;
  current = calculation(current, lastOperator, parseFloat(newNumber));
  expression = current.toString();
  newNumber = '';
  lastOperator = null;
  updateDisplay();
}

function calculation(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '/':
      if (b === 0) {
        alert('Деление на ноль невозможно!');
        return a;
      }
      return a / b;
    case '*':
      return a * b;
    default:
      return b;
  }
}

function clearDisplay() {
  expression = '';
  newNumber = '';
  current = null;
  lastOperator = null;
  updateDisplay();
}

function toggleSign() {
  if (newNumber !== '') {
    if (newNumber.startsWith('-')) {
      newNumber = newNumber.slice(1);
    } else {
      newNumber = '-' + newNumber;
    }
    let lastOpIndex = expression.lastIndexOf('+');
    let idx = expression.lastIndexOf('-');
    if (idx > lastOpIndex) {
      lastOpIndex = idx;
    }
    idx = expression.lastIndexOf('*');
    if (idx > lastOpIndex) {
      lastOpIndex = idx;
    }
    idx = expression.lastIndexOf('/');
    if (idx > lastOpIndex) {
      lastOpIndex = idx;
    }

    if (lastOpIndex >= 0) {
      expression = expression.slice(0, lastOpIndex + 1) + newNumber;
    } else {
      expression = newNumber;
    }
    updateDisplay();
  } else if (current !== null) {
    current = -current;
    expression = current.toString();
    updateDisplay();
  }
}

function percentInput() {
  if (newNumber !== '') {
    newNumber = (parseFloat(newNumber) / 100).toString();

    let lastOpIndex = expression.lastIndexOf('+');
    let idx = expression.lastIndexOf('-');
    if (idx > lastOpIndex) {
      lastOpIndex = idx;
    }
    idx = expression.lastIndexOf('*');
    if (idx > lastOpIndex) {
      lastOpIndex = idx;
    }
    idx = expression.lastIndexOf('/');
    if (idx > lastOpIndex) {
      lastOpIndex = idx;
    }

    if (lastOpIndex >= 0) {
      expression = expression.slice(0, lastOpIndex + 1) + newNumber;
    } else {
      expression = newNumber;
    }
    updateDisplay();
  } else if (current !== null) {
    current = current / 100;
    expression = current.toString();
    updateDisplay();
  }
}

window.addNumber = addNumber;
window.setOperator = setOperator;
window.calculateResult = calculateResult;
window.clearDisplay = clearDisplay;
window.toggleSign = toggleSign;
window.percentInput = percentInput;
window.updateDisplay = updateDisplay;

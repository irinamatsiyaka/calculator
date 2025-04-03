import { adjustFontSize } from './adjustFontSize.js';
import './styles.css';

let expression = '';
let newNumber = '';
let current = null;
let lastOperator = null;
let justCalculated = false;
const display = document.getElementById('display');

function updateDisplay() {
  display.textContent = expression === '' ? '0' : expression;
  adjustFontSize('display', 'displayContainer', 20);
}

function addNumber(value) {
  if (justCalculated) {
    if (/^\d$/.test(value)) {
      expression = value;
      newNumber = value;
      current = null;
      lastOperator = null;
      justCalculated = false;
      updateDisplay();
      return;
    }

    if (value === '.') {
      return;
    }

    return;
  }

  if (value === '.' && newNumber.includes('.')) {
    return;
  }
  if (newNumber === '' && value === '.') {
    newNumber = '0.';
    expression += '0.';
    updateDisplay();
    return;
  }
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
    if (expression.endsWith('0')) {
      expression = expression.slice(0, -1);
    }
  }
  newNumber += value;
  expression += value;
  updateDisplay();
}

function calculateResult() {
  if (newNumber === '' || lastOperator === null) return;
  current = calculation(current, lastOperator, parseFloat(newNumber));
  expression = current.toString();
  newNumber = '';
  lastOperator = null;
  justCalculated = true;

  updateDisplay();
}

function setOperator(op) {
  if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
    expression = expression.slice(0, -1);
  }
  if (newNumber === '' && current === null) {
    return;
  }
  if (newNumber !== '') {
    if (current === null) {
      current = parseFloat(newNumber);
    } else {
      current = calculation(current, lastOperator, parseFloat(newNumber));
    }
  }

  lastOperator = op;
  newNumber = '';
  expression += op;
  justCalculated = false;
  updateDisplay();
}

function calculation(a, operator, b) {
  switch (operator) {
    case '+':
      return parseFloat((a + b).toFixed(12));
    case '-':
      return parseFloat((a - b).toFixed(12));
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        alert('Деление на ноль невозможно!');
        return a;
      }
      return a / b;
    default:
      return b;
  }
}

function clearDisplay() {
  expression = '';
  newNumber = '';
  current = null;
  lastOperator = null;
  justCalculated = false;
  updateDisplay();
}

function toggleSign() {
  if (newNumber !== '') {
    if (newNumber.startsWith('-')) {
      newNumber = newNumber.slice(1);
    } else {
      newNumber = '-' + newNumber;
    }
    let idx = findLastRealOperator(expression);
    if (idx >= 0) {
      expression = expression.slice(0, idx + 1) + newNumber;
    } else {
      expression = newNumber;
    }
    justCalculated = false;
    updateDisplay();
  } else if (current !== null) {
    current = -current;
    expression = current.toString();
    justCalculated = true;
    updateDisplay();
  }
}

function findLastRealOperator(expr) {
  let plusIndex = expr.lastIndexOf('+');
  let minusIndex = expr.lastIndexOf('-');
  let mulIndex = expr.lastIndexOf('*');
  let divIndex = expr.lastIndexOf('/');

  if (minusIndex === 0) {
    minusIndex = -1;
  }

  let indexes = [plusIndex, minusIndex, mulIndex, divIndex];
  let maxIndex = indexes[0];
  for (let i = 1; i < indexes.length; i++) {
    if (indexes[i] > maxIndex) {
      maxIndex = indexes[i];
    }
  }
  return maxIndex;
}

function percentInput() {
  if (newNumber !== '') {
    newNumber = (parseFloat(newNumber) / 100).toString();
    let idx = findLastRealOperator(expression);
    if (idx >= 0) {
      expression = expression.slice(0, idx + 1) + newNumber;
    } else {
      expression = newNumber;
    }
    justCalculated = false;
    updateDisplay();
  } else if (current !== null) {
    current = current / 100;
    expression = current.toString();
    justCalculated = true;
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

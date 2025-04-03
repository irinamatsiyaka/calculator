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
  const lastNum = getLastNumber(expression);

  if (value === '.' && lastNum.includes('.')) {
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

function getLastNumber(expr) {
  let idx = findLastRealOperator(expr);
  if (idx === -1) {
    return expr; // если операторов нет, всё выражение — число
  }
  return expr.slice(idx + 1);
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

    let lastOpIndex = findLastRealOperator(expression);

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

const themeSelector = document.getElementById('themeSelector');
themeSelector.addEventListener('change', (e) => {
  const theme = e.target.value;
  const calculator = document.querySelector('.calculator');
  calculator.classList.remove('theme-default', 'theme-warm', 'theme-cool');
  calculator.classList.add(`theme-${theme}`);
});

window.addNumber = addNumber;
window.setOperator = setOperator;
window.calculateResult = calculateResult;
window.clearDisplay = clearDisplay;
window.toggleSign = toggleSign;
window.percentInput = percentInput;
window.updateDisplay = updateDisplay;

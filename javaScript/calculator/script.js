const rawInput = document.querySelector('#rawInput');
const input = document.querySelector('#input');
const btns = document.querySelectorAll('.calculator--btn');
const msgContainer = document.querySelector('.message-box');
const msgBox = document.querySelector('#msgBox');

let rawInputData = [];

const MAX_INPUT_SIZE = 16;
const OPERATORS = ['del', 'clear', 'eval', 'dec', 'sign'];

function getActualArguments(args) {
    let actualArguments = [];

    args.forEach((a) => {
        if (Array.isArray(a)) {
            actualArguments.push(...a);
        } else {
            actualArguments.push(a);
        }
    });

    return actualArguments;
}

function add(...args) {
    return getActualArguments(args).reduce((acc, curr) => acc + curr, 0);
}

function subtract(...args) {
    return -1 * getActualArguments(args).reduce((acc, curr) => curr - acc, 0);
}

function multiply(...args) {
    return getActualArguments(args).reduce((acc, curr) => acc * curr, 1);
}

function divide(...args) {
    return getActualArguments(args).reduce((acc, curr) => acc / curr);
}

function power(x, y) {
    return x ** y;
}

function factorial(x) {
    let fact = 1;

    for (let i = 2; i <= x; ++i) {
        fact *= i;
    }

    return fact;
}

function evalExpression(x, y, operator) {
    switch (operator) {
        case '+': return add(x, y);
        case '-': return subtract(x, y);
        case '*': return multiply(x, y);
        case '/': return divide(x, y);
        case '!': return factorial(x);
        case '^': return power(x, y);
        default: throw new Error('Something went wrong');
    }
}

function getCorrectElem(elem) {
    switch (elem) {
        case 'add': return ' +';
        case 'subt': return ' -';
        case 'mult': return ' *';
        case 'div': return ' /';
        case 'pow': return ' ^';
        case 'fact': return ' !';
        case 'dec': return '.';
        case 'sign': return '-';
        default: return elem;
    }
}

function addToInput(elem) {
    input.innerText += getCorrectElem(elem);
}

function clearInputs() {
    rawInput.innerText = '';
    rawInputData = [];
    input.innerText = '';
    removeMessage();
}

function popLastInput() {
    if (input.innerText !== '') {
        input.innerText = input.innerText.slice(0, -1);
    } else if (rawInput.innerText) {
        rawInputData.pop();
        rawInput.innerText = rawInputData.join(' ');
    }
}

function transferToRawInput() {
    if (input.innerText === '') return;

    rawInput.innerText += (' ' + input.innerText);
    rawInput.innerText = rawInput.innerText.trim();
    rawInputData.push(...input.innerText.split(' '));
    input.innerText = '';
}

function displayMessage(msg) {
    msgContainer.classList.remove('hidden');
    msgBox.innerText = msg;
}

function removeMessage() {
    msgContainer.classList.add('hidden');
    msgBox.innerText = '';
}

function evaluateRawInput() {
    while (rawInputData.length > 1) {
        let operatorIndex;

        if (rawInputData.indexOf('!') !== -1 || rawInputData.indexOf('^') !== -1) {
            operatorIndex = rawInputData.indexOf('!') !== -1 ? rawInputData.indexOf('!') : rawInputData.indexOf('^');
        } else if (rawInputData.indexOf('*') !== -1 || rawInputData.indexOf('/') !== -1) {
            operatorIndex = rawInputData.indexOf('*') !== -1 ? rawInputData.indexOf('*') : rawInputData.indexOf('/');
        } else if (rawInputData.indexOf('+') !== -1 || rawInputData.indexOf('-') !== -1) {
            operatorIndex = rawInputData.indexOf('+') !== -1 ? rawInputData.indexOf('+') : rawInputData.indexOf('-');
        }

        if (rawInputData[operatorIndex] === '!') {
            rawInputData.splice(operatorIndex - 1, 2,
                evalExpression(+rawInputData[operatorIndex - 1], null, rawInputData[operatorIndex]));
        } else {
            rawInputData.splice(operatorIndex - 1, 3,
                evalExpression(+rawInputData[operatorIndex - 1], +rawInputData[operatorIndex + 1], rawInputData[operatorIndex]));
        }
    }

    rawInput.innerText = '';
    input.innerText = rawInputData[0];
    rawInputData = [];
}

function parseCurrentlyPressed(pressed) {
    if (OPERATORS.indexOf(pressed) === -1
        && pressed) {
        if (rawInputData.length < MAX_INPUT_SIZE) {
            removeMessage();

            if (+pressed === 0 && input.innerText.length === 0) return;
            else if (pressed.match(/add|subt|mult|div|pow/) && input.innerText.length === 0
                && rawInputData[rawInputData.length - 1] !== '!') return;

            addToInput(pressed);
        } else {
            displayMessage('You\'ve exceeded the maximum length of an expression');
        }

        if (!pressed.match(/[0-9]/)) {
            transferToRawInput();
        }
    } else if (pressed === 'del') {
        popLastInput();
    } else if (pressed === 'clear') {
        clearInputs();
    } else if (pressed === 'eval') {
        if (rawInputData.length === 0 ||
            (rawInputData[rawInputData.length - 1].match(/[+\-*/^]/) && !input.innerText.match(/[0-9]/))) {
            displayMessage('You must have a valid expression to evaluate');
        } else {
            transferToRawInput();
            evaluateRawInput();
        }
    } else if (pressed === 'dec') {
        if (input.innerText.length > 0 && input.innerText.indexOf('.') === -1) {
            addToInput(pressed);
        }
    } else if (pressed === 'sign') {
        if (input.innerText.length > 0 && input.innerText.indexOf('-') === -1) {
            input.innerText = '-' + input.innerText;
        } else if (input.innerText.indexOf('-') !== -1) {
            input.innerText = input.innerText.substr(1);
        }
    }
}

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        parseCurrentlyPressed(e.target.dataset.value);
        document.activeElement.blur();
    });
});

document.addEventListener('keydown', (e) => {
    let currentlyPressed;

    let found = false;
    let i = 0;
    while (i < btns.length && !found) {
        if (+btns[i].dataset.key === e.keyCode) {
            currentlyPressed = btns[i];
            found = true;
        }
        else {
            ++i;
        }
    }

    if (currentlyPressed) {
        currentlyPressed.classList.add('active');

        parseCurrentlyPressed(currentlyPressed.dataset.value);

        setTimeout(() => {
            currentlyPressed.classList.remove('active');
        }, 50);
    }
});
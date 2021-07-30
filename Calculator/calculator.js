let runningTotal = 0;
let buffer = "0";       // what's on the screen
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }

    screen.innerText = buffer;
};

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            colorPressedButton(previousOperator, false);
            previousOperator = null;
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1)
            }

            colorPressedButton(previousOperator,false);
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;

        case '=':
            if (previousOperator === null) {
                //need 2 numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            colorPressedButton(previousOperator,false);
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
    }
};

function handleNumber(stringNumber) {
    if (buffer === "0") {
        buffer = stringNumber;

        colorPressedButton(previousOperator,false);
    }
    else {
        buffer += stringNumber;
    }
};

function handleMath(symbol) {
    if (buffer === "0") {
        return; // do nothing
    }

    const intBuffer = parseInt(buffer); // +buffer === parseInt(buffer) just a little trick

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    colorPressedButton(symbol, true);

    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }
    else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    }
    else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function colorPressedButton(symbol, isPressed) {
    if (previousOperator === null) {
        return;
    }

    let symbolWord;

    switch (symbol) {
        case '+':
            symbolWord = 'plus';
            break;
        case '−':
            symbolWord = 'minus';
            break;
        case '×':
            symbolWord = 'times';
            break;
        case '÷':
            symbolWord = 'divide';
            break;
    }

    const opButton = document.querySelector(`#${symbolWord}`);

    if (isPressed) {
        opButton.classList.add('colorPressedButton');
    }
    else {
        opButton.classList.remove('colorPressedButton');
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
};

init();
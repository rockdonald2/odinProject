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
    return sum(args);
}

function subtract(...args) {
    return -1 * getActualArguments(args).reduce((acc, curr) => curr - acc, 0);
}

function sum(...args) {
    return getActualArguments(args).reduce((acc, curr) => acc + curr, 0);
}

function multiply(...args) {
    return getActualArguments(args).reduce((acc, curr) => acc * curr, 1);
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

module.exports = {
    add,
    subtract,
    sum,
    multiply,
    power,
    factorial
}
const memoize = (fn) => {
    const cache = {};

    return function(...args) {
        /*if (args[0] < 0) {
            return 'OOPS';
        }*/

        if (cache[args]) {
            return cache[args];
        } else {
            const result = fn.apply(this, args);
            cache[args] = result;
            return result;
        }
    }
}

const slowFib = (n) => {
    if (n < 2) return n;

    return fibonacci(n - 1) + fibonacci(n - 2);
}

const fibonacci = memoize(slowFib);

module.exports = fibonacci

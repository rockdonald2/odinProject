const sumAll = function(x1, x2) {
    if (typeof(x1) !== "number" || typeof(x2) !== "number") {
        return 'ERROR';
    } else if (x1 < 0 || x2 < 0) {
        return 'ERROR';
    }

    if (x1 > x2) {
        [x1, x2] = [x2, x1];
    }

    let sum = 0;

    for (let i = x1; i <= x2; ++i) {
        sum += i;
    }

    return sum;
}

module.exports = sumAll

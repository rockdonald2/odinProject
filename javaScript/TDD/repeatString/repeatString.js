const repeatString = function(str, times) {
    if (times < 0) {
        return 'ERROR';
    }

    let resultString = '';

    for (let i = 1; i <= times; ++i) {
        resultString += str;
    }

    return resultString;
}

module.exports = repeatString

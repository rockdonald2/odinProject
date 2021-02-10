const reverseString = function(str) {
    /*let returnString = '';

    for (let i = str.length - 1; i >= 0; --i) {
        returnString += str[i];
    }

    return returnString;*/

    if (str === '') {
        return '';
    }

    return reverseString(str.substring(1)) + str.charAt(0);
}

module.exports = reverseString

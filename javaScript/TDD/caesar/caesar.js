const caesar = function(str, shiftValue) {
    let strArr = str.split('');

    for (let i = 0; i < strArr.length; ++i) {
        if (!str[i].match(/[a-z]/i)) continue;

        let shiftedChar = (str.charCodeAt(i) + shiftValue);

        let shift = 26;

        if (shiftedChar > 122 || (shiftedChar > 90 && str[i].match(/[A-Z]/))) {
            let mult = (Math.floor(shiftValue / 26)) * 26;

            if (mult >= 2 * shift) {
                shift += mult;
            }

            shiftedChar -= shift;
        } else if (shiftedChar < 65 || (shiftedChar < 97 && str[i].match(/[a-z]/))) {
            let mult = (Math.floor(-1 * shiftValue / 26)) * 26;

            if (mult >= 2 * shift) {
                shift += mult;
            }

            shiftedChar += shift;
        }

        strArr[i] = String.fromCharCode(shiftedChar);
    }

    return strArr.join('');
}

module.exports = caesar

const palindromes = function(str) {
    let i = 0;
    let j = str.length - 1;

    while (i <= j) {
        if (!str[i].match(/[a-z]/i)) {
            ++i;
        } else if (!str[j].match(/[a-z]/i)) {
            --j;
        } else if (str[i].toLowerCase() !== str[j].toLowerCase()) {
            return false;
        } else {
            ++i;
            --j;
        }
    }

    return true;
}

module.exports = palindromes

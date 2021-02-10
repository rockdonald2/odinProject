const ftoc = function(degreeFahr) {
    return Math.round((degreeFahr - 32) * (5 / 9) * 10) / 10;
}

const ctof = function(degreeCelsius) {
    return Math.round((degreeCelsius * (9 / 5) + 32) * 10) / 10;
}

module.exports = {
    ftoc,
    ctof
}

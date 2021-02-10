const removeFromArray = function(arr, ...args) {
    args.forEach((val) => {
       if (arr.indexOf(val) > -1) {
            arr.splice(arr.indexOf(val), 1);
       }
    });

    return arr;
}

module.exports = removeFromArray

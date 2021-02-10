let findTheOldest = function(collection) {
    return collection.reduce((storage, curr) => {
        let livedYears;
        let storageLivedYears;

        if (storage['yearOfDeath']) {
            storageLivedYears = storage['yearOfDeath'] - storage['yearOfBirth'] + 1;
        } else {
            storageLivedYears = new Date(Date.now()).getFullYear() - storage['yearOfBirth'] + 1;
        }

        if (curr['yearOfDeath']) {
            livedYears = curr['yearOfDeath'] - curr['yearOfBirth'] + 1
        } else {
            livedYears = new Date(Date.now()).getFullYear() - curr['yearOfBirth'] + 1;
        }

        if (storageLivedYears < livedYears) {
            return curr;
        }

        return storage;
    });
}

module.exports = findTheOldest

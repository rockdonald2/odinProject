const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('close', () => {
    process.exit(0);
});

/*

const getInput = () => {
   rl.question('Enter a number that is greater than 100: ', (num) => {
      if (num < 100) {
         getInput();
      } else {
         rl.close();
      }
   });
};

getInput();

*/

const getInput = () => {
    rl.question('n = ', (n) => {
        getPrimes(n);
        rl.close();
    });
};

function checkPrimality(num) {
    let i = 2;
    const root = num ** 0.5;

    while (i <= root) {
        if (!(num % i)) {
            return false;
        }

        ++i;
    }

    return true;
}

function getPrimes(n) {
    for (let i = 2; i <= n; ++i) {
        if (checkPrimality(i)) {
            console.log(i);
        }
    }
}

getInput();
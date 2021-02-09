const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateRandomNumber(x) {
    // generates a random int between [0, x)
    return Math.floor(Math.random() * x);
}

function capitalizeFirstLetterOfWord(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function computerPlay() {
    const choice = generateRandomNumber(3);

    switch (choice) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
        default:
            throw new Error('Invalid choice generated');
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice.match(/rock/i) && computerChoice.match(/scissors/i)
        || playerChoice.match(/paper/i) && computerChoice.match(/rock/i)
        || playerChoice.match(/scissors/i) && computerChoice.match(/paper/i)) {
        console.log(`You've Won! ${capitalizeFirstLetterOfWord(playerChoice)} beats ${computerChoice}`);
        return true;
    } else if (playerChoice.toLowerCase() === computerChoice.toLowerCase()){
        console.log('It\'s a draw');
        return false;
    } else {
        console.log(`You've Lost! ${computerChoice} beats ${capitalizeFirstLetterOfWord(playerChoice)}`);
        return false;
    }
}

function game(playerChoice) {
    let counter = 0;
    const numOfRounds = 3;
    let i = 1;

    let getInput = function () {
        rl.question('What is your choice?\n', (choice) => {
            if (playRound(choice, computerPlay())) {
                ++counter;
            }

            if (i === numOfRounds) {
                console.log(`You've won ${counter} times.\n`);
                return rl.close();
            }

            ++i;
            getInput();
        });
    };

    getInput();
}

rl.on('close', () => {
    process.exit(0);
});

game();
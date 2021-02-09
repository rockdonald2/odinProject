const playerHand = document.querySelector('#playerHand');
const computerHand = document.querySelector('#computerHand');
const playerCounter = document.querySelector('#playerCounter');
const computerCounter = document.querySelector('#computerCounter');
const roundNumber = document.querySelector('#roundNumber');
const roundBoard = document.querySelector('#roundBoard');
const playerBtns = document.querySelectorAll('.game--card__btn');

const ROCK_SVG = '<svg viewBox="0 0 23 20" style="width: 30px;"><path d="M21.048 3.704h-5.492v-2.53L14.38 0H6.36L0 6.36v7.28L6.36 20h12.096l1.13-1.13 1.48-9.918 1.156-.778V4.878l-1.174-1.174zm-.307 3.677l-1.056.704-1.481 10.082-.352.352H6.974l-5.493-5.493V6.974l5.493-5.493h6.793l.307.308v1.915h-2.963v1.481h9.322l.308.308V7.38z" fill="#BEBEBE"></path></svg>';
const SCISSORS_SVG = '<svg viewBox="0 0 31 20" class="rock-paper-scissors__flipped--3zy4A" style="width: 30px;"><path d="M30 11.563l-6.104-2.674h5.297l1.177-1.174V4.878l-1.174-1.174h-13.64v-2.53L14.38 0H6.36L0 6.36v7.28L6.36 20h10.614l1.111-1.111 1-6.004 8.37 3.215 1.541-.415 1.419-2.455L30 11.563zM28.037 14.4l-.481.13-9.63-3.704-1.211 7.322-.37.37h-9.37L1.48 13.027V6.974l5.493-5.493h6.793l.307.308v1.915H10.37v1.481h18.211l.308.308V7.1l-.308.307H19.26V8.47l9.482 4.167.1.37-.804 1.393z" fill="#BEBEBE"></path></svg>';
const HAND_SVG = '<svg viewBox="0 0 32 20" style="width: 30px;"><path d="M23.704 18.826v-2.53h3.27l1.174-1.174v-2.53h1.789l1.174-1.173V8.58l-1.174-1.174h-1.048v-2.53l-1.174-1.173h-8.519l.434-.434V1.174L18.456 0H6.359L0 6.36v7.28L6.36 20h16.17l1.174-1.174zm-16.73-.307l-5.493-5.493V6.974l5.493-5.493h10.867l.307.308v.867L17.1 3.704h-5.989v1.481H27.1l.307.308v1.914h-11.11V8.89h13.025l.308.307v1.608l-.308.307H16.296v1.482h10.37v1.914l-.307.308H16.296v1.481h5.926v1.915l-.307.308H6.975z" fill="#BEBEBE"></path></svg>';

let roundCounter = 0;

function generateRandomNumber(x) {
    // generates a random int between [0, x)
    return Math.floor(Math.random() * x);
}

function computerPlay() {
    const choice = generateRandomNumber(3);

    switch (choice) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
        default:
            throw new Error('Invalid choice generated');
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice.match(/rock/i) && computerChoice.match(/scissors/i)
        || playerChoice.match(/paper/i) && computerChoice.match(/rock/i)
        || playerChoice.match(/scissors/i) && computerChoice.match(/paper/i)) {
        return 'player';
    } else if (playerChoice.toLowerCase() === computerChoice.toLowerCase()){
        return 'tie';
    } else {
        return 'computer';
    }
}

function getChoiceSvg(choice) {
    if (choice === 'rock') {
        return ROCK_SVG;
    } else if (choice === 'paper') {
        return HAND_SVG;
    } else if (choice === 'scissors') {
        return SCISSORS_SVG;
    } else {
        throw new Error('Invalid choice generated');
    }
}

function playGame(e) {
    playerHand.classList.remove(...playerHand.classList);
    playerHand.classList.add('none');
    computerHand.classList.remove(...computerHand.classList);
    computerHand.classList.add('none');

    ++roundCounter;

    roundNumber.innerText = roundCounter;

    const playerChoice = e.target.dataset['choice'];
    const computerChoice = computerPlay();

    const round = playRound(playerChoice, computerChoice);

    setTimeout(() => {
        if (round === 'player') {
            playerCounter.innerText = (+playerCounter.textContent + 1).toString();
        } else if (round === 'computer') {
            computerCounter.innerText = (+computerCounter.textContent + 1).toString();
        }

        let currentRound = document.createElement('li');
        currentRound.classList.add('game--card__history');
        currentRound.innerHTML = `
                <div ${round === 'player' ? 'class="won"' : ''}>${getChoiceSvg(playerChoice)}</div>
                <div>${roundCounter}</div>
                <div ${round === 'computer' ? 'class="won"' : ''}>${getChoiceSvg(computerChoice)}</div>
        `;
        roundBoard.append(currentRound);

        if (roundBoard.childNodes.length > 4) {
            roundBoard.removeChild(roundBoard.childNodes[1]);
        }

        playerHand.classList.remove('none');
        playerHand.classList.add(playerChoice);
        computerHand.classList.remove('none');
        computerHand.classList.add(computerChoice);
    }, 350);

    document.activeElement.blur();
}

playerBtns.forEach((btn) => {
    btn.addEventListener('click', playGame);
});
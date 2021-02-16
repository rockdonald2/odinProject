// button behaviour
let modalController = (function () {
    'use strict';

    const btnMenu = document.querySelector('#btnMenu');
    const btnRestart = document.querySelector('#btnRestart');
    const overlay = document.querySelector('#overlay');
    const modal = document.querySelector('#modal');

    function toggleText(e) {
        const text = this.querySelector('.btn--menu__text') || this.querySelector('.btn--restart__text');
        if (e.type === "mouseleave") {
            text.classList.toggle('hidden');
        } else {
            setTimeout(() => {
                text.classList.toggle('hidden');
            }, 25);
        }
    }

    function toggleMenu(e) {
        overlay.classList.add('show');
        modal.classList.add('show');

        setTimeout(() => {
            document.activeElement.blur();
        }, 250);
    }

    function hideOverlay(e) {
        if (e.type === 'click' ||
            (e.type === 'keydown' && e.key === 'Escape')) {
            overlay.classList.remove('show');
            modal.classList.remove('show');
        }
    }

    function refreshPage(e) {
        setTimeout(() => {
            location.reload();
        }, 150);
    }

    btnMenu.addEventListener('mouseenter', toggleText);
    btnRestart.addEventListener('mouseenter', toggleText);
    btnMenu.addEventListener('mouseleave', toggleText);
    btnRestart.addEventListener('mouseleave', toggleText);
    btnMenu.addEventListener('click', toggleMenu);
    btnRestart.addEventListener('click', refreshPage);
    overlay.addEventListener('click', hideOverlay);
    document.addEventListener('keydown', hideOverlay);

    return {hideOverlay};
})();

// GAME
let displayController = (function () {
    const cellsLogical = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const cellsDom = document.querySelectorAll('.board--cell');

    function setCell(i, j, sign) {
        if (sign === 'x' || sign === 'o') {
            cellsLogical[i][j] = sign;
        }
    }

    function isCellEmpty(i, j) {
        return cellsLogical[i][j] === null;
    }

    function printLogical() {
        console.log(cellsLogical);
    }

    function setDomCell(i, j, sign) {
        if ((sign === 'x' || sign === 'o') && isCellEmpty(i, j)) {
            cellsDom[i * 3 + j].innerText = sign;
            setCell(i, j, sign);
            return hasWon(sign);
        }
    }

    function hasWon(sign) {
        if (cellsLogical[0][0] === sign && cellsLogical[1][1] === sign && cellsLogical[2][2] === sign) {
            return true;
        } else if (cellsLogical[2][0] === sign && cellsLogical[1][1] === sign && cellsLogical[0][2] === sign) {
            return true;
        } else {
            for (let i = 0; i < 3; ++i) {
                if (cellsLogical[i][0] === sign && cellsLogical[i][1] === sign && cellsLogical[i][2] === sign) {
                    return true;
                }
            }

            for (let i = 0; i < 3; ++i) {
                if (cellsLogical[0][i] === sign && cellsLogical[1][i] === sign && cellsLogical[2][i] === sign) {
                    return true;
                }
            }
        }

        return false;
    }

    function getDomCells() {
        return cellsDom;
    }

    return {printLogical, setCell, setDomCell, isCellEmpty, hasWon, getDomCells};
})();

let gameController = (function () {
    let playerSign = document.querySelector('#cross').value === 'on' ? 'x' : 'o';
    let opponentSign = playerSign === 'x' ? 'o' : 'x';
    let aiOpponent = false;
    let playerTurn = true;
    const menuForm = document.querySelector('.modal--form');
    const turnDisplay = document.querySelector('#currentTurn');

    function setSettings(e) {
        e.preventDefault();
        const form = this;
        modalController.hideOverlay({type: 'click'});
        playerSign = form.querySelector('#cross').value === 'on' ? 'x' : 'o';
        opponentSign = playerSign === 'x' ? 'o' : 'x';
        aiOpponent = form.querySelector('#aiOpponent').value === 'on';
    }

    menuForm.addEventListener('submit', setSettings);
    displayController.getDomCells().forEach((cell, i) => {
        cell.addEventListener('click', () => {
            if (playerTurn) {
                if (displayController.setDomCell(Math.floor(i / 3), i % 3, playerSign)) {
                    console.log('WON player');
                }
            } else {
                if (displayController.setDomCell(Math.floor(i / 3), i % 3, opponentSign)) {
                    console.log('WON opponent');
                }
            }

            playerTurn = !playerTurn;
            turnDisplay.innerText = playerTurn ? playerSign : opponentSign;
        });
    });

    return {};
})();
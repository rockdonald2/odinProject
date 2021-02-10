const gridSizeDisplay = document.querySelector('#gridSize');
const gridSizeInput = document.querySelector('#gridInput');
const applyBtn = document.querySelector('#applyButton');
const stopBtn = document.querySelector('#stopButton');
const form = document.querySelector('#form');
const eraserSlider = document.querySelector('#eraserSlider');

const grid = document.querySelector('.container-grid');
let gridCells = null;
let actualSize = null;
let currentSize = null;

const INITIAL_SIZE = 16;
const GRID_CELL_TEMPLATE = '<div class="container-grid--cell"></div>';
const COLOR = '#e62649';

let currentlyDrawing = true;

const colorCell = (e) => {
    if (currentlyDrawing) {
        e.target.setAttribute('style', `background-color: ${COLOR}`);
    }
};

const addListeners = (cells) => {
    cells.forEach((c) => c.addEventListener('mouseover', colorCell));
};

const makeGrid = (size) => {
    currentlyDrawing = true;

    grid.innerHTML = '';

    currentSize = size;
    actualSize = size ** 2;

    for (let i = 1; i <= actualSize; ++i) {
        grid.innerHTML += GRID_CELL_TEMPLATE;
    }

    grid.setAttribute('style', `
            grid-template-rows: repeat(${size}, 1fr); 
            grid-template-columns: repeat(${size}, 1fr);
     `);

    gridCells = grid.querySelectorAll('.container-grid--cell');
    addListeners(gridCells);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputSize = e.target.querySelector('input[type="range"]').value;
    makeGrid(inputSize);
    document.activeElement.blur();
});

stopBtn.addEventListener('click', (e) => {
    currentlyDrawing = !currentlyDrawing;
    document.activeElement.blur();
});

gridSizeInput.addEventListener('input', (e) => {
    gridSizeDisplay.innerText = `${e.target.value}x${e.target.value}`;
});

eraserSlider.addEventListener('input', (e) => {
    const erasePercentage = e.target.value;
    const eraseCells = Math.floor(Math.round(erasePercentage * currentSize / 100));

    for (let r = 0; r < currentSize; ++r) {
        for (let c = eraseCells; c < currentSize; ++c) {
            gridCells[r * currentSize + c].setAttribute('style', '');
        }
    }
});

eraserSlider.addEventListener('mouseout', (e) => {
    e.target.value = 100;
});

makeGrid(INITIAL_SIZE);
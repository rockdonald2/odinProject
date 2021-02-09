const gridSizeDisplay = document.querySelector('#gridSize');
const gridSizeInput = document.querySelector('#gridInput');
const applyBtn = document.querySelector('#applyButton');
const stopBtn = document.querySelector('#stopButton');
const form = document.querySelector('#form');

const grid = document.querySelector('.container-grid');
let gridCells = null;

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

    const actualSize = size ** 2;

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

makeGrid(INITIAL_SIZE);
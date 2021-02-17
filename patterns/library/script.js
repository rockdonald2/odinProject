const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const addBookTitle = document.querySelector('#addBookTitle');
const addBookPanel = document.querySelector('#addBookForm');
const confirmTitle = document.querySelector('#confirmTitle');
const confirmPanel = document.querySelector('#confirmationForm');
const cardsContainer = document.querySelector('#cards');
const addButton = document.querySelector('#addButton');
const clearButton = document.querySelector('#clearButton');
const noOfBooks = document.querySelector('#noOfBooksAdded');
const noOfBooksRead = document.querySelector('#noOfBooksRead');
const noOfBooksNotRead = document.querySelector('#noOfBooksNotRead');

let readButtons = null;
let removeButtons = null;

let library = [];

function Book(title, author, noOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isRead = isRead;
}

function toggleOverlay() {
    overlay.classList.toggle('show');
}

function toggleModal() {
    modal.classList.toggle('show');
}

function toggleAddBook() {
    addBookTitle.classList.toggle('hidden');
    addBookPanel.classList.toggle('hidden');
}

function toggleConfirm() {
    confirmTitle.classList.toggle('hidden');
    confirmPanel.classList.toggle('hidden');
}

function toggleText(e) {
    const text = this.querySelector('.btn--clear__text');
    if (e.type === 'mouseleave') {
        text.classList.toggle('hidden');
    } else {
        setTimeout(() => {
            text.classList.toggle('hidden');
        }, 25);
    }
}

function addBookToLibrary(e) {
    e.preventDefault();
    toggleOverlay();
    toggleModal();
    setTimeout(() => {
        toggleAddBook();
    }, 250);

    const formElems = e.target;

    if (formElems[3].value !== "yes" && formElems[3].value !== "no") {
        throw new Error('Invalid input at isRead');
    }

    const currentData = [formElems[0].value, formElems[1].value, formElems[2].value, formElems[3].value === 'yes'];

    if (library.filter((book) => {
        if (book.title === currentData[0] && book.author === currentData[1]) {
            return true;
        }
    }).length === 0) {
        library.push(new Book(currentData[0], currentData[1], currentData[2], currentData[3]));
        setStorage();
        showCards();
    }

    e.target.reset();
}

function showAddBookPanel() {
    setTimeout(() => {
        document.activeElement.blur();
    }, 250);
    toggleOverlay();
    toggleModal();
    toggleAddBook();
}

function showCards() {
    cardsContainer.innerHTML = '';

    noOfBooks.innerText = library.length;
    noOfBooksRead.innerText = library.filter((book) => book.isRead).length;
    noOfBooksNotRead.innerText = library.length - library.filter((book) => book.isRead).length;

    library.forEach((card) => {
        cardsContainer.innerHTML +=
            `<li class="card">
                <h3 class="card--title">${card.title}</h3>
                <p class="card--author">${card.author}</p>
                <p class="card--pages">${card.noOfPages} pages</p>
                <div class="card--btns">
                    <button class="btn btn--read ${card.isRead ? "btn--read__yes" : "btn--read__no"}"
                            data-title="${card.title}" data-author="${card.author}">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Read
                    </button>
                    <button class="btn btn--remove"
                            data-title="${card.title}" data-author="${card.author}">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Remove
                    </button>
                </div>
            </li>`;
    });

    readButtons = document.querySelectorAll('.btn--read');
    removeButtons = document.querySelectorAll('.btn--remove')

    addBtnEventListeners(readButtons, removeButtons);
}

function showConfirmPanel() {
    setTimeout(() => {
        document.activeElement.blur();
    }, 250);
    toggleOverlay();
    toggleModal();
    toggleConfirm();
}

function handleConfirm(e) {
    e.preventDefault();
    toggleOverlay();
    toggleModal();
    setTimeout(() => {
        toggleConfirm();
    }, 250);

    if (e.submitter.value === "yes") {
        library = [];
        localStorage.removeItem('library');
        showCards();
    }
}

function retrieveLocalLibrary() {
    if (localStorage.getItem('library')) {
        library = JSON.parse(localStorage.getItem('library'));
        showCards();
    }
}

function setStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

function addBtnEventListeners(group1, group2) {
    group1.forEach((book) => book.addEventListener('click', setReadBook));
    group2.forEach((book) => book.addEventListener('click', removeBook));
}

function setReadBook(e) {
    const title = e.target.dataset['title'];
    const author = e.target.dataset['author'];

    const match = library.filter((book) => book.title === title && book.author === author);

    if (match.length) {
        const book = match[0];
        book.isRead = !book.isRead;
        showCards();
    }

    setTimeout(() => {
        document.activeElement.blur();
    }, 250);
}

function removeBook(e) {
    const title = e.target.dataset['title'];
    const author = e.target.dataset['author'];

    library = library.filter((book) => book.title !== title && book.author !== author);
    setStorage();
    showCards();

    setTimeout(() => {
        document.activeElement.blur();
    }, 250);
}

addButton.addEventListener('click', showAddBookPanel);
clearButton.addEventListener('click', showConfirmPanel);
clearButton.addEventListener('mouseenter', toggleText);
clearButton.addEventListener('mouseleave', toggleText);

overlay.addEventListener('click', () => {
    overlay.classList.remove('show');
    modal.classList.remove('show');
    setTimeout(() => {
        addBookTitle.classList.add('hidden');
        addBookPanel.classList.add('hidden');
        confirmTitle.classList.add('hidden');
        confirmPanel.classList.add('hidden');
    }, 250);
});

addBookPanel.addEventListener('submit', addBookToLibrary);
confirmPanel.addEventListener('submit', handleConfirm);

retrieveLocalLibrary();
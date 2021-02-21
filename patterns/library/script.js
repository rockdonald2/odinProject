"use strict";

// using old constructor syntax
/*function Book(title, author, noOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isRead = isRead;
}*/

let libraryController = (function () {
    // using class syntax
    class Book {
        constructor(title, author, noOfPages, isRead) {
            this.title = title;
            this.author = author;
            this.noOfPages = noOfPages;
            this.isRead = isRead;
        }
    }

    let library = [];

    function setReadBook(e) {
        const title = e.target.dataset['title'];
        const author = e.target.dataset['author'];

        const match = library.filter((book) => book.title === title && book.author === author);

        if (match.length) {
            const book = match[0];
            book.isRead = !book.isRead;
            displayController.showCards();
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
        displayController.showCards();

        setTimeout(() => {
            document.activeElement.blur();
        }, 250);
    }

    function setStorage() {
        localStorage.setItem('library', JSON.stringify(library));
    }

    function retrieveLocalLibrary() {
        if (localStorage.getItem('library')) {
            library = JSON.parse(localStorage.getItem('library'));
            displayController.showCards();
        }
    }

    function addBookToLibrary(e) {
        e.preventDefault();
        displayController.hideModal();

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
            displayController.showCards();
        }

        e.target.reset();
    }

    function clearLibrary () {
        library = [];
    }

    function clearLocalLibrary() {
        localStorage.removeItem('library');
    }

    function getLibraryLength() {
        return library.length;
    }

    function getNoOfBooksRead() {
        return library.filter((book) => book.isRead).length;
    }

    function getNoOfBooksNotRead() {
        return library.length - getNoOfBooksRead();
    }

    function createCards(container) {
        library.forEach((card) => {
            container.innerHTML +=
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
    }

    return {clearLibrary, clearLocalLibrary, retrieveLocalLibrary, addBookToLibrary, removeBook, setReadBook, getLibraryLength, getNoOfBooksRead, getNoOfBooksNotRead, createCards};
}());

let displayController = (function () {
    const overlay = document.querySelector('#overlay');
    const modal = document.querySelector('#modal');
    const addBookTitle = document.querySelector('#addBookTitle');
    const addBookPanel = document.querySelector('#addBookForm');
    const confirmTitle = document.querySelector('#confirmTitle');
    const confirmPanel = document.querySelector('#confirmationForm');
    const noOfBooks = document.querySelector('#noOfBooksAdded');
    const noOfBooksRead = document.querySelector('#noOfBooksRead');
    const noOfBooksNotRead = document.querySelector('#noOfBooksNotRead');
    const cardsContainer = document.querySelector('#cards');
    const addButton = document.querySelector('#addButton');
    const clearButton = document.querySelector('#clearButton');
    let readButtons = null;
    let removeButtons = null;

    function toggleOverlay(e) {
        overlay.classList.toggle('show');
    }

    function toggleModal(e) {
        modal.classList.toggle('show');
    }

    function toggleAddBook(e) {
        addBookTitle.classList.toggle('hidden');
        addBookPanel.classList.toggle('hidden');
    }

    function toggleConfirm(e) {
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

    function hideModal(e) {
        overlay.classList.remove('show');
        modal.classList.remove('show');
        setTimeout(() => {
            addBookTitle.classList.add('hidden');
            addBookPanel.classList.add('hidden');
            confirmTitle.classList.add('hidden');
            confirmPanel.classList.add('hidden');
        }, 250);
    }

    function showConfirmPanel(e) {
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
            libraryController.clearLibrary();
            libraryController.clearLocalLibrary();
            showCards();
        }
    }

    function showAddBookPanel(e) {
        setTimeout(() => {
            document.activeElement.blur();
        }, 250);
        toggleOverlay();
        toggleModal();
        toggleAddBook();
    }

    function showCards() {
        cardsContainer.innerHTML = '';

        noOfBooks.innerText = libraryController.getLibraryLength();
        noOfBooksRead.innerText = libraryController.getNoOfBooksRead();
        noOfBooksNotRead.innerText = libraryController.getNoOfBooksNotRead();

        libraryController.createCards(cardsContainer);

        readButtons = document.querySelectorAll('.btn--read');
        removeButtons = document.querySelectorAll('.btn--remove')

        addBtnEventListeners(readButtons, removeButtons);
    }

    function addBtnEventListeners(readButtonGroup, removeButtonGroup) {
        readButtonGroup.forEach((book) => book.addEventListener('click', libraryController.setReadBook));
        removeButtonGroup.forEach((book) => book.addEventListener('click', libraryController.removeBook));
    }

    addButton.addEventListener('click', showAddBookPanel);
    clearButton.addEventListener('click', showConfirmPanel);
    clearButton.addEventListener('mouseenter', toggleText);
    clearButton.addEventListener('mouseleave', toggleText);

    overlay.addEventListener('click', () => {
        hideModal();
    });

    addBookPanel.addEventListener('submit', libraryController.addBookToLibrary);
    confirmPanel.addEventListener('submit', handleConfirm);

    return {showCards, hideModal};
}());

libraryController.retrieveLocalLibrary();
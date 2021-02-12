let library = [];

function Book(title, author, noOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.isRead ? "read" : "not read yet"}`;
}

function addBookToLibrary() {
    const title = prompt('Enter the title of your book: ');
    const author = prompt('Enter the author of your book: ');
    const noOfPages = parseInt(prompt('Enter the number of pages: '));
    const isRead = prompt('Have you read it (yes or no): ');

    if (isRead !== 'yes' && isRead !== 'no') {
        throw new Error('Invalid input at isRead');
    }

    library.push(new Book(title, author, noOfPages, isRead === 'yes'));
}

function displayLibrary() {
    library.forEach((book) => {
        console.log(book.info());
    });
}

addBookToLibrary();
displayLibrary();
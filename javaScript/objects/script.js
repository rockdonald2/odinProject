/*
function Book(title, author, noOfPages, isRead) {
    return {
        title,
        author,
        noOfPages,
        isRead,
        info: function () {
            return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.isRead ? "read" : "not read yet"}`;
        },
    }
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(hobbit.info());
*/

/*
let head = {
    glasses: 1
};

let table = {
    pen: 3
};

let bed = {
    sheet: 1,
    pillow: 2
};

let pockets = {
    money: 2000
};

pockets.__proto__ = bed;
bed.__proto__ = table;
table.__proto__ = head;

console.log(pockets.pen);
console.log(bed.glasses);
*/

function Student() {
}

Student.prototype.sayName = function() {
    console.log(this.name)
}

function EighthGrader(name) {
    this.name = name
    this.grade = 8
}

EighthGrader.prototype = Object.create(Student.prototype)

const carl = new EighthGrader("carl")
carl.sayName() // console.logs "carl"
console.log(carl.grade) // 8
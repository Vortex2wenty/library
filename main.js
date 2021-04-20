let myLibrary = [];
const form = document.querySelector('.add-book');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'book read' : 'not read yet'}`;
    }

    toggleRead = () => {
        this.read ? this.read = false : this.read = true;
    }
}

const addBookBtn = document.querySelector('input[type=submit]');
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(myLibrary);
    displayBooks(myLibrary);
});

function addBookToLibrary(array) {
    const title = form.querySelector('input[name=title]');
    const author = form.querySelector('input[name=author]');
    const pages = form.querySelector('input[name=pages]');
    const read = form.querySelector('input[name=read]');

    const newBook = new Book(title.value, author.value, pages.value, read.checked);
    return array.push(newBook);
}

function deleteBookFromLibrary(array, index) {
    return array.splice(index, 1);
}

function displayBooks(array) {
    const containerList = document.querySelector('#container ul');
    containerList.innerHTML = '';
    array.forEach((book, index) => {
        const bookCard = document.createElement('li');
        bookCard.textContent = book.info();
        bookCard.setAttribute('data-book-array-index', index)
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn-delete');
        deleteBtn.textContent = 'Delete this book';
        deleteBtn.addEventListener('click', () => {
            deleteBookFromLibrary(myLibrary, bookCard.getAttribute('data-book-array-index'));
            displayBooks(myLibrary);
        });
        const readBtn = document.createElement('button');
        readBtn.classList.add('btn-read');
        readBtn.textContent =  book.read ? 'Toggle Read' : 'Toggle Unread';
        readBtn.addEventListener('click', () => {
            book.toggleRead();
            displayBooks(myLibrary);
        });
        bookCard.appendChild(readBtn);
        bookCard.appendChild(deleteBtn);
        containerList.appendChild(bookCard);
    });
}

const newBookBtn = document.querySelector('.btn-new-book')
newBookBtn.addEventListener('click', () => {
    form.classList.contains('d-none') ? form.classList.remove('d-none') : form.classList.add('d-none');
});
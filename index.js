/* eslint-disable max-classes-per-file */
const list = document.getElementById('list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addButton = document.querySelector('.buttonClass');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UseBook {
  static createBook() {
    return new Book(bookTitle.value, bookAuthor.value);
  }

  static saveBook(newBook) {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books === null) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books)); //
    }
  }

  static findBooks() {
    return JSON.parse(localStorage.getItem('books'));
  }

  static displayBooks() {
    const reloadBooks = UseBook.findBooks() || [];
    list.innerHTML = '';
    reloadBooks.forEach((abook) => {
      const book = document.createElement('li');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Remove';
      book.innerHTML = `<p>${abook.title}</p>
        <p>${abook.author} </p>`;
      deleteBtn.id = abook.title;
      deleteBtn.className = 'removeBtn';
      const br = document.createElement('br');
      list.appendChild(book);
      book.appendChild(deleteBtn);
      list.appendChild(br);
      deleteBtn.addEventListener('click', () => {
        if (deleteBtn.id === abook.title) {
          const index = reloadBooks.findIndex((rBook) => rBook.title === deleteBtn.id);
          reloadBooks.splice(index, 1);
          list.removeChild(book);
          localStorage.setItem('books', JSON.stringify(reloadBooks));
        }
      });
    });
  }
}

addButton.addEventListener('click', () => {
  const newBook = UseBook.createBook();
  UseBook.saveBook(newBook);
  UseBook.displayBooks();
  const books = UseBook.findBooks();
  if (books.length === 0) {
    const abook = UseBook.createBook();
    const book = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Remove';
    book.innerHTML = `<p>${abook.title}</p>
        <p>${abook.author} </p>`;
    deleteBtn.id = abook.title;
    deleteBtn.className = 'removeBtn';
    const br = document.createElement('br');
    list.appendChild(book);
    book.appendChild(deleteBtn);
    list.appendChild(br);
    deleteBtn.addEventListener('click', () => {
      if (deleteBtn.id === abook.title) {
        const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
        books.splice(index, 1);
        list.removeChild(book);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
    UseBook.saveBook(abook);
  }
});

window.onload = () => {
  UseBook.displayBooks();
};

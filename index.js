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
      const book = document.createElement('tr');
      const btnContainer = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Remove';
      book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
      book.appendChild(btnContainer);
      deleteBtn.id = abook.title;
      deleteBtn.className = 'btn btn-dark';
      btnContainer.className = 'd-flex justify-content-end';
      list.appendChild(book);
      btnContainer.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', () => {
        if (deleteBtn.id === abook.title) {
          const index = reloadBooks.findIndex(
            (rBook) => rBook.title === deleteBtn.id
          );
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
    const book = document.createElement('tr');
    const btnContainer = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Remove';
    book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
    book.appendChild(btnContainer);
    deleteBtn.id = abook.title;
    deleteBtn.className = 'btn btn-dark';
    btnContainer.className = 'd-flex justify-content-end';
    list.appendChild(book);
    btnContainer.appendChild(deleteBtn);
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

const timeNow = document.querySelector('.timeNow');
const dayTime = luxon.DateTime;
const time = dayTime.now();
const span1 = document.createElement('span');
const span2 = document.createElement('span');
const span3 = document.createElement('span');
const span4 = document.createElement('span');
const span5 = document.createElement('span');
console.log(time);
span2.innerHTML = time.monthLong;
timeNow.appendChild(span2);
span1.innerHTML = time.year;
timeNow.appendChild(span1);

span3.innerHTML = time.day;
timeNow.appendChild(span3);
span4.innerHTML = time.hour;
timeNow.appendChild(span4);
span5.innerHTML = time.minute;
timeNow.appendChild(span5);

// timeNow.innerHTML = now;

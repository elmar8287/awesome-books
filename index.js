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
      const searchBooks = UseBook.findBooks();
      for (let i = 0; i < searchBooks.length; i += 1) {
        if (newBook.title === searchBooks[i].title) {
          return;
        }
      }
      if (newBook.title !== '') {
        books.push(newBook);
      }
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
            (rBook) => rBook.title === deleteBtn.id,
          );
          reloadBooks.splice(index, 1);
          list.removeChild(book);
          localStorage.setItem('books', JSON.stringify(reloadBooks));
        }
      });
    });
  }
}

const newAdd = document.querySelector('.openNew');
const contactInfo = document.getElementsByClassName('contact')[0];
const bookList = document.getElementsByClassName('listBook')[0];
const inputs = document.querySelector('.inputs');
const openList = document.querySelector('.openList');
const openContact = document.querySelector('.openContact');

addButton.addEventListener('click', () => {
  contactInfo.classList.add('d-none');
  contactInfo.classList.remove('d-flex');
  bookList.classList.remove('d-none');
  inputs.classList.add('d-none');
  inputs.classList.remove('d-flex');
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

function getNumberSuffix(num) {
  if (num >= 11 && num <= 13) return 'th';

  const lastDigit = num.toString().slice(-1);

  switch (lastDigit) {
    case '1': return 'st';
    case '2': return 'nd';
    case '3': return 'rd';
    default: return 'th';
  }
}

/* eslint-disable */
const { DateTime } = luxon;
/* eslint-enable */
setInterval(() => {
  const today = DateTime.local();
  const modified = today.toLocaleString({ ...DateTime.DATETIME_MED_WITH_SECONDS, month: 'long' }).split(' ');
  const dateNum = parseInt(modified[1], 10);
  modified[1] = dateNum + getNumberSuffix(dateNum);
  modified[modified.length - 1] = (modified[modified.length - 1]).toLowerCase();
  timeNow.innerHTML = modified.join(' ');
}, 1000);

const y = DateTime.now();
// year.textContent = y.year;
console.log(y);

newAdd.addEventListener('click', () => {
  contactInfo.classList.add('d-none');
  bookList.classList.add('d-none');
  inputs.classList.remove('d-none');
  inputs.classList.add('d-flex');
  contactInfo.classList.remove('d-flex');
});

openContact.addEventListener('click', () => {
  contactInfo.classList.remove('d-none');
  contactInfo.classList.add('d-flex');
  bookList.classList.add('d-none');
  inputs.classList.add('d-none');
  inputs.classList.remove('d-flex');
});

openList.addEventListener('click', () => {
  contactInfo.classList.add('d-none');
  contactInfo.classList.remove('d-flex');
  bookList.classList.remove('d-none');
  inputs.classList.add('d-none');
  inputs.classList.remove('d-flex');
});
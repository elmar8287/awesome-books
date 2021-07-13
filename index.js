let books = [];
const list = document.getElementById('list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const buttonClass = document.querySelector('.buttonClass');

function addItem(title, author) {
  books.push({ title: title.value, author: author.value });
  saveBooks(books);
  list.innerHTML = '';
  const getData = localStorage.getItem('books');
  const reloadBooks = JSON.parse(localStorage.getItem('books'));
  console.log(reloadBooks);
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
        const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
        books.splice(index, 1);
        list.removeChild(book);
        saveBooks(books);
      }
    });
  });
  console.log(books);
}

buttonClass.addEventListener('click', () => {
  addItem(bookTitle, bookAuthor);
});

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function saveFormDataToLocalStorage(title, author) {
  const bookList = {
    title: title.value,
    author: author.value,
  };
  localStorage.setItem('bookList', JSON.stringify(bookList));
}
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

const inputsArray = [titleInput, authorInput];
// GETTING FORM DATA FROM LOCAL STORAGE
window.addEventListener('load', () => {
  const reloadBooks = JSON.parse(localStorage.getItem('books'));
  if (reloadBooks !== null) {
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
          const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
          books.splice(index, 1);
          list.removeChild(book);
        }
      });
    });
  }

  if (JSON.parse(localStorage.getItem('bookList'))) {
    const { title, author } = JSON.parse(localStorage.getItem('bookList'));
    titleInput.value = title;
    authorInput.value = author;
  }
  inputsArray.forEach((input) => {
    input.addEventListener('input', () => {
      if (input === titleInput) {
        titleInput.value = input.value;
      } else if (input === authorInput) {
        authorInput.value = input.value;
      }
      saveFormDataToLocalStorage(titleInput, authorInput);
    });
  });
});

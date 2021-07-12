const books = [];
const list = document.getElementById('list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const buttonClass = document.querySelector('.buttonClass');

function saveFormDataToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function addItem(title, author) {
  books.push({ title: title.value, author: author.value });
  list.innerHTML = '';
  books.forEach((abook) => {
    const book = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'REMOVE';
    book.innerHTML = `<p>${abook.title}</p>
  <p>${abook.author} </p>`;
    deleteBtn.id = abook.title;
    deleteBtn.className = 'removeBtn';
    list.appendChild(book);
    book.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      if (deleteBtn.id === abook.title) {
        const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
        books.splice(index, 1);
        list.removeChild(book);
        saveFormDataToLocalStorage(books);
      }
    });
  });
}

buttonClass.addEventListener('click', () => {
  addItem(bookTitle, bookAuthor);
  saveFormDataToLocalStorage(books);
});

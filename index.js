const books = [];
let list = document.getElementById("list");
let bookTitle = document.getElementById("title");
let bookAuthor = document.getElementById("author");
const buttonClass = document.querySelector('.buttonClass');


function addItem(title, author){
  books.push({title:title.value, author:author.value})
  list.innerHTML = "";
  books.forEach(abook => {
    let book = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = 'REMOVE';
    book.innerHTML = `<p>${abook.title}</p>
  <p>${abook.author} </p>`;
  deleteBtn.id = abook.title;
  deleteBtn.className =  "removeBtn"
    list.appendChild(book);
    book.appendChild(deleteBtn);
deleteBtn.addEventListener('click', () => {
    console.log(deleteBtn);
    if(deleteBtn.id === abook.title) {
    const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
    books.splice(index, 1);
    console.log(books);
    list.removeChild(book)
    saveFormDataToLocalStorage(books);
    console.log(localStorage.getItem('books'));
   
  }
})
  })
}

buttonClass.addEventListener('click',() =>{
addItem(bookTitle, bookAuthor);
saveFormDataToLocalStorage(books);
console.log(localStorage.getItem('books'));
})


function saveFormDataToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}




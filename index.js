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
   
  }
})
  })
}

buttonClass.addEventListener('click',() =>{
addItem(bookTitle, bookAuthor)
})


// function addItem() {
//   var author = document.createElement("li");
//   title.setAttribute('id', bookTitle.value);
//   title.appendChild(document.createTextNode(bookTitle.value));
//   author.setAttribute('id', bookAuthor.value);
//   author.appendChild(document.createTextNode(bookAuthor.value));
//   a.appendChild(title);
//   a.appendChild(author);
//   const removeButton = document.createElement('button');
//   removeButton.textContent = 'Remove';
//   removeButton.setAttribute('class', 'btn');
//   a.appendChild(removeButton);
//   var item1 = document.getElementById(bookTitle.value);
//   var item2 = document.getElementById(bookAuthor.value);
//   const xxx = document.querySelector('#list');
//   removeButton.onclick = () => {
//     a.removeChild(item1);
//     a.removeChild(item2);
//     xxx.innerHTML = '';
//   };

// }
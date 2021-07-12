function addItem() {
  var a = document.getElementById("list");
  var bookTitle = document.getElementById("title");
  var bookAuthor = document.getElementById("author");
  var title = document.createElement("li");
  var author = document.createElement("li");
  title.setAttribute('id', bookTitle.value);
  title.appendChild(document.createTextNode(bookTitle.value));
  author.setAttribute('id', bookAuthor.value);
  author.appendChild(document.createTextNode(bookAuthor.value));
  a.appendChild(title);
  a.appendChild(author);
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.setAttribute('class', 'btn');
  a.appendChild(removeButton);
  var item1 = document.getElementById(bookTitle.value);
  var item2 = document.getElementById(bookAuthor.value);
  const xxx = document.querySelector('#list');
  removeButton.onclick = () => {
    a.removeChild(item1);
    a.removeChild(item2);
    xxx.innerHTML = '';
  };

}
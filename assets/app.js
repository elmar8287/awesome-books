(function(){
  
  var list = document.querySelector('#list'),
      form = document.querySelector('form'),
      title = document.querySelector('#title');
      author = document.querySelector('#author');
  
  form.addEventListener('submit',function(e){
    e.preventDefault();
    list.innerHTML += '<li>' + title.value + " " + author.value + '</li>';
    store();
    title.value = "";
    author.value = "";
  },false)
  
  list.addEventListener('click',function(e){
    var t = e.target;
    if(t.classList.contains('checked')){
      t.parentNode.removeChild(t);
    } else {
      t.classList.add('checked');
    }
    store();
  },false)
  
  function store() {
    window.localStorage.myitems = list.innerHTML;
  }
  
  function getValues() {
    var storedValues = window.localStorage.myitems;
    if(!storedValues) {
      list.innerHTML = '<li>First book</li>';
    }
    else {
      list.innerHTML = storedValues;
    }
  }
  getValues();
})();
//stores all book objects
let myLibrary = [];

//global DOM variables
const bookListTable = document.getElementById('bookList');
const newBookForm = document.getElementById('newBookForm');

//event listeners
newBookForm.addEventListener('submit', addBookToMyLibrary);

//book object constructor function
function Book(title, author = 'unknown author', pages, status = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}
//Book prototype object method to be shared with all Book objects
//turns read-status boolean into user-friendly message
Book.prototype.info = function() {
  let readStatus = 'not read yet';
  if (this.status) {
    readStatus = 'read'
  }
  return readStatus;
}

//method to toggle read status of a book object
Book.prototype.readStatus = function() {
  if (this.status === true) {
    this.status = false;
  } else {
    this.status = true;
  }
}

//saves myLibrary to local storage
function lookForLocalStorage() {
  if (!localStorage.getItem('myLibrary')) {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  } else {
      myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
}

//function that runs after form submit and adds book to myLibrary array
function addBookToMyLibrary(e) {
  e.preventDefault();
  //get form data
  const bookTitleInput = document.querySelector('#bookTitleInput');
  const bookAuthorInput = document.querySelector('#bookAuthorInput');
  const bookPagesInput = document.querySelector('#bookPagesInput');
  //logic to figure out which radio button is clicked for read status
  const bookStatusInput = document.querySelectorAll('input[name="status"]');
  let status = false;
  if(bookStatusInput[0].checked === true) {
    status = true;
  }
  //end get form data

  //create new Book object with constructor Book()
  const newBook = new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, status);
  //push object to myLibrary array
  myLibrary.push(newBook);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

  //get array index val of new book for data-id val in DOM
  const index = myLibrary.length - 1;
  //add new book to table
  addBookToTable(newBook, index);
  //clear out form for another entry
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  bookPagesInput.value = '';
  bookStatusInput[0].checked = false;
  bookStatusInput[1].checked = false;
}

//this function should populate the list of books on page load or after deleting a book
function populateBookList() {
  //clear out book list if not the first load
  if (bookListTable != undefined) {
    bookListTable.innerHTML = '';
  }
  //iterate through array and add book to table
  //index is used as data value for table row of book for id
  myLibrary.forEach((book, index) => {
    addBookToTable(book, index);
  });
}

function addBookToTable(book, index) {
  console.log(book);

  //create table row for book set data attribute of tr to array index value of book
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('data-id', index);
  //create table data elements for title, author, # of pages, status
  const titleTd = document.createElement('td');
  const authorTd = document.createElement('td');
  const pagesTd = document.createElement('td');
  const statusTd = document.createElement('td');
  const deleteTd = document.createElement('td');
  //create toggle read status button
  const toggleReadButton = document.createElement('button');
  toggleReadButton.addEventListener('click', changeReadStatus);
  toggleReadButton.textContent = book.info();
  toggleReadButton.classList.add('read-status');
  //create delete button for book
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteBook);

  //populate table data with book info
  titleTd.textContent = book.title;
  authorTd.textContent = book.author;
  pagesTd.textContent = book.pages;
  statusTd.appendChild(toggleReadButton);
  deleteTd.appendChild(deleteButton);
  //append table data to row, then append row to table
  tableRow.append(titleTd, authorTd, pagesTd, statusTd, deleteTd);
  bookListTable.appendChild(tableRow);  
}

function changeReadStatus(e) {
  //get get data-id of <tr> book by traversing DOM
  const id = e.target.parentElement.parentElement.getAttribute('data-id');
  const book = myLibrary[id];
  // run read status method to change status
  book.readStatus();
  // //update button text
  e.target.textContent = book.info();
}

function deleteBook(e) {
  //get get data-id of <tr> book by traversing DOM
  const tr = e.target.parentElement.parentElement;
  const id = tr.getAttribute('data-id');
  // remove object from array
  myLibrary.splice(id, 1);
  //remove table row from dom
  populateBookList();
}

//run functions on initial page load
lookForLocalStorage();
populateBookList();


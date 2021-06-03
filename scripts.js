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
  //add new book to table
  addBookToTable(newBook);
  //clear out form for another entry
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  bookPagesInput.value = '';
  bookStatusInput[0].checked = false;
  bookStatusInput[1].checked = false;
}

//this function should populate the list of books on page load. makes sense to have this if there is persistant data of some type. otherwise it would not do anything if data goes away on page exit.
function populateBookList() {
  //iterate through array and add book to table
  //index is used as data value for table row of book for id
  myLibrary.forEach((book, index) => {
    addBookToTable(book, index);
  });
}

function addBookToTable(book, index) {
  //create table row for book set data attribute of tr to array index value of book
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('data-id', index);
  //create table data elements for title, author, # of pages, status
  const titleTd = document.createElement('td');
  const authorTd = document.createElement('td');
  const pagesTd = document.createElement('td');
  const statusTd = document.createElement('td');
  const deleteTd = document.createElement('td');
  //create toggle read status and delete buttons for book
  const toggleReadButton = document.createElement('button');
  toggleReadButton.addEventListener('click', changeReadStatus);
  const deleteButton = document.createElement('button');
  toggleReadButton.textContent = book.info();
  toggleReadButton.classList.add('read-status');
  deleteButton.textContent = 'Delete';
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
  //get get title of book by traversing DOM
  const title = e.target.parentElement.parentElement.firstElementChild.textContent;
  //filter array down to array with matching book title
  const filteredBookArray = myLibrary.filter(book => book.title === title);
  // run read status method to change status
  filteredBookArray[0].readStatus();
  //update button text
  e.target.textContent = filteredBookArray[0].info();
}

//add book to test app before user interface is complete
const bookTest = new Book('tar and Peace', 'Leo Tolstoy', 1225, false);
myLibrary.push(bookTest);
const bookTest2 = new Book('zar and Peace', 'Leo Tolstoy', 1225, false);
myLibrary.push(bookTest2);
const bookTest3 = new Book('bar and Peace', 'Leo Tolstoy', 1225, false);
myLibrary.push(bookTest3);
const bookTest4 = new Book('far and Peace', 'Leo Tolstoy', 1225, false);
myLibrary.push(bookTest4);


populateBookList();


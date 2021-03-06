//stores all book objects
let myLibrary = [];

//check local storage
if(!localStorage.getItem('library')) {
  addToLocalStorage();
} else {
  pullFromLocalStorage();
}

//global DOM variables
const bookListTable = document.getElementById('bookList');
const newBookForm = document.getElementById('newBookForm');
const totalBooks = document.getElementById('totalBooks');
const totalRead = document.getElementById('totalRead');
const totalUnread = document.getElementById('totalUnread');

//submit form event listener
newBookForm.addEventListener('submit', addBookToMyLibrary);

//FUNCTIONS

//book object constructor function
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}
//Book prototype object method to be shared with all Book objects
//turns read-status boolean into user-friendly message
Book.prototype.info = function() {
  let readStatus = 'Unread';
  if (this.status) {
    readStatus = 'Read'
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
  //radio button for read/unread
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
  //save library to local storage
  addToLocalStorage();
  //update totals in header
  bookTotals();

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
  toggleReadButton.textContent = Book.prototype.info.call(book);
  //set button color based on read status
  setButtonColor(toggleReadButton);
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
  Book.prototype.readStatus.call(book);
  // //update button text
  e.target.textContent = Book.prototype.info.call(book);
  //set button color
  setButtonColor(e.target);
  //save to local storage
  addToLocalStorage();
  //update totals in header
  bookTotals();
}

function setButtonColor(button) {
  //set button color
  if (button.textContent === 'Unread') {
    button.classList.add('read-status-button');
  } else {
    button.classList.remove('read-status-button');
  }
}

function deleteBook(e) {
  //get get data-id of <tr> book by traversing DOM
  const tr = e.target.parentElement.parentElement;
  const id = tr.getAttribute('data-id');
  // remove object from array
  myLibrary.splice(id, 1);
  // save to local storage
  addToLocalStorage();
  //update totals in header
  bookTotals();
  //remove table row from dom
  populateBookList();
}

function addToLocalStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function pullFromLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('library'));
}

function bookTotals() {
  //book totals in object
  const totals = {
    total: myLibrary.length,
    read: myLibrary.filter(function(book) {
      if (book.status === true) {
        return true;
      }
    }).length,
    unread: myLibrary.filter(function(book) {
      if (book.status === false) {
        return true;
      }
    }).length
  }
  //update dom with totals
  totalBooks.textContent = totals.total;
  totalRead.textContent = totals.read;
  totalUnread.textContent = totals.unread;
}

//run functions on initial page load
bookTotals();
populateBookList();


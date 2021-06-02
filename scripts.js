//stores all book objects
let myLibrary = [];

//global DOM variables
const bookListTable = document.getElementById('bookList');
const newBookForm = document.getElementById('newBookForm');

//event listeners
newBookForm.addEventListener('submit', addBookToMyLibrary);
bookListTable.addEventListener('click', changeReadStatus);

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
Book.prototype.read = function() {
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
  console.log(bookTitleInput);

  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  bookPagesInput.value = '';
  bookStatusInput[0].checked = false;
  bookStatusInput[1].checked = false;
}

//this function should populate the list of books on page load. makes sense to have this if there is persistant data of some type. otherwise it would not do anything if data goes away on page exit.
function populateBookList() {
  //iterate through array and update the DOM
  myLibrary.forEach(book => {
    addBookToTable(book);
  });
}

function addBookToTable(book) {
      //create table row for book
      const tableRow = document.createElement('tr');
      //create table data elements for title, author, # of pages, status
      const titleTd = document.createElement('td');
      const authorTd = document.createElement('td');
      const pagesTd = document.createElement('td');
      const statusTd = document.createElement('td');
      const deleteTd = document.createElement('td');
      //create toggle read status and delete buttons for book
      const toggleReadButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      toggleReadButton.textContent = book.info();
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
  if (e.target.textContent === "not read yet") {
    console.log(e);
  }
}

//add book to test app before user interface is complete
const bookTest = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
myLibrary.push(bookTest);
const bookTest2 = new Book('Wuthering Heights', 'Emily Bronte', 450, true);
myLibrary.push(bookTest2);

populateBookList();


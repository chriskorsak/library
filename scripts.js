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
Book.prototype.info = function() {
  let readStatus = 'not read yet';
  if (this.status) {
    readStatus = 'read'
  }
  return readStatus;
}

//function that runs after form submit and adds book to myLibrary array
function addBookToMyLibrary(e) {
  e.preventDefault();
  //get form data
  const bookTitleInput = document.querySelector('#bookTitleInput').value;
  const bookAuthorInput = document.querySelector('#bookAuthorInput').value;
  const bookPagesInput = document.querySelector('#bookPagesInput').value;
  const bookStatusInput = document.querySelectorAll('input[name="status"]');
  let status = false;
  if(bookStatusInput[0].checked === true) {
    status = true;
  }
  //create new Book object with constructor Book()
  const newBook = new Book(bookTitleInput, bookAuthorInput, bookPagesInput, status);
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
      //assign object proerty values to node text content
      titleTd.textContent = book.title;
      authorTd.textContent = book.author;
      pagesTd.textContent = book.pages;
      statusTd.textContent = book.info();
      //append table data to row, then append row to table
      tableRow.append(titleTd, authorTd, pagesTd, statusTd);
      bookListTable.appendChild(tableRow);  
}

//add book to test app before user interface is complete
const bookTest = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
myLibrary.push(bookTest);
const bookTest2 = new Book('Wuthering Heights', 'Emily Bronte', 450, false);
myLibrary.push(bookTest2);

populateBookList();


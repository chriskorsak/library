//stores all book objects
let myLibrary = [];

//global DOM variables
const bookListTable = document.getElementById('bookList');

//book object constructor function
//this creates a 'book' object that has title, author, pages, and read status (boolean) keys.
//two of the parameters have default values if none are specified

//to use this constructor function:
  // const myBook = new Book('Book Title', 'Book author', 245, true);
  // console.log(myBook.info());

function Book(title, author = 'unknown author', pages, status = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

//this creates a method on the prototype object of Book, so each instance object created with the constructor function (above) is referencing the same method, it's not copied each time when you create an object.

Book.prototype.info = function() {
  let readStatus = 'not read yet';
  if (this.status) {
    readStatus = 'read'
  }
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
}

function addBookToMyLibrary() {
  //get form data
  //create new Book object with constructor Book()
  //push object to myLibrary array
  //run populateBookList()
  //clear out form for another entry
}

//add book to test app before user interface is complete
const bookTest = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
myLibrary.push(bookTest);

//this function should populate the list of books on page load. makes sense to have this if there is persistant data of some type. otherwise it would not do anything if data goes away on page exit.
function populateBookList() {
  //iterate through array
  myLibrary.forEach(book => {
    //create table row
    const tableRow = document.createElement('tr');
    //create table data
    const tableData = document.createElement('td');
    tableData.textContent = book;
    tableRow.appendChild(tableData);
    bookListTable.appendChild(tableRow);
  });
  //and update the DOM 
}

populateBookList();


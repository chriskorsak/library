//book object constructor function
//this creates a 'book' object that has title, author, pages, and read status (boolean) keys.
//it also has an .info() method that outputs all info in a readable format
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
let myLibrary = [];

function Book (title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = () => {
  this.isRead = !this.isRead;
  refreshLibrary();
}

function addBookToLibrary (title, author, pages, isRead = false) {
  let book = new Book (title, author, pages, isRead);
  myLibrary.push(book);
  refreshLibrary();
}

function refreshLibrary () {

}

function makeStatistics () {

}

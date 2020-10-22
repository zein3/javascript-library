let myLibrary = [];

function Book (title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = () => {
  this.isRead = !this.isRead;
}

function addBookToLibrary (title, author, pages, isRead = false) {
  let book = new Book (title, author, pages, isRead);
  myLibrary.push(book);
  refreshLibrary();
}

function refreshLibrary () {

}

let lib = document.querySelector('#library');
for (let i = 1; i <= 20; i++) {
  lib.innerHTML += `<div class="card">
                      <h3 class="card-header">Title</h3>
                      <p class="card-subheader">Author</p>
                      <p class="card-subheader">X pages long</p>
                    </div>`;
}
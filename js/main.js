let myLibrary = [];
let library = document.querySelector('#library');

function Book (title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.toggleRead = () => {
    this.isRead = !this.isRead;
    refreshLibrary();
  }
}

function addBookToLibrary (title, author, pages, isRead = false) {
  let book = new Book (title, author, pages, isRead);
  myLibrary.push(book);
  refreshLibrary();
}

function removeBookFromLibrary (index) {
  myLibrary.splice(index, 1);
  refreshLibrary();
}

function refreshLibrary () {
  emptyLibrary();

  // Add each book to library
  myLibrary.forEach ((book, i) => {
    let title = book.title;
    let author = book.author;
    let pages = (book.pages > 0) ? `${book.pages} pages long` : 'Unknown';
    let isRead = (book.isRead) ? 'Read' : 'Not Read';

    let parent = document.createElement('div');
    parent.classList.add('card');

    let isReadText = makeElement(isRead);
    let toggleReadBtn = makeElement((book.isRead) ? 'Unread' : 'Read', 'button', 'btn-small');
    onClick(toggleReadBtn, book.toggleRead);
    isReadText.appendChild(toggleReadBtn);

    let deleteBtn = makeElement('Delete', 'button', 'btn');
    deleteBtn.classList.add('btn-card');
    onClick(deleteBtn, () => removeBookFromLibrary(i));

    let cardText = [makeElement(title, 'h3', 'card-header'),
                    makeElement(author),
                    makeElement(pages),
                    isReadText,
                    deleteBtn];

    cardText.forEach ((c) => {
      parent.appendChild(c);
    })

    library.appendChild(parent);
  })

  loadPlusCard();

  makeStatistics();
}

function makeStatistics () {
  let totalBooks = 0;
  let totalBooksRead = 0;
  let totalPages = 0;
  let totalPagesRead = 0;

  myLibrary.forEach ((book) => {
    let pages = (book.pages > 0) ? book.pages : 0;

    if (book.isRead) {
      totalBooksRead++;
      totalPagesRead += pages;
    }

    totalBooks++;
    totalPages += pages;
  })

  document.querySelector('#totalBooks').textContent = totalBooks;
  document.querySelector('#totalBooksRead').textContent = totalBooksRead;
  document.querySelector('#totalPages').textContent = totalPages;
  document.querySelector('#totalPagesRead').textContent = totalPagesRead;
}

function makeElement (text, elem = 'p', class_ = 'card-text') {
  let cardText = document.createElement(elem);
  cardText.classList.add(class_);
  cardText.textContent = text;
  return cardText
}

function onClick (element, func) {
  element.addEventListener('click', func);
  element.addEventListener('touchStart', func);
}

function loadPlusCard () {
  let plus = document.createElement('h1');
  plus.textContent = '+';
  plus.classList.add('disable-select');

  let card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card-add');
  onClick(card, openModal);
  card.appendChild(plus);
  library.appendChild(card);
}

function emptyLibrary () {
  if (library.firstChild !== null) {
    library.removeChild(library.firstChild);
    emptyLibrary();
  }
}

addBookToLibrary('a', 'a', 245, false);
addBookToLibrary('b', 'b', 500, false);
addBookToLibrary('c', 'c', -214, false);
refreshLibrary();

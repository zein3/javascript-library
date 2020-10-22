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

function refreshLibrary () {
  emptyLibrary();

  myLibrary.forEach ((book) => {
    let title = book.title;
    let author = book.author;
    let pages = (book.pages > 0) ? `${book.pages} pages long` : 'Unknown';
    let isRead = (book.isRead) ? 'Read' : 'Not Read';

    let parent = document.createElement('div');
    parent.classList.add('card');

    let isReadText = makeCardText(isRead);
    let toggleReadBtn = makeCardText((book.isRead) ? 'Unread' : 'Read', 'button', 'btn-small');
    toggleReadBtn.addEventListener('click', book.toggleRead);
    isReadText.appendChild(toggleReadBtn);

    let cardText = [makeCardText(title, 'h3', 'card-header'),
                    makeCardText(author),
                    makeCardText(pages),
                    isReadText];
    cardText.forEach ((c) => {
      parent.appendChild(c);
    })

    library.appendChild(parent);
  })

  loadPlusCard();

  makeStatistics();
}

function makeStatistics () {

}

function makeCardText (text, elem = 'p', class_ = 'card-text') {
  let cardText = document.createElement(elem);
  cardText.classList.add(class_);
  cardText.textContent = text;
  return cardText
}

function loadPlusCard () {
  let plus = document.createElement('h1');
  plus.textContent = '+';
  plus.classList.add('disable-select');

  let card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card-add');
  card.addEventListener('click', openModal);
  card.appendChild(plus);
  library.appendChild(card);
}

function emptyLibrary () {
  if (library.firstChild !== null) {
    library.removeChild(library.firstChild);
    emptyLibrary();
  }
}

refreshLibrary();

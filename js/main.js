let myLibrary = [];
let library = document.querySelector('#library');
onClick(document.querySelector('#insertBookBtn'), addToLibraryButton);
onClick(document.querySelector('#deleteStorageBtn'), () => {
  if (storageAvailable('localStorage')) {
    localStorage.clear();
    myLibrary = [];
    refreshLibrary();
  }
})

class Book {
  constructor (title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleRead = () => {
    this.isRead = !this.isRead;
    saveLibrary();
    refreshLibrary();
  }
}

function addBookToLibrary (title, author, pages, isRead = false) {
  let book = new Book (title, author, pages, isRead);
  myLibrary.push(book);
  refreshLibrary();
}

function addToLibraryButton () {
  let inputs = [];
  document.querySelectorAll('.input-book').forEach ((inp) => {
    inputs.push(inp.value);
  })
  if (inputs[0] === '' || inputs[1] === '' || inputs[2] === '') {
    return;
  }

  addBookToLibrary(inputs[0], inputs[1], inputs[2], (inputs[3] == 'true'));
  saveLibrary();
  closeModal();
}

function removeBookFromLibrary (index) {
  myLibrary.splice(index, 1);
  saveLibrary();
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
    let pages = (book.pages > 0) ? parseInt(book.pages) : 0;

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

function storageAvailable (type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

function saveLibrary () {
  if (storageAvailable('localStorage')) {
    let storage = localStorage;
    storage.clear();
    myLibrary.forEach ((book, i) => {
      let bookStringified = JSON.stringify(book)
      storage.setItem(i, bookStringified);
    })
  }
}

function loadLibrary () {
  if (storageAvailable('localStorage')) {
    let storage = localStorage;
    if (storage.length > 0) {
      myLibrary = [];
      for (let i = 0; i < storage.length; i++) {
        let newBook = JSON.parse(storage.getItem(i));
        addBookToLibrary(newBook.title, newBook.author, newBook.pages, newBook.isRead);
      }
    }
  }
}

loadLibrary();
refreshLibrary();

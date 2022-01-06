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

function emptyLibrary () {
  if (library.firstChild !== null) {
    library.removeChild(library.firstChild);
    emptyLibrary();
  }
}


loadLibrary();
refreshLibrary();

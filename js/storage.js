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

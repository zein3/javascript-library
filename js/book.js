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

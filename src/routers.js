const { BookShelf } = require('./Book');

const bookShelf = new BookShelf();

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: (req, h) => bookShelf.getBooks(req, h),
  },
  {
    method: 'POST',
    path: '/books',
    handler: (req, h) => bookShelf.addBook(req, h),
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: (req, h) => bookShelf.getBook(req, h),
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: (req, h) => bookShelf.editBook(req, h),
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: (req, h) => bookShelf.deleteBook(req, h),
  },
];

module.exports = { routes };

/* eslint-disable no-multi-assign */
/* eslint-disable no-prototype-builtins */
const nanoid = require('nanoid');
const { Validator } = require('./util/Validator');

class BookShelf {
  #books = [];

  /**
   *
   * @param {import("hapi").Request} req
   * @param {import("hapi").ResponseToolkit} h
   */
  addBook(req, h) {
    const body = req.payload;

    const validator = new Validator({
      name: 'string',
      year: 'number',
      author: 'string',
      summary: 'string',
      publisher: 'string',
      pageCount: 'number',
      readPage: 'number',
      reading: 'boolean',
    }, {
      readPage: (r) => {
        if (r.readPage > r.pageCount) {
          return 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
        }

        return true;
      },
    });

    const generalErrorResponse = {
      status: 'error',
      message: 'Buku gagal ditambahkan',
    };

    if (!body.hasOwnProperty('name')) {
      return h.response({
        status: 'error',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400);
    }

    const validationResult = validator.validate(body);
    if (validationResult !== true) {
      if (validationResult === false) {
        return h.response(generalErrorResponse).code(500);
      }

      return h.response({
        status: 'error',
        message: validationResult,
      }).code(400);
    }

    const newBook = { ...body };
    newBook.id = nanoid.nanoid();
    newBook.finished = false;
    newBook.updatedAt = newBook.insertedAt = new Date().toISOString();

    this.#books.push(newBook);

    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    }).code(201);
  }

  /**
   *
   * @param {import("hapi").Request} req
   * @param {import("hapi").ResponseToolkit} h
   */
  getBooks(req, h) {
    return h.response({
      status: 'success',
      data: {
        books: this.#books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }

  /**
   *
   * @param {import("hapi").Request} req
   * @param {import("hapi").ResponseToolkit} h
   */
  getBook(req, h) {
    const { bookId } = req.params;
    const book = this.#books.find((val) => val.id === bookId);

    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      }).code(404);
    }

    return h.response({
      status: 'success',
      data: {
        book,
      },
    });
  }

  /**
   *
   * @param {import("hapi").Request} req
   * @param {import("hapi").ResponseToolkit} h
   */
  editBook(req, h) {
    const { bookId } = req.params;
    const book = this.#books.find((val) => val.id === bookId);

    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      }).code(404);
    }

    const body = req.payload;

    const validator = new Validator({
      name: 'string',
      year: 'number',
      author: 'string',
      summary: 'string',
      publisher: 'string',
      pageCount: 'number',
      readPage: 'number',
      reading: 'boolean',
    }, {
      readPage: (r) => {
        if (r.readPage > r.pageCount) {
          return 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
        }

        return true;
      },
    });

    const generalErrorResponse = {
      status: 'error',
      message: 'Buku gagal diperbarui',
    };

    if (!body.hasOwnProperty('name')) {
      return h.response({
        status: 'error',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }

    const validationResult = validator.validate(body);
    if (validationResult !== true) {
      if (validationResult === false) {
        return h.response(generalErrorResponse).code(500);
      }

      return h.response({
        status: 'error',
        message: validationResult,
      }).code(400);
    }

    Object.assign(book, body);

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  /**
   *
   * @param {import("hapi").Request} req
   * @param {import("hapi").ResponseToolkit} h
   */
  deleteBook(req, h) {
    const { bookId } = req.params;
    let index = null;
    const book = this.#books.find((val, idx) => {
      const thisOne = (val.id === bookId);
      if (thisOne) {
        index = idx;
      }

      return thisOne;
    });

    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      }).code(404);
    }

    this.#books.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }
}

module.exports = { BookShelf };

const { validateBook } = require("./validate");
const { nanoid } = require("nanoid");
const bookshelf = require("./bookshelf");

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookshelf.push(newBook);

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: bookshelf,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(400);
  return response;
};

const getBookshelf = (request, h) => {
  const { error, value } = validateBook.validate(request.query);

  if (error) {
    const response = h.response({
      status: "fail",
      message: error.details[0].message,
    });

    response.code(400);
    return response;
  }

  const { name, reading, finished } = value;

  let filteredBooks = bookshelf;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  if (reading !== undefined) {
    const isReading = Boolean(reading);
    filteredBooks = filteredBooks.filter((book) => {
      return book.reading === isReading;
    });
  }

  if (finished !== undefined) {
    const isFinished = Boolean(finished);
    filteredBooks = filteredBooks.filter((book) => {
      return book.finished === isFinished;
    });
  }

  if (filteredBooks.length > 0) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: bookshelf,
      },
    });

    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Data tidak ditemukan",
    });

    response.code(400);
    return response;
  }
};

const getBookById = (request, h) => {
  const { bookId } = request.params;

  const book = bookshelf.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};

const updateBookById = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = bookshelf.findIndex((book) => book.id === bookId);

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  if (index !== -1) {
    const finished = pageCount === readPage;

    bookshelf[index] = {
      ...bookshelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    bookshelf.splice(bookIndex, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getBookshelf,
  getBookById,
  updateBookById,
  deleteBookById,
};

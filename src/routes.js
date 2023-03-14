const {
  addBook,
  getBookshelf,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("./handler");
const { validateBook } = require("./validate");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
    options: {
      validate: {
        payload: validateBook,
        failAction: (request, h, err) => {
          throw err;
        },
        options: {
          stripUnknown: true,
        },
      },
    },
  },
  {
    method: "GET",
    path: "/books",
    handler: getBookshelf,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },

  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookById,
    options: {
      validate: {
        payload: validateBook,
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookById,
  },
];

module.exports = routes;

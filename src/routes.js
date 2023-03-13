const {
  addBook,
  getBookshelf,
  getBookById,
  updateBookById,
} = require("./handler");
const { validateBook } = require("./validate");

const routes = [
  {
    method: "POST",
    path: "/bookshelf",
    handler: addBook,
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
    method: "GET",
    path: "/bookshelf",
    handler: getBookshelf,
  },
  {
    method: "GET",
    path: "/book/{id}",
    handler: getBookById,
  },

  {
    method: "PUT",
    path: "/updateBook/{id}",
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
];

module.exports = routes;

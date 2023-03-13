const { addBook } = require("./handler");
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
];

module.exports = routes;

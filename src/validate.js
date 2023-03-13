const Joi = require("@hapi/joi");

const validateBook = Joi.object({
  name: Joi.string(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number().integer(),
  readPage: Joi.number().integer(),
  finished: Joi.boolean(),
  reading: Joi.boolean(),
});

module.exports = { validateBook };

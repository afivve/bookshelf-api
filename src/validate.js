const Joi = require("@hapi/joi");

const validateBook = Joi.object({
  name: Joi.string().allow(null, ""),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .allow()
    .optional(),
  author: Joi.string().allow(null, ""),
  summary: Joi.string().allow(null, ""),
  publisher: Joi.string().allow(null, ""),
  pageCount: Joi.number().integer().allow(null),
  readPage: Joi.number().integer().allow(null),
  finished: Joi.boolean().allow(null),
  reading: Joi.boolean().allow(null),
});

module.exports = { validateBook };

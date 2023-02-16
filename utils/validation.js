const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  authorName: Joi.string().required().messages({
    "string.empty": "Author name is required",
    "any.required": "Author name is required",
  }),
  isbn: Joi.string().required().messages({
    "string.empty": "ISBN is required",
    "any.required": "ISBN is required",
  }),
  genre: Joi.string().optional(),
  description: Joi.string().optional(),
  quantity: Joi.number().optional(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().optional(),
  authorName: Joi.string().optional(),
  isbn: Joi.string().optional(),
  genre: Joi.string().optional(),
  description: Joi.string().optional(),
  quantity: Joi.number().optional(),
});

module.exports = {
  createBookSchema,
  updateBookSchema,
};

const { Books } = require("../models/index,js");
const { createBookSchema } = require("../utils/validation");

async function createBook(book) {
  try {
    const valiadateBook = await createBookSchema.validateAsync(book);
    const newBook = await Books.create(valiadateBook);
    return newBook;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createBook,
};

const { Books } = require("../models/index,js");
const { createBookSchema, updateBookSchema } = require("../utils/validation");

async function createBook(book) {
  try {
    const valiadateBook = await createBookSchema.validateAsync(book);
    const newBook = await Books.create(valiadateBook);
    return newBook;
  } catch (error) {
    throw new Error(error);
  }
}

async function getBooks(limit, offset) {
  try {
    const books = await Books.findAll({
      limit,
      offset,
    });
    return books;
  } catch (error) {
    throw new Error(error);
  }
}

async function getBookById(id) {
  try {
    const book = await Books.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateBook(id, data) {
  try {
    const book = await Books.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }
    await updateBookSchema.validateAsync(data);
    const { quantity, ...rest } = data;
    if (quantity) {
      await book.increment("quantity", { by: quantity });
    }
    await book.update(rest);
    return getBookById(id);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteBook(id) {
  try {
    const book = await Books.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }
    await book.destroy();
    return { message: "Book deleted" };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};

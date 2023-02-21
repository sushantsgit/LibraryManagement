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

async function getBooks(query) {
  try {
    let { limit, offset, sortBy, sortOrder } = query;
    limit = +limit || 10;
    offset = +offset || 0;
    sortBy = JSON.parse(sortBy) || [];
    sortOrder = JSON.parse(sortOrder) || [];
    const order = [];
    if (sortBy && sortOrder && sortBy.length === sortOrder.length) {
      for (let i = 0; i < sortBy.length; i++) {
        order.push([sortBy[i], sortOrder[i]]);
      }
    }
    console.log(order);
    const books = await Books.findAll({
      limit,
      offset,
      order,
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
    throw error;
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
    throw error;
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
    throw error;
  }
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};

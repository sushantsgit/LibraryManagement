import { Books } from "../models/index,js";
import { createBookSchema } from "../utils/validation";

export async function createBook(book) {
  try {
    await createBookSchema.validateAsync(book);
    const newBook = await Books.create(book);
    return newBook;
  } catch (error) {
    throw new Error(error);
  }
}

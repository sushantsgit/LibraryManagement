const { Router } = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("./module");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const book = req.body;
    res.status(201).send(await createBook(book));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { limit, offset } = req.query;
    res.status(200).send(await getBooks(limit, offset));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await getBookById(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    res.status(200).send(await updateBook(req.params.id, req.body));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    res.status(200).send(await deleteBook(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

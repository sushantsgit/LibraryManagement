const { Router } = require("express");
const { createBook } = require("./module");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const book = req.body;
    res.status(201).send(await createBook(book));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/", (req, res) => {
  try {
    const books = [
      {
        id: 1,
        title: "The Lord of the Rings",
        authorName: "J. R. R. Tolkien",
        isbn: "978-0544003415",
        genre: "Fantasy",
        publisher: "Mariner Books",
        publishDate: "1954-07-29",
        description:
          "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
      },
    ];
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const book = {
      id: req.params.id,
      title: "The Lord of the Rings",
      authorName: "J. R. R. Tolkien",
      isbn: "978-0544003415",
      genre: "Fantasy",
      publisher: "Mariner Books",
      publishDate: "1954-07-29",
      description:
        "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
    };
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/:id", (req, res) => {
  try {
    const book = req.body;
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/:id/delete", (req, res) => {
  try {
    const book = {
      id: req.params.id,
      title: "The Lord of the Rings",
      authorName: "J. R. R. Tolkien",
      isbn: "978-0544003415",
      genre: "Fantasy",
      publisher: "Mariner Books",
      publishDate: "1954-07-29",
      description:
        "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
    };
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

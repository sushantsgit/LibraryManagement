const supertest = require("supertest");
const { startDBServer, stopDBServer } = require("../utils/server");
const { generateRandomISBN } = require("../utils/helper");
const app = require("../../app");

describe("Books API", () => {
  const request = supertest(app);
  beforeAll(async () => {
    await startDBServer();
  });
  afterAll(async () => {
    await stopDBServer();
  });
  it("Test Book Creation API", async () => {
    const isbn = generateRandomISBN();
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn,
      description: "Test Description",
      quantity: 10,
      genre: "Test Category",
    });

    expect(status).toBe(201);
    expect(body).toBeDefined();
    expect(body.title).toBe("Test Book");
    expect(body.authorName).toBe("Test authorName");
    expect(body.isbn).toBe(isbn);
    expect(body.description).toBe("Test Description");
    expect(body.quantity).toBe(10);
    expect(body.genre).toEqual("Test Category");
  });

  it("Test List Book API", async () => {
    const isbn = generateRandomISBN();
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn,
      description: "Test Description",
      quantity: 10,
      genre: "Test Category",
    });

    expect(status).toBe(201);
    expect(body).toBeDefined();

    const { status: status1, body: data } = await request.get("/books");

    expect(status1).toBe(200);
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it("Test Get Book By ID API", async () => {
    const isbn = generateRandomISBN();
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn,
      description: "Test Description",
      quantity: 10,
      genre: "Test Category",
    });

    expect(status).toBe(201);
    expect(body).toBeDefined();

    const { status: status1, body: getBook } = await request.get(
      `/books/${body.id}`
    );

    expect(status1).toBe(200);
    expect(getBook).toBeDefined();
  });

  it("Test Update Book API", async () => {
    const isbn = generateRandomISBN();
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn,
      description: "Test Description",
      quantity: 10,
      genre: "Test Category",
    });

    expect(status).toBe(201);
    expect(body).toBeDefined();

    const { status: status1, body: updateBook } = await request
      .post(`/books/${body.id}`)
      .send({
        description: "Test Description Updated",
        quantity: 10,
      });

    expect(status1).toBe(200);
    expect(updateBook).toBeDefined();
  });

  it("Test Delete Book API", async () => {
    const isbn = generateRandomISBN();
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn,
      description: "Test Description",
      quantity: 10,
      genre: "Test Category",
    });

    expect(status).toBe(201);
    expect(body).toBeDefined();

    const { status: status1, body: deleteBook } = await request.post(
      `/books/${body.id}/delete`
    );

    expect(status1).toBe(200);
    expect(deleteBook).toBeDefined();
    expect(deleteBook.message).toBe("Book deleted");

    const { status: status2, body: getBook } = await request.get(
      `/books/${body.id}`
    );

    expect(status2).toBe(400);
    expect(getBook).toBeDefined();
  });
});

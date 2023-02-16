const supertest = require("supertest");
const { startDBServer, stopDBServer } = require("../utils/server");

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
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn: "1234567890",
      description: "Test Description",
      quantity: 10,
      genre: "Test Category",
    });

    expect(status).toBe(201);
    expect(body).toBeDefined();
    expect(body.title).toBe("Test Book");
    expect(body.authorName).toBe("Test authorName");
    expect(body.isbn).toBe("1234567890");
    expect(body.description).toBe("Test Description");
    expect(body.quantity).toBe(10);
    expect(body.genre).toEqual("Test Category");
  });

  it("Test List Book API", async () => {
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn: "1234567890",
      description: "Test Description",
      quantity: 10,
      genre: "Test Category",
    });

    expect(status).toBe(201);
    expect(body).toBeDefined();

    const { status: status1, body: getBook } = await request.get("/books");

    expect(status1).toBe(200);
    expect(getBook).toBeDefined();
    expect(getBook.length).toBeGreaterThan(0);
  });

  it("Test Get Book By ID API", async () => {
    const { status, body } = await request.post("/books").send({
      title: "Test Book",
      authorName: "Test authorName",
      isbn: "1234567890",
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
});

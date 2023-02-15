const supertest = require("supertest");
const app = require("../../app");

describe("Sample Test", () => {
  const request = supertest(app);
  it("should validate sample", async () => {
    const { status, body, text } = await request.get("/");
    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(text).toBeDefined();
  });
});

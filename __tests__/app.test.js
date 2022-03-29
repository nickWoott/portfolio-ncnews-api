const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

afterAll(() => {
  if (db.end) db.end();
});

beforeEach(() => seed(testData));

describe("GET/api/topics", () => {
  test("200, response with an object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test("200, provides an array of correct data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        const output = [
          {
            description: "The man, the Mitch, the legend",
            slug: "mitch",
          },
          {
            description: "Not dogs",
            slug: "cats",
          },
          {
            description: "what books are made of",
            slug: "paper",
          },
        ];
        expect(res.body).toEqual(output);
      });
  });
  test("400, throws error when endpoint incorrectly accessed", async () => {
    const results = await request(app).get("/api/topic").expect(400);
    expect(results.body.message).toBe("Bad Request");
  });
});

describe.only("GET/api/atircles/:article_id", () => {
  test("200, returns an object", async () => {
    const results = await request(app).get("/api/articles/1").expect(200);
    expect(typeof results.body).toBe("object");
  });
  test("200, returns a article object", async () => {
    const testArticle = {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
    };
    const results = await request(app).get("/api/articles/1").expect(200);
    expect(results.body).toEqual(testArticle);
  });
  test("400, throws error when endpoint not found", async () => {
    const results = await request(app).get("/api/artifiasdgfle").expect(404);
    expect(results.body.message).toBe("path not found");
  });
  test("404, throws not found error if endpoint does not exsist", async () => {
    const results = await request(app).get("/api/articles/27").expect(404);
    expect(results.body.msg).toBe("Article not found");
  });
});

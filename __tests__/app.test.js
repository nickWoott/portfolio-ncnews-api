const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const res = require("express/lib/response");

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

  test("404, throws error when endpoint not found", async () => {
    const results = await request(app).get("/api/topic").expect(404);
    expect(results.body.message).toBe("path not found");
  });
});

describe("GET/api/atircles/:article_id", () => {
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
      comment_count: expect.any(Number),
    };
    const results = await request(app).get("/api/articles/1").expect(200);
    expect(results.body).toEqual(testArticle);
  });
  test("404, throws error when endpoint not found", async () => {
    const results = await request(app).get("/api/artifiasdgfle").expect(404);
    expect(results.body.message).toBe("path not found");
  });
  test("404, throws not found error if endpoint does not exist", async () => {
    const results = await request(app).get("/api/articles/27").expect(404);
    expect(results.body.msg).toBe("Article not found");
  });
  test("200, comment_count added to response body", async () => {
    const results = await request(app).get("/api/articles/1").expect(200);
    const testArticle = {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
      comment_count: 11,
    };
    expect(results.body).toEqual(testArticle);
  });
});

describe("PATCH/api/articles/:article_id", () => {
  test("returns an object in as a response", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((results) => {
        expect(typeof results.body).toBe("object");
      });
  });
  test("returns an updated object", async () => {
    const results = await request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 5 })
      .expect(200);
    const output = {
      article_id: 2,
      title: "Sony Vaio; or, The Laptop",
      topic: "mitch",
      author: "icellusedkars",
      body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
      created_at: "2020-10-16T05:03:00.000Z",
      votes: 5,
    };
    expect(results.body).toEqual(output);
  });
  test("returns an error if update body is incorrect format", async () => {
    const results = await request(app)
      .patch("/api/articles/2")
      .send({ incvotes: "WRONG" });
    expect(400);
    expect(results.body.msg).toBe("Bad Request!");
  });
  test("404, throws error when endpoint not found", async () => {
    const results = await request(app).patch("/api/articlessss").expect(404);
    expect(results.body.message).toBe("path not found");
  });
  test("404, throws not found error if endpoint does not exsist", async () => {
    const results = await request(app)
      .patch("/api/articles/454323")
      .expect(404);
    expect(results.body.msg).toBe("Article not found");
  });
});

describe("GET/api/users", () => {
  test("200, responds with an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test("200, responds with an array of usernames", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const output = [
          { username: "butter_bridge" },
          { username: "icellusedkars" },
          { username: "rogersop" },
          { username: "lurker" },
        ];
        expect(res.body).toEqual(output);
      });
  });
  test("404, throws error when endpoint not found", async () => {
    const results = await request(app).get("/api/suer").expect(404);
    expect(results.body.message).toBe("path not found");
  });
});

describe("/api/articles", () => {
  test("200, response with an array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test("200: responds with updated comments", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body[0].comment_count).toEqual(11);
        expect(res.body[1].comment_count).toEqual(0);
      });
  });
  test("404 error response if path incorrect", () => {
    return request(app)
      .get("/api/atile")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("path not found");
      });
  });
});

describe.only("GET/api/articles/:article_id/comments", () => {
  test("200: returns an array", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test("200: returns an array with correct properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        res.body.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  test("404 article not found", () => {
    return request(app)
      .get("/api/articles/25/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article not found");
      });
  });
});

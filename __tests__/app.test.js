const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

afterAll(() => {
  if (db.end) db.end();
});

beforeEach(() => seed(testData));

describe.only("GET/api/topics", () => {
  test("200, response with an object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
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
  test("404, throws error when endpoint not found", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("end point not found");
      });
  });
});

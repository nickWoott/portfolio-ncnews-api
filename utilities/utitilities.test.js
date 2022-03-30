const {
  addCommentCount,
  returnUpdatedArticle,
} = require("../utilities/utilities.js");
const db = require("../db/connection");

describe.only("addCommentCount", () => {
  test("adds comment count to an article", () => {
    const input = {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
    };
    const output = {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
      comment_count: 11,
    };
    expect(returnUpdatedArticle(input)).toEqual(output);
  });
});

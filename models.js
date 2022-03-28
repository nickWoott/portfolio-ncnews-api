const res = require("express/lib/response");
const db = require("./db/connection");

exports.selectTopics = async () => {
  const results = await db.query("SELECT * FROM topics");
  return results.rows;
};

exports.selectArticle = async (articleId) => {
  const results = await db.query(
    "SELECT * FROM articles WHERE article_id = $1",
    [articleId]
  );
  console.log(results.rows);
  return results.rows[0];
};

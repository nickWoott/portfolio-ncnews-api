const db = require("./db/connection");

exports.selectTopics = async () => {
  const results = await db.query("SELECT * FROM topics");
  return results.rows;
};

exports.selectArticle = async (articleId) => {
  const results = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [articleId]
  );
  if (!results.rows.length) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  } else {
    return results.rows[0];
  }
};

exports.updateVotes = async (articleId, update) => {
  const results = await db.query(
    "SELECT * FROM articles WHERE article_id = $1",
    [articleId]
  );
  if (!results.rows.length) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  } else {
    results.rows[0].votes += update.inc_votes;
  }
  return results.rows[0];
};

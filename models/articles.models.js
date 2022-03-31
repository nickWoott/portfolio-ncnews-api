const db = require("../db/connection");

exports.selectArticle = async (articleId) => {
  const article = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [articleId]
  );
  const comments = await db.query("SELECT * FROM comments");
  let commentCount = 0;
  comments.rows.forEach((comment) => {
    if (comment.article_id == articleId) {
      commentCount++;
    }
  });
  if (!article.rows.length) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  } else {
    article.rows[0].comment_count = commentCount;
    return article.rows[0];
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

exports.selectArticles = async (
  sortQuery = "created_at",
  orderQuery = "ASC"
) => {
  let queryString = `SELECT articles.*, COUNT(comments.article_id)::INT AS comment_count
  FROM articles 
  LEFT JOIN comments ON comments.article_id = articles.article_id`; //WHERE goes after the join  >>  groupby   >>  orderby

  queryString += ` GROUP BY articles.article_id`;

  queryString += ` ORDER BY ${sortQuery} ${orderQuery}`;

  const response = await db.query(queryString);

  console.log(response.rows);
  return response.rows;
};

exports.selectComments = async (articleId) => {
  const comments = await db.query(
    "SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;",
    [articleId]
  );
  if (!comments.rows.length) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  } else {
    return comments.rows;
  }
};

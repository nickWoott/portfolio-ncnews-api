const db = require("../db/connection");

exports.selectArticle = async (articleId) => {
  const article = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [articleId]
  );
  const comments = await db.query("SELECT * FROM comments");
  let commentCount = 0;
  comments.rows.forEach((comment) => {
    console.log(comment, "<<< here is each individual comment");
    console.log(comment.article_id, "here is the property");
    console.log(articleId, "<<, this is what we are comparing it to");
    console.log(commentCount, "<< watch as the comment count increases");
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

// const db = require("../db/connection");

// exports.addCommentCount = (article) => {
//   db.query("SELECT * FROM comments;").then((comments) => {
//     let commentCount = 0;
//     comments.rows.forEach((comment) => {
//       if (comment.article_id == article.article_id) commentCount++;
//     });
//     article.comment_count = commentCount;
//     return article;
//   });
// };

// exports.returnUpdatedArticle = (article) => {
//   addCommentCount(article).then((results) => {
//     return results;
//   });
// };

// getComments = async () => {
//   const comments = await db.query("SELECT * FROM comments;");
//   return comments.rows;
// };

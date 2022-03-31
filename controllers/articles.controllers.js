const app = require("../app");
const {
  selectArticle,
  updateVotes,
  selectArticles,
  selectComments,
  insertComment,
} = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  selectArticle(articleId)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
};

exports.increaseVotes = (req, res, next) => {
  articleId = req.params.article_id;
  update = req.body;
  updateVotes(articleId, update)
    .then((article) => {
      if (typeof update.inc_votes !== "number" || !update.inc_votes) {
        return Promise.reject({ status: 400, msg: "Bad Request!" });
      } else {
        res.status(200).send(article);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const articleId = req.params.article_id;
  selectComments(articleId)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const update = req.body;
  insertComment(article_id, update)
    .then((newComment) => {
      console.log(newComment.rows[0], "<<< updated comment");
      res.status(200).send(newComment.rows[0]);
    })
    .catch((err) => {
      next(err);
    });
};

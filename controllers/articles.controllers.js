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
  const { inc_votes } = req.body;

  updateVotes(articleId, inc_votes)
    .then((article) => {
      if (typeof inc_votes !== "number" || !inc_votes) {
        return Promise.reject({ status: 400, msg: "Bad Request!" });
      } else {
        res.status(200).send(article);
      }
    })
    .catch((err) => {
      next(err);
    });
};
//all promises rejects need to be in the model

exports.getArticles = (req, res, next) => {
  const orderQuery = req.query.order;
  const sortQuery = req.query.sort_by;
  const topicQuery = req.query.topic;
  selectArticles(sortQuery, orderQuery, topicQuery)
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
      res.status(201).send(newComment.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

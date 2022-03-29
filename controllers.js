const app = require("./app");
const { selectTopics, selectArticle, updateVotes } = require("./models");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch((err) => {
      next(err);
    });
};

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
  console.log(update, "<<< here is the update");
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

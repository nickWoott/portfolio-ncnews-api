const app = require("./app");
const { selectTopics, selectArticle, updateVotes } = require("./models");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      console.log(topics, " in the controller");
      res.status(200).send(topics);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  articleId = req.params.article_id;
  console.log(articleId);
  selectArticle(articleId)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.increaseVotes = (req, res, next) => {
  articleId = req.params.article_id;
  update = req.body;
  updateVotes(articleId, update)
    .then((article) => {
      console.log(article, "<< the updated article in the controller");
      res.status(200).send(article);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

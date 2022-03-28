const app = require("./app");
const { selectTopics } = require("./topics.models");

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

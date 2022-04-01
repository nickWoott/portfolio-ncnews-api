const res = require("express/lib/response");
const app = require("../app");
const { removeComment } = require("../models/comments.models");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send({ msg: "No Content" });
    })
    .catch((err) => {
      next(err);
    });
};

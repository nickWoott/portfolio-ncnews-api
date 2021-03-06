const express = require("express");
const cors = require("cors");
const { application_name } = require("pg/lib/defaults");
const {
  getArticles,
  getArticleById,
  increaseVotes,
  getComments,
  postComment,
} = require("./controllers/articles.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const { getUsers } = require("./controllers/users.controllers");
const { deleteComment } = require("./controllers/comments.controllers");
const { getEndpoints } = require("./controllers/api.controllers");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", increaseVotes);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api", getEndpoints);

//below is error handling
app.use((req, res, next) => {
  res.status(404).send({ message: "path not found" });
});

//alternative error handler to try later
// app.all("/*", (req, res, next) => {
//   res.status(404).send({ msg: "path not found" });
// });

app.use((err, req, res, next) => {
  //custom error handler
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  //psql error handling
  if (err.code === "22P02" || err.code === "42703" || err.code === "23502") {
    res.status(400).send({ message: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "article not found" });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
});
module.exports = app;

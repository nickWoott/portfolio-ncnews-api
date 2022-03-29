const express = require("express");
const { getTopics, getArticleById, increaseVotes } = require("./controllers");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);


app.patch("/api/articles/:article_id", increaseVotes);

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
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
});
module.exports = app;

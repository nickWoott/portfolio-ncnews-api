const express = require("express");
const { getTopics, getArticleById, increaseVotes } = require("./controllers");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", increaseVotes);

//below is error handling
app.use((req, res, next) => {
  res.status(404).send({ message: "end point not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
});

module.exports = app;

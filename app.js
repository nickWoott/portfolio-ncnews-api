const express = require("express");
const { getTopics, getArticleById } = require("./controllers");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

//below is error handling
app.use((req, res, next) => {
  res.status(404).send({ message: "end point not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
});

module.exports = app;

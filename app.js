const express = require('express');
const cors = require('cors');
const { application_name } = require('pg/lib/defaults');
const {
  getArticles,
  getArticleById,
  increaseVotes,
  getComments,
  postComment,
} = require('./controllers/articles.controllers');
const { getTopics } = require('./controllers/topics.controllers');
const { getUsers } = require('./controllers/users.controllers');
const { deleteComment } = require('./controllers/comments.controllers');
const { getEndpoints } = require('./controllers/api.controllers');
const Router = require('./routes.js/index');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/', Router);

app.use((req, res, next) => {
  res.status(404).send({ message: 'path not found' });
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
  if (err.code === '22P02' || err.code === '42703' || err.code === '23502') {
    res.status(400).send({ message: 'Bad Request' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === '23503') {
    res.status(404).send({ msg: 'article not found' });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'internal server error' });
});
module.exports = app;

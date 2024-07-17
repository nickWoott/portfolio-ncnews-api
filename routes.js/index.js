const { Router } = require('express');

const router = Router();

const {
  getArticles,
  getArticleById,
  increaseVotes,
  getComments,
  postComment,
} = require('../controllers/articles.controllers');
const { getTopics } = require('../controllers/topics.controllers');
const { getUsers } = require('../controllers/users.controllers');
const { deleteComment } = require('../controllers/comments.controllers');
const { getEndpoints } = require('../controllers/api.controllers');

router.get('../the name', thecontroller);

app.get('/topics', getTopics);

app.get('/articles/:article_id', getArticleById);

app.patch('/articles/:article_id', increaseVotes);

app.get('/users', getUsers);

app.get('/articles', getArticles);

app.get('/articles/:article_id/comments', getComments);

app.post('/articles/:article_id/comments', postComment);

app.delete('/comments/:comment_id', deleteComment);

app.get('/', getEndpoints);

module.exports = router;

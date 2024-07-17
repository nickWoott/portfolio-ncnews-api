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

router.get('/topics', getTopics);

router.get('/articles/:article_id', getArticleById);

router.patch('/articles/:article_id', increaseVotes);

router.get('/users', getUsers);

router.get('/articles', getArticles);

router.get('/articles/:article_id/comments', getComments);

router.post('/articles/:article_id/comments', postComment);

router.delete('/comments/:comment_id', deleteComment);

router.get('/', getEndpoints);

module.exports = router;

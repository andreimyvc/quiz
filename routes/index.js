var express = require('express');
var router = express.Router();

var quizController    = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.add);
router.post('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.put('/quizes/:quizId(\\d+)',         quizController.update);
router.delete('/quizes/:quizId(\\d+)',      quizController.destroy);
router.get('/author',                       quizController.author);

router.get('/login', sessionController.add);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);


router.get ('/quizes/:quizId(\\d+)/comments/new',    commentController.add);
router.post('/quizes/:quizId(\\d+)/comments/create',        commentController.create);

module.exports = router;

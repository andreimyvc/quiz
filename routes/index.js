var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Quiz' });
//});

router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizid(\\d+)',         quizController.show);
router.get('/quizes/:quizid(\\d+)/answer',  quizController.answer);
module.exports = router;
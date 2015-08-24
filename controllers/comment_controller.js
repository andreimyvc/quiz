var models = require('../models/models.js');

//GET  /quizes/:quizId/comments/new
exports.add = function (req, res) {
    res.render('comments/new.ejs', { quizid: req.params.quizId, errors: [] });
}

//POST /quizes/:quizId/comments
exports.create = function (req, res) {
    var comment = models.Comment.build(
    {
        texto: req.body.comment.texto, QuizId: req.params.quizId
    });

    var err = comment.validate();
    try {
        if (err) {
            res.render('comments/new.ejs', { comment: comment, quizid: req.params.quizId, errors: err.errors });
        } else {
            comment.save().then(function () { res.redirect('/quizes/' + req.params.quizId) });
        }
    }
    catch (error) {
        next(error)
    };
}
var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye ;quizId
exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else { next(new Error('No existe quizId=' + quizId)); } 
        }
    ).catch(function(error) { next(error);});
};
// Get /quizes
exports.index = function (req, res) {
    models.Quiz.findAll(findAll({where: ["pregunta like ?",  '%'+req.query.search+'%']}).then(
    function (quizes) {
        res.render('quizes/index', { quizes: quizes});
    }).catch(function(error) { next(error);});
};

//Get/quizes/:id
exports.show = function (req, res) {
    res.render('quizes/show', { quiz:req.quiz});
    //models.Quiz.find(req.params.quizId).then(function (quiz) { 
    //    res.render("quizes/show", { quiz: quiz});
    //});    
};

//Get/quizes/:id/answer  
exports.answer = function (req, res) {
    var result = 'Incorrecto';
    if(req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
    //models.Quiz.find(req.params.quizId).then(function (quiz) { 
    //if (req.query.respuesta === quiz.respuesta) {
    //    res.render("quizes/answer",  { quiz: quiz, respuesta: "Correcto" });
    //}
    //else {
    //    res.render("quizes/answer", { quiz: quiz,  respuesta: "incorrecto" });
    //}        
    //}); 
};

exports.author = function(req, res, next) {
  res.render('author', { title: 'Autor' });
};
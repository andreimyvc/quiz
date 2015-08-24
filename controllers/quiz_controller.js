var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye ;quizId
exports.load = function (req, res, next, quizId) {
    models.Quiz.find({
        where  : { id: Number(quizId) }, 
        include: [{ model:models.Comment }]
    }).then(
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
    models.Quiz.findAll({where: ["pregunta like ?",  '%'+req.query.search+'%']}).then(
    function (quizes) {
        res.render('quizes/index', { quizes: quizes, errors: [] });
    }).catch(function(error) { next(error);});
};

//Get/quizes/:id
exports.show = function (req, res) {
    var quiz = req.quiz;
    res.render('quizes/show', { quiz:quiz,  errors: [] }); 
    //models.Quiz.find(req.params.quizId).then(function (quiz) { 
    //    res.render("quizes/show", { quiz: quiz});
    //});    
};

//Get/quizes/:id/answer  
exports.answer = function (req, res) {
    var result = 'Incorrecto';
    if(req.query.respuesta === req.quiz.respuesta){
        result = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: result, errors: [] });
    //models.Quiz.find(req.params.quizId).then(function (quiz) { 
    //if (req.query.respuesta === quiz.respuesta) {
    //    res.render("quizes/answer",  { quiz: quiz, respuesta: "Correcto" });
    //}
    //else {
    //    res.render("quizes/answer", { quiz: quiz,  respuesta: "incorrecto" });
    //}        
    //}); 
};
//Get/quizes/new  
exports.add = function (req, res) {
   var quiz = models.Quiz.build({ pregunta: "", respuesta: "", tema: ""}); 
   res.render("quizes/new", { quiz: quiz, errors: [] });
}

//Get/quizes/create
exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.tema = req.body.tema;
    var err = quiz.validate();    
    if(err){
        res.render("quizes/new", { quiz: quiz, errors: err });
    }
    else{
        //Guardamos la nueva pregunta.
        quiz.save({ fields: ["pregunta","respuesta", "tema"]}).then(
        function(){
            res.redirect("/quizes");
            });
        }
}

//Get/quizes/:id/edit  
exports.edit = function (req, res) {
    var quiz = req.quiz;

    res.render("quizes/edit", {quiz:quiz, errors: []});
}
//put/quizes/:id/update  
exports.update = function (req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    //req.quiz.tema = req.body.quiz.tema;    
    var quiz = req.quiz;
    quiz.tema = req.body.tema;

    var err = quiz.validate();
        if(err){
          res.render("quizes/edit", { quiz: quiz, errors: err.errors });   
        }else{
            //Guardamos la nueva pregunta.
            quiz.save({ fields: ["pregunta","respuesta","tema"]}).then(
            function(){
                res.redirect("/quizes");
                });          
        };
}

//Delete/quizes/:id/edit  
exports.destroy = function (req, res) {
    var quiz = req.quiz;
    quiz.destroy().then( function(err){
    res.redirect("/quizes");})
    .catch(function(error){next(error);});
}

exports.author = function(req, res, next) {
  res.render('author', { title: 'Autor', errors: [] });
};
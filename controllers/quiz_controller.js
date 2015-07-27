var models = require('../models/models.js');

//Get/quizes/question
exports.question = function (req, res) {
    models.Quiz.findAll().success(function (quiz) { 
        res.render("quizes/question", { pregunta: quiz[0].Pregunta});
    });    
};

//Get/quizes/answer  
exports.answer = function (req, res) {
    models.Quiz.findAll().success(function (quiz) { 
    if (req.query.respuesta === quiz[0].Respuesta) {
        res.render("quizes/answer",  { respuesta: "Correcto" });
    }
    else {
        res.render("quizes/answer", { respuesta: "incorrecto" });
    }        
    }); 
};
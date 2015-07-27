var path = require('path');

//Cargamos el modelo ORM
var Sequalize = require('sequelize');

//Usar BBDD SQLITE
var sequalize = new Sequalize(null, null, null,
    { dialect: "sqlite", storage: "quiz.sqlite" }
);

//Importamos la definicion de la tabla Quiz en quiz.js
var Quiz = sequalize.import(path.join(__dirname,'quiz'));

sequalize.sync().success(function () { 
    Quiz.count().secces(function (count){
        if(count === 0){
            Quiz.create({
                Pregunta: "¿Capital de Italia?",
                Respuesta: "Roma",
                Id : count+1})
                .success(function(){console.log('Base de datos inicializada')});
        };
    });
});

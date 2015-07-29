var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name     = (url[6] || null);
var user        = (url[2] || null);
var pwd         = (url[3] || null);
var protocol    = (url[1] || null);
var dialect     = (url[1] || null);
var port        = (url[5] || null);
var host        = (url[4] || null);
var storage     = process.env.DATABASE_STORAGE;

//Cargamos el modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLITE
var sequelize = new Sequelize(DB_name, user, pwd,
    { 
        dialect: dialect,
        host: host,
        storage: storage, //solo SQLite (.env)
        omitNull: true  // solo Postgres
    }
);
//var sequelize = new Sequelize(null, null, null,
//    { dialect: "sqlite", storage: "quiz.sqlite" }
//);

//Importamos la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;
sequelize.sync().then(function () { 
    Quiz.count().then(function (count){
        if(count === 0){
            Quiz.create({
                pregunta: "¿Capital de Italia?",
                respuesta: "Roma"});
            Quiz.create({
                pregunta: "¿Capital de Portugal?",
                respuesta: "Lisboa"})
                .then(function(){console.log('Base de datos inicializada')});
        };
    });
});

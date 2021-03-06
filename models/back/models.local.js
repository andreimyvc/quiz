var path = require('path');
//DATABASE_URL='sqlite://:@:/'
//DATABASE_STORAGE='quiz.sqlite'

//process.env.DATABASE_URL = DATABASE_URL;
//process.env.DATABASE_STORAGE = DATABASE_STORAGE;
//var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
//var DB_name     = (url[6] || null);
//var user        = (url[2] || null);
//var pwd         = (url[3] || null);
//var protocol    = (url[1] || null);
//var dialect     = (url[1] || null);
//var port        = (url[5] || null);
//var host        = (url[4] || null);
//var storage     = process.env.DATABASE_STORAGE;

//Cargamos el modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLITE
//var sequelize = new Sequelize(DB_name, user, pwd,
//    { 
//        dialect: dialect,
//        host: host,
//        storage: storage, //solo SQLite (.env)
//        omitNull: true  // solo Postgres
//    }
//);
var sequelize = new Sequelize(null, null, null,
    { dialect: "sqlite", storage: "quiz.sqlite" }
);

//Importamos la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importamos la definicion de la tabla Comment en quiz.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;

exports.Quiz = Quiz;
sequelize.sync().then(function () { 
    Quiz.count().then(function (count){
        if(count === 0){
            Quiz.create({
                pregunta: "¿Capital de Italia?",
                respuesta: "Roma",
                tema: "Otro"});
            Quiz.create({
                pregunta: "¿Capital de Portugal?",
                respuesta: "Lisboa",
                tema: "Otro"})
                .then(function(){console.log('Base de datos inicializada')});
        };
    });
});

module.exports = function (sequalize, DataType) {
    return sequalize.define('quiz',
    {
        Id: DataType.INTEGER,
        Pregunta: DataType.STRING,
        Respuesta: DataType.STRING
    });
};
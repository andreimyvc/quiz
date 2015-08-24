var users = {   
                admin:  {id:1, username:"admin",  password:"1234"},
                master: {id:2, username:"master", password:"5678"}
            };
exports.autrnticar = function (login, password, callback) {
    if (users[login]) {
        if (users[login].password === password) {
            callback(null, users[login]);
        }
        callback(new Error("Password erroneo!"), null);
    }
    callback(new Error("No existe el usuario!"), null);
};


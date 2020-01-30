var mysql = require('mysql2');

var con = mysql.createConnection({
    database: "citado",
    host: "localhost",
    user: "root",
    password: "qjmn0643"
});

module.exports = con
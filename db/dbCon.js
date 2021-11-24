const mysql = require("mysql");

const con = mysql.createConnection({
    host : "localhost", 
    port : "3306",
    user : "root",
    password : "1234",
    database : "furniture_db"
});

con.connect( err => {
    if(err) throw err;
    console.log("Database connected");
});

module.exports = con;
var pgp= require ('pg-promise')({});
var connectionString = 'postgres://localhost/imanage';
var db = pgp(connectionString);

module.exports = db;



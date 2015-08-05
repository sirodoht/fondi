var fs = require('fs');
var path = require('path');

var Sequelize = require('sequelize');

// var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize('sirodoht', 'sirodoht', '', {
  dialect: 'postgres', // or 'sqlite', mysql', 'mariadb'
  port: 5432, // or 5432 (for postgres)
});

var db = module.exports = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

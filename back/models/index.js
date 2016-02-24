var path = require('path');

var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var user = sequelize.import(path.join(__dirname, 'user.model.js'));
var course = sequelize.import(path.join(__dirname, 'course.model.js'));
var section = sequelize.import(path.join(__dirname, 'section.model.js'));

var db = {
  User: user,
  Course: course,
  Section: section,
  sequelize: sequelize,
  Sequelize: Sequelize,
};

db.Course.belongsToMany(db.User, {through: 'UserCourse'});
db.User.belongsToMany(db.Course, {through: 'UserCourse'});

db.Course.hasMany(db.Section);
db.Section.belongsTo(db.Course);

sequelize.sync();

module.exports = db;

var path = require('path');

var Sequelize = require('sequelize');
var config = require('config');

var sequelize = new Sequelize(config.postgres.url, {
  logging: false,
});

var user = sequelize.import(path.join(__dirname, 'user.model.js'));
var course = sequelize.import(path.join(__dirname, 'course.model.js'));
var section = sequelize.import(path.join(__dirname, 'section.model.js'));

var models = {
  User: user,
  Course: course,
  Section: section,
  sequelize: sequelize,
  Sequelize: Sequelize,
};

models.Course.belongsToMany(models.User, {through: 'UserCourse'});
models.User.belongsToMany(models.Course, {through: 'UserCourse'});

models.Course.hasMany(models.Section);
models.Section.belongsTo(models.Course);

module.exports = models;

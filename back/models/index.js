/**
 * @file Sequelize models and relations master file.
 */

const path = require('path');

const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.postgres.url, {
  logging: false,
});

const user = sequelize.import(path.join(__dirname, 'user.model.js'));
const course = sequelize.import(path.join(__dirname, 'course.model.js'));
const section = sequelize.import(path.join(__dirname, 'section.model.js'));

const models = {
  User: user,
  Course: course,
  Section: section,
  sequelize,
  Sequelize,
};

models.Course.belongsToMany(models.User, { through: 'UserCourse' });
models.User.belongsToMany(models.Course, { through: 'UserCourse' });

models.Course.hasMany(models.Section);
models.Section.belongsTo(models.Course);

module.exports = models;

// var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var attributes = {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  };

  var CourseSection = sequelize.define('CourseSection', attributes);

  return CourseSection;
};

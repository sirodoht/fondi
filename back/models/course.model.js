/**
 * @file Course Sequelize model.
 */

const slug = require('slug');

module.exports = function (sequelize, DataTypes) {
  const attributes = {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
  };

  const Course = sequelize.define('Course', attributes);

  const slugNameHook = function (course) {
    course.slug = slug(course.name, { lower: true });
  };

  Course.beforeCreate(slugNameHook);
  Course.beforeUpdate(slugNameHook);

  return Course;
};

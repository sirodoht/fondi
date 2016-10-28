const slug = require('slug');

module.exports = function (sequelize, DataTypes) {
  const attributes = {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT,
  };

  const Section = sequelize.define('Section', attributes);

  const slugNameHook = function (course) {
    course.slug = slug(course.title, { lower: true });
  };

  Section.beforeCreate(slugNameHook);
  Section.beforeUpdate(slugNameHook);

  return Section;
};

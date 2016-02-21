module.exports = function (sequelize, DataTypes) {
  var attributes = {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  };

  var Course = sequelize.define('Course', attributes);

  return Course;
};

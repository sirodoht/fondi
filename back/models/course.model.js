module.exports = function (sequelize, DataTypes) {
  const attributes = {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  };

  var Course = sequelize.define('Course', attributes);

  return Course;
};

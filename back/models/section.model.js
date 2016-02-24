module.exports = function (sequelize, DataTypes) {
  var attributes = {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  };

  var Section = sequelize.define('Section', attributes);

  return Section;
};

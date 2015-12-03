// var Promise = require('bluebird');
// var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var attributes = {
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    desc: DataTypes.STRING,
  };

  var options = {};
  options.classMethods = {
    // associate: function(models) {
    //   Course.belongsTo(models.User, {
    //     onDelete: 'CASCADE',
    //     foreignKey: {
    //       allowNull: true
    //     }
    //   });
    // }
  };

  var Course = sequelize.define('Course', attributes, options);

  return Course;
};

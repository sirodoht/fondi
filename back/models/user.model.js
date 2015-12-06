var Promise = require('bluebird');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

Promise.promisifyAll(require('bcrypt'));

var SALT_WORK_FACTOR = 10;

module.exports = function(sequelize, DataTypes) {
  var attributes = {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },

    lastLogin: Sequelize.DATE,
    lastIp: {
      type: Sequelize.STRING,
      validate: {
        isIP: true,
      },
    },

    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    location: DataTypes.STRING,
  };

  var options = {};
  options.classMethods = {
    associate: function(models) {
      User.hasMany(models.Course);
    }
  };
  options.instanceMethods = {
    validPassword: function(pwd) {
      return bcrypt.compareAsync(pwd, this.password).then(function(isMatch) {
        return isMatch;
    	});
    },
  };

  var User = sequelize.define('User', attributes, options);

  var hashPasswordHook = function(user) {
    return bcrypt.genSaltAsync(SALT_WORK_FACTOR)
      .then(function(salt) {
        return bcrypt.hashAsync(user.password, salt).then(function(hash) {
          user.password = hash;
        });
      })
      .catch(function(err) {
        console.log('Password hook error:', err);
      });
  };

  User.beforeCreate(hashPasswordHook);
  User.beforeUpdate(hashPasswordHook);

  return User;
};

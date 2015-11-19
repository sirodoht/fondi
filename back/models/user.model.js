var Promise = require('bluebird');
var bcrypt = require('bcrypt');

Promise.promisifyAll(require('bcrypt'));

var SALT_WORK_FACTOR = 10;

module.exports = function(sequelize, DataTypes) {
  var attributes = {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  var options = {};
  options.instanceMethods = {
    validPassword: function (pwd) {
      return bcrypt.compareAsync(pwd, this.password).then(function (isMatch) {
        console.log('isMatch', isMatch);
        return isMatch;
    	});
    },
    getFullname: function() {
      return [this.name, this.username].join(' ');
    }
  };

  var User = sequelize.define('User', attributes, options);

  var hashPasswordHook = function(user, options) {
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

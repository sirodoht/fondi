/**
 * @file User Sequelize model.
 */

const Promise = require('bluebird');
const bcrypt = require('bcrypt');

Promise.promisifyAll(require('bcrypt'));

const SALT_WORK_FACTOR = 10;

module.exports = function (sequelize, DataTypes) {
  const attributes = {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
  };

  const options = {};
  options.classMethods = {
    associate: function (models) {
      User.hasMany(models.Course);
    },
  };
  options.instanceMethods = {
    validPassword: function (pwd) {
      return bcrypt.compareAsync(pwd, this.password);
    },
  };

  const User = sequelize.define('User', attributes, options);

  /**
   * Change password value to bcrypt-ed one.
   * @param {Object} user Current user record.
   * @return {Promise} A Promise.
   */
  const hashPasswordHook = function (user) {
    return bcrypt.genSaltAsync(SALT_WORK_FACTOR)
      .then(function (salt) {
        return bcrypt.hashAsync(user.password, salt);
      })
      .then(function (hash) {
        user.password = hash;
      })
      .catch(function (err) {
        console.error('Password hook error:', err);
      });
  };

  User.beforeCreate(hashPasswordHook);
  User.beforeUpdate(hashPasswordHook);

  return User;
};

var bcrypt = require('bcrypt');

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
    verifyPassword: function () {
      bcrypt.compare(pwd, this.password, function (err, isMatch) {
    		if (err)
    			return cb(err);

    		cb(null, isMatch);
    	});
    },
    getFullname: function() {
      return [this.name, this.username].join(' ');
    }
  };

  var User = sequelize.define('User', attributes, options);

  return User;
};

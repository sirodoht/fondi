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
  options.hooks = {
    beforeValidate: function (user, options) {
      console.log('did this ever run hon?\n');

      // not sure what this does
    	// if (!user.isModified('password'))
    	// 	return next();

    	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    		if (err)
    			return next(err);

    		bcrypt.hash(user.password, salt, function (err, hash) {
    			if (err)
    				return next(err);
    			user.password = hash;
    			// next();
    		});
    	});
    },
  };
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

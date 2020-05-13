var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	Username: {
		type: String
	},
	Name: {
		type: String
	},
	Email: {
		type: String
	},
	Phone: {
		type: String
	},
	Password:{
		type:String,
		bcrypt: true
	},
	Branch:{
		type:String
	},
	Semester:{
		type:String
	},
	Score:{
		type:Number
	}
	
});

var User = module.exports = mongoose.model('User', UserSchema);

// Get User By Id



module.exports.saveUser = function(newUser, callback){
	bcrypt.hash(newUser.Password, 10, function(err, hash){
		if(err) throw errl
		// Set hash
		newUser.Password = hash;
		console.log('User is Registered');
		async.parallel([newUser.save], callback);
	});
}

// Get User By Id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// Get User by Username
module.exports.getUserByUsername = function(username, callback){
	var query = {Username: username};
	User.findOne(query, callback);
}

// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}

// Create Student User

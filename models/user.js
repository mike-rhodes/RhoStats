var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Generate schema for user model
var userSchema = mongoose.Schema({
	local			:{
		email		: String,
		password	: String,
		isAdmin: Boolean

	},

	facebook		:{
		id			: String,
		token		: String,
		email		: String,
		name		: String
	},

	twitter			:{
		id			: String,
		token		: String,
		displayName	: String,
		username	: String
	},

	google			:{
		id			: String,
		token		: String,
		email		: String,
		name		: String
	},

});

// Methods
// Generate a hash
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

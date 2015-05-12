// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user and post models
var User = require('../models/user');
// var Post = require('../models/posts');

var minPassLen = 5

// expose this function to our app using module.exports
module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user, done) {

    	done(null, user.id);

    });

    passport.deserializeUser(function (id, done) {

    	User.findById(id, function(err, user) {
    		done(err, user);
    	});

    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({

    	usernameField: 'email',
    	passwordField: 'password',
    	passReqToCallback: true

    },

    function (req, email, password, done) {

    	process.nextTick(function() {

    		User.findOne({ 'local.email': email }, function(err, user) {

    			if(err)
    				return done(err);

    			if (user) {

    				return done(null, false, req.flash('signupMessage', 'That email is already taken'));

    			} else  if (password.length < minPassLen) {

            return done(null, false, req.flash('signupMessage', 'Password must be greater than five characters.'));

          } else {
    				var newUser = new User();

    				newUser.local.email = email;
    				newUser.local.password = newUser.generateHash(password);
            newUser.local.isAdmin = false;

    				newUser.save(function(err) {
    					if (err)
    						throw err;
    					return done(null, newUser);
    				});

    			}



    		});
    	});

    }));

    passport.use('local-login', new LocalStrategy({

    	usernameField: 'email',
    	passwordField: 'password',
    	passReqToCallback: true

    },
    function (req, email, password, done) {
    	User.findOne({ 'local.email': email }, function (err, user) {
    	  if (err)
          return done(err);

        if (!user)
          return done(null, false, req.flash('loginMessage', 'Username not found.'));

        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password!'));

        return done(null, user);
    	});
    }
    ));
};

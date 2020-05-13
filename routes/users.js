var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Include User Model
var User = require('../models/user');
var Quiz = require('../models/quiz');
// Include Student Model

// User Register
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

// Register User
router.post('/register', function(req, res, next) {
 	// Get Form Values
	var name     		= req.body.name;
	var phone     		= req.body.phone;
	var email    		= req.body.email;
	var username 		= req.body.username;
	var password 		= req.body.password;
	var password2 		= req.body.password2;
	var branch          = req.body.branch;
	var semester        = req.body.semester;

	// Form Validation
	req.checkBody('semester', 'Please select Semester').notEmpty();
	req.checkBody('branch', 'Please select Branch').notEmpty();
	req.checkBody('name', 'Name required').notEmpty();
	req.checkBody('phone', 'Mobile number required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email must be a valid email address').isEmail();
	req.checkBody('username', 'Username  required').notEmpty();
	req.checkBody('password', 'Password  required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	errors = req.validationErrors();

	if(errors){
		res.render('users/register', {
			errors: errors
		});
	} else {
		var newUser = new User({
			Name: name,
			Username:username,
			Password: password,
			Semester: semester,
			Branch:	branch,
			Email: email,
			Phone: phone,
			Score: 0
		});
		User.saveUser(newUser, function(err, user){
			console.log('User created');
		});

		req.flash('success_msg', 'Successfully Registered');
		res.redirect('/');
	}
});

passport.serializeUser(function(user, done) {
  done(null, user._id);
});


passport.deserializeUser(function(id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local',{failureRedirect:'/', failureFlash: true}), function(req, res, next) {
  	req.flash('success_msg','You are now logged in')
	res.redirect('quiz');
  	
});


router.get('/quiz', function(req, res, next) {
	

	res.render('index');

});





passport.use(new LocalStrategy(
  function(username, password, done) {
  	User.getUserByUsername(username, function(err, user){
    	if (err) throw err;
    	if(!user){
    		return done(null, false, { message: 'Unknown user ' + username }); 
    	}

    	User.comparePassword(password, user.Password, function(err, isMatch) {
      		if (err) return done(err);
      		if(isMatch) {
        		return done(null, user);
      		} else {
      			console.log('Invalid Password');
      			// Success Message
        		return done(null, false, { message: 'Invalid password' });
      		}
   	 	});
    });
  }
));

// Log User Out
router.get('/logout', function(req, res){
	req.logout();
 	// Success Message
	req.flash('success_msg', "You have logged out");
  	res.redirect('/');
});



module.exports = router;

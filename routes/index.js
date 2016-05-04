var express = require('express');
var router = express.Router();
var mongoUrl = "mongodb://localhost:27017/coffee"
var mongoose = require('mongoose');
var Account = require('../models/accounts');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect(mongoUrl);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});
//get route for the Register page
router.get('/register',function	(req,res,next){
	if(req.query.failure){
		res.render('register',{tempName: req.session.username, failure: req.query.failure});	
	}
	res.render('register',{failure: req.query.failure})
});

router.get('/options', function(req,res,next){
	res.render('options',{username: req.session.username})
});

router.post('/register',function (req,res,next){
	if(req.body.password !== req.body.password2){
		req.session.username = req.body.username;
		res.redirect('/register?failure=password');

	}else{
		var newAccount = new Account({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			emailAddress: req.body.email
		});
		newAccount.save();
		req.session.username = req.body.username;
		res.redirect('/options');

	}
});

module.exports = router;

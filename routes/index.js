const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const Comment = require("../models/comment");
const passport = require("passport");
const User = require("../models/user");


router.get("/", (req, res)=>{
	res.render("landing");
});

//SHOW ROUTE - register form
router.get("/register", (req, res)=>{
	res.render("register", {page: "register"});
});

//handle signup logic
router.post("/register", (req, res)=>{
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			console.log(err);
			return res.render("/register", {error: err.message});
		}
		passport.authenticate("local")(req, res, ()=>{
			req.flash("success", "Successfully signed up! Welcome "+ user.username +"!");
			res.redirect("/cars");
		});
	});
});

//Show login form
router.get("/login", (req, res)=>{
	res.render("login", {page: "login"});
});

//handle authentication logic
router.post("/login", passport.authenticate("local", 
	{
	successRedirect: "/cars",
	failureRedirect: "/login",
	}), (req, res)=>{
});

//logout logic
router.get("/logout", (req, res)=>{
	req.logout();
	req.flash("success", "Successfully logged you out!");
	res.redirect("/cars");
});


module.exports = router;
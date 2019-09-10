const Car = require("../models/car");
const Comment = require("../models/comment");

const middlewareObj = {};

//middleware to authenticate user
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login to perform this action!")
	res.redirect("/login");
}

//middlewar for car to check user authorization
middlewareObj.checkCarOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Car.findById(req.params.id, (err, foundCar)=>{
			if(err){
				req.flash("error", "Car not found!");
				res.redirect("back");
			}else{
				//does user own the car?
				if(foundCar.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have authorization to perform this action!");
					res.redirect("back");
				}
			}
		});	
	}else{
		req.flash("error", "Please login to perform this action!")
		res.redirect("back");
	}
}

//middlewar for comments to check user authorization
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.commentId, (err, foundComment)=>{
			if(err){
				req.flash("error", "Car not found!");
				res.redirect("back");
			}else{
				//does user own the car?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have authorization to perform this action!");
					res.redirect("back");
				}
			}
		});	
	}else{
		req.flash("error", "Please login to perform this action!")
		res.redirect("back");
	}
}

module.exports = middlewareObj;
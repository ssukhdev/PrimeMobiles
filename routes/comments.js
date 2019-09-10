const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const Comment = require("../models/comment");
const middleware = require("../middleware");

//New route
router.get("/cars/:id/comments/new", middleware.isLoggedIn, (req, res)=>{
	//find car by id
	Car.findById(req.params.id, (err, car)=>{
		if (err){
			console.log(err);
		}else{
			res.render("comments/new", {car: car});
		}
	});	
});
	
//Create comments route
router.post("/cars/:id/comments", middleware.isLoggedIn, (req, res)=>{
	//lookup car
	Car.findById(req.params.id, (err, car)=>{
		if(err){
			console.log(err);
			res.redirect("/cars");
		}else{
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					car.comments.push(comment);
					car.save();
					req.flash("success", "Comment added successfully!")
					res.redirect("/cars/" + car._id);
				}
			});
		}
	});
});

//Edit comment route
router.get("/cars/:id/comments/:commentId/edit", middleware.checkCommentOwnership,(req, res)=>{
	Comment.findById(req.params.commentId, (err, foundComment)=>{
		if(err){
			res.redirect("back")
		}else{
			res.render("comments/edit", {carId: req.params.id, comment: foundComment});  
		}
	});	
});

//Update comment route
router.put("/cars/:id/comments/:commentId", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment)=>{
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment updated!")
			res.redirect("/cars/"+ req.params.id, );
		}
	});
});
//Destroy comment route
router.delete("/cars/:id/comments/:commentId", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.commentId, (err)=>{
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment removed!")
			res.redirect("/cars/"+ req.params.id);
		}
	});
});

module.exports = router;
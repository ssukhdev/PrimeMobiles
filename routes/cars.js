const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const middleware = require("../middleware");


//INDEX route - show all cars
router.get("/cars", (req, res)=>{
	Car.find({}, function(err, allCars){
		if(err){
			console.log(err);
		}else{
			res.render("cars/index",{cars: allCars, page: "cars"});
		}  
    });	
});

//NEW route - show form to create new cars
router.get("/cars/new", middleware.isLoggedIn, (req, res)=>{
	res.render("cars/new");
});

//CREATE route - add new cars to DB
router.post("/cars", middleware.isLoggedIn, (req, res)=>{
	let carName = req.body.name;
	let carPrice = req.body.price;
	let imageUrl = req.body.image;
	let carDescription = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCar = {name: carName, price: carPrice, image: imageUrl, description: carDescription, author: author};
	//create new car and save to DB
	Car.create(newCar, function(err, car){
		if(err){
			console.log(err);
		}else{
			//redirect back to cars page
			req.flash("success", "New car successfully added!");
			res.redirect("/cars");
		}
	});	
});

//SHOW route - show info about one car
router.get("/cars/:id", (req, res)=>{
	Car.findById(req.params.id).populate("comments").exec(function(err, foundCar){
		if(err){
			console.log(err);
		}else{
			res.render("cars/show", {car: foundCar});	
		}
	});	
});

//EDIT route
router.get("/cars/:id/edit", middleware.checkCarOwnership, (req, res)=>{
	Car.findById(req.params.id, (err, foundCar)=>{
		res.render("cars/edit", {car: foundCar});
	});	
});

//UPDATE route
router.put("/cars/:id", middleware.checkCarOwnership, (req, res)=>{
	Car.findByIdAndUpdate(req.params.id, req.body.car, (err, updatedCar)=>{
		if(err){
			res.redirect("/cars");
		} else {
			req.flash("success", "Car updated!");
			res.redirect("/cars/" + req.params.id);
		}	
	});
});

//DESTROY route
router.delete("/cars/:id", middleware.checkCarOwnership, (req, res)=>{
	Car.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			res.redirect("/cars");
		} else {
			req.flash("success", "Car removed!");
			res.redirect("/cars");
		}
	});
});


module.exports = router;

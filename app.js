const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const Car = require("./models/car");
const Comment = require("./models/comment");
const User = require("./models/user");

//const port = 3000;
//const seedDB = require("./seeds");

//Routes
const commentRoutes = require("./routes/comments");
const carRoutes = require("./routes/cars");
const indexRoutes = require("./routes/index");

//seedDB();
//mongoose.connect("mongodb://localhost/PrimeMobiles", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://sukhi:Ruffryder1@cluster0-o2fvf.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require("moment");
//PASSPORT CONFIGURATION
app.use(expressSession({
	secret: "makesureyourpasswordislongandlessobvious",
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(carRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP);

//app.listen(port, ()=> console.log("PrimeMobile server now listening on port " + port));



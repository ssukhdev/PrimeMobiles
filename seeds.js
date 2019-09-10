const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const seeds = [
	{
		name: "Granite Hill",
		image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum. Amet massa vitae tortor condimentum lacinia quis. Volutpat blandit aliquam etiam erat velit. Mauris ultrices eros in cursus turpis massa tincidunt."
	},
	{
		name: "Uluru Outback",
		image: "https://cdn.pixabay.com/photo/2017/08/07/02/34/people-2598902__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum. Amet massa vitae tortor condimentum lacinia quis. Volutpat blandit aliquam etiam erat velit. Mauris ultrices eros in cursus turpis massa tincidunt."
	},
	{
		name: "Murray River",
		image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum. Amet massa vitae tortor condimentum lacinia quis. Volutpat blandit aliquam etiam erat velit. Mauris ultrices eros in cursus turpis massa tincidunt."
	},	
]

async function seedDB(){
	await Campground.deleteMany({});
	console.log("campgrounds removed");
	await Comment.deleteMany({});
	console.log("comments removed");
	for (const seed of seeds){
		let campground = await Campground.create(seed);
		console.log("campground created");
		let comment = await Comment.create({
			text: "Seems like a nice place. Wish I could go there",
			author: "Bored human",
		});
		console.log("comment created");
		campground.comments.push(comment);
		campground.save();
		console.log("comment added to campground");
	}
}

module.exports = seedDB;

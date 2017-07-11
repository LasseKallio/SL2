var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("ShoppingItem", new schema({
	id:Number,
	name:String,
	count:Number,
	price:Number	
}));
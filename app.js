var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ShoppingModel = require("./backend/models/shoppingitem");
var User = require("./backend/models/user");
var config = require("./config");
var jwt = require("jsonwebtoken");
var apiRouter = express.Router();

mongoose.connect(config.database);

app.set("mySecret",config.secret);
app.use(express.static(path.join(__dirname,"public_www")));
app.use(bodyParser.json());
apiRouter.use(function(req,res,next) {
	console.log(req.headers);
	var token = req.headers.token;
	if (token) {
		jwt.verify(token,app.get("mySecret"), function(err,decoded){
			if (err){
				return res.send(JSON.stringify({success:false,message:"Wrong token"}));
			} else {
				next();
			}
		});
	} else {
		return res.send(JSON.stringify({success:false,message:"No token"}));
	}
	
});

apiRouter.get("/shoppinglist", function(req,res) {
		ShoppingModel.find(function(err,items,count) {
			if (err) {
				console.log("Cannot find data");
			} else {
				res.send(JSON.stringify([items]));	
			}
		});
});

apiRouter.get("/shoppinglist/:id", function(req,res) {
		console.log("get id:"+req.params.id);
		ShoppingModel.findOne({"id":req.params.id}, function(err,item){
			if (err) {
				console.log("Cannot find one");
				var empty={};
				res.send(JSON.stringify(empty));
			} else {
				res.send(JSON.stringify(item));
			}
		
		});
});

apiRouter.post("/shoppinglist/:id", function(req,res) {
		var shopitem = new ShoppingModel({
			id:req.body.id,
			name:req.body.name,
			count:req.body.count,
			price:req.body.price			
		});
		shopitem.save(function(err,shoppingitem,count) {
			if (err) {
				console.log("Cannot save data");
			} else {
				res.send("success");
			}
		});
		
});

app.post("/newuser", function(req,res) {
	console.log(req.body);
	var newuser = new User({
		login: req.body.login,
		pword: req.body.pword,		
	});
	
	newuser.save(function(err) {
		if (err) {
			throw err;
		}
		console.log("new user");
		res.send("success");
	});
});


app.post("/login", function(req,res) {
	User.findOne({
		login: req.body.login
	}, function(err,user) {
		console.log("Login");
		if (err) throw err;
		if (!user) {
			    res.send(JSON.stringify({success:false, message: "No such user"}));
		} else if (user) {
			if (user.pword != req.body.pword) {
				res.send(JSON.stringify({success:false, message: "No such user"}));	
			} else {
				console.log("generate token");
				var token = jwt.sign(user,app.get("mySecret"), {
						expiresIn:3600
				});
				
				res.send(JSON.stringify({
					success:true,
					message:"Here is your token",
					token: token					
				}));
			}
		}
	});
});
app.use("/api",apiRouter);
app.listen(3000);
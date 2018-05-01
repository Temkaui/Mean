let mongoose = require("mongoose")
let user = mongoose.model("user");
let bcrypt = require("bcrypt-as-promised")
class UserController{
	all(req, res){
		User.find({},(err, users)=>{
			if (err){
				console.log(err);
			}
			else{
				res.render("index", {users: users})
			}
		});
	}
	// register(req,res){
	// 	User.find({email: req.body.email}, (err, user)=>{
	// 		user = user[0];
	// 		if (err){
	// 			console.log(err);
	// 		}
	// 		else{
	// 			if(user.length > 0){
	// 				console.log("Email already exists")
	// 				res.redirect("/");
	// 			}

	// 			let new_user = new User(req.body);
	// 			new_user.save(err=>{
	// 				if(err){
	// 					console.log(err);
	// 					res.redirect("/")
	// 				}
	// 				res.redirect("/");
	// 			});
	// 		}
	// 	});
	// }
}
module.exports = new UserController();

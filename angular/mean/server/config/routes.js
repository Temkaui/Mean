let ProductController = require("../controllers/ProductController.js");
let path = require("path")

module.exports = (app)=>{

	app.get("/api", MovieController.all);
	app.get("/api/:id", MovieController.show);
	app.post("api/new", MovieController.create);
	app.put("api/edit/:id", MovieController.update);
	
	app.all("*",(req,res)=>{
		res.sendFile(path.resolve("./client/dist/index.html"));
	});
}
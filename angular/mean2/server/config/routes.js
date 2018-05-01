let MovieController = require("../controllers/MovieController.js");
let path = require("path")

module.exports = (app)=>{

	app.get("/movies", MovieController.all);
	app.get("/movies/:id", MovieController.show_review);
	app.post("/movies/new", MovieController.create_movie);
	app.put("/movies/review/:id", MovieController.create_review);
	
	app.all("*",(req,res)=>{
		res.sendFile(path.resolve("./client/dist/index.html"));
	});
}
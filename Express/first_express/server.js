var express = require("express");
var app = express();

// app.get("/", function(request, response){
// 	response.send("Hello Express");
// })
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/users", function(request, response){
	var users_array = [
		{name: "Micheal", email: "micheal@coding.dojo"},
		{name: "Tom", email: "tom@gmail.com"}
	];
	response.render('users', {users: users_array});
})

app.listen(8000, function(){
	console.log("it is working");
})
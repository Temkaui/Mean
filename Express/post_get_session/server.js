var express = require("express");
var app = express();

// app.get("/", function(request, response){
// 	response.send("Hello Express");
// })
var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));

var body = require('body-parser');
app.use(body.urlencoded({extended: true}));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');


app.get('/', function(req, res){
	res.render('index', {title: "my Express project"});
});

app.post('/users', function(req,res){
	req.session.name = req.body.name;
	console.log("session name:" + req.session.name);
	res.redirect('/')
})

app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});



app.listen(8000, function(){
	console.log("it is working");
})
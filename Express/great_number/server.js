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
	if (!req.session.number){
		set.session();
	}
	else
		pass
	console.log(req.session.number);
	res.render('index');
});

app.post('/process', function(req, res){

	var error = [];
	var Valid = true;
	var guess = require.session.number;
	
	}
	res.redirect('/');
})

app.listen(8000, function(){
	console.log("it is working");
})
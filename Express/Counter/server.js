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
	if (req.session.count){
		req.session.count++;
	}
	else {
		req.session.count = 1;
	}
	res.render('index', {count: req.session.count});
});

app.get('/two', function(req, res){
	req.session.count++;
	res.redirect('/');
})

app.get('/reset', function(req, res){
	delete req.session.count;
	res.redirect('/')
})





app.listen(8000, function(){
	console.log("it is working");
})
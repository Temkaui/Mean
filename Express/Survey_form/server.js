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
	res.render('index');
});

app.post('/process', function(req, res){
	req.session.result = req.body;
	res.redirect('/result');
})

app.get('/result', function(req, res){
	res.render('result', {result: req.session.result})
})


app.listen(8000, function(){
	console.log("it is working");
})
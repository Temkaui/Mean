var express = require('express');
var app = express();
//require mongoose, and connect to the MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task');
// Use native promises
mongoose.Promise = global.Promise;

var ApinameSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 1, maxlength: 255},
 age:{type: String, required: true, minlength: 5, maxlength: 1024},
 birth_year:{type: Number, required: true, length: 4},
}, {timestamps: true})
mongoose.model('Names', ApinameSchema); // We are setting this Schema in our Models as 'User'
var Names = mongoose.model('Names') // We are retrieving this Schema from our Models, named 'User'

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory


// app.set('views', path.join(__dirname, './views'));
// // Setting our View Engine set to EJS
// app.set('view engine', 'ejs');


app.get('/', function(req, res){
	Names.find({birth_year: 1955}, function(err, names){
		if(err){
			console.log("this is the err:", err);
			res.json({message: "Error", error: err});
		}
		else{
			console.log("it is working");
			res.json({message: "success", data: names});
		}
	});
});

app.get('/new/:id', function(req,res){
	var names = new Names(req.body), function(err, names){
		if(err){
			res.json({message: "Error", error:err});
		}
		else{
			res.json({message: "success", data: names});
		}
	});
});
	


app.listen(8000, function() {
    console.log("listening on port 8000");
})

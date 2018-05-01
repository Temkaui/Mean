var express = require('express');
var app = express();
//require mongoose, and connect to the MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task');
// Use native promises
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema({
 title: {type: String, required: true, minlength: 1, maxlength: 255},
 description:{type: String, required: true, minlength: 5, maxlength: 1024},
 completed:{type: Boolean, default: false},
}, {timestamps: true})
mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task') // We are retrieving this Schema from our Models, named 'User'

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	Task.find({}, function(err, tasks){
		if(err){
			console.log("this is the err:", err);
			res.json({message: "Error", error: err});
		}
		else{
			console.log("it is working");
			res.json({message: "success", data: tasks});
		}
	});
});

app.get('/retrieve/:id', function(req,res){
	Task.find({_id: req.params.id}, function(err, tasks){
		if(err){
			res.json({message: "Error", error:err});
		}
		else{
			res.json({message: "success", data: tasks});
		}
	});
});

app.post('/add', function(req,res){
	let tasks = new Task(req.body);
	tasks.save((err)=>{
		if (err){
			res.json({error:err});
		}
		else {
			res.json({data:tasks});
		}
	});
});

app.put('/update', function(req,res){
	Task.findOne({_id:req.params.id},(err)=>{
    	task.title = req.body.title;
    	task.description = req.body.description;
    	task.completed = req.body.completed;
    	task.save(function(err, tasks){
	        if(err){
	          res.json({});
	        }
	        else{	
	          res.json({tasks: tasks});
	        }
    	});  	
	});
});

app.delete('/remove', function(req,res){
	Task.remove({_id: req.params.id}, function(err){
		if(err){
			res.json({});
		}
		else{
			res.json({tasks:tasks});
		}
	});
});



app.listen(8000, function() {
    console.log("listening on port 8000");
})

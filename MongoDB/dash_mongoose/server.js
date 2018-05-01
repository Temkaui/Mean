// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
//require mongoose, and connect to the MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animal_goose');
// Use native promises
mongoose.Promise = global.Promise;

var AnimalsSchema = new mongoose.Schema({
 type_name: {type: String, required: true, minlength: 2, maxlength: 255},
 info:{type: String, required: true, minlength: 10, maxlength: 1024}
}, {timestamps: true})
mongoose.model('Animals', AnimalsSchema); // We are setting this Schema in our Models as 'User'
var Animals = mongoose.model('Animals')
 // We are retrieving this Schema from our Models, named 'User'

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Animals.find({}, function(err, animals) {
        // This is the method that finds all of the users from the database
        // Notice how the first parameter is the options for what to find and the second is the
        //   callback function that has an error (if any) and all of the users
        // Keep in mind that everything you want to do AFTER you get the users from the database must
        //   happen inside of this callback for it to be synchronous 
        // Make sure you handle the case when there is an error, as well as the case when there is no error

        if (err) console.log("Error");
        else {
            console.log(animals);
            res.render('index', {animals: animals});
        }
    })
})

app.post('/mongooses', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var animals = new Animals({type_name: req.body.type_name, info: req.body.info});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  animals.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/');
    }
  });
});

app.get('/mongooses/new', function(req,res){
  res.render('new');
});

app.get('/mongooses/:id', function(req,res){
  Animals.find({_id: req.params.id}, function(err,animal){
    if(err){
      console.log(err);
    }
    else{
      console.log(animal)
      res.render('show', {animal: animal});
    }
  });

});

app.get('/mongooses/edit/:id', function(req,res){
  Animals.find({_id:req.params.id}, function(err,animal){
    if(err){
      console.log(err);
    }
    else{
      res.render('edit', {animal:animal});
    }
  })
})
app.post('/mongooses/edit', function(req, res){
  Animals.update({_id:req.params.id}, req.body, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
      res.redirect('/');
    }
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
//require mongoose, and connect to the MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// Use native promises
mongoose.Promise = global.Promise;

var QuotesSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 2, maxlength: 255},
 quote:{type: String, required: true, minlength: 10, maxlength: 1024}
}, {timestamps: true})
mongoose.model('Quotes', QuotesSchema); // We are setting this Schema in our Models as 'User'
var Quotes = mongoose.model('Quotes') // We are retrieving this Schema from our Models, named 'User'

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
    res.render('index');
})

app.post('/quotes', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var quote = new Quotes({name: req.body.name, quote: req.body.quote});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  quote.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log(err);
      res.render('index', {errors: quote.errors})
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/quotes');
    }
  })
})
app.get('/quotes', function(req,res){
  Quotes.find({}, function(err, quotes) {
        
        if (err){
          console.log("Error");
          res.render('quotes', {errors: quote.errors});
        } 
        else {
            console.log(quotes);
            res.render('quotes', {quotes: quotes});
        }
    })
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

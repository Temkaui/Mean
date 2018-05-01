var express      = require('express');
var app          = express();
var moment       = require('moment');
var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/dashboard');

var Schema     = mongoose.Schema;

var PostSchema = new mongoose.Schema({
 name: { type: String, required: true },
 text: { type: String, required: true }, 
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}], 
}, {timestamps: true });
//}, { timestamps: true }, { usePushEach: true });
// The 'type' property of the object inside of the array is an attribute
// that tells Mongoose what to look for.
mongoose.model('Post', PostSchema); // We are setting this Schema in our Models as 'User'
var Post = mongoose.model('Post') // We are retrieving this Schema from our Models, named 'User'

var CommentSchema = new mongoose.Schema({
 // since this is a reference to a different document, the _ is the naming convention!
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},
 name: { type: String, required: true },
 text: { type: String, required: true },
}, {timestamps: true });
//}, {timestamps: true }, { usePushEach: true });
mongoose.model('Comment', CommentSchema); // We are setting this Schema in our Models as 'User'
var Comment = mongoose.model('Comment')


var ObjectId = require('mongodb').ObjectId;

var bodyParser = require('body-parser');
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    Post.find({})
     .populate('comments')
     .exec(function(err, posts) {
          console.log(posts)
          res.render('index', {posts: posts});
    });
})

app.post('/posts', function(req, res) {
    //console.log("POST DATA", req.body);
    var post = new Post(req.body);
    post.save(function(err){
        if(err){
            console.log(post.errors)
            res.render('index', {errors: post.errors})
        }
        else {
          console.log(post);
            res.redirect('/');
        }
    });
})

// route for creating one comment with the parent post id
app.post('/posts/:id/comment', function (req, res){
    var comment = new Comment(req.body);
    var id = req.params.id;
    var o_id = new ObjectId(id);
    comment._post = o_id;
    comment.save(function(err){

    Post.findOneAndUpdate({_id: req.params.id},{ $push: { comments: comment } }, function(err, post){
        if(err) console.log("Something wrong when updating data"); 
        //console.log(post);  
        res.redirect('/');
        });
    });
 });

app.listen(8000, function() {
    console.log("listening on port 8000");
})
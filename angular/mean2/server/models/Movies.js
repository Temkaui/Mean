let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.model('Movies',new mongoose.Schema({
	title:{type:String,required:true,minlength:2,maxlength:255},
	reviews: [{type:ObjectId, ref:"Reviews"}]
},{timestamps:true}));
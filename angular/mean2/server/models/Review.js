let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.model('Reviews',new mongoose.Schema({
	name:{type:String,required:true,minlength:2,maxlength:255},
	star:{type:Number, required: true},
	review:{type:String,required:true,minlength:2,maxlength:255},
	movie:{type:ObjectId, ref:"Movies"},
},{timestamps:true}));
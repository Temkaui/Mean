let mongoose = require("mongoose");
let Movies = mongoose.model("Movies")


class MovieController{
	
	all(req,res){
		Movies.find({}).populate({
			model:"Reviews",
			path: "reviews"
		}).exec((err,movies)=>{
			if(err){
				return res.json({messages:err});
			}
			else{
				return res.json(movies);
			}
		});
	}



	create_movie(req,res){
		console.log(req);
		console.log("in create_movie");
		Movies.findOne({title:req.body.title}, (err,movie)=>{
			if(movie){
				return res.json({errors: "This Movie is already exist, please type different name"});
			}
			else{
				let movie = new Movies({
					title: req.body.title
				}).populate(movie.reviews)
				.exec((err)=>{
					if(err){
						return res.json({errors: "can't populate movie document"})
					}
					else{
						movie.save((err)=>{
					if(err){
						return res.json({errors: "Movie title, name, review must be 3 letters or more"});
					}
					else{
						let review = new Reviews({
							name: req.body.name,
							star: req.body.star,
							review: req.body.review
						})
						review.movie = req.body.id;
						review.save((err)=>{
							if(err){
								return res.json({errors: "this is not working"})
							}
							else{
								console.log(movie)
								return res.json(movie);
							}
						})
						return res.json(movie);
					}
				});
					}
				});					
			}
		});

	}



	show_review(req,res){
		Movies.findOne({_id:req.params.id}).populate({
			model: "Reviews",
			path: "reviews"
		}).exec((err,movies)=>{
			if(err){
				return res.json({errors: err});
			}
			else{
				return res.json(movies);
			}
		})
	}


	create_review(req,res){
		let newreview = new Reviews(req.body);
		newreview.movie = req.params.id;

		newreview.save((err)=>{
			if(err){
				return res.json({errors: "can't add review"})
			}
			else{
				return res.json(newreview)
			}
		})
	}
	


	destroy(req,res){
		Movies.findOne({_id:req.params.id}, (err, movies)=>{
			if(movies){
				Movies.remove({_id:req.params.id}, (err)=>{
					if(err){
						return res.json({errors:err});	
					}
					else{
						return res.json("removed");
					}
			
				});
			}
			else{
				return res.json({errors: "couldn't remove"})
			}
		});
	}


}


module.exports = new MovieController();

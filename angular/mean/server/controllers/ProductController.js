let mongoose = require("mongoose");
let Products = mongoose.model("Products")


class MovieController{
	
	all(req,res){
		Products.find({},(err,prods)=>{
			if(err){
				return res.json({errors:"No products to display"})
			}
			else{
				return res.json(prods);
			}
		});
	}


	create(req,res){
		Products.findOne({name:req.body.name}, (err,prods)=>{
			if(prods){
				return res.json({errors: "this product is already exist"})
			}
			else{
				if(req.body.name.length < 2){
					return res.json({errors: "name must be 3 or more character long"})
				}
				else if(req.body.qty.length == 0){
					return res.json({errors: "qty required"})
				}
				else if(req.body.price.length == 0){
					return res.json({errors: "price required"})
				}
				else{
					return res.json(prods);
				}
			}
		});

	}


	show(req,res){
		Products.findOne({_id:req.params.id}, (err,prods)=>{
			if(err){
				return res.json({errors:"No product found"})
			}
			else{
				return res.json(prods);
			}
		});
	}

	destroy(req,res){
		Products.findOne({_id:req.params.id}, (err, prods)=>{
			if(prods){
				Products.remove({_id:req.params.id}, (err)=>{
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

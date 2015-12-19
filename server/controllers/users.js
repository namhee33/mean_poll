var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return{
		user_index: function(req, res){
			User.find({}, function(err, results){
				if(err){
					console.log(err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},
		get_user_by_name: function(req, res){
			User.findOne({name: req.params.name}, function(err, results){
				res.json(results);
			})
		},
		registerUser: function(req, res){
			console.log("req.body: ", req.body);
			var new_user = new User(req.body);
			new_user.save(function(err){
				
				User.findOne({_id: new_user}, function(err, data){
					
					res.json(data);
				})
			})
		}
	}	
})();


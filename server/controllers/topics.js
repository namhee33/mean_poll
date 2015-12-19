var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');

module.exports = (function(){
	return{

		index: function(req, res){
			console.log('index');
			Topic.find({}).populate('_user').exec(function(err, topics){
				console.log('populated data in server: ', topics);
				res.json(topics);
			})
		},

		create: function(req, res){
			console.log('req.body and uid', req.params.uid, req.body);
			User.findOne({_id: req.params.uid}, function(err, person){
				if(err){
					console.log('error in find user with id ', err);
				}else{
					var topic = new Topic(req.body);
					topic._user = person._id;
					person.topics.push(topic);
					topic.save(function(err){
						person.save(function(err){
							if(err){
								console.log(err);
							}else{
								module.exports.index(req, res);
							}
						})
					})
				}
			});
		},

		remove: function(req, res){
			console.log('user_id', req.body.user_id);
			console.log('topic id', req.body.topic_id);
			User.findByIdAndUpdate(req.body.user_id, {$pull: {topics: req.body.topic_id}}, function(err, data){
				if(err){
					console.log('fail to remove topics from users', err);
					res.json(err);
				}else{
					console.log('successfully remove the topic from the user');
					Topic.remove({_id: req.body.topic_id}, function(err){
						if(err){
							console.log('fail to remove the topics');
						}else{
							console.log('successfully remove the topic');
							module.exports.index(req, res);
						}
					});
				}
			});

		},

		voting: function(req, res){
			console.log('tid', req.params.tid);
			console.log('req body: ', req.body);
		},

		show: function(req, res){
			console.log('topic id to show: ', req.params.tid);
		},

		getTopic: function(req, res){
			console.log('topic id to get: ', req.params.tid);
			Topic.findOne({_id: req.params.tid}, function(err, topic){
				if(err){
					console.log('can not find the topic');
					res.json(err);
				}else{
					res.json(topic);
				}
			});
		},

		voting: function(req, res){
			console.log('topic id for vote: ', req.body.topic_id);
			console.log('voting option name: ', req.body.name);
			var query = {}; //update query
			var option = req.body.name; //option name
			var vc; //current voting count
			
			Topic.findOne({_id:req.body.topic_id}, function(err, data){
				if(err){
					console.log('fail to find any');
				}else{
					if(option == 'option1'){
						vc = data.option1.vote;
						query['option1.vote'] = vc+1;
					}else if(option == 'option2'){
						vc = data.option2.vote;
						query['option2.vote'] = vc+1;
					}else if(option == 'option3'){
						vc=data.option3.vote;
						query['option3.vote'] = vc+1;
					}else if(option == 'option4'){
						vc = data.option4.vote;
						query['option4.vote'] = vc+1;
					}else{
						console.log('wrong option name!!!!');
					}
					console.log(option, vc);
					
					console.log('query to update## ', query);
					Topic.findByIdAndUpdate(req.body.topic_id, query, function(err){
						if(err){
							console.log(err);
						}else{
							console.log('successfully increase voting count');
							Topic.findOne({_id:req.body.topic_id}, function(err, data){
								if(err){
									console.log('fail to find the topic: ');
								}else{
									console.log('successfully find the topic after increasing vote!!');
									res.json(data);
								}
							});
						}
					});
				}
			});
		}
	}
})();
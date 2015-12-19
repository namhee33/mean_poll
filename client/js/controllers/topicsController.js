myApp.controller('topicsController', function($location, $routeParams, userFactory, topicFactory){
	var _this = this;

	this.topics = [];

	topicFactory.index(function(data){
		_this.topics = data;
	})

	if($routeParams.tid !== undefined){
		console.log('$$$$$$$$ topic id to find: ', $routeParams.tid);
		topicFactory.getTopic($routeParams.tid, function(data){
			_this.curr_topic = data;
		});
	}

	this.create = function(uid){
		console.log('userID: ', uid);
		console.log('new topic info: ', this.new_topic);
		this.err_topic = "";
		this.err_option = "";
		var err_status = false;

		if(this.new_topic !== undefined){
			if(this.new_topic.title.length < 8){
				this.err_topic = "Question is too short. It must be at least 8 letters.";
				console.log("Question is too short. It must be at least 8 letters.")
				err_status = true;
			}
			if(this.new_topic.option1.name.length < 3 || this.new_topic.option2.name.length < 3 || this.new_topic.option3.name.length < 3 || this.new_topic.option4.name.length < 3){
				this.err_option = "Option is too short. It must be at least 3 letters.";
				err_status = true;
				console.log("Option is too short. It must be at least 3 letters.");
			}

			if(!err_status){
				this.new_topic.created_at = new Date();
				topicFactory.create(uid, this.new_topic, function(data){
					_this.topics = data;
					_this.new_topic = {};
					err_status = false;
					_this.err_option = "";
					_this.err_topic = "";
					console.log('##### after add topics: ', _this.topics);
					$location.path('/main');
				});
			}	
		}
	}

	this.remove = function(uid, tid){
		topicFactory.remove(uid, tid, function(data){
			_this.topics = data;
			console.log('#### after remove: ', _this.topics);
		})
	}

	this.voting = function(opt_name){
		if(this.curr_topic !== undefined){
			console.log('voting for ', opt_name, this.curr_topic._id);
			topicFactory.voting({name: opt_name, topic_id: this.curr_topic._id}, function(updated_topic){
				_this.curr_topic = updated_topic;
			});
		}
	}
});
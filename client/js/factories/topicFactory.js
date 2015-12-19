myApp.factory('topicFactory', function($http){
	var factory = {};

	factory.index = function(callback){
		$http.get('/index').success(function(output){
			callback(output);
		});
	}
	factory.create = function(uid, new_topic, callback){
		$http.post('/create/'+uid, new_topic).success(function(output){
			callback(output);
		});
	}
	factory.remove = function(uid, tid, callback){
		$http.post('/remove', {user_id: uid, topic_id: tid}).success(function(output){
			callback(output);
		});
	}

	factory.getTopic = function(tid, callback){
		$http.get('/getTopic/'+tid).success(function(output){
			callback(output);
		});
	}

	factory.voting = function(vote_for, callback){
		$http.post('/voting', vote_for).success(function(output){
			callback(output);
		})
	}
	return factory;
});
var users = require('./../controllers/users.js');
var topics = require('./../controllers/topics.js');

//## add more controllers here 

module.exports = function(app){
	app.get('/user_index', function(req, res){
		users.user_index(req, res);
	});

	app.get('/get_user_by_name/:name', function(req, res){
		users.get_user_by_name(req, res);
	});

	app.post('/registerUser', function(req, res){
		users.registerUser(req, res);
	});

	app.post('/create/:uid', function(req, res){
		topics.create(req, res);
	});

	app.get('/index', function(req, res){
		topics.index(req, res);
	});

	app.post('/remove', function(req, res){
		topics.remove(req,res);
	});

	app.post('/voting/:tid', function(req, res){
		topics.voting(req, res);
	});

	app.get('/show/:tid', function(req, res){
		topics.show(req, res);
	});

	app.get('/getTopic/:tid', function(req, res){
		topics.getTopic(req, res);
	});

	app.post('/voting', function(req, res){
		topics.voting(req, res);
	});

}
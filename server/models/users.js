var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type:String, required: true},
	topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}]
});

var TopicSchema = new mongoose.Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'User'}, 
	title: {type:String, required: true, minlength: 8},
	created_at: {type: Date, default: Date()},
	option1: {name: {type: String, minlength: 3}, vote: {type: Number, default: 0}},
	option2: {name: {type: String, minlength: 3}, vote: {type: Number, default: 0}},
	option3: {name: {type: String, minlength: 3}, vote: {type: Number, default: 0}},
	option4: {name: {type: String, minlength: 3}, vote: {type: Number, default: 0}}
});

mongoose.model('User', UserSchema);
mongoose.model('Topic', TopicSchema);
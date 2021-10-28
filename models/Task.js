const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	taskname: {
		type: String,
		unique: true,
		required: true,
	},
	description: {
		type: String,
		required:true,
	}
});

taskSchema.set('toJSON', {
	virtuals:true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
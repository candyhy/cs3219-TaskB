const Task = require('../models/Task');
const mongoose = require('mongoose');

const hasMissingTaskNameField = (req) => {
	return req.body.taskname == undefined || req.body.taskname.length == 0;
}

const hasMissingisDoneField = (req, res) => {
	return req.body.isDone == undefined || req.body.isDone.length == 0;
}

const hasMissingFields = (req) => {
	return req.body == undefined || req.body.length == 0;
}


exports.create_task = (req, res) => {

	if (hasMissingFields(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing taskname and isDone fields"
			}
		});
		return;
	}

	if (hasMissingTaskNameField(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing taskname field"
			}
		});
		return;
	}
	if (hasMissingisDoneField(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing isDone field"
			}
		});
		return;
	}

	const taskname = req.body.taskname;
	const isDone = req.body.isDone;
	Task.find({taskname: taskname})
		.then((result) => {
			if (Object.keys(result).length == 0) {

				const task = new Task({
					taskname : taskname,
					isDone: isDone
				});
				task.save().then((result) => {
					res.status(200).send({
						status: "success",
						data: {
							message: "Create task successful"
						}
					});
					return;    
					});  		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "A task with taskname " + taskname + " already exists"
            		}
        		});
        		return;
			}
		}).catch((err) => {
			res.status(500).json({
				status: "error",
				error_message: "Error writing to database"
			});
		});
};


exports.delete_task = (req, res) => {
	if (hasMissingTaskNameField(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing taskname field"
			}
		});
		return;
	}
	const taskname = req.body.taskname;
	Task.find({taskname: taskname})
		.then((result) => {
			if (Object.keys(result).length > 0) {
				Task.deleteOne({taskname: taskname}, err => {
					if (err) {
						console.log(err);
						res.status(404).send({
            				status: "failure",
		            		data: {
		                		message: "Error deleting task from database"
		            		}
        				});
        				return;
					}
					res.status(200).send({
						status: "success",
						data: {
							message: "Task deletion successful"
						}
					});
					return;
				});		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "No task with taskname " + taskname + " exists"
            		}
        		});
        		return;
			}
		}).catch((err) => {
			res.status(500).json({
				status: "error",
				error_message: "Error reading from database"
			});
	});	
};

exports.update_task = (req, res) => {
	if (hasMissingFields(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing taskname and isDone fields"
			}
		});
		return;
	}

	if (hasMissingTaskNameField(req)) {
		res.status(400).send({
				status: "failure",
				data: {
					message: "Missing taskname field"
				}
			});
		return;
	}
	if (hasMissingisDoneField(req)) {
		res.status(400).send({
				status: "failure",
				data: {
					message: "Missing isDone field"
				}
			});
		return;
	}
	const taskname = req.body.taskname;
	const isDone = req.body.isDone;
	Task.find({taskname: taskname})
		.then((result) => {
			if (Object.keys(result).length > 0) {
				Task.findOneAndUpdate({taskname: taskname}, {isDone: isDone}, 
					err => {
					if (err) {
						console.log(err);
						res.status(404).send({
            				status: "failure",
		            		data: {
		                		message: "Error updating task description in database"
		            		}
        				});
        				return;
					}
					res.status(200).send({
						status: "success",
						data: {
							message: "Task status update successful"
						}
					});
					return;
				});  		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "No task with taskname " + taskname + " exists"
            		}
        		});
        		return;
			}
		}).catch((err) => {
			res.status(500).json({
				status: "error",
				error_message: "Error writing to database"
			});
		});
	return;
};


exports.get_tasks = (req, res) => {
	Task.find({}, {_id: 0, __v: 0})
	.then((result) => {
		if (Object.keys(result).length > 0) {
			res.status(200).send({
				status: "success",
				data: {
					message: JSON.parse(JSON.stringify(Object(result)))
				}
			});
		} else {
			res.status(404).send({
				status: "failure",
				data: {
					message: "No tasks found"
				}
			});
		}
	}).catch((err) => {
		res.status(500).json({
			status: "error",
			error_message: "Error reading from database"
		});
	});	
	return;
}




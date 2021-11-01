const Task = require('../models/Task');
const mongoose = require('mongoose');

const hasMissingTaskNameField = (req) => {
	return req.body.taskname == undefined || req.body.length == 0;
}

/*const isPasswordAndUserMatch = (req, res) => {
	const username = req.body.username;
	User.find({username: username})
        .then((result) => {
            if (Object.keys(result).length == 0) {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "Invalid username"
            		}
        		});
        		return;
			} else {
				data = result[0];
				const passwordField = data.password;
				const inputPassword = req.body.password;

				if (passwordField == inputPassword) {
					res.status(200).send({
	            		status: "success",
	            		data: {
	                		message: "Valid password"
	            		}
	        		});
				} else {
					res.status(200).send({
	            		status: "failure",
	            		data: {
	                		message: "Invalid password"
	            		}
	        		});
				}
			}
        });
};*/

exports.create_task = (req, res) => {

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
			if (Object.keys(result).length == 0) {

				const task = new Task({
					taskname : taskname
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
		});
};

/*exports.user_login = (req, res) => {
	if (hasMissingAuthFields(req)) {
		res.status(400).send({ 
			status: "failure",
			data: {
				message: "Missing username and password field"
			}
		});
		return;
	}

	if (hasMissingUserNameField(req)) {
		res.status(400).send({
				status: "failure",
				data: {
					message: "Missing username field"
				}
			});
		return;
	}

	if (hasMissingPasswordField(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing password field"
			}
		});
		return;
	}

	isPasswordAndUserMatch(req, res);
	return;
};*/

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
		});
};

exports.update_task = (req, res) => {
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
	const newTaskname = req.body.newTaskname;
	Task.find({taskname: taskname})
		.then((result) => {
			if (Object.keys(result).length > 0) {
				Task.findOneAndUpdate({taskname: taskname}, {taskname: newTaskname}, 
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
							message: "Task description update successful"
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
		});

};

/*exports.find_task = (req, res) => {
	const taskname = req.query.taskname;
	Task.find({taskname: taskname})
		.then((result) => {
			if (Object.keys(result).length > 0) {
				res.status(200).send({
					status: "success",
					data: {
						message: "Task: " + taskname + " exists"
					}
				});
				return;
 		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "No task with taskname " + taskname + " exists"
            		}
        		});
        		return;
			}
		});
}*/

exports.get_tasks = (req, res) => {
	Task.find({}, {_id: 0, __v: 0}).then((result) => {
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
	});
	
	return;
}




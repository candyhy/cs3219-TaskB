const User = require('../models/User');
const mongoose = require('mongoose');

const hasMissingUserNameField = (req) => {
	return req.body.username == undefined;
}

const hasMissingPasswordField = (req) => {
	return req.body.password == undefined;
};

const hasMissingAuthFields = (req) => {
	return req.body.username == undefined && req.body.password == undefined; 
}

const isPasswordAndUserMatch = (req, res) => {
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
};

exports.create_account = (req, res) => {

	if (hasMissingAuthFields(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing username and password fields"
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
	const username = req.body.username;
	User.find({username: username})
		.then((result) => {
			if (Object.keys(result).length == 0) {
				const password = req.body.password

				const user = new User({
					username : username,
					password : password,
				});
				user.save().then((result) => {
					res.status(200).send({
						status: "success",
						data: {
							message: "Create account successful"
						}
					});
					return;    
					});  		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "A user with username " + username + " already exists"
            		}
        		});
        		return;
			}
		});
};

exports.user_login = (req, res) => {
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
};

exports.delete_user = (req, res) => {
	if (hasMissingUserNameField(req)) {
		res.status(400).send({
			status: "failure",
			data: {
				message: "Missing username field"
			}
		});
		return;
	}
	const username = req.body.username;
	User.find({username: username})
		.then((result) => {
			if (Object.keys(result).length > 0) {
				User.deleteOne({username: username}, err => {
					if (err) {
						console.log(err);
						res.status(404).send({
            				status: "failure",
		            		data: {
		                		message: "Error deleting user from database"
		            		}
        				});
        				return;
					}
					res.status(200).send({
						status: "success",
						data: {
							message: "User deletion successful"
						}
					});
					return;
				});  		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "No user with username " + username + " exists"
            		}
        		});
        		return;
			}
		});
};

exports.update_password = (req, res) => {
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

	const username = req.body.username;
	const password = req.body.password;
	User.find({username: username})
		.then((result) => {
			if (Object.keys(result).length > 0) {
				User.findOneAndUpdate({username: username}, {password: password}, err => {
					if (err) {
						console.log(err);
						res.status(404).send({
            				status: "failure",
		            		data: {
		                		message: "Error updating user password in database"
		            		}
        				});
        				return;
					}
					res.status(200).send({
						status: "success",
						data: {
							message: "Password update successful"
						}
					});
					return;
				});  		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "No user with username " + username + " exists"
            		}
        		});
        		return;
			}
		});

};

exports.find_user = (req, res) => {
	const username = req.query.username;
	User.find({username: username})
		.then((result) => {
			if (Object.keys(result).length > 0) {
				res.status(200).send({
					status: "success",
					data: {
						message: "User exists"
					}
				});
				return;
 		
        	} else {
				res.status(404).send({
            		status: "failure",
            		data: {
                		message: "No user with username " + username + " exists"
            		}
        		});
        		return;
			}
		});
}

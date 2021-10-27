const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/create_account', userController.create_account);
router.post('/user_login', userController.user_login);
router.delete('/delete_user', userController.delete_user);
router.put('/update_password', userController.update_password);
router.get('/find_user', userController.find_user);

module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/create_account', userController.create_account);
router.post('/user_login', userController.user_login);

module.exports = router;
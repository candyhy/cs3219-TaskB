const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/create_task', taskController.create_task);
router.delete('/delete_task', taskController.delete_task);
router.put('/update_task', taskController.update_task);
router.get('/get_tasks', taskController.get_tasks);

module.exports = router;
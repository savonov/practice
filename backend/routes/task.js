const express = require('express');
const router = express.Router();

const taskController = require('./../controllers/task');

router.get('/', taskController.list);
router.get('/:id', taskController.getById);
router.post('/', taskController.addWithItems);
router.patch('/:id', taskController.updateWithItems);
router.delete('/:id', taskController.delete);

module.exports = router;

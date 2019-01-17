const express = require('express');
const router = express.Router();

const taskController = require('./../controllers/task');

router.get('/', taskController.list);
router.get('/:id', taskController.getById);
router.post('/', taskController.add);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);
router.post('/add_with_item', taskController.addWithItems);

module.exports = router;
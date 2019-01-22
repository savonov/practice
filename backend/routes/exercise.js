const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercise');

router.get('/', exerciseController.list);
router.get('/:id', exerciseController.getById);
router.post('/', exerciseController.add);
router.patch('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);
router.post('/add_with_tasks', exerciseController.addWithTasks);

module.exports = router;
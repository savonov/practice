const express = require('express');
const router = express.Router();

const itemController = require('./../controllers/item');

router.get('/', itemController.list);
router.get('/:id', itemController.getById);
router.post('/', itemController.add);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;
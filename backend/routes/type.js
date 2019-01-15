const express = require('express');
const router = express.Router();

const typeController = require('./../controllers/type');


router.get('/', typeController.list);
router.get('/:id', typeController.getById);
router.post('/', typeController.add);
router.put('/:id', typeController.update);
router.delete('/:id', typeController.delete);

module.exports = router;
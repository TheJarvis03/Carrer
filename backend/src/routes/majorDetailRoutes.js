const express = require('express');
const router = express.Router();
const majorDetailController = require('../controllers/majorDetailController');


router.get('/', majorDetailController.getAll);
router.get('/:code', majorDetailController.getByCode);
router.post('/', majorDetailController.create);
router.put('/:code', majorDetailController.update);
router.delete('/:code', majorDetailController.delete);

module.exports = router;

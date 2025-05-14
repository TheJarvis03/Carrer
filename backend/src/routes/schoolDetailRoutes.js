const express = require('express');
const router = express.Router();
const schoolDetailController = require('../controllers/schoolDetailController');

router.get('/', schoolDetailController.getAll);
router.get('/:code', schoolDetailController.getByCode);
router.post('/', schoolDetailController.create);
router.put('/:code', schoolDetailController.update);
router.delete('/:code', schoolDetailController.delete);

module.exports = router;

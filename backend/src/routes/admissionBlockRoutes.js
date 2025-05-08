const express = require('express');
const router = express.Router();
const admissionBlockController = require('../controllers/admissionBlockController');

router
    .route('/')
    .get(admissionBlockController.getAllBlocks)
    .post(admissionBlockController.createBlock);

router.get('/active', admissionBlockController.getActiveBlocks);
router.get(
    '/university/:universityId',
    admissionBlockController.getBlocksByUniversity,
);

router
    .route('/:id')
    .get(admissionBlockController.getBlockById)
    .put(admissionBlockController.updateBlock)
    .delete(admissionBlockController.deleteBlock);

module.exports = router;

const express = require('express');
const router = express.Router();
const admissionMethodController = require('../controllers/admissionMethodController');

router
    .route('/')
    .get(admissionMethodController.getAllMethods)
    .post(admissionMethodController.createMethod);

router
    .route('/:id')
    .get(admissionMethodController.getMethodById)
    .put(admissionMethodController.updateMethod)
    .delete(admissionMethodController.deleteMethod);

module.exports = router;

const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Base routes
router.get('/', schoolController.getAllSchools);
router.get('/:id', schoolController.getSchoolById);

// Search route
router.get('/search', schoolController.searchSchools);

// Data management routes
router.post('/', schoolController.createSchool);
router.put('/:id', schoolController.updateSchool);
router.delete('/:id', schoolController.deleteSchool);

module.exports = router;

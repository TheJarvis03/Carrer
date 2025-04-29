// src/routes/majorRoutes.js
const express = require('express');
const router = express.Router();
const majorController = require('../controllers/majorController');

router.get('/', majorController.getAllMajors);

module.exports = router;

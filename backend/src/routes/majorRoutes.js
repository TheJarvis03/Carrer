const express = require('express');
const router = express.Router();
const { getAllMajors } = require('../controllers/majorController');

router.get('/', getAllMajors);

module.exports = router;

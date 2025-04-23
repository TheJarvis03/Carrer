const express = require('express');
const router = express.Router();
const { getAllScores } = require('../controllers/admissionScoreController');

console.log('Setting up admission score routes');
router.get('/', getAllScores);

module.exports = router;

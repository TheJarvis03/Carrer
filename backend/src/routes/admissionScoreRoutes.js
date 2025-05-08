const express = require('express');
const router = express.Router();
const { getAllScores } = require('../controllers/admissionScoreController');

router.get('/', getAllScores);

module.exports = router;

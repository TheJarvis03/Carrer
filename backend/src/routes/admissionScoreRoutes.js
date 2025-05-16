const express = require('express');
const router = express.Router();
const {
    getAllScores,
    getScoresByUniversity,
    getScoresByMajor,
} = require('../controllers/admissionScoreController');

router.get('/', getAllScores);
router.get('/school/:schoolCode', getScoresByUniversity);
router.get('/major/:majorCode', getScoresByMajor);

module.exports = router;

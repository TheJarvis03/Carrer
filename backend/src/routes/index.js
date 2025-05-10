const express = require('express');
const router = express.Router();
const careerRoutes = require('./careerRoutes');
const majorRoutes = require('./majorRoutes');
const schoolRoutes = require('./schoolRoutes');
const admissionBlockRoutes = require('./admissionBlockRoutes');
const admissionMethodRoutes = require('./admissionMethodRoutes');
const admissionScoreRoutes = require('./admissionScoreRoutes');
const userRoutes = require('./userRoutes');
const majorDetailRoute = require('./majorDetailRoutes');

router.use('/search/careers', careerRoutes);
router.use('/search/majors', majorRoutes);
router.use('/search/schools', schoolRoutes);
router.use('/admissionBlocks', admissionBlockRoutes);
router.use('/admissionMethods', admissionMethodRoutes);
router.use('/admissionScores', admissionScoreRoutes);
router.use('/users', userRoutes);
router.use('/major/detail', majorDetailRoute);

module.exports = router;

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
const schoolDetailRoutes = require('./schoolDetailRoutes');

router.use('/careers', careerRoutes);
router.use('/majors', majorRoutes);
router.use('/schools', schoolRoutes);
router.use('/admissionBlocks', admissionBlockRoutes);
router.use('/admissionMethods', admissionMethodRoutes);
router.use('/admissionScores', admissionScoreRoutes);
router.use('/users', userRoutes);
router.use('/major/detail', majorDetailRoute);
router.use('/school/detail', schoolDetailRoutes);

module.exports = router;

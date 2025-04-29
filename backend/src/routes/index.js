const express = require('express');
const router = express.Router();
const careerRoutes = require('./careerRoutes');
const majorRoutes = require('./majorRoutes');
const admissionBlockRoutes = require('./admissionBlockRoutes');
const admissionMethodRoutes = require('./admissionMethodRoutes');

router.use('/search/careers', careerRoutes);
router.use('/search/majors', majorRoutes);
router.use('/admissionBlocks', admissionBlockRoutes);
router.use('/admissionMethods', admissionMethodRoutes);

module.exports = router;

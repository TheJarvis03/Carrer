const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const careerRoutes = require('./careerRoutes');
const trainingFieldRoutes = require('./trainingFieldRoutes');

router.use('/users', userRoutes);
router.use('/careers', careerRoutes);
router.use('/training-fields', trainingFieldRoutes);

module.exports = router;
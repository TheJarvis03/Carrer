const express = require('express');
const router = express.Router();
const careerRoutes = require('./careerRoutes');
const majorRoutes = require('./majorRoutes');

router.use('/careers', careerRoutes);
router.use('/majors', majorRoutes);

module.exports = router;

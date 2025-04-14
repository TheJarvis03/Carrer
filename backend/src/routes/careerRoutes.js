const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const careerController = require('../controllers/careerController');

router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);
router.post('/', auth, checkRole(['admin']), careerController.createCareer);
router.put('/:id', auth, checkRole(['admin']), careerController.updateCareer);
router.delete(
  '/:id',
  auth,
  checkRole(['admin']),
  careerController.deleteCareer,
);

module.exports = router;

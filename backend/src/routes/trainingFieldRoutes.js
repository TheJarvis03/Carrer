const express = require('express');
const router = express.Router();

// Placeholder routes until controller is implemented
router.get('/', (req, res) => {
  res.json({ message: 'Get all training fields' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get training field ${req.params.id}` });
});

module.exports = router;

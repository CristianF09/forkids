const express = require('express');
const router = express.Router();

// Exemplu de route
router.get('/', (req, res) => {
  res.json({ message: 'PDFs route works' });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Temporary PDF storage (replace with MongoDB model later)
const pdfs = [
  {
    id: 1,
    title: 'Math Workbook',
    description: 'Basic math exercises for kids',
    price: 9.99,
    imageUrl: '/images/math-workbook.jpg',
    pdfUrl: '/pdfs/math-workbook.pdf'
  },
  {
    id: 2,
    title: 'Alphabet Book',
    description: 'Learn the alphabet with fun activities',
    price: 7.99,
    imageUrl: '/images/alphabet-book.jpg',
    pdfUrl: '/pdfs/alphabet-book.pdf'
  }
];

// Get all PDFs
router.get('/', (req, res) => {
  res.json(pdfs);
});

// Get single PDF
router.get('/:id', (req, res) => {
  const pdf = pdfs.find(p => p.id === parseInt(req.params.id));
  if (!pdf) {
    return res.status(404).json({ message: 'PDF not found' });
  }
  res.json(pdf);
});

// Add new PDF (protected route - add auth middleware later)
router.post('/', (req, res) => {
  const { title, description, price, imageUrl, pdfUrl } = req.body;
  
  const newPdf = {
    id: pdfs.length + 1,
    title,
    description,
    price,
    imageUrl,
    pdfUrl
  };

  pdfs.push(newPdf);
  res.status(201).json(newPdf);
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Serve PDF files for download
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const pdfDir = path.join(__dirname, '..', 'public', 'pdfs');
  const safeBase = path.resolve(pdfDir);
  const resolvedPath = path.resolve(pdfDir, filename);

  // Prevent path traversal
  if (!resolvedPath.startsWith(safeBase + path.sep) && resolvedPath !== safeBase) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  // Check if file exists
  if (!fs.existsSync(resolvedPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // Get file stats
  const stats = fs.statSync(resolvedPath);
  const fileSizeInMB = stats.size / (1024 * 1024);

  console.log(`📥 Download request for: ${filename} (${fileSizeInMB.toFixed(2)} MB)`);

  // Set headers for file download
  const isZip = filename.toLowerCase().endsWith('.zip');
  const contentType = isZip ? 'application/zip' : 'application/pdf';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Length', stats.size);

  // Create read stream and pipe to response
  const fileStream = fs.createReadStream(resolvedPath);
  fileStream.pipe(res);

  // Handle errors
  fileStream.on('error', (error) => {
    console.error(`❌ Error streaming ${filename}:`, error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error streaming file' });
    }
  });
});

// List available PDFs
router.get('/', (req, res) => {
  const pdfDir = path.join(__dirname, '..', 'public', 'pdfs');
  
  if (!fs.existsSync(pdfDir)) {
    return res.status(404).json({ error: 'PDF directory not found' });
  }
  
  try {
    const files = fs.readdirSync(pdfDir);
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    
    const fileList = pdfFiles.map(file => {
      const filePath = path.join(pdfDir, file);
      const stats = fs.statSync(filePath);
      const fileSizeInMB = stats.size / (1024 * 1024);
      
      return {
        filename: file,
        size: `${fileSizeInMB.toFixed(2)} MB`,
        downloadUrl: `/api/download/${file}`
      };
    });
    
    res.json({
      message: 'Available PDF files',
      files: fileList
    });
  } catch (error) {
    console.error('❌ Error reading PDF directory:', error);
    res.status(500).json({ error: 'Error reading directory' });
  }
});

module.exports = router;

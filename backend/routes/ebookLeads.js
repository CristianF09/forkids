const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // ✅ IMPORTANT - ADAUGĂ
const EbookLead = require('../models/EbookLead');
const path = require('path');
const fs = require('fs');

// ✅ RUTA SIMPLIFICATĂ - FĂRĂ MONGODB PENTRU TESTARE
router.post('/download-halloween-ebook', async (req, res) => {
  console.log('🔍 START - Processing Halloween ebook download');
  
  try {
    const { firstName, lastName, email, phone } = req.body;
    console.log('📥 Date primite:', { firstName, lastName, email, phone });

    // Validare câmpuri obligatorii
    if (!firstName || !lastName || !email || !phone) {
      console.log('❌ Validare eșuată - câmpuri lipsă');
      return res.status(400).json({ 
        success: false,
        message: 'Toate câmpurile sunt obligatorii' 
      });
    }

    // ✅ SALVARE ÎN MONGODB (dacă este conectat)
    if (mongoose.connection.readyState === 1) {
      try {
        console.log('💾 Încercăm să salvăm în MongoDB...');
        const lead = new EbookLead({ 
          firstName, 
          lastName, 
          email, 
          phone 
        });
        await lead.save();
        console.log(`✅ Lead salvat în MongoDB: ${email}`);
      } catch (dbError) {
        console.log('⚠️ Nu s-a putut salva în MongoDB, continuăm fără:', dbError.message);
        // CONTINUĂ CHIAR DACĂ MONGODB DA EROARE
      }
    } else {
      console.log('⚠️ MongoDB nu este conectat - doar logăm datele');
      console.log('🎃 Lead primit (nu salvat):', { firstName, lastName, email, phone });
    }

    // ✅ CALE PDF
    const ebookPath = path.join(__dirname, '..', 'public', 'Ebooks', 'Corcodusa Halloween .pdf');
    console.log('🔍 Căutăm fișierul la:', ebookPath);
    
    // Verifică existența fișierului
    if (!fs.existsSync(ebookPath)) {
      console.error('❌ Fișierul PDF nu există:', ebookPath);
      return res.status(404).json({
        success: false,
        message: 'E-book-ul nu este disponibil momentan'
      });
    }

    console.log('✅ Fișier găsit, trimitem PDF...');

    // Obține informații despre fișier
    const stats = fs.statSync(ebookPath);
    console.log(`📄 Mărime fișier: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);

    // ✅ TRIMITE FIȘIERUL PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Corcodusa-Halloween-Ebook-Gratuit.pdf"');
    res.setHeader('Content-Length', stats.size);
    
    const fileStream = fs.createReadStream(ebookPath);
    fileStream.pipe(res);

    fileStream.on('end', () => {
      console.log('✅ Download completat pentru:', email);
    });

    fileStream.on('error', (error) => {
      console.error('❌ Eroare la trimiterea fișierului:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          success: false,
          message: 'Eroare la descărcarea fișierului' 
        });
      }
    });

  } catch (error) {
    console.error('❌ Eroare generală:', error);
    res.status(500).json({ 
      success: false,
      message: 'Eroare server: ' + error.message 
    });
  }
});

// ✅ Ruta de test
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Ruta ebook-leads funcționează!',
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

module.exports = router;

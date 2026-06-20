const express = require('express');
const router = express.Router();

const { sendPDFWithOptimization } = require('../services/pdfDeliveryService');

// Reuse internal helpers from webhook route
let sendCompletePackage, sendPromoPackage;
try {
  const webhookModule = require('./webhook');
  sendCompletePackage = webhookModule.sendCompletePackage;
  sendPromoPackage = webhookModule.sendPromoPackage;
} catch (err) {
  // Fallback: not available
}

// Guard test routes behind an env flag
function ensureEnabled(req, res, next) {
  if (process.env.ENABLE_TEST_ROUTES === 'true') return next();
  return res.status(403).json({ error: 'Test routes disabled. Set ENABLE_TEST_ROUTES=true to enable.' });
}

// POST /api/test/send
// Body: { email, product: 'Alfabetul'|'Numere'|'FormeSiCulori'|'CarteDeColorat'|'LabirinturiMagice'|'JocuriSiActivitatiEducationale'|'PachetPromo'|'Pachet Complet', amount?, currency? }
router.post('/send', ensureEnabled, async (req, res) => {
  const { email, product, amount: overrideAmount, currency: overrideCurrency } = req.body || {};

  if (!email || !product) {
    return res.status(400).json({ error: 'Missing email or product' });
  }

  const currency = (overrideCurrency || 'RON').toUpperCase();

  try {
    if (product === 'Pachet Complet' || product === 'PachetComplet') {
      if (!sendCompletePackage) {
        return res.status(500).json({ error: 'sendCompletePackage not available' });
      }
      const amount = overrideAmount != null ? overrideAmount : 145;
      await sendCompletePackage(email, 'Pachet Complet', amount, currency);
      return res.json({ ok: true, message: 'Complete package sent (ZIP or download link depending on size).' });
    }

    if (product === 'PachetPromo' || product === 'Pachet Promo') {
      if (!sendPromoPackage) {
        return res.status(500).json({ error: 'sendPromoPackage not available' });
      }
      const promoFiles = ['LabirinturiMagice.pdf', 'JocuriSiActivitatiEducationale.pdf', 'BonusCertificatDeAbsovire-PachetPromo.pdf'];
      const amount = overrideAmount != null ? overrideAmount : 99;
      await sendPromoPackage(email, 'Pachet Promo', amount, currency, promoFiles);
      return res.json({ ok: true, message: 'Promo package sent (ZIP or download link depending on size).' });
    }

    // Map product to filename
    let pdfFileName;
    if (product === 'Alfabetul') pdfFileName = 'Alfabetul.pdf';
    else if (product === 'Numere') pdfFileName = 'Numere.pdf';
    else if (product === 'FormeSiCulori' || product === 'Forme si culori' || product === 'Forme și Culori') pdfFileName = 'FormeSiCulori.pdf';
    else if (product === 'CarteDeColorat' || product === 'Carte de Colorat') pdfFileName = 'CarteDeColorat.pdf';
    else if (product === 'LabirinturiMagice' || product === 'Labirinturi Magice') pdfFileName = 'LabirinturiMagice.pdf';
    else if (product === 'JocuriSiActivitatiEducationale' || product === 'Jocuri si Activitati') pdfFileName = 'JocuriSiActivitatiEducationale.pdf';

    if (!pdfFileName) {
      return res.status(400).json({ error: 'Unknown product' });
    }

    const amount = overrideAmount != null ? overrideAmount : 59;
    await sendPDFWithOptimization(email, pdfFileName, product, amount, currency);
    return res.json({ ok: true, message: `${product} sent (attachment or download link depending on size).` });
  } catch (error) {
    console.error('Test send error:', error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;



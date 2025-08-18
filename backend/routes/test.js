const express = require('express');
const router = express.Router();

const { sendPDFWithOptimization } = require('../services/pdfDeliveryService');

// Reuse internal helpers from webhook route for complete package
let sendCompletePackage;
try {
  const webhookModule = require('./webhook');
  sendCompletePackage = webhookModule.sendCompletePackage;
} catch (err) {
  // Fallback: not available
}

// Guard test routes behind an env flag
function ensureEnabled(req, res, next) {
  if (process.env.ENABLE_TEST_ROUTES === 'true') return next();
  return res.status(403).json({ error: 'Test routes disabled. Set ENABLE_TEST_ROUTES=true to enable.' });
}

// POST /api/test/send
// Body: { email: string, product: 'Alfabetul'|'Numere'|'Forme si culori'|'Pachet Complet', amount?: number, currency?: string }
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

      const amount = overrideAmount != null ? overrideAmount : 110;
      await sendCompletePackage(email, product, amount, currency);
      return res.json({ ok: true, message: 'Complete package sent (ZIP or individual, depending on size).' });
    }

    // Map product to filename using products config
    let pdfFileName;
    if (product === 'Alfabetul') pdfFileName = 'Alfabetul.pdf';
    else if (product === 'Numere') pdfFileName = 'Numere.pdf';
    else if (product === 'Forme si culori' || product === 'Forme și Culori' || product === 'FormeSiCulori' || product === 'FormeSICulori') pdfFileName = 'FormeSiCulori.pdf';

    if (!pdfFileName) {
      return res.status(400).json({ error: 'Unknown product' });
    }

    const amount = overrideAmount != null ? overrideAmount : 49;
    await sendPDFWithOptimization(email, pdfFileName, product, amount, currency);
    return res.json({ ok: true, message: `${product} sent as attachment or notification depending on size.` });
  } catch (error) {
    console.error('Test send error:', error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;



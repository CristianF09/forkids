const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const mongoose = require('mongoose');
const ProcessedWebhookEvent = require('../models/ProcessedWebhookEvent');

let stripe = null;
function getStripe() {
  if (!stripe) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
      throw new Error('STRIPE_SECRET_KEY is required');
    }
    stripe = Stripe(stripeSecretKey);
  }
  return stripe;
}

const { sendOrderNotification, sendMail } = require('../services/emailService');
const { sendPDFWithOptimization } = require('../services/pdfDeliveryService');
const { products } = require('../routes/products');

const FROM = '"CorcoDușa" <contact@corcodusa.ro>';

router.post('/', async (req, res) => {
  console.log('🔔 Webhook received:', new Date().toISOString());

  const sig = req.headers['stripe-signature'];

  let event;
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not found in environment variables');
      return res.status(500).send('Webhook secret not configured');
    }

    event = getStripe().webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log('✅ Webhook signature verified, event type:', event.type);
  } catch (err) {
    console.log(`⚠️  Eroare webhook: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Idempotency: skip already-processed Stripe events
  if (mongoose.connection.readyState === 1) {
    try {
      await ProcessedWebhookEvent.create({ eventId: event.id });
    } catch (dupErr) {
      if (dupErr.code === 11000) {
        console.log('🔁 Duplicate Stripe event ignored:', event.id);
        return res.status(200).json({ received: true, duplicate: true });
      }
      console.error('⚠️ Could not record webhook event for idempotency check:', dupErr.message);
    }
  } else {
    console.log('⚠️ MongoDB not connected — skipping webhook idempotency check');
  }

  res.status(200).json({ received: true });

  setImmediate(async () => {
    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_details?.email || session.customer_email;
        const customerName = session.customer_details?.name || 'Customer';
        const sessionId = session.id;

        console.log('💰 Payment completed for session:', sessionId);
        console.log('📧 Customer email:', customerEmail);
        console.log('👤 Customer name:', customerName);

        const isLiveEvent = !!event.livemode;
        if (!isLiveEvent && process.env.ALLOW_STRIPE_TEST !== 'true') {
          console.log('⚠️ Test-mode webhook ignored in production');
          return;
        }

        if (session.payment_status !== 'paid') {
          console.log('⚠️ Session not paid, skipping fulfillment. payment_status:', session.payment_status);
          return;
        }

        let expandedSession = session;
        try {
          if (!session.line_items?.data || session.line_items.data.length === 0 || !session.payment_intent) {
            console.log('🔍 No line items or payment_intent in webhook, retrieving expanded session...');
            expandedSession = await getStripe().checkout.sessions.retrieve(sessionId, { expand: ['line_items', 'payment_intent'] });
            console.log('✅ Retrieved expanded session with line items/payment_intent');
          }
        } catch (error) {
          console.log('⚠️ Could not retrieve expanded session:', error.message);
        }

        try {
          let paymentIntent = expandedSession.payment_intent;
          if (typeof paymentIntent === 'string') {
            paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntent);
          }
          if (!paymentIntent || paymentIntent.status !== 'succeeded' || (paymentIntent.amount_received || 0) <= 0) {
            console.log('⚠️ PaymentIntent not succeeded or no funds received. Skipping fulfillment.', {
              status: paymentIntent?.status,
              amount_received: paymentIntent?.amount_received,
            });
            return;
          }
        } catch (piErr) {
          console.log('⚠️ Could not verify PaymentIntent. Skipping fulfillment. Reason:', piErr.message);
          return;
        }

        if (!customerEmail) {
          console.error('❌ No customer email found in session');
          return;
        }

        let pdfFileName = 'BonusCertificatDeAbsovire-PachetStandard.pdf';
        let productName = 'Pachet Standard';
        let amount = session.amount_total / 100;
        let currency = session.currency?.toUpperCase() || 'RON';
        let isCompletePackage = false;
        let productInfo = null;

        const lineItems = expandedSession.line_items?.data || [];
        if (lineItems.length > 0) {
          const li = lineItems[0];
          const priceId = li.price?.id;
          productInfo = priceId ? products[priceId] : undefined;
          const liDescription = (li.description || '').toLowerCase();
          const liUnitAmount = ((li.amount_total ?? li.amount_subtotal ?? li.price?.unit_amount ?? 0) / 100);

          console.log('🧾 Line item details:', { priceId, liDescription, liUnitAmount });

          if (productInfo) {
            pdfFileName = productInfo.pdf;
            productName = productInfo.displayName || productInfo.name;
            isCompletePackage = productInfo.type === 'complete';
          } else {
            // Fallback detection by description/amount when priceId mapping is unknown
            if (liDescription.includes('pachet') && (liDescription.includes('complet') || liDescription.includes('standard'))) {
              productName = 'Pachet Standard';
              isCompletePackage = true;
            } else if (['alfabet', 'alfabetul'].some(k => liDescription.includes(k))) {
              pdfFileName = 'Alfabetul.pdf';
              productName = 'Alfabetul';
            } else if (['numere', 'număr', 'numar'].some(k => liDescription.includes(k))) {
              pdfFileName = 'Numere.pdf';
              productName = 'Numere';
            } else if (['forme', 'culori'].some(k => liDescription.includes(k))) {
              pdfFileName = 'FormeSiCulori.pdf';
              productName = 'Forme și Culori';
            } else if ([110, 89, 145].includes(Math.round(liUnitAmount)) || [110, 89, 145].includes(Math.round(amount))) {
              productName = 'Pachet Standard';
              isCompletePackage = true;
            }
          }
        } else {
          if (amount === 145 || amount === 110 || amount === 89) {
            pdfFileName = 'BonusCertificatDeAbsovire-PachetStandard.pdf';
            productName = 'Pachet Standard';
            isCompletePackage = true;
          } else if (amount === 49) {
            const hint = session.metadata?.product;
            if (hint === 'Alfabetul') { pdfFileName = 'Alfabetul.pdf'; productName = 'Alfabetul'; }
            else if (hint === 'Numere') { pdfFileName = 'Numere.pdf'; productName = 'Numere'; }
            else if (hint === 'FormeSiCulori' || hint === 'Forme si culori' || hint === 'FormeSICulori') { pdfFileName = 'FormeSiCulori.pdf'; productName = 'Forme și Culori'; }
            else { pdfFileName = 'Alfabetul.pdf'; productName = 'Alfabetul'; }
          } else {
            pdfFileName = 'Alfabetul.pdf';
            productName = 'Alfabetul';
          }
        }

        const isDryRun = process.env.DRY_RUN === 'true';
        if (isDryRun) {
          console.log('🧪 DRY_RUN: would send order notification and delivery', { customerEmail, productName, amount, currency, sessionId });
          return;
        }

        await sendOrderNotification({ customerEmail, customerName, productName, amount, currency, sessionId });
        if (isCompletePackage) {
          await sendCompletePackage(customerEmail, productName, amount, currency);
        } else if (productInfo && productInfo.type === 'promo') {
          await sendPromoPackage(customerEmail, productName, amount, currency, productInfo.files);
        } else {
          await sendPDFWithOptimization(customerEmail, pdfFileName, productName, amount, currency);
        }
        console.log('🎉 Delivery flow completed for session:', sessionId);
      }

      if (event.type === 'invoice.payment_succeeded') {
        const invoice = event.data.object;
        const customerEmail = invoice.customer_email;
        const amount = invoice.amount_paid / 100;
        const currency = invoice.currency?.toUpperCase() || 'RON';

        const isLiveEvent = !!event.livemode;
        if (!isLiveEvent && process.env.ALLOW_STRIPE_TEST !== 'true') {
          console.log('⚠️ Test-mode invoice webhook ignored in production');
          return;
        }

        if (!(invoice.paid === true || invoice.status === 'paid')) {
          console.log('⚠️ Invoice not paid, skipping fulfillment. status:', invoice.status, 'paid:', invoice.paid);
          return;
        }

        let productName = 'Pachet Standard';
        let pdfFileName = 'BonusCertificatDeAbsovire-PachetStandard.pdf';
        let isCompletePackage = false;

        if (invoice.lines && invoice.lines.data.length > 0) {
          const line = invoice.lines.data[0];
          const priceId = line.price?.id;
          const description = (line.description || '').toLowerCase();

          if (priceId && products[priceId]) {
            pdfFileName = products[priceId].pdf;
            productName = products[priceId].displayName || products[priceId].name;
            isCompletePackage = products[priceId].type === 'complete';
          } else {
            if (description.includes('pachet') && (description.includes('complet') || description.includes('standard'))) {
              productName = 'Pachet Standard';
              isCompletePackage = true;
            } else if (['alfabet', 'alfabetul'].some(k => description.includes(k))) {
              pdfFileName = 'Alfabetul.pdf';
              productName = 'Alfabetul';
            } else if (['numere', 'număr', 'numar'].some(k => description.includes(k))) {
              pdfFileName = 'Numere.pdf';
              productName = 'Numere';
            } else if (['forme', 'culori'].some(k => description.includes(k))) {
              pdfFileName = 'FormeSiCulori.pdf';
              productName = 'Forme și Culori';
            } else if (amount === 145 || amount === 110 || amount === 89) {
              productName = 'Pachet Standard';
              isCompletePackage = true;
            }
          }
        } else {
          if (amount === 145 || amount === 110 || amount === 89) {
            productName = 'Pachet Standard';
            isCompletePackage = true;
          }
        }

        if (!customerEmail) return;
        if (isCompletePackage) await sendCompletePackage(customerEmail, productName, amount, currency);
        else await sendPDFWithOptimization(customerEmail, pdfFileName, productName, amount, currency);
        console.log('🎉 Invoice delivery completed for:', customerEmail);
      }
    } catch (error) {
      console.error('❌ Async webhook processing error:', error);
    }
  });
});

/**
 * Send Complete Package (Pachet Standard) — always as download link, ZIP is ~89MB
 */
async function sendCompletePackage(toEmail, productName, amount, currency) {
  console.log('📦 Starting Complete Package delivery to:', toEmail);

  const isDryRun = process.env.DRY_RUN === 'true';

  const path = require('path');
  const fs = require('fs');
  const archiver = require('archiver');

  const pdfFiles = [
    'Alfabetul.pdf',
    'Numere.pdf',
    'FormeSiCulori.pdf',
    'CarteDeColorat.pdf',
    'BonusCertificatDeAbsovire-PachetStandard.pdf',
  ];

  const zipFileName = `Pachetul_Complet_CorcoDusa_${Date.now()}.zip`;
  const zipFilePath = path.join(__dirname, '..', 'temp', zipFileName);

  const tempDir = path.dirname(zipFilePath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('📁 Created temp directory:', tempDir);
  }

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', async () => {
      console.log(`📦 ZIP created: ${zipFileName} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);

      try {
        const stats = fs.statSync(zipFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        const serverUrl = process.env.SERVER_URL || 'https://corcodusa.ro';

        console.log(`📦 ${productName} ZIP (${fileSizeInMB.toFixed(1)}MB) — sending download link.`);

        const publicZipPath = path.join(__dirname, '..', 'public', 'pdfs', zipFileName);
        try {
          fs.renameSync(zipFilePath, publicZipPath);
        } catch (moveErr) {
          fs.copyFileSync(zipFilePath, publicZipPath);
          fs.unlinkSync(zipFilePath);
        }

        const downloadUrl = `${serverUrl}/api/download/${encodeURIComponent(zipFileName)}`;

        if (isDryRun) {
          console.log('🧪 DRY_RUN: would send ZIP download link', { toEmail, downloadUrl });
        } else {
          await sendMail({
            from: FROM,
            to: toEmail,
            subject: `${productName} - Descărcare ZIP - CorcoDușa`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #20BF55;">🎉 Mulțumim pentru achiziție!</h2>

                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #20BF55;">📦 ${productName}</h3>
                  <p><strong>Preț:</strong> ${amount} ${currency}</p>
                  <p>Fișierul ZIP cu toate materialele este disponibil pentru descărcare în siguranță:</p>
                  <p style="text-align: center; margin: 20px 0;">
                    <a href="${downloadUrl}" style="background:#20BF55;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                      📦 Descarcă ${productName} (ZIP)
                    </a>
                  </p>
                  <p><strong>Conținut:</strong></p>
                  <ul>
                    <li>🔠 Alfabetul.pdf</li>
                    <li>🔢 Numere.pdf</li>
                    <li>🎨 Forme și Culori.pdf</li>
                    <li>📖 Carte de Colorat.pdf</li>
                    <li>🏆 Certificat de Absolvire.pdf</li>
                  </ul>
                  <p><em>Link-ul de descărcare este valabil timp de 30 de zile.</em></p>
                  <p><em>Chitanța de plată a fost trimisă automat de către Stripe.</em></p>
                </div>

                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                <p style="color: #666; font-size: 14px;">
                  Pentru întrebări sau suport: <a href="mailto:contact@corcodusa.ro">contact@corcodusa.ro</a><br>
                  Mulțumim că ai ales CorcoDușa! 🎓
                </p>
              </div>
            `,
          });
        }

        resolve();
      } catch (error) {
        console.error('❌ Error sending email:', error);
        reject(error);
      }
    });

    archive.on('error', (err) => {
      console.error('❌ Archive error:', err);
      reject(err);
    });

    archive.pipe(output);

    let addedFiles = 0;
    for (const pdfFile of pdfFiles) {
      const filePath = path.join(__dirname, '..', 'public', 'pdfs', pdfFile);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        archive.file(filePath, { name: pdfFile });
        console.log(`📄 Added to ZIP: ${pdfFile} (${fileSizeInMB.toFixed(2)} MB)`);
        addedFiles++;
      } else {
        console.log(`⚠️ PDF not found: ${pdfFile}`);
      }
    }

    if (addedFiles === 0) {
      reject(new Error('No PDF files found for Complete Package'));
      return;
    }

    console.log(`📦 Creating ZIP with ${addedFiles} PDF files...`);
    archive.finalize();
  });
}

/**
 * Send Promo Package — always as download link, ZIP is ~83MB
 */
async function sendPromoPackage(toEmail, productName, amount, currency, pdfFiles) {
  console.log('📦 Starting Promo Package delivery to:', toEmail, 'Files:', pdfFiles);

  const isDryRun = process.env.DRY_RUN === 'true';

  const path = require('path');
  const fs = require('fs');
  const archiver = require('archiver');

  const zipFileName = `Pachetul_Promo_CorcoDusa_${Date.now()}.zip`;
  const zipFilePath = path.join(__dirname, '..', 'temp', zipFileName);

  const tempDir = path.dirname(zipFilePath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('📁 Created temp directory:', tempDir);
  }

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', async () => {
      console.log(`📦 ZIP created: ${zipFileName} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);

      try {
        const stats = fs.statSync(zipFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        const serverUrl = process.env.SERVER_URL || 'https://corcodusa.ro';

        console.log(`📦 ${productName} ZIP (${fileSizeInMB.toFixed(1)}MB) — sending download link.`);

        const publicZipPath = path.join(__dirname, '..', 'public', 'pdfs', zipFileName);
        try {
          fs.renameSync(zipFilePath, publicZipPath);
        } catch (moveErr) {
          fs.copyFileSync(zipFilePath, publicZipPath);
          fs.unlinkSync(zipFilePath);
        }

        const downloadUrl = `${serverUrl}/api/download/${encodeURIComponent(zipFileName)}`;

        if (isDryRun) {
          console.log('🧪 DRY_RUN: would send ZIP download link', { toEmail, downloadUrl });
        } else {
          await sendMail({
            from: FROM,
            to: toEmail,
            subject: `${productName} - CorcoDușa`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #20BF55;">🎉 Mulțumim pentru achiziție!</h2>

                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #20BF55;">📦 ${productName}</h3>
                  <p><strong>Preț:</strong> ${amount} ${currency}</p>
                  <p>Fișierul ZIP cu materialele din ${productName} este disponibil pentru descărcare în siguranță:</p>
                  <p style="text-align: center; margin: 20px 0;">
                    <a href="${downloadUrl}" style="background:#20BF55;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                      📦 Descarcă ${productName} (ZIP)
                    </a>
                  </p>
                  <p><strong>Conținut pachet:</strong></p>
                  <ul>
                    ${pdfFiles.map(file => {
                      if (file === 'LabirinturiMagice.pdf') return '<li>🧩 Labirinturi Magice.pdf</li>';
                      if (file === 'JocuriSiActivitatiEducationale.pdf') return '<li>🎓 Jocuri și Activități Educaționale.pdf</li>';
                      if (file === 'BonusCertificatDeAbsovire-PachetPromo.pdf') return '<li>🏆 Certificat de Absolvire.pdf</li>';
                      return `<li>${file}</li>`;
                    }).join('')}
                  </ul>
                  <p><em>Link-ul de descărcare este valabil timp de 30 de zile.</em></p>
                  <p><em>Chitanța de plată a fost trimisă automat de către Stripe.</em></p>
                </div>

                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                <p style="color: #666; font-size: 14px;">
                  Pentru întrebări sau suport: <a href="mailto:contact@corcodusa.ro">contact@corcodusa.ro</a><br>
                  Mulțumim că ai ales CorcoDușa! 🎓
                </p>
              </div>
            `,
          });
        }

        resolve();
      } catch (error) {
        console.error('❌ Error sending email:', error);
        reject(error);
      }
    });

    archive.on('error', (err) => {
      console.error('❌ Archive error:', err);
      reject(err);
    });

    archive.pipe(output);

    let addedFiles = 0;
    for (const pdfFile of pdfFiles) {
      const filePath = path.join(__dirname, '..', 'public', 'pdfs', pdfFile);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        archive.file(filePath, { name: pdfFile });
        console.log(`📄 Added to ZIP: ${pdfFile} (${fileSizeInMB.toFixed(2)} MB)`);
        addedFiles++;
      } else {
        console.log(`⚠️ PDF not found: ${pdfFile}`);
      }
    }

    if (addedFiles === 0) {
      reject(new Error('No PDF files found for Promo Package'));
      return;
    }

    console.log(`📦 Creating ZIP with ${addedFiles} PDF files...`);
    archive.finalize();
  });
}

/**
 * Send individual PDFs (exported for testing; not in main dispatch path)
 */
async function sendIndividualPDFs(toEmail, productName, amount, currency, pdfFiles) {
  console.log('📧 Sending individual PDFs to:', toEmail);

  const isDryRun = process.env.DRY_RUN === 'true';
  const path = require('path');
  const fs = require('fs');

  const serverUrl = process.env.SERVER_URL || 'https://corcodusa.ro';

  let sentCount = 0;
  let failedCount = 0;
  const largeFiles = [];

  for (const pdfFile of pdfFiles) {
    try {
      const filePath = path.join(__dirname, '..', 'public', 'pdfs', pdfFile);

      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const fileSizeInMB = stats.size / (1024 * 1024);

        let pdfProductName = pdfFile.replace('.pdf', '');
        if (pdfFile === 'Alfabetul.pdf') pdfProductName = 'Alfabetul';
        else if (pdfFile === 'Numere.pdf') pdfProductName = 'Numere';
        else if (pdfFile === 'FormeSiCulori.pdf') pdfProductName = 'Forme și Culori';
        else if (pdfFile === 'CarteDeColorat.pdf') pdfProductName = 'Carte de Colorat';
        else if (pdfFile === 'BonusCertificatDeAbsovire-PachetStandard.pdf') pdfProductName = 'Certificat de Absolvire - Pachet Standard';
        else if (pdfFile === 'BonusCertificatDeAbsovire-PachetPromo.pdf') pdfProductName = 'Certificat de Absolvire - Pachet Promo';

        if (fileSizeInMB < 10) {
          if (isDryRun) {
            console.log('🧪 DRY_RUN: would send individual PDF', { toEmail, pdfFile });
            sentCount++;
            continue;
          }
          await sendMail({
            from: FROM,
            to: toEmail,
            subject: `${pdfProductName} - Material digital - CorcoDușa`,
            html: `
              <h2>${pdfProductName} - Material digital</h2>
              <p><strong>Produs:</strong> ${productName}</p>
              <p><strong>Preț:</strong> ${amount} ${currency}</p>
              <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
              <hr>
              <p>Găsești atașat materialul digital: <strong>${pdfProductName}</strong></p>
              <hr>
              <p>Pentru întrebări: contact@corcodusa.ro</p>
            `,
            attachments: [{ filename: pdfFile, path: filePath }],
          });
          console.log(`✅ ${pdfFile} sent successfully`);
          sentCount++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.log(`⚠️ ${pdfFile} too large (${fileSizeInMB.toFixed(2)} MB), will provide download link`);
          largeFiles.push({
            name: pdfProductName,
            filename: pdfFile,
            size: fileSizeInMB.toFixed(2),
            downloadUrl: `${serverUrl}/api/download/${pdfFile}`,
          });
          failedCount++;
        }
      } else {
        console.log(`⚠️ ${pdfFile} not found`);
        failedCount++;
      }
    } catch (error) {
      console.error(`❌ Error sending ${pdfFile}:`, error.message);
      failedCount++;
    }
  }

  try {
    let largeFilesHtml = '';
    if (largeFiles.length > 0) {
      largeFilesHtml = `
        <hr>
        <p><strong>Materialele care necesită descărcare directă:</strong></p>
        <ul>
          ${largeFiles.map(file => `
            <li>
              <strong>${file.name}</strong> (${file.size} MB)<br>
              <a href="${file.downloadUrl}" style="background: #20BF55; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 5px;">
                📥 Descarcă ${file.name}
              </a>
            </li>
          `).join('')}
        </ul>
      `;
    }

    if (isDryRun) {
      console.log('🧪 DRY_RUN: would send summary email', { toEmail });
      return;
    }

    await sendMail({
      from: FROM,
      to: toEmail,
      subject: `${productName} - Materiale digitale - CorcoDușa`,
      html: `
        <h2>${productName} - Materiale digitale</h2>
        <p><strong>Preț:</strong> ${amount} ${currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <hr>
        <p><strong>Materialele incluse în pachet:</strong></p>
        <ul>
          <li>🔠 Alfabetul.pdf</li>
          <li>🔢 Numere.pdf</li>
          <li>🎨 Forme și Culori.pdf</li>
          <li>📖 Carte de Colorat.pdf</li>
          <li>🏆 Certificat de Absolvire.pdf</li>
        </ul>
        ${largeFilesHtml}
        <hr>
        <p>Mulțumim pentru achiziție! Echipa CorcoDușa</p>
      `,
    });

    console.log(`✅ Summary email sent to: ${toEmail}`);
    console.log(`📊 Delivery summary: ${sentCount} sent via email, ${largeFiles.length} with download links, ${failedCount - largeFiles.length} failed`);
  } catch (error) {
    console.error('❌ Error sending summary email:', error.message);
  }
}

module.exports = router;

module.exports.sendCompletePackage = sendCompletePackage;
module.exports.sendPromoPackage = sendPromoPackage;
module.exports.sendIndividualPDFs = sendIndividualPDFs;

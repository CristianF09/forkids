const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const ProcessedWebhookEvent = require('../models/ProcessedWebhookEvent');

// Initialize Stripe lazily (only when webhook is called)
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

const { sendOrderNotification } = require('../services/emailService');
const { sendPDFWithOptimization } = require('../services/pdfDeliveryService');
const { products } = require('../routes/products');

// Add better error handling and logging
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

  // Idempotency: Stripe retries webhooks on timeouts/transient errors, and a
  // retried event must NOT trigger a second round of emails/ZIPs to the same
  // customer. Record the event ID first; a duplicate-key error means we've
  // already handled this exact event, so we stop here.
  if (mongoose.connection.readyState === 1) {
    try {
      await ProcessedWebhookEvent.create({ eventId: event.id });
    } catch (dupErr) {
      if (dupErr.code === 11000) {
        console.log('🔁 Duplicate Stripe event ignored:', event.id);
        return res.status(200).json({ received: true, duplicate: true });
      }
      console.error('⚠️ Could not record webhook event for idempotency check:', dupErr.message);
      // Fail open: an unrelated DB error here shouldn't block fulfillment.
    }
  } else {
    console.log('⚠️ MongoDB not connected — skipping webhook idempotency check');
  }

  // Acknowledge to Stripe immediately to avoid timeouts, then process in background
  res.status(200).json({ received: true });

  setImmediate(async () => {
    try {
      // Handle checkout.session.completed
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_details?.email || session.customer_email;
        const customerName = session.customer_details?.name || 'Customer';
        const sessionId = session.id;

        console.log('💰 Payment completed for session:', sessionId);
        console.log('📧 Customer email:', customerEmail);
        console.log('👤 Customer name:', customerName);

        // Security: ignore test-mode events in production unless explicitly allowed
        const isLiveEvent = !!event.livemode;
        if (!isLiveEvent && process.env.ALLOW_STRIPE_TEST !== 'true') {
          console.log('⚠️ Test-mode webhook ignored in production');
          return;
        }

        // Only fulfill if Stripe marks the session as PAID
        if (session.payment_status !== 'paid') {
          console.log('⚠️ Session not paid, skipping fulfillment. payment_status:', session.payment_status);
          return;
        }

        // Try to get expanded session with line items
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

        // Double-check via PaymentIntent that funds were captured
        try {
          let paymentIntent = expandedSession.payment_intent;
          if (typeof paymentIntent === 'string') {
            paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntent);
          }
          if (!paymentIntent || paymentIntent.status !== 'succeeded' || (paymentIntent.amount_received || 0) <= 0) {
            console.log('⚠️ PaymentIntent not succeeded or no funds received. Skipping fulfillment.', {
              status: paymentIntent?.status,
              amount_received: paymentIntent?.amount_received
            });
            return;
          }
        } catch (piErr) {
          console.log('⚠️ Could not verify PaymentIntent. Skipping fulfillment. Reason:', piErr.message);
          return;
        }

        if (!customerEmail) {
          console.error('❌ No customer email found in session');
          return; // stop processing
        }

        // Determine product
        let pdfFileName = 'BonusCertificatDeAbsovire-PachetStandard.pdf';
        let productName = 'Pachet Complet';
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
            productName = productInfo.name;
            isCompletePackage = productInfo.type === 'complete';
          } else {
            // Fallback detection by description/amount when priceId mapping is unknown
            if (liDescription.includes('pachet') && liDescription.includes('complet')) {
              productName = 'Pachet Complet';
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
            } else if ([110, 89].includes(Math.round(liUnitAmount)) || [110, 89].includes(Math.round(amount))) {
              // Heuristic by amount for complete package (support legacy/new price points)
              productName = 'Pachet Complet';
              isCompletePackage = true;
            }
          }
        } else {
          if (amount === 110 || amount === 89) {
            pdfFileName = 'BonusCertificatDeAbsovire-PachetStandard.pdf';
            productName = 'Pachet Complet';
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

        const displayProductName = productName === 'PachetComplet' ? 'Pachet Complet' : productName;
        await sendOrderNotification({ customerEmail, customerName, productName: displayProductName, amount, currency, sessionId });
        if (isCompletePackage) {
          await sendCompletePackage(customerEmail, displayProductName, amount, currency);
        } else if (productInfo && productInfo.type === 'promo') {
          await sendPromoPackage(customerEmail, displayProductName, amount, currency, productInfo.files);
        } else {
          await sendPDFWithOptimization(customerEmail, pdfFileName, displayProductName, amount, currency);
        }
        console.log('🎉 Delivery flow completed for session:', sessionId);
      }

      // Handle Stripe's automated invoice events
      if (event.type === 'invoice.payment_succeeded') {
        const invoice = event.data.object;
        const customerEmail = invoice.customer_email;
        const amount = invoice.amount_paid / 100;
        const currency = invoice.currency?.toUpperCase() || 'RON';

        // Security: ignore test-mode events in production unless explicitly allowed
        const isLiveEvent = !!event.livemode;
        if (!isLiveEvent && process.env.ALLOW_STRIPE_TEST !== 'true') {
          console.log('⚠️ Test-mode invoice webhook ignored in production');
          return;
        }

        // Only fulfill if the invoice is paid/paid
        if (!(invoice.paid === true || invoice.status === 'paid')) {
          console.log('⚠️ Invoice not paid, skipping fulfillment. status:', invoice.status, 'paid:', invoice.paid);
          return;
        }

        let productName = 'Pachet Complet';
        let pdfFileName = 'BonusCertificatDeAbsovire-PachetStandard.pdf';
        let isCompletePackage = false;
        if (invoice.lines && invoice.lines.data.length > 0) {
          const line = invoice.lines.data[0];
          const priceId = line.price?.id;
          const description = (line.description || '').toLowerCase();
          if (priceId && products[priceId]) {
            pdfFileName = products[priceId].pdf;
            productName = products[priceId].name;
            isCompletePackage = products[priceId].type === 'complete';
          } else {
            if (description.includes('pachet') && description.includes('complet')) {
              productName = 'Pachet Complet';
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
            } else if (amount === 110 || amount === 89) {
              productName = 'Pachet Complet';
              isCompletePackage = true;
            }
          }
        } else {
          if (amount === 110 || amount === 89) {
            productName = 'Pachet Complet';
            isCompletePackage = true;
          }
        }

        if (!customerEmail) return;
        const displayProductName = productName === 'PachetComplet' ? 'Pachet Complet' : productName;
        if (isCompletePackage) await sendCompletePackage(customerEmail, displayProductName, amount, currency);
        else await sendPDFWithOptimization(customerEmail, pdfFileName, displayProductName, amount, currency);
        console.log('🎉 Invoice delivery completed for:', customerEmail);
      }
    } catch (error) {
      console.error('❌ Async webhook processing error:', error);
    }
  });
});

/**
 * Send Complete Package with all PDFs as ZIP
 */
async function sendCompletePackage(toEmail, productName, amount, currency) {
  console.log('📦 Starting Complete Package delivery to:', toEmail);
  
  // Check environment variables first
  const isDryRun = process.env.DRY_RUN === 'true';
  if (!isDryRun && (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS)) {
    throw new Error('ZMAIL_USER and ZMAIL_PASS environment variables are required');
  }
  
  const nodemailer = require('nodemailer');
  const path = require('path');
  const fs = require('fs');
  const archiver = require('archiver');

  const transporter = !isDryRun ? nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  }) : null;

  // All PDFs for Complete Package (Pachet Standard): the 3 activities,
  // the Coloring Book, and the certificate PDF (contains 3 diplomas, one
  // per activity — Alfabetul, Numere, Forme și Culori).
  const pdfFiles = [
    'Alfabetul.pdf',
    'Numere.pdf',
    'FormeSiCulori.pdf',
    'CarteDeColorat.pdf',
    'BonusCertificatDeAbsovire-PachetStandard.pdf'
  ];

  // Create ZIP file
  const zipFileName = `Pachetul_Complet_CorcoDusa_${Date.now()}.zip`;
  const zipFilePath = path.join(__dirname, '..', 'temp', zipFileName);
  
  // Ensure temp directory exists
  const tempDir = path.dirname(zipFilePath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('📁 Created temp directory:', tempDir);
  }

  // Create ZIP archive
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  return new Promise((resolve, reject) => {
    output.on('close', async () => {
      console.log(`📦 ZIP created: ${zipFileName} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
      
      try {
        // Check file size - if too large, send individual PDFs instead
        const stats = fs.statSync(zipFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        const serverUrl = process.env.SERVER_URL || 'https://corcodusa.ro';
        const displayProductName = productName === 'PachetComplet' ? 'Pachet Complet' : productName;
        
        if (true) { // Package ZIP (~89MB) always too large to attach — always send download link
          console.log(`📦 Complete Package ZIP (${fileSizeInMB.toFixed(1)}MB) — sending download link.`);

          // Move ZIP to public/pdfs so it can be downloaded via /api/download
          const publicZipPath = path.join(__dirname, '..', 'public', 'pdfs', zipFileName);
          try {
            fs.renameSync(zipFilePath, publicZipPath);
          } catch (moveErr) {
            // fallback copy
            fs.copyFileSync(zipFilePath, publicZipPath);
            fs.unlinkSync(zipFilePath);
          }

          const downloadUrl = `${serverUrl}/api/download/${encodeURIComponent(zipFileName)}`;

          if (isDryRun) {
            console.log('🧪 DRY_RUN: would send ZIP download link', { toEmail, downloadUrl });
          } else {
            await transporter.sendMail({
              from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
              to: toEmail,
              subject: `Pachetul Complet - Descărcare ZIP - CorcoDușa`,
              html: `
                <h2>Pachetul Complet - Descărcare fișier</h2>
                <p><strong>Produs:</strong> ${displayProductName}</p>
                <p><strong>Preț:</strong> ${amount} ${currency}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
                <hr>
                <p>Fișierul ZIP cu toate materialele este disponibil pentru descărcare în siguranță:</p>
                <p>
                  <a href="${downloadUrl}" style="background:#20BF55;color:#fff;padding:10px 18px;text-decoration:none;border-radius:6px;display:inline-block;">
                    📦 Descarcă Pachetul Complet (ZIP)
                  </a>
                </p>
                <p>Conținut:</p>
                <ul>
                  <li>🔠 Alfabetul.pdf</li>
                  <li>🔢 Numere.pdf</li>
                  <li>🎨 Forme și Culori.pdf</li>
                  <li>📖 Carte de Colorat.pdf</li>
                  <li>🏆 BonusCertificatDeAbsovire-PachetStandard.pdf</li>
                </ul>
                <p>Pentru întrebări: contact@corcodusa.ro</p>
              `,
            });
          }
          
        } else {
          // File size is acceptable, send via email
          console.log('✅ ZIP file size acceptable, sending via email');
          
          if (isDryRun) {
            console.log('🧪 DRY_RUN: would send Complete Package ZIP', { toEmail, zipFileName });
          } else {
            await transporter.sendMail({
              from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
              to: toEmail,
              subject: `Pachetul Complet - CorcoDușa`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #20BF55;">🎉 Mulțumim pentru achiziție!</h2>

                  <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #20BF55;">📦 Pachetul Complet</h3>
                    <p>Găsești atașat fișierul ZIP cu toate materialele digitale din Pachetul Complet.</p>
                    <p><strong>Fișier atașat:</strong> ${zipFileName}</p>
                    <p><strong>Conținut pachet:</strong></p>
                    <ul>
                      <li>🔠 Alfabetul.pdf</li>
                      <li>🔢 Numere.pdf</li>
                      <li>🎨 Forme și Culori.pdf</li>
                      <li>📖 Carte de Colorat.pdf</li>
                      <li>🏆 BonusCertificatDeAbsovire-PachetStandard.pdf</li>
                    </ul>
                    <p><em>Chitanța de plată a fost trimisă automat de către Stripe.</em></p>
                  </div>

                  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                  <p style="color: #666; font-size: 14px;">
                    Pentru întrebări sau suport: <a href="mailto:contact@corcodusa.ro">contact@corcodusa.ro</a><br>
                    Mulțumim că ai ales CorcoDușa! 🎓
                  </p>
                </div>
              `,
              attachments: [
                {
                  filename: zipFileName,
                  path: zipFilePath,
                }
              ]
            });
          }

          console.log(`✅ Complete Package ZIP sent to: ${toEmail}`);
          
          // Clean up ZIP file after sending
          fs.unlink(zipFilePath, (err) => {
            if (err) {
              console.log(`⚠️ Could not delete temporary ZIP file: ${err.message}`);
            } else {
              console.log(`🗑️ Temporary ZIP file deleted: ${zipFileName}`);
            }
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

    // Add each PDF to the ZIP
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
 * Send individual PDFs when ZIP is too large
 */
async function sendIndividualPDFs(toEmail, productName, amount, currency, pdfFiles) {
  console.log('📧 Sending individual PDFs to:', toEmail);

  const isDryRun = process.env.DRY_RUN === 'true';
  const nodemailer = require('nodemailer');
  const path = require('path');
  const fs = require('fs');

  const transporter = !isDryRun ? nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  }) : null;

  // Get your server URL from environment or use a default
  const serverUrl = process.env.SERVER_URL || 'https://corcodusa.ro';
  
  // Send each PDF individually
  let sentCount = 0;
  let failedCount = 0;
  let largeFiles = [];
  
  for (const pdfFile of pdfFiles) {
    try {
      const filePath = path.join(__dirname, '..', 'public', 'pdfs', pdfFile);
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        
        // Map PDF filename to product name
        let pdfProductName = pdfFile.replace('.pdf', '');
        if (pdfFile === 'Alfabetul.pdf') pdfProductName = 'Alfabetul';
        else if (pdfFile === 'Numere.pdf') pdfProductName = 'Numere';
        else if (pdfFile === 'FormeSiCulori.pdf') pdfProductName = 'Forme și Culori';
        else if (pdfFile === 'CarteDeColorat.pdf') pdfProductName = 'Carte de Colorat';
        else if (pdfFile === 'BonusCertificatDeAbsovire-PachetStandard.pdf') pdfProductName = 'Bonus - Certificat de Absolvire - Pachet Standard';
        
        if (fileSizeInMB < 10) { // Send if under 10MB
          if (isDryRun) {
            console.log('🧪 DRY_RUN: would send individual PDF', { toEmail, pdfFile });
            sentCount++;
            continue;
          }
          await transporter.sendMail({
            from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
            to: toEmail,
            subject: `${pdfProductName} - Material digital - CorcoDușa`,
            html: `
              <h2>${pdfProductName} - Material digital</h2>
              <p><strong>Produs:</strong> ${productName}</p>
              <p><strong>Preț:</strong> ${amount} ${currency}</p>
              <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
              <hr>
              <p>Găsești atașat materialul digital: <strong>${pdfProductName}</strong></p>
              <p><strong>Dimensiune:</strong> ${fileSizeInMB.toFixed(2)} MB</p>
              <hr>
              <p>Pentru întrebări: contact@corcodusa.ro</p>
            `,
            attachments: [
              {
                filename: pdfFile,
                path: filePath,
              }
            ]
          });
          
          console.log(`✅ ${pdfFile} sent successfully`);
          sentCount++;
          
          // Wait a bit between emails to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } else {
          console.log(`⚠️ ${pdfFile} too large (${fileSizeInMB.toFixed(2)} MB), will provide download link`);
          largeFiles.push({
            name: pdfProductName,
            filename: pdfFile,
            size: fileSizeInMB.toFixed(2),
            downloadUrl: `${serverUrl}/api/download/${pdfFile}`
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
  
  // Send summary email with clean content and download links (no numeric status)
  try {
    const displayProductName = productName === 'PachetComplet' ? 'Pachet Complet' : productName;
    let largeFilesHtml = '';
    if (largeFiles.length > 0) {
      largeFilesHtml = `
        <hr>
        <p><strong>Materialele care necesită descărcare directă (fiind prea mari pentru email):</strong></p>
        <ul>
          ${largeFiles.map(file => `
            <li>
              <strong>${file.name}</strong> (${file.size} MB)
              <br>
              <a href="${file.downloadUrl}" style="background: #20BF55; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 5px;">
                📥 Descarcă ${file.name}
              </a>
            </li>
          `).join('')}
        </ul>
        <p><strong>Notă:</strong> Click pe butonul de descărcare pentru fiecare material.</p>
      `;
    }
    
    if (isDryRun) {
      console.log('🧪 DRY_RUN: would send individual PDFs summary email', { toEmail });
      return;
    }
    await transporter.sendMail({
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: toEmail,
      subject: `Pachetul Complet - Materiale digitale - CorcoDușa`,
      html: `
        <h2>Pachetul Complet - Materiale digitale</h2>
        <p><strong>Produs:</strong> ${displayProductName}</p>
        <p><strong>Preț:</strong> ${amount} ${currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <hr>
        <p><strong>Materialele incluse în pachet:</strong></p>
        <ul>
          <li>📚 Alfabetul.pdf</li>
          <li>🔢 Numere.pdf</li>
          <li>🎨 Forme și Culori.pdf</li>
          <li>📖 Carte de Colorat.pdf</li>
          <li>🏆 BonusCertificatDeAbsovire-PachetStandard.pdf</li>
        </ul>
        ${largeFilesHtml}
        <hr>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
        <hr>
        <p>Mulțumim pentru achiziție!</p>
        <p>Echipa CorcoDușa</p>
      `
    });
    
    console.log(`✅ Summary email sent to: ${toEmail}`);
    console.log(`📊 Delivery summary: ${sentCount} sent via email, ${largeFiles.length} with download links, ${failedCount - largeFiles.length} failed`);
    
  } catch (error) {
    console.error('❌ Error sending summary email:', error.message);
  }
}

/**
 * Send Promo Package with specific PDFs as ZIP
 */
async function sendPromoPackage(toEmail, productName, amount, currency, pdfFiles) {
  console.log('📦 Starting Promo Package delivery to:', toEmail, 'Files:', pdfFiles);

  // Check environment variables first
  const isDryRun = process.env.DRY_RUN === 'true';
  if (!isDryRun && (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS)) {
    throw new Error('ZMAIL_USER and ZMAIL_PASS environment variables are required');
  }

  const nodemailer = require('nodemailer');
  const path = require('path');
  const fs = require('fs');
  const archiver = require('archiver');

  const transporter = !isDryRun ? nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  }) : null;

  // Create ZIP file
  const zipFileName = `Pachetul_Promo_CorcoDusa_${Date.now()}.zip`;
  const zipFilePath = path.join(__dirname, '..', 'temp', zipFileName);

  // Ensure temp directory exists
  const tempDir = path.dirname(zipFilePath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('📁 Created temp directory:', tempDir);
  }

  // Create ZIP archive
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  return new Promise((resolve, reject) => {
    output.on('close', async () => {
      console.log(`📦 ZIP created: ${zipFileName} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);

      try {
        // Check file size - if too large, send download link instead
        const stats = fs.statSync(zipFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        const serverUrl = process.env.SERVER_URL || 'https://corcodusa.ro';
        const displayProductName = productName;

        if (true) { // Promo Package ZIP (~83MB) always too large to attach — always send download link
          console.log(`📦 Promo Package ZIP (${fileSizeInMB.toFixed(1)}MB) — sending download link.`);

          // Move ZIP to public/pdfs so it can be downloaded via /api/download
          const publicZipPath = path.join(__dirname, '..', 'public', 'pdfs', zipFileName);
          try {
            fs.renameSync(zipFilePath, publicZipPath);
          } catch (moveErr) {
            // fallback copy
            fs.copyFileSync(zipFilePath, publicZipPath);
            fs.unlinkSync(zipFilePath);
          }

          const downloadUrl = `${serverUrl}/api/download/${encodeURIComponent(zipFileName)}`;

          if (isDryRun) {
            console.log('🧪 DRY_RUN: would send ZIP download link', { toEmail, downloadUrl });
          } else {
            await transporter.sendMail({
              from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
              to: toEmail,
              subject: `Pachetul Promo - CorcoDușa`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #20BF55;">🎉 Mulțumim pentru achiziție!</h2>

                  <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #20BF55;">📦 Pachetul Promo</h3>
                    <p>Fișierul ZIP cu materialele din Pachetul Promo este disponibil pentru descărcare în siguranță:</p>
                    <p style="text-align: center; margin: 20px 0;">
                      <a href="${downloadUrl}" style="background:#20BF55;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                        📦 Descarcă Pachetul Promo (ZIP)
                      </a>
                    </p>
                    <p><strong>Conținut pachet:</strong></p>
                    <ul>
                      ${pdfFiles.map(file => {
                        if (file === 'LabirinturiMagice.pdf') return '<li>🧩 Labirinturi Magice.pdf</li>';
                        if (file === 'JocuriSiActivitatiEducationale.pdf') return '<li>🎓 Jocuri și Activități Educationale.pdf</li>';
                        if (file === 'BonusCertificatDeAbsovire-PachetPromo.pdf') return '<li>🏆 BonusCertificatDeAbsovire-PachetPromo.pdf</li>';
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

        } else {
          // File size is acceptable, send via email
          console.log('✅ ZIP file size acceptable, sending via email');

          if (isDryRun) {
            console.log('🧪 DRY_RUN: would send Promo Package ZIP', { toEmail, zipFileName });
          } else {
            await transporter.sendMail({
              from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
              to: toEmail,
              subject: `Pachetul Promo - CorcoDușa`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #20BF55;">🎉 Mulțumim pentru achiziție!</h2>

                  <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #20BF55;">📦 Pachetul Promo</h3>
                    <p>Găsești atașat fișierul ZIP cu materialele digitale din Pachetul Promo.</p>
                    <p><strong>Fișier atașat:</strong> ${zipFileName}</p>
                    <p><strong>Conținut pachet:</strong></p>
                    <ul>
                      ${pdfFiles.map(file => {
                        if (file === 'LabirinturiMagice.pdf') return '<li>🧩 Labirinturi Magice.pdf</li>';
                        if (file === 'JocuriSiActivitatiEducationale.pdf') return '<li>🎓 Jocuri și Activități Educationale.pdf</li>';
                        if (file === 'BonusCertificatDeAbsovire-PachetPromo.pdf') return '<li>🏆 BonusCertificatDeAbsovire-PachetPromo.pdf</li>';
                        return `<li>${file}</li>`;
                      }).join('')}
                    </ul>
                    <p><em>Chitanța de plată a fost trimisă automat de către Stripe.</em></p>
                  </div>

                  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                  <p style="color: #666; font-size: 14px;">
                    Pentru întrebări sau suport: <a href="mailto:contact@corcodusa.ro">contact@corcodusa.ro</a><br>
                    Mulțumim că ai ales CorcoDușa! 🎓
                  </p>
                </div>
              `,
              attachments: [
                {
                  filename: zipFileName,
                  path: zipFilePath,
                }
              ]
            });
          }

          console.log(`✅ Promo Package ZIP sent to: ${toEmail}`);

          // Clean up ZIP file after sending
          fs.unlink(zipFilePath, (err) => {
            if (err) {
              console.log(`⚠️ Could not delete temporary ZIP file: ${err.message}`);
            } else {
              console.log(`🗑️ Temporary ZIP file deleted: ${zipFileName}`);
            }
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

    // Add each PDF to the ZIP
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

module.exports = router;

// Expose internal helpers for local testing (non-production usage)
module.exports.sendCompletePackage = sendCompletePackage;
module.exports.sendPromoPackage = sendPromoPackage;
module.exports.sendIndividualPDFs = sendIndividualPDFs;

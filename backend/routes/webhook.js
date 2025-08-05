const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

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
const products = require('../config/products');

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not found in environment variables');
      return res.status(500).send('Webhook secret not configured');
    }
    
    event = getStripe().webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`⚠️  Eroare webhook: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'Customer';
    const sessionId = session.id;
    
    console.log('💰 Payment completed for session:', sessionId);
    console.log('📧 Customer email:', customerEmail);
    console.log('👤 Customer name:', customerName);
    
    // Get product information from session
    let pdfFileName = 'BonusCertificateDeAbsovire.pdf'; // Default
    let productName = 'Pachet Complet'; // Default
    let amount = session.amount_total / 100; // Convert from cents
    let currency = session.currency?.toUpperCase() || 'RON';
    let isCompletePackage = false;
    
    // Try to get product from line items if available
    const lineItems = session.line_items?.data || [];
    if (lineItems.length > 0) {
      const priceId = lineItems[0].price.id;
      const pdfFile = products[priceId];
      
      if (pdfFile) {
        pdfFileName = pdfFile;
        // Map PDF filename to product name
        if (pdfFile === 'BonusCertificateDeAbsovire.pdf') {
          productName = 'Pachet Complet';
          isCompletePackage = true; // Special handling for complete package
        } else if (pdfFile === 'Alfabetul.pdf') productName = 'Alfabetul';
        else if (pdfFile === 'Numere.pdf') productName = 'Numere';
        else if (pdfFile === 'FormeSiCulori.pdf') productName = 'Forme și Culori';
        
        console.log('📦 Product found from price ID:', priceId);
        console.log('📦 Product name:', productName);
        console.log('📦 PDF file:', pdfFileName);
        console.log('📦 Is Complete Package:', isCompletePackage);
      } else {
        console.log('⚠️ Product not found for price ID:', priceId);
        console.log('🔍 Available price IDs:', Object.keys(products));
      }
    } else {
      // If no line items, try to determine product from amount
      console.log('📊 Amount paid:', amount, currency);
      console.log('🔍 No line items, using amount mapping...');
      
      // Map amount to product (fallback) - Updated prices
      if (amount === 89) {
        pdfFileName = 'BonusCertificateDeAbsovire.pdf';
        productName = 'Pachet Complet';
        isCompletePackage = true; // Special handling for complete package
        console.log('📦 Determined product from amount: Pachet Complet (89 Lei)');
      } else if (amount === 39) {
        // For 39 Lei, we can't determine which individual product it is
        // So we'll use the default and log a warning
        pdfFileName = 'BonusCertificateDeAbsovire.pdf';
        productName = 'Pachet Complet';
        isCompletePackage = true;
        console.log('⚠️ Amount 39 Lei detected - could be any individual product');
        console.log('⚠️ Using Complete Package as fallback');
      } else {
        console.log('⚠️ Unknown amount, using default product');
      }
    }
    
    console.log('📦 Session metadata:', session.metadata);
    console.log('📧 Processing payment for:', customerEmail, 'Product:', productName);
    
    try {
      // Step 1: Send order notification to contact@corcodusa.ro
      await sendOrderNotification({
        customerEmail,
        customerName,
        productName,
        amount,
        currency,
        sessionId
      });
      console.log('✅ Order notification sent to contact@corcodusa.ro');
      
      // Step 2: Send PDF(s) to customer
      if (isCompletePackage) {
        // For Complete Package, send all PDFs
        console.log('📦 Sending Complete Package with all PDFs...');
        await sendCompletePackage(customerEmail, productName, amount, currency);
      } else {
        // For individual products, send single PDF
        await sendPDFWithOptimization(customerEmail, pdfFileName, productName, amount, currency);
      }
      
      console.log('🎉 All payment processing completed successfully!');
      
    } catch (error) {
      console.error('❌ Error processing payment:', error);
      return res.status(500).end();
    }
  }

  // Handle Stripe's automated invoice events
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    const customerEmail = invoice.customer_email;
    const invoiceId = invoice.id;
    const amount = invoice.amount_paid / 100;
    const currency = invoice.currency?.toUpperCase() || 'RON';
    
    console.log('📄 Stripe invoice payment succeeded:', invoiceId);
    console.log('📧 Customer email:', customerEmail);
    console.log('💰 Amount:', amount, currency);
    
    // Extract product information from invoice
    let productName = 'Pachet Complet';
    let pdfFileName = 'BonusCertificateDeAbsovire.pdf';
    let isCompletePackage = false;
    
    if (invoice.lines && invoice.lines.data.length > 0) {
      const lineItem = invoice.lines.data[0];
      const priceId = lineItem.price?.id;
      
      if (priceId) {
        const pdfFile = products[priceId];
        if (pdfFile) {
          pdfFileName = pdfFile;
          // Map PDF filename to product name
          if (pdfFile === 'BonusCertificateDeAbsovire.pdf') {
            productName = 'Pachet Complet';
            isCompletePackage = true;
          } else if (pdfFile === 'Alfabetul.pdf') productName = 'Alfabetul';
          else if (pdfFile === 'Numere.pdf') productName = 'Numere';
          else if (pdfFile === 'FormeSiCulori.pdf') productName = 'Forme și Culori';
          
          console.log('📦 Product found from invoice:', productName, 'PDF:', pdfFileName);
        }
      }
    }
    
    try {
      // Send PDF(s) to customer
      if (isCompletePackage) {
        await sendCompletePackage(customerEmail, productName, amount, currency);
      } else {
        await sendPDFWithOptimization(customerEmail, pdfFileName, productName, amount, currency);
      }
      
      console.log('🎉 Invoice processing completed successfully!');
      
    } catch (error) {
      console.error('❌ Error processing invoice:', error);
      return res.status(500).end();
    }
  }

  res.status(200).json({ received: true });
});

/**
 * Send Complete Package with all PDFs as ZIP
 */
async function sendCompletePackage(toEmail, productName, amount, currency) {
  const nodemailer = require('nodemailer');
  const path = require('path');
  const fs = require('fs');
  const archiver = require('archiver');

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  });

  // All PDFs for Complete Package
  const pdfFiles = [
    'Alfabetul.pdf',
    'Numere.pdf', 
    'FormeSiCulori.pdf',
    'BonusFiseDeColorat.pdf',
    'BonusCertificateDeAbsovire.pdf'
  ];

  // Create ZIP file
  const zipFileName = `Pachetul_Complet_CorcoDusa_${Date.now()}.zip`;
  const zipFilePath = path.join(__dirname, '..', 'temp', zipFileName);
  
  // Ensure temp directory exists
  const tempDir = path.dirname(zipFilePath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Create ZIP archive
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  output.on('close', async () => {
    console.log(`📦 ZIP created: ${zipFileName} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
    
    // Send email with ZIP attachment
    await transporter.sendMail({
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: toEmail,
      subject: `Pachetul Complet - Toate materialele digitale - CorcoDușa`,
      html: `
        <h2>Pachetul Complet - Toate materialele digitale!</h2>
        <p><strong>Produs:</strong> ${productName}</p>
        <p><strong>Preț:</strong> ${amount} ${currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <hr>
        <p>Găsești atașat fișierul ZIP cu toate materialele digitale din Pachetul Complet:</p>
        <ul>
          <li>📚 Alfabetul.pdf</li>
          <li>🔢 Numere.pdf</li>
          <li>🎨 Forme și Culori.pdf</li>
          <li>🎨 Bonus - Fișe de Colorat.pdf</li>
          <li>🏆 Bonus - Certificat de Absolvire.pdf</li>
        </ul>
        <p><strong>Instrucțiuni:</strong></p>
        <ol>
          <li>Descarcă fișierul ZIP atașat</li>
          <li>Dezarhivează fișierul pe calculatorul tău</li>
          <li>Găsești toate materialele digitale în folderul dezarhivat</li>
        </ol>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `,
      attachments: [
        {
          filename: zipFileName,
          path: zipFilePath,
        }
      ]
    });

    console.log(`✅ Complete Package ZIP sent to: ${toEmail}`);
    
    // Clean up ZIP file after sending
    fs.unlink(zipFilePath, (err) => {
      if (err) {
        console.log(`⚠️ Could not delete temporary ZIP file: ${err.message}`);
      } else {
        console.log(`🗑️ Temporary ZIP file deleted: ${zipFileName}`);
      }
    });
  });

  archive.on('error', (err) => {
    throw err;
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
    throw new Error('No PDF files found for Complete Package');
  }

  console.log(`📦 Creating ZIP with ${addedFiles} PDF files...`);
  await archive.finalize();
}

module.exports = router;
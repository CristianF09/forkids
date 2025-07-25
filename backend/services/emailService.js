const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const PDFDocument = require('pdfkit');

/**
 * Trimite un PDF ca atașament email-ului către adresa specificată.
 * @param {string} toEmail - Adresa de email a destinatarului
 * @param {string} productId - ID-ul produsului (ex: price_1RiBRR2c4OeQrchOtK2eOVra)
 */
async function sendPDF(toEmail, productId) {
  // Mapping from productId to PDF filenames
  const productPDFMap = {
    'prod_Sg7FSlYGXYLqIx': ['Alfabetul .pdf'],
    'prod_Sg7Fm0E2S5Hm1k': ['Numere.pdf'],
    'prod_Sg7FLP5uIieb7r': ['FormeSiCulori.pdf'],
    'prod_Sg7FB1xJVJc2MV': [
      'Alfabetul .pdf',
      'Numere.pdf',
      'FormeSiCulori.pdf',
      'BonusCertificateDeAbsovire.pdf',
      'BonusFiseDeColorat.pdf',
    ],
  };

  const pdfDir = path.join(__dirname, '../public/pdfs');
  const pdfFiles = productPDFMap[productId];
  if (!pdfFiles) {
    throw new Error(`Product ID necunoscut: ${productId}`);
  }

  const attachments = pdfFiles.map(filename => {
    const pdfPath = path.join(pdfDir, filename);
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`Fișierul PDF nu a fost găsit: ${pdfPath}`);
    }
    return {
      filename,
      path: pdfPath,
    };
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
    to: toEmail,
    subject: 'Fișele tale educative - CorcoDușa',
    text:
      'Mulțumim pentru achiziție! Găsești fișierul educațional atașat acestui email.\n\n' +
      'Pentru întrebări sau suport, nu ezita să ne contactezi la contact@corcodusa.ro.',
    attachments,
  };

  await transporter.sendMail(mailOptions);
  console.log(`PDF trimis către: ${toEmail}`);
}

/**
 * Trimite un email de contact către contact@corcodusa.ro cu detaliile primite din formular.
 * @param {Object} param0
 * @param {string} param0.name - Numele expeditorului
 * @param {string} param0.email - Emailul expeditorului
 * @param {string} param0.message - Mesajul expeditorului
 */
async function sendContactEmail({ name, email, message }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.ZMAIL_USER}>`,
    to: process.env.ZMAIL_USER,
    subject: 'Mesaj nou din formularul de contact',
    html: `
      <h3>Ai primit un mesaj nou de la ${name} (${email})</h3>
      <p>${message}</p>
    `,
    replyTo: email,
  });
  console.log(`Email de contact primit de la: ${name} <${email}>`);
}

/**
 * Trimite un PDF ca atașament după numele produsului (productName) din folderul public/pdfs
 * @param {string} to - Adresa de email a destinatarului
 * @param {string} productName - Numele produsului (inclusiv extensia, ex: Alfabetul .pdf)
 */
async function sendEmailWithAttachment(to, ) {
  const filePath = path.join(__dirname, 'public', 'pdfs', productName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${filePath}`);
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Corcodușa" <${process.env.ZMAIL_USER}>`,
    to,
    subject: `Mulțumim pentru achiziția ${productName}`,
    text: 'Găsești atașat materialul digital cumpărat. Îți mulțumim!',
    attachments: [
      {
        filename: productName,
        path: filePath,
      },
    ],
  });
}

/**
 * Generează și trimite o factură PDF către client după plată.
 * @param {string} toEmail - Adresa de email a clientului
 * @param {object} invoiceData - Datele pentru factură (client, produse, sumă, etc.)
 */
async function generateAndSendInvoice(toEmail, invoiceData) {
  // Company details (replace with real data)
  const company = {
    name: 'Corcodusa',
    address: 'Bucuresti, Romania',
    email: 'contact@corcodusa.ro',
  };

  // Create PDF invoice in memory
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', async () => {
    const pdfBuffer = Buffer.concat(buffers);
    // Send email with invoice attached
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"Corcodusa" <${process.env.ZMAIL_USER}>`,
      to: toEmail,
      subject: 'Factura pentru achiziția ta - Corcodusa',
      text: 'Găsești atașată factura pentru achiziția ta. Îți mulțumim!',
      attachments: [
        {
          filename: 'Factura-Corcodusa.pdf',
          content: pdfBuffer,
        },
      ],
    });
    console.log(`Factura trimisă către: ${toEmail}`);
  });

  // --- PDF content ---
  doc.fontSize(20).text('FACTURĂ', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Furnizor: ${company.name}`);
  doc.text(`Adresa: ${company.address}`);
  doc.text(`Email: ${company.email}`);
  doc.moveDown();
  doc.text(`Client: ${invoiceData.clientName || invoiceData.clientEmail}`);
  doc.text(`Email client: ${invoiceData.clientEmail}`);
  doc.moveDown();
  doc.text(`Produs: ${invoiceData.productName}`);
  doc.text(`Preț: ${invoiceData.price} Lei`);
  doc.text(`Data: ${invoiceData.date}`);
  doc.moveDown();
  doc.text('Vă mulțumim pentru achiziție!', { align: 'center' });
  doc.end();
}

module.exports = { sendPDF, sendContactEmail, sendEmailWithAttachment, generateAndSendInvoice };

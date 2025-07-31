const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

/**
 * Trimite un PDF ca atașament email-ului către adresa specificată.
 * @param {string} toEmail - Adresa de email a destinatarului
 * @param {string} productId - ID-ul produsului (ex: price_1RiBRR2c4OeQrchOtK2eOVra)
 */
async function sendPDF(toEmail, productId) {
  const pdfDir = path.join(__dirname, 'public', 'pdfs');
  const pdfFilename = `${productId}.pdf`;
  const pdfPath = path.join(pdfDir, pdfFilename);

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${pdfPath}`);
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

  const mailOptions = {
    from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
    to: toEmail,
    subject: 'Fișele tale educative - CorcoDușa',
    text:
      'Mulțumim pentru achiziție! Găsești fișierul educațional atașat acestui email.\n\n' +
      'Pentru întrebări sau suport, nu ezita să ne contactezi la contact@corcodusa.ro.',
    attachments: [
      {
        filename: pdfFilename,
        path: pdfPath,
      },
    ],
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
    from: `"CorcoDușa Contact Form" <${process.env.ZMAIL_USER}>`,
    to: 'contact@corcodusa.ro',
    subject: 'Mesaj nou din formularul de contact',
    html: `
      <h3>Ai primit un mesaj nou de la ${name} (${email})</h3>
      <p><strong>Mesaj:</strong></p>
      <p>${message}</p>
      <hr>
      <p><small>Acest mesaj a fost trimis din formularul de contact de pe site-ul CorcoDușa.</small></p>
    `,
    replyTo: email,
  });
  console.log(`Email de contact trimis către contact@corcodusa.ro de la: ${name} <${email}>`);
}

/**
 * Trimite o notificare de comandă către contact@corcodusa.ro
 * @param {Object} orderDetails - Detaliile comenzii
 */
async function sendOrderNotification(orderDetails) {
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
    from: `"CorcoDușa Orders" <${process.env.ZMAIL_USER}>`,
    to: 'contact@corcodusa.ro',
    subject: 'Comandă nouă - CorcoDușa',
    html: `
      <h3>Comandă nouă primită!</h3>
      <p><strong>Client:</strong> ${orderDetails.customerEmail}</p>
      <p><strong>Produs:</strong> ${orderDetails.productName}</p>
      <p><strong>Preț:</strong> ${orderDetails.amount} ${orderDetails.currency}</p>
      <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
      <p><strong>Session ID:</strong> ${orderDetails.sessionId}</p>
      <hr>
      <p><small>Notificare automată de la sistemul CorcoDușa.</small></p>
    `,
  });
  console.log(`Notificare comandă trimisă către contact@corcodusa.ro pentru: ${orderDetails.customerEmail}`);
}

/**
 * Trimite un PDF ca atașament după numele produsului (productName) din folderul public/pdfs
 * @param {string} to - Adresa de email a destinatarului
 * @param {string} productName - Numele produsului (inclusiv extensia, ex: Alfabetul .pdf)
 */
async function sendEmailWithAttachment(to, productName) {
  const filePath = path.join(__dirname, '..', 'public', 'pdfs', productName);
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

module.exports = { sendPDF, sendContactEmail, sendOrderNotification, sendEmailWithAttachment };

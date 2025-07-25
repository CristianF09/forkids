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

module.exports = { sendPDF, sendContactEmail, sendEmailWithAttachment };

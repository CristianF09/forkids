require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');



/**
 * Sends a PDF as an email attachment to the specified email address.
 * @param {string} toEmail - Recipient's email address
 * @param {string} productId - ID-ul produsului (ex: price_1RiBRR2c4OeQrchOtK2eOVra)
 */
async function sendPDF(toEmail, productId) {
  const pdfDir = path.join(__dirname, 'public', 'pdfs');
  const pdfFilename = `${productId}.pdf`;
  const pdfPath = path.join(pdfDir, pdfFilename);

  // Verificăm dacă fișierul există
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${pdfPath}`);
  }

  // Configurare transport SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  });

  // Trimitem emailul cu PDF-ul atașat
  const mailOptions = {
    from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
    to: toEmail,
    subject: 'Fișele tale educative - CorcoDușa',
    text: 'Mulțumim pentru achiziție! Găsești fișierele tău educațional atașat acestui email.\n\nPentru întrebări sau suport, nu ezita să ne contactezi la contact@corcodusa.ro.',
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
 * Trimite un email de contact către contact@corcodusa.ro cu detaliile din formular.
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

  const mailOptions = {
    from: `"${name}" <${process.env.ZMAIL_USER}>`,
    to: 'contact@corcodusa.ro',
    subject: 'Formular de contact - CorcoDușa',
    text: `Ai primit un mesaj nou de la formularul de contact:\n\nNume: ${name}\nEmail: ${email}\nMesaj: ${message}`,
    replyTo: email,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email de contact primit de la: ${name} <${email}>`);
}

module.exports = { sendPDF, sendContactEmail };

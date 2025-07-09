const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

/**
 * Sends a PDF as an email attachment to the specified email address.
 * @param {string} toEmail - Recipient's email address
 * @param {string} product - PDF file name (should match a file in backend/public/pdfs/)
 */
async function sendPDF(toEmail, product) {
  // Build the PDF file path
  const pdfPath = path.join(__dirname, 'public', 'pdfs', product + '.pdf');

  // Check if the file exists
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`PDF file not found: ${pdfPath}`);
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });

  // Send the email with PDF attachment
  await transporter.sendMail({
    from: `"ForKids" <${process.env.ZOHO_USER}>`,
    to: toEmail,
    subject: 'PDF-ul tau de la ForKids',
    text: 'Multumim pentru achizitie! Gasesti PDF-ul atasat acestui email.',
    attachments: [
      {
        filename: product + '.pdf',
        path: pdfPath,
      },
    ],
  });
}

module.exports = { sendPDF }; 
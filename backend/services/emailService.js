const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const log = (...args) => process.stdout.write(`${args.join(' ')}\n`);
const errorLog = (...args) => process.stderr.write(`${args.join(' ')}\n`);

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[s]);
}

// Resend HTTP API — uses port 443, works on all cloud providers
async function sendViaResend({ from, to, subject, text, html, attachments }) {
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const payload = { from, to, subject, text, html };

  if (attachments && attachments.length > 0) {
    payload.attachments = attachments.map((a) => ({
      filename: a.filename,
      content: a.path ? fs.readFileSync(a.path) : a.content,
    }));
  }

  const { data, error } = await resend.emails.send(payload);
  if (error) throw new Error(error.message || JSON.stringify(error));
  log('✓ Email sent via Resend HTTP API:', data.id);
  return data;
}

function createZohoTransporter() {
  const host = process.env.ZMAIL_HOST || 'smtp.zoho.eu';
  const port = parseInt(process.env.ZMAIL_PORT || '587');
  const secure = process.env.ZMAIL_SECURE === 'true';
  log(`Creating Zoho transporter: ${host}:${port}, secure:${secure}`);
  return nodemailer.createTransport({
    host, port, secure, requireTLS: !secure,
    auth: { user: process.env.ZMAIL_USER, pass: process.env.ZMAIL_PASS },
  });
}

async function sendMail(mailOptions) {
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(mailOptions);
  }
  const transporter = createZohoTransporter();
  const info = await transporter.sendMail(mailOptions);
  log('✓ Email sent via Zoho:', info.messageId);
  return info;
}

const FROM_ADDRESS = 'contact@corcodusa.ro';

async function sendPDF(toEmail, productId) {
  const pdfDir = path.join(__dirname, '..', 'public', 'pdfs');
  const pdfFilename = `${productId}.pdf`;
  const pdfPath = path.join(pdfDir, pdfFilename);

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${pdfPath}`);
  }

  return sendMail({
    from: `"CorcoDușa" <${FROM_ADDRESS}>`,
    to: toEmail,
    subject: 'Fișele tale educative - CorcoDușa',
    text: 'Mulțumim pentru achiziție! Găsești fișierul educațional atașat acestui email.\n\nPentru întrebări sau suport, nu ezita să ne contactezi la contact@corcodusa.ro.',
    attachments: [{ filename: pdfFilename, path: pdfPath }],
  });
}

async function sendContactEmail({ name, email, message }) {
  return sendMail({
    from: `"CorcoDușa Contact Form" <${FROM_ADDRESS}>`,
    to: 'contact@corcodusa.ro',
    subject: 'Mesaj nou din formularul de contact',
    text: `Mesaj de la: ${name} (${email})\n\n${message}`,
    html: `
      <h3>Ai primit un mesaj nou de la ${escapeHtml(name)} (${escapeHtml(email)})</h3>
      <p><strong>Mesaj:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Trimis din formularul de contact CorcoDușa.</small></p>
    `,
    replyTo: email,
  });
}

async function sendOrderNotification(orderDetails) {
  return sendMail({
    from: `"CorcoDușa Orders" <${FROM_ADDRESS}>`,
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
      <p><small>Notificare automată CorcoDușa.</small></p>
    `,
  });
}

async function sendEmailWithAttachment(to, productName) {
  const filePath = path.join(__dirname, '..', 'public', 'pdfs', productName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${filePath}`);
  }

  return sendMail({
    from: `"CorcoDușa" <${FROM_ADDRESS}>`,
    to,
    subject: `Mulțumim pentru achiziția ${productName}`,
    text: 'Găsești atașat materialul digital cumpărat. Îți mulțumim!',
    attachments: [{ filename: productName, path: filePath }],
  });
}

module.exports = {
  sendPDF,
  sendContactEmail,
  sendOrderNotification,
  sendEmailWithAttachment,
};

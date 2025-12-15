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
/**
 * Creează un transporter SMTP bazat pe setările din .env
 */
function createTransporter(useFallback = false) {
  const host = useFallback ? 'smtp.zoho.eu' : (process.env.ZMAIL_HOST || 'smtp.zoho.eu');
  const port = useFallback ? 587 : parseInt(process.env.ZMAIL_PORT || '587');
  const secure = useFallback ? false : (process.env.ZMAIL_SECURE === 'true');
  
  log(`Creating transporter: ${host}:${port}, secure:${secure}, fallback:${useFallback}`);
  
  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    requireTLS: !secure, // Pentru portul 587 (TLS), nu pentru 465 (SSL)
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
    logger: true,
    debug: true,
  });
}

/**
 * Trimite un PDF ca atașament email-ului către adresa specificată.
 */
async function sendPDF(toEmail, productId) {
  const pdfDir = path.join(__dirname, '..', 'public', 'pdfs');
  const pdfFilename = `${productId}.pdf`;
  const pdfPath = path.join(pdfDir, pdfFilename);

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${pdfPath}`);
  }

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

  try {
    const transporter = createTransporter(false);
    log('Încerc să trimit PDF cu config din .env');
    const info = await transporter.sendMail(mailOptions);
    log('✓ PDF trimis cu succes:', info.messageId);
    return info;
  } catch (err) {
    errorLog('✗ Eroare la trimiterea PDF-ului:', err.message);
    
    try {
      log('Încerc fallback pe portul 587...');
      const fallbackTransporter = createTransporter(true);
      const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
      log('✓ PDF trimis cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
    } catch (fallbackErr) {
      errorLog('✗ Eroare și la fallback pentru PDF:', fallbackErr.message);
      throw new Error(`Nu s-a putut trimite PDF-ul: ${fallbackErr.message}`);
    }
  }
}

/**
 * Trimite un email de contact către contact@corcodusa.ro
 */
async function sendContactEmail({ name, email, message }) {
  const mail = {
    from: `"CorcoDușa Contact Form" <${process.env.ZMAIL_USER}>`,
    to: 'contact@corcodusa.ro',
    subject: 'Mesaj nou din formularul de contact',
    text: `Mesaj de la: ${name} (${email})\n\n${message}`,
    html: `
      <h3>Ai primit un mesaj nou de la ${escapeHtml(name)} (${escapeHtml(email)})</h3>
      <p><strong>Mesaj:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Acest mesaj a fost trimis din formularul de contact de pe site-ul CorcoDușa.</small></p>
    `,
    replyTo: email,
  };

  try {
    const transporter = createTransporter(false);
    log('Încerc să trimit email de contact cu config din .env');
    const info = await transporter.sendMail(mail);
    log('✓ Email de contact trimis cu succes:', info.messageId);
    return info;
  } catch (err) {
    errorLog('✗ Eroare la trimiterea email-ului de contact:', err.message);
    
    try {
      log('Încerc fallback pe portul 587 pentru contact...');
      const fallbackTransporter = createTransporter(true);
      const fallbackInfo = await fallbackTransporter.sendMail(mail);
      log('✓ Email de contact trimis cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
    } catch (fallbackErr) {
      errorLog('✗ Eroare și la fallback pentru contact:', fallbackErr.message);
      throw new Error(`Nu s-a putut trimite email-ul de contact: ${fallbackErr.message}`);
    }
  }
}

/**
 * Trimite o notificare de comandă către contact@corcodusa.ro
 */
async function sendOrderNotification(orderDetails) {
  const mail = {
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
  };

  try {
    const transporter = createTransporter(false);
    log('Încerc să trimit notificare comandă cu config din .env');
    const info = await transporter.sendMail(mail);
    log('✓ Notificare comandă trimisă cu succes:', info.messageId);
    return info;
  } catch (err) {
    errorLog('✗ Eroare la trimiterea notificării comenzii:', err.message);
    
    try {
      log('Încerc fallback pe portul 587 pentru notificare...');
      const fallbackTransporter = createTransporter(true);
      const fallbackInfo = await fallbackTransporter.sendMail(mail);
      log('✓ Notificare comandă trimisă cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
    } catch (fallbackErr) {
      errorLog('✗ Eroare și la fallback pentru notificare:', fallbackErr.message);
      throw new Error(`Nu s-a putut trimite notificarea comenzii: ${fallbackErr.message}`);
    }
  }
}

/**
 * Trimite un PDF ca atașament după numele produsului
 */
async function sendEmailWithAttachment(to, productName) {
  const filePath = path.join(__dirname, '..', 'public', 'pdfs', productName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${filePath}`);
  }

  const mail = {
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
  };

  try {
    const transporter = createTransporter(false);
    log(`Încerc să trimit email cu atașament ${productName} către ${to}`);
    const info = await transporter.sendMail(mail);
    log('✓ Email cu atașament trimis cu succes:', info.messageId);
    return info;
  } catch (err) {
    errorLog('✗ Eroare la trimiterea email-ului cu atașament:', err.message);
    
    try {
      log('Încerc fallback pe portul 587 pentru email cu atașament...');
      const fallbackTransporter = createTransporter(true);
      const fallbackInfo = await fallbackTransporter.sendMail(mail);
      log('✓ Email cu atașament trimis cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
    } catch (fallbackErr) {
      errorLog('✗ Eroare și la fallback pentru email cu atașament:', fallbackErr.message);
      throw new Error(`Nu s-a putut trimite email-ul cu atașament: ${fallbackErr.message}`);
    }
  }
}

/**
 * Funcție de test pentru SMTP configuration
 */
async function testSmtpConnection() {
  try {
    log('🧪 Testare conexiune SMTP...');
    log(`Config: ${process.env.ZMAIL_HOST}:${process.env.ZMAIL_PORT}, user: ${process.env.ZMAIL_USER}`);
    
    const transporter = createTransporter(false);
    
    // Testează conexiunea
    await transporter.verify();
    log('✓ Conexiunea SMTP este funcțională!');
    
    // Trimite un email de test
    const testInfo = await transporter.sendMail({
      from: `"Test SMTP" <${process.env.ZMAIL_USER}>`,
      to: process.env.ZMAIL_USER,
      subject: 'Test SMTP Configuration',
      text: 'Acesta este un email de test pentru a verifica configurația SMTP.',
      html: '<p>Acesta este un <strong>email de test</strong> pentru a verifica configurația SMTP.</p>'
    });
    
    log('✓ Email de test trimis cu succes! Message ID:', testInfo.messageId);
    log('⚠ Verifică căsuța de email și folderul SPAM pentru emailul de test.');
    
    return { success: true, messageId: testInfo.messageId };
  } catch (error) {
    errorLog('✗ Eroare la testarea SMTP:', error.message);
    errorLog('Eroare detaliată:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { 
  sendPDF, 
  sendContactEmail, 
  sendOrderNotification, 
  sendEmailWithAttachment,
  testSmtpConnection 
};

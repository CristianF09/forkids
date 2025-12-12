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
  const pdfDir = path.join(__dirname, '..', 'public', 'pdfs');
  const pdfFilename = `${productId}.pdf`;
  const pdfPath = path.join(pdfDir, pdfFilename);

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Fișierul PDF nu a fost găsit: ${pdfPath}`);
  }

  const primaryTransporter = nodemailer.createTransport({
    host: process.env.ZMAIL_HOST || 'smtp.zoho.eu',
    port: parseInt(process.env.ZMAIL_PORT || '465'),
    secure: process.env.ZMAIL_SECURE === 'true',
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
    logger: true,
    debug: true
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

  try {
    console.log('Încerc să trimit PDF cu config:', {
      host: process.env.ZMAIL_HOST,
      port: process.env.ZMAIL_PORT,
      user: process.env.ZMAIL_USER,
      secure: process.env.ZMAIL_SECURE
    });
    
    const info = await primaryTransporter.sendMail(mailOptions);
    console.log('PDF trimis cu succes:', info.messageId);
    return info;
    
  } catch (err) {
    console.error('Eroare la trimiterea PDF-ului:', err);
    
    const fallbackTransporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
      logger: true,
      debug: true
    });
    
    try {
      console.log('Încerc fallback pe portul 587 pentru PDF...');
      const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
      console.log('PDF trimis cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
    } catch (fallbackErr) {
      console.error('Eroare și la fallback pentru PDF:', fallbackErr);
      throw new Error(`Nu s-a putut trimite PDF-ul: ${fallbackErr.message}`);
    }
  }
}

/**
 * Trimite un email de contact către contact@corcodusa.ro cu detaliile primite din formular.
 * @param {Object} param0
 * @param {string} param0.name - Numele expeditorului
 * @param {string} param0.email - Emailul expeditorului
 * @param {string} param0.message - Mesajul expeditorului
 */
async function sendContactEmail({ name, email, message }) {
  const primaryTransporter = nodemailer.createTransport({
    host: process.env.ZMAIL_HOST || 'smtp.zoho.eu',
    port: parseInt(process.env.ZMAIL_PORT || '465'),
    secure: process.env.ZMAIL_SECURE === 'true',
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
    logger: true,
    debug: true
  });

  const mail = {
    from: `"CorcoDușa Contact Form" <${process.env.ZMAIL_USER}>`,
    to: 'contact@corcodusa.ro',
    subject: 'Mesaj nou din formularul de contact',
    text: `Mesaj de la: ${name} (${email})\n\n${message}`,
    html: `
      <h3>Ai primit un mesaj nou de la ${name} (${email})</h3>
      <p><strong>Mesaj:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Acest mesaj a fost trimis din formularul de contact de pe site-ul CorcoDușa.</small></p>
    `,
    replyTo: email,
  };

  try {
    console.log('Încerc să trimit email de contact cu config:', {
      host: process.env.ZMAIL_HOST,
      port: process.env.ZMAIL_PORT,
      user: process.env.ZMAIL_USER,
      secure: process.env.ZMAIL_SECURE
    });
    
    const info = await primaryTransporter.sendMail(mail);
    console.log('Email de contact trimis cu succes:', info.messageId);
    return info;
    
  } catch (err) {
    console.error('Eroare la trimiterea email-ului de contact:', err);
    
    try {
      console.log('Încerc fallback pe portul 587 pentru contact...');
      const fallbackTransporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.ZMAIL_USER,
          pass: process.env.ZMAIL_PASS,
        },
        logger: true,
        debug: true
      });
      
      const fallbackInfo = await fallbackTransporter.sendMail(mail);
      console.log('Email de contact trimis cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
      
    } catch (fallbackErr) {
      console.error('Eroare și la fallback pentru contact:', fallbackErr);
      throw new Error(`Nu s-a putut trimite email-ul de contact: ${fallbackErr.message}`);
    }
  }
}

/**
 * Trimite o notificare de comandă către contact@corcodusa.ro
 * @param {Object} orderDetails - Detaliile comenzii
 */
async function sendOrderNotification(orderDetails) {
  const transporter = nodemailer.createTransport({
    host: process.env.ZMAIL_HOST,
    port: parseInt(process.env.ZMAIL_PORT),
    secure: process.env.ZMAIL_SECURE === 'true',
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
    logger: true,
    debug: true
  });

  try {
    console.log('Încerc să trimit notificare comandă cu config:', {
      host: process.env.ZMAIL_HOST,
      port: process.env.ZMAIL_PORT,
      user: process.env.ZMAIL_USER,
      secure: process.env.ZMAIL_SECURE
    });
    
    const info = await transporter.sendMail({
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
    
    console.log('Notificare comandă trimisă cu succes:', info.messageId);
    return info;
    
  } catch (err) {
    console.error('Eroare la trimiterea notificării comenzii:', err);
    
    const fallbackTransporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
      logger: true,
      debug: true
    });
    
    try {
      console.log('Încerc fallback pe portul 587 pentru notificare comandă...');
      const fallbackInfo = await fallbackTransporter.sendMail({
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
      
      console.log('Notificare comandă trimisă cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
      
    } catch (fallbackErr) {
      console.error('Eroare și la fallback pentru notificare comandă:', fallbackErr);
      throw new Error(`Nu s-a putut trimite notificarea comenzii: ${fallbackErr.message}`);
    }
  }
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
    host: process.env.ZMAIL_HOST,
    port: parseInt(process.env.ZMAIL_PORT),
    secure: process.env.ZMAIL_SECURE === 'true',
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
    logger: true,
    debug: true
  });

  try {
    console.log('Încerc să trimit email cu atașament:', {
      host: process.env.ZMAIL_HOST,
      port: process.env.ZMAIL_PORT,
      user: process.env.ZMAIL_USER,
      secure: process.env.ZMAIL_SECURE,
      to: to,
      productName: productName
    });
    
    const info = await transporter.sendMail({
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
    
    console.log('Email cu atașament trimis cu succes:', info.messageId);
    return info;
    
  } catch (err) {
    console.error('Eroare la trimiterea email-ului cu atașament:', err);
    
    const fallbackTransporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
      logger: true,
      debug: true
    });
    
    try {
      console.log('Încerc fallback pe portul 587 pentru email cu atașament...');
      const fallbackInfo = await fallbackTransporter.sendMail({
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
      
      console.log('Email cu atașament trimis cu fallback:', fallbackInfo.messageId);
      return fallbackInfo;
      
    } catch (fallbackErr) {
      console.error('Eroare și la fallback pentru email cu atașament:', fallbackErr);
      throw new Error(`Nu s-a putut trimite email-ul cu atașament: ${fallbackErr.message}`);
    }
  }
}

module.exports = { sendPDF, sendContactEmail, sendOrderNotification, sendEmailWithAttachment };
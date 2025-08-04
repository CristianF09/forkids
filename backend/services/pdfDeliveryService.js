const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

/**
 * Send PDF with size optimization
 */
async function sendPDFWithOptimization(toEmail, pdfFileName, productName, amount, currency) {
  const filePath = path.join(__dirname, '..', 'public', 'pdfs', pdfFileName);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF file not found: ${pdfFileName}`);
  }

  const stats = fs.statSync(filePath);
  const fileSizeInMB = stats.size / (1024 * 1024);
  
  console.log(`📁 PDF file: ${pdfFileName}, Size: ${fileSizeInMB.toFixed(2)} MB`);

  const transporter = nodemailer.createTransporter({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  });

  // If PDF is small enough (< 5MB), send as attachment
  if (fileSizeInMB < 5) {
    console.log('✅ PDF is small enough, sending as attachment');
    
    await transporter.sendMail({
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: toEmail,
      subject: `Materialul digital ${productName} - CorcoDușa`,
      text: `Mulțumim pentru achiziție! Găsești materialul digital atașat acestui email.`,
      attachments: [
        {
          filename: pdfFileName,
          path: filePath,
        },
      ],
    });
    
    console.log('✅ PDF sent as attachment to:', toEmail);
  } else {
    // If PDF is too large, send notification email
    console.log('⚠️ PDF is too large, sending notification email');
    
    await transporter.sendMail({
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: toEmail,
      subject: `Materialul digital ${productName} - CorcoDușa`,
      html: `
        <h2>Materialul digital este gata!</h2>
        <p><strong>Produs:</strong> ${productName}</p>
        <p><strong>Preț:</strong> ${amount} ${currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <hr>
        <p>Materialul digital pentru ${productName} a fost pregătit.</p>
        <p><strong>Notă:</strong> PDF-ul este prea mare pentru email. Vă vom contacta în curând cu link-ul de descărcare.</p>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `
    });
    
    console.log('✅ PDF delivery notification sent to:', toEmail);
  }
}

module.exports = { sendPDFWithOptimization }; 
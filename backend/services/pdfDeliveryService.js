const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

/**
 * Send PDF with size optimization
 */
async function sendPDFWithOptimization(toEmail, pdfFileName, productName, amount, currency) {
  console.log(`📧 Starting PDF delivery: ${pdfFileName} to ${toEmail}`);
  
  // Check environment variables first
  const isDryRun = process.env.DRY_RUN === 'true';
  if (!isDryRun && (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS)) {
    throw new Error('ZMAIL_USER and ZMAIL_PASS environment variables are required');
  }
  
  const filePath = path.join(__dirname, '..', 'public', 'pdfs', pdfFileName);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF file not found: ${pdfFileName} at path: ${filePath}`);
  }

  const stats = fs.statSync(filePath);
  const fileSizeInMB = stats.size / (1024 * 1024);
  
  console.log(`📁 PDF file: ${pdfFileName}, Size: ${fileSizeInMB.toFixed(2)} MB`);

  const transporter = !isDryRun ? nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  }) : null;

  // Always deliver as ZIP (attach if small enough, otherwise provide download link)
  const tempDir = path.join(__dirname, '..', 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('📁 Created temp directory:', tempDir);
  }

  const baseName = path.basename(pdfFileName, path.extname(pdfFileName));
  const zipFileName = `${baseName}_${Date.now()}.zip`;
  const zipFilePath = path.join(tempDir, zipFileName);

  try {
    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', async () => {
        try {
          const statsZip = fs.statSync(zipFilePath);
          const zipSizeMB = statsZip.size / (1024 * 1024);
          console.log(`📦 ZIP created for ${pdfFileName}: ${zipFileName} (${zipSizeMB.toFixed(2)} MB)`);

          if (zipSizeMB > 25) {
            console.log('⚠️ ZIP too large to email, sending download link instead');

            // Move ZIP to public/pdfs so it can be downloaded
            const publicZipPath = path.join(__dirname, '..', 'public', 'pdfs', zipFileName);
            try {
              fs.renameSync(zipFilePath, publicZipPath);
            } catch (moveErr) {
              fs.copyFileSync(zipFilePath, publicZipPath);
              fs.unlinkSync(zipFilePath);
            }

            const serverUrl = process.env.SERVER_URL || 'https://corcodusa.ro';
            const downloadUrl = `${serverUrl}/api/download/${encodeURIComponent(zipFileName)}`;
            if (isDryRun) {
              console.log('🧪 DRY_RUN: would send download link email', { toEmail, downloadUrl });
              return resolve();
            }
            await transporter.sendMail({
              from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
              to: toEmail,
              subject: `Materialul digital ${productName} (ZIP) - Link de descărcare - CorcoDușa`,
              html: `
                <h2>Materialul digital este gata!</h2>
                <p><strong>Produs:</strong> ${productName}</p>
                <p><strong>Preț:</strong> ${amount} ${currency}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
                <hr>
                <p>Fișierul ZIP este disponibil pentru descărcare în siguranță:</p>
                <p>
                  <a href="${downloadUrl}" style="background:#20BF55;color:#fff;padding:8px 16px;text-decoration:none;border-radius:4px;display:inline-block;">
                    📥 Descarcă ${productName} (ZIP)
                  </a>
                </p>
                <p>Pentru întrebări: contact@corcodusa.ro</p>
              `,
            });
            console.log('✅ Download link email sent to:', toEmail);
          } else {
            console.log('✅ ZIP size acceptable, sending ZIP via email');
            if (isDryRun) {
              console.log('🧪 DRY_RUN: would send ZIP attachment', { toEmail, zipFileName });
              // Clean up ZIP
              fs.unlink(zipFilePath, () => {});
              return resolve();
            }
            await transporter.sendMail({
              from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
              to: toEmail,
              subject: `Materialul digital ${productName} (ZIP) - CorcoDușa`,
              html: `
                <h2>Materialul digital este gata!</h2>
                <p><strong>Produs:</strong> ${productName}</p>
                <p><strong>Preț:</strong> ${amount} ${currency}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
                <hr>
                <p>Găsești atașat fișierul ZIP care conține materialul tău digital.</p>
                <p>Pentru întrebări: contact@corcodusa.ro</p>
              `,
              attachments: [
                { filename: zipFileName, path: zipFilePath },
              ],
            });
            console.log('✅ ZIP sent to:', toEmail);

            // Clean up ZIP
            fs.unlink(zipFilePath, () => {});
          }

          resolve();
        } catch (err) {
          reject(err);
        }
      });

      archive.on('error', (err) => reject(err));
      archive.pipe(output);
      archive.file(filePath, { name: pdfFileName });
      archive.finalize();
    });
  } catch (error) {
    console.error('❌ Error creating/sending ZIP:', error);
    throw error;
  }
}

module.exports = { sendPDFWithOptimization }; 
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { sendMail } = require('./emailService');

const FROM = '"CorcoDușa" <contact@corcodusa.ro>';

async function sendPDFWithOptimization(toEmail, pdfFileName, productName, amount, currency) {
  console.log(`📧 Starting PDF delivery: ${pdfFileName} to ${toEmail}`);

  const isDryRun = process.env.DRY_RUN === 'true';

  const filePath = path.join(__dirname, '..', 'public', 'pdfs', pdfFileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF file not found: ${pdfFileName} at path: ${filePath}`);
  }

  const stats = fs.statSync(filePath);
  const fileSizeInMB = stats.size / (1024 * 1024);

  console.log(`📁 PDF file: ${pdfFileName}, Size: ${fileSizeInMB.toFixed(2)} MB`);

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

          if (zipSizeMB > 15) {
            console.log('⚠️ ZIP too large to email, sending download link instead');

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

            await sendMail({
              from: FROM,
              to: toEmail,
              subject: `Materialul digital ${productName} - CorcoDușa`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #20BF55;">🎉 Mulțumim pentru achiziție!</h2>

                  <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #20BF55;">📦 ${productName}</h3>
                    <p>Fișierul ZIP cu materialele tale digitale este disponibil pentru descărcare în siguranță:</p>
                    <p style="text-align: center; margin: 20px 0;">
                      <a href="${downloadUrl}" style="background:#20BF55;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                        📥 Descarcă ${productName} (ZIP)
                      </a>
                    </p>
                    <p><em>Link-ul de descărcare este valabil timp de 30 de zile.</em></p>
                    <p><em>Chitanța de plată a fost trimisă automat de către Stripe.</em></p>
                  </div>

                  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                  <p style="color: #666; font-size: 14px;">
                    Pentru întrebări sau suport: <a href="mailto:contact@corcodusa.ro">contact@corcodusa.ro</a><br>
                    Mulțumim că ai ales CorcoDușa! 🎓
                  </p>
                </div>
              `,
            });
            console.log('✅ Download link email sent to:', toEmail);

          } else {
            console.log('✅ ZIP size acceptable, attaching ZIP to email');

            if (isDryRun) {
              console.log('🧪 DRY_RUN: would send ZIP attachment', { toEmail, zipFileName });
              fs.unlink(zipFilePath, () => {});
              return resolve();
            }

            await sendMail({
              from: FROM,
              to: toEmail,
              subject: `Materialul digital ${productName} - CorcoDușa`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #20BF55;">🎉 Mulțumim pentru achiziție!</h2>

                  <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #20BF55;">📦 ${productName}</h3>
                    <p>Găsești atașat fișierul ZIP care conține materialele tale digitale.</p>
                    <p><strong>Fișier atașat:</strong> ${zipFileName}</p>
                    <p><em>Chitanța de plată a fost trimisă automat de către Stripe.</em></p>
                  </div>

                  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                  <p style="color: #666; font-size: 14px;">
                    Pentru întrebări sau suport: <a href="mailto:contact@corcodusa.ro">contact@corcodusa.ro</a><br>
                    Mulțumim că ai ales CorcoDușa! 🎓
                  </p>
                </div>
              `,
              attachments: [
                { filename: zipFileName, path: zipFilePath },
              ],
            });
            console.log('✅ ZIP sent to:', toEmail);

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

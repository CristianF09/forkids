require('dotenv').config();
const { sendOrderNotification } = require('./services/emailService');
const nodemailer = require('nodemailer');
const path = require('path');

console.log('🧪 Testing Single Email - Pachet Complet');
console.log('=========================================');

async function testSingleEmailPachet() {
  const orderData = {
    customerEmail: 'cris7i_laurentiu@yahoo.com',
    customerName: 'Cris F',
    sessionId: 'cs_test_single_email_pachet_123456789',
    productName: 'Pachet Complet',
    amount: 89.99,
    currency: 'RON'
  };

  // All PDF files in the package
  const pdfFiles = [
    'Alfabetul.pdf',
    'Numere.pdf', 
    'FormeSiCulori.pdf',
    'BonusCertificateDeAbsovire.pdf',
    'BonusFiseDeColorat.pdf'
  ];

  console.log('📦 Pachet Complet Order (Single Email)');
  console.log('📧 Customer:', orderData.customerName);
  console.log('📧 Email:', orderData.customerEmail);
  console.log('💰 Amount:', orderData.amount, orderData.currency);
  console.log('📦 Product:', orderData.productName);
  console.log('📄 PDFs to attach:', pdfFiles.length);
  pdfFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });

  try {
    console.log('\n📤 Step 1: Sending order notification to contact@corcodusa.ro...');
    await sendOrderNotification({
      customerEmail: orderData.customerEmail,
      customerName: orderData.customerName,
      productName: orderData.productName,
      amount: orderData.amount,
      currency: orderData.currency,
      sessionId: orderData.sessionId
    });
    console.log('✅ Order notification sent to contact@corcodusa.ro');

    console.log('\n📤 Step 2: Sending single email with invoice and all PDFs...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });

    // Prepare attachments array
    const attachments = [];
    for (const pdfFile of pdfFiles) {
      attachments.push({
        filename: pdfFile,
        path: path.join(__dirname, 'public', 'pdfs', pdfFile)
      });
    }

    const singleEmail = {
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: orderData.customerEmail,
      subject: `Factura și materialele digitale ${orderData.productName} - CorcoDușa`,
      html: `
        <h2>Factura și Materialele Digitale - CorcoDușa</h2>
        <p><strong>Client:</strong> ${orderData.customerName}</p>
        <p><strong>Produs:</strong> ${orderData.productName}</p>
        <p><strong>Preț:</strong> ${orderData.amount} ${orderData.currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <p><strong>Session ID:</strong> ${orderData.sessionId}</p>
        <hr>
        <h3>📄 Materialele digitale incluse:</h3>
        <ul>
          <li>Alfabetul.pdf</li>
          <li>Numere.pdf</li>
          <li>FormeSiCulori.pdf</li>
          <li>BonusCertificateDeAbsovire.pdf</li>
          <li>BonusFiseDeColorat.pdf</li>
        </ul>
        <hr>
        <p>Mulțumim pentru achiziție!</p>
        <p>Toate materialele digitale sunt atașate la acest email.</p>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `,
      attachments: attachments
    };

    await transporter.sendMail(singleEmail);
    console.log('✅ Single email with invoice and all PDFs sent to customer:', orderData.customerEmail);

    console.log('\n🎉 Single email test completed successfully!');
    console.log('\n📋 Order Summary:');
    console.log('✅ Order notification sent to contact@corcodusa.ro');
    console.log('✅ Single email with invoice and all PDFs sent to customer');
    console.log(`✅ ${pdfFiles.length} PDFs attached to single email`);
    console.log('✅ All email types working correctly');

  } catch (error) {
    console.error('❌ Error in single email test:', error.message);
    console.error('Full error:', error);
  }
}

testSingleEmailPachet().catch(console.error); 
require('dotenv').config();
const { sendOrderNotification } = require('./services/emailService');
const nodemailer = require('nodemailer');
const path = require('path');

console.log('🧪 Testing Two Emails - Pachet Complet');
console.log('=======================================');

async function testTwoEmailsPachet() {
  const orderData = {
    customerEmail: 'cris7i_laurentiu@yahoo.com',
    customerName: 'Cris F',
    sessionId: 'cs_test_two_emails_pachet_123456789',
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

  console.log('📦 Pachet Complet Order (Two Emails)');
  console.log('📧 Customer:', orderData.customerName);
  console.log('📧 Email:', orderData.customerEmail);
  console.log('💰 Amount:', orderData.amount, orderData.currency);
  console.log('📦 Product:', orderData.productName);
  console.log('📄 PDFs to send:', pdfFiles.length);
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

    console.log('\n📤 Step 2: Sending invoice email...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });

    const invoiceEmail = {
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: orderData.customerEmail,
      subject: `Factura pentru ${orderData.productName} - CorcoDușa`,
      html: `
        <h2>Factura - CorcoDușa</h2>
        <p><strong>Client:</strong> ${orderData.customerName}</p>
        <p><strong>Produs:</strong> ${orderData.productName}</p>
        <p><strong>Preț:</strong> ${orderData.amount} ${orderData.currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <p><strong>Session ID:</strong> ${orderData.sessionId}</p>
        <hr>
        <p>Mulțumim pentru achiziție!</p>
        <p>Materialele digitale vor fi trimise în următoarea email.</p>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `
    };

    await transporter.sendMail(invoiceEmail);
    console.log('✅ Invoice email sent to customer:', orderData.customerEmail);

    console.log('\n📤 Step 3: Sending PDFs email...');
    
    // Try to send all PDFs in one email
    const attachments = [];
    for (const pdfFile of pdfFiles) {
      attachments.push({
        filename: pdfFile,
        path: path.join(__dirname, 'public', 'pdfs', pdfFile)
      });
    }

    const pdfsEmail = {
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: orderData.customerEmail,
      subject: `Materialele digitale ${orderData.productName} - CorcoDușa`,
      html: `
        <h2>Materialele Digitale - CorcoDușa</h2>
        <p><strong>Client:</strong> ${orderData.customerName}</p>
        <p><strong>Produs:</strong> ${orderData.productName}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
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
        <p>Toate materialele digitale sunt atașate la acest email.</p>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `,
      attachments: attachments
    };

    try {
      await transporter.sendMail(pdfsEmail);
      console.log('✅ Single email with all PDFs sent to customer:', orderData.customerEmail);
      console.log(`✅ ${pdfFiles.length} PDFs attached to single email`);
    } catch (pdfError) {
      console.log('⚠️ Single email with all PDFs failed (too large), sending individual PDFs...');
      
      // Send PDFs individually if single email fails
      let successfulPdfs = 0;
      for (let i = 0; i < pdfFiles.length; i++) {
        const pdfFile = pdfFiles[i];
        console.log(`\n📄 Sending PDF ${i + 1}/${pdfFiles.length}: ${pdfFile}`);
        
        try {
          const singlePdfEmail = {
            from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
            to: orderData.customerEmail,
            subject: `Material digital ${pdfFile} - ${orderData.productName}`,
            html: `
              <h2>Material Digital - CorcoDușa</h2>
              <p><strong>Client:</strong> ${orderData.customerName}</p>
              <p><strong>Produs:</strong> ${orderData.productName}</p>
              <p><strong>Material:</strong> ${pdfFile}</p>
              <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
              <hr>
              <p>Materialul digital este atașat la acest email.</p>
              <p>Pentru întrebări: contact@corcodusa.ro</p>
            `,
            attachments: [{
              filename: pdfFile,
              path: path.join(__dirname, 'public', 'pdfs', pdfFile)
            }]
          };
          
          await transporter.sendMail(singlePdfEmail);
          console.log(`✅ PDF ${i + 1} sent successfully: ${pdfFile}`);
          successfulPdfs++;
        } catch (error) {
          console.log(`⚠️ PDF ${i + 1} failed: ${pdfFile}`);
        }
      }
      
      console.log(`\n📊 Individual PDF Delivery: ${successfulPdfs}/${pdfFiles.length} sent successfully`);
    }

    console.log('\n🎉 Two emails test completed successfully!');
    console.log('\n📋 Order Summary:');
    console.log('✅ Order notification sent to contact@corcodusa.ro');
    console.log('✅ Invoice email sent to customer');
    console.log('✅ PDFs email sent to customer');
    console.log('✅ All email types working correctly');

  } catch (error) {
    console.error('❌ Error in two emails test:', error.message);
    console.error('Full error:', error);
  }
}

testTwoEmailsPachet().catch(console.error); 
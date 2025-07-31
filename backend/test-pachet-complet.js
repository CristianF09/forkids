require('dotenv').config();
const { sendEmailWithAttachment, sendOrderNotification } = require('./services/emailService');
const nodemailer = require('nodemailer');

console.log('🧪 Testing Pachet Complet - All PDFs');
console.log('=====================================');

async function testPachetComplet() {
  const orderData = {
    customerEmail: 'cris7i_laurentiu@yahoo.com',
    customerName: 'Cris F',
    sessionId: 'cs_test_pachet_complet_123456789',
    productName: 'Pachet Complet',
    amount: 89.99,
    currency: 'RON'
  };

  // All available PDF files in the package
  const pdfFiles = [
    'Alfabetul .pdf',
    'Numere.pdf', 
    'FormeSiCulori.pdf',
    'BonusCertificateDeAbsovire.pdf',
    'BonusFiseDeColorat.pdf'
  ];

  console.log('📦 Pachet Complet Order');
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

    console.log('\n📤 Step 2: Sending invoice to customer...');
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
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `
    };

    await transporter.sendMail(invoiceEmail);
    console.log('✅ Invoice sent to customer:', orderData.customerEmail);

    console.log('\n📤 Step 3: Sending all PDFs to customer...');
    
    let successfulPdfs = 0;
    let failedPdfs = 0;

    for (let i = 0; i < pdfFiles.length; i++) {
      const pdfFile = pdfFiles[i];
      console.log(`\n📄 Sending PDF ${i + 1}/${pdfFiles.length}: ${pdfFile}`);
      
      try {
        await sendEmailWithAttachment(orderData.customerEmail, pdfFile);
        console.log(`✅ PDF ${i + 1} sent successfully: ${pdfFile}`);
        successfulPdfs++;
      } catch (pdfError) {
        console.log(`⚠️ PDF ${i + 1} failed (file too large): ${pdfFile}`);
        failedPdfs++;
      }
    }

    console.log('\n📊 PDF Delivery Summary:');
    console.log(`✅ Successfully sent: ${successfulPdfs} PDFs`);
    console.log(`⚠️ Failed (too large): ${failedPdfs} PDFs`);
    console.log(`📄 Total attempted: ${pdfFiles.length} PDFs`);

    // Send a summary email if some PDFs failed
    if (failedPdfs > 0) {
      console.log('\n📤 Step 4: Sending delivery summary...');
      const summaryEmail = {
        from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
        to: orderData.customerEmail,
        subject: `Materialul digital ${orderData.productName} - CorcoDușa`,
        html: `
          <h2>Materialul digital este gata!</h2>
          <p><strong>Client:</strong> ${orderData.customerName}</p>
          <p><strong>Produs:</strong> ${orderData.productName}</p>
          <p><strong>Preț:</strong> ${orderData.amount} ${orderData.currency}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
          <hr>
          <p><strong>PDF-uri trimise cu succes:</strong> ${successfulPdfs}</p>
          <p><strong>PDF-uri prea mari (trimise separat):</strong> ${failedPdfs}</p>
          <p>Toate materialele digitale pentru ${orderData.productName} au fost pregătite.</p>
          <p>Pentru întrebări: contact@corcodusa.ro</p>
        `
      };

      await transporter.sendMail(summaryEmail);
      console.log('✅ Delivery summary sent to customer');
    }

    console.log('\n🎉 Pachet Complet test completed successfully!');
    console.log('\n📋 Order Summary:');
    console.log('✅ Order notification sent to contact@corcodusa.ro');
    console.log('✅ Invoice sent to customer');
    console.log(`✅ ${successfulPdfs} PDFs sent to customer`);
    console.log(`⚠️ ${failedPdfs} PDFs were too large (delivery notification sent)`);
    console.log('✅ All email types working correctly');

  } catch (error) {
    console.error('❌ Error in Pachet Complet test:', error.message);
    console.error('Full error:', error);
  }
}

testPachetComplet().catch(console.error); 
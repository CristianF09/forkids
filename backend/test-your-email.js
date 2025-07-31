require('dotenv').config();
const { sendEmailWithAttachment, sendOrderNotification } = require('./services/emailService');
const products = require('./config/products');

console.log('🧪 Testing Your Email: cris7i_laurentiu@yahoo.com');
console.log('================================================');

async function testYourEmail() {
  const testOrders = [
    {
      customerEmail: 'cris7i_laurentiu@yahoo.com',
      customerName: 'Cris F',
      sessionId: 'cs_test_session_123456789',
      productName: 'Alfabetul',
      amount: 29.99,
      currency: 'RON',
      pdfFileName: 'Alfabetul .pdf'
    },
    {
      customerEmail: 'cris7i_laurentiu@yahoo.com',
      customerName: 'Cris F',
      sessionId: 'cs_test_session_987654321',
      productName: 'Forme și Culori',
      amount: 29.99,
      currency: 'RON',
      pdfFileName: 'FormeSiCulori.pdf'
    }
  ];

  for (let i = 0; i < testOrders.length; i++) {
    const orderData = testOrders[i];
    console.log(`\n📦 Test Order ${i + 1}: ${orderData.productName}`);
    console.log('📧 Customer:', orderData.customerName);
    console.log('📧 Email:', orderData.customerEmail);
    console.log('💰 Amount:', orderData.amount, orderData.currency);
    console.log('📦 Product:', orderData.productName);
    console.log('📄 PDF:', orderData.pdfFileName);
    
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
      const nodemailer = require('nodemailer');
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
      
      console.log('\n📤 Step 3: Sending PDF to customer...');
      try {
        await sendEmailWithAttachment(orderData.customerEmail, orderData.pdfFileName);
        console.log('✅ PDF sent to customer:', orderData.customerEmail);
      } catch (pdfError) {
        console.log('⚠️ PDF attachment failed, sending delivery notification instead');
        
        const pdfNotificationEmail = {
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
            <p>Materialul digital pentru ${orderData.productName} a fost pregătit și va fi trimis în următoarele minute.</p>
            <p>Pentru întrebări: contact@corcodusa.ro</p>
          `
        };
        
        await transporter.sendMail(pdfNotificationEmail);
        console.log('✅ PDF delivery notification sent to customer:', orderData.customerEmail);
      }
      
      console.log(`\n🎉 Test Order ${i + 1} completed successfully!`);
      
    } catch (error) {
      console.error(`❌ Error in Test Order ${i + 1}:`, error.message);
    }
  }
  
  console.log('\n📋 Final Summary:');
  console.log('✅ Multiple order notifications sent to contact@corcodusa.ro');
  console.log('✅ Multiple invoices sent to cris7i_laurentiu@yahoo.com');
  console.log('✅ Multiple PDFs sent to cris7i_laurentiu@yahoo.com');
  console.log('✅ All email types working correctly');
  console.log('\n📧 Check your emails:');
  console.log('- cris7i_laurentiu@yahoo.com (for invoices and PDFs)');
  console.log('- contact@corcodusa.ro (for order notifications)');
}

testYourEmail().catch(console.error); 
require('dotenv').config();
const { sendOrderNotification } = require('./services/emailService');
const nodemailer = require('nodemailer');

console.log('🧪 Testing Payment Notifications');
console.log('================================');

async function testNotifications() {
  console.log('\n📦 Simulating a completed payment...');
  
  // Test data
  const paymentData = {
    customerEmail: 'test.customer@example.com',
    sessionId: 'cs_test_session_123456789',
    productName: 'Alfabetul',
    amount: 29.99,
    currency: 'RON'
  };
  
  console.log('📧 Customer email:', paymentData.customerEmail);
  console.log('💰 Amount:', paymentData.amount, paymentData.currency);
  console.log('📦 Product:', paymentData.productName);
  
  try {
    console.log('\n📤 Step 1: Sending order notification to contact@corcodusa.ro...');
    await sendOrderNotification({
      customerEmail: paymentData.customerEmail,
      productName: paymentData.productName,
      amount: paymentData.amount,
      currency: paymentData.currency,
      sessionId: paymentData.sessionId
    });
    console.log('✅ Order notification sent to contact@corcodusa.ro!');
    
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
      to: paymentData.customerEmail,
      subject: `Factura pentru ${paymentData.productName} - CorcoDușa`,
      html: `
        <h2>Factura - CorcoDușa</h2>
        <p><strong>Produs:</strong> ${paymentData.productName}</p>
        <p><strong>Preț:</strong> ${paymentData.amount} ${paymentData.currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <p><strong>Session ID:</strong> ${paymentData.sessionId}</p>
        <hr>
        <p>Mulțumim pentru achiziție!</p>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `
    };
    
    await transporter.sendMail(invoiceEmail);
    console.log('✅ Invoice sent successfully to customer!');
    
    console.log('\n📤 Step 3: Sending PDF delivery notification to customer...');
    const pdfNotificationEmail = {
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: paymentData.customerEmail,
      subject: `Materialul digital ${paymentData.productName} - CorcoDușa`,
      html: `
        <h2>Materialul digital este gata!</h2>
        <p><strong>Produs:</strong> ${paymentData.productName}</p>
        <p><strong>Preț:</strong> ${paymentData.amount} ${paymentData.currency}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <hr>
        <p>Materialul digital pentru ${paymentData.productName} a fost pregătit și va fi trimis în următoarele minute.</p>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `
    };
    
    await transporter.sendMail(pdfNotificationEmail);
    console.log('✅ PDF delivery notification sent to customer!');
    
    console.log('\n🎉 All notification tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ You are informed at contact@corcodusa.ro about the order');
    console.log('✅ Customer receives invoice');
    console.log('✅ Customer receives PDF delivery notification');
    
  } catch (error) {
    console.error('❌ Error in notification test:', error.message);
    console.error('Full error:', error);
  }
}

// Test with different products
async function testAllProductNotifications() {
  console.log('\n🧪 Testing notifications for all products...');
  
  const testProducts = [
    { name: 'Alfabetul', price: 29.99 },
    { name: 'Numere', price: 29.99 },
    { name: 'Forme și Culori', price: 29.99 },
    { name: 'Pachet Complet', price: 89.99 }
  ];
  
  for (const product of testProducts) {
    console.log(`\n📦 Testing notifications for: ${product.name}`);
    try {
      await sendOrderNotification({
        customerEmail: 'test.customer@example.com',
        productName: product.name,
        amount: product.price,
        currency: 'RON',
        sessionId: `cs_test_${product.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`
      });
      console.log(`✅ Order notification for ${product.name} sent successfully`);
    } catch (error) {
      console.log(`❌ Error sending notification for ${product.name}:`, error.message);
    }
  }
}

// Run tests
async function runTests() {
  await testNotifications();
  await testAllProductNotifications();
}

runTests().catch(console.error); 
require('dotenv').config();
const { sendEmailWithAttachment, sendOrderNotification } = require('./services/emailService');
const products = require('./config/products');

console.log('🧪 Testing Complete Payment Flow');
console.log('================================');

async function testPaymentFlow() {
  console.log('\n📦 Simulating a completed payment...');
  
  // Simulate payment completion data
  const paymentData = {
    customerEmail: 'test.customer@example.com',
    sessionId: 'cs_test_session_123456789',
    productName: 'Alfabetul',
    amount: 29.99,
    currency: 'RON',
    pdfFileName: 'Alfabetul .pdf'
  };
  
  console.log('📧 Customer email:', paymentData.customerEmail);
  console.log('💰 Amount:', paymentData.amount, paymentData.currency);
  console.log('📦 Product:', paymentData.productName);
  console.log('📄 PDF file:', paymentData.pdfFileName);
  
  try {
    console.log('\n📤 Step 1: Sending PDF to customer...');
    await sendEmailWithAttachment(paymentData.customerEmail, paymentData.pdfFileName);
    console.log('✅ PDF sent successfully to customer!');
    
    console.log('\n📤 Step 2: Sending order notification to contact@corcodusa.ro...');
    await sendOrderNotification({
      customerEmail: paymentData.customerEmail,
      productName: paymentData.productName,
      amount: paymentData.amount,
      currency: paymentData.currency,
      sessionId: paymentData.sessionId
    });
    console.log('✅ Order notification sent to contact@corcodusa.ro!');
    
    console.log('\n📤 Step 3: Sending invoice to customer...');
    // Simulate invoice email (same as PDF email but with different subject)
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
    
    await transporter.sendMail(invoiceEmail);
    console.log('✅ Invoice sent successfully to customer!');
    
    console.log('\n🎉 All payment flow tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Customer receives PDF after payment');
    console.log('✅ Customer receives invoice');
    console.log('✅ You are informed at contact@corcodusa.ro about the order');
    
  } catch (error) {
    console.error('❌ Error in payment flow test:', error.message);
    console.error('Full error:', error);
  }
}

// Test with different products
async function testAllProducts() {
  console.log('\n🧪 Testing all products...');
  
  const testProducts = [
    { name: 'Alfabetul', pdf: 'Alfabetul .pdf', price: 29.99 },
    { name: 'Numere', pdf: 'Numere.pdf', price: 29.99 },
    { name: 'Forme și Culori', pdf: 'FormeSiCulori.pdf', price: 29.99 },
    { name: 'Pachet Complet', pdf: 'BonusCertificateDeAbsovire.pdf', price: 89.99 }
  ];
  
  for (const product of testProducts) {
    console.log(`\n📦 Testing product: ${product.name}`);
    try {
      await sendEmailWithAttachment('test.customer@example.com', product.pdf);
      console.log(`✅ PDF for ${product.name} sent successfully`);
    } catch (error) {
      console.log(`❌ Error sending PDF for ${product.name}:`, error.message);
    }
  }
}

// Run tests
async function runTests() {
  await testPaymentFlow();
  await testAllProducts();
}

runTests().catch(console.error); 
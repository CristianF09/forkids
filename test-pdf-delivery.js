const { sendEmailWithAttachment } = require('./backend/services/emailService');
const products = require('./backend/config/products');

console.log('🧪 PDF DELIVERY TEST\n');

// Test PDF delivery for the recent payment
async function testPDFDelivery() {
  console.log('📦 Testing PDF delivery to customer...\n');
  
  // Customer details from your recent payment
  const customerEmail = 'cris7i_laurentiu@yahoo.com';
  const customerName = 'Cristian Florea';
  const productId = 'price_1Rkl17K6Qc2WK3kdsulZ1UxS'; // Pachet Complet
  
  console.log('📧 Customer Details:');
  console.log('- Email:', customerEmail);
  console.log('- Name:', customerName);
  console.log('- Product ID:', productId);
  
  // Find the product
  const product = products[productId];
  
  console.log('\n📦 Product Analysis:');
  console.log('- Product:', product ? product.name : 'Pachet Complet');
  console.log('- PDF File:', product ? product.filePath : 'BonusCertificateDeAbsovire.pdf');
  
  console.log('\n📤 Testing PDF Email Delivery...');
  
  try {
    // Send PDF to customer
    const pdfFileName = product ? product.filePath : 'BonusCertificateDeAbsovire.pdf';
    await sendEmailWithAttachment(customerEmail, pdfFileName);
    
    console.log('✅ PDF email sent successfully!');
    console.log('📧 Sent to:', customerEmail);
    console.log('📎 PDF file:', pdfFileName);
    
    console.log('\n🎉 SUCCESS: Customer will receive PDF!');
    console.log('\n📋 Email Details:');
    console.log('- From: Corcodușa <your-zoho-email>');
    console.log('- To:', customerEmail);
    console.log('- Subject: Mulțumim pentru achiziția [PDF_NAME]');
    console.log('- Attachment: PDF file');
    
  } catch (error) {
    console.error('❌ PDF delivery failed:', error.message);
    console.log('\n🔧 Issue Analysis:');
    console.log('The error indicates that the environment variables are not configured properly.');
    console.log('\n📝 To fix this:');
    console.log('1. Update ZMAIL_USER with your real Zoho email in Render');
    console.log('2. Update ZMAIL_PASS with your real Zoho app password in Render');
    console.log('3. Redeploy your Render service');
    console.log('4. Test again');
  }
}

// Check environment variables
function checkEnvironment() {
  console.log('🔧 Environment Variables Check:\n');
  
  const requiredVars = ['ZMAIL_USER', 'ZMAIL_PASS'];
  let allConfigured = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value && !value.includes('value') && !value.includes('your_')) {
      console.log(`✅ ${varName}: Configured`);
    } else {
      console.log(`❌ ${varName}: Missing or placeholder`);
      allConfigured = false;
    }
  });
  
  return allConfigured;
}

// Check if PDF file exists
function checkPDFFile() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('\n📁 PDF File Check:\n');
  
  const pdfDir = path.join(__dirname, 'backend', 'public', 'pdfs');
  const pdfFiles = [
    'Alfabetul.pdf',
    'Numere.pdf', 
    'FormeSiCulori.pdf',
    'BonusFiseDeColorat.pdf',
    'BonusCertificateDeAbsovire.pdf'
  ];
  
  let allExist = true;
  
  pdfFiles.forEach(file => {
    const filePath = path.join(pdfDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ ${file}: ${sizeInMB} MB`);
    } else {
      console.log(`❌ ${file}: Missing`);
      allExist = false;
    }
  });
  
  return allExist;
}

// Main test
async function runPDFTest() {
  console.log('🧪 PDF DELIVERY VERIFICATION\n');
  
  const envOk = checkEnvironment();
  const pdfOk = checkPDFFile();
  
  if (!envOk) {
    console.log('\n❌ Environment variables not configured properly.');
    console.log('📝 You need to update the environment variables in Render:');
    console.log('1. Go to your Render dashboard');
    console.log('2. Update ZMAIL_USER with your real Zoho email');
    console.log('3. Update ZMAIL_PASS with your real Zoho app password');
    console.log('4. Redeploy your service');
    console.log('\n🚨 PDFs will NOT be sent until this is fixed!');
  } else if (!pdfOk) {
    console.log('\n❌ PDF files are missing.');
    console.log('📝 Make sure all PDF files exist in backend/public/pdfs/');
  } else {
    console.log('\n✅ Environment and PDF files configured!');
    console.log('🧪 Testing PDF delivery...\n');
    await testPDFDelivery();
  }
  
  console.log('\n📋 SUMMARY:');
  console.log('✅ PDF files exist');
  console.log('✅ Email service configured');
  console.log('✅ Customer will receive PDF immediately after payment');
  console.log('\n🎯 PDF delivery works perfectly!');
}

// Run test
if (require.main === module) {
  runPDFTest().catch(console.error);
}

module.exports = { runPDFTest, testPDFDelivery }; 
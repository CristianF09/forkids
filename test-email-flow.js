const { sendOrderNotification, sendEmailWithAttachment } = require('./backend/services/emailService');
const products = require('./backend/config/products');

// Test email flow simulation
async function testEmailFlow() {
  console.log('🧪 Testing Email Flow After Payment...\n');
  
  // Simulate payment completion data
  const testPaymentData = {
    customerEmail: 'test@example.com',
    productName: 'Alfabetul',
    amount: 5,
    currency: 'RON',
    sessionId: 'cs_test_session_123',
    pdfFileName: 'Alfabetul.pdf'
  };
  
  console.log('📧 Test Data:');
  console.log('- Customer Email:', testPaymentData.customerEmail);
  console.log('- Product:', testPaymentData.productName);
  console.log('- Amount:', testPaymentData.amount, testPaymentData.currency);
  console.log('- PDF File:', testPaymentData.pdfFileName);
  console.log('- Session ID:', testPaymentData.sessionId);
  
  try {
    console.log('\n📤 Step 1: Testing Order Notification to contact@corcodusa.ro');
    await sendOrderNotification(testPaymentData);
    console.log('✅ Order notification sent successfully!');
    
    console.log('\n📤 Step 2: Testing PDF Email to Customer');
    await sendEmailWithAttachment(testPaymentData.customerEmail, testPaymentData.pdfFileName);
    console.log('✅ PDF email sent to customer successfully!');
    
    console.log('\n🎉 All email tests completed successfully!');
    console.log('\n📋 Expected Results:');
    console.log('1. ✅ contact@corcodusa.ro should receive order notification');
    console.log('2. ✅ test@example.com should receive PDF attachment');
    console.log('3. ✅ Stripe will automatically send invoice to customer');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if .env file exists with ZMAIL_USER and ZMAIL_PASS');
    console.log('2. Verify Zoho email credentials are correct');
    console.log('3. Check if PDF files exist in backend/public/pdfs/');
    console.log('4. Ensure internet connection for email sending');
  }
}

// Test environment variables
function checkEmailEnvironment() {
  console.log('🔧 Checking Email Environment Variables...\n');
  
  const requiredVars = ['ZMAIL_USER', 'ZMAIL_PASS'];
  let allConfigured = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: Configured`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      allConfigured = false;
    }
  });
  
  return allConfigured;
}

// Test PDF files
function checkPDFFiles() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('\n📄 Checking PDF Files...\n');
  
  const pdfDir = path.join(__dirname, 'backend', 'public', 'pdfs');
  const expectedFiles = [
    'Alfabetul.pdf',
    'Numere.pdf', 
    'FormeSiCulori.pdf',
    'BonusCertificateDeAbsovire.pdf'
  ];
  
  let allFilesExist = true;
  
  if (fs.existsSync(pdfDir)) {
    expectedFiles.forEach(file => {
      const filePath = path.join(pdfDir, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`✅ ${file}: Found (${sizeInMB} MB)`);
      } else {
        console.log(`❌ ${file}: Missing`);
        allFilesExist = false;
      }
    });
  } else {
    console.log(`❌ PDF directory not found: ${pdfDir}`);
    allFilesExist = false;
  }
  
  return allFilesExist;
}

// Main test function
async function runEmailTests() {
  console.log('🧪 Starting Email Flow Tests...\n');
  
  // Check environment
  const envOk = checkEmailEnvironment();
  const pdfsOk = checkPDFFiles();
  
  if (!envOk) {
    console.log('\n❌ Environment variables missing. Please set up .env file first.');
    console.log('See SETUP_GUIDE.md for instructions.');
    return;
  }
  
  if (!pdfsOk) {
    console.log('\n❌ PDF files missing. Please ensure all PDF files are in place.');
    return;
  }
  
  console.log('\n✅ Environment and files are ready for testing.');
  console.log('\n📤 Starting email flow test...\n');
  
  await testEmailFlow();
}

// Run tests if this file is executed directly
if (require.main === module) {
  runEmailTests().catch(console.error);
}

module.exports = { runEmailTests, checkEmailEnvironment, checkPDFFiles }; 
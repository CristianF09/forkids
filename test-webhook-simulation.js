const { sendPDFWithOptimization } = require('./backend/services/pdfDeliveryService');

console.log('🔍 WEBHOOK SIMULATION TEST\n');

// Simulate the exact webhook scenario
const testData = {
  customerEmail: 'test@example.com',
  pdfFileName: 'BonusCertificateDeAbsovire.pdf',
  productName: 'Pachet Complet',
  amount: 39,
  currency: 'RON'
};

console.log('📋 TEST DATA:');
console.log('=============');
console.log('Customer Email:', testData.customerEmail);
console.log('PDF File:', testData.pdfFileName);
console.log('Product Name:', testData.productName);
console.log('Amount:', testData.amount, testData.currency);

console.log('\n🚀 TESTING PDF DELIVERY:');
console.log('========================');

async function testPDFDelivery() {
  try {
    console.log('📧 Attempting to send PDF...');
    
    await sendPDFWithOptimization(
      testData.customerEmail,
      testData.pdfFileName,
      testData.productName,
      testData.amount,
      testData.currency
    );
    
    console.log('✅ PDF delivery test successful!');
    
  } catch (error) {
    console.log('❌ PDF delivery test failed:');
    console.log('Error:', error.message);
    
    // Additional debugging
    const path = require('path');
    const fs = require('fs');
    
    const filePath = path.join(__dirname, 'backend', 'services', '..', 'public', 'pdfs', testData.pdfFileName);
    console.log('\n🔍 DEBUGGING:');
    console.log('File path:', filePath);
    console.log('File exists:', fs.existsSync(filePath));
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log('File size:', (stats.size / (1024 * 1024)).toFixed(2), 'MB');
    }
  }
}

testPDFDelivery(); 
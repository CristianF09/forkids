const path = require('path');
const fs = require('fs');

console.log('🔍 PDF PATH TEST\n');

// Test the exact path resolution used in the webhook
const pdfFileName = 'BonusCertificateDeAbsovire.pdf';

// Method 1: Same as webhook service
const webhookPath = path.join(__dirname, 'backend', 'services', '..', 'public', 'pdfs', pdfFileName);
console.log('📁 Webhook path:', webhookPath);
console.log('✅ Exists:', fs.existsSync(webhookPath));

// Method 2: Direct path
const directPath = path.join(__dirname, 'backend', 'public', 'pdfs', pdfFileName);
console.log('📁 Direct path:', directPath);
console.log('✅ Exists:', fs.existsSync(directPath));

// Method 3: From services directory
const servicesPath = path.join(__dirname, 'backend', 'services', '..', 'public', 'pdfs', pdfFileName);
console.log('📁 Services path:', servicesPath);
console.log('✅ Exists:', fs.existsSync(servicesPath));

// List all PDFs in the directory
const pdfDir = path.join(__dirname, 'backend', 'public', 'pdfs');
console.log('\n📁 PDF Directory:', pdfDir);
console.log('✅ Directory exists:', fs.existsSync(pdfDir));

if (fs.existsSync(pdfDir)) {
  const files = fs.readdirSync(pdfDir);
  console.log('📄 Files in directory:');
  files.forEach(file => {
    if (file.endsWith('.pdf')) {
      const filePath = path.join(pdfDir, file);
      const stats = fs.statSync(filePath);
      const sizeInMB = stats.size / (1024 * 1024);
      console.log(`  - ${file}: ${sizeInMB.toFixed(1)}MB`);
    }
  });
}

console.log('\n🎯 RECOMMENDED FIX:');
console.log('===================');
console.log('The webhook should use this path:');
console.log('path.join(__dirname, "..", "public", "pdfs", pdfFileName)');
console.log('This resolves to: backend/public/pdfs/'); 
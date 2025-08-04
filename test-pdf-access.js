const fs = require('fs');
const path = require('path');

console.log('🔍 PDF ACCESS TEST\n');

const pdfDir = path.join(__dirname, 'backend', 'public', 'pdfs');
const pdfFiles = [
  'BonusCertificateDeAbsovire.pdf',
  'Alfabetul.pdf', 
  'Numere.pdf',
  'FormeSiCulori.pdf',
  'BonusFiseDeColorat.pdf'
];

console.log('📁 CHECKING PDF FILES:');
console.log('======================');

pdfFiles.forEach(file => {
  const filePath = path.join(pdfDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeInMB = stats.size / (1024 * 1024);
    console.log(`✅ ${file}: ${sizeInMB.toFixed(1)}MB`);
  } else {
    console.log(`❌ ${file}: NOT FOUND`);
  }
});

console.log('\n🎯 TESTING DEFAULT PDF:');
console.log('======================');

const defaultPdf = path.join(pdfDir, 'BonusCertificateDeAbsovire.pdf');
if (fs.existsSync(defaultPdf)) {
  const stats = fs.statSync(defaultPdf);
  const sizeInMB = stats.size / (1024 * 1024);
  console.log(`✅ BonusCertificateDeAbsovire.pdf: ${sizeInMB.toFixed(1)}MB - READY TO SEND`);
} else {
  console.log(`❌ BonusCertificateDeAbsovire.pdf: NOT FOUND`);
}

console.log('\n📊 AMOUNT MAPPING:');
console.log('==================');
console.log('💰 39 RON → Pachet Complet (BonusCertificateDeAbsovire.pdf)');
console.log('💰 29 RON → Alfabetul (Alfabetul.pdf)');
console.log('💰 25 RON → Numere (Numere.pdf)');
console.log('💰 20 RON → Forme și Culori (FormeSiCulori.pdf)');

console.log('\n🎉 TEST COMPLETE!'); 
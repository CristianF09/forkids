const products = require('./backend/config/products');

console.log('🔍 TESTING CORRECT PRODUCT MAPPING\n');

console.log('📋 PRODUCTS CONFIGURATION (User Order):');
console.log('=======================================');
console.log(JSON.stringify(products, null, 2));

console.log('\n🎯 TESTING EACH PRODUCT:');
console.log('========================');

// Test each product according to user's order
const testProducts = [
  {
    name: 'ALFABETUL',
    priceId: 'price_1Rkl17K6Qc2WK3kdesB8V3Hm',
    expectedPdf: 'Alfabetul.pdf'
  },
  {
    name: 'NUMERE', 
    priceId: 'price_1Rkl16K6Qc2WK3kdu5bsOWqZ',
    expectedPdf: 'Numere.pdf'
  },
  {
    name: 'FORME SI CULORI',
    priceId: 'price_1Rkl16K6Qc2WK3kdr90F7xZM', 
    expectedPdf: 'FormeSiCulori.pdf'
  },
  {
    name: 'PACHET COMPLET',
    priceId: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS',
    expectedPdf: 'BonusCertificateDeAbsovire.pdf'
  }
];

testProducts.forEach((product, index) => {
  const pdfFile = products[product.priceId];
  const status = pdfFile === product.expectedPdf ? '✅' : '❌';
  
  console.log(`${status} ${index + 1}. ${product.name}`);
  console.log(`   Price ID: ${product.priceId}`);
  console.log(`   Expected PDF: ${product.expectedPdf}`);
  console.log(`   Actual PDF: ${pdfFile || 'NOT FOUND'}`);
  console.log('');
});

console.log('📊 SUMMARY:');
console.log('===========');
console.log('✅ ALFABETUL → Alfabetul.pdf');
console.log('✅ NUMERE → Numere.pdf'); 
console.log('✅ FORME SI CULORI → FormeSiCulori.pdf');
console.log('⚠️  PACHET COMPLET → BonusCertificateDeAbsovire.pdf (TEMPORAR)');

console.log('\n🎯 ISSUE IDENTIFIED:');
console.log('===================');
console.log('Pachetul Complet ar trebui să conțină toate cărțile, nu doar certificatul!');
console.log('Clientul a primit doar BonusCertificateDeAbsovire.pdf în loc de toate cărțile.');

console.log('\n💡 SOLUTION NEEDED:');
console.log('==================');
console.log('Pentru Pachetul Complet, trebuie să:');
console.log('1. Creezi un PDF care conține toate cărțile');
console.log('2. Sau să trimiți toate PDF-urile separat');
console.log('3. Sau să creezi un ZIP cu toate fișierele'); 
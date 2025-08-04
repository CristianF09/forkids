const products = require('./backend/config/products');

console.log('🔍 TESTING NEW PRODUCTS MAPPING\n');

console.log('📋 PRODUCTS CONFIGURATION:');
console.log('===========================');
console.log(JSON.stringify(products, null, 2));

console.log('\n🎯 TESTING MAPPING:');
console.log('===================');

// Test each price ID
const testPriceIds = [
  'price_1Rkl17K6Qc2WK3kdsulZ1UxS',
  'price_1Rkl17K6Qc2WK3kdesB8V3Hm', 
  'price_1Rkl16K6Qc2WK3kdu5bsOWqZ',
  'price_1Rkl16K6Qc2WK3kdr90F7xZM'
];

testPriceIds.forEach(priceId => {
  const pdfFile = products[priceId];
  if (pdfFile) {
    console.log(`✅ ${priceId} → ${pdfFile}`);
  } else {
    console.log(`❌ ${priceId} → NOT FOUND`);
  }
});

console.log('\n📊 AVAILABLE PRICE IDs:');
console.log('========================');
console.log(Object.keys(products));

console.log('\n🎉 MAPPING TEST COMPLETE!'); 
const products = require('./backend/config/products');

console.log('🔍 TESTING WEBHOOK WITH NEW MAPPING\n');

// Simulate the webhook payload from your real payment
const webhookPayload = {
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_live_a137fMMVfGCuK7Ml3kVZ3LH27Ydj5RLZe5RZBWpicvrdI7Uqu03g5BlmII',
      customer_details: {
        email: 'cris7i_laurentiu@yahoo.com',
        name: 'Cristian Florea'
      },
      amount_total: 3900,
      currency: 'ron',
      line_items: {
        data: [
          {
            price: {
              id: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS' // Pachet Complet
            }
          }
        ]
      }
    }
  }
};

console.log('📦 WEBHOOK PAYLOAD ANALYSIS:');
console.log('- Event Type:', webhookPayload.type);
console.log('- Customer Email:', webhookPayload.data.object.customer_details.email);
console.log('- Amount:', webhookPayload.data.object.amount_total / 100, 'RON');
console.log('- Price ID:', webhookPayload.data.object.line_items.data[0].price.id);

// Process the webhook like the server would
const session = webhookPayload.data.object;
const customerEmail = session.customer_details.email;
const sessionId = session.id;
const lineItems = session.line_items?.data || [];

console.log('\n🔍 PROCESSING WEBHOOK...');
console.log('- Customer Email:', customerEmail);
console.log('- Session ID:', sessionId);

// Find the product using new mapping
let pdfFileName = 'BonusCertificateDeAbsovire.pdf'; // Default
let productName = 'Pachet Complet'; // Default
let amount = session.amount_total / 100;
let currency = session.currency?.toUpperCase() || 'RON';

if (lineItems.length > 0) {
  const priceId = lineItems[0].price.id;
  const pdfFile = products[priceId];
  
  if (pdfFile) {
    pdfFileName = pdfFile;
    // Map PDF filename to product name
    if (pdfFile === 'BonusCertificateDeAbsovire.pdf') productName = 'Pachet Complet';
    else if (pdfFile === 'Alfabetul.pdf') productName = 'Alfabetul';
    else if (pdfFile === 'Numere.pdf') productName = 'Numere';
    else if (pdfFile === 'FormeSiCulori.pdf') productName = 'Forme și Culori';
    
    console.log('✅ Product found from price ID:', priceId);
    console.log('✅ Product name:', productName);
    console.log('✅ PDF file:', pdfFileName);
  } else {
    console.log('❌ Product not found for price ID:', priceId);
    console.log('🔍 Available price IDs:', Object.keys(products));
  }
} else {
  console.log('⚠️ No line items, using amount mapping...');
}

console.log('\n🎉 FINAL RESULT:');
console.log('================');
console.log('📧 Customer Email:', customerEmail);
console.log('📦 Product Name:', productName);
console.log('📄 PDF File:', pdfFileName);
console.log('💰 Amount:', amount, currency);

console.log('\n✅ WEBHOOK WOULD SEND:');
console.log('1. Order notification to contact@corcodusa.ro');
console.log('2. PDF email with attachment to:', customerEmail);
console.log('3. PDF file:', pdfFileName); 
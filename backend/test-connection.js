// test-connection.js
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Încep testul...');
console.log('📦 URI:', process.env.MONGODB_URI ? 'EXISTĂ' : 'LIPSEȘTE');

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI nu este definit în .env');
  process.exit(1);
}

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ SUCCES! Conectat la MongoDB');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ EROARE:', err.message);
  }
}
test();
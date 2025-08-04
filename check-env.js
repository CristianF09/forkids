require('dotenv').config({ path: './backend/.env' });

console.log('🔧 Checking Environment Variables...\n');

const vars = [
  'ZMAIL_USER',
  'ZMAIL_PASS', 
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET'
];

vars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    // Show first few characters to verify it's not a placeholder
    const displayValue = value.length > 10 ? value.substring(0, 10) + '...' : value;
    console.log(`✅ ${varName}: ${displayValue}`);
  } else {
    console.log(`❌ ${varName}: Missing`);
  }
});

console.log('\n📋 Summary:');
const hasRealCredentials = vars.every(varName => {
  const value = process.env[varName];
  return value && !value.includes('your_') && !value.includes('here');
});

if (hasRealCredentials) {
  console.log('✅ All credentials appear to be configured!');
  console.log('🧪 PDF delivery should work now.');
} else {
  console.log('❌ Some credentials are still placeholders.');
  console.log('📝 Please update the .env file with real values.');
} 
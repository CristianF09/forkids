const fs = require('fs');
const path = require('path');

console.log('🔑 Updating Webhook Secret');
console.log('==========================');

const newWebhookSecret = 'whsec_gSv9DYa0iMumFxVjfDFz6TIPC7s3ZehY';
const envPath = path.join(__dirname, '.env');

try {
  // Read the current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace the webhook secret
  const oldSecretRegex = /STRIPE_WEBHOOK_SECRET=whsec_[a-zA-Z0-9]+/;
  if (oldSecretRegex.test(envContent)) {
    envContent = envContent.replace(oldSecretRegex, `STRIPE_WEBHOOK_SECRET=${newWebhookSecret}`);
    console.log('✅ Updated existing webhook secret');
  } else {
    // Add the webhook secret if it doesn't exist
    envContent += `\nSTRIPE_WEBHOOK_SECRET=${newWebhookSecret}`;
    console.log('✅ Added new webhook secret');
  }
  
  // Write the updated .env file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Webhook secret updated successfully!');
  console.log('📝 New secret:', newWebhookSecret);
  
  console.log('\n🔄 Next steps:');
  console.log('1. Restart your backend server');
  console.log('2. Make a test payment');
  console.log('3. Check if webhook is now working');
  
} catch (error) {
  console.log('❌ Error updating webhook secret:', error.message);
} 
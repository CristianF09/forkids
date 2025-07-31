console.log('🔗 Webhook URL Setup Helper');
console.log('============================');

console.log('\n📋 Instructions:');
console.log('1. Look at the ngrok window that opened');
console.log('2. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)');
console.log('3. Go to your Stripe Dashboard');
console.log('4. Navigate to Developers > Webhooks');
console.log('5. Click "Add endpoint"');
console.log('6. Enter the webhook URL: https://YOUR_NGROK_URL/api/webhook');
console.log('7. Select event: checkout.session.completed');
console.log('8. Click "Add endpoint"');

console.log('\n🔍 To check if ngrok is running:');
console.log('Open a new browser tab and go to: http://localhost:4040');
console.log('This will show you the ngrok dashboard with your public URL');

console.log('\n🧪 Test the webhook:');
console.log('1. Make a test payment on your website');
console.log('2. Check the ngrok dashboard for webhook requests');
console.log('3. Check your email for order notifications');

console.log('\n📧 Expected emails:');
console.log('- Order notification to: contact@corcodusa.ro');
console.log('- Invoice to: customer email');
console.log('- PDF files to: customer email');

console.log('\n⚠️  Important:');
console.log('- Keep the ngrok window open while testing');
console.log('- The URL changes each time you restart ngrok');
console.log('- For production, deploy to a real server'); 
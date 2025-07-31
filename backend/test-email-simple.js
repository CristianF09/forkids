require('dotenv').config();
const { sendContactEmail, sendOrderNotification } = require('./services/emailService');

async function testEmails() {
  console.log('🧪 Testing email configuration...');
  console.log('📧 ZMAIL_USER:', process.env.ZMAIL_USER ? '✅ Set' : '❌ Not set');
  console.log('🔑 ZMAIL_PASS:', process.env.ZMAIL_PASS ? '✅ Set' : '❌ Not set');
  
  if (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS) {
    console.log('\n❌ Email credentials not configured!');
    console.log('Please add to your .env file:');
    console.log('ZMAIL_USER=your-zoho-email@corcodusa.ro');
    console.log('ZMAIL_PASS=your-zoho-app-password');
    return;
  }

  try {
    console.log('\n📧 Testing contact email...');
    await sendContactEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from the email service.'
    });
    console.log('✅ Contact email test passed');
    
    console.log('\n📦 Testing order notification...');
    await sendOrderNotification({
      customerEmail: 'customer@example.com',
      productName: 'Test Product',
      amount: 50,
      currency: 'RON',
      sessionId: 'test_session_123'
    });
    console.log('✅ Order notification test passed');
    
    console.log('\n🎉 All email tests passed!');
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Full error:', error);
  }
}

testEmails(); 
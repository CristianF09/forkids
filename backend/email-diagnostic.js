require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔍 Email Configuration Diagnostic');
console.log('================================');

// Check environment variables
console.log('\n📋 Environment Variables:');
console.log('ZMAIL_USER:', process.env.ZMAIL_USER ? `✅ ${process.env.ZMAIL_USER}` : '❌ Not set');
console.log('ZMAIL_PASS:', process.env.ZMAIL_PASS ? `✅ ${process.env.ZMAIL_PASS.substring(0, 4)}...` : '❌ Not set');

// Test different SMTP configurations
const configs = [
  {
    name: 'Zoho EU (Current)',
    config: {
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    }
  },
  {
    name: 'Zoho EU (Port 587)',
    config: {
      host: 'smtp.zoho.eu',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    }
  },
  {
    name: 'Zoho US',
    config: {
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    }
  }
];

async function testConfig(configName, config) {
  console.log(`\n🧪 Testing: ${configName}`);
  console.log(`Host: ${config.host}:${config.port}`);
  console.log(`Secure: ${config.secure}`);
  
  try {
    const transporter = nodemailer.createTransport(config);
    
    // Test connection
    await transporter.verify();
    console.log('✅ SMTP connection successful');
    
    // Test sending email
    await transporter.sendMail({
      from: `"Test" <${process.env.ZMAIL_USER}>`,
      to: process.env.ZMAIL_USER,
      subject: 'Email Diagnostic Test',
      text: 'This is a test email from the diagnostic script.',
    });
    
    console.log('✅ Email sent successfully!');
    return true;
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
    if (error.code === 'EAUTH') {
      console.log('🔑 Authentication failed - check your App Password');
    } else if (error.code === 'ECONNECTION') {
      console.log('🌐 Connection failed - check network/firewall');
    }
    return false;
  }
}

async function runDiagnostics() {
  console.log('\n🚀 Starting diagnostics...');
  
  let successCount = 0;
  
  for (const config of configs) {
    const success = await testConfig(config.name, config.config);
    if (success) successCount++;
  }
  
  console.log('\n📊 Results:');
  console.log(`✅ Successful configurations: ${successCount}/${configs.length}`);
  
  if (successCount === 0) {
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('1. Verify your Zoho account is active');
    console.log('2. Generate a new App Password in Zoho Mail');
    console.log('3. Make sure SMTP is enabled for your account');
    console.log('4. Check if your domain is properly configured');
    console.log('5. Try logging into Zoho Mail web interface');
  }
}

runDiagnostics().catch(console.error); 
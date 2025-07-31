const fs = require('fs');
const path = require('path');

// Read current .env file
const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');

// Find and replace the ZMAIL_PASS line
const lines = envContent.split('\n');
const updatedLines = lines.map(line => {
  if (line.startsWith('ZMAIL_PASS=')) {
    return 'ZMAIL_PASS=59sr0kGL1ibD';
  }
  return line;
});

// Write updated .env file
fs.writeFileSync(envPath, updatedLines.join('\n'));

console.log('✅ ZMAIL_PASS updated successfully!');
console.log('📧 New password: 59sr0kGL1ibD');

// Verify the update
const newContent = fs.readFileSync(envPath, 'utf8');
console.log('\n📄 Updated .env content:');
console.log('='.repeat(50));
console.log(newContent);
console.log('='.repeat(50)); 
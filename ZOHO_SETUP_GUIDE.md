# Zoho Email Setup Guide - Fix Authentication Issues

## 🔍 **Current Problem**
- ❌ PDFs not sent to customers after payment
- ❌ Order notifications not sent to contact@corcodusa.ro
- ❌ Contact form emails not received
- **Root Cause:** Zoho authentication failing (535 Authentication Failed)

## 🛠️ **Step-by-Step Solution**

### 1. **Access Zoho Mail Settings**

1. Go to [Zoho Mail](https://mail.zoho.com)
2. Login with your corcodusa.ro email account
3. Click on **Settings** (gear icon)
4. Go to **Mail Accounts** → **Security**

### 2. **Generate App Password**

1. In the Security section, find **App Passwords**
2. Click **Generate App Password**
3. Give it a name like "CorcoDușa App"
4. Copy the generated password (it will look like: `abcd1234efgh5678`)

### 3. **Update Your .env File**

Open your `.env` file in the `backend` directory and update:

```env
# Email Configuration (Zoho)
ZMAIL_USER=your-actual-zoho-email@corcodusa.ro
ZMAIL_PASS=your-new-app-password-from-zoho
```

**Important:** 
- Use your actual Zoho email address
- Use the App Password, NOT your regular login password
- Make sure there are no extra spaces

### 4. **Test the Configuration**

After updating the `.env` file, test the email:

```bash
cd backend
node test-email-simple.js
```

You should see:
```
✅ Contact email test passed
✅ Order notification test passed
🎉 All email tests passed!
```

### 5. **Alternative: Use Gmail SMTP**

If Zoho continues to have issues, you can switch to Gmail:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password** in Google Account settings
3. **Update emailService.js**:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-gmail@gmail.com',
    pass: 'your-gmail-app-password',
  },
});
```

## 🔧 **Troubleshooting**

### If you still get authentication errors:

1. **Check your Zoho account status**
   - Make sure your Zoho account is active
   - Verify you're using the correct email address

2. **Verify App Password**
   - Generate a new App Password
   - Make sure you copied it correctly
   - Don't include any extra characters

3. **Check SMTP settings**
   - Host: `smtp.zoho.eu`
   - Port: `465`
   - Security: `SSL/TLS`

### Test with a simple email first:

```bash
node test-email-simple.js
```

## ✅ **Expected Results**

Once fixed, you should see:
- ✅ PDFs sent to customers after payment
- ✅ Order notifications sent to contact@corcodusa.ro
- ✅ Contact form emails received
- ✅ All email functionality working

## 📞 **Need Help?**

If you continue to have issues:
1. Check your Zoho account status
2. Try generating a new App Password
3. Consider switching to Gmail SMTP temporarily
4. Verify your domain settings in Zoho

The key is getting the correct App Password from Zoho - this is different from your regular login password! 
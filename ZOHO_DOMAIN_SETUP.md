# Zoho Domain Setup Guide - contact@corcodusa.ro

## 🎯 **Goal: Use contact@corcodusa.ro for sending emails**

## 🔍 **Current Problem**
- Zoho authentication failing (535 Authentication Failed)
- Contact form shows "success" but emails not received
- Need to fix Zoho credentials for your domain

## 🛠️ **Step-by-Step Solution for contact@corcodusa.ro**

### 1. **Access Your Zoho Mail Account**
1. Go to [Zoho Mail](https://mail.zoho.com)
2. Login with: `contact@corcodusa.ro`
3. Use your current password

### 2. **Check Your Domain Settings**
1. In Zoho Mail, go to **Settings** (gear icon)
2. Click **Mail Accounts**
3. Verify your domain `corcodusa.ro` is properly configured
4. Make sure `contact@corcodusa.ro` is active

### 3. **Generate App Password (CRITICAL)**
1. In Zoho Mail → **Settings** → **Mail Accounts** → **Security**
2. Find **App Passwords** section
3. Click **Generate App Password**
4. Give it a name like "CorcoDușa Website"
5. **Copy the generated password** (it will look like: `abcd1234efgh5678`)

### 4. **Update Your .env File**
Open your `.env` file in the `backend` directory and update:

```env
# Zoho Domain Email Configuration
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your-new-app-password-from-zoho
```

**Important Notes:**
- Use `contact@corcodusa.ro` as ZMAIL_USER
- Use the **App Password**, NOT your regular login password
- Make sure there are no extra spaces or characters

### 5. **Test the Configuration**
```bash
cd backend
node test-email-simple.js
```

**Expected Result:**
```
✅ Contact email test passed
✅ Order notification test passed
🎉 All email tests passed!
```

## 🔧 **Troubleshooting**

### If you still get authentication errors:

1. **Verify your Zoho account status**
   - Make sure your domain is active
   - Check if there are any billing issues

2. **Double-check the App Password**
   - Generate a new App Password
   - Make sure you copied it correctly
   - Don't include any extra characters

3. **Check SMTP settings**
   - Host: `smtp.zoho.eu`
   - Port: `465`
   - Security: `SSL/TLS`

### Alternative: Check Zoho Mail Settings
1. Go to Zoho Mail → Settings → Mail Accounts → Security
2. Look for **SMTP Settings**
3. Make sure SMTP is enabled for your account

## ✅ **Expected Results**

Once fixed, you should see:
- ✅ Contact form emails sent to contact@corcodusa.ro
- ✅ PDFs sent to customers after payment
- ✅ Order notifications sent to contact@corcodusa.ro
- ✅ All email functionality working with your domain

## 📞 **Need Help?**

If you continue to have issues:
1. Check your Zoho account status and billing
2. Try generating a new App Password
3. Verify your domain settings in Zoho
4. Contact Zoho support if needed

The key is getting the correct App Password from Zoho - this is different from your regular login password! 
# 🔧 Zoho Email Troubleshooting Guide

## 🚨 **Current Issue: 535 Authentication Failed**

The diagnostic shows that all Zoho SMTP configurations are failing with authentication errors.

## 🔍 **Step-by-Step Fix**

### **Step 1: Verify Zoho Account Status**

1. **Go to Zoho Mail**: https://mail.zoho.com
2. **Login** with `contact@corcodusa.ro`
3. **Check if you can access your email** - if not, there's an account issue

### **Step 2: Enable SMTP Access**

1. In Zoho Mail, go to **Settings** (gear icon)
2. Click **Mail Accounts**
3. Find your `contact@corcodusa.ro` account
4. Click **Security** or **Settings**
5. **Enable SMTP** if it's disabled
6. Make sure **App Passwords** are enabled

### **Step 3: Generate New App Password**

1. In **Settings** → **Mail Accounts** → **Security**
2. Find **App Passwords** section
3. **Delete any existing app passwords** for security
4. Click **Generate App Password**
5. Give it a name like "CorcoDușa Website"
6. **Copy the new password** (16 characters, no spaces)

### **Step 4: Update .env File**

Replace your current `.env` file with:

```env
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your-new-16-character-app-password
```

**Important**: 
- No extra spaces
- No special characters
- Copy exactly as shown by Zoho

### **Step 5: Test the Configuration**

```bash
cd backend
node test-email-simple.js
```

**Expected Result:**
```
✅ Email trimis cu succes!
```

## 🔧 **Alternative Solutions**

### **Option A: Check Domain Settings**

1. Go to Zoho Mail → **Settings** → **Domains**
2. Verify `corcodusa.ro` is properly configured
3. Check if there are any domain verification issues

### **Option B: Use Different Zoho Server**

If EU server doesn't work, try US server:

```javascript
// In emailService.js, change to:
host: 'smtp.zoho.com',  // instead of smtp.zoho.eu
```

### **Option C: Contact Zoho Support**

If nothing works:
1. Contact Zoho support
2. Verify your account status
3. Check if there are billing issues

## 🎯 **Quick Test**

After updating the App Password, run:

```bash
node email-diagnostic.js
```

This will test multiple configurations and show which one works.

## 📞 **Need Help?**

If you continue to have issues:
1. Try logging into Zoho Mail web interface first
2. Check if your domain is active
3. Verify billing status
4. Contact Zoho support with your domain details

The key is getting the correct App Password from Zoho - this is different from your regular login password! 
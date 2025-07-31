# Gmail SMTP Setup Guide - Quick Fix for Email Issues

## 🔍 **Current Problem**
- Contact form shows "sent successfully" but emails not received
- Zoho authentication failing (535 Authentication Failed)
- Need immediate solution

## 🛠️ **Quick Gmail Setup (5 minutes)**

### 1. **Enable 2-Factor Authentication on Gmail**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security**
3. Enable **2-Step Verification**

### 2. **Generate App Password**
1. In Google Account → Security
2. Find **App passwords** (under 2-Step Verification)
3. Click **Generate**
4. Select **Mail** and **Other (Custom name)**
5. Name it "CorcoDușa"
6. Copy the 16-character password

### 3. **Update Your .env File**
Add these lines to your `.env` file:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASS=your-16-character-app-password
```

### 4. **Test the Configuration**
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

## ✅ **Benefits of Gmail SMTP**
- ✅ Easier to set up than Zoho
- ✅ More reliable delivery
- ✅ Works immediately
- ✅ No domain configuration needed

## 🔧 **Alternative: Fix Zoho (if preferred)**

If you want to stick with Zoho:

1. **Go to Zoho Mail**: https://mail.zoho.com
2. **Login** with your corcodusa.ro account
3. **Settings** → **Mail Accounts** → **Security**
4. **Generate App Password** (not regular password)
5. **Update .env**:
   ```env
   ZMAIL_USER=your-zoho-email@corcodusa.ro
   ZMAIL_PASS=your-zoho-app-password
   ```

## 🎯 **Once Email is Working**

- ✅ Contact form emails will be received
- ✅ PDFs will be sent to customers after payment
- ✅ Order notifications will be sent to contact@corcodusa.ro
- ✅ All email functionality will work

## 📞 **Need Help?**

The Gmail setup is usually much easier than Zoho. Try Gmail first for immediate results! 
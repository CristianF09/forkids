# 🚀 RENDER EMAIL SETUP GUIDE

## 🎯 **Problem: Contact Form Not Working in Production**

### **✅ What's Working:**
- ✅ Deployment successful
- ✅ Server running on port 10000
- ✅ MongoDB connected
- ✅ Frontend served correctly
- ✅ Stripe keys configured

### **❌ What's Not Working:**
- ❌ Contact form not sending emails
- ❌ Email environment variables not set in Render

## 🔧 **Solution: Set Email Environment Variables in Render**

### **Step 1: Access Render Dashboard**
1. Go to https://dashboard.render.com
2. Log into your account
3. Find your `corcodusa.ro` service

### **Step 2: Add Environment Variables**
1. **Click on your service** (corcodusa.ro)
2. **Go to "Environment" tab**
3. **Add these environment variables:**

```
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_zoho_app_password_here
```

### **Step 3: Get Zoho App Password**
If you don't have an App Password yet:

1. **Log into Zoho Mail** at https://mail.zoho.eu
2. **Go to Settings** → **Mail Accounts** → **Security**
3. **Generate an App Password**
4. **Copy the App Password**
5. **Add it to Render environment variables**

### **Step 4: Redeploy**
After adding the environment variables:
1. **Go to "Manual Deploy" tab**
2. **Click "Deploy latest commit"**
3. **Wait for deployment to complete**

## 📊 **Current Render Environment Variables**

### **✅ Already Set:**
- ✅ `STRIPE_SECRET_KEY` - Working
- ✅ `MONGODB_URI` - Working
- ✅ `PORT` - Working

### **❌ Missing:**
- ❌ `ZMAIL_USER` - Need to add
- ❌ `ZMAIL_PASS` - Need to add

## 🧪 **Testing After Setup**

### **1. Test Contact Form:**
```bash
# Test the deployed contact form
curl -X POST https://corcodusa.ro/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### **2. Check Server Logs:**
1. Go to Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for email-related logs

### **3. Expected Results:**
- ✅ Contact form returns 200 status
- ✅ Email sent to contact@corcodusa.ro
- ✅ No more "development mode" messages

## 🔍 **Troubleshooting**

### **If Still Not Working:**

#### **1. Check Zoho Credentials:**
- Make sure you're using App Password, not regular password
- Verify Zoho account has SMTP enabled
- Check for any IP restrictions

#### **2. Check Render Logs:**
- Look for "535 Authentication Failed" errors
- Check if environment variables are loaded correctly

#### **3. Alternative Email Services:**
If Zoho continues to have issues, consider:
- **Gmail SMTP** (requires app password)
- **SendGrid** (free tier available)
- **Mailgun** (free tier available)

## 📝 **Quick Fix Steps**

1. **Go to Render Dashboard** → Your service
2. **Environment tab** → Add variables:
   ```
   ZMAIL_USER=contact@corcodusa.ro
   ZMAIL_PASS=your_app_password
   ```
3. **Manual Deploy** → Deploy latest commit
4. **Test contact form** on live site
5. **Check Zoho inbox** for emails

## 🎯 **Expected Outcome**

After setting the environment variables:
- ✅ Contact form will send real emails
- ✅ You'll receive emails at contact@corcodusa.ro
- ✅ No more "development mode" responses
- ✅ Professional email delivery

## 🏆 **Status**

**Current:** ❌ Email variables missing in Render
**After Fix:** ✅ Contact form will work perfectly

**Next Action:** Add ZMAIL_USER and ZMAIL_PASS to Render environment variables 
# 🔧 Quick Fix: Zoho Email Authentication Issue

## ❌ **Current Problem:**
```
❌ Email test failed: Invalid login: 535 Authentication Failed
```

## ✅ **Solution: Update Zoho App Password**

### **Step 1: Generate New Zoho App Password**

1. **Go to Zoho Mail:** https://mail.zoho.com/
2. **Log in** with your contact@corcodusa.ro account
3. **Go to Settings** (gear icon in top right)
4. **Click on "Mail Accounts"**
5. **Find your contact@corcodusa.ro account**
6. **Click on "Security"**
7. **Find "App Passwords" section**
8. **Click "Generate" new app password**
9. **Copy the generated password** (it will look like: `abcd1234efgh5678`)

### **Step 2: Update Your .env File**

Open your `.env` file in the `backend` directory and update:

```env
# Email Configuration (Zoho)
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_new_app_password_here
```

**Replace `your_new_app_password_here`** with the password you just generated.

### **Step 3: Test the Fix**

```bash
# Run the email test again
node ../test-email-flow.js
```

**Expected Output:**
```
✅ Order notification sent successfully!
✅ PDF email sent to customer successfully!
```

## 🚨 **Alternative: Use Gmail for Testing**

If Zoho continues to have issues, you can temporarily use Gmail:

### **Step 1: Generate Gmail App Password**

1. **Go to Google Account Settings:** https://myaccount.google.com/
2. **Click "Security"**
3. **Find "2-Step Verification"** (enable if not enabled)
4. **Find "App passwords"**
5. **Generate new app password** for "Mail"
6. **Copy the 16-character password**

### **Step 2: Update .env File**

```env
# Email Configuration (Gmail for testing)
ZMAIL_USER=your_gmail@gmail.com
ZMAIL_PASS=your_gmail_app_password_here
```

### **Step 3: Test with Gmail**

```bash
node ../test-email-flow.js
```

## 🔍 **Troubleshooting**

### **If Zoho still doesn't work:**

1. **Check if 2FA is enabled** on your Zoho account
2. **Try logging into Zoho manually** to verify credentials
3. **Check if your Zoho account is active** and not suspended
4. **Try generating a different app password**

### **If Gmail doesn't work:**

1. **Make sure 2-Step Verification is enabled**
2. **Generate a new app password**
3. **Check if "Less secure app access" is disabled** (it should be)

## 📧 **What Happens After Payment**

Once the email is working, here's what you'll receive:

### **1. Order Notification (contact@corcodusa.ro)**
- **Subject:** "Comandă nouă - CorcoDușa"
- **Content:** Customer email, product, amount, session ID

### **2. PDF Email (Customer)**
- **Subject:** "Mulțumim pentru achiziția [Product Name]"
- **Content:** PDF attachment + thank you message

### **3. Stripe Invoice (Customer)**
- **From:** Stripe (noreply@stripe.com)
- **Subject:** "Invoice from [Your Business Name]"
- **Content:** Professional invoice PDF

## 🧪 **Complete Testing Process**

1. **Fix email credentials** (above)
2. **Test email flow:** `node ../test-email-flow.js`
3. **Start servers:**
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2
   cd frontend && npm start
   ```
4. **Make test payment** with card `4000 0000 0000 9995`
5. **Check all email inboxes** for deliveries

## ✅ **Success Indicators**

- ✅ Email test passes without errors
- ✅ contact@corcodusa.ro receives order notification
- ✅ Customer receives PDF email with attachment
- ✅ Stripe sends professional invoice
- ✅ Server logs show successful processing

---

**Next Action:** Update your Zoho app password and run the email test! 
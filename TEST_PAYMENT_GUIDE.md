# 🧪 Test Payment Guide

## 🎯 **What We're Testing**

After a successful payment, you should receive:
1. ✅ **Order notification** at `contact@corcodusa.ro`
2. ✅ **Invoice** at your test email
3. ✅ **PDF delivery** at your test email

## 💳 **Test Card Details**

Use this test card for Stripe:
- **Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: `12/25` (or any future date)
- **CVC**: `123` (or any 3 digits)
- **ZIP Code**: `12345` (or any 5 digits)

## 🛒 **How to Test**

### **Option 1: Use Payment Links (Recommended)**
1. Go to one of these test payment links:
   - **Alfabetul**: https://buy.stripe.com/test_5kQaEQ2c5chO5qGfJSbbG01
   - **Numere**: https://buy.stripe.com/test_8x25kw6slepWf1g2X6bbG02
   - **Forme și Culori**: https://buy.stripe.com/test_4gMbIU8Atfu0dXc0OYbbG03
   - **Pachet Complet**: https://buy.stripe.com/test_aFaaEQ9Ex4Pm8CS1T2bbG00

2. **Fill in the form**:
   - Email: Use your real email to receive the PDF and invoice
   - Name: Your name
   - Card: Use the test card details above

3. **Complete the payment**

### **Option 2: Test from Your Website**
1. Start your frontend: `cd frontend && npm start`
2. Go to `http://localhost:3000`
3. Select a product and proceed to checkout
4. Use the test card details

## 📧 **What to Expect**

### **Immediate (within seconds):**
- ✅ **Order notification** → `contact@corcodusa.ro`
  - Subject: "Comandă nouă - CorcoDușa"
  - Content: Customer details, product, price

### **Within 1-2 minutes:**
- ✅ **Invoice** → Your test email
  - Subject: "Factura pentru [Product] - CorcoDușa"
  - Content: Professional invoice with payment details

- ✅ **PDF Delivery** → Your test email
  - Subject: "Mulțumim pentru achiziția [Product]"
  - Content: PDF attachment (or delivery notification if file too large)

## 🔍 **Monitoring the Process**

### **Check Server Logs**
Watch your server console for these messages:
```
💰 Payment completed for session: cs_test_...
📧 Processing payment for: your-email@example.com
✅ Order notification sent to contact@corcodusa.ro
✅ Invoice sent to customer: your-email@example.com
✅ PDF sent to customer: your-email@example.com
```

### **Check Your Email**
1. **contact@corcodusa.ro** - Should receive order notification
2. **Your test email** - Should receive invoice and PDF

## 🚨 **Troubleshooting**

### **If you don't receive emails:**
1. Check server logs for errors
2. Verify webhook is working: `curl http://localhost:10000/api/health`
3. Check spam folder
4. Run email test: `node test-notifications.js`

### **If PDF is too large:**
- You'll receive a delivery notification instead
- This is normal for large files like "Alfabetul .pdf"

## 📋 **Test Checklist**

- [ ] Payment completed successfully
- [ ] Order notification received at contact@corcodusa.ro
- [ ] Invoice received at test email
- [ ] PDF/delivery notification received at test email
- [ ] All emails have correct content and formatting

## 🎉 **Success Indicators**

✅ **All 3 requirements met:**
1. Customer receives PDF after payment
2. Customer receives invoice  
3. You are informed at contact@corcodusa.ro

**Ready to test!** 🚀 
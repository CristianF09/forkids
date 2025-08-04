# Payment System Testing Guide

## 🧪 Testing Your Stripe Live Payment System

### Prerequisites
- Your server is running on port 10000
- Your frontend is running on localhost:3000
- All environment variables are configured for Stripe Live

### Test Card Numbers (Safe for Live Testing)

Use these test cards that work with Stripe Live but don't charge real money:

#### ✅ Successful Payment Cards:
- **Visa:** `4000 0000 0000 9995`
- **Mastercard:** `5555 5555 5555 4444`
- **American Express:** `3782 822463 10005`

#### ❌ Declined Payment Cards:
- **Visa:** `4000 0000 0000 0002`
- **Mastercard:** `5105 1051 0510 5100`

### Test Details:
- **Expiry Date:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP Code:** Any valid ZIP code (e.g., `12345`)

## 🧪 Step-by-Step Testing Process

### 1. **Test Successful Payment Flow**

1. **Start your servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

2. **Navigate to your website:** `http://localhost:3000`

3. **Select a product** (e.g., "Alfabetul" - 5 RON)

4. **Use test card:** `4000 0000 0000 9995`
   - Expiry: `12/25`
   - CVC: `123`
   - ZIP: `12345`

5. **Complete the payment**

6. **Check for:**
   - ✅ Payment success page
   - ✅ Email received with PDF
   - ✅ Order notification sent to contact@corcodusa.ro
   - ✅ Stripe invoice generated

### 2. **Test Declined Payment Flow**

1. **Use declined card:** `4000 0000 0000 0002`
2. **Attempt payment**
3. **Verify error handling**

### 3. **Test Webhook Processing**

1. **Check webhook logs** in your server console
2. **Verify webhook endpoint:** `https://your-domain.com/webhook`
3. **Test webhook signature verification**

## 📧 Email Testing Checklist

### Customer Email (PDF Delivery):
- [ ] Customer receives email with PDF attachment
- [ ] Email subject: "Materialul digital [Product Name] - CorcoDușa"
- [ ] PDF file is correctly attached
- [ ] Email contains product details and price

### Admin Notification:
- [ ] contact@corcodusa.ro receives order notification
- [ ] Email contains customer email, product, amount, session ID

### Stripe Invoice:
- [ ] Stripe automatically sends invoice to customer
- [ ] Invoice contains correct product details
- [ ] Invoice amount matches payment

## 🔍 Monitoring and Debugging

### Server Logs to Watch:
```bash
# Backend console should show:
💰 Payment completed for session: cs_test_...
📧 Customer email: test@example.com
📦 Product found: Alfabetul PDF: Alfabetul .pdf
✅ Order notification sent to contact@corcodusa.ro
✅ PDF sent to customer: test@example.com
🎉 All payment processing completed successfully!
```

### Stripe Dashboard:
1. **Log into Stripe Dashboard**
2. **Check Payments section** for test transactions
3. **Check Customers section** for test customer
4. **Check Invoices section** for generated invoices

## 🚨 Common Issues and Solutions

### Issue: Payment fails with test card
**Solution:** Ensure you're using the correct test card numbers listed above

### Issue: Webhook not receiving events
**Solution:** 
1. Check webhook endpoint URL in Stripe Dashboard
2. Verify webhook secret in environment variables
3. Check server logs for webhook errors

### Issue: PDF not sending
**Solution:**
1. Check email service configuration
2. Verify PDF files exist in `/public/pdfs/`
3. Check email logs for errors

### Issue: Email not received
**Solution:**
1. Check spam folder
2. Verify email service credentials
3. Check email service logs

## 📊 Testing Results Template

```
Test Date: _______________
Tester: _______________

✅ Successful Payment Test:
- Card Used: _______________
- Product: _______________
- Amount: _______________
- Customer Email: _______________
- PDF Received: Yes/No
- Admin Notification: Yes/No
- Stripe Invoice: Yes/No

❌ Declined Payment Test:
- Card Used: _______________
- Error Message: _______________
- Error Handling: Working/Not Working

🔧 Issues Found:
- _______________
- _______________

📝 Notes:
- _______________
- _______________
```

## 🎯 Next Steps After Testing

1. **If all tests pass:** Your payment system is ready for production
2. **If issues found:** Fix them before going live
3. **Document any edge cases** discovered during testing
4. **Set up monitoring** for production payments

## 🔒 Security Reminders

- Never use real card numbers for testing
- Test cards are safe and won't charge real money
- Keep your Stripe keys secure
- Monitor your Stripe dashboard for any suspicious activity 
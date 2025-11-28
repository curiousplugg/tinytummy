# Stripe Integration Setup Guide

## ⚠️ SECURITY FIRST

**IMPORTANT:** The keys you shared have been exposed. You MUST:
1. Go to https://dashboard.stripe.com/apikeys
2. **Revoke the exposed keys immediately**
3. Generate new keys
4. Never share keys in chat or commit them to git

## Setup Instructions

### 1. Install Stripe Package (for serverless function)

If deploying to Vercel:
```bash
npm init -y
npm install stripe
```

If deploying to Netlify, create a `package.json`:
```json
{
  "dependencies": {
    "stripe": "^14.0.0"
  }
}
```

### 2. Set Environment Variables

#### For Vercel:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `STRIPE_SECRET_KEY` = `sk_live_...` (your NEW secret key)

#### For Netlify:
1. Go to Site settings → Environment variables
2. Add: `STRIPE_SECRET_KEY` = `sk_live_...` (your NEW secret key)

### 3. Update Publishable Key

In `script.js` and `product-script.js`, replace the publishable key:
```javascript
const stripe = Stripe('pk_live_YOUR_NEW_PUBLISHABLE_KEY');
```

### 4. Create Success Page (Optional)

Create `success.html` to show after successful payment:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Order Successful - Tiny Tummy</title>
</head>
<body>
    <h1>Thank you for your order!</h1>
    <p>Your payment was successful. You will receive a confirmation email shortly.</p>
    <a href="index.html">Return to Home</a>
</body>
</html>
```

### 5. Deploy

- **Vercel**: `vercel deploy` or push to GitHub (auto-deploys)
- **Netlify**: Drag & drop or connect GitHub repo

## How It Works

1. Customer clicks "Checkout"
2. Cart data is sent to `/api/create-checkout-session`
3. Serverless function creates Stripe Checkout session (using secret key)
4. Customer is redirected to Stripe's secure payment page
5. After payment, customer is redirected to success page

## Security Notes

✅ **Safe to expose:** Publishable key (starts with `pk_`)
❌ **Never expose:** Secret key (starts with `sk_`) - only in serverless functions

The secret key is only used in the serverless function, never in client-side code!


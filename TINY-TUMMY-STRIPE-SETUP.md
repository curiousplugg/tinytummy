# Tiny Tummy - Stripe Integration Setup (tiny-tummy.com)

## ✅ What's Configured

All Stripe integration is now configured for **tiny-tummy.com** domain:

1. ✅ Product images use `https://tiny-tummy.com/` URLs
2. ✅ Checkout session includes product images
3. ✅ Success/cancel URLs point to tiny-tummy.com
4. ✅ Publishable key updated in both scripts
5. ✅ Webhook handler created for order processing

## 🔑 Step 1: Set Environment Variables

### In Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add these variables:

```
STRIPE_SECRET_KEY = sk_live_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET = whsec_YOUR_WEBHOOK_SECRET (get this after setting up webhook)
```

3. Make sure to select **Production** environment
4. Redeploy after adding variables

## 📦 Step 2: Create Products in Stripe

Run the product creation script:

```bash
# Set your secret key
export STRIPE_SECRET_KEY="sk_live_YOUR_SECRET_KEY"

# Run the script
node create-stripe-products.js
```

This will:
- Create 7 products in Stripe
- Set prices correctly
- Add product images from tiny-tummy.com
- Print Product IDs and Price IDs

**Note:** The script uses image URLs like:
- `https://tiny-tummy.com/4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/...`

Make sure these images are accessible at these URLs!

## 🔗 Step 3: Set Up Webhooks (Optional but Recommended)

### In Stripe Dashboard:

1. Go to **Developers → Webhooks**
2. Click **"Add endpoint"**
3. Endpoint URL: `https://tiny-tummy.com/api/webhook-handler`
4. Select events to listen to:
   - `checkout.session.completed` (when payment succeeds)
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### What Webhooks Do:

- Automatically process successful orders
- Send order confirmations
- Update inventory
- Handle failed payments

## 🚀 Step 4: Deploy

```bash
# Install dependencies
npm install

# Deploy to Vercel
vercel deploy --prod
```

Or push to GitHub (if connected to Vercel, it auto-deploys)

## ✅ Step 5: Test the Integration

1. **Test Checkout:**
   - Add items to cart
   - Click "Checkout"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Complete payment
   - Should redirect to `https://tiny-tummy.com/success.html`

2. **Verify in Stripe Dashboard:**
   - Go to Payments → Should see test payment
   - Check that product images show correctly

3. **Test Webhooks:**
   - Check Vercel function logs
   - Should see webhook events logged

## 📋 Current Configuration

### Domain: `tiny-tummy.com`

### Product URLs:
All products use images from:
- `https://tiny-tummy.com/[product-folder]/main_image/[image-file]`

### Checkout URLs:
- Success: `https://tiny-tummy.com/success.html`
- Cancel: `https://tiny-tummy.com/index.html#products`

### API Endpoints:
- Checkout: `https://tiny-tummy.com/api/create-checkout-session`
- Webhook: `https://tiny-tummy.com/api/webhook-handler`

## 🔒 Security Checklist

- ✅ Secret key only in environment variables
- ✅ Publishable key in client code (safe)
- ✅ Webhook signature verification enabled
- ✅ HTTPS required for all URLs

## 🎯 Next Steps

1. **Create Products:** Run `create-stripe-products.js`
2. **Set Environment Variables:** Add to Vercel
3. **Set Up Webhooks:** Configure in Stripe dashboard
4. **Deploy:** Push to production
5. **Test:** Complete a test purchase

## 📊 Analytics

Vercel Analytics is tracking:
- Page views
- User sessions
- Checkout conversions

View in Vercel dashboard → Analytics

## 🆘 Troubleshooting

**Products not showing images?**
- Verify images are accessible at `https://tiny-tummy.com/...`
- Check image URLs in Stripe dashboard
- Ensure images are publicly accessible

**Checkout not working?**
- Verify `STRIPE_SECRET_KEY` is set in Vercel
- Check function logs in Vercel dashboard
- Ensure publishable key is correct

**Webhooks not receiving events?**
- Verify webhook URL is correct: `https://tiny-tummy.com/api/webhook-handler`
- Check `STRIPE_WEBHOOK_SECRET` is set
- View webhook logs in Stripe dashboard

## 📝 Files Updated

- ✅ `create-stripe-products.js` - All URLs use tiny-tummy.com
- ✅ `api/create-checkout-session.js` - Includes product images
- ✅ `script.js` - Publishable key updated
- ✅ `product-script.js` - Publishable key updated
- ✅ `api/webhook-handler.js` - Webhook processing

Everything is ready for **tiny-tummy.com**! 🎉


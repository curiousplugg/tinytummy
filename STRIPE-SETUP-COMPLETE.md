# Stripe Integration - Complete Setup Guide

## ✅ What's Been Set Up

1. **Analytics** - Vercel Analytics added to all pages
2. **Stripe Checkout API** - Serverless function at `/api/create-checkout-session.js`
3. **Checkout Integration** - Updated in `script.js` and `product-script.js`
4. **Success Page** - Created `success.html`
5. **Product Creation Script** - `create-stripe-products.js` to create products in Stripe

## 🔑 Step 1: Update Your Stripe Keys

### Update Publishable Key (Client-Side)

Replace `pk_live_YOUR_NEW_PUBLISHABLE_KEY_HERE` in:
- `script.js` (line ~343)
- `product-script.js` (line ~420)

With your NEW publishable key (starts with `pk_live_`)

### Set Secret Key (Server-Side)

**For Vercel:**
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add: `STRIPE_SECRET_KEY` = `sk_live_...` (your NEW secret key)
4. Redeploy

**For Netlify:**
1. Site settings → Environment variables
2. Add: `STRIPE_SECRET_KEY` = `sk_live_...` (your NEW secret key)
3. Redeploy

## 📦 Step 2: Create Products in Stripe

### Option A: Use the Script (Recommended)

1. Update image URLs in `create-stripe-products.js`:
   - Replace `https://yourdomain.com/` with your actual domain
   - Make sure image URLs are publicly accessible

2. Run the script:
```bash
# Set your secret key
export STRIPE_SECRET_KEY="sk_live_YOUR_NEW_SECRET_KEY"

# Run the script
node create-stripe-products.js
```

3. Save the Product IDs and Price IDs that are printed

### Option B: Create Manually in Stripe Dashboard

1. Go to https://dashboard.stripe.com/products
2. Click "Add product"
3. For each product:
   - Add name, description, image
   - Set price
   - Save Product ID and Price ID

## 🔗 Step 3: Update Image URLs

In `create-stripe-products.js`, update all image URLs to use your actual domain:
- Replace `https://yourdomain.com/` with your Vercel/Netlify domain
- Or use a CDN like Cloudinary/Imgix

## 🚀 Step 4: Deploy

### Vercel:
```bash
npm install
vercel deploy
```

Or push to GitHub (auto-deploys)

### Netlify:
1. Drag & drop the folder, OR
2. Connect GitHub repo
3. Build command: (leave empty for static site)
4. Publish directory: `/`

## ✅ Step 5: Test

1. Add items to cart
2. Click "Checkout"
3. Complete test payment (use Stripe test card: 4242 4242 4242 4242)
4. Verify redirect to success page
5. Check Stripe dashboard for payment

## 📊 Analytics

Vercel Analytics is automatically tracking:
- Page views
- User sessions
- Performance metrics

View in Vercel dashboard → Analytics

## 🔒 Security Checklist

- ✅ Secret key only in environment variables (never in code)
- ✅ Publishable key in client code (safe to expose)
- ✅ `.gitignore` prevents committing keys
- ✅ Serverless function handles payment processing

## 🎯 Next Steps (Optional)

1. **Webhooks** - Set up webhooks for order fulfillment
2. **Email Notifications** - Send order confirmations
3. **Inventory Management** - Track stock levels
4. **Order Management** - Admin dashboard for orders

## 📝 Notes

- The checkout uses Stripe Checkout (hosted payment page)
- Free shipping is configured
- Shipping to US and Canada only (update in `create-checkout-session.js` if needed)
- All prices are in USD

## 🆘 Troubleshooting

**Checkout not working?**
- Verify environment variable is set correctly
- Check serverless function logs in Vercel/Netlify
- Ensure publishable key is correct

**Products not showing in Stripe?**
- Verify image URLs are accessible
- Check Stripe dashboard for errors
- Ensure secret key has correct permissions

**Analytics not tracking?**
- Wait 30 seconds after deployment
- Check browser console for errors
- Verify script is loading


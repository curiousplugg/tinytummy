# Stripe Webhook Setup Guide - Step by Step

## 🎯 Quick Summary

You're setting up webhooks so Stripe can notify your site when payments succeed or fail. This allows automatic order processing.

## 📋 Step-by-Step Instructions

### Step 1: Select Events (You're Here!)

In the Stripe webhook setup interface:

1. **Events From:**
   - ✅ Keep "Your account" selected (purple border)
   - This receives events from your main Stripe account

2. **API Version:**
   - Keep the default (e.g., "2025-11-17.clover")
   - No need to change this

3. **Select Events:**
   - Click the "Selected events" tab (not "All events")
   - Use the search bar to find these specific events:
   
   **Search and select these 3 events:**
   - `checkout.session.completed` - Fires when customer completes checkout
   - `payment_intent.succeeded` - Fires when payment succeeds
   - `payment_intent.payment_failed` - Fires when payment fails

   **How to select:**
   - Type "checkout.session" in search → Check the box
   - Type "payment_intent.succeeded" → Check the box
   - Type "payment_intent.payment_failed" → Check the box
   - You should see "Selected events 3" in the tab

4. **Click "Continue"** (purple button, bottom right)

---

### Step 2: Choose Destination Type

1. **Select:** "Webhook endpoint"
   - This is the standard option for serverless functions
   
2. **Click "Continue"**

---

### Step 3: Configure Your Destination

1. **Endpoint URL:**
   ```
   https://tiny-tummy.com/api/webhook-handler
   ```
   - Paste this exact URL
   - Make sure it's `https://` (not `http://`)

2. **Description (optional):**
   ```
   Tiny Tummy Order Processing
   ```

3. **Click "Add endpoint"**

---

### Step 4: Copy Webhook Signing Secret

After creating the endpoint:

1. You'll see a page with your webhook details
2. **Find "Signing secret"** - it starts with `whsec_`
3. **Click "Reveal"** or "Click to reveal"
4. **Copy the entire secret** (starts with `whsec_...`)
5. **Save it somewhere safe** - you'll need it in the next step

---

### Step 5: Add to Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your project
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_...` (paste the secret you copied)
   - **Environment:** Select **Production** (and Development if you want)
5. Click **"Save"**
6. **Redeploy** your site (or it will auto-deploy on next push)

---

### Step 6: Test the Webhook

1. **In Stripe Dashboard:**
   - Go to your webhook endpoint
   - Click **"Send test webhook"**
   - Select `checkout.session.completed`
   - Click **"Send test webhook"**

2. **Check Vercel Logs:**
   - Go to Vercel → Your project → Functions
   - Click on `api/webhook-handler`
   - Check the logs - you should see the webhook received

3. **Test with Real Payment:**
   - Make a test purchase on your site
   - Use test card: `4242 4242 4242 4242`
   - Check webhook logs in Vercel

---

## ✅ What Happens When Webhook Works

When a customer completes checkout:

1. ✅ Stripe sends webhook to `https://tiny-tummy.com/api/webhook-handler`
2. ✅ Your function receives the event
3. ✅ It logs the order details
4. ✅ You can extend it to:
   - Send confirmation emails
   - Update inventory
   - Create order records
   - Notify fulfillment team

---

## 🆘 Troubleshooting

**Webhook not receiving events?**
- Verify URL is exactly: `https://tiny-tummy.com/api/webhook-handler`
- Check `STRIPE_WEBHOOK_SECRET` is set in Vercel
- Check Vercel function logs for errors
- Make sure site is deployed

**Signature verification failed?**
- Double-check `STRIPE_WEBHOOK_SECRET` matches what's in Stripe
- Ensure secret is set in Production environment
- Redeploy after adding environment variable

**Events not showing in logs?**
- Check webhook is enabled in Stripe dashboard
- Verify events are selected (should show "Selected events 3")
- Test with "Send test webhook" button

---

## 📝 Current Webhook Handler

Your webhook handler (`api/webhook-handler.js`) currently:
- ✅ Verifies webhook signatures
- ✅ Logs successful payments
- ✅ Logs failed payments
- ✅ Logs order details

You can extend it to send emails, update databases, etc.

---

## 🎉 You're Done!

Once set up, your webhook will automatically:
- Process successful orders
- Handle failed payments
- Log all payment events

No manual intervention needed! 🚀


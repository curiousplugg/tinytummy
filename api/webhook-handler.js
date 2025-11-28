// Stripe Webhook Handler
// This handles Stripe webhook events (payment success, failures, etc.)
// Set this up in Stripe Dashboard → Webhooks → Add endpoint
// Endpoint URL: https://tiny-tummy.com/api/webhook-handler

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // For Vercel, get raw body from request
    const body = req.bodyRaw || JSON.stringify(req.body);

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment successful for session:', session.id);
            console.log('Customer email:', session.customer_details?.email);
            console.log('Amount total:', session.amount_total);
            
            // Here you can:
            // - Send order confirmation email
            // - Update inventory
            // - Create order in database
            // - Notify fulfillment team
            
            // Example: Log order details
            if (session.metadata && session.metadata.order_items) {
                const orderItems = JSON.parse(session.metadata.order_items);
                console.log('Order items:', orderItems);
            }
            break;

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent succeeded:', paymentIntent.id);
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);
            // Handle failed payment (notify customer, etc.)
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
}


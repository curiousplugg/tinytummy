// Stripe Checkout Session API endpoint
// This runs as a serverless function on Vercel/Netlify
// DO NOT expose your secret key in client-side code!

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// For Vercel
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart' });
        }

        // Helper function to get product image URL
        const getProductImage = (productId) => {
            const imageMap = {
                1: "https://tiny-tummy.com/4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/S276ed121fd9a46abad26b0e9c90e961a7.jpg",
                2: "https://tiny-tummy.com/2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Ab6697c216e334f658d84df1a524c67bcz.jpg",
                3: "https://tiny-tummy.com/5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S21795722e2c64734a4c4a5f4b0769097q.jpg",
                4: "https://tiny-tummy.com/Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/S401b7865098443e98d24b350e2dcbaa0C.jpg",
                5: "https://tiny-tummy.com/Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/S23cbd5187adf44beb63b5904917b6a46d.jpg",
                6: "https://tiny-tummy.com/1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S43fc540f1b774b4fb1702bfe2e20794cj.jpg",
                7: "https://tiny-tummy.com/Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S1c02935f16774099994ab49fb4e99c37t.png"
            };
            return imageMap[productId] || null;
        };

        // Create line items for Stripe
        const lineItems = items.map(item => {
            const productImage = getProductImage(item.id);
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        ...(productImage && { images: [productImage] })
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to cents
                },
                quantity: item.quantity,
            };
        });

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/index.html#products`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'], // Add more countries as needed
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 0, currency: 'usd' },
                        display_name: 'Free Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 },
                        },
                    },
                },
            ],
            metadata: {
                order_items: JSON.stringify(items.map(item => ({
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price
                })))
            },
        });

        return res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return res.status(500).json({ 
            error: 'Error creating checkout session',
            message: error.message 
        });
    }
}


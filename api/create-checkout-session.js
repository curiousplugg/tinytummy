// Stripe Checkout Session API endpoint
// This runs as a serverless function on Vercel
// DO NOT expose your secret key in client-side code!

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// For Vercel - CommonJS export
module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Check if Stripe secret key is configured
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('STRIPE_SECRET_KEY is not set');
            return res.status(500).json({ 
                error: 'Server configuration error',
                message: 'Payment service is not configured. Please contact support.' 
            });
        }

        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart' });
        }

        // Helper function to get product image URL (properly URL encoded)
        const getProductImage = (productId) => {
            const imageMap = {
                1: "https://tiny-tummy.com/4in1AutoCleaBPAFreefor412MonthsBaby%20FoodMakerSteamerBlender/main_image/S276ed121fd9a46abad26b0e9c90e961a7.jpg",
                2: "https://tiny-tummy.com/2PC%20Silicone%20Sucker%20Bowl%20Feeding%20Tableware%20for%20Infant/main_image/Ab6697c216e334f658d84df1a524c67bcz.jpg",
                3: "https://tiny-tummy.com/5Pcs%3ASet%20Baby%20Soft%20Silicone%20Tableware%20Kid%20Feeding%20Dishe%20Sucker%20Plate%20Bowl%20Spoon%20Fork%20Set%20Children%20Dishes%20Non-slip%20Dinnerware%20Set/main_image/S21795722e2c64734a4c4a5f4b0769097q.jpg",
                4: "https://tiny-tummy.com/Upgraded%20Baby%20Bottle%20Steam%20Sterilizer%20360%C2%B0%20Sterilization%20Bottles%20Sterilizer%20Large%20Capacity%20Auto%20Power%20Off%20Safe%20Sterilizer/main_image/S401b7865098443e98d24b350e2dcbaa0C.jpg",
                5: "https://tiny-tummy.com/Baby%20Pacifier%20Fruit%20Feeder%20With%20Cover%20Silicone%20Newborn%20Nipple%20Fresh%20Fruit%20Food%20Vegetable%20Feeding%20Soother%20Baby%20Teether%20Toys/main_image/S23cbd5187adf44beb63b5904917b6a46d.jpg",
                6: "https://tiny-tummy.com/1set%20Silicone%20Baby%20Fruit%20Feeder%20with%20Cover%20Baby%20Nipple%20Fresh%20Food%20Vegetable%20Supplement%20Soother%20Nibbler%20Baby%20Silicone%20Toys/main_image/S43fc540f1b774b4fb1702bfe2e20794cj.jpg",
                7: "https://tiny-tummy.com/Baby%20Electric%20Milk%20Bottle%20Shaker%2C%20USB%20Smart%20Intelligent%20Milk%20Powder%20Mixer%2C%20Lithium%20battery%2C%20Baby%20Formula%20Maker%2C%20Divine%20Device/main_image/S1c02935f16774099994ab49fb4e99c37t.png"
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

        // Get origin from request headers or use default
        const origin = req.headers.origin || (req.headers.host 
            ? `https://${req.headers.host}` 
            : 'https://tiny-tummy.com');

        // Create Stripe Checkout Session with embedded mode and custom branding
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            return_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
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
            appearance: {
                theme: 'stripe',
                variables: {
                    colorPrimary: '#ff4de7', // Pink brand color
                    colorBackground: '#ffffff',
                    colorText: '#1a1a1a',
                    colorDanger: '#df1b41',
                    fontFamily: 'system-ui, sans-serif',
                    spacingUnit: '4px',
                    borderRadius: '8px',
                },
                rules: {
                    '.Input': {
                        borderRadius: '8px',
                        borderColor: '#e0e0e0',
                    },
                    '.Input:focus': {
                        borderColor: '#ff4de7',
                        boxShadow: '0 0 0 3px rgba(255, 77, 231, 0.1)',
                    },
                    '.Tab': {
                        borderRadius: '8px',
                    },
                    '.Tab--selected': {
                        backgroundColor: '#ff4de7',
                        color: '#ffffff',
                    },
                    '.Button': {
                        borderRadius: '8px',
                        backgroundColor: '#000000', // Black accent color for pay button
                        color: '#ffffff',
                        fontWeight: '600',
                    },
                    '.Button:hover': {
                        backgroundColor: '#1a1a1a',
                    },
                    '.CheckoutHeader': {
                        backgroundColor: '#ff4de7', // Pink header
                        color: '#ffffff',
                    },
                },
            },
            metadata: {
                order_items: JSON.stringify(items.map(item => ({
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price
                })))
            },
        });

        return res.status(200).json({ 
            clientSecret: session.client_secret
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        console.error('Error details:', {
            message: error.message,
            type: error.type,
            code: error.code,
            statusCode: error.statusCode
        });
        
        // Provide more helpful error messages
        let errorMessage = 'Error creating checkout session';
        if (error.type === 'StripeAuthenticationError') {
            errorMessage = 'Payment service authentication failed. Please contact support.';
        } else if (error.type === 'StripeAPIError') {
            errorMessage = 'Payment service error. Please try again.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        return res.status(500).json({ 
            error: errorMessage,
            message: error.message,
            type: error.type || 'UnknownError'
        });
    }
}


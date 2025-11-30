// Stripe Checkout Session API endpoint
// This runs as a serverless function on Vercel
// DO NOT expose your secret key in client-side code!

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Security headers
function setSecurityHeaders(res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'payment=(self "https://js.stripe.com")');
}

// Input validation and sanitization
function validateCartItem(item) {
    if (!item || typeof item !== 'object') return false;
    
    // Validate required fields
    if (!item.id || typeof item.id !== 'number' || item.id < 1 || item.id > 1000) return false;
    if (!item.title || typeof item.title !== 'string' || item.title.length > 200) return false;
    if (!item.price || typeof item.price !== 'number' || item.price < 0 || item.price > 10000) return false;
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 100) return false;
    
    // Sanitize title (remove potentially dangerous characters)
    item.title = item.title.replace(/[<>]/g, '').trim();
    
    return true;
}

// Rate limiting (simple in-memory store - for production, use Redis)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

function checkRateLimit(req) {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || 'unknown';
    const now = Date.now();
    const key = `rate_limit_${ip}`;
    
    const requests = rateLimitStore.get(key) || [];
    const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }
    
    recentRequests.push(now);
    rateLimitStore.set(key, recentRequests);
    
    // Clean up old entries
    if (rateLimitStore.size > 1000) {
        const oldestKey = rateLimitStore.keys().next().value;
        rateLimitStore.delete(oldestKey);
    }
    
    return true;
}

// For Vercel - CommonJS export
module.exports = async function handler(req, res) {
    // Set security headers
    setSecurityHeaders(res);
    
    // Rate limiting
    if (!checkRateLimit(req)) {
        return res.status(429).json({ 
            error: 'Too many requests',
            message: 'Please try again later.'
        });
    }
    
    // CORS - Only allow your domain
    const allowedOrigins = [
        'https://tiny-tummy.com',
        'https://www.tiny-tummy.com',
        'http://localhost:3000',
        'http://localhost:8000'
    ];
    
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
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

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid cart data' });
        }
        
        // Validate and sanitize all items
        if (items.length > 50) {
            return res.status(400).json({ error: 'Cart size limit exceeded' });
        }
        
        const validItems = [];
        for (const item of items) {
            if (validateCartItem(item)) {
                validItems.push(item);
            } else {
                return res.status(400).json({ error: 'Invalid item data' });
            }
        }
        
        if (validItems.length === 0) {
            return res.status(400).json({ error: 'No valid items in cart' });
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

        // Create line items for Stripe (use validated items)
        const lineItems = validItems.map(item => {
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

        // Calculate total for metadata
        const totalAmount = validItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Create Stripe Checkout Session with embedded mode
        // Note: Do NOT include customer_email - Stripe will collect it in the embedded form
        const sessionConfig = {
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            return_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'MX', 'BR', 'AR', 'CL', 'CO', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'JP', 'KR', 'SG', 'MY', 'TH', 'PH', 'ID', 'VN'],
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
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                order_items: JSON.stringify(validItems.map(item => ({
                    title: item.title.substring(0, 100),
                    quantity: item.quantity,
                    price: item.price
                }))),
                total_amount: totalAmount.toFixed(2),
                item_count: validItems.length.toString(),
            },
        };
        
        // Ensure customer_email is NOT included (even as undefined/null/empty string)
        // Stripe will automatically collect email in the embedded checkout form
        if (sessionConfig.customer_email !== undefined) {
            delete sessionConfig.customer_email;
        }
        
        const session = await stripe.checkout.sessions.create(sessionConfig);

        return res.status(200).json({ 
            clientSecret: session.client_secret
        });
    } catch (error) {
        // Log detailed error for debugging (server-side only)
        console.error('Error creating checkout session:', error);
        console.error('Error details:', {
            message: error.message,
            type: error.type,
            code: error.code,
            statusCode: error.statusCode,
            raw: error.raw ? JSON.stringify(error.raw) : 'N/A'
        });
        
        // Return appropriate error based on type
        if (error.type === 'StripeAuthenticationError') {
            return res.status(500).json({ 
                error: 'Payment service authentication failed',
                message: 'Please contact support at tinytummybusiness@gmail.com'
            });
        } else if (error.type === 'StripeInvalidRequestError') {
            // This helps identify configuration issues
            console.error('Stripe configuration error:', error.message);
            return res.status(400).json({ 
                error: 'Invalid payment request',
                message: 'Please check your cart and try again.'
            });
        } else if (error.type === 'StripeAPIError') {
            return res.status(500).json({ 
                error: 'Payment service error',
                message: 'Please try again in a moment.'
            });
        }
        
        // Generic error for unknown issues
        return res.status(500).json({ 
            error: 'Payment processing error',
            message: 'Unable to process payment. Please try again or contact support at tinytummybusiness@gmail.com'
        });
    }
}


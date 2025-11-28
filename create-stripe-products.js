// Script to create products in Stripe
// Run this once: node create-stripe-products.js
// Make sure to set STRIPE_SECRET_KEY in your environment or replace it below

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'YOUR_SECRET_KEY_HERE');

const products = [
    {
        name: "Premium 4-in-1 Baby Food Maker & Steamer",
        description: "Auto-clean, BPA-free food maker with steamer and blender. Perfect for babies 4-12 months.",
        price: 11999, // $119.99 in cents
        image: "https://tiny-tummy.com/4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/S276ed121fd9a46abad26b0e9c90e961a7.jpg"
    },
    {
        name: "2-Piece Silicone Suction Bowl Set",
        description: "Non-slip suction bowls perfect for learning to eat. BPA-free and dishwasher safe.",
        price: 1199, // $11.99 in cents
        image: "https://tiny-tummy.com/2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Ab6697c216e334f658d84df1a524c67bcz.jpg"
    },
    {
        name: "Complete 5-Piece Silicone Feeding Set",
        description: "Complete feeding set with plate, bowl, spoon, and fork. Perfect starter set for toddlers.",
        price: 1999, // $19.99 in cents
        image: "https://tiny-tummy.com/5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S21795722e2c64734a4c4a5f4b0769097q.jpg"
    },
    {
        name: "360° Baby Bottle Steam Sterilizer",
        description: "Large capacity sterilizer with auto power-off. Sterilizes up to 6 bottles simultaneously.",
        price: 4999, // $49.99 in cents
        image: "https://tiny-tummy.com/Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/S401b7865098443e98d24b350e2dcbaa0C.jpg"
    },
    {
        name: "Silicone Fruit & Vegetable Feeder Pacifier",
        description: "Safe fruit and vegetable feeder with cover. Perfect for introducing fresh foods to babies.",
        price: 1199, // $11.99 in cents
        image: "https://tiny-tummy.com/Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/S23cbd5187adf44beb63b5904917b6a46d.jpg"
    },
    {
        name: "Deluxe Silicone Fruit Feeder Set with Cover",
        description: "Complete fruit feeder set with protective cover. Includes multiple sizes for growing babies.",
        price: 1199, // $11.99 in cents
        image: "https://tiny-tummy.com/1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S43fc540f1b774b4fb1702bfe2e20794cj.jpg"
    },
    {
        name: "Smart USB Milk Bottle Shaker & Formula Mixer",
        description: "USB-powered intelligent milk powder mixer with lithium battery. Perfect for on-the-go feeding.",
        price: 3499, // $34.99 in cents
        image: "https://tiny-tummy.com/Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S1c02935f16774099994ab49fb4e99c37t.png"
    }
];

async function createProducts() {
    console.log('Creating products in Stripe...\n');
    
    const createdProducts = [];
    
    for (const product of products) {
        try {
            // Create product
            const stripeProduct = await stripe.products.create({
                name: product.name,
                description: product.description,
                images: [product.image],
            });
            
            // Create price for the product
            const price = await stripe.prices.create({
                product: stripeProduct.id,
                unit_amount: product.price,
                currency: 'usd',
            });
            
            createdProducts.push({
                name: product.name,
                productId: stripeProduct.id,
                priceId: price.id,
                price: `$${(product.price / 100).toFixed(2)}`
            });
            
            console.log(`✅ Created: ${product.name}`);
            console.log(`   Product ID: ${stripeProduct.id}`);
            console.log(`   Price ID: ${price.id}\n`);
        } catch (error) {
            console.error(`❌ Error creating ${product.name}:`, error.message);
        }
    }
    
    console.log('\n=== Summary ===');
    console.log(`Created ${createdProducts.length} products\n`);
    console.log('Product IDs and Price IDs (save these for your code):\n');
    createdProducts.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name}`);
        console.log(`   Product ID: ${p.productId}`);
        console.log(`   Price ID: ${p.priceId}`);
        console.log(`   Price: ${p.price}\n`);
    });
    
    return createdProducts;
}

// Run if executed directly
if (require.main === module) {
    createProducts().catch(console.error);
}

module.exports = { createProducts, products };


// Product Data (shared with main script)
const products = [
    {
        id: 1,
        title: "Premium 4-in-1 Baby Food Maker & Steamer",
        price: 119.99,
        originalPrice: 153.80,
        image: "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/S276ed121fd9a46abad26b0e9c90e961a7.jpg",
        description: "Auto-clean, BPA-free food maker with steamer and blender. Perfect for babies 4-12 months.",
        fullDescription: "This premium 4-in-1 baby food maker combines steaming, blending, pureeing, and auto-cleaning in one convenient device. Made with BPA-free materials, it's designed specifically for babies aged 4-12 months. The intelligent steamer preserves nutrients while the powerful blender creates smooth purees. The auto-clean function makes cleanup effortless, saving you time and energy."
    },
    {
        id: 2,
        title: "2-Piece Silicone Suction Bowl Set",
        price: 11.99,
        originalPrice: 14.78,
        image: "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Ab6697c216e334f658d84df1a524c67bcz.jpg",
        description: "Non-slip suction bowls perfect for learning to eat. BPA-free and dishwasher safe.",
        fullDescription: "These adorable silicone suction bowls feature a strong suction base that keeps them securely in place on high chairs and tables. Made from 100% food-grade silicone, they're completely BPA-free and safe for your little one. The soft, flexible design is perfect for tiny hands learning to self-feed. Dishwasher and microwave safe for easy cleaning and heating."
    },
    {
        id: 3,
        title: "Complete 5-Piece Silicone Feeding Set",
        price: 19.99,
        originalPrice: 11.57,
        image: "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S21795722e2c64734a4c4a5f4b0769097q.jpg",
        description: "Complete feeding set with plate, bowl, spoon, and fork. Perfect starter set for toddlers.",
        fullDescription: "This comprehensive 5-piece feeding set includes everything your toddler needs: a divided plate with suction base, a deep bowl, and matching spoon and fork. All pieces are made from soft, food-grade silicone that's gentle on gums and perfect for learning to eat independently. The suction base prevents spills and messes, making mealtime less stressful for parents."
    },
    {
        id: 4,
        title: "360° Baby Bottle Steam Sterilizer",
        price: 49.99,
        originalPrice: null,
        image: "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/S401b7865098443e98d24b350e2dcbaa0C.jpg",
        description: "Large capacity sterilizer with auto power-off. Sterilizes up to 6 bottles simultaneously.",
        fullDescription: "Ensure your baby's feeding equipment is completely sanitized with this advanced 360° steam sterilizer. The large capacity design can sterilize up to 6 bottles at once, along with nipples, pacifiers, and other accessories. Features automatic power-off for safety and energy efficiency. The 360° sterilization ensures every surface is thoroughly cleaned, giving you peace of mind."
    },
    {
        id: 5,
        title: "Silicone Fruit & Vegetable Feeder Pacifier",
        price: 11.99,
        originalPrice: null,
        image: "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/S23cbd5187adf44beb63b5904917b6a46d.jpg",
        description: "Safe fruit and vegetable feeder with cover. Perfect for introducing fresh foods to babies.",
        fullDescription: "Introduce your baby to fresh fruits and vegetables safely with this silicone feeder pacifier. The mesh design allows babies to safely enjoy whole fruits and vegetables while preventing choking hazards. The protective cover keeps the feeder clean when not in use. Made from 100% food-grade silicone, it's BPA-free and easy to clean. Perfect for teething babies who want to explore new textures and flavors."
    },
    {
        id: 6,
        title: "Deluxe Silicone Fruit Feeder Set with Cover",
        price: 11.99,
        originalPrice: 9.13,
        image: "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S43fc540f1b774b4fb1702bfe2e20794cj.jpg",
        description: "Complete fruit feeder set with protective cover. Includes multiple sizes for growing babies.",
        fullDescription: "This deluxe set includes multiple fruit feeders in different sizes, perfect for babies at different stages. Each feeder comes with a protective cover to maintain hygiene. The soft silicone mesh allows babies to safely enjoy fruits and vegetables while providing relief during teething. The set includes everything you need to introduce fresh foods to your little one safely and hygienically."
    },
    {
        id: 7,
        title: "Smart USB Milk Bottle Shaker & Formula Mixer",
        price: 34.99,
        originalPrice: 37.13,
        image: "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S1c02935f16774099994ab49fb4e99c37t.png",
        description: "USB-powered intelligent milk powder mixer with lithium battery. Perfect for on-the-go feeding.",
        fullDescription: "Say goodbye to clumpy formula with this smart USB-powered milk bottle shaker. The intelligent mixing system ensures perfectly blended formula every time, without bubbles. Features a built-in lithium battery for portable use, perfect for travel or nighttime feedings. The quiet operation won't disturb your sleeping baby. USB charging makes it convenient to use anywhere."
    }
];

// Image galleries for each product
const productImages = {
    1: [
        "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/S276ed121fd9a46abad26b0e9c90e961a7.jpg",
        "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/Sa15821401021418fa9eedd644022b0f2o.jpg",
        "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/Sc03d6cc601bc46aba5af0adf399e62bfR.jpg",
        "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/Sd00e700bed6243fbb4a263f7382b9640l.jpg",
        "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/Se7372e63ccb746c0b675720099e627d3i.jpg",
        "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/Sef00ee9d41c140d1abd358cfeaf4efa56.jpg"
    ],
    2: [
        "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Ab6697c216e334f658d84df1a524c67bcz.jpg",
        "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Afe8a465833304ec2875d70634b74dacc8.jpg",
        "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/S59a87d4a940744a2a0a32ffebe92f11fD.jpg",
        "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/S5e3ebb4d01e04107a8fe280ceedb1960s.jpg",
        "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Sa5dc48aea58c42eb81bf67bcc6137ec4v.png",
        "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Sb52090dcfe134b1485e1468d380638ceN.png"
    ],
    3: [
        "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S21795722e2c64734a4c4a5f4b0769097q.jpg",
        "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S7acdb82e22324e77b4d1c9447f1c2bd55.jpg",
        "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S87da2be380a843c48e620826c6a8bb08p.jpg",
        "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S8e775f28e4ea4d6192b8a44f94b8d30eC.png",
        "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/Se0599a40149e4102bf002036fe0c4f3fA.jpg",
        "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/Se093bd36ed7d4d3d8a0a683b91763062p.jpg"
    ],
    4: [
        "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/S401b7865098443e98d24b350e2dcbaa0C.jpg",
        "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/Sa50ec60f84484add9d169b7395b1cb39z.jpg",
        "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/Sca0c747cc3814a41b7489a335dacee3aW.jpg",
        "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/Sd01f5350e8064d388b268cdadd9ac0caM.jpg",
        "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/Se5417693cdb84129b21172274f9c05dfF.jpg"
    ],
    5: [
        "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/S23cbd5187adf44beb63b5904917b6a46d.jpg",
        "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/Sb6839e7221ef45c7bac57a343d22c1efE.jpg",
        "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/Sb929410117d94907a160b99972e6595cU.jpg",
        "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/Sbbe725899e0b4a0e801b2ea27f9f84ecT.jpg",
        "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/Se1c35bfa748a425892b29cf3a621ad67l.jpg",
        "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/Sffc3a6c776fd4b148be5800b0a84bc89S.jpg"
    ],
    6: [
        "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S43fc540f1b774b4fb1702bfe2e20794cj.jpg",
        "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S45cf3c7b0f1849f08d22dfaabdfee7d8d.jpg",
        "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S49150aaefcb54384a2893217b51da591V.jpg",
        "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/Sb6056ac7b13f4d07b0126542dfe2b308H.jpg",
        "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/Sc7ace15b05854aca9e7ea5c8b6998817u.jpg",
        "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/Se13b3a2851e94874afe03397dc2f80b1n.jpg"
    ],
    7: [
        "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S1c02935f16774099994ab49fb4e99c37t.png",
        "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S386df10c78d6430e8d6f574b17f7e2b5Y.png",
        "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S43ad4578fe6744f2b0a895f595cba44fr.png",
        "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S4813d6ca8b054848ac1abe2b48164666M.png",
        "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/Sc87890445ac34a82b5572aaba5bffcacn.png"
    ]
};

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentImageIndex = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
    updateCartCount();
    setupEventListeners();
});

// Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

// Load Product Details
function loadProduct() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('productDetailContent').innerHTML = '<p>Product not found</p>';
        return;
    }
    
    const images = productImages[productId] || [product.image];
    currentImageIndex = 0;
    
    const productDetailHTML = `
        <div class="product-detail-grid">
            <div class="product-images sticky-images">
                <div class="main-image-container">
                    <img src="${images[0]}" alt="${product.title}" id="mainProductImage" class="main-product-image">
                    <button class="image-nav prev" onclick="changeImage(-1, ${productId})">‹</button>
                    <button class="image-nav next" onclick="changeImage(1, ${productId})">›</button>
                </div>
                <div class="thumbnail-gallery">
                    ${images.map((img, index) => `
                        <img src="${img}" alt="${product.title}" 
                             class="thumbnail ${index === 0 ? 'active' : ''}" 
                             onclick="selectImage(${index}, ${productId})"
                             onerror="this.style.display='none'">
                    `).join('')}
                </div>
            </div>
            <div class="product-details">
                <h1 class="product-detail-title">${product.title}</h1>
                <div class="product-detail-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice && product.originalPrice > product.price ? 
                        `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="add-to-cart-section">
                    <button class="btn-pink btn-large" onclick="addToCart(${product.id})">
                        Add to Cart - $${product.price.toFixed(2)}
                    </button>
                </div>
                <div class="product-description">
                    <h3>Description</h3>
                    <p>${product.fullDescription || product.description}</p>
                </div>
                <div class="product-features" id="productFeatures">
                    <h3>Key Features</h3>
                    <ul>
                        <li>✅ BPA-Free & Food-Grade Materials</li>
                        <li>✅ Safe for Babies & Toddlers</li>
                        <li>✅ Easy to Clean & Maintain</li>
                        <li>✅ Durable & Long-Lasting</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('productDetailContent').innerHTML = productDetailHTML;
    document.title = `${product.title} - TinyTummies`;
    
    // Load related products
    loadRelatedProducts(productId);
}

// Change Image
function changeImage(direction, productId) {
    const images = productImages[productId] || [products.find(p => p.id === productId).image];
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = images[currentImageIndex];
        mainImage.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22500%22 height=%22500%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22500%22 height=%22500%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EProduct Image%3C/text%3E%3C/svg%3E';
        };
    }
    
    // Update thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Select Image from Thumbnail
function selectImage(index, productId) {
    currentImageIndex = index;
    const images = productImages[productId] || [products.find(p => p.id === productId).image];
    const mainImage = document.getElementById('mainProductImage');
    
    if (mainImage) {
        mainImage.src = images[currentImageIndex];
        mainImage.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22500%22 height=%22500%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22500%22 height=%22500%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EProduct Image%3C/text%3E%3C/svg%3E';
        };
    }
    
    // Update thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentImageIndex);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Product added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
    showNotification('Product removed from cart');
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const images = productImages[item.id] || [product.image];
        
        return `
            <div class="cart-item">
                <img src="${images[0]}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 1rem;" onerror="this.style.display='none'">
                <div class="cart-item-info" style="flex: 1;">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart Icon Click
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    
    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', () => {
            renderCart();
            cartModal.classList.add('show');
        });
    }
    
    if (closeCart && cartModal) {
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('show');
            }
        });
    }
    
    // Clear Cart
    const clearCart = document.getElementById('clearCart');
    if (clearCart) {
        clearCart.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                cart = [];
                saveCart();
                updateCartCount();
                renderCart();
            }
        });
    }
    
    // Checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Thank you for your order! This is a demo store. In a real implementation, you would be redirected to a payment gateway.');
        });
    }
}

// Find product image path
function findProductImage(productId) {
    const imageMap = {
        1: "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/S276ed121fd9a46abad26b0e9c90e961a7.jpg",
        2: "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Ab6697c216e334f658d84df1a524c67bcz.jpg",
        3: "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S21795722e2c64734a4c4a5f4b0769097q.jpg",
        4: "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/S401b7865098443e98d24b350e2dcbaa0C.jpg",
        5: "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/S23cbd5187adf44beb63b5904917b6a46d.jpg",
        6: "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S43fc540f1b774b4fb1702bfe2e20794cj.jpg",
        7: "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S1c02935f16774099994ab49fb4e99c37t.png"
    };
    
    return imageMap[productId] || '';
}

// Load Related Products
function loadRelatedProducts(currentProductId) {
    const relatedProductsGrid = document.getElementById('relatedProductsGrid');
    if (!relatedProductsGrid) return;
    
    // Get 3 random products excluding the current one
    const otherProducts = products.filter(p => p.id !== currentProductId);
    const shuffled = otherProducts.sort(() => 0.5 - Math.random());
    const related = shuffled.slice(0, 3);
    
    relatedProductsGrid.innerHTML = related.map(product => {
        const imagePath = findProductImage(product.id);
        
        return `
            <div class="related-product-card" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${imagePath}" alt="${product.title}" class="related-product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22250%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22250%22 height=%22250%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EProduct Image%3C/text%3E%3C/svg%3E'">
                <div class="related-product-info">
                    <h3 class="related-product-title">${product.title}</h3>
                    <p class="related-product-description">${product.description}</p>
                    <div class="related-product-price">$${product.price.toFixed(2)}</div>
                    <button class="related-product-btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


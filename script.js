// Product Data
const products = [
    {
        id: 1,
        title: "Premium 4-in-1 Baby Food Maker & Steamer",
        price: 119.99,
        originalPrice: 153.80,
        image: "4in1AutoCleaBPAFreefor412MonthsBaby FoodMakerSteamerBlender/main_image/S276ed121fd9a46abad26b0e9c90e961a7.jpg",
        description: "Auto-clean, BPA-free food maker with steamer and blender. Perfect for babies 4-12 months."
    },
    {
        id: 2,
        title: "2-Piece Silicone Suction Bowl Set",
        price: 11.99,
        originalPrice: 14.78,
        image: "2PC Silicone Sucker Bowl Feeding Tableware for Infant/main_image/Ab6697c216e334f658d84df1a524c67bcz.jpg",
        description: "Non-slip suction bowls perfect for learning to eat. BPA-free and dishwasher safe."
    },
    {
        id: 3,
        title: "Complete 5-Piece Silicone Feeding Set",
        price: 19.99,
        originalPrice: 11.57,
        image: "5Pcs:Set Baby Soft Silicone Tableware Kid Feeding Dishe Sucker Plate Bowl Spoon Fork Set Children Dishes Non-slip Dinnerware Set/main_image/S21795722e2c64734a4c4a5f4b0769097q.jpg",
        description: "Complete feeding set with plate, bowl, spoon, and fork. Perfect starter set for toddlers."
    },
    {
        id: 4,
        title: "360° Baby Bottle Steam Sterilizer",
        price: 49.99,
        originalPrice: null,
        image: "Upgraded Baby Bottle Steam Sterilizer 360° Sterilization Bottles Sterilizer Large Capacity Auto Power Off Safe Sterilizer/main_image/S401b7865098443e98d24b350e2dcbaa0C.jpg",
        description: "Large capacity sterilizer with auto power-off. Sterilizes up to 6 bottles simultaneously."
    },
    {
        id: 5,
        title: "Silicone Fruit & Vegetable Feeder Pacifier",
        price: 11.99,
        originalPrice: null,
        image: "Baby Pacifier Fruit Feeder With Cover Silicone Newborn Nipple Fresh Fruit Food Vegetable Feeding Soother Baby Teether Toys/main_image/S23cbd5187adf44beb63b5904917b6a46d.jpg",
        description: "Safe fruit and vegetable feeder with cover. Perfect for introducing fresh foods to babies."
    },
    {
        id: 6,
        title: "Deluxe Silicone Fruit Feeder Set with Cover",
        price: 11.99,
        originalPrice: 9.13,
        image: "1set Silicone Baby Fruit Feeder with Cover Baby Nipple Fresh Food Vegetable Supplement Soother Nibbler Baby Silicone Toys/main_image/S43fc540f1b774b4fb1702bfe2e20794cj.jpg",
        description: "Complete fruit feeder set with protective cover. Includes multiple sizes for growing babies."
    },
    {
        id: 7,
        title: "Smart USB Milk Bottle Shaker & Formula Mixer",
        price: 34.99,
        originalPrice: 37.13,
        image: "Baby Electric Milk Bottle Shaker, USB Smart Intelligent Milk Powder Mixer, Lithium battery, Baby Formula Maker, Divine Device/main_image/S1c02935f16774099994ab49fb4e99c37t.png",
        description: "USB-powered intelligent milk powder mixer with lithium battery. Perfect for on-the-go feeding."
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    setupEventListeners();
    setupParallax();
    setupReviewNavigation();
});

// Parallax Scrolling Effect
function setupParallax() {
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    
    if (!heroBackground || !heroContent || !hero) return;
    
    let ticking = false;
    let lastScrollTop = 0;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = hero.offsetHeight;
        const heroTop = hero.offsetTop;
        
        // Only apply parallax when hero is in view
        if (scrollTop < heroHeight + heroTop) {
            // Calculate scroll progress (0 to 1)
            const scrollProgress = Math.min(scrollTop / (heroHeight * 0.6), 1);
            
            // Move background image down slower (creates depth effect) - subtle parallax
            const backgroundOffset = scrollTop * 0.5;
            heroBackground.style.transform = `translateY(${backgroundOffset}px) translateZ(0) scale(1.05)`;
            
            // Move content up faster (creates parallax effect) - subtle movement
            const contentOffset = scrollTop * 0.3;
            
            // Scale content slightly as we scroll
            const scale = Math.max(0.9, 1 - (scrollProgress * 0.1));
            heroContent.style.transform = `translateY(${-contentOffset}px) translateZ(0) scale(${scale})`;
            
            // Fade out content as we scroll
            heroContent.style.opacity = Math.max(0.3, 1 - (scrollProgress * 0.7));
        } else {
            // Reset when out of view
            heroBackground.style.transform = 'translateY(0) translateZ(0) scale(1)';
            heroContent.style.transform = 'translateY(0) translateZ(0) scale(1)';
            heroContent.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Use passive listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateParallax);
    
    // Initial call
    updateParallax();
}

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Try to find the first available image
        const imagePath = findProductImage(product.id);
        
        productCard.innerHTML = `
            <div class="product-card-link" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
                <img src="${imagePath}" alt="${product.title}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22250%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22250%22 height=%22250%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EProduct Image%3C/text%3E%3C/svg%3E'">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        $${product.price.toFixed(2)}
                        ${product.originalPrice && product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="product-info" style="padding-top: 0; border-top: 1px solid #eee; margin-top: 0.5rem;">
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Find product image path
function findProductImage(productId) {
    // Map product IDs to actual image paths
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
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const imagePath = findProductImage(item.id);
        
        return `
            <div class="cart-item">
                <img src="${imagePath}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 1rem;" onerror="this.style.display='none'">
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
    
    cartIcon.addEventListener('click', () => {
        renderCart();
        cartModal.classList.add('show');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('show');
    });
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('show');
        }
    });
    
    // Clear Cart - Custom Modal
    const clearCart = document.getElementById('clearCart');
    const clearCartModal = document.getElementById('clearCartModal');
    const cancelClearCart = document.getElementById('cancelClearCart');
    const confirmClearCart = document.getElementById('confirmClearCart');
    
    clearCart.addEventListener('click', () => {
        clearCartModal.classList.add('show');
    });
    
    cancelClearCart.addEventListener('click', () => {
        clearCartModal.classList.remove('show');
    });
    
    confirmClearCart.addEventListener('click', () => {
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
        clearCartModal.classList.remove('show');
        // Also close cart modal if open
        cartModal.classList.remove('show');
    });
    
    // Close clear cart modal when clicking outside
    clearCartModal.addEventListener('click', (e) => {
        if (e.target === clearCartModal) {
            clearCartModal.classList.remove('show');
        }
    });
    
    // Checkout - Embedded Stripe
    const checkoutBtn = document.getElementById('checkoutBtn');
    const stripeCheckoutSection = document.getElementById('stripeCheckoutSection');
    const stripeCheckoutContainer = document.getElementById('stripeCheckoutContainer');
    let stripeCheckout = null;
    
    checkoutBtn.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Disable button during processing
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Processing...';
        
        // Show loading state
        stripeCheckoutSection.style.display = 'block';
        stripeCheckoutContainer.innerHTML = `
            <div class="stripe-loading">
                <div class="loading-spinner"></div>
                <p>Loading secure checkout...</p>
            </div>
        `;
        
        // Scroll to checkout section
        setTimeout(() => {
            stripeCheckoutSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        try {
            // Send cart items to serverless function
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cart }),
            });
            
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned an error. Please try again.');
            }
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.message || 'Failed to create checkout session');
            }
            
                // Initialize Stripe and embed checkout
                const stripe = Stripe('pk_live_51SYRe757nKOsYdQQpPiiiwKMmlgXHV3AMqaC8mhoLlgV37ieOElwcv8KmJiQFgWnmcQFj6rT3DjgY0JV2Zh3y4hg00TTUK6Zq8');
                
                // Create embedded checkout
                const checkout = await stripe.initEmbeddedCheckout({
                    clientSecret: data.clientSecret
                });
                
                // Mount the embedded checkout
                if (stripeCheckoutContainer) {
                    checkout.mount(stripeCheckoutContainer);
                }
            
                // Reset button
                checkoutBtn.disabled = false;
                checkoutBtn.textContent = 'Checkout';
            
        } catch (error) {
            console.error('Checkout error:', error);
            stripeCheckoutContainer.innerHTML = `
                <div class="stripe-loading">
                    <p style="color: #c62828;">Error: ${error.message}</p>
                    <button class="btn-primary" onclick="location.reload()" style="margin-top: 1rem;">Try Again</button>
                </div>
            `;
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Checkout';
        }
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
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

// Setup Review Navigation
function setupReviewNavigation() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const reviewsScroll = document.getElementById('reviewsScroll');
    const leftBtn = document.getElementById('reviewLeftBtn');
    const rightBtn = document.getElementById('reviewRightBtn');
    
    if (!reviewsContainer || !reviewsScroll || !leftBtn || !rightBtn) return;
    
    const reviewCards = reviewsScroll.querySelectorAll('.review-card');
    const totalReviews = reviewCards.length;
    let currentIndex = 0;
    const reviewsPerPage = 3;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    
    function updateDisplay() {
        const containerWidth = reviewsContainer.offsetWidth;
        const translateX = -(currentIndex * containerWidth);
        
        reviewsScroll.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        leftBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
        leftBtn.style.pointerEvents = currentIndex > 0 ? 'auto' : 'none';
        
        rightBtn.style.opacity = currentIndex < totalPages - 1 ? '1' : '0.5';
        rightBtn.style.pointerEvents = currentIndex < totalPages - 1 ? 'auto' : 'none';
    }
    
    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateDisplay();
        }
    });
    
    rightBtn.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateDisplay();
        }
    });
    
    // Initial state
    updateDisplay();
    
    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateDisplay, 250);
    });
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


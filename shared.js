// Shared State Management for Cloud Coffee
// Exposes global state for User Profile, Cart, Drawer Toggles, and Toast Notifications

// --- 1. DEFAULT DATA CONFIGURATION ---
const DEFAULT_PROFILE = {
    name: "أحمد",
    status: "عميل مميز",
    memberSince: "عضو منذ 2023",
    points: 860,
    wallet: "1,230",
    orders: "2,450",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPHGfdGadujSiqVt22kHpjrYDWMLPbzROjT9Aw6rWl7gcam3hgoevZrUx6rP8Lmf2BTHEjuydaTP24gP0kIWAwB9SR5hWHDik0Jn9Zh4r6CkkOwYRKWG0yVMDU5t8JcFXn-GsrV-U9zWfmjlDFw6bOB2p627ajVcAx7uDbMagunkX6UF0GW1T4JgwN5C9O-3pGdDkgsWHFKLwYBqA6mcvHMOLMnyx6MN854m4MJ10s4QJPFUmpeGgbv0dg3onCtdjBRLfhMdPCkQRB"
};

const DEFAULT_CART = [
    { id: "cortado", name: "كورتادو", price: 14, quantity: 1 },
    { id: "brownie", name: "براوني الشوكولاتة", price: 18, quantity: 1 }
];

// --- 2. PROFILE STATE MANAGEMENT ---
function getProfile() {
    let profile = localStorage.getItem('cloud_coffee_profile');
    if (!profile) {
        localStorage.setItem('cloud_coffee_profile', JSON.stringify(DEFAULT_PROFILE));
        return DEFAULT_PROFILE;
    }
    return JSON.parse(profile);
}

function saveProfile(profileData) {
    const current = getProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem('cloud_coffee_profile', JSON.stringify(updated));
    updateUIElements();
    return updated;
}

// --- 3. CART STATE MANAGEMENT ---
function getCart() {
    let cart = localStorage.getItem('cloud_coffee_cart');
    if (!cart) {
        localStorage.setItem('cloud_coffee_cart', JSON.stringify(DEFAULT_CART));
        return DEFAULT_CART;
    }
    return JSON.parse(cart);
}

function saveCart(cartData) {
    localStorage.setItem('cloud_coffee_cart', JSON.stringify(cartData));
    updateUIElements();
}

function addToCart(item) {
    let cart = getCart();
    let existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
    showToast(`تم إضافة ${item.name} إلى السلة ☕`, "shopping_basket");
}

function getCartCount() {
    let cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function removeFromCart(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
}

// --- 4. BEAUTIFUL CUSTOM TOAST SYSTEM ---
function showToast(message, iconName = "done") {
    // Check if container exists, else create it
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-28 right-6 left-6 z-[100] flex flex-col gap-2 pointer-events-none md:left-auto md:w-96';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'glass-toast flex items-center gap-3 p-4 rounded-xl text-on-surface border border-outline-variant/30 shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto';
    toast.style.background = 'rgba(34, 31, 29, 0.95)';
    toast.style.backdropFilter = 'blur(12px)';
    
    toast.innerHTML = `
        <div class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px]">${iconName}</span>
        </div>
        <p class="font-body-md text-sm text-right flex-1 text-on-surface">${message}</p>
    `;

    toastContainer.appendChild(toast);

    // Trigger Animation
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    // Remove Toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// --- 5. AUTOMATIC UI SYNCHRONIZATION ---
function updateUIElements() {
    const profile = getProfile();
    const cartCount = getCartCount();

    // 1. Update Profile Fields globally
    document.querySelectorAll('.profile-name').forEach(el => {
        el.innerText = profile.name;
    });
    document.querySelectorAll('.profile-status').forEach(el => {
        el.innerText = profile.status;
    });
    document.querySelectorAll('.profile-member-since').forEach(el => {
        el.innerText = profile.memberSince;
    });
    document.querySelectorAll('.profile-points').forEach(el => {
        el.innerText = profile.points;
    });
    document.querySelectorAll('.profile-wallet').forEach(el => {
        el.innerText = profile.wallet;
    });
    document.querySelectorAll('.profile-orders').forEach(el => {
        el.innerText = profile.orders;
    });
    document.querySelectorAll('.profile-avatar').forEach(img => {
        img.src = profile.avatar;
        img.alt = `الملف الشخصي لـ ${profile.name}`;
    });

    // 2. Update Cart Badges globally
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.innerText = cartCount;
        if (cartCount > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });
}

// --- 6. GLOBAL INITIALIZATION & DRAWER CONTROL ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render initial values
    updateUIElements();

    // 2. Dynamic drawer hookup for elements with specific IDs/classes
    const drawerToggle = document.getElementById('menuToggle') || document.getElementById('menu-toggle') || document.querySelector('header button[aria-label="Menu"]') || document.querySelector('header button:first-child');
    const drawer = document.getElementById('navDrawer') || document.getElementById('side-drawer') || document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay') || document.getElementById('drawer-overlay');

    if (drawerToggle && drawer && overlay) {
        const toggleDrawer = () => {
            const isOpen = drawer.classList.contains('translate-x-0') || !drawer.classList.contains('translate-x-full');
            if (isOpen) {
                drawer.classList.add('translate-x-full');
                drawer.classList.remove('translate-x-0');
                overlay.classList.add('opacity-0', 'pointer-events-none');
                overlay.classList.remove('opacity-100');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            } else {
                overlay.classList.remove('hidden');
                drawer.classList.remove('translate-x-full');
                drawer.classList.add('translate-x-0');
                setTimeout(() => overlay.classList.add('opacity-100'), 10);
                overlay.classList.remove('pointer-events-none');
            }
        };

        drawerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDrawer();
        });
        overlay.addEventListener('click', toggleDrawer);
    }

    // 3. Add to Cart listener delegation
    document.querySelectorAll('[data-add-to-cart]').forEach(button => {
        button.addEventListener('click', function(e) {
            const itemId = this.getAttribute('data-item-id') || 'item';
            const itemName = this.getAttribute('data-item-name') || 'منتج';
            const itemPrice = parseFloat(this.getAttribute('data-item-price') || '0');
            
            addToCart({
                id: itemId,
                name: itemName,
                price: itemPrice
            });
        });
    });

    // 4. Tap Animations for primary action buttons (Micro-interactions)
    document.querySelectorAll('button, a.btn, nav a').forEach(el => {
        el.addEventListener('mousedown', () => {
            el.style.transform = 'scale(0.95)';
            el.style.transition = 'transform 0.1s ease';
        });
        el.addEventListener('mouseup', () => {
            el.style.transform = 'scale(1)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
        });
    });
});

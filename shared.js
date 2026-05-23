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

const DEFAULT_CAFES = {
    "hodoo": {
        id: "hodoo",
        name: "كوفي هدوء",
        description: "تجربة قهوة مختصة فريدة في أجواء هادئة وتصميم عصري يبعث على الراحة.",
        rating: 4.8,
        reviews: "250+",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
        phone: "+966 50 123 4567",
        whatsapp: "+966501234567",
        isOpen: true,
        latOffset: 0.0025,
        lngOffset: -0.0020,
        menuItems: [
            { id: "espresso", name: "اسبريسو", description: "طعم غني ومركز من حبوب البن الفاخرة", price: 10, category: "coffee", image: "https://images.unsplash.com/photo-1510707577719-ee7c14d51633?q=80&w=200&auto=format&fit=crop" },
            { id: "latte", name: "لاتيه", description: "مزيج متوازن من الاسبريسو والحليب المبخر السلس", price: 14, category: "coffee", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=200&auto=format&fit=crop" },
            { id: "cappuccino", name: "كابتشينو", description: "اسبريسو غني مع رغوة حليب كثيفة مخملية وبودرة الكاكاو", price: 14, category: "coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop" },
            { id: "filter", name: "فلتر", description: "قهوة مقطرة كلاسيكية مستخلصة من أفضل محاصيل كولومبيا", price: 12, category: "coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=200&auto=format&fit=crop" },
            { id: "ice-latte", name: "سبيشال آيس لاتيه", description: "لاتيه بارد ومنعش مع لمسة شراب الفانيليا الخاصة بنا", price: 16, category: "cold", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=200&auto=format&fit=crop" },
            { id: "brownie", name: "براوني الشوكولاتة", description: "قطعة براوني دافئة وغنية بقطع الشوكولاتة البلجيكية", price: 18, category: "sweet", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=200&auto=format&fit=crop" },
            { id: "turkey-sandwich", name: "كلوب الديك الرومي", description: "شرائح الديك الرومي المدخن مع الجبن والخضار في خبز التوست المقرمش", price: 22, category: "sandwich", image: "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=200&auto=format&fit=crop" }
        ]
    },
    "artisan": {
        id: "artisan",
        name: "كوفي أرتيزان",
        description: "لعشاق القهوة المختصة، نقدم لكم أفضل أنواع البن المحمص يدوياً بكل حب وشغف.",
        rating: 4.9,
        reviews: "320+",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
        phone: "+966 54 987 6543",
        whatsapp: "+966549876543",
        isOpen: true,
        latOffset: -0.0035,
        lngOffset: 0.0045,
        menuItems: [
            { id: "cortado", name: "كورتادو", description: "نسبة متساوية من الاسبريسو القوي والحليب الدافئ", price: 14, category: "coffee", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=200&auto=format&fit=crop" },
            { id: "flat-white", name: "فلات وايت", description: "اسبريسو ثنائي مع رغوة حليب خفيفة وناعمة جداً", price: 15, category: "coffee", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=200&auto=format&fit=crop" },
            { id: "chemex", name: "قهوة كيمكس", description: "قهوة مقطرة نقية متوازنة ومستخلصة بأداة الكيمكس", price: 18, category: "coffee", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=200&auto=format&fit=crop" },
            { id: "cold-brew", name: "كولد برو مختصة", description: "قهوة منقوعة بالماء البارد لمدة 18 ساعة لنكهة غنية خالية من المرارة", price: 17, category: "cold", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=200&auto=format&fit=crop" },
            { id: "pistachio-shake", name: "ميلك شيك الفستق", description: "حليب مثلج مخلوط مع آيسكريم الفانيليا وكريمة الفستق الطبيعي الفاخرة", price: 20, category: "cold", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=200&auto=format&fit=crop" },
            { id: "croissant", name: "كرواسون الجبنة الفرنسي", description: "كرواسون فرنسي هش ومورق محشو بجبنة الشيدر الذائبة", price: 12, category: "sandwich", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200&auto=format&fit=crop" },
            { id: "saffron-cake", name: "كيكة الزعفران", description: "كيكة إسفنجية ناعمة مشربة بحليب الزعفران اللذيذ ومغطاة بالكريمة", price: 24, category: "sweet", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=200&auto=format&fit=crop" }
        ]
    },
    "night": {
        id: "night",
        name: "كوفي نايت",
        description: "وجهتك المثالية للعمل أو الدراسة في ساعات المساء المتأخرة مع كوب من القهوة الدافئة والهدوء.",
        rating: 4.6,
        reviews: "180+",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
        phone: "+966 56 345 6789",
        whatsapp: "+966563456789",
        isOpen: true,
        latOffset: 0.0050,
        lngOffset: 0.0060,
        menuItems: [
            { id: "macchiato", name: "ماكياتو كراميل دافئ", description: "إسبريسو غني مع حليب دافئ وصلصة الكراميل الفاخرة الموزعة بفن", price: 15, category: "coffee", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=200&auto=format&fit=crop" },
            { id: "turkish-coffee", name: "قهوة تركية بالرمل", description: "محضرة على الطريقة التقليدية فوق الرمل الساخن لوش كثيف وطعم أصيل", price: 11, category: "coffee", image: "https://images.unsplash.com/photo-1541332246502-2e99eaa96cc1?q=80&w=200&auto=format&fit=crop" },
            { id: "spanish-latte", name: "سبانش لاتيه بارد", description: "مزيج مثالي من الاسبريسو والحليب البارد المكثف المحلى مع مكعبات الثلج", price: 18, category: "cold", image: "https://images.unsplash.com/photo-1546272989-40c929bad9e5?q=80&w=200&auto=format&fit=crop" },
            { id: "mochaccino", name: "موكاشينو مثلج", description: "إسبريسو ممزوج بصلصة الشوكولاتة الداكنة والحليب البارد مع الثلج وكريمة الخفق", price: 17, category: "cold", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=200&auto=format&fit=crop" },
            { id: "cheesecake", name: "تشيز كيك التوت الأزرق", description: "طبقة غنية من جبنة الكريم المخفوقة الفاخرة على قاعدة بسكويت مقرمشة مغطاة بالتوت الأزرق", price: 22, category: "sweet", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=200&auto=format&fit=crop" },
            { id: "cookies", name: "كوكيز الشوكولاتة العملاق", description: "كوكيز طري ودافئ يخبز يومياً محشو بقطع الشوكولاتة الذائبة الوفيرة", price: 9, category: "sweet", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=200&auto=format&fit=crop" },
            { id: "halloumi-sandwich", name: "ساندوتش حلومي مشوي", description: "جبن الحلومي المشوي مع الزيتون الأسود، الطماطم وجرجير طازج في خبز الصابولي", price: 18, category: "sandwich", image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=200&auto=format&fit=crop" }
        ]
    },
    "corner": {
        id: "corner",
        name: "ركن القهوة",
        description: "تصاميم خشبية دافئة وتشكيلة واسعة من الحلويات الطازجة التي تناسب قهوتك العربية والمستوحاة من تراثنا.",
        rating: 4.7,
        reviews: "140+",
        image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop",
        phone: "+966 52 456 7890",
        whatsapp: "+966524567890",
        isOpen: true,
        latOffset: -0.0040,
        lngOffset: -0.0035,
        menuItems: [
            { id: "arabic-coffee", name: "دلة قهوة عربية صغيرة", description: "قهوة شقراء ممتازة مهيلة ومبهرة تقدم مع التمر والتحية", price: 25, category: "coffee", image: "https://images.unsplash.com/photo-1580933073474-c8c110457651?q=80&w=200&auto=format&fit=crop" },
            { id: "affogato", name: "أفوغاتو إسبريسو بالآيسكريم", description: "كرة آيسكريم فانيليا غنية يسكب عليها جرعة إسبريسو ساخنة مركزة", price: 16, category: "cold", image: "https://images.unsplash.com/photo-1594911774802-8822a707cff3?q=80&w=200&auto=format&fit=crop" },
            { id: "ice-mocha", name: "آيس موكا شوكولاتة", description: "حليب بارد، إسبريسو وصلصة شوكولاتة داكنة مثلجة", price: 18, category: "cold", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop" },
            { id: "honey-cake", name: "كيكة العسل الروسية", description: "طبقات متناوبة من كيك العسل الهش وكريمة الكراميل الناعمة اللذيذة", price: 22, category: "sweet", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=200&auto=format&fit=crop" },
            { id: "tiramisu", name: "تيراميسو إيطالي فاخر", description: "حلوى إيطالية كلاسيكية معدة ببسكويت مغمور بالقهوة وكريمة الماسكاربوني المخملية", price: 20, category: "sweet", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200&auto=format&fit=crop" },
            { id: "tuna-sandwich", name: "ساندوتش خلطة التونة الشهية", description: "ساندوتش تونة بخلطتنا الخاصة من المايونيز، الشبت والذرة الحلوة في خبز حبوب كاملة مغذٍّ", price: 16, category: "sandwich", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=200&auto=format&fit=crop" },
            { id: "croque-monsieur", name: "كروك موسيو كلاسيكي", description: "توست فرنسي مقلي محشو بجبن الموزاريلا والبيشاميل الغني المشوي بالفرن", price: 20, category: "sandwich", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=200&auto=format&fit=crop" }
        ]
    }
};

function getCafes() {
    let cafes = localStorage.getItem('cloud_coffee_cafes');
    if (!cafes) {
        localStorage.setItem('cloud_coffee_cafes', JSON.stringify(DEFAULT_CAFES));
        return DEFAULT_CAFES;
    }
    return JSON.parse(cafes);
}

function saveCafes(cafesData) {
    localStorage.setItem('cloud_coffee_cafes', JSON.stringify(cafesData));
}

function getCafeById(id) {
    const cafes = getCafes();
    return cafes[id] || cafes['hodoo'];
}

function updateCafe(id, updatedCafeData) {
    const cafes = getCafes();
    if (cafes[id]) {
        cafes[id] = { ...cafes[id], ...updatedCafeData };
        saveCafes(cafes);
        return cafes[id];
    }
    return null;
}

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

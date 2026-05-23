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
        phone: "01008910934",
        whatsapp: "+201008910934",
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
        phone: "01008910934",
        whatsapp: "+201008910934",
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
        phone: "01008910934",
        whatsapp: "+201008910934",
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
        phone: "01008910934",
        whatsapp: "+201008910934",
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
    let parsed = JSON.parse(cafes);
    let updated = false;
    for (let id in DEFAULT_CAFES) {
        if (parsed[id] && (parsed[id].phone !== DEFAULT_CAFES[id].phone || parsed[id].whatsapp !== DEFAULT_CAFES[id].whatsapp)) {
            parsed[id].phone = DEFAULT_CAFES[id].phone;
            parsed[id].whatsapp = DEFAULT_CAFES[id].whatsapp;
            updated = true;
        }
    }
    if (updated) {
        localStorage.setItem('cloud_coffee_cafes', JSON.stringify(parsed));
    }
    return parsed;
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
    const loggedIn = localStorage.getItem('cloud_coffee_logged_in') === 'true';
    if (!loggedIn) {
        return {
            name: "زائر (اضغط لتسجيل الدخول)",
            status: "حساب ضيف",
            memberSince: "يرجى تسجيل الدخول 🔐",
            points: 0,
            wallet: "0",
            orders: "0",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        };
    }
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

let pendingCartItem = null;

function addToCart(item) {
    const loggedIn = localStorage.getItem('cloud_coffee_logged_in') === 'true';
    if (!loggedIn) {
        pendingCartItem = item;
        openAuthModal();
        showToast('يرجى تسجيل الدخول أولاً لإضافة المنتج للسلة 🔐', 'lock');
        return;
    }

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

// --- 3.5 FAVORITE CAFES STATE MANAGEMENT ---
function getFavorites() {
    let favs = localStorage.getItem('cloud_coffee_favorites');
    return favs ? JSON.parse(favs) : [];
}

function toggleFavoriteCafe(cafeId) {
    let favs = getFavorites();
    const index = favs.indexOf(cafeId);
    let isFav = false;
    if (index > -1) {
        favs.splice(index, 1);
        isFav = false;
    } else {
        favs.push(cafeId);
        isFav = true;
    }
    localStorage.setItem('cloud_coffee_favorites', JSON.stringify(favs));
    return isFav;
}

function isCafeFavorite(cafeId) {
    return getFavorites().includes(cafeId);
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

    // 3. Update Logout/Login Action Buttons globally
    const loggedIn = localStorage.getItem('cloud_coffee_logged_in') === 'true';
    document.querySelectorAll('a, button').forEach(el => {
        if (el.innerText.includes('تسجيل الخروج') || el.innerText.includes('تسجيل الدخول')) {
            const textSpan = Array.from(el.querySelectorAll('span')).find(s => s.innerText.includes('تسجيل الخروج') || s.innerText.includes('تسجيل الدخول'));
            const iconSpan = Array.from(el.querySelectorAll('span')).find(s => s.innerText.trim() === 'logout' || s.innerText.trim() === 'login');
            
            if (loggedIn) {
                if (textSpan) textSpan.innerText = 'تسجيل الخروج';
                if (iconSpan) iconSpan.innerText = 'logout';
                
                el.classList.add('text-error');
                el.classList.remove('text-primary');
                if (iconSpan) {
                    iconSpan.classList.add('text-error');
                    iconSpan.classList.remove('text-primary');
                }
                
                el.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    localStorage.removeItem('cloud_coffee_logged_in');
                    localStorage.removeItem('cloud_coffee_profile');
                    updateUIElements();
                    showToast('تم تسجيل الخروج بنجاح 🔒', 'lock');
                    setTimeout(openAuthModal, 600);
                };
            } else {
                if (textSpan) textSpan.innerText = 'تسجيل الدخول';
                if (iconSpan) iconSpan.innerText = 'login';
                
                el.classList.remove('text-error');
                el.classList.add('text-primary');
                if (iconSpan) {
                    iconSpan.classList.remove('text-error');
                    iconSpan.classList.add('text-primary');
                }
                
                el.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openAuthModal();
                };
            }
        }
    });
}

// --- 6. GLOBAL INITIALIZATION, DYNAMIC PREMIUM CART DRAWER & AUTH SYSTEM ---
let pendingCheckout = false;

function initDynamicUI() {
    // 1. Injected CSS for smooth transitions
    if (!document.getElementById('cloud-coffee-custom-styles')) {
        const style = document.createElement('style');
        style.id = 'cloud-coffee-custom-styles';
        style.textContent = `
            #cart-drawer.active, #auth-modal.active {
                display: flex !important;
            }
            .no-scroll {
                overflow: hidden !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Cart Drawer HTML
    if (!document.getElementById('cart-drawer')) {
        const cartHtml = `
            <div id="cart-drawer" class="fixed inset-0 z-[100] hidden items-end justify-center pointer-events-none transition-all duration-300">
                <div id="cart-drawer-overlay" class="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-auto"></div>
                <div id="cart-drawer-sheet" class="absolute bottom-0 left-0 w-full bg-[#151311] border-t border-outline-variant/30 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.85)] transition-transform duration-300 ease-out translate-y-full flex flex-col max-h-[85%] max-w-lg mx-auto pointer-events-auto z-10 text-right">
                    <!-- Drawer Header -->
                    <div class="flex justify-between items-center p-6 border-b border-outline-variant/10">
                        <h3 class="text-primary text-xl font-bold flex items-center gap-2 font-headline-lg">
                            <span class="material-symbols-outlined text-primary text-2xl">shopping_basket</span>
                            سلة المشتريات
                        </h3>
                        <button id="cart-close-btn" class="w-10 h-10 rounded-full bg-[#221f1d] text-on-surface-variant flex items-center justify-center hover:bg-[#2c2927] transition-all active:scale-95">
                            <span class="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                    <!-- Cart Items List -->
                    <div id="cart-items-list" class="flex-grow overflow-y-auto p-6 space-y-4 max-h-[380px] min-h-[180px] custom-scrollbar">
                        <!-- Items injected dynamically -->
                    </div>
                    <!-- Drawer Footer -->
                    <div class="p-6 border-t border-outline-variant/10 bg-[#1d1b19]/80 backdrop-blur-md rounded-b-[2.5rem]">
                        <div class="flex justify-between items-center mb-6 text-on-surface">
                            <span class="text-sm font-semibold text-on-surface-variant">إجمالي السلة:</span>
                            <span id="cart-total-price" class="text-2xl font-bold text-primary">0 ر.س</span>
                        </div>
                        <button id="cart-checkout-btn" class="w-full h-14 bg-primary text-on-primary font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                            <span>تأكيد وإرسال الطلب</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = cartHtml.trim();
        document.body.appendChild(div.firstChild);
        
        // Bind Close Click
        document.getElementById('cart-close-btn').addEventListener('click', closeCartDrawer);
        document.getElementById('cart-drawer-overlay').addEventListener('click', closeCartDrawer);
        
        // Bind Checkout Click
        document.getElementById('cart-checkout-btn').addEventListener('click', handleCheckout);
    }

    // 3. Auth Modal HTML
    if (!document.getElementById('auth-modal')) {
        const authHtml = `
            <div id="auth-modal" class="fixed inset-0 z-[110] hidden items-center justify-center p-4">
                <div id="auth-modal-overlay" class="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 transition-opacity duration-300 pointer-events-auto"></div>
                <div id="auth-modal-box" class="relative bg-[#151311] border border-outline-variant/30 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl transition-all duration-300 scale-95 opacity-0 flex flex-col text-right pointer-events-auto z-10">
                    <!-- Close button -->
                    <button id="auth-close-btn" class="absolute top-6 left-6 w-10 h-10 rounded-full bg-[#221f1d] text-on-surface-variant flex items-center justify-center hover:bg-[#2c2927] transition-all active:scale-95 z-10">
                        <span class="material-symbols-outlined text-lg">close</span>
                    </button>
                    
                    <!-- Tabs Header -->
                    <div class="flex border-b border-outline-variant/10 mb-6 justify-center gap-6 mt-4">
                        <button id="tab-login" class="pb-3 text-lg font-bold text-primary border-b-2 border-primary transition-all focus:outline-none">تسجيل الدخول</button>
                        <button id="tab-signup" class="pb-3 text-lg font-semibold text-on-surface-variant border-b-2 border-transparent transition-all focus:outline-none">إنشاء حساب</button>
                    </div>
                    
                    <!-- Auth Forms -->
                    <div class="space-y-4">
                        <div id="signup-name-field" class="hidden transition-all duration-300">
                            <label class="block text-xs font-semibold text-on-surface-variant mb-2">الاسم الكامل</label>
                            <input type="text" id="auth-name" class="w-full bg-[#1d1b19] border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-all text-right font-body-md" placeholder="أدخل اسمك الكامل..."/>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-on-surface-variant mb-2">البريد الإلكتروني أو رقم الهاتف</label>
                            <input type="text" id="auth-identity" class="w-full bg-[#1d1b19] border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-all text-right font-body-md" placeholder="example@mail.com"/>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-on-surface-variant mb-2">كلمة المرور</label>
                            <input type="password" id="auth-password" class="w-full bg-[#1d1b19] border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-all text-right font-body-md animate-fadeIn" placeholder="••••••••"/>
                        </div>
                        
                        <button id="auth-submit-btn" class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all mt-6 shadow-xl shadow-primary/10">
                            <span>تسجيل الدخول</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = authHtml.trim();
        document.body.appendChild(div.firstChild);
        
        // Bind close events
        document.getElementById('auth-close-btn').addEventListener('click', closeAuthModal);
        document.getElementById('auth-modal-overlay').addEventListener('click', closeAuthModal);
        
        // Tab switcher
        let isLoginTab = true;
        const tabLogin = document.getElementById('tab-login');
        const tabSignup = document.getElementById('tab-signup');
        const nameField = document.getElementById('signup-name-field');
        const submitBtn = document.getElementById('auth-submit-btn');
        
        tabLogin.addEventListener('click', () => {
            isLoginTab = true;
            tabLogin.className = "pb-3 text-lg font-bold text-primary border-b-2 border-primary transition-all focus:outline-none";
            tabSignup.className = "pb-3 text-lg font-semibold text-on-surface-variant border-b-2 border-transparent transition-all focus:outline-none";
            nameField.classList.add('hidden');
            submitBtn.querySelector('span').innerText = "تسجيل الدخول";
        });
        
        tabSignup.addEventListener('click', () => {
            isLoginTab = false;
            tabSignup.className = "pb-3 text-lg font-bold text-primary border-b-2 border-primary transition-all focus:outline-none";
            tabLogin.className = "pb-3 text-lg font-semibold text-on-surface-variant border-b-2 border-transparent transition-all focus:outline-none";
            nameField.classList.remove('hidden');
            submitBtn.querySelector('span').innerText = "إنشاء حساب";
        });
        
        // Submit handler
        submitBtn.addEventListener('click', () => {
            const identity = document.getElementById('auth-identity').value.trim();
            const password = document.getElementById('auth-password').value.trim();
            const name = document.getElementById('auth-name').value.trim();
            
            if (!identity || !password || (!isLoginTab && !name)) {
                showToast('الرجاء ملء جميع الحقول المطلوبة ⚠️', 'warning');
                return;
            }
            
            // Set login state
            localStorage.setItem('cloud_coffee_logged_in', 'true');
            
            // Save profile details
            const displayName = isLoginTab ? "أحمد" : name;
            const updatedProfile = {
                name: displayName,
                status: "عميل مميز",
                memberSince: "عضو منذ 2026",
                points: 860,
                wallet: "1,230",
                orders: "2,450",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPHGfdGadujSiqVt22kHpjrYDWMLPbzROjT9Aw6rWl7gcam3hgoevZrUx6rP8Lmf2BTHEjuydaTP24gP0kIWAwB9SR5hWHDik0Jn9Zh4r6CkkOwYRKWG0yVMDU5t8JcFXn-GsrV-U9zWfmjlDFw6bOB2p627ajVcAx7uDbMagunkX6UF0GW1T4JgwN5C9O-3pGdDkgsWHFKLwYBqA6mcvHMOLMnyx6MN854m4MJ10s4QJPFUmpeGgbv0dg3onCtdjBRLfhMdPCkQRB"
            };
            localStorage.setItem('cloud_coffee_profile', JSON.stringify(updatedProfile));
            updateUIElements();
            
            closeAuthModal();
            showToast(`مرحباً بك يا ${displayName}! تم تسجيل الدخول بنجاح 🎉`, 'done');
            
            // If checkout was pending, run it
            if (pendingCheckout) {
                pendingCheckout = false;
                setTimeout(handleCheckout, 500);
            } else if (pendingCartItem) {
                const itemToAdd = pendingCartItem;
                pendingCartItem = null;
                setTimeout(() => {
                    addToCart(itemToAdd);
                    openCartDrawer();
                }, 500);
            }
        });
    }

    // 4. Dynamic Floating Cart Button Injection
    const path = window.location.pathname.toLowerCase();
    const isLandingPage = path.endsWith('index.html') || path === '/' || path.endsWith('/');
    const isCafeAdmin = path.includes('cafe-admin.html');
    
    if (!isLandingPage && !isCafeAdmin && !document.querySelector('.cart-badge')) {
        const cartBtn = document.createElement('button');
        cartBtn.id = 'dynamic-floating-cart-btn';
        cartBtn.className = 'fixed bottom-24 left-6 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center z-50 group hover:scale-110 transition-transform active:scale-90';
        cartBtn.innerHTML = `
            <span class="material-symbols-outlined text-3xl">shopping_basket</span>
            <span class="absolute -top-1 -right-1 bg-white text-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md cart-badge">0</span>
        `;
        document.body.appendChild(cartBtn);
        
        // Bind click event to open the cart drawer
        cartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openCartDrawer();
        });

        // Sync count immediately for this new button
        const cartCount = getCartCount();
        const badge = cartBtn.querySelector('.cart-badge');
        if (badge) {
            badge.innerText = cartCount;
            if (cartCount > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }
}

function openCartDrawer() {
    initDynamicUI();
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    const sheet = document.getElementById('cart-drawer-sheet');
    
    document.body.classList.add('no-scroll');
    drawer.classList.add('active');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        sheet.classList.remove('translate-y-full');
    }, 20);
    
    renderCartItems();
}

function closeCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const sheet = document.getElementById('cart-drawer-sheet');
    const drawer = document.getElementById('cart-drawer');
    
    document.body.classList.remove('no-scroll');
    if (overlay && sheet && drawer) {
        overlay.classList.add('opacity-0');
        sheet.classList.add('translate-y-full');
        setTimeout(() => {
            drawer.classList.remove('active');
        }, 300);
    }
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-price');
    const cart = getCart();
    
    if (!list) return;
    list.innerHTML = '';
    
    if (cart.length === 0) {
        list.innerHTML = `
            <div class="text-center py-12 text-on-surface-variant/60 flex flex-col items-center">
                <span class="material-symbols-outlined text-[48px] mb-2 opacity-50">shopping_cart_checkout</span>
                <p class="font-medium text-sm">سلة المشتريات فارغة تماماً ☕</p>
            </div>
        `;
        totalEl.innerText = "0 ر.س";
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = "flex items-center gap-4 bg-[#221f1d] p-4 rounded-2xl border border-outline-variant/10 text-right shadow-sm w-full";
        div.innerHTML = `
            <div class="flex-grow">
                <h4 class="font-bold text-on-surface text-base">${item.name}</h4>
                <p class="text-primary text-sm font-bold mt-1">${item.price} ر.س</p>
            </div>
            <div class="flex items-center gap-2 bg-[#1d1b19] border border-outline-variant/20 rounded-xl p-1 shrink-0">
                <button onclick="changeQty('${item.id}', -1)" class="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-variant font-bold text-sm transition-colors">-</button>
                <span class="text-on-surface font-bold text-sm px-1 min-w-[20px] text-center">${item.quantity}</span>
                <button onclick="changeQty('${item.id}', 1)" class="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-variant font-bold text-sm transition-colors">+</button>
            </div>
            <button onclick="deleteItem('${item.id}')" class="text-error hover:text-[#ffdad6] p-2 flex items-center justify-center shrink-0 transition-colors">
                <span class="material-symbols-outlined text-[22px]">delete</span>
            </button>
        `;
        list.appendChild(div);
    });
    
    totalEl.innerText = `${total} ر.س`;
}

window.changeQty = function(id, offset) {
    let cart = getCart();
    let item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += offset;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart(cart);
        renderCartItems();
    }
};

window.deleteItem = function(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCartItems();
};

function handleCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('السلة فارغة، أضف بعض المنتجات أولاً ☕', 'warning');
        return;
    }
    
    const loggedIn = localStorage.getItem('cloud_coffee_logged_in') === 'true';
    if (!loggedIn) {
        closeCartDrawer();
        pendingCheckout = true;
        setTimeout(openAuthModal, 400);
        showToast('يرجى تسجيل الدخول لإتمام طلبك 🔐', 'lock');
        return;
    }
    
    // Process Checkout
    closeCartDrawer();
    saveCart([]); // Empty the cart
    showToast('🚀 تم تأكيد وإرسال طلبك بنجاح! جاري تحضير قهوتك المميزة...', 'local_cafe');
}

function openAuthModal() {
    initDynamicUI();
    const modal = document.getElementById('auth-modal');
    const overlay = document.getElementById('auth-modal-overlay');
    const box = document.getElementById('auth-modal-box');
    
    document.body.classList.add('no-scroll');
    modal.classList.add('active');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        box.classList.remove('opacity-0', 'scale-95');
    }, 20);
}

function closeAuthModal() {
    const overlay = document.getElementById('auth-modal-overlay');
    const box = document.getElementById('auth-modal-box');
    const modal = document.getElementById('auth-modal');
    
    document.body.classList.remove('no-scroll');
    if (overlay && box && modal) {
        overlay.classList.add('opacity-0');
        box.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
    }
    pendingCheckout = false;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render initial values
    updateUIElements();

    // 2. Dynamic UI and Cart Badge Hijacker
    initDynamicUI();
    
    const setupBadgeClick = () => {
        document.querySelectorAll('.cart-badge').forEach(badge => {
            let btn = badge.closest('button') || badge.parentElement;
            if (btn) {
                btn.removeAttribute('onclick');
                btn.onclick = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openCartDrawer();
                };
            }
        });
    };
    setupBadgeClick();
    setTimeout(setupBadgeClick, 500);

    // Bind profile clicks for guests to open the Auth Modal
    const bindProfileClick = () => {
        document.querySelectorAll('.profile-name, .profile-avatar, .profile-status, a[href="profile.html"]').forEach(el => {
            if (el.tagName === 'A') {
                el.addEventListener('click', (e) => {
                    const isUserLoggedIn = localStorage.getItem('cloud_coffee_logged_in') === 'true';
                    if (!isUserLoggedIn) {
                        e.preventDefault();
                        e.stopPropagation();
                        openAuthModal();
                    }
                });
            } else {
                el.style.cursor = 'pointer';
                el.addEventListener('click', (e) => {
                    const isUserLoggedIn = localStorage.getItem('cloud_coffee_logged_in') === 'true';
                    if (!isUserLoggedIn) {
                        e.stopPropagation();
                        openAuthModal();
                    }
                });
            }
        });
    };
    bindProfileClick();



    // Hijack any link pointing to browse.html with the text "المفضلة" to point to browse.html?tab=favorites
    document.querySelectorAll('a[href="browse.html"]').forEach(el => {
        if (el.innerText.includes('المفضلة')) {
            el.setAttribute('href', 'browse.html?tab=favorites');
        }
    });

    // 3. Dynamic drawer hookup for elements with specific IDs/classes
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

    // 4. Add to Cart listener delegation
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

    // 5. Tap Animations for primary action buttons (Micro-interactions)
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

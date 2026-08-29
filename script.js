const firebaseConfig = {
  apiKey: "AIzaSyD75WGH4sVwTrC8Y6BgPLKg7GpObMjSAGY",
  authDomain: "ice-cream-bceb2.firebaseapp.com",
  databaseURL: "https://ice-cream-bceb2-default-rtdb.firebaseio.com",
  projectId: "ice-cream-bceb2",
  storageBucket: "ice-cream-bceb2.firebasestorage.app",
  messagingSenderId: "212188278895",
  appId: "1:212188278895:web:1492d327f91d9d321cdd9a",
  measurementId: "G-YEWCJ0LF2L"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let ICONBG = ["#f79f1f", "#e15f41", "#8854d0", "#20bf6b", "#eb3b5a", "#0fb9b1", "#4b7bec", "#fa8231"];
let menuItems = [];
let nextId = 1;

let categories = [
  { key: 'ice', label: '🍦 Muzqaymoq' },
  { key: 'food', label: '🍪 Yeguliklar' },
  { key: 'drink', label: '🥤 Ichimliklar' },
];

let admin = { nick: 'single glace', pass: '995787887' };
let isLoggedIn = false;

let orders = [];
let nextOrderId = 1;

let cart = [];
let currentCat = 'ice';
let editingItemId = null;
let currentTable = 'Stol #01'; // Default table

// Read table from URL
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('table')) {
  currentTable = 'Stol #' + urlParams.get('table').padStart(2, '0');
}

// Default items if DB is empty
const defaultItems = [
  // ICE CREAM
  { id: 1, cat: 'ice', name: 'Qaymoqli klassik', price: 15000, icon: '🍦', hidden: false },
  { id: 2, cat: 'ice', name: 'Shokoladli premium', price: 18000, icon: '🍨', hidden: false },
  { id: 3, cat: 'ice', name: 'Mevabop (Mix)', price: 20000, icon: '🍧', hidden: false },
  { id: 4, cat: 'ice', name: 'Klassik Mix', price: 25000, icon: '🍦', hidden: false },
  { id: 5, cat: 'ice', name: 'Shokolad Double', price: 25000, icon: '🍫', hidden: false },
  { id: 6, cat: 'ice', name: 'Meva & Qaymoq', price: 25000, icon: '🍓', hidden: false },

  // FOOD (Yeguliklar)
  { id: 7, cat: 'food', name: 'Hot-dog bulichka', price: 17000, icon: '🌭', hidden: false },
  { id: 8, cat: 'food', name: 'Hot-dog bulichka (katta)', price: 20000, icon: '🌭', hidden: false },
  { id: 9, cat: 'food', name: 'Hot-dog non', price: 15000, icon: '🌭', hidden: false },
  { id: 10, cat: 'food', name: 'Hot-dog non (2)', price: 17000, icon: '🌭', hidden: false },
  { id: 11, cat: 'food', name: 'Hot-dog non (3)', price: 22000, icon: '🌭', hidden: false },
  { id: 12, cat: 'food', name: 'Hot-dog non (4)', price: 28000, icon: '🌭', hidden: false },
  { id: 13, cat: 'food', name: 'Mini lavash', price: 30000, icon: '🥙', hidden: false },
  { id: 14, cat: 'food', name: 'Lavash', price: 35000, icon: '🥙', hidden: false },
  { id: 15, cat: 'food', name: 'Big Lavash', price: 40000, icon: '🥙', hidden: false },
  { id: 16, cat: 'food', name: 'Non Burger', price: 35000, icon: '🍔', hidden: false },
  { id: 17, cat: 'food', name: 'Big Non Burger', price: 45000, icon: '🍔', hidden: false },
  { id: 18, cat: 'food', name: 'Haggi', price: 30000, icon: '🍔', hidden: false },
  { id: 19, cat: 'food', name: 'Haggi (katta)', price: 35000, icon: '🍔', hidden: false },

  // DRINKS (Ichimliklar) — rasmsiz, ba'zilarida hajm variantlari bor
  { id: 20, cat: 'drink', name: 'Coca-Cola', variants: { '1L': 8000, '1,5L': 10000, '2L': 12000 }, hidden: false },
  { id: 21, cat: 'drink', name: 'Fanta', variants: { '1L': 8000, '1,5L': 10000, '2L': 12000 }, hidden: false },
  { id: 22, cat: 'drink', name: 'Sprite', variants: { '1L': 8000, '1,5L': 10000, '2L': 12000 }, hidden: false },
  { id: 23, cat: 'drink', name: 'Pepsi', variants: { '1L': 8000, '1,5L': 10000, '2L': 12000 }, hidden: false },
  { id: 24, cat: 'drink', name: 'Coca-Cola (banka)', price: 6000, hidden: false },
  { id: 25, cat: 'drink', name: 'Pepsi (banka)', price: 6000, hidden: false },
  { id: 26, cat: 'drink', name: 'Hydrolik suv', variants: { '1L': 5000, '1,5L': 6000, '2L': 7000 }, hidden: false },
  { id: 27, cat: 'drink', name: 'Lipton (muzli choy)', variants: { '1L': 9000, '1,5L': 11000, '2L': 13000 }, hidden: false },
  { id: 28, cat: 'drink', name: 'Ays Tea', variants: { '1L': 9000, '1,5L': 11000, '2L': 13000 }, hidden: false },
  { id: 29, cat: 'drink', name: 'Fuse Tea', variants: { '1L': 9000, '1,5L': 11000, '2L': 13000 }, hidden: false },
  { id: 30, cat: 'drink', name: 'Tropic sharbat', price: 12000, hidden: false },
  { id: 31, cat: 'drink', name: 'Dena sharbat (aralash mevali)', price: 10000, hidden: false },
  { id: 32, cat: 'drink', name: 'Dinay sharbat (aralash mevali)', price: 10000, hidden: false },
  { id: 33, cat: 'drink', name: 'Adrenaline Energy (banka)', price: 15000, hidden: false },
  { id: 34, cat: 'drink', name: 'Flash Energy (banka)', price: 15000, hidden: false },
  { id: 35, cat: 'drink', name: 'Mojito (banka)', price: 12000, hidden: false },
  { id: 36, cat: 'drink', name: 'Coca-Cola tara (shisha)', price: 12000, hidden: false },
  { id: 37, cat: 'drink', name: 'Fanta tara (shisha)', price: 12000, hidden: false },
  { id: 38, cat: 'drink', name: 'Sprite tara (shisha)', price: 12000, hidden: false },
];

// Setup Firebase Listeners
db.ref('menuItems').on('value', snap => {
  const data = snap.val();
  if (!data) {
    db.ref('menuItems').set(defaultItems);
  } else {
    menuItems = Array.isArray(data) ? data : Object.values(data);
    nextId = Math.max(0, ...menuItems.map(i => i.id)) + 1;
    if (document.getElementById('view-menu') && !document.getElementById('view-menu').classList.contains('hidden')) {
      renderProducts();
    }
    if (document.getElementById('view-admin') && !document.getElementById('view-admin').classList.contains('hidden')) {
      renderAdminGrid();
    }
  }
});

db.ref('admin').on('value', snap => {
  if (snap.val()) admin = snap.val();
});

db.ref('orders').on('value', snap => {
  const data = snap.val();
  if (data) {
    orders = Array.isArray(data) ? data : Object.values(data);
    orders.sort((a,b) => b.id - a.id); // Sort by ID descending
    nextOrderId = Math.max(0, ...orders.map(o => o.id)) + 1;
    if (document.getElementById('view-admin') && !document.getElementById('view-admin').classList.contains('hidden') && document.getElementById('tabOrders').classList.contains('active')) {
      renderOrders();
    }
  } else {
    orders = [];
  }
});

function syncMenu() {
  db.ref('menuItems').set(menuItems).catch(err => alert("Saqlashda xatolik: " + err.message));
}

function syncOrders() {
  db.ref('orders').set(orders).catch(err => alert("Saqlashda xatolik: " + err.message));
}

function syncAdmin() {
  db.ref('admin').set(admin).catch(err => alert("Saqlashda xatolik: " + err.message));
}

/* ======================= NAV ======================= */
function hideAll() {
  ['view-home', 'view-menu', 'view-admin-login', 'view-admin'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.classList.add('hidden');
  });
}
function renderHeader() {
  const right = document.getElementById('headerRight');
  const tag = document.getElementById('adminTag');
  if (isLoggedIn) {
    if(tag) tag.textContent = ' — Admin';
    if(right) right.innerHTML = `<button onclick="goHome()">🏠 Bosh sahifa</button><button class="dark" onclick="logout()">Chiqish</button>`;
  } else {
    if(tag) tag.textContent = '';
    if(right) right.innerHTML = `<button onclick="goHome()">🏠 Bosh sahifa</button><button onclick="goMenu()">${currentTable}</button>`;
  }
}
function goHome() { 
  hideAll(); 
  const el = document.getElementById('view-home');
  if(el) el.classList.remove('hidden'); 
  renderHeader(); 
}
function goMenu() { 
  hideAll(); 
  const el = document.getElementById('view-menu');
  if(el) el.classList.remove('hidden'); 
  renderHeader(); 
  if(document.getElementById('catTabs')) renderCatTabs(); 
  if(document.getElementById('products')) renderProducts(); 
  if(document.getElementById('cartItems')) renderCart(); 
}
function goAdminLogin() {
  hideAll(); 
  const el = document.getElementById('view-admin-login');
  if(el) el.classList.remove('hidden'); 
  renderHeader();
  if(document.getElementById('hintNick')) document.getElementById('hintNick').textContent = admin.nick;
  if(document.getElementById('hintPass')) document.getElementById('hintPass').textContent = admin.pass;
}
function logout() { isLoggedIn = false; goHome(); }

/* ======================= CUSTOMER MENU ======================= */
function renderCatTabs() {
  const box = document.getElementById('catTabs');
  box.innerHTML = categories.map(c => `
    <button class="${c.key === currentCat ? 'active' : ''}" onclick="setCat('${c.key}')">${c.label}</button>
  `).join('');
}
function setCat(key) { currentCat = key; renderCatTabs(); renderProducts(); }

function renderProducts() {
  const box = document.getElementById('products');
  const items = menuItems.filter(i => i.cat === currentCat && !i.hidden);
  box.innerHTML = items.map(item => {
    const showImg = false;
    const imgHtml = showImg ? `<div class="img" style="background:${bgFor(item.id)}">${item.icon || '🍽️'}</div>` : '';
    if (item.variants) {
      const keys = Object.keys(item.variants);
      const volBtns = keys.map((v, i) => `
        <button class="vol-btn ${i === 0 ? 'selected' : ''}" data-vol="${v}" data-price="${item.variants[v]}" onclick="selectVol(this)">
          ${v}<span class="price">${fmt(item.variants[v])}</span>
        </button>`).join('');
      return `
        <div class="card">
          ${imgHtml}
          <div class="body">
            <h3>${item.name}</h3>
            <div class="hint">Hajmni tanlang:</div>
            <div class="vol-row" data-item="${item.id}">${volBtns}</div>
            <button class="add-btn" onclick="addVariantToCart(${item.id})">+ Qo'shish</button>
          </div>
        </div>`;
    } else {
      return `
        <div class="card">
          ${imgHtml}
          <div class="body">
            <h3>${item.name}</h3>
            <div class="price-single">${fmt(item.price)}</div>
            <button class="add-btn" onclick="addToCart('${item.name}', ${item.price})">+ Qo'shish</button>
          </div>
        </div>`;
    }
  }).join('') || `<div style="color:#888;padding:20px;">Bu bo'limda hozircha mahsulot yo'q.</div>`;
}
function bgFor(id) { return ICONBG[id % ICONBG.length]; }
function selectVol(btn) {
  const row = btn.parentElement;
  row.querySelectorAll('.vol-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}
function addVariantToCart(itemId) {
  const row = document.querySelector(`.vol-row[data-item="${itemId}"]`);
  const sel = row.querySelector('.vol-btn.selected');
  const item = menuItems.find(i => i.id === itemId);
  addToCart(`${item.name} (${sel.dataset.vol})`, Number(sel.dataset.price));
}
function addToCart(name, price) {
  const existing = cart.find(c => c.name === name);
  if (existing) { existing.qty++; } else { cart.push({ name, price, qty: 1 }); }
  renderCart();
  showToast(`${name} savatga qo'shildi`);
}
function changeQty(name, delta) {
  const it = cart.find(c => c.name === name);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) cart = cart.filter(c => c.name !== name);
  renderCart();
}
function renderCart() {
  const box = document.getElementById('cartItems');
  const totalEl = document.getElementById('totalPrice');
  if (cart.length === 0) {
    box.innerHTML = `<div class="empty">Savatingiz bo'sh</div>`;
    totalEl.textContent = '0 so\'m';
    return;
  }
  box.innerHTML = cart.map(c => `
    <div class="cart-item">
      <span>${c.name}</span>
      <div class="qty-ctrl">
        <button onclick="changeQty('${c.name.replace(/'/g, "\\'")}',-1)">−</button>
        <span>${c.qty}</span>
        <button onclick="changeQty('${c.name.replace(/'/g, "\\'")}',1)">+</button>
      </div>
      <span>${fmt(c.price * c.qty)}</span>
    </div>`).join('');
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  totalEl.textContent = fmt(total);
}
function placeOrder() {
  if (cart.length === 0) { showToast("Savat bo'sh — avval mahsulot qo'shing"); return; }
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  orders.unshift({
    id: nextOrderId++,
    table: currentTable,
    location: document.getElementById('locationSelect').value,
    items: cart.map(c => ({ name: c.name, price: c.price, qty: c.qty })),
    total,
    status: 'Kutilmoqda',
    time: new Date().getTime() // Use timestamp for Firebase
  });
  syncOrders();
  cart = [];
  renderCart();
  showToast("Buyurtma qabul qilindi! Rahmat 🎉");
}

/* ======================= ADMIN LOGIN ======================= */
function tryLogin() {
  const nick = document.getElementById('loginNick').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  if (nick === admin.nick && pass === admin.pass) {
    isLoggedIn = true;
    goAdminDashboard();
  } else {
    showToast("Login yoki parol noto'g'ri");
  }
}
function goAdminDashboard() {
  hideAll();
  document.getElementById('view-admin').classList.remove('hidden');
  renderHeader();
  switchAdminTab('orders');
}
function switchAdminTab(tab) {
  ['Orders', 'Menu', 'Settings'].forEach(t => {
    document.getElementById('admin' + t).classList.add('hidden');
    document.getElementById('tab' + t).classList.remove('active');
  });
  const map = { orders: 'Orders', menu: 'Menu', settings: 'Settings' };
  document.getElementById('admin' + map[tab]).classList.remove('hidden');
  document.getElementById('tab' + map[tab]).classList.add('active');
  if (tab === 'orders') renderOrders();
  if (tab === 'menu') renderAdminGrid();
}

/* ======================= ADMIN: ORDERS ======================= */
function renderOrders() {
  const box = document.getElementById('ordersList');
  if (orders.length === 0) {
    box.innerHTML = `<div style="color:#888;">Hozircha buyurtmalar yo'q.</div>`;
    return;
  }
  box.innerHTML = orders.map(o => {
    const badgeClass = o.status === 'Tayyor' ? '' : (o.status === 'Bekor qilindi' ? 'cancelled' : 'pending');
    const lines = o.items.map(it => `<div><span>${it.name} x${it.qty}</span><span>${fmt(it.price * it.qty)}</span></div>`).join('');
    return `
    <div class="order-card">
      <div class="top">
        <div>
          <b>${o.table} · ${o.location}</b><br>
          <span class="time">${new Date(o.time).toLocaleString('uz-UZ')}</span>
        </div>
        <span class="status-badge ${badgeClass}">${o.status.toUpperCase()}</span>
      </div>
      <div class="order-lines">${lines}</div>
      <div class="order-bottom">
        <b>Jami: ${fmt(o.total)}</b>
        <select onchange="updateOrderStatus(${o.id}, this.value)">
          ${['Kutilmoqda', 'Tayyorlanmoqda', 'Tayyor', 'Bekor qilindi'].map(s => `<option ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>`;
  }).join('');
}
function updateOrderStatus(id, status) {
  const o = orders.find(o => o.id === id);
  if (o) { o.status = status; syncOrders(); }
}

/* ======================= ADMIN: MENU ======================= */
function renderAdminGrid() {
  const box = document.getElementById('adminGrid');
  box.innerHTML = menuItems.map(item => {
    const priceLabel = item.variants
      ? Object.entries(item.variants).map(([k, v]) => `${k}: ${fmt(v)}`).join(' / ')
      : fmt(item.price);
    const showImg = false;
    const imgHtml = showImg ? `<div class="img" style="background:${bgFor(item.id)}">${item.icon || '🍽️'}</div>` : '';
    return `
    <div class="admin-card ${item.hidden ? 'hidden-item' : ''}">
      ${imgHtml}
      <div class="body">
        <div class="cat">${catLabel(item.cat)}</div>
        <h4>${item.name}</h4>
        <div class="price">${priceLabel}</div>
        <div class="btn-row">
          <button class="btn-edit" onclick="openItemModal(${item.id})">Tahrirlash</button>
          <button class="btn-hide" onclick="toggleHide(${item.id})">${item.hidden ? "Ko'rsatish" : 'Yashirish'}</button>
          <button class="btn-del" onclick="deleteItem(${item.id})">O'chirish</button>
        </div>
      </div>
    </div>`;
  }).join('');
}
function catLabel(cat) {
  return cat === 'ice' ? 'Muzqaymoq' : cat === 'food' ? 'Yeguliklar' : 'Ichimliklar';
}
function toggleHide(id) {
  const it = menuItems.find(i => i.id === id);
  if(it) {
    it.hidden = !it.hidden;
    syncMenu();
  }
}
function deleteItem(id) {
  if (!confirm("Bu mahsulotni o'chirishni tasdiqlaysizmi?")) return;
  menuItems = menuItems.filter(i => i.id !== id);
  syncMenu();
}
function openItemModal(id) {
  editingItemId = id;
  document.getElementById('itemModalBg').classList.remove('hidden');
  if (id) {
    const it = menuItems.find(i => i.id === id);
    document.getElementById('modalTitle').textContent = 'Mahsulotni tahrirlash';
    document.getElementById('mName').value = it.name;
    document.getElementById('mCat').value = it.cat;
    document.getElementById('mPrice').value = it.variants ? '' : it.price;
    document.getElementById('mIcon').value = it.icon || '';
  } else {
    document.getElementById('modalTitle').textContent = 'Yangi mahsulot qo\'shish';
    document.getElementById('mName').value = '';
    document.getElementById('mCat').value = currentCat === 'drink' ? 'drink' : 'ice';
    document.getElementById('mPrice').value = '';
    document.getElementById('mIcon').value = '🍦';
  }
}
function closeItemModal() { document.getElementById('itemModalBg').classList.add('hidden'); editingItemId = null; }
function saveItem() {
  const name = document.getElementById('mName').value.trim();
  const cat = document.getElementById('mCat').value.trim() || 'ice';
  const price = Number(document.getElementById('mPrice').value) || 0;
  const icon = document.getElementById('mIcon').value.trim() || '🍽️';
  if (!name) { showToast("Nomini kiriting"); return; }

  if (editingItemId) {
    const it = menuItems.find(i => i.id === editingItemId);
    it.name = name; it.cat = cat; it.icon = icon;
    if (it.variants) {
      // variantli mahsulotning umumiy narxini o'zgartirmaymiz, faqat nomi/kategoriyasi
    } else {
      it.price = price;
    }
  } else {
    menuItems.push({ id: nextId++, cat, name, price, icon, hidden: false });
  }
  closeItemModal();
  syncMenu();
}

/* ======================= ADMIN: SETTINGS ======================= */
function saveSettings() {
  const nick = document.getElementById('newNick').value.trim();
  const pass = document.getElementById('newPass').value.trim();
  if (nick) admin.nick = nick;
  if (pass) admin.pass = pass;
  document.getElementById('newNick').value = '';
  document.getElementById('newPass').value = '';
  syncAdmin();
  showToast("Sozlamalar saqlandi");
}

/* ======================= UTIL ======================= */
function fmt(n) { return n.toLocaleString('ru-RU') + " so'm"; }
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

/* init */
if (document.getElementById('view-home')) {
  goHome();
} else if (document.getElementById('view-admin-login')) {
  goAdminLogin();
}

/* ======================= QR CODE ======================= */
function generateQRCode() {
  const tableNum = document.getElementById('qrTableNum').value.trim();
  if (!tableNum) {
    showToast("Iltimos, stol raqamini kiriting");
    return;
  }
  
  const qrResult = document.getElementById('qrResult');
  const qrLink = document.getElementById('qrLink');
  
  qrResult.innerHTML = '';
  
  // Create full URL with current origin + ?table=
  let baseUrl = window.location.origin + window.location.pathname;
  if(baseUrl.endsWith('admin.html')) baseUrl = baseUrl.replace('admin.html', 'menu.html');
  
  const url = `${baseUrl}?table=${tableNum}`;
  
  new QRCode(qrResult, {
    text: url,
    width: 200,
    height: 200,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
  
  qrLink.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  showToast("Stol " + tableNum + " uchun QR Kod yaratildi");
}

/* ======================= RESTORE MENU ======================= */
function restoreDefaultMenu() {
  if (confirm("Diqqat! Barcha joriy menyu ma'lumotlari o'chib, dastlabki 38 ta mahsulot tiklanadi. Tasdiqlaysizmi?")) {
    db.ref('menuItems').set(defaultItems).then(() => {
      showToast("Menyu muvaffaqiyatli tiklandi!");
    }).catch(err => {
      showToast("Xatolik: " + err.message);
    });
  }
}
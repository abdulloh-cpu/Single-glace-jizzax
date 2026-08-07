/* ============================================================
   SINGLE ICECREAM — bitta fayldagi to'liq ilova
   ============================================================ */

/* ---------------- DATA LAYER (localStorage) ---------------- */

const DB_KEYS = { MENU: "si_menu", ORDERS: "si_orders", ADMIN: "si_admin_creds" };

const DEFAULT_MENU = [
  { id: "m1", name: "Qaymoqli klassik", price: 15000, image: "", active: true, category: "muzqaymoq", type: "simple" },
  { id: "m2", name: "Shokoladli premium", price: 18000, image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=60", active: true, category: "muzqaymoq", type: "simple" },
  { id: "m3", name: "Mevabop (Mix)", price: 20000, image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=600&q=60", active: true, category: "muzqaymoq", type: "simple" },
  { id: "m4", name: "Klassik Mix", price: 25000, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=60", active: true, category: "muzqaymoq", type: "simple" },
  { id: "m5", name: "Shokolad Double", price: 25000, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=60", active: true, category: "muzqaymoq", type: "simple" },
  { id: "m6", name: "Meva & Qaymoq", price: 25000, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=60", active: true, category: "muzqaymoq", type: "simple" },
  {
    id: "d1", name: "Kola", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=60", active: true, category: "ichimliklar", type: "sized",
    sizes: [{ label: "1L", price: 12000 }, { label: "1,5L", price: 15000 }, { label: "2L", price: 18000 }]
  }
];

const DEFAULT_ADMIN = { username: "admin", password: "admin123" };

const SEED_VERSION_KEY = "si_seed_version";
const CURRENT_SEED_VERSION = 3;

/* v2: "Yeguliklar" menyusidagi surat asosida (Hot-dog, Lavash, Non Burger)
   va "Ichimliklar" muzlatgichlaridagi mahsulotlar asosida qo'shilgan taomlar.
   Diqqat: ba'zi Hot-dog/Haggi narxlari suratda xira bo'lgani uchun taxminiy,
   ichimliklarning narxi esa suratda umuman ko'rinmagani uchun 0 so'm qilib
   qo'yildi — admin panelda tekshirib/kiritib chiqish kerak. */
const SEED_V2_ITEMS = [
  // ---- YEGULIKLAR: Hot-doglar ----
  { id: "f1", name: "Hot-dog bulichka", price: 17000, image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f2", name: "Hot-dog bulichka (katta)", price: 20000, image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f3", name: "Hot-dog non", price: 15000, image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f4", name: "Hot-dog non (2)", price: 17000, image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f5", name: "Hot-dog non (3)", price: 22000, image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f6", name: "Hot-dog non (4)", price: 28000, image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  // ---- YEGULIKLAR: Lavash ----
  { id: "f7", name: "Mini lavash", price: 30000, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f8", name: "Lavash", price: 35000, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f9", name: "Big Lavash", price: 40000, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  // ---- YEGULIKLAR: Non Burger / Haggi ----
  { id: "f10", name: "Non Burger", price: 35000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f11", name: "Big Non Burger", price: 45000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f12", name: "Haggi", price: 30000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },
  { id: "f13", name: "Haggi (2)", price: 30000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=60", category: "yeguliklar", type: "simple" },

  // ---- ICHIMLIKLAR: gazlangan ichimliklar ----
  { id: "dr1", name: "Pepsi", price: 0, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr2", name: "Coca-Cola", price: 0, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr3", name: "Fanta", price: 0, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr4", name: "Sprite", price: 0, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  // ---- ICHIMLIKLAR: choy / muzli choy ----
  { id: "dr5", name: "Lipton (muzli choy)", price: 0, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr6", name: "Ays Tea", price: 0, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr7", name: "Fuse Tea", price: 0, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  // ---- ICHIMLIKLAR: sharbatlar ----
  { id: "dr8", name: "Tropic sharbat", price: 0, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr9", name: "Dena sharbat (Multifrukt)", price: 0, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr10", name: "Dena sharbat (Ayva)", price: 0, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr11", name: "Dena sharbat (Shaftoli)", price: 0, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr12", name: "Dena sharbat (Olma)", price: 0, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr13", name: "Dena sharbat (O'rik)", price: 0, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr14", name: "Dinay sharbat", price: 0, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  // ---- ICHIMLIKLAR: suv / energetik ----
  { id: "dr15", name: "Mineral suv (Hydrolife)", price: 0, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr16", name: "Energetik ichimlik", price: 0, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" },
  { id: "dr17", name: "Mojito (banka)", price: 0, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=60", category: "ichimliklar", type: "simple" }
];

const ORDER_STATUSES = [
  { key: "yangi", label: "Yangi" },
  { key: "tayyorlanmoqda", label: "Tayyorlanmoqda" },
  { key: "tayyor", label: "Tayyor" },
  { key: "yetkazildi", label: "Yakunlandi" },
  { key: "bekor", label: "Bekor qilindi" }
];

const DB = {
  getMenu() {
    let menu;
    const raw = localStorage.getItem(DB_KEYS.MENU);
    if (!raw) {
      localStorage.setItem(DB_KEYS.MENU, JSON.stringify(DEFAULT_MENU));
      menu = [...DEFAULT_MENU];
    } else {
      try { menu = JSON.parse(raw); } catch { menu = [...DEFAULT_MENU]; }
    }
    return DB._applySeedUpgrades(menu);
  },
  _applySeedUpgrades(menu) {
    let version = parseInt(localStorage.getItem(SEED_VERSION_KEY) || "1", 10);
    let changed = false;
    if (version < 2) {
      SEED_V2_ITEMS.forEach(item => {
        if (!menu.some(m => m.name === item.name)) {
          menu.push({ ...item, active: true });
          changed = true;
        }
      });
      version = 2;
      changed = true;
    }
    if (version < 3) {
      menu = menu.map(item => {
        if (item.category === "ichimliklar" && item.type !== "sized") {
          changed = true;
          return {
            id: item.id,
            name: item.name,
            image: item.image,
            category: item.category,
            active: item.active,
            type: "sized",
            sizes: [{ label: "1L", price: 0 }, { label: "1,5L", price: 0 }, { label: "2L", price: 0 }]
          };
        }
        return item;
      });
      version = 3;
      changed = true;
    }
    if (changed) {
      localStorage.setItem(SEED_VERSION_KEY, String(version));
      localStorage.setItem(DB_KEYS.MENU, JSON.stringify(menu));
    }
    return menu;
  },
  saveMenu(menu) { localStorage.setItem(DB_KEYS.MENU, JSON.stringify(menu)); },
  addMenuItem(item) { const menu = DB.getMenu(); item.id = "m" + Date.now(); item.active = true; menu.push(item); DB.saveMenu(menu); return item; },
  updateMenuItem(id, changes) { const menu = DB.getMenu(); const idx = menu.findIndex(m => m.id === id); if (idx !== -1) { menu[idx] = { ...menu[idx], ...changes }; DB.saveMenu(menu); } },
  deleteMenuItem(id) { DB.saveMenu(DB.getMenu().filter(m => m.id !== id)); },
  getOrders() { const raw = localStorage.getItem(DB_KEYS.ORDERS); if (!raw) return []; try { return JSON.parse(raw); } catch { return []; } },
  saveOrders(orders) { localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders)); },
  addOrder(order) { const orders = DB.getOrders(); order.id = "o" + Date.now(); order.status = "yangi"; order.createdAt = new Date().toISOString(); orders.unshift(order); DB.saveOrders(orders); return order; },
  updateOrderStatus(id, status) { const orders = DB.getOrders(); const idx = orders.findIndex(o => o.id === id); if (idx !== -1) { orders[idx].status = status; DB.saveOrders(orders); } },
  getAdminCreds() { const raw = localStorage.getItem(DB_KEYS.ADMIN); if (!raw) { localStorage.setItem(DB_KEYS.ADMIN, JSON.stringify(DEFAULT_ADMIN)); return { ...DEFAULT_ADMIN }; } try { return JSON.parse(raw); } catch { return { ...DEFAULT_ADMIN }; } },
  saveAdminCreds(creds) { localStorage.setItem(DB_KEYS.ADMIN, JSON.stringify(creds)); }
};

function formatSom(num) { return num.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm"; }
function statusLabel(key) { const found = ORDER_STATUSES.find(s => s.key === key); return found ? found.label : key; }

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

/* ---------------- SCREEN NAVIGATION ---------------- */

function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  if (name === "landing") document.getElementById("screen-landing").classList.add("active");
  if (name === "menu") { document.getElementById("screen-menu").classList.add("active"); renderMenu(); renderCart(); }
  if (name === "admin-login") document.getElementById("screen-admin-login").classList.add("active");
  if (name === "admin-dashboard") { document.getElementById("screen-admin-dashboard").classList.add("active"); renderOrders(); renderMenuAdmin(); startAutoRefresh(); }
  if (name !== "admin-dashboard") stopAutoRefresh();
}

/* ---------------- CUSTOMER MENU ---------------- */

const params = new URLSearchParams(window.location.search);
const TABLE_NUMBER = params.get("stol") || params.get("table") || "01";
document.getElementById("tableBadge").textContent = "Stol: #" + TABLE_NUMBER;

let cart = {};
let activeCategory = "muzqaymoq";
let selectedSizeMap = {};

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderMenu();
  });
});

function renderMenu() {
  const menu = DB.getMenu().filter(m => m.active !== false && (m.category || "muzqaymoq") === activeCategory);
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = "";
  if (menu.length === 0) { grid.innerHTML = '<div class="empty-state">Bu bo\'limda hozircha taom yo\'q</div>'; return; }
  menu.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    if (item.type === "sized") {
      if (selectedSizeMap[item.id] === undefined) selectedSizeMap[item.id] = 0;
      const selectedIdx = selectedSizeMap[item.id];
      const sizesHtml = item.sizes.map((s, idx) =>
        `<button class="size-btn${idx === selectedIdx ? " selected" : ""}" data-idx="${idx}"><span class="size-label">${s.label}</span><span class="size-price">${formatSom(s.price)}</span></button>`
      ).join("");
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=60'">
        <div class="card-body">
          <h3>${item.name}</h3>
          <div class="size-price-list">Hajmni tanlang:</div>
          <div class="size-grid">${sizesHtml}</div>
          <button class="btn btn-light add-sized-btn" data-id="${item.id}">+ Qo'shish</button>
        </div>`;
      card.querySelectorAll(".size-btn").forEach(b => {
        b.addEventListener("click", () => {
          selectedSizeMap[item.id] = parseInt(b.dataset.idx, 10);
          renderMenu();
        });
      });
      card.querySelector(".add-sized-btn").addEventListener("click", () => addToCart(item.id, selectedSizeMap[item.id]));
    } else {
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=60'">
        <div class="card-body">
          <h3>${item.name}</h3>
          <div class="card-price">${formatSom(item.price)}</div>
          <button class="btn btn-light" data-id="${item.id}">+ Qo'shish</button>
        </div>`;
      card.querySelector("button").addEventListener("click", () => addToCart(item.id));
    }
    grid.appendChild(card);
  });
}

function addToCart(id, sizeIdx) {
  const key = sizeIdx === undefined ? id : id + "::" + sizeIdx;
  cart[key] = (cart[key] || 0) + 1;
  renderCart();
  showToast("Savatga qo'shildi 🍨");
}
function changeQty(key, delta) { if (!cart[key]) return; cart[key] += delta; if (cart[key] <= 0) delete cart[key]; renderCart(); }

function resolveCartLine(key) {
  const menu = DB.getMenu();
  const [id, sizeIdx] = key.split("::");
  const item = menu.find(m => m.id === id);
  if (!item) return null;
  if (sizeIdx !== undefined && item.sizes) {
    const size = item.sizes[parseInt(sizeIdx, 10)];
    if (!size) return null;
    return { name: item.name + " (" + size.label + ")", price: size.price };
  }
  return { name: item.name, price: item.price };
}

function renderCart() {
  const list = document.getElementById("cartList");
  const keys = Object.keys(cart);
  if (keys.length === 0) { list.innerHTML = '<div class="cart-empty">Savatingiz bo\'sh</div>'; document.getElementById("cartTotal").textContent = "0 so'm"; document.getElementById("orderBtn").disabled = true; return; }
  let total = 0;
  list.innerHTML = "";
  keys.forEach(key => {
    const line = resolveCartLine(key);
    if (!line) return;
    const qty = cart[key];
    total += line.price * qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div><div class="cart-item-name">${line.name}</div><div class="cart-item-sub">${formatSom(line.price)} x ${qty}</div></div>
      <div class="qty-controls"><button data-act="minus">−</button><span>${qty}</span><button data-act="plus">+</button></div>`;
    row.querySelector('[data-act="minus"]').addEventListener("click", () => changeQty(key, -1));
    row.querySelector('[data-act="plus"]').addEventListener("click", () => changeQty(key, 1));
    list.appendChild(row);
  });
  document.getElementById("cartTotal").textContent = formatSom(total);
  document.getElementById("orderBtn").disabled = false;
}

function submitOrder() {
  const keys = Object.keys(cart);
  if (keys.length === 0) return;
  const items = keys.map(key => {
    const line = resolveCartLine(key);
    return { name: line.name, price: line.price, qty: cart[key] };
  }).filter(Boolean);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const location = document.getElementById("locationSelect").value;
  DB.addOrder({ table: TABLE_NUMBER, location, items, total });
  cart = {};
  renderCart();
  showToast("Buyurtma qabul qilindi! ✅ Tez orada tayyor bo'ladi");
}

document.getElementById("orderBtn").addEventListener("click", submitOrder);

/* ---------------- ADMIN AUTH ---------------- */

const SESSION_KEY = "si_admin_logged_in";
function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === "yes"; }

document.getElementById("loginBtn").addEventListener("click", () => {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value;
  const creds = DB.getAdminCreds();
  const errorEl = document.getElementById("loginError");
  if (user === creds.username && pass === creds.password) {
    sessionStorage.setItem(SESSION_KEY, "yes");
    errorEl.textContent = "";
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";
    showScreen("admin-dashboard");
  } else {
    errorEl.textContent = "Nik name yoki parol noto'g'ri";
  }
});
document.getElementById("loginPass").addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("loginBtn").click(); });
document.getElementById("logoutBtn").addEventListener("click", () => { sessionStorage.removeItem(SESSION_KEY); showScreen("landing"); });

/* ---------------- ADMIN TABS ---------------- */

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    ["orders", "menu", "settings"].forEach(t => { document.getElementById("tab-" + t).style.display = t === btn.dataset.tab ? "block" : "none"; });
    if (btn.dataset.tab === "menu") renderMenuAdmin();
  });
});

/* ---------------- ADMIN ORDERS ---------------- */

function renderOrders() {
  const orders = DB.getOrders();
  const list = document.getElementById("ordersList");
  if (orders.length === 0) { list.innerHTML = '<div class="empty-state">Hozircha buyurtmalar yo\'q</div>'; return; }
  list.innerHTML = "";
  orders.forEach(order => {
    const time = new Date(order.createdAt).toLocaleString("uz-UZ", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
    const itemsHtml = order.items.map(i => `<div><span>${i.name} x${i.qty}</span><span>${formatSom(i.price * i.qty)}</span></div>`).join("");
    const card = document.createElement("div");
    card.className = "order-card" + (order.status === "yangi" ? " is-new" : "");
    card.innerHTML = `
      <div class="order-top">
        <div><div class="order-table">Stol #${order.table} ${order.location ? "· " + order.location : ""}</div><div class="order-time">${time}</div></div>
        <span class="badge badge-${order.status}">${statusLabel(order.status)}</span>
      </div>
      <div class="order-items">${itemsHtml}</div>
      <div class="order-bottom">
        <div class="order-total">Jami: ${formatSom(order.total)}</div>
        <select class="status-select" data-id="${order.id}">
          ${ORDER_STATUSES.map(s => `<option value="${s.key}" ${s.key === order.status ? "selected" : ""}>${s.label}</option>`).join("")}
        </select>
      </div>`;
    card.querySelector(".status-select").addEventListener("change", e => { DB.updateOrderStatus(order.id, e.target.value); renderOrders(); });
    list.appendChild(card);
  });
}

let refreshTimer = null;
function startAutoRefresh() { stopAutoRefresh(); refreshTimer = setInterval(() => { if (document.getElementById("tab-orders").style.display !== "none") renderOrders(); }, 3000); }
function stopAutoRefresh() { if (refreshTimer) clearInterval(refreshTimer); refreshTimer = null; }

/* ---------------- ADMIN MENU MANAGEMENT ---------------- */

const CATEGORY_LABEL = { muzqaymoq: "🍦 Muzqaymoq", yeguliklar: "🍪 Yeguliklar", ichimliklar: "🥤 Ichimliklar" };

function renderMenuAdmin() {
  const menu = DB.getMenu();
  const grid = document.getElementById("menuAdminGrid");
  grid.innerHTML = "";
  if (menu.length === 0) { grid.innerHTML = '<div class="empty-state">Menyu bo\'sh, pastdan taom qo\'shing</div>'; return; }
  menu.forEach(item => {
    const priceHtml = item.type === "sized"
      ? item.sizes.map(s => `${s.label}: ${formatSom(s.price)}`).join(" · ")
      : formatSom(item.price);
    const card = document.createElement("div");
    card.className = "menu-admin-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=60'">
      <div class="menu-admin-body">
        <div class="inactive-tag">${CATEGORY_LABEL[item.category || "muzqaymoq"]}</div>
        <h4>${item.name}</h4>
        <div class="card-price" style="font-size:13px;">${priceHtml}</div>
        ${item.active === false ? '<div class="inactive-tag">Faol emas — menyuda ko\'rinmaydi</div>' : ""}
        <div class="menu-admin-actions">
          <button class="btn btn-sm btn-outline" data-act="edit">Tahrirlash</button>
          <button class="btn btn-sm btn-outline" data-act="toggle">${item.active === false ? "Yoqish" : "Yashirish"}</button>
          <button class="btn btn-sm btn-danger" data-act="delete">O'chirish</button>
        </div>
      </div>`;
    card.querySelector('[data-act="edit"]').addEventListener("click", () => editItem(item));
    card.querySelector('[data-act="toggle"]').addEventListener("click", () => { DB.updateMenuItem(item.id, { active: item.active === false ? true : false }); renderMenuAdmin(); });
    card.querySelector('[data-act="delete"]').addEventListener("click", () => { if (confirm(`"${item.name}" ni menyudan butunlay o'chirmoqchimisiz?`)) { DB.deleteMenuItem(item.id); renderMenuAdmin(); } });
    grid.appendChild(card);
  });
}

function editItem(item) {
  const name = prompt("Taom nomi:", item.name);
  if (name === null) return;
  const image = prompt("Rasm URL:", item.image);
  if (image === null) return;
  const category = prompt("Kategoriya (muzqaymoq / yeguliklar / ichimliklar):", item.category || "muzqaymoq");
  if (category === null) return;

  const changes = {
    name: name.trim() || item.name,
    image: image.trim() || item.image,
    category: ["muzqaymoq", "yeguliklar", "ichimliklar"].includes(category.trim()) ? category.trim() : (item.category || "muzqaymoq")
  };

  if (item.type === "sized") {
    const p1 = prompt("1L narxi:", item.sizes[0].price);
    if (p1 === null) return;
    const p2 = prompt("1,5L narxi:", item.sizes[1].price);
    if (p2 === null) return;
    const p3 = prompt("2L narxi:", item.sizes[2].price);
    if (p3 === null) return;
    changes.sizes = [
      { label: "1L", price: parseInt(p1, 10) || item.sizes[0].price },
      { label: "1,5L", price: parseInt(p2, 10) || item.sizes[1].price },
      { label: "2L", price: parseInt(p3, 10) || item.sizes[2].price }
    ];
  } else {
    const priceStr = prompt("Narxi (so'm):", item.price);
    if (priceStr === null) return;
    const price = parseInt(priceStr, 10);
    changes.price = isNaN(price) ? item.price : price;
  }

  DB.updateMenuItem(item.id, changes);
  renderMenuAdmin();
}

document.getElementById("newType").addEventListener("change", () => {
  const sized = document.getElementById("newType").value === "sized";
  document.getElementById("simplePriceField").style.display = sized ? "none" : "block";
  document.getElementById("size1Field").style.display = sized ? "block" : "none";
  document.getElementById("size2Field").style.display = sized ? "block" : "none";
  document.getElementById("size3Field").style.display = sized ? "block" : "none";
});

document.getElementById("addItemBtn").addEventListener("click", () => {
  const name = document.getElementById("newName").value.trim();
  const category = document.getElementById("newCategory").value;
  const type = document.getElementById("newType").value;
  const image = document.getElementById("newImage").value.trim() || "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=60";

  if (!name) { showToast("Taom nomini kiriting"); return; }

  if (type === "sized") {
    const p1 = parseInt(document.getElementById("newPrice1").value, 10);
    const p2 = parseInt(document.getElementById("newPrice2").value, 10);
    const p3 = parseInt(document.getElementById("newPrice3").value, 10);
    if ([p1, p2, p3].some(p => isNaN(p) || p <= 0)) { showToast("1L, 1,5L, 2L narxlarini to'g'ri kiriting"); return; }
    DB.addMenuItem({ name, image, category, type: "sized", sizes: [{ label: "1L", price: p1 }, { label: "1,5L", price: p2 }, { label: "2L", price: p3 }] });
  } else {
    const price = parseInt(document.getElementById("newPrice").value, 10);
    if (isNaN(price) || price <= 0) { showToast("To'g'ri narx kiriting"); return; }
    DB.addMenuItem({ name, image, category, type: "simple", price });
  }

  document.getElementById("newName").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newPrice1").value = "";
  document.getElementById("newPrice2").value = "";
  document.getElementById("newPrice3").value = "";
  document.getElementById("newImage").value = "";
  renderMenuAdmin();
  showToast("Taom qo'shildi ✅");
});

/* ---------------- ADMIN SETTINGS ---------------- */

document.getElementById("saveCredsBtn").addEventListener("click", () => {
  const user = document.getElementById("newUser").value.trim();
  const pass = document.getElementById("newPass").value;
  if (!user || !pass) { showToast("Nik name va parolni to'liq kiriting"); return; }
  DB.saveAdminCreds({ username: user, password: pass });
  document.getElementById("newUser").value = "";
  document.getElementById("newPass").value = "";
  showToast("Nik name/parol yangilandi ✅");
});

function goToAdmin() {
  showScreen(isLoggedIn() ? "admin-dashboard" : "admin-login");
}

/* ---------------- INIT ---------------- */

renderMenu();
renderCart();
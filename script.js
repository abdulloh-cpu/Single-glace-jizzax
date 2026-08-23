/* ============ DATA ============ */
let products = [  
  {id:'p1',cat:'ice',name:'Qaymoqli klassik',price:15000,icon:'QK',art:'art-ice',hidden:false},
  {id:'p2',cat:'ice',name:'Shokoladli premium',price:18000,icon:'SP',art:'art-ice',hidden:false},
  {id:'p3',cat:'ice',name:'Mevabop (Mix)',price:20000,icon:'MB',art:'art-ice',hidden:false},
  {id:'p4',cat:'ice',name:'Klassik Mix',price:25000,icon:'KM',art:'art-ice',hidden:false},
  {id:'p5',cat:'ice',name:'Shokolad Double',price:25000,icon:'SD',art:'art-ice',hidden:false},
  {id:'p6',cat:'ice',name:'Meva & Qaymoq',price:25000,icon:'MQ',art:'art-ice',hidden:false},

  {id:'p7',cat:'food',name:'Hot-dog bulichka',price:17000,icon:'HD',art:'art-food',hidden:false},
  {id:'p8',cat:'food',name:"Hot-dog bulichka (katta)",price:20000,icon:'HD',art:'art-food',hidden:false},
  {id:'p9',cat:'food',name:'Hot-dog non',price:15000,icon:'HN',art:'art-food',hidden:false},
  {id:'p10',cat:'food',name:'Hot-dog non (2)',price:17000,icon:'HN',art:'art-food',hidden:false},
  {id:'p11',cat:'food',name:'Hot-dog non (3)',price:22000,icon:'HN',art:'art-food',hidden:false},
  {id:'p12',cat:'food',name:'Hot-dog non (4)',price:28000,icon:'HN',art:'art-food',hidden:false},
  {id:'p13',cat:'food',name:'Mini lavash',price:30000,icon:'ML',art:'art-food',hidden:false},
  {id:'p14',cat:'food',name:'Lavash',price:35000,icon:'LV',art:'art-food',hidden:false},
  {id:'p15',cat:'food',name:'Big Lavash',price:40000,icon:'BL',art:'art-food',hidden:false},
  {id:'p16',cat:'food',name:'Non Burger',price:35000,icon:'NB',art:'art-food',hidden:false},
  {id:'p17',cat:'food',name:'Big Non Burger',price:45000,icon:'BB',art:'art-food',hidden:false},
  {id:'p18',cat:'food',name:'Haggi',price:30000,icon:'HG',art:'art-food',hidden:false},
  {id:'p19',cat:'food',name:'Haggi (katta)',price:35000,icon:'HG',art:'art-food',hidden:false},

  {id:'p20',cat:'drink',name:'Coca-Cola',icon:'CC',art:'art-drink',hidden:false,sizes:[{l:'1L',p:8000},{l:'1,5L',p:10000},{l:'2L',p:12000}]},
  {id:'p21',cat:'drink',name:'Fanta',icon:'FN',art:'art-drink',hidden:false,sizes:[{l:'1L',p:8000},{l:'1,5L',p:10000},{l:'2L',p:12000}]},
  {id:'p22',cat:'drink',name:'Sprite',icon:'SR',art:'art-drink',hidden:false,sizes:[{l:'1L',p:8000},{l:'1,5L',p:10000},{l:'2L',p:12000}]},
  {id:'p23',cat:'drink',name:'Pepsi',icon:'PP',art:'art-drink',hidden:false,sizes:[{l:'1L',p:8000},{l:'1,5L',p:10000},{l:'2L',p:12000}]},
  {id:'p24',cat:'drink',name:'Coca-Cola (banka)',price:6000,icon:'CC',art:'art-drink',hidden:false},
  {id:'p25',cat:'drink',name:'Pepsi (banka)',price:6000,icon:'PP',art:'art-drink',hidden:false},
  {id:'p26',cat:'drink',name:'Hydrolik suv',icon:'HS',art:'art-drink',hidden:false,sizes:[{l:'1L',p:5000},{l:'1,5L',p:6000},{l:'2L',p:7000}]},
  {id:'p27',cat:'drink',name:'Lipton (muzli choy)',icon:'LP',art:'art-drink',hidden:false,sizes:[{l:'1L',p:9000},{l:'1,5L',p:11000},{l:'2L',p:13000}]},
  {id:'p28',cat:'drink',name:'Ays Tea',icon:'AT',art:'art-drink',hidden:false,sizes:[{l:'1L',p:9000},{l:'1,5L',p:11000},{l:'2L',p:13000}]},
  {id:'p29',cat:'drink',name:'Fuse Tea',icon:'FT',art:'art-drink',hidden:false,sizes:[{l:'1L',p:9000},{l:'1,5L',p:11000},{l:'2L',p:13000}]},
  {id:'p30',cat:'drink',name:'Tropic sharbat',price:12000,icon:'TS',art:'art-drink',hidden:false},
  {id:'p31',cat:'drink',name:'Dena sharbat (aralash mevali)',price:10000,icon:'DN',art:'art-drink',hidden:false},
  {id:'p32',cat:'drink',name:'Dinay sharbat (aralash mevali)',price:10000,icon:'DY',art:'art-drink',hidden:false},
  {id:'p33',cat:'drink',name:'Adrenaline Energy (banka)',price:15000,icon:'AE',art:'art-drink',hidden:false},
  {id:'p34',cat:'drink',name:'Flash Energy (banka)',price:15000,icon:'FE',art:'art-drink',hidden:false},
  {id:'p35',cat:'drink',name:'Mojito (banka)',price:12000,icon:'MJ',art:'art-drink',hidden:false},
  {id:'p36',cat:'drink',name:'Coca-Cola tara (shisha)',price:12000,icon:'CC',art:'art-drink',hidden:false},
  {id:'p37',cat:'drink',name:'Fanta tara (shisha)',price:12000,icon:'FN',art:'art-drink',hidden:false},
  {id:'p38',cat:'drink',name:'Sprite tara (shisha)',price:12000,icon:'SR',art:'art-drink',hidden:false},
];
const catLabel = {ice:'Muzqaymoq', food:'Yeguliklar', drink:'Ichimliklar'};
const locations = [
  {v:'old-out', l:'Old taraf (Tashqari)'},
  {v:'old-in', l:'Old taraf (Ichkari)'},
  {v:'orqa', l:'Orqa taraf'},
];
const iconChoices = ['QK','SP','MB','KM','SD','MQ','HD','ML','LV','BL','NB','HG','CC','FN','SR','PP','HS','LP','AT','FT','TS','AE','MJ','NW'];

let adminCreds = {user:'single glace', pass:'muzqaymoq2026'};

let state = {
  view:'home', category:'ice', location:'old-out',
  cart:[], orders:[], isAdmin:false, adminTab:'orders',
  modal:null, editId:null,
};
let orderSeq = 0;

/* ============ HELPERS ============ */
function fmt(n){return n.toLocaleString('ru-RU').replace(/,/g,' ')+" so'm";}
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}
function cartKey(pid,size){return pid+'::'+(size||'base');}
function addToCart(pid, size, price, label){
  const key = cartKey(pid,size);
  const existing = state.cart.find(c=>c.key===key);
  if(existing){ existing.qty++; }
  else {
    const p = products.find(x=>x.id===pid);
    state.cart.push({key, pid, name:p.name + (size?` (${size})`:''), price, qty:1});
  }
  showToast('Savatga qo\'shildi');
  render();
}
function changeQty(key, delta){
  const item = state.cart.find(c=>c.key===key);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0) state.cart = state.cart.filter(c=>c.key!==key);
  render();
}
function cartTotal(){return state.cart.reduce((s,c)=>s+c.price*c.qty,0);}

/* ============ RENDER: HEADER ============ */
function renderHeader(){
  document.getElementById('adminTagSlot').innerHTML = state.isAdmin ? '<span class="admin-tag">— Admin</span>' : '';
  const pills = document.getElementById('headerPills');
  let html = `<a class="pill" onclick="goHome()">Bosh sahifa</a>`;
  if(state.isAdmin){
    html += `<a class="pill dark" onclick="logoutAdmin()">Chiqish</a>`;
  } else {
    html += `<span class="pill">Stol: #01</span>`;
  }
  pills.innerHTML = html;
}
function goHome(){ state.view = state.isAdmin ? 'admin' : 'home'; render(); }
function logoutAdmin(){ state.isAdmin=false; state.view='home'; render(); }

/* ============ RENDER: HOME ============ */
function renderHome(){
  return `
  <div class="page">
    <div class="home-hero">
      <h1>SINGLE ICECREAM</h1>
      <p>Tezkor va mazali buyurtma berish xizmati</p>
      <div class="hero-actions">
        <button class="btn-primary" onclick="state.view='menu';render()">Menyuga o'tish</button>
        <button class="btn-secondary" onclick="state.view='admin-login';render()">Admin panel</button>
      </div>
    </div>
  </div>`;
}

/* ============ RENDER: MENU ============ */
function productCard(p){
  const artClass = p.art;
  if(p.sizes){
    const sel = state._sizeSel && state._sizeSel[p.id] || p.sizes[0].l;
    const selObj = p.sizes.find(s=>s.l===sel);
    return `
    <div class="product-card">
      <div class="product-name">${p.name}</div>
      <div class="product-price">Hajmni tanlang:</div>
      <div class="size-row">
        ${p.sizes.map(s=>`<div class="size-btn ${s.l===sel?'active':''}" onclick="selectSize('${p.id}','${s.l}')">${s.l}<br>${s.p.toLocaleString('ru-RU').replace(/,/g,' ')}</div>`).join('')}
      </div>
      <button class="add-btn" onclick="addToCart('${p.id}','${sel}',${selObj.p})">Qo'shish</button>
    </div>`;
  }
  return `
  <div class="product-card">
    <div class="product-name">${p.name}</div>
    <div class="product-price">${fmt(p.price)}</div>
    <button class="add-btn" onclick="addToCart('${p.id}',null,${p.price})">Qo'shish</button>
  </div>`;
}
function selectSize(pid,l){
  state._sizeSel = state._sizeSel || {};
  state._sizeSel[pid] = l;
  render();
}
function renderCartPanel(){
  const items = state.cart;
  let body = items.length===0
    ? `<div class="cart-empty">Savatingiz bo'sh</div>`
    : items.map(c=>`
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${c.name}</div>
          <div class="cart-item-meta">${fmt(c.price)} x ${c.qty}</div>
          <div class="qty-controls">
            <div class="qty-btn" onclick="changeQty('${c.key}',-1)">−</div>
            <div class="qty-num">${c.qty}</div>
            <div class="qty-btn" onclick="changeQty('${c.key}',1)">+</div>
          </div>
        </div>
        <div class="remove-x" onclick="changeQty('${c.key}',-999)">✕</div>
      </div>`).join('');
  return `
  <div class="cart-panel">
    <h3>Buyurtmangiz</h3>
    ${body}
    <div class="cart-total-row"><span>Jami:</span><span>${fmt(cartTotal())}</span></div>
    <button class="checkout-btn" ${items.length===0?'disabled':''} onclick="placeOrder()">Buyurtma berish</button>
  </div>`;
}
function renderMenu(){
  const list = products.filter(p=>p.cat===state.category && !p.hidden);
  return `
  <div class="page">
    <div class="center-title">
      <h1>Muzqaymoq buyurtma qiling</h1>
      <p>Tezkor va mazali buyurtma berish xizmati</p>
    </div>
    <div class="menu-topbar">
      <div class="location-select">Joylashuv:
        <select onchange="state.location=this.value">
          ${locations.map(l=>`<option value="${l.v}" ${l.v===state.location?'selected':''}>${l.l}</option>`).join('')}
        </select>
      </div>
      <div class="cat-tabs">
        ${Object.keys(catLabel).map(c=>`<div class="cat-tab ${c===state.category?'active':''}" onclick="state.category='${c}';render()">${catLabel[c]}</div>`).join('')}
      </div>
    </div>
    <div class="menu-layout">
      <div class="product-grid">${list.map(productCard).join('') || `<div class="empty-note">Bu bo'limda hozircha mahsulot yo'q</div>`}</div>
      ${renderCartPanel()}
    </div>
  </div>`;
}
function placeOrder(){
  if(state.cart.length===0) return;
  orderSeq++;
  const now = new Date();
  const dateStr = now.toISOString().slice(0,10)+' '+now.toTimeString().slice(0,8);
  state.orders.unshift({
    id:orderSeq, table:'01', location: locations.find(l=>l.v===state.location).l,
    items: state.cart.map(c=>({name:c.name, qty:c.qty, sum:c.price*c.qty})),
    total: cartTotal(), status:'Kutilmoqda', date:dateStr,
  });
  state.cart = [];
  showToast('Buyurtma qabul qilindi!');
  render();
}

/* ============ RENDER: ADMIN LOGIN ============ */
function renderAdminLogin(){
  return `
  <div class="page">
    <div class="login-card">
      <h2>Admin panel</h2>
      <p>SINGLE ICECREAM boshqaruvi</p>
      ${state._loginError?`<div class="login-error">${state._loginError}</div>`:''}
      <div class="field">
        <label>Nik name</label>
        <input id="loginUser" type="text" placeholder="Nik name kiriting">
      </div>
      <div class="field">
        <label>Parol</label>
        <input id="loginPass" type="password" placeholder="Parol kiriting">
        <div class="hint">Demo: ${adminCreds.user} / ${adminCreds.pass}</div>
      </div>
      <button class="btn-primary" style="width:100%" onclick="tryLogin()">Kirish</button>
      <a class="back-link" onclick="state.view='home';render()">← Bosh sahifaga qaytish</a>
    </div>
  </div>`;
}
function tryLogin(){
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();
  if(u===adminCreds.user && p===adminCreds.pass){
    state.isAdmin = true; state.view='admin'; state.adminTab='orders'; state._loginError=null;
  } else {
    state._loginError = "Nik name yoki parol noto'g'ri";
  }
  render();
}

/* ============ RENDER: ADMIN PANEL ============ */
function renderAdmin(){
  let body='';
  if(state.adminTab==='orders') body = renderOrdersTab();
  else if(state.adminTab==='menu') body = renderMenuTab();
  else body = renderSettingsTab();
  return `
  <div class="page">
    <div class="admin-tabs">
      <div class="admin-tab ${state.adminTab==='orders'?'active':''}" onclick="state.adminTab='orders';render()">Buyurtmalar</div>
      <div class="admin-tab ${state.adminTab==='menu'?'active':''}" onclick="state.adminTab='menu';render()">Menyu</div>
      <div class="admin-tab ${state.adminTab==='settings'?'active':''}" onclick="state.adminTab='settings';render()">Sozlamalar</div>
    </div>
    ${body}
  </div>`;
}
function renderOrdersTab(){
  const statuses = ['Kutilmoqda','Tayyorlanmoqda','Tayyor','Bekor qilindi'];
  const list = state.orders;
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
    <h2 class="admin-section-title">Buyurtmalar</h2>
    <div class="hint">Har 3 soniyada avtomatik yangilanadi</div>
  </div>
  ${list.length===0?`<div class="empty-note">Hozircha buyurtmalar yo'q</div>`:
  list.map(o=>`
    <div class="order-card">
      <div class="order-top">
        <div>
          <div class="order-title">Stol #${o.table} · ${o.location}</div>
          <div class="order-date">${o.date}</div>
        </div>
        <div class="status-badge status-${o.status==='Bekor qilindi'?'Bekor':o.status}">${o.status.toUpperCase()}</div>
      </div>
      <div class="order-items">
        ${o.items.map(it=>`<div><span>${it.name} x${it.qty}</span><span>${fmt(it.sum)}</span></div>`).join('')}
      </div>
      <div class="order-bottom">
        <div class="order-total">Jami: ${fmt(o.total)}</div>
        <select class="status-select" onchange="setOrderStatus(${o.id}, this.value)">
          ${statuses.map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>`).join('')}
  `;
}
function setOrderStatus(id, status){
  const o = state.orders.find(x=>x.id===id);
  if(o) o.status = status;
  render();
}
function renderMenuTab(){
  return `
  <h2 class="admin-section-title">Menyu boshqaruvi</h2>
  <button class="add-product-btn" onclick="openProductModal(null)">+ Yangi mahsulot</button>
  <div class="menu-admin-grid">
    ${products.map(p=>`
    <div class="menu-admin-card ${p.hidden?'hidden-item':''}">
      <div class="cat-label">${catLabel[p.cat]}</div>
      <div class="ma-name">${p.name}</div>
      <div class="ma-price">${p.sizes ? p.sizes.map(s=>`${s.l}: ${fmt(s.p)}`).join(' / ') : fmt(p.price)}</div>
      <div class="ma-actions">
        <div class="ma-btn ma-edit" onclick="openProductModal('${p.id}')">Tahrirlash</div>
        <div class="ma-btn ma-hide" onclick="toggleHide('${p.id}')">${p.hidden?"Ko'rsatish":'Yashirish'}</div>
        <div class="ma-btn ma-del" onclick="deleteProduct('${p.id}')">O'chirish</div>
      </div>
    </div>`).join('')}
  </div>
  ${state.modal==='product' ? productModal() : ''}
  `;
}
function toggleHide(id){
  const p = products.find(x=>x.id===id);
  p.hidden = !p.hidden;
  render();
}
function deleteProduct(id){
  if(!confirm("Bu mahsulotni o'chirmoqchimisiz?")) return;
  products = products.filter(x=>x.id!==id);
  render();
}
function openProductModal(id){
  state.modal='product';
  state.editId=id;
  state._iconSel = id ? products.find(p=>p.id===id).icon : 'NW';
  render();
}
function closeModal(){ state.modal=null; state.editId=null; render(); }
function productModal(){
  const editing = state.editId ? products.find(p=>p.id===state.editId) : null;
  return `
  <div class="overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <h3>${editing?'Mahsulotni tahrirlash':"Yangi mahsulot qo'shish"}</h3>
      <div class="field">
        <label>Nomi</label>
        <input id="pmName" type="text" value="${editing?editing.name:''}" placeholder="Masalan: Qaymoqli klassik">
      </div>
      <div class="field">
        <label>Kategoriya</label>
        <select id="pmCat">
          ${Object.keys(catLabel).map(c=>`<option value="${c}" ${editing&&editing.cat===c?'selected':''}>${catLabel[c]}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Narxi (so'm)</label>
        <input id="pmPrice" type="number" value="${editing&&!editing.sizes?editing.price:''}" placeholder="15000">
      </div>
      <div class="field">
        <label>Belgi (icon)</label>
        <div class="icon-choice-row">
          ${iconChoices.map(ic=>`<div class="icon-choice ${state._iconSel===ic?'active':''}" onclick="state._iconSel='${ic}';render()">${ic}</div>`).join('')}
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-cancel" onclick="closeModal()">Bekor qilish</button>
        <button class="modal-save" onclick="saveProduct()">Saqlash</button>
      </div>
    </div>
  </div>`;
}
function saveProduct(){
  const name = document.getElementById('pmName').value.trim();
  const cat = document.getElementById('pmCat').value;
  const price = parseInt(document.getElementById('pmPrice').value)||0;
  if(!name || !price){ showToast("Nomi va narxini to'ldiring"); return; }
  const artMap = {ice:'art-ice',food:'art-food',drink:'art-drink'};
  if(state.editId){
    const p = products.find(x=>x.id===state.editId);
    p.name=name; p.cat=cat; p.price=price; p.icon=state._iconSel; p.art=artMap[cat];
    delete p.sizes;
  } else {
    products.push({id:'p'+Date.now(), cat, name, price, icon:state._iconSel, art:artMap[cat], hidden:false});
  }
  showToast('Saqlandi');
  closeModal();
}
function renderSettingsTab(){
  return `
  <h2 class="admin-section-title">Nik name / parolni o'zgartirish</h2>
  <div class="settings-card">
    <div class="settings-grid">
      <div class="field">
        <label>Yangi nik name</label>
        <input id="newUser" type="text" placeholder="${adminCreds.user}">
      </div>
      <div class="field">
        <label>Yangi parol</label>
        <input id="newPass" type="password" placeholder="••••••••">
      </div>
    </div>
    <button class="save-btn" onclick="saveSettings()">Saqlash</button>
  </div>`;
}
function saveSettings(){
  const u = document.getElementById('newUser').value.trim();
  const p = document.getElementById('newPass').value.trim();
  if(u) adminCreds.user = u;
  if(p) adminCreds.pass = p;
  showToast('Sozlamalar saqlandi');
  render();
}

/* ============ MASTER RENDER ============ */
function render(){
  renderHeader();
  const app = document.getElementById('app');
  if(state.view==='home') app.innerHTML = renderHome();
  else if(state.view==='menu') app.innerHTML = renderMenu();
  else if(state.view==='admin-login') app.innerHTML = renderAdminLogin();
  else if(state.view==='admin') app.innerHTML = renderAdmin();
}
render();

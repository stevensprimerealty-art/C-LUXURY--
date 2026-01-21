// ============================
// C-LUXURY — Standalone JS (ROOT /index.js)
// Works with images in: /assets/product-1.jpg ... product-16.jpg
// ============================

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ============================
   HERO — Crossfade (JS controlled)
============================ */
function initHero() {
  const hero = $("[data-clux-hero]");
  if (!hero) return;

  const slides = $$("[data-clux-slide]", hero);
  if (slides.length < 2) return;

  const ms = Number(hero.getAttribute("data-interval-ms") || 3000);
  let i = 0;

  slides.forEach((s, idx) => {
    s.style.opacity = idx === 0 ? "1" : "0";
    s.style.transition = "opacity 900ms ease";
    s.classList.toggle("is-active", idx === 0);
  });

  setInterval(() => {
    const prev = i;
    i = (i + 1) % slides.length;

    slides[prev].classList.remove("is-active");
    slides[prev].style.opacity = "0";

    slides[i].classList.add("is-active");
    slides[i].style.opacity = "1";
  }, ms);
}

/* ============================
   MINI MENU
============================ */
function initMenu() {
  const menu = $("#cluxMenu");
  const openBtn = $("#menuBtn");
  const closeBtn = $("#menuClose");
  if (!menu || !openBtn || !closeBtn) return;

  const open = () => {
    menu.style.display = "block";
    menu.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    menu.style.display = "none";
    menu.setAttribute("aria-hidden", "true");
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  $$("a", menu).forEach(a => a.addEventListener("click", close));

  document.addEventListener("click", (e) => {
    const isOpen = menu.getAttribute("aria-hidden") === "false";
    if (!isOpen) return;
    if (menu.contains(e.target) || openBtn.contains(e.target)) return;
    close();
  });
}

/* ============================
   SEARCH ICON → scroll to products
============================ */
function initSearch() {
  const btn = $("#searchBtn");
  const target = $("#products");
  if (!btn || !target) return;

  btn.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ============================
   PRODUCTS (16) — images in /assets/
   You can edit titles/prices/urls anytime
============================ */
const PRODUCTS = [
  { title:"C-Lux Baseball Jersey - Vintage Brown Star Sleeve Shirt", priceUSD:48.31, url:"https://mrcharliestxs.myshopify.com/products/baseball-jersey-vintage-brown-star-sleeve-team-shirt", img:"./assets/product-1.jpg" },
  { title:"C-Lux Basketball Shorts Brown star shorts", priceUSD:40.26, url:"https://mrcharliestxs.myshopify.com/products/basketball-shorts-brown-starburst-all-over-print-athletic-shorts", img:"./assets/product-2.jpg" },
  { title:"C-Luxury Grey Hawaiian Eye pattern shirt", priceUSD:105.10, url:"https://mrcharliestxs.myshopify.com/products/mens-gray-camp-shirt-subtle-c-luxury-logo-hawaiian-button-up", img:"./assets/product-3.jpg" },
  { title:"C-Lux Grey Eye pattern Shorts", priceUSD:44.86, url:"https://mrcharliestxs.myshopify.com/products/grey-athletic-shorts-with-subtle-eye-pattern-casual-sportswear", img:"./assets/product-4.jpg" },
  { title:"C-Lux Pink Women's Baseball Jersey 'Cute' Sparkle Pattern", priceUSD:37.96, url:"https://mrcharliestxs.myshopify.com/collections/all", img:"./assets/product-5.jpg" },
  { title:"C-Lux Pink Sparkle Basketball Shorts", priceUSD:40.26, url:"https://mrcharliestxs.myshopify.com/products/pink-sparkle-basketball-shorts-womens-athletic-aop", img:"./assets/product-6.jpg" },
  { title:"C-Lux Women's blue Baseball eye pattern shirt", priceUSD:37.96, url:"https://mrcharliestxs.myshopify.com/collections/all", img:"./assets/product-7.jpg" },
  { title:"C-lux Blue eye pattern Women's Shorts", priceUSD:27.54, url:"https://mrcharliestxs.myshopify.com/products/blue-starlet-womens-shorts-all-over-print-cozy-lounge-workout-bottoms", img:"./assets/product-8.jpg" },
  { title:"C-LUXURY AURA BASEBALL CAP", priceUSD:24.99, url:"https://mrcharliestxs.myshopify.com/products/c-luxury-low-profile-baseball-cap", img:"./assets/product-9.jpg" },
  { title:"CLUX Star sparkle pet hoodie & sweatshirt", priceUSD:29.90, url:"https://mrcharliestxs.myshopify.com/products/c-luxury-pet-hoodie-designer-dog-cat-sweatshirt-luxe-branded-pet-apparel", img:"./assets/product-10.jpg" },
  { title:"CLUX Crop Tank Top Chill Graphic Spaghetti Strap", priceUSD:29.11, url:"https://mrcharliestxs.myshopify.com/products/chill-vibes-crop-tank-top-chill-graphic-spaghetti-strap", img:"./assets/product-11.jpg" },
  { title:"C-Luxury Women’s heather olive crop tee", priceUSD:22.46, url:"https://mrcharliestxs.myshopify.com/products/women-s-crop-tee-minimal-poly-cotton-casual-top", img:"./assets/product-12.jpg" },
  { title:"C-LUX WHITE TANK JERSEY", priceUSD:21.66, url:"https://mrcharliestxs.myshopify.com/products/unisex-jersey-muscle-tank", img:"./assets/product-13.jpg" },
  { title:"C-Lux white aura puffer jacket", priceUSD:87.41, url:"https://mrcharliestxs.myshopify.com/products/mens-white-puffer-jacket-subtle-grey-logo-tribal-motif-all-over-print", img:"./assets/product-14.jpg" },
  { title:"C-Lux Mini Clutch Bag", priceUSD:22.66, url:"https://mrcharliestxs.myshopify.com/products/mini-clutch-bag", img:"./assets/product-15.jpg" },
  { title:"C-LUXURY Women's White Tie-Side Bikini Swimsuit", priceUSD:28.76, url:"https://mrcharliestxs.myshopify.com/products/white-tie-side-bikini-swimsuit-with-minimal-geometric-accent", img:"./assets/product-16.jpg" }
];

// Currency toggle
let currency = "USD";
let usdToNgn = 1500;

function money(n) {
  if (currency === "USD") return `$${n.toFixed(2)}`;
  const ngn = n * usdToNgn;
  return `₦${Math.round(ngn).toLocaleString()}`;
}

function renderProducts() {
  const grid = $("#productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => `
    <div class="clux-product">
      <div class="clux-product__img">
        <a href="${p.url}" target="_blank" rel="noopener">
          <img src="${p.img}" alt="${p.title}">
        </a>
      </div>

      <a class="clux-quick-buy" href="${p.url}" target="_blank" rel="noopener">Quick Buy</a>

      <div class="clux-product-name">${p.title}</div>
      <div class="clux-product-price">${money(p.priceUSD)}</div>
    </div>
  `).join("");
}

function initCurrency() {
  const btn = $("#currencyToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    currency = (currency === "USD") ? "NGN" : "USD";
    renderProducts();
  });
}

/* ============================
   CHAT MODAL (Open/Close)
============================ */
function initChat() {
  const box = $("#chatBox");
  const open = $("#chatOpen");
  const close = $("#chatClose");
  if (!box || !open || !close) return;

  // Start hidden
  box.style.display = "none";
  box.setAttribute("aria-hidden", "true");

  open.addEventListener("click", () => {
    box.style.display = "flex";
    box.setAttribute("aria-hidden", "false");
  });

  close.addEventListener("click", () => {
    box.style.display = "none";
    box.setAttribute("aria-hidden", "true");
  });

  box.addEventListener("click", (e) => {
    if (e.target === box) {
      box.style.display = "none";
      box.setAttribute("aria-hidden", "true");
    }
  });
}

/* ============================
   INIT
============================ */
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initMenu();
  initSearch();
  renderProducts();
  initCurrency();
  initChat();
});

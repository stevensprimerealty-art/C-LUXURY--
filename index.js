// ============================
// C-LUXURY — Standalone JS (FIXED)
// Place in: /assets/index.js
// ============================

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ============================
   HERO — Crossfade (JS controlled)
   NOTE: Remove CSS cluxFade animation OR override with this approach.
   This version uses .is-active and inline opacity for stability.
============================ */
function initHero() {
  const hero = $("[data-clux-hero]");
  if (!hero) return;

  const slides = $$("[data-clux-slide]", hero);
  if (!slides.length) return;

  const ms = Number(hero.getAttribute("data-interval-ms") || 3000);
  let i = 0;

  // Force a clean start
  slides.forEach((s, idx) => {
    s.classList.toggle("is-active", idx === 0);
    s.style.opacity = idx === 0 ? "1" : "0";
    s.style.transition = "opacity 900ms ease";
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
   MINI MENU (Open/Close + Close on link click)
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

  // Close when clicking any menu link
  $$("a", menu).forEach(a => a.addEventListener("click", close));

  // Close if user taps outside menu (mobile friendly)
  document.addEventListener("click", (e) => {
    const isOpen = menu.getAttribute("aria-hidden") === "false";
    if (!isOpen) return;
    if (menu.contains(e.target) || openBtn.contains(e.target)) return;
    close();
  });
}

/* ============================
   SEARCH BUTTON (Scroll to products)
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
   PRODUCTS (16 items)
   NOTE: Without variant IDs we cannot true "Add to cart".
   So we link users to the product page (Shopify handles cart there).
============================ */
const PRODUCTS = [
  { title:"C-Lux Baseball Jersey - Vintage Brown Star Sleeve Shirt", priceUSD:48.31, url:"https://mrcharliestxs.myshopify.com/products/baseball-jersey-vintage-brown-star-sleeve-team-shirt" },
  { title:"C-Lux Basketball Shorts Brown star shorts", priceUSD:40.26, url:"https://mrcharliestxs.myshopify.com/products/basketball-shorts-brown-starburst-all-over-print-athletic-shorts" },
  { title:"C-Luxury Grey Hawaiian Eye pattern shirt", priceUSD:105.10, url:"https://mrcharliestxs.myshopify.com/products/mens-gray-camp-shirt-subtle-c-luxury-logo-hawaiian-button-up" },
  { title:"C-Lux Grey Eye pattern Shorts", priceUSD:44.86, url:"https://mrcharliestxs.myshopify.com/products/grey-athletic-shorts-with-subtle-eye-pattern-casual-sportswear" },
  { title:"C-Lux Pink Women's Baseball Jersey 'Cute' Sparkle Pattern", priceUSD:37.96, url:"https://mrcharliestxs.myshopify.com/collections/all" },
  { title:"C-Lux Pink Sparkle Basketball Shorts", priceUSD:40.26, url:"https://mrcharliestxs.myshopify.com/products/pink-sparkle-basketball-shorts-womens-athletic-aop" },
  { title:"C-Lux Women's blue Baseball eye pattern shirt", priceUSD:37.96, url:"https://mrcharliestxs.myshopify.com/collections/all" },
  { title:"C-lux Blue eye pattern Women's Shorts", priceUSD:27.54, url:"https://mrcharliestxs.myshopify.com/products/blue-starlet-womens-shorts-all-over-print-cozy-lounge-workout-bottoms" },
  { title:"C-LUXURY AURA BASEBALL CAP", priceUSD:24.99, url:"https://mrcharliestxs.myshopify.com/products/c-luxury-low-profile-baseball-cap" },
  { title:"CLUX Star sparkle pet hoodie & sweatshirt", priceUSD:29.90, url:"https://mrcharliestxs.myshopify.com/products/c-luxury-pet-hoodie-designer-dog-cat-sweatshirt-luxe-branded-pet-apparel" },
  { title:"CLUX Crop Tank Top Chill Graphic Spaghetti Strap", priceUSD:29.11, url:"https://mrcharliestxs.myshopify.com/products/chill-vibes-crop-tank-top-chill-graphic-spaghetti-strap" },
  { title:"C-Luxury Women’s heather olive crop tee", priceUSD:22.46, url:"https://mrcharliestxs.myshopify.com/products/women-s-crop-tee-minimal-poly-cotton-casual-top" },
  { title:"C-LUX WHITE TANK JERSEY", priceUSD:21.66, url:"https://mrcharliestxs.myshopify.com/products/unisex-jersey-muscle-tank" },
  { title:"C-Lux white aura puffer jacket", priceUSD:87.41, url:"https://mrcharliestxs.myshopify.com/products/mens-white-puffer-jacket-subtle-grey-logo-tribal-motif-all-over-print" },
  { title:"C-Lux Mini Clutch Bag", priceUSD:22.66, url:"https://mrcharliestxs.myshopify.com/products/mini-clutch-bag" },
  { title:"C-LUXURY Women's White Tie-Side Bikini Swimsuit", priceUSD:28.76, url:"https://mrcharliestxs.myshopify.com/products/white-tie-side-bikini-swimsuit-with-minimal-geometric-accent" }
];

// Currency conversion (manual placeholder)
let currency = "USD";
let usdToNgn = 1500; // set your real rate any time

function money(n) {
  if (currency === "USD") return `$${n.toFixed(2)}`;
  const ngn = n * usdToNgn;
  return `₦${Math.round(ngn).toLocaleString()}`;
}

function renderProducts() {
  const grid = $("#productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => `
    <div class="clux-card">
      <!-- Quick Buy above name/price -->
      <a class="clux-quickbuy" href="${p.url}" target="_blank" rel="noopener">Quick Buy</a>

      <a href="${p.url}" target="_blank" rel="noopener" style="text-decoration:none;">
        <p class="clux-title">${p.title}</p>
      </a>

      <p class="clux-price">${money(p.priceUSD)}</p>

      <a class="clux-glass-btn" href="${p.url}" target="_blank" rel="noopener">Add to cart 🛒</a>
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
   Chat logo image is in HTML (jpg) inside modal
============================ */
function initChat() {
  const box = $("#chatBox");
  const open = $("#chatOpen");
  const close = $("#chatClose");
  if (!box || !open || !close) return;

  open.addEventListener("click", () => {
    box.style.display = "flex";
    box.setAttribute("aria-hidden", "false");
  });

  close.addEventListener("click", () => {
    box.style.display = "none";
    box.setAttribute("aria-hidden", "true");
  });

  // Close if click outside panel
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

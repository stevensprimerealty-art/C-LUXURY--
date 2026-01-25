// ============================
// C-LUXURY — Standalone JS ✅ (Matches your HTML IDs)
// - Hero crossfade + copy + dots
// - Menu fade in/out (adds/removes .is-open)
// - Search scroll
// - Products render
// - Currency toggle (id="currencyBtn")
// - Chat modal fade in/out (id="chatBox")
// - Chat quick buttons -> simple auto replies
// ============================

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ============================
   HERO — Crossfade + Copy + Dots Sync
============================ */
function initHero() {
  const hero = document.querySelector("[data-clux-hero]");
  if (!hero) return;

  const slides = $$("[data-clux-slide]", hero);
  const copies = $$("[data-clux-copy]", hero);
  if (slides.length < 2) return;

  const ms = Number(hero.getAttribute("data-interval-ms")) || 3200;

  const dotsWrap =
    hero.querySelector("[data-clux-dots]") || hero.querySelector(".clux-hero__dots");
  const dots = dotsWrap ? $$("[data-dot]", dotsWrap) : [];

  let i = 0;
  let timer = null;

  const setActive = (index) => {
    i = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    copies.forEach((c, idx) => c.classList.toggle("is-active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  };

  const start = () => {
    stop();
    timer = window.setInterval(() => setActive(i + 1), ms);
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  setActive(0);
  start();

  if (dotsWrap && dots.length) {
    dotsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-dot]");
      if (!btn) return;
      const n = Number(btn.getAttribute("data-dot"));
      if (Number.isNaN(n)) return;
      setActive(n);
      start();
    });
  }

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("touchstart", stop, { passive: true });
  hero.addEventListener("touchend", start, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
}

/* ============================
   MENU — Fade in/out (.is-open)
============================ */
function initMenu() {
  const menu = $("#cluxMenu");
  const openBtn = $("#menuBtn");
  const closeBtn = $("#menuClose");
  const overlay = $("#cluxOverlay");
  if (!menu || !openBtn || !closeBtn) return;

  const open = () => {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    if (overlay) {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
    }
  };

  const close = () => {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    if (overlay) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    }
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  if (overlay) overlay.addEventListener("click", close);

  // close menu after clicking any link
  $$("a", menu).forEach((a) => a.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  close();
}

/* ============================
   SEARCH ICON → scroll to products (home only)
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
   PRODUCTS
============================ */
const PRODUCTS = [
  { title:"C-Lux Baseball Jersey - Vintage Brown Star Sleeve Shirt", priceUSD:48.31, url:"https://mrcharliestxs.myshopify.com/products/baseball-jersey-vintage-brown-star-sleeve-team-shirt", img:"assets/product-1.jpg" },
  { title:"C-Lux Basketball Shorts Brown star shorts", priceUSD:40.26, url:"https://mrcharliestxs.myshopify.com/products/basketball-shorts-brown-starburst-all-over-print-athletic-shorts", img:"assets/product-2.jpg" },
  { title:"C-Luxury Grey Hawaiian Eye pattern shirt", priceUSD:105.10, url:"https://mrcharliestxs.myshopify.com/products/mens-gray-camp-shirt-subtle-c-luxury-logo-hawaiian-button-up", img:"assets/product-3.jpg" },
  { title:"C-Lux Grey Eye pattern Shorts", priceUSD:44.86, url:"https://mrcharliestxs.myshopify.com/products/grey-athletic-shorts-with-subtle-eye-pattern-casual-sportswear", img:"assets/product-4.jpg" },
  { title:"C-Lux Pink Women's Baseball Jersey 'Cute' Sparkle Pattern", priceUSD:37.96, url:"https://mrcharliestxs.myshopify.com/collections/all", img:"assets/product-5.jpg" },
  { title:"C-Lux Pink Sparkle Basketball Shorts", priceUSD:40.26, url:"https://mrcharliestxs.myshopify.com/products/pink-sparkle-basketball-shorts-womens-athletic-aop", img:"assets/product-6.jpg" },
  { title:"C-Lux Women's blue Baseball eye pattern shirt", priceUSD:37.96, url:"https://mrcharliestxs.myshopify.com/collections/all", img:"assets/product-7.jpg" },
  { title:"C-lux Blue eye pattern Women's Shorts", priceUSD:27.54, url:"https://mrcharliestxs.myshopify.com/products/blue-starlet-womens-shorts-all-over-print-cozy-lounge-workout-bottoms", img:"assets/product-8.jpg" },
  { title:"C-LUXURY AURA BASEBALL CAP", priceUSD:24.99, url:"https://mrcharliestxs.myshopify.com/products/c-luxury-low-profile-baseball-cap", img:"assets/product-9.jpg" },
  { title:"CLUX Star sparkle pet hoodie & sweatshirt", priceUSD:29.90, url:"https://mrcharliestxs.myshopify.com/products/c-luxury-pet-hoodie-designer-dog-cat-sweatshirt-luxe-branded-pet-apparel", img:"assets/product-10.jpg" },
  { title:"CLUX Crop Tank Top Chill Graphic Spaghetti Strap", priceUSD:29.11, url:"https://mrcharliestxs.myshopify.com/products/chill-vibes-crop-tank-top-chill-graphic-spaghetti-strap", img:"assets/product-11.jpg" },
  { title:"C-Luxury Women’s heather olive crop tee", priceUSD:22.46, url:"https://mrcharliestxs.myshopify.com/products/women-s-crop-tee-minimal-poly-cotton-casual-top", img:"assets/product-12.jpg" },
  { title:"C-LUX WHITE TANK JERSEY", priceUSD:21.66, url:"https://mrcharliestxs.myshopify.com/products/unisex-jersey-muscle-tank", img:"assets/product-13.jpg" },
  { title:"C-Lux white aura puffer jacket", priceUSD:87.41, url:"https://mrcharliestxs.myshopify.com/products/mens-white-puffer-jacket-subtle-grey-logo-tribal-motif-all-over-print", img:"assets/product-14.jpg" },
  { title:"C-Lux Mini Clutch Bag", priceUSD:22.66, url:"https://mrcharliestxs.myshopify.com/products/mini-clutch-bag", img:"assets/product-15.jpg" },
  { title:"C-LUXURY Women's White Tie-Side Bikini Swimsuit", priceUSD:28.76, url:"https://mrcharliestxs.myshopify.com/products/white-tie-side-bikini-swimsuit-with-minimal-geometric-accent", img:"assets/product-16.jpg" }
];

let currency = "USD";
// NOTE: hard-coded rate is fine for display; Shopify checkout will show real totals
const usdToNgn = 1500;

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

      <!-- ✅ FIXED: Quick Buy goes to the product page (safe + correct) -->
      <a class="clux-quick-buy" href="${p.url}" target="_blank" rel="noopener">
        Shop Now
      </a>

      <div class="clux-product-name">${p.title}</div>
      <div class="clux-product-price">${money(p.priceUSD)}</div>
    </div>
  `).join("");
}

/* ============================
   Currency toggle (id="currencyBtn")
============================ */
function initCurrency() {
  const btn = $("#currencyBtn");
  if (!btn) return;

  const paint = () => {
    btn.innerHTML = `${currency} <span class="clux-caret">▾</span>`;
  };

  paint();

  btn.addEventListener("click", () => {
    currency = currency === "USD" ? "NGN" : "USD";
    paint();
    renderProducts();
  });
}

/* ============================
   CHAT MODAL
============================ */
function initChat() {
  const box = $("#chatBox");
  const openBtn = $("#chatOpen");
  const closeBtn = $("#chatClose");
  const responses = $("#chatResponses");
  if (!box || !openBtn || !closeBtn) return;

  const chips = $$(".clux-chip", box);

  const open = () => {
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
  };

  close();

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  box.addEventListener("click", (e) => {
    if (e.target === box) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  const reply = (topic) => {
    if (!responses) return;

    const map = {
      shipping: "Shipping: Orders are processed within 24–72 hours. Delivery time depends on your location. If you need help, email complaints@c-luxury.com.",
      sizing: "Sizing: Please check the product page size guide. If you tell me your height/weight, I can recommend a size.",
      order: "Order Issue: Please email complaints@c-luxury.com with your order number and what happened."
    };

    const text = map[topic] || "How can I help you today?";
    const div = document.createElement("div");
    div.style.marginTop = "10px";
    div.style.padding = "12px 14px";
    div.style.border = "1px solid rgba(255,255,255,.10)";
    div.style.borderRadius = "14px";
    div.style.background = "rgba(255,255,255,.06)";
    div.textContent = text;
    responses.appendChild(div);
  };

  chips.forEach((b) => {
    b.addEventListener("click", () => {
      const t = b.getAttribute("data-chat");
      reply(t);
    });
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

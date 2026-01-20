// ============================
// C-LUXURY Standalone JS
// ============================

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// HERO crossfade
function initHero(){
  $$("[data-clux-hero]").forEach(hero => {
    const slides = $$("[data-clux-slide]", hero);
    if (!slides.length) return;
    let i = 0;
    const ms = Number(hero.getAttribute("data-interval-ms") || 3000);
    setInterval(() => {
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, ms);
  });
}

// Banner bubble movement
function initBubble(){
  function rand(a,b){ return Math.random()*(b-a)+a; }
  $$("[data-clux-bubble]").forEach(el => {
    const ax = rand(-2.2, 2.2);
    const ay = rand(-1.6, 1.6);
    const sc = rand(1.02, 1.05);
    const dur = rand(9000, 14000);
    el.animate(
      [
        { transform: "translate3d(0,0,0) scale(1)" },
        { transform: `translate3d(${ax}%, ${ay}%, 0) scale(${sc})` },
        { transform: "translate3d(0,0,0) scale(1)" }
      ],
      { duration: dur, iterations: Infinity, easing: "ease-in-out" }
    );
  });
}

// Mini menu
function initMenu(){
  const menu = $("#cluxMenu");
  $("#menuBtn")?.addEventListener("click", () => {
    menu.style.display = "block";
    menu.setAttribute("aria-hidden","false");
  });
  $("#menuClose")?.addEventListener("click", () => {
    menu.style.display = "none";
    menu.setAttribute("aria-hidden","true");
  });
}

// Products (your 16 items)
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

// Currency conversion (manual rate placeholder)
let currency = "USD";
let usdToNgn = 1500; // change later or plug your app output

function money(n){
  if (currency === "USD") return `$${n.toFixed(2)}`;
  const ngn = n * usdToNgn;
  return `₦${Math.round(ngn).toLocaleString()}`;
}

function renderProducts(){
  const grid = $("#productGrid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="clux-card">
      <a class="clux-glass-btn clux-quickbuy" href="https://mrcharliestxs.myshopify.com/checkouts/cn/hWN7ZmclI4XgWZtheB2Vhic7/en-ng?_r=AQAB_VMnC7Pn-jjO1EH8dVHg07wzu4vnRTTaIAf2SGD1zYo&preview_theme_id=140961939507">
        Quick Buy
      </a>
      <a href="${p.url}" style="text-decoration:none;">
        <p class="clux-title">${p.title}</p>
      </a>
      <p class="clux-price">${money(p.priceUSD)}</p>
      <a class="clux-glass-btn" href="${p.url}">Add to cart 🛒</a>
    </div>
  `).join("");
}

function initCurrency(){
  $("#currencyToggle")?.addEventListener("click", () => {
    currency = (currency === "USD") ? "NGN" : "USD";
    renderProducts();
  });
}

// Chat modal
function initChat(){
  const box = $("#chatBox");
  $("#chatOpen")?.addEventListener("click", () => {
    box.style.display = "flex";
    box.setAttribute("aria-hidden","false");
  });
  $("#chatClose")?.addEventListener("click", () => {
    box.style.display = "none";
    box.setAttribute("aria-hidden","true");
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initBubble();
  initMenu();
  renderProducts();
  initCurrency();
  initChat();
});

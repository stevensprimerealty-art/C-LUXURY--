/* ==========================================================
   C-LUXURY – index.js (single bundle)
   - Hero crossfade (3s)
   - Banner bubble movement
   - Quick Buy (add to cart -> checkout)
   - Currency default USD + toggle USD/NGN
   - Chat open
========================================================== */

/* ---------- Helpers ---------- */
const clux = {
  qs: (sel, root=document) => root.querySelector(sel),
  qsa: (sel, root=document) => Array.from(root.querySelectorAll(sel)),
};

/* ==========================================================
   1) HERO Crossfade
   Markup requirement:
   - container: [data-clux-hero]
   - slides:    [data-clux-slide]
   - interval:  data-interval-ms="3000" (optional)
========================================================== */
function initHeroCrossfade(){
  clux.qsa("[data-clux-hero]").forEach(hero => {
    const slides = clux.qsa("[data-clux-slide]", hero);
    if (!slides.length) return;

    let idx = 0;
    const intervalMs = Number(hero.getAttribute("data-interval-ms") || 3000);

    slides.forEach((s,i)=> s.classList.toggle("is-active", i===0));

    setInterval(() => {
      slides[idx].classList.remove("is-active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("is-active");
    }, intervalMs);
  });
}

/* ==========================================================
   2) Banner "bubble" movement (subtle luxury drift)
   Markup requirement:
   - banner bg: [data-clux-bubble]
========================================================== */
function initBannerBubble(){
  function rand(min, max){ return Math.random()*(max-min)+min; }

  clux.qsa("[data-clux-bubble]").forEach(el => {
    const ax = rand(-2.2, 2.2);
    const ay = rand(-1.6, 1.6);
    const sc = rand(1.02, 1.05);
    const dur = rand(9000, 14000);

    el.animate(
      [
        { transform: "translate3d(0,0,0) scale(1.00)" },
        { transform: `translate3d(${ax}%, ${ay}%, 0) scale(${sc})` },
        { transform: "translate3d(0,0,0) scale(1.00)" }
      ],
      { duration: dur, iterations: Infinity, transformOrigin: "center", easing: "ease-in-out" }
    );
  });
}

/* ==========================================================
   3) Quick Buy (button above title/price)
   Markup requirement:
   - button: [data-clux-quickbuy]
   - must have data-variant-id="123"
========================================================== */
async function addToCart(variantId){
  const res = await fetch("/cart/add.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Number(variantId), quantity: 1 })
  });
  if (!res.ok) throw new Error("Add to cart failed");
}

function initQuickBuy(){
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-clux-quickbuy]");
    if (!btn) return;

    e.preventDefault();

    const variantId = btn.getAttribute("data-variant-id");
    if (!variantId) return;

    btn.setAttribute("aria-busy", "true");

    try{
      await addToCart(variantId);
      // direct checkout
      window.location.href = "/checkout";
    } catch(err){
      // fallback to product page
      const href = btn.getAttribute("href");
      if (href) window.location.href = href;
    } finally{
      btn.removeAttribute("aria-busy");
    }
  });
}

/* ==========================================================
   4) Currency default USD + toggle USD/NGN
   IMPORTANT:
   Currency apps have different selectors.
   Start with these common selectors and adjust later.
========================================================== */
const currencySelectors = {
  usd: "[data-currency='USD'], .currency-USD, button[value='USD']",
  ngn: "[data-currency='NGN'], .currency-NGN, button[value='NGN']"
};

function clickFirstMatch(selector){
  const el = document.querySelector(selector);
  if (el) el.click();
}

function initCurrencyDefaultUSD(){
  // Default to USD on load (manual mode, no geo)
  clickFirstMatch(currencySelectors.usd);
}

function initCurrencyToggle(){
  const toggle = document.querySelector("[data-clux-currency-toggle]");
  if (!toggle) return;

  let state = "USD"; // default

  toggle.addEventListener("click", () => {
    state = (state === "USD") ? "NGN" : "USD";
    if (state === "USD") clickFirstMatch(currencySelectors.usd);
    else clickFirstMatch(currencySelectors.ngn);
  });
}

/* ==========================================================
   5) Chat open button
   Update selector after installing chat app.
========================================================== */
function initChatOpen(){
  const btn = document.querySelector("[data-clux-chat-open]");
  if (!btn) return;

  const CHAT_LAUNCHER_SELECTOR =
    ".shopify-chat, #tidio-chat, [data-testid='chat-widget-button'], .tidio-chat-button";

  btn.addEventListener("click", () => {
    const launcher = document.querySelector(CHAT_LAUNCHER_SELECTOR);
    if (launcher) launcher.click();
  });
}

/* ==========================================================
   Init everything
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initHeroCrossfade();
  initBannerBubble();
  initQuickBuy();
  initCurrencyDefaultUSD();
  initCurrencyToggle();
  initChatOpen();
});

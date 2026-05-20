"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SHOPIFY_DOMAIN = 'dy7tby-ue.myshopify.com';
const STOREFRONT_TOKEN = 'a6a4ccdb4cdd021868213cc7fe3a35bd';

export default function Back40LoopPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function initButton() {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) return;
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: STOREFRONT_TOKEN,
      });
      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent('product', {
          id: '10285941981316',
          node: document.getElementById('product-component-1777645011909'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  'font-family': 'Open Sans, sans-serif',
                  'font-weight': 'bold',
                  'background-color': '#c6a36b',
                  ':hover': { 'background-color': '#d4b07a' },
                  ':focus': { 'background-color': '#d4b07a' },
                  'padding': '14px 32px',
                  'font-size': '14px',
                  'letter-spacing': '0.1em',
                  'text-transform': 'uppercase',
                  'width': '100%',
                },
              },
              buttonDestination: 'checkout',
              contents: { img: false, title: false, price: false },
              text: { button: 'Get Yours — $35' },
              googleFonts: ['Open Sans'],
            },
            cart: {
              styles: { button: { 'background-color': '#c6a36b', ':hover': { 'background-color': '#d4b07a' } } },
              text: { total: 'Subtotal', button: 'Checkout' },
              googleFonts: ['Open Sans'],
            },
            toggle: {
              styles: { toggle: { 'background-color': '#c6a36b', ':hover': { 'background-color': '#d4b07a' } } },
              googleFonts: ['Open Sans'],
            },
          },
        });
      });
    }

    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initButton();
    } else {
      const existing = document.querySelector(`script[src="${scriptURL}"]`);
      if (existing) {
        const interval = setInterval(() => {
          if (window.ShopifyBuy && window.ShopifyBuy.UI) {
            clearInterval(interval);
            initButton();
          }
        }, 100);
        return;
      }
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      script.onload = initButton;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">

      <style>{`
        .shopify-buy__product { text-align: center !important; margin: 0 !important; max-width: 100% !important; width: 100% !important; }
        .shopify-buy__btn-wrapper { display: flex !important; justify-content: center !important; width: 100% !important; }
        .shopify-buy__product__title { text-align: center !important; }
        .shopify-buy__product__price { text-align: center !important; }
        #product-component-1777645011909 { width: 100% !important; max-width: 100% !important; }
        #product-component-1777645011909 iframe { width: 100% !important; max-width: 100% !important; }
      `}</style>

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-black/90 backdrop-blur" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
          <Link href="/">
            <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a href={shopLink} target="_blank" rel="noreferrer" className="transition hover:text-white">Shop</a>
            <Link href="/trail-series" className="text-[#c6a36b] font-semibold border-b border-[#c6a36b] pb-0.5">Trail Series</Link>
            <Link href="/dealership-series" className="transition hover:text-white">Dealership Series</Link>
            <Link href="/gallery" className="transition hover:text-white">Gallery</Link>
            <Link href="/#contact" className="transition hover:text-white">Custom Orders</Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/#contact" className="inline-flex items-center gap-1.5 rounded-2xl bg-[#c6a36b] px-3 py-2 text-xs font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4b07a] md:px-4 md:text-sm">
              Start a Project →
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden">
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-stone-300">
              {[
                [shopLink, "Shop", true],
                ["/trail-series", "Trail Series", false],
                ["/dealership-series", "Dealership Series", false],
                ["/gallery", "Gallery", false],
                ["/#contact", "Custom Orders", false],
              ].map(([href, label, external]) =>
                external ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label} ↗</a>
                ) : (
                  <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label}</Link>
                )
              )}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-[100vh] w-full">
        <img src="/images/back-40.PNG" alt="Back 40 Loop" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 pt-20 md:px-16 md:pt-0">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">
              B40 Trail Series — Bella Vista, AR
            </p>
            <h1 className="mb-6 text-6xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-8xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
              Back 40<br />Loop
            </h1>
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-[#c6a36b] md:text-lg">
              Where NWA riding grew up.
            </p>
            <p className="mb-10 max-w-sm text-sm leading-6 text-white/60 md:text-base">
              40 miles of pure Ozark singletrack. This is the trail that put Bella Vista on the map.
            </p>
            <a href="#story" className="inline-flex items-center justify-center gap-2 bg-[#c6a36b] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
              Get Yours — $35 ↓
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* TRAIL STATS */}
      <section className="relative overflow-hidden" style={{ minHeight: "360px" }}>
        <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "url('/images/trail-b40.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }} />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 Q200,40 400,90 T800,70 T1200,85 T1600,60" stroke="#c6a36b" strokeWidth="1" fill="none"/>
            <path d="M0,160 Q200,120 400,170 T800,150 T1200,165 T1600,140" stroke="#c6a36b" strokeWidth="1" fill="none"/>
            <path d="M0,240 Q200,200 400,250 T800,230 T1200,245 T1600,220" stroke="#c6a36b" strokeWidth="1" fill="none"/>
            <path d="M0,320 Q200,280 400,330 T800,310 T1200,325 T1600,300" stroke="#c6a36b" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="relative z-10 px-6 py-14 md:px-16 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.4em] text-[#c6a36b]">Trail Stats — Back 40 Loop</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { stat: "40", label: "Miles of Trail" },
                { stat: "2016", label: "Year Opened" },
                { stat: "6", label: "World-Class Builders" },
                { stat: "1,950ft", label: "Elevation Change" },
              ].map(({ stat, label }) => (
                <div key={label} className="rounded-xl border border-[#c6a36b]/15 bg-[#c6a36b]/5 px-4 py-8 text-center backdrop-blur-sm">
                  <p className="text-4xl font-black text-white md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>{stat}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a36b]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bg-black px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">

            {/* LEFT -- Hat image + buy button */}
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#c6a36b]/10 blur-2xl rounded-full" />
                <img src="/images/back-40.PNG" alt="Back 40 Loop Hat" className="relative w-full rounded-xl object-cover shadow-2xl" />
                <div className="absolute bottom-4 left-4 rounded-lg bg-black/80 px-4 py-2 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6a36b]">Back 40 Loop</p>
                  <p className="text-xs text-white/60">Bella Vista, Arkansas</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Limited Run — Small Batch</p>
                <div id="product-component-1777645011909" className="w-full" />
              </div>
            </div>

            {/* RIGHT -- Story + specs */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">The Story</p>
              <h2 className="mb-6 text-4xl font-black uppercase leading-tight md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
                The Trail That<br />Started It All.
              </h2>
              <div className="space-y-4 text-sm leading-7 text-white/60 md:text-base">
                <p>Before Bentonville called itself the Mountain Bike Capital of the World, there was the Back 40. Opened in 2016 by six of the country's most respected trail builders, this 40-mile network on the east side of Bella Vista changed what people thought was possible in the Ozarks.</p>
                <p>Weaving through ridges and valleys, the Back 40 Loop takes you past 40 feet of ancient limestone bluff -- an eroded remnant of a mountain range millions of years in the making. You'll cross creeks, rail berms, and feel like you're deep in the backcountry while you're actually minutes from downtown.</p>
                <p>This hat is a nod to the trail that built the culture. If you've ridden it, you already know. If you haven't, this is your invitation.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Patch", value: "Layered Acrylic" },
                  { label: "Style", value: "Snapback" },
                  { label: "Location", value: "Bella Vista, AR" },
                  { label: "Price", value: "$35.00" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-l-2 border-[#c6a36b] pl-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6a36b]">{label}</p>
                    <p className="text-sm text-white/80">{value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OTHER TRAIL HATS */}
      <section className="bg-black px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36b]">More From the Trail Series</p>
          <h2 className="mb-10 text-3xl font-black uppercase md:text-4xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
            More Trails. More Stories.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { name: "Back 40 Loop", sub: "Red, White & Blue", href: "/trail/back-40-loop-rwb", img: "/images/back-40-rwb.PNG" },
              { name: "Little Sugar Trail", sub: "Bella Vista, AR", href: "/trail/little-sugar", img: "/images/little-sugar.PNG" },
              { name: "Dragon Scales", sub: "Slaughter Pen, Bentonville", href: "/trail/dragon-scales", img: "/images/dragon-scales.PNG" },
            ].map(({ name, sub, href, img }) => (
              <Link key={sub} href={href} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#c6a36b]/50">
                <div className="aspect-square overflow-hidden">
                  <img src={img} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6a36b]">{name}</p>
                  <p className="mt-1 text-xs text-white/50">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/40 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="tel:479-544-1366" className="transition hover:text-white">479-544-1366</a>
            <a href="mailto:info@back40designco.com" className="transition hover:text-white">Email</a>
            <a href="https://www.instagram.com/b40_designs/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
            <Link href="/trail-series" className="transition hover:text-white">Trail Series</Link>
            <Link href="/" className="transition hover:text-white">Back to Home</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}

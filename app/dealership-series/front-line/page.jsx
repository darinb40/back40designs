"use client";

import React from "react";
import Link from "next/link";

const SHOPIFY_DOMAIN = 'dy7tby-ue.myshopify.com';
const STOREFRONT_TOKEN = 'a6a4ccdb4cdd021868213cc7fe3a35bd';

function ShopifyButton({ componentId, productId }) {
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function initButton() {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) return;
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: STOREFRONT_TOKEN,
      });
      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent('product', {
          id: productId,
          node: document.getElementById(componentId),
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
                  'background-color': '#ffffff',
                  'color': '#000000',
                  ':hover': { 'background-color': '#e7e7e7' },
                  ':focus': { 'background-color': '#e7e7e7' },
                  'border-radius': '1rem',
                  'padding': '10px 20px',
                  'width': '100%',
                },
              },
              buttonDestination: 'checkout',
              contents: { img: false, title: false, price: false },
              text: { button: 'Get Yours — $35' },
              googleFonts: ['Open Sans'],
            },
            cart: {
              styles: {
                button: {
                  'font-family': 'Open Sans, sans-serif',
                  'font-weight': 'bold',
                  'background-color': '#c6a36b',
                  ':hover': { 'background-color': '#b29360' },
                  ':focus': { 'background-color': '#b29360' },
                },
              },
              text: { total: 'Subtotal', button: 'Checkout' },
              googleFonts: ['Open Sans'],
            },
            toggle: {
              styles: {
                toggle: {
                  'font-family': 'Open Sans, sans-serif',
                  'font-weight': 'bold',
                  'background-color': '#c6a36b',
                  ':hover': { 'background-color': '#b29360' },
                  ':focus': { 'background-color': '#b29360' },
                },
              },
              googleFonts: ['Open Sans'],
            },
          },
        });
      });
    }

    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initButton();
    } else if (window.ShopifyBuy) {
      loadScript();
    } else {
      loadScript();
    }

    function loadScript() {
      if (document.querySelector(`script[src="${scriptURL}"]`)) {
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
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }
  }, [componentId, productId]);

  return <div id={componentId} />;
}

export default function FrontLinePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState(false);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";
  const shopPageLink = "/dealership-series/pre-order";

  const hats = [
    {
      name: "Sticker is Quicker",
      text: "How many hats would you buy if all your customers paid sticker?",
      image: "/images/sticker-is-quicker.jpg",
      componentId: "product-component-1779236325970",
      productId: "10335425593476",
    },
    {
      name: "Board It! (Classic)",
      text: "The moment every salesperson lives for. When the deal sticks and the board gets another name on it.",
      image: "/images/board-it-car.png",
      componentId: "product-component-1779236084695",
      productId: "10335431721092",
    },
    {
      name: "Board It! (Crown)",
      text: "Same energy. Different look. For the closer who's been putting names on boards long enough to wear the crown.",
      image: "/images/board-it-crown.png",
      componentId: "product-component-1779236122603",
      productId: "10335435686020",
    },
    {
      name: "We Fina C",
      text: "We finna see. Every F&I manager, desk guy, and closer knows exactly what this means.",
      image: "/images/we-finance.jpg",
      componentId: "product-component-1779236380203",
      productId: "10335435948164",
    },
  ];

  return (
    <main className="relative min-h-[100dvh] text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes b40FrontHeadlightPass {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0; }
          32% { opacity: 0.22; }
          45% { opacity: 0.1; }
          60% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        @keyframes b40FrontSecondHeadlightPass {
          0% { transform: translateX(140%) skewX(16deg); opacity: 0; }
          50% { opacity: 0; }
          64% { opacity: 0.2; }
          78% { opacity: 0.08; }
          92% { transform: translateX(-140%) skewX(16deg); opacity: 0; }
          100% { transform: translateX(-140%) skewX(16deg); opacity: 0; }
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 -z-30 bg-cover bg-center" style={{ backgroundImage: "url('/images/front-line.png')" }} />
      <div className="fixed inset-0 -z-20 bg-black/5" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* Passing headlights */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[18%] left-0 h-[18vh] w-[38vw]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-lg animate-[b40FrontHeadlightPass_16s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-md animate-[b40FrontHeadlightPass_16s_ease-in-out_infinite]" />
        </div>
        <div className="absolute bottom-[14%] right-0 h-[16vh] w-[34vw]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent blur-lg animate-[b40FrontSecondHeadlightPass_21s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent blur-md animate-[b40FrontSecondHeadlightPass_21s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="relative z-20">

        {/* HEADER */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
            <Link href="/">
              <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
              <Link href="/#collections" className="transition hover:text-white">Collections</Link>
              <div className="relative group">
                <Link href="/dealership-series" className="text-white font-semibold">Dealership Series</Link>
                <div className="absolute left-0 top-full mt-0 hidden w-60 flex-col rounded-xl border border-white/10 bg-black/95 p-2 pt-5 backdrop-blur-md shadow-2xl group-hover:flex before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']">
                  <Link href="/dealership-series/front-line" className="rounded-lg px-4 py-3 text-white font-semibold transition hover:bg-white/5">Front Line</Link>
                  <Link href="/dealership-series/service-bay" className="rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-white">Service Bay</Link>
                  <Link href="/dealership-series/backlot" className="rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-white">Back Lot 🔒</Link>
                  <Link href="/dealership-series/green-pea-guide" className="rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-white">Green Pea Guide</Link>
                  <Link href="/lot-stretcher" className="rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-white">Lot Stretcher</Link>
                  <div className="my-1 border-t border-white/10" />
                  <Link href={shopPageLink} className="rounded-lg px-4 py-3 text-[#c6a36b] font-semibold transition hover:bg-[#c6a36b]/10 hover:text-[#c6a36b]">Shop →</Link>
                </div>
              </div>
              <Link href="/trail-series" className="transition hover:text-white">Trail Series</Link>
              <Link href="/#process" className="transition hover:text-white">Process</Link>
              <Link href="/gallery" className="transition hover:text-white">Gallery</Link>
              <Link href="/#story" className="transition hover:text-white">Story</Link>
              <Link href="/#contact" className="transition hover:text-white">Contact</Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <a href={shopLink} target="_blank" rel="noreferrer" className="hidden rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:bg-white/5 md:inline-flex">
                Shop
              </a>
              <Link href={shopPageLink} className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100 md:px-4 md:text-sm">
                Shop Now →
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden" aria-label="Toggle menu">
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
              <nav className="flex flex-col gap-4 text-sm text-stone-300">
                <Link href="/#collections" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">Collections</Link>
                <div className="border-b border-white/5 pb-3">
                  <button type="button" onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} className="flex w-full items-center justify-between text-left transition hover:text-white">
                    <span>Dealership Series</span>
                    <span className="text-white/50">{mobileDropdownOpen ? "−" : "+"}</span>
                  </button>
                  {mobileDropdownOpen && (
                    <div className="mt-3 ml-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white/70">
                      <Link href="/dealership-series" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Overview</Link>
                      <Link href="/dealership-series/front-line" onClick={() => setMobileMenuOpen(false)} className="text-white font-semibold">Front Line</Link>
                      <Link href="/dealership-series/service-bay" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Service Bay</Link>
                      <Link href="/dealership-series/backlot" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Back Lot 🔒</Link>
                      <Link href="/dealership-series/green-pea-guide" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Green Pea Guide</Link>
                      <Link href="/lot-stretcher" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Lot Stretcher</Link>
                      <Link href={shopPageLink} onClick={() => setMobileMenuOpen(false)} className="text-[#c6a36b] font-semibold transition hover:text-[#b29360]">Shop →</Link>
                    </div>
                  )}
                </div>
                {[
                  ["/trail-series", "Trail Series"],
                  ["/#process", "Process"],
                  ["/gallery", "Gallery"],
                  ["/#story", "Story"],
                  ["/#contact", "Contact"],
                ].map(([href, label]) => (
                  <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label}</Link>
                ))}
                <a href={shopLink} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Shop Hats ↗</a>
              </nav>
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="min-h-[100dvh] flex items-center">
          <div className="w-full px-5 sm:px-6 pt-10 pb-20">
            <div className="max-w-xl">
              <p className="uppercase tracking-[0.35em] text-xs text-white/70 mb-3">
                Back 40 Designs · Dealership Series
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4">
                Front Line
              </h1>
              <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-6 bg-black/25 inline-block px-4 py-3 rounded-xl border border-white/5">
                Showroom clean. Lot-ready. Built for the ones who stand out front, shake hands, and close car deals.
              </p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <a href="#drop" className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-2xl font-semibold text-center">
                View the Drop →
              </a>
              <Link href="/dealership-series" className="w-full sm:w-auto text-center border border-white/10 px-6 py-3 rounded-2xl text-white/80 bg-black/20">
                Back to Dealership Series
              </Link>
            </div>
          </div>
        </section>

        {/* DROP */}
        <section id="drop" className="px-5 sm:px-6 py-20 md:py-28">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">Front Line Hats</h2>
            <p className="mt-3 text-sm text-white/40 uppercase tracking-widest">
              Small batch · Built to order · Ships within 2 weeks
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hats.map((hat) => (
              <div key={hat.name} className="rounded-2xl border border-white/5 bg-black/20 p-5 md:p-7 flex flex-col">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">Front Line</p>
                <h3 className="mt-3 text-xl font-semibold">{hat.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{hat.text}</p>
                <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                  <img src={hat.image} alt={hat.name} className="w-full object-cover max-h-64" />
                </div>
                <div className="mt-4 mt-auto pt-4">
                  <ShopifyButton componentId={hat.componentId} productId={hat.productId} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl border border-[#c6a36b]/20 bg-[#c6a36b]/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#c6a36b] mb-1">Full Collection</p>
              <h3 className="text-2xl font-semibold text-white">Want all four?</h3>
              <p className="mt-1 text-sm text-white/50">Shop the full Front Line collection including Back Lot and Service Bay.</p>
            </div>
            <Link href={shopPageLink} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-stone-100 hover:-translate-y-0.5 whitespace-nowrap">
              Shop All Hats →
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/40 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <a href="tel:479-544-1366" className="transition hover:text-white">479-544-1366</a>
              <a href="mailto:info@back40designco.com" className="transition hover:text-white">Email</a>
              <Link href={shopPageLink} className="transition hover:text-white">Shop</Link>
              <Link href="/dealership-series" className="transition hover:text-white">Dealership Series</Link>
              <Link href="/" className="transition hover:text-white">Back to Home</Link>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}

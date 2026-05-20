'use client';

import React from 'react';
import Link from 'next/link';

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

const backLotItems = [
  {
    title: 'Hold Gross',
    subtitle: 'No discounts given.',
    description: 'For the ones who know the difference between a deal and a donation. Hold the line.',
    image: '/images/hold-gross.png',
    componentId: 'product-component-1779236223733',
    productId: '10335906398340',
  },
  {
    title: 'Let Me Guess / Just Looking / Not Buying Today',
    subtitle: 'The line every closer has heard.',
    description: 'Three sentences. One customer. Said it on a Tuesday and drove home in a new car.',
    image: '/images/let-me-guess.png',
    componentId: 'product-component-1779236273254',
    productId: '10335906496644',
  },
  {
    title: 'Switch and Get Rich',
    subtitle: 'Different unit. Better gross.',
    description: 'The one you picked is solid. But let me show you something that actually fits you better. *cough*',
    image: '/images/switch.jpg',
    componentId: 'product-component-1779236351070',
    productId: '10335908200580',
  },
  {
    title: 'Down the Road Motors',
    subtitle: '"They said they can do it for less."',
    description: "Est. Never. Located in Somewhere Elseville, USA. They've never actually been there — but somehow, some way... they always can.",
    image: '/images/down-the-road.png',
    componentId: 'product-component-1779236173766',
    productId: '10335907217540',
  },
];

function GlitchButton() {
  const [glitch, setGlitch] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20 flex justify-center px-5">
      <a href="/lot-stretcher" className={`relative w-full sm:w-auto text-center px-8 py-5 text-lg sm:text-xl font-black uppercase tracking-widest border border-red-500 bg-black/30 text-red-400 transition-all duration-200 ${glitch ? 'translate-x-[3px] -translate-y-[3px]' : ''}`}>
        <span className={`absolute left-0 top-0 w-full h-full px-8 py-5 text-red-600 ${glitch ? 'translate-x-[4px] opacity-80' : 'opacity-0'}`}>
          GET THE LOT STRETCHER
        </span>
        <span className={`absolute left-0 top-0 w-full h-full px-8 py-5 text-white ${glitch ? '-translate-x-[4px] opacity-80' : 'opacity-0'}`}>
          GET THE LOT STRETCHER
        </span>
        <span className="relative">GET THE LOT STRETCHER →</span>
      </a>
    </div>
  );
}

export default function BackLotPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState(false);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";
  const shopPageLink = "/dealership-series/pre-order";

  return (
    <main className="relative min-h-[100dvh] text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes b40Drift {
          0% { transform: scale(1.02) translate3d(0px, 0px, 0); }
          50% { transform: scale(1.04) translate3d(-10px, -6px, 0); }
          100% { transform: scale(1.02) translate3d(0px, 0px, 0); }
        }
        @keyframes b40Flicker {
          0%, 100% { opacity: 0.08; }
          5% { opacity: 0.12; }
          10% { opacity: 0.06; }
          15% { opacity: 0.1; }
          30% { opacity: 0.07; }
          50% { opacity: 0.11; }
          70% { opacity: 0.06; }
          90% { opacity: 0.09; }
        }
        @keyframes b40HeadlightPass {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          12% { opacity: 0; }
          22% { opacity: 0.18; }
          35% { opacity: 0.08; }
          48% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        @keyframes b40SecondHeadlightPass {
          0% { transform: translateX(140%) skewX(16deg); opacity: 0; }
          45% { opacity: 0; }
          58% { opacity: 0.14; }
          70% { opacity: 0.06; }
          82% { transform: translateX(-140%) skewX(16deg); opacity: 0; }
          100% { transform: translateX(-140%) skewX(16deg); opacity: 0; }
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 -z-30 bg-[url('/images/back-lot.png')] bg-cover bg-center animate-[b40Drift_25s_ease-in-out_infinite]" />
      <div className="fixed inset-0 -z-20 bg-black/10" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07] mix-blend-soft-light"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black animate-[b40Flicker_6s_infinite]" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-0 h-[45vh] w-[55vw] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl animate-[b40HeadlightPass_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] right-0 h-[35vh] w-[45vw] bg-gradient-to-r from-transparent via-red-400/15 to-transparent blur-2xl animate-[b40SecondHeadlightPass_18s_ease-in-out_infinite]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
          <Link href="/">
            <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <Link href="/#collections" className="transition hover:text-white">Collections</Link>
            <div className="relative group">
              <Link href="/dealership-series" className="text-white font-semibold">Dealership Series</Link>
              <div className="absolute left-0 top-full mt-0 hidden w-60 flex-col rounded-xl border border-white/10 bg-black/95 p-2 pt-5 backdrop-blur-md shadow-2xl group-hover:flex before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']">
                <Link href="/dealership-series/front-line" className="rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-white">Front Line</Link>
                <Link href="/dealership-series/service-bay" className="rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-white">Service Bay</Link>
                <Link href="/dealership-series/backlot" className="rounded-lg px-4 py-3 text-white font-semibold transition hover:bg-white/5">Back Lot</Link>
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
                    <Link href="/dealership-series/front-line" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Front Line</Link>
                    <Link href="/dealership-series/service-bay" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Service Bay</Link>
                    <Link href="/dealership-series/backlot" onClick={() => setMobileMenuOpen(false)} className="text-white font-semibold">Back Lot</Link>
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

      {/* CONTENT */}
      <div className="px-5 sm:px-6 pt-14 pb-20">

        {/* Hero */}
        <section className="max-w-3xl mb-12">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/40 mb-3">B40 // Back Lot</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">Back Lot.</h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl leading-7">
            Built for the ones who have earned the right to wear it. Insider language. Closer energy. Not for everyone.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c6a36b]/30 bg-[#c6a36b]/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c6a36b]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c6a36b]">Small batch — Built to order</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/dealership-series" className="inline-flex w-full justify-center rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
              Back to Dealership Series
            </Link>
          </div>
        </section>

        {/* Hat cards */}
        <section className="grid gap-6 max-w-5xl md:grid-cols-2">
          {backLotItems.map((item) => (
            <div key={item.title} className="bg-black/20 border border-white/5 rounded-2xl p-5 flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">B40 // Back Lot</p>
              <h2 className="mt-3 text-xl sm:text-2xl font-semibold">{item.title}</h2>
              <p className="mt-1 text-sm text-white/50">{item.subtitle}</p>
              <p className="mt-4 text-sm text-white/70">{item.description}</p>
              <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <img src={item.image} alt={item.title} className="w-full object-cover max-h-64" />
              </div>
              <div className="mt-auto pt-4">
                <ShopifyButton componentId={item.componentId} productId={item.productId} />
              </div>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 max-w-5xl rounded-2xl border border-[#c6a36b]/20 bg-[#c6a36b]/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#c6a36b] mb-1">Full Collection</p>
            <h3 className="text-2xl font-semibold text-white">Want all four?</h3>
            <p className="mt-1 text-sm text-white/50">Shop the full Dealership Series including Front Line and Service Bay.</p>
          </div>
          <Link href={shopPageLink} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-stone-100 hover:-translate-y-0.5 whitespace-nowrap">
            Shop All Hats →
          </Link>
        </div>

        <GlitchButton />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 text-sm text-white/60">
          <Link href="/dealership-series" className="hover:text-white">Back to Dealership Series</Link>
          <Link href="/" className="hover:text-white">Main Site</Link>
        </div>

      </div>

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

    </main>
  );
}

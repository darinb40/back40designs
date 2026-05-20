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

const serviceBayItems = [
  {
    title: "I Don't Work For Free",
    image: "/images/free-work.png",
    subtitle: "Flat rate. Every flag hour counts.",
    description: "Built for the techs who know exactly what their time is worth and aren't shy about it.",
    patch: "Acrylic patch",
    lane: "Service Bay",
    componentId: "product-component-1779236250617",
    productId: "10335437291652",
  },
  {
    title: "Who Traded For This Piece of $#!T?",
    image: "/images/pos.png",
    subtitle: "Someone upfront made a bad call.",
    description: "For the tech who pulls a car into the bay and immediately knows the whole story.",
    patch: "Acrylic patch",
    lane: "Service Bay",
    componentId: "product-component-1779236419734",
    productId: "10335441682564",
  },
  {
    title: "Cross Threaded Is Threaded",
    image: "/images/cross-thread.png",
    subtitle: "It's in there. That's what matters.",
    description: "Shop floor logic. You either get it or you don't.",
    patch: "Acrylic patch",
    lane: "Service Bay",
    componentId: "product-component-1779236147267",
    productId: "10335441911940",
  },
];

export default function ServiceBayPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(null);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";
  const shopPageLink = "/dealership-series/pre-order";

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-[url('/images/service-bay-bg.png')] bg-cover bg-center opacity-85" />
      <div className="fixed inset-0 -z-10 bg-black/20" />

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-2xl w-full"
            style={{ animation: "scaleIn 0.25s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={serviceBayItems[lightbox].image}
              alt={serviceBayItems[lightbox].title}
              className="w-full rounded-2xl border border-white/10 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-semibold text-white">{serviceBayItems[lightbox].title}</p>
                <p className="text-xs text-white/50">{serviceBayItems[lightbox].patch} · $35</p>
              </div>
              <button onClick={() => setLightbox(null)} className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition">
                Close ✕
              </button>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setLightbox(lightbox > 0 ? lightbox - 1 : serviceBayItems.length - 1)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition"
              >
                Prev
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="flex-1 rounded-xl bg-white py-2.5 text-xs uppercase tracking-widest text-black font-semibold text-center hover:bg-stone-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => setLightbox(lightbox < serviceBayItems.length - 1 ? lightbox + 1 : 0)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

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
                <Link href="/dealership-series/service-bay" className="rounded-lg px-4 py-3 text-white font-semibold transition hover:bg-white/5">Service Bay</Link>
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
                    <Link href="/dealership-series/front-line" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">Front Line</Link>
                    <Link href="/dealership-series/service-bay" onClick={() => setMobileMenuOpen(false)} className="text-white font-semibold">Service Bay</Link>
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
      <section className="mx-auto flex min-h-[60dvh] max-w-7xl items-center px-5 pb-10 pt-10 md:px-10 md:py-20">
        <div className="max-w-4xl rounded-2xl border border-white/5 bg-black/30 p-6 sm:p-8 drop-shadow-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            Back Forty Service Department
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Built for the ones in the bay.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            No spotlight. No applause. Just work that has to be done right.
            Service Bay is for the techs, parts crews, and gearheads who keep the whole place running.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c6a36b]/30 bg-[#c6a36b]/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c6a36b]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c6a36b]">
              Small batch — Built to order
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dealership-series" className="inline-flex w-full justify-center rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
              Back to Dealership Series
            </Link>
          </div>
        </div>
      </section>

      {/* HAT CARDS */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">The Collection</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Service Bay Hats</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {serviceBayItems.map((item, index) => (
            <div key={item.title} className="group rounded-2xl border border-white/10 bg-black/30 overflow-hidden backdrop-blur transition hover:-translate-y-1">

              <div className="relative overflow-hidden cursor-zoom-in" onClick={() => setLightbox(index)}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover max-h-64 transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition duration-300">
                  <span className="opacity-0 group-hover:opacity-100 transition duration-300 text-xs uppercase tracking-widest text-white bg-black/50 px-3 py-1.5 rounded-full border border-white/20">
                    Tap to expand
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-[#c6a36b]/20 border border-[#c6a36b]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#c6a36b]">
                    Available Now
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">{item.lane}</p>
                <h3 className="text-lg font-semibold text-white leading-snug">{item.title}</h3>
                <p className="mt-1 text-sm text-white/60 italic">{item.subtitle}</p>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.description}</p>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Patch</p>
                    <p className="text-xs text-white/60 mt-0.5">{item.patch}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Price</p>
                    <p className="text-xs text-white/60 mt-0.5">$35</p>
                  </div>
                </div>
                <div className="mt-5">
                  <ShopifyButton componentId={item.componentId} productId={item.productId} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-[#c6a36b]/20 bg-[#c6a36b]/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#c6a36b] mb-1">Full Collection</p>
            <h3 className="text-2xl font-semibold text-white">Want all three?</h3>
            <p className="mt-1 text-sm text-white/50">Shop the full Dealership Series including Front Line and Back Lot.</p>
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
  );
}

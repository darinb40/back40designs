'use client';

import React from 'react';
import Link from 'next/link';

const hats = [
  // FRONT LINE
  {
    title: "Sticker is Quicker",
    lane: "Front Line",
    image: "/images/sticker-is-quicker.jpg",
    subtitle: "How many hats would you buy if all your customers paid sticker?",
    componentId: "product-component-1779236325970",
    productId: "10335425593476",
  },
  {
    title: "Board It! (Classic)",
    lane: "Front Line",
    image: "/images/board-it-car.png",
    subtitle: "The moment every salesperson lives for. When the deal sticks and the board gets another name on it.",
    componentId: "product-component-1779236084695",
    productId: "10335431721092",
  },
  {
    title: "Board It! (Crown)",
    lane: "Front Line",
    image: "/images/board-it-crown.png",
    subtitle: "Same energy. Different look. For the closer who has been putting names on boards long enough to wear the crown.",
    componentId: "product-component-1779236122603",
    productId: "10335435686020",
  },
  {
    title: "We Fina C",
    lane: "Front Line",
    image: "/images/we-finance.jpg",
    subtitle: "We finna see. Every F&I manager, desk guy, and closer knows exactly what this means.",
    componentId: "product-component-1779236380203",
    productId: "10335435948164",
  },
  // BACK LOT
  {
    title: "Hold Gross",
    lane: "Back Lot",
    image: "/images/hold-gross.png",
    subtitle: "No discounts given.",
    componentId: "product-component-1779236223733",
    productId: "10335906398340",
  },
  {
    title: "Let Me Guess / Just Looking / Not Buying Today",
    lane: "Back Lot",
    image: "/images/let-me-guess.png",
    subtitle: "The line every closer has heard.",
    componentId: "product-component-1779236273254",
    productId: "10335906496644",
  },
  {
    title: "Switch and Get Rich",
    lane: "Back Lot",
    image: "/images/switch.jpg",
    subtitle: "Different unit. Better gross.",
    componentId: "product-component-1779236351070",
    productId: "10335908200580",
  },
  {
    title: "Down the Road Motors",
    lane: "Back Lot",
    image: "/images/down-the-road.png",
    subtitle: '"They said they can do it for less."',
    componentId: "product-component-1779236173766",
    productId: "10335907217540",
  },
  // SERVICE BAY
  {
    title: "I Don't Work For Free",
    lane: "Service Bay",
    image: "/images/free-work.png",
    subtitle: "Flat rate. Every flag hour counts.",
    componentId: "product-component-1779236250617",
    productId: "10335437291652",
  },
  {
    title: "Who Traded For This Piece of $#!T?",
    lane: "Service Bay",
    image: "/images/pos.png",
    subtitle: "Someone upfront made a bad call.",
    componentId: "product-component-1779236419734",
    productId: "10335441682564",
  },
  {
    title: "Cross Threaded Is Threaded",
    lane: "Service Bay",
    image: "/images/cross-thread.png",
    subtitle: "Shop floor logic.",
    componentId: "product-component-1779236147267",
    productId: "10335441911940",
  },
];

const lanes = ["Front Line", "Back Lot", "Service Bay"];

const laneDescriptions = {
  "Front Line": "Customer-facing. Clean. For the ones who close.",
  "Back Lot": "Earned, not given.",
  "Service Bay": "Fixed ops. Built for the bay.",
};

const SHOPIFY_DOMAIN = 'dy7tby-ue.myshopify.com';
const STOREFRONT_TOKEN = 'a6a4ccdb4cdd021868213cc7fe3a35bd';

function ShopifyButton({ componentId, productId }) {
  const ref = React.useRef(null);
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

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
              contents: {
                img: false,
                title: false,
                price: false,
              },
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

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initButton();
    } else if (window.ShopifyBuy) {
      window.ShopifyBuy.UI ? initButton() : loadScript();
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

  return <div id={componentId} ref={ref} />;
}

export default function DealershipShopPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(null);

  const hatsWithImages = hats.filter((h) => h.image);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/pre-order-page.png')] bg-cover bg-center" />

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
              src={hatsWithImages[lightbox].image}
              alt={hatsWithImages[lightbox].title}
              className="w-full rounded-2xl border border-white/10 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-semibold text-white">{hatsWithImages[lightbox].title}</p>
                <p className="text-xs text-white/50">{hatsWithImages[lightbox].lane} · $35</p>
              </div>
              <button onClick={() => setLightbox(null)} className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition">
                Close ✕
              </button>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setLightbox(lightbox > 0 ? lightbox - 1 : hatsWithImages.length - 1)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-white transition"
              >
                Prev
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="flex-1 rounded-xl bg-white py-2.5 text-xs uppercase tracking-widest text-black font-semibold hover:bg-stone-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => setLightbox(lightbox < hatsWithImages.length - 1 ? lightbox + 1 : 0)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-white transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
          <Link href="/">
            <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <Link href="/dealership-series" className="text-white font-semibold">Dealership Series</Link>
            <Link href="/dealership-series/service-bay" className="transition hover:text-white">Service Bay</Link>
            <Link href="/dealership-series/front-line" className="transition hover:text-white">Front Line</Link>
            <Link href="/trail-series" className="transition hover:text-white">Trail Series</Link>
            <Link href="/#contact" className="transition hover:text-white">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-stone-300">
              {[
                ["/dealership-series", "Dealership Series"],
                ["/dealership-series/service-bay", "Service Bay"],
                ["/dealership-series/front-line", "Front Line"],
                ["/trail-series", "Trail Series"],
                ["/#contact", "Contact"],
              ].map(([href, label]) => (
                <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-red-400">
            B40 Dealership Series
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            The Collection.
          </h1>
          <p className="mt-5 text-base leading-7 text-stone-300 sm:text-lg">
            Built for the ones who live it. Small batch. Handmade in Northwest Arkansas.
          </p>

          <div className="mt-6 inline-flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                $35 per hat
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Ships within 2 weeks
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Secure checkout via Shopify
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Built by Hand", "Northwest Arkansas"],
              ["Small Batch", "No mass production"],
              ["Bulk Orders", "Contact for pricing"],
            ].map(([label, sub]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-4">
                <p className="text-xs uppercase tracking-widest text-stone-500">{label}</p>
                <p className="mt-0.5 text-xs text-stone-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HAT GRID BY LANE */}
      {lanes.map((lane) => (
        <section key={lane} className="mx-auto max-w-7xl px-5 pb-14 md:px-10 md:pb-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{laneDescriptions[lane]}</p>
              <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">{lane}</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {hats.filter((h) => h.lane === lane).map((hat) => {
              const imgIndex = hatsWithImages.findIndex((h) => h.title === hat.title);
              return (
                <div key={hat.title} className="group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden transition hover:-translate-y-1">
                  <div
                    className={`relative overflow-hidden ${hat.image ? "cursor-zoom-in" : ""}`}
                    onClick={() => hat.image && setLightbox(imgIndex)}
                  >
                    {hat.image ? (
                      <>
                        <img
                          src={hat.image}
                          alt={hat.title}
                          className="w-full object-cover max-h-56 transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition duration-300">
                          <span className="opacity-0 group-hover:opacity-100 transition duration-300 text-xs uppercase tracking-widest text-white bg-black/50 px-3 py-1.5 rounded-full border border-white/20">
                            Tap to expand
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-white/[0.03] border-b border-white/10">
                        <div className="text-center">
                          <p className="text-xs uppercase tracking-widest text-stone-600">Coming Soon</p>
                          <p className="mt-1 text-[10px] text-stone-700">Photo dropping soon</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-[#c6a36b]/20 border border-[#c6a36b]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#c6a36b]">
                        Available Now
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-1">{hat.lane}</p>
                    <h3 className="text-base font-semibold text-white leading-snug">{hat.title}</h3>
                    <p className="mt-1 text-sm text-stone-400 italic">{hat.subtitle}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">$35</p>
                      <p className="text-xs text-stone-500">Free shipping on orders 3+</p>
                    </div>
                    <div className="mt-4">
                      <ShopifyButton componentId={hat.componentId} productId={hat.productId} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* BULK ORDERS CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-black/30 backdrop-blur-sm p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-3">Ordering for your team?</p>
              <h2 className="text-2xl font-semibold text-white mb-3">Bulk orders available.</h2>
              <p className="text-sm text-stone-400 leading-6">
                Ordering 6 or more hats? We offer bulk pricing for dealership teams, events, and staff outfitting.
                Reach out directly and we will build a quote for you.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href="tel:479-544-1366"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                📞 479-544-1366
              </a>
              <a
                href="mailto:info@back40designco.com"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-stone-100"
              >
                Email Us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-8 text-sm text-stone-500 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="tel:479-544-1366" className="transition hover:text-stone-300">479-544-1366</a>
            <Link href="/dealership-series" className="transition hover:text-stone-300">Dealership Series</Link>
            <Link href="/trail-series" className="transition hover:text-stone-300">Trail Series</Link>
            <Link href="/" className="transition hover:text-stone-300">Back to Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

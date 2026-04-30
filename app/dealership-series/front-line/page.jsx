"use client";

import React from "react";
import Link from "next/link";

export default function FrontLinePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";

  const hats = [
    {
      name: "Sticker is Quicker",
      text: "How many hats would you buy if all your customers paid sticker?",
    },
    {
      name: "Board It!",
      text: "The moment every salesperson lives for. When the deal sticks and the board gets another name on it.",
    },
    {
      name: "We Fina C",
      text: "We finna see. Every F&I manager, desk guy, and closer knows exactly what this means.",
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

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: "url('/front-line.png')" }}
      />
      <div className="fixed inset-0 -z-20 bg-black/5" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* PASSING HEADLIGHTS */}
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

      {/* CONTENT */}
      <div className="relative z-20">

        {/* ── HEADER ── */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
            <Link href="/">
              <div>
                <p className="text-base font-semibold tracking-tight md:text-lg">Back 40 Designs</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400 md:text-xs">
                  Custom Patch Headwear
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
              <Link href="/#collections" className="transition hover:text-white">Collections</Link>
              <Link href="/dealership-series" className="text-white font-semibold">Dealership Series</Link>
              <Link href="/#process" className="transition hover:text-white">Process</Link>
              <Link href="/gallery" className="transition hover:text-white">Gallery</Link>
              <Link href="/#story" className="transition hover:text-white">Story</Link>
              <Link href="/#contact" className="transition hover:text-white">Contact</Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <a
                href={shopLink}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:bg-white/5 md:inline-flex"
              >
                Shop
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100 md:px-4 md:text-sm"
              >
                Start a Project →
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
              <nav className="flex flex-col gap-4 text-sm text-stone-300">
                {[
                  ["/#collections", "Collections"],
                  ["/dealership-series", "Dealership Series"],
                  ["/#process", "Process"],
                  ["/gallery", "Gallery"],
                  ["/#story", "Story"],
                  ["/#contact", "Contact"],
                ].map(([href, label]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-white/5 pb-3 transition hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
                <a
                  href={shopLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="transition hover:text-white"
                >
                  Shop Hats ↗
                </a>
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
                Showroom clean. Lot-ready. Built for the ones who stand out front,
                shake hands, and close car deals.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="#drop"
                className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-2xl font-semibold text-center"
              >
                View the Drop →
              </a>
              <Link
                href="/dealership-series"
                className="w-full sm:w-auto text-center border border-white/10 px-6 py-3 rounded-2xl text-white/80 bg-black/20"
              >
                Back to Dealership Series
              </Link>
            </div>
          </div>
        </section>

        {/* DROP */}
        <section id="drop" className="px-5 sm:px-6 py-20 md:py-28">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
              Front Line Hats
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {hats.map((hat) => (
              <div key={hat.name} className="rounded-2xl border border-white/5 bg-black/20 p-5 md:p-7">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">Front Line</p>
                <h3 className="mt-3 text-xl font-semibold">{hat.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{hat.text}</p>
                <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                  <img
                    src="/images/coming-soon.PNG"
                    alt={`${hat.name} — Coming Soon`}
                    className="w-full object-cover max-h-64"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/40 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <a href="tel:479-544-1366" className="transition hover:text-white">479-544-1366</a>
              <a href="mailto:info@back40designco.com" className="transition hover:text-white">Email</a>
              <Link href="/dealership-series" className="transition hover:text-white">Dealership Series</Link>
              <Link href="/" className="transition hover:text-white">Back to Home</Link>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}

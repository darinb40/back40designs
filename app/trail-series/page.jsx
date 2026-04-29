"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrailSeriesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">

      {/* ── HEADER ── */}
      <header className="absolute top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">

          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col leading-none">
              <span
                className="text-xl font-black uppercase tracking-[0.12em] text-white md:text-2xl"
                style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}
              >
                Back 40
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#c6a36b] md:text-[10px]">
                Design Co.
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a href={shopLink} target="_blank" rel="noreferrer" className="transition hover:text-white">Shop</a>
            <Link href="/trail-series" className="text-[#c6a36b] font-semibold border-b border-[#c6a36b] pb-0.5">Trail Series</Link>
            <Link href="/dealership-series" className="transition hover:text-white">Dealership Series</Link>
            <Link href="/gallery" className="transition hover:text-white">Gallery</Link>
            <Link href="/custom-orders" className="transition hover:text-white">Custom Orders</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/custom-orders"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-[#c6a36b] px-3 py-2 text-xs font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4b07a] md:px-4 md:text-sm"
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
                [shopLink, "Shop", true],
                ["/trail-series", "Trail Series", false],
                ["/dealership-series", "Dealership Series", false],
                ["/gallery", "Gallery", false],
                ["/custom-orders", "Custom Orders", false],
              ].map(([href, label, external]) => (
                external ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-white/5 pb-3 transition hover:text-white"
                  >
                    {label} ↗
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-white/5 pb-3 transition hover:text-white"
                  >
                    {label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-[100vh] w-full">

        {/* Background image */}
        <img
          src="/trail-series-bg.png"
          alt="Trail Series"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col justify-center px-6 pt-20 md:px-16 md:pt-0">
          <div className="max-w-xl">

            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]"
            >
              B40 Trail Series
            </p>

            <h1
              className="mb-6 text-6xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-8xl lg:text-9xl"
              style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}
            >
              Trail<br />Series
            </h1>

            <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-[#c6a36b] md:text-lg">
              A story worth wearing —<br />from the dirt up.
            </p>

            <p className="mb-10 max-w-sm text-sm leading-6 text-white/60 md:text-base">
              Born in Northwest Arkansas and built for the riders, shops, and trail towns that make this place different.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={shopLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#c6a36b] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]"
              >
                Shop Trail Drops →
              </a>
              <Link
                href="/custom-orders"
                className="inline-flex items-center justify-center gap-2 border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white/10"
              >
                Build a Shop Collab →
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>

      </section>

      {/* ── VALUE PROPS ── */}
      <section className="relative bg-black px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">

            <div className="flex flex-col items-center px-8 py-10 text-center">
              {/* Trees icon */}
              <svg className="mb-5 h-12 w-12 text-[#c6a36b]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M24 6 L14 22 H20 L12 36 H22 V42 H26 V36 H36 L28 22 H34 Z" />
                <path d="M10 16 L4 26 H8 L3 34 H13 V38 H10" strokeOpacity="0.5" />
                <path d="M38 16 L44 26 H40 L45 34 H35 V38 H38" strokeOpacity="0.5" />
              </svg>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white">
                Local Trail Drops
              </h3>
              <p className="text-sm leading-6 text-white/55">
                Inspired by the places we ride and the dirt that shaped us.
              </p>
            </div>

            <div className="flex flex-col items-center px-8 py-10 text-center">
              {/* Shop/building icon */}
              <svg className="mb-5 h-12 w-12 text-[#c6a36b]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="8" y="20" width="32" height="22" rx="1" />
                <path d="M4 20 L24 6 L44 20" />
                <rect x="18" y="30" width="12" height="12" />
                <rect x="10" y="24" width="8" height="8" />
                <rect x="30" y="24" width="8" height="8" />
              </svg>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white">
                Shop Collabs
              </h3>
              <p className="text-sm leading-6 text-white/55">
                Custom headwear for the shops, crews, and riders who keep the scene moving.
              </p>
            </div>

            <div className="flex flex-col items-center px-8 py-10 text-center">
              {/* Topo/layers icon */}
              <svg className="mb-5 h-12 w-12 text-[#c6a36b]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <ellipse cx="24" cy="24" rx="18" ry="6" />
                <ellipse cx="24" cy="24" rx="12" ry="4" />
                <ellipse cx="24" cy="24" rx="6" ry="2" />
                <path d="M6 24 Q10 14 24 12 Q38 14 42 24" strokeOpacity="0.4" />
                <path d="M6 24 Q10 34 24 36 Q38 34 42 24" strokeOpacity="0.4" />
              </svg>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white">
                Premium Builds
              </h3>
              <p className="text-sm leading-6 text-white/55">
                Layered acrylic. Topo detail. Trail-town attitude. Built different from the usual.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED DROP ── */}
      <section className="relative bg-black px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-6xl">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36b]">
            Featured Drop
          </p>
          <h2
            className="mb-10 text-3xl font-black uppercase tracking-tight md:text-5xl"
            style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}
          >
            Featured Trail Drop
          </h2>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid md:grid-cols-2">
            <div className="aspect-square overflow-hidden">
              <img
                src="/featured-trail-hat.png"
                alt="Featured Trail Hat"
                className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#c6a36b]">
                Northwest Arkansas
              </p>
              <h3
                className="mb-4 text-3xl font-black uppercase md:text-4xl"
                style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}
              >
                Slaughter Pen Series
              </h3>
              <p className="mb-8 text-sm leading-7 text-white/60">
                Inspired by one of the most iconic trail systems in the country. Built for riders who know.
              </p>
              <a
                href={shopLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 bg-[#c6a36b] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]"
              >
                View Drop →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-black px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8 md:p-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36b]">
            Build With Us
          </p>
          <h2
            className="mb-6 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl"
            style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}
          >
            Want hats for your<br />shop or crew?
          </h2>
          <p className="mb-8 max-w-xl text-sm leading-7 text-white/60 md:text-base">
            We build custom programs for bike shops, teams, and local brands. No generic templates. Everything starts with your story.
          </p>
          <Link
            href="/custom-orders"
            className="inline-flex items-center gap-2 bg-[#c6a36b] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]"
          >
            Start a Project →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/40 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="tel:479-544-1366" className="transition hover:text-white">479-544-1366</a>
            <a href="mailto:info@back40designco.com" className="transition hover:text-white">Email</a>
            <a href="https://www.instagram.com/b40_designs/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
            <Link href="/" className="transition hover:text-white">Back to Home</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}

'use client';

import Link from 'next/link';
import React from 'react';

const serviceBayItems = [
  {
    title: 'No Comebacks',
    subtitle: 'Do it right the first time.',
    description: 'Built for the techs who know the job is not done until it leaves clean.',
  },
  {
    title: 'Flat Rate',
    subtitle: 'Clock is running.',
    description: 'For the ones who know every minute, every flag hour, and every repair order matters.',
  },
  {
    title: 'Diag First',
    subtitle: "Don't guess. Test.",
    description: 'A clean shop-floor piece for the gearheads who solve the problem before they turn the wrench.',
  },
];

export default function ServiceBayPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">

      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-[url('/images/service-bay-bg.png')] bg-cover bg-center opacity-85" />
      <div className="fixed inset-0 -z-10 bg-black/20" />

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

      {/* ── HERO ── */}
      <section className="mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 pb-20 pt-10 md:px-10 md:py-28">
        <div className="max-w-4xl rounded-2xl border border-white/5 bg-black/30 p-6 sm:p-8 drop-shadow-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
            B40 Dealership Series
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl">
            Built for the ones in the bay.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:text-xl">
            No spotlight. No applause. Just work that has to be done right.
            Service Bay is for the techs, parts crews, and gearheads who keep
            the whole place running.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/dealership-series"
              className="inline-flex w-full justify-center rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black sm:w-auto"
            >
              ← Back to Dealership Series
            </Link>
            <Link
              href="/"
              className="inline-flex w-full justify-center rounded-2xl border border-white/30 px-5 py-4 text-sm font-semibold text-white sm:w-auto"
            >
              Back to Main Site
            </Link>
          </div>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          {serviceBayItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-black/30 p-5 md:p-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                Service Bay
              </p>
              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-white/75">{item.subtitle}</p>
              <p className="mt-5 text-sm leading-7 text-white/85">{item.description}</p>
              <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <img
                  src="/images/coming-soon.PNG"
                  alt={`${item.title} — Coming Soon`}
                  className="w-full object-cover max-h-64"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
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
  );
}

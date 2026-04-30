'use client';

import React from 'react';
import Link from 'next/link';

const PASSWORD = 'holdgross';

const backLotItems = [
  {
    title: 'Let Me Guess...',
    subtitle: 'Just looking.',
    description: 'The line every salesperson has heard five hundred times before lunch.',
  },
  {
    title: 'Closer High Gross',
    subtitle: 'Finish strong. Hold the line.',
    description: 'For the ones who know the deal is not done until it survives the desk, finance, and the ride home.',
  },
  {
    title: 'No Stips',
    subtitle: 'Say less.',
    description: 'Two words that hit different when you have ever chased paperwork after delivery.',
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
      <a
        href="/lot-stretcher"
        className={`relative w-full sm:w-auto text-center px-8 py-5 
        text-lg sm:text-xl font-black uppercase tracking-widest
        border border-red-500 
        bg-black/30 
        text-red-400 
        transition-all duration-200 
        ${glitch ? 'translate-x-[3px] -translate-y-[3px]' : ''}`}
      >
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

function SiteHeader({ mobileMenuOpen, setMobileMenuOpen, shopLink }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
        <Link href="/">
  <img
    src="/images/b402026.png"
    alt="Back 40 Designs"
    className="h-10 w-auto md:h-12"
  />
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
  );
}

function SiteFooter() {
  return (
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
  );
}

export default function BackLotPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [unlocked, setUnlocked] = React.useState(false);
  const [error, setError] = React.useState('');

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";

  React.useEffect(() => {
    const savedAccess = window.localStorage.getItem('b40_backlot_access');
    if (savedAccess === 'granted') setUnlocked(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      window.localStorage.setItem('b40_backlot_access', 'granted');
      setUnlocked(true);
      setError('');
      return;
    }
    setError('Access denied.');
  };

  const handleExit = () => {
    window.localStorage.removeItem('b40_backlot_access');
    setUnlocked(false);
    setPassword('');
  };

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
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black animate-[b40Flicker_6s_infinite]" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-0 h-[45vh] w-[55vw] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl animate-[b40HeadlightPass_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] right-0 h-[35vh] w-[45vw] bg-gradient-to-r from-transparent via-red-400/15 to-transparent blur-2xl animate-[b40SecondHeadlightPass_18s_ease-in-out_infinite]" />
      </div>

      {/* ── HEADER (always visible) ── */}
      <SiteHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        shopLink={shopLink}
      />

      {!unlocked ? (
        // ── LOCKED STATE ──
        <div className="flex min-h-[calc(100dvh-64px)] flex-col justify-between">
          <section className="px-5 sm:px-6 pt-16 pb-20 max-w-xl">
            <div className="bg-black/25 border border-white/5 rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/45">
                Restricted Entry
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold">
                Back Lot
              </h1>
              <p className="mt-4 text-white/70">
                This side of the business is not for everyone.
              </p>
              <p className="mt-2 text-sm text-white/45">
                If you know, you know.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-white/10 bg-black/30 px-5 py-3 text-white outline-none rounded-xl"
                  placeholder="Enter access code"
                />
                {error && <p className="text-sm text-red-300">{error}</p>}
                <button className="w-full bg-white px-5 py-3 text-sm font-semibold text-black rounded-xl">
                  Enter Back Lot
                </button>
              </form>
            </div>
          </section>
          <SiteFooter />
        </div>

      ) : (
        // ── UNLOCKED STATE ──
        <div className="flex flex-col justify-between">
          <div className="px-5 sm:px-6 pt-16 pb-20">

            <section className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">
                B40 // Back Lot
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold">
                Access Granted.
              </h1>
              <p className="mt-4 text-lg text-white/80">
                Who invited the green pea.
              </p>
              <p className="mt-2 text-sm text-white/60">
                Closers only. Coffee is for closers.
              </p>
            </section>

            <section className="mt-12 grid gap-6 max-w-5xl md:grid-cols-3">
              {backLotItems.map((item) => (
                <div key={item.title} className="bg-black/20 border border-white/5 rounded-2xl p-5">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                    B40 // Back Lot
                  </p>
                  <h2 className="mt-3 text-xl sm:text-2xl font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm text-white/50">{item.subtitle}</p>
                  <p className="mt-4 text-sm text-white/70">{item.description}</p>
                  <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src="/images/hold-gross.png"
                      alt={`${item.title} — Coming Soon`}
                      className="w-full object-cover max-h-64"
                    />
                  </div>
                </div>
              ))}
            </section>

            <GlitchButton />

            <div className="mt-10 flex flex-col sm:flex-row gap-4 text-sm text-white/60">
              <Link href="/dealership-series" className="hover:text-white">
                ← Back to Dealership Series
              </Link>
              <Link href="/" className="hover:text-white">
                Main Site
              </Link>
            </div>

            <button
              onClick={handleExit}
              className="mt-10 text-xs text-white/30 hover:text-white/60"
            >
              Exit Back Lot
            </button>

          </div>
          <SiteFooter />
        </div>
      )}
    </main>
  );
}

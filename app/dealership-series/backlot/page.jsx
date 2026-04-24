'use client';

import React from 'react';
import Link from 'next/link';

const PASSWORD = 'holdgross';

const backLotItems = [
  {
    title: 'Let Me Guess...',
    subtitle: 'Just looking.',
    description:
      'The line every salesperson has heard five hundred times before lunch.',
  },
  {
    title: 'Closer High Gross',
    subtitle: 'Finish strong. Hold the line.',
    description:
      'For the ones who know the deal is not done until it survives the desk, finance, and the ride home.',
  },
  {
    title: 'No Stips',
    subtitle: 'Say less.',
    description:
      'Two words that hit different when you have ever chased paperwork after delivery.',
  },
];

function GlitchButton() {
  const [glitch, setGlitch] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 1800); // more frequent = more chaos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-24 flex justify-center">
      <a
        href="/lot-stretcher"
        className={`relative px-12 py-6 md:px-16 md:py-8 
        text-xl md:text-2xl font-black uppercase tracking-widest
        border-2 border-red-500 
        bg-black/70 
        text-red-400 
        shadow-[0_0_20px_rgba(255,0,0,0.4)]
        transition-all duration-200 
        hover:scale-[1.05] hover:text-white hover:border-white
        animate-pulse
        ${glitch ? 'translate-x-[3px] -translate-y-[3px]' : ''}`}
      >
        {/* glitch layers */}
        <span
          className={`absolute left-0 top-0 w-full h-full px-12 py-6 md:px-16 md:py-8 
          text-red-600 
          ${glitch ? 'translate-x-[4px] opacity-80' : 'opacity-0'}`}
        >
          GET THE LOT STRETCHER
        </span>

        <span
          className={`absolute left-0 top-0 w-full h-full px-12 py-6 md:px-16 md:py-8 
          text-white 
          ${glitch ? '-translate-x-[4px] opacity-80' : 'opacity-0'}`}
        >
          GET THE LOT STRETCHER
        </span>

        {/* main text */}
        <span className="relative">
          GET THE LOT STRETCHER →
        </span>
      </a>
    </div>
  );
}

export default function BackLotPage() {
  const [password, setPassword] = React.useState('');
  const [unlocked, setUnlocked] = React.useState(false);
  const [error, setError] = React.useState('');

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
    <main className="relative min-h-screen text-white px-4 md:px-10 py-12">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-20 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />

      {!unlocked ? (
        <section className="max-w-xl">
          <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/45">
              Restricted Entry
            </p>

            <h1 className="mt-5 text-4xl md:text-6xl font-semibold">
              Back Lot
            </h1>

            <p className="mt-5 text-white/70">
              This side of the business is not for everyone.
            </p>

            <p className="mt-2 text-sm text-white/45">
              If you know, you know.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-white/15 bg-black/60 px-5 py-3 text-white outline-none"
                placeholder="Enter access code"
              />

              {error && <p className="text-sm text-red-300">{error}</p>}

              <button className="bg-white px-5 py-3 text-sm font-semibold text-black">
                Enter Back Lot
              </button>
            </form>
          </div>
        </section>
      ) : (
        <>
          {/* HEADER */}
          <section className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">
              B40 // Back Lot
            </p>

            <h1 className="mt-5 text-4xl md:text-6xl font-semibold">
              Access Granted.
            </h1>

            <p className="mt-5 text-lg text-white/80">
              Who invited the green pea.
            </p>

            <p className="mt-2 text-sm text-white/60">
              Closers only. Coffee is for closers.
            </p>
          </section>

          {/* CARDS */}
          <section className="mt-12 max-w-7xl">
            <div className="grid gap-5 md:grid-cols-3">
              {backLotItems.map((item) => (
                <div
                  key={item.title}
                  className="border border-white/10 bg-black/50 p-5 backdrop-blur-sm"
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                    B40 // Back Lot
                  </p>

                  <h2 className="mt-5 text-2xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm text-white/50">
                    {item.subtitle}
                  </p>

                  <p className="mt-6 text-sm text-white/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <GlitchButton />

          {/* LINKS */}
          <div className="mt-10 flex flex-wrap gap-5">
            <Link href="/dealership-series" className="text-sm text-white/60 hover:text-white">
              ← Back to Dealership Series
            </Link>

            <Link href="/" className="text-sm text-white/60 hover:text-white">
              Main Site
            </Link>
          </div>

          <button
            onClick={handleExit}
            className="mt-10 text-xs text-white/30 hover:text-white/60"
          >
            Exit Back Lot
          </button>
        </>
      )}
    </main>
  );
}

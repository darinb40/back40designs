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
      setTimeout(() => setGlitch(false), 120);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 flex justify-center">
      <a
        href="/lot-stretcher"
        className={`relative border border-white/10 bg-black/30 px-6 py-3 text-sm text-white/40 
        select-none transition hover:text-white/60 rotate-[-1deg]
        ${glitch ? 'translate-x-[1px] -translate-y-[1px]' : ''}`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-full px-6 py-3 text-red-500 
          ${glitch ? 'translate-x-[2px] opacity-60' : 'opacity-0'}`}
        >
          Get the Lot Stretcher
        </span>

        <span
          className={`absolute left-0 top-0 h-full w-full px-6 py-3 text-blue-400 
          ${glitch ? '-translate-x-[2px] opacity-60' : 'opacity-0'}`}
        >
          Get the Lot Stretcher
        </span>

        <span className="relative">Get the Lot Stretcher</span>
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

  if (!unlocked) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        <div className="fixed inset-0 -z-20 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />
        <div className="fixed inset-0 -z-10 bg-black/35" />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

        <section className="mx-auto flex min-h-screen max-w-7xl items-center px-5 py-12 md:px-10">
          <div className="w-full max-w-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm md:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/45">
              Restricted Entry
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
              Back Lot
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
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
                className="w-full border border-white/15 bg-black/55 px-5 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/50"
                placeholder="Enter access code"
              />

              {error && <p className="text-sm text-red-300">{error}</p>}

              <button className="bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
                Enter Back Lot
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-5 border-t border-white/10 pt-6">
              <Link
                href="/dealership-series"
                className="text-sm text-white/50 transition hover:text-white"
              >
                ← Dealership Series
              </Link>

              <Link
                href="/"
                className="text-sm text-white/50 transition hover:text-white"
              >
                Main Site
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 -z-20 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-black/25" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/65 via-transparent to-black/85" />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-14">
        <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/40">
          Back Lot
        </p>

        <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
          Access Granted.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
          You’re not supposed to be here.
        </p>

        <p className="mt-2 max-w-2xl text-sm text-white/45">
          This is where the real conversations happen.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {backLotItems.map((item) => (
            <div
              key={item.title}
              className="border border-white/10 bg-black/30 p-5 backdrop-blur-sm"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                Back Lot
              </p>

              <h2 className="mt-5 text-2xl font-semibold leading-tight">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-white/50">{item.subtitle}</p>

              <p className="mt-6 text-sm leading-7 text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <GlitchButton />

        <div className="mt-10 flex flex-wrap gap-5">
          <Link
            href="/dealership-series"
            className="text-sm text-white/55 transition hover:text-white"
          >
            ← Back to Dealership Series
          </Link>

          <Link
            href="/"
            className="text-sm text-white/55 transition hover:text-white"
          >
            Back to Main Site
          </Link>
        </div>

        <button
          onClick={handleExit}
          className="mt-10 text-xs text-white/30 transition hover:text-white/60"
        >
          Exit Back Lot
        </button>
      </section>
    </main>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

const PASSWORD = 'holdgross';

const backLotItems = [
  {
    title: 'Let Me Guess...',
    subtitle: 'Just looking, not buying today.',
    description:
      'An instant insider line for anyone who has worked a real showroom floor.',
  },
  {
    title: 'Closer High Gross',
    subtitle: 'For the real finishers.',
    description:
      'A Back Lot statement piece for the ones who know how to land it and hold the line.',
  },
  {
    title: 'No Stips',
    subtitle: 'Say less.',
    description:
      'For the people who understand exactly why those two words hit.',
  },
];

export default function BackLotPage() {
  const [password, setPassword] = React.useState('');
  const [unlocked, setUnlocked] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const savedAccess = window.localStorage.getItem('b40_backlot_access');
    if (savedAccess === 'granted') {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === PASSWORD) {
      window.localStorage.setItem('b40_backlot_access', 'granted');
      setUnlocked(true);
      setError('');
      return;
    }

    setError('Incorrect password. Try again.');
  };

  const handleLock = () => {
    window.localStorage.removeItem('b40_backlot_access');
    setUnlocked(false);
    setPassword('');
  };

  // 🔒 LOCKED VIEW (PASSWORD SCREEN)
  if (!unlocked) {
    return (
      <div className="relative min-h-screen text-stone-100">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center opacity-65" />
        <div className="absolute inset-0 bg-black/55" />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 md:px-10">
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-2xl backdrop-blur md:p-10">

            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Back Lot Access</p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              This side of the business isn&apos;t for everyone.
            </h1>

            <p className="mt-5 text-base leading-7 text-stone-300 md:text-lg md:leading-8">
              If you know, you know.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-200">
                  Enter password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-stone-950 px-5 py-3 text-sm text-white outline-none focus:border-white/30"
                  placeholder="Password"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-stone-100">
                Unlock Back Lot
              </button>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6">
              <Link href="/dealership-series" className="text-sm text-stone-300 hover:text-white">
                ← Back to Dealership Series
              </Link>
            </div>

          </div>
        </section>
      </div>
    );
  }

  // 🔓 UNLOCKED VIEW
  return (
    <div className="relative min-h-screen text-stone-100">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-black/75" />

      <section className="relative z-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">

          <div className="flex flex-wrap items-start justify-between gap-4">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Back Lot</p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                Insider-only access granted.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-stone-300 md:text-xl md:leading-8">
                Humor, pressure, language, and real-world dealership culture — built for the people who actually live this business.
              </p>
            </div>

            <button
              onClick={handleLock}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-stone-100 hover:bg-white/5"
            >
              Lock Back Lot
            </button>

          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">

          {backLotItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 backdrop-blur md:p-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Back Lot</p>

              <h2 className="mt-4 text-xl font-semibold text-white md:text-2xl">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-stone-400">{item.subtitle}</p>

              <p className="mt-4 text-sm leading-7 text-stone-300">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}

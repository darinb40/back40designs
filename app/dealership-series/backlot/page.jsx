'use client';

import React from 'react';
import Link from 'next/link';

const PASSWORD = 'holdgross';

const backLotItems = [
  {
    title: 'Let Me Guess...',
    subtitle: 'Just looking, not buying today.',
    description: 'An instant insider line for anyone who has worked a real showroom floor.',
  },
  {
    title: 'Closer High Gross',
    subtitle: 'For the real finishers.',
    description: 'A Back Lot statement piece for the ones who know how to land it and hold the line.',
  },
  {
    title: 'No Stips',
    subtitle: 'Say less.',
    description: 'For the people who understand exactly why those two words hit.',
  },
];

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

    setError('Access denied. Try again.');
  };

  const handleLock = () => {
    window.localStorage.removeItem('b40_backlot_access');
    setUnlocked(false);
    setPassword('');
  };

  if (!unlocked) {
    return (
      <div className="relative min-h-screen text-white">
        <div className="fixed inset-0 -z-10 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />

        <section className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 md:px-10">
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/20 bg-black/45 p-6 shadow-2xl backdrop-blur md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Restricted Entry
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Back Lot Access
            </h1>

            <p className="mt-5 text-base leading-7 text-white/80 md:text-lg">
              This side of the business isn&apos;t for everyone.
              <br />
              If you know, you know.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/20 bg-black/50 px-5 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/50"
                placeholder="Enter access code"
              />

              {error && <p className="text-sm text-red-300">{error}</p>}

              <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">
                Unlock Back Lot
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6">
              <Link href="/dealership-series" className="text-sm text-white/75 hover:text-white">
                ← Back to Dealership Series
              </Link>

              <Link href="/" className="text-sm text-white/75 hover:text-white">
                Back to Main Site
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 -z-10 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Access Granted
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Welcome to the Back Lot.
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80 md:text-xl">
              Humor, pressure, language, and real-world dealership culture —
              built for the people who actually live this business.
            </p>
          </div>

          <button
            onClick={handleLock}
            className="rounded-2xl border border-white/20 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Lock Back Lot
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {backLotItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/20 bg-black/40 p-6 shadow-2xl backdrop-blur md:p-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Back Lot</p>
              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-white/70">{item.subtitle}</p>
              <p className="mt-5 text-sm leading-7 text-white/80">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/dealership-series"
            className="rounded-2xl border border-white/20 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            ← Back to Dealership Series
          </Link>

          <Link
            href="/"
            className="rounded-2xl border border-white/20 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Back to Main Site
          </Link>
        </div>
      </section>
    </div>
  );
}

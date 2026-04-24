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

  // 🔒 LOCKED VIEW
  if (!unlocked) {
    return (
      <div className="relative min-h-screen text-white">

        {/* FIXED BACKGROUND IMAGE ONLY */}
        <div className="fixed inset-0 -z-10 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />

        <section className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 md:px-10">
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/20 bg-black/40 p-6 backdrop-blur md:p-10">

            <p className="text-sm uppercase tracking-[0.2em] text-white/80">Back Lot Access</p>

            <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
              This side of the business isn’t for everyone.
            </h1>

            <p className="mt-5 text-white/80">
              If you know, you know.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/20 bg-black/50 px-5 py-3 text-white"
                placeholder="Password"
              />

              {error && <p className="text-red-400">{error}</p>}

              <button className="rounded-2xl bg-white px-5 py-3 text-black font-semibold">
                Unlock Back Lot
              </button>
            </form>

            <div className="mt-8">
              <Link href="/dealership-series" className="text-white/80 hover:text-white">
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
    <div className="relative min-h-screen text-white">

      {/* FIXED BACKGROUND IMAGE ONLY */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-10">
        <div className="flex justify-between">
          <div>
            <p className="uppercase text-white/70">Back Lot</p>
            <h1 className="text-4xl md:text-6xl font-semibold">
              Insider-only access granted.
            </h1>
          </div>

          <button
            onClick={handleLock}
            className="border border-white/20 px-5 py-3 rounded-2xl"
          >
            Lock
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-10">
        <div className="grid md:grid-cols-3 gap-6">
          {backLotItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/20 bg-black/40 p-6 backdrop-blur"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-white/70 mt-2">{item.subtitle}</p>
              <p className="mt-4 text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

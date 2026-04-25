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
        <span
          className={`absolute left-0 top-0 w-full h-full px-8 py-5 
          text-red-600 
          ${glitch ? 'translate-x-[4px] opacity-80' : 'opacity-0'}`}
        >
          GET THE LOT STRETCHER
        </span>

        <span
          className={`absolute left-0 top-0 w-full h-full px-8 py-5 
          text-white 
          ${glitch ? '-translate-x-[4px] opacity-80' : 'opacity-0'}`}
        >
          GET THE LOT STRETCHER
        </span>

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
    <main className="relative min-h-[100dvh] text-white overflow-x-hidden">

      <style jsx global>{`
        @keyframes b40Drift {
          0% {
            transform: scale(1.02) translate3d(0px, 0px, 0);
          }
          50% {
            transform: scale(1.04) translate3d(-10px, -6px, 0);
          }
          100% {
            transform: scale(1.02) translate3d(0px, 0px, 0);
          }
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
          0% {
            transform: translateX(-140%) skewX(-18deg);
            opacity: 0;
          }
          12% {
            opacity: 0;
          }
          22% {
            opacity: 0.18;
          }
          35% {
            opacity: 0.08;
          }
          48% {
            transform: translateX(140%) skewX(-18deg);
            opacity: 0;
          }
          100% {
            transform: translateX(140%) skewX(-18deg);
            opacity: 0;
          }
        }

        @keyframes b40SecondHeadlightPass {
          0% {
            transform: translateX(140%) skewX(16deg);
            opacity: 0;
          }
          45% {
            opacity: 0;
          }
          58% {
            opacity: 0.14;
          }
          70% {
            opacity: 0.06;
          }
          82% {
            transform: translateX(-140%) skewX(16deg);
            opacity: 0;
          }
          100% {
            transform: translateX(-140%) skewX(16deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-30 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center animate-[b40Drift_25s_ease-in-out_infinite]" />

      {/* LIGHT ATMOSPHERE */}
      <div className="fixed inset-0 -z-20 bg-black/10" />

      {/* AMBIENT NOISE */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* LIGHT FLICKER */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black animate-[b40Flicker_6s_infinite]" />

      {/* HEADLIGHT GLOW PASSES */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-0 h-[45vh] w-[55vw] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl animate-[b40HeadlightPass_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] right-0 h-[35vh] w-[45vw] bg-gradient-to-r from-transparent via-red-400/15 to-transparent blur-2xl animate-[b40SecondHeadlightPass_18s_ease-in-out_infinite]" />
      </div>

      {!unlocked ? (
        <section className="px-5 sm:px-6 pt-[calc(env(safe-area-inset-top)+5rem)] pb-20 max-w-xl">

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
                className="w-full border border-white/10 bg-black/30 px-5 py-3 text-white outline-none"
                placeholder="Enter access code"
              />

              {error && <p className="text-sm text-red-300">{error}</p>}

              <button className="w-full bg-white px-5 py-3 text-sm font-semibold text-black">
                Enter Back Lot
              </button>
            </form>
          </div>

        </section>
      ) : (
        <div className="px-5 sm:px-6 pt-[calc(env(safe-area-inset-top)+5rem)] pb-20">

          {/* HEADER */}
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

          {/* ITEMS */}
          <section className="mt-12 flex flex-col gap-8 max-w-3xl">
            {backLotItems.map((item) => (
              <div key={item.title} className="bg-black/20 border border-white/5 rounded-2xl p-5">

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                  B40 // Back Lot
                </p>

                <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-white/50">
                  {item.subtitle}
                </p>

                <p className="mt-4 text-sm text-white/70">
                  {item.description}
                </p>

              </div>
            ))}
          </section>

          <GlitchButton />

          {/* LINKS */}
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
      )}
    </main>
  );
}

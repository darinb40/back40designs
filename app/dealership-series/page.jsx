'use client';

import Link from 'next/link';
import React from 'react';

const ArrowRight = ({ className = 'h-4 w-4' }) => <span className={className}>→</span>;
const LockIcon = ({ className = 'h-4 w-4' }) => <span className={className}>🔒</span>;

const frontLineItems = [
  { title: 'Dealer Logo', eyebrow: 'Front Line', description: 'Clean dealership-branded headwear built for the floor, events, and everyday team wear.' },
  { title: 'Write It Up', eyebrow: 'Front Line', description: 'A clean, friendly nod to the sales process that still feels safe in front of customers.' },
  { title: 'Approved', eyebrow: 'Front Line', description: 'Simple. Strong. Familiar. Built for teams that want something sharp without crossing the line.' },
];

const backLotItems = [
  { title: 'Let Me Guess...', eyebrow: 'Back Lot', description: 'Just looking, not buying today.' },
  { title: 'Closer High Gross', eyebrow: 'Back Lot', description: 'For the ones who know how to finish the deal.' },
  { title: 'No Stips', eyebrow: 'Back Lot', description: 'Insider language. Zero explanation needed.' },
];

export default function DealershipSeriesPage() {
  return (
    <div className="relative min-h-screen text-white">

      {/* SINGLE FIXED BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/frontline-showroom-bg.png')] bg-cover bg-center" />

      {/* HERO */}
      <section className="min-h-[90vh] border-b border-white/10">
        <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-16 md:px-10">
          <div className="max-w-4xl drop-shadow-2xl">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              B40 Dealership Series
            </p>

            <h1 className="text-4xl md:text-7xl font-semibold">
              Built for the showroom.
              <br />
              Forged in the back lot.
            </h1>

            <p className="mt-6 max-w-3xl text-white/90 md:text-xl">
              The first B40 collection built specifically for the car business — split into two lanes.
              <span className="font-semibold text-white"> Front Line</span> for clean dealership wear.
              <span className="font-semibold text-white"> Back Lot</span> for insider culture.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

  <a
    href="#front-line"
    className="bg-white text-black px-5 py-3 rounded-2xl font-semibold"
  >
    View Front Line <ArrowRight />
  </a>

  <Link
    href="/dealership-series/service-bay"
    className="border border-white/30 px-5 py-3 rounded-2xl"
  >
    Enter Service Bay →
  </Link>

  <Link
    href="/dealership-series/backlot"
    className="border border-white/30 px-5 py-3 rounded-2xl"
  >
    Enter Back Lot <LockIcon />
  </Link>

  <Link
    href="/"
    className="border border-white/30 px-5 py-3 rounded-2xl"
  >
    Back to Main Site
  </Link>

</div>
          </div>
        </div>
      </section>

      {/* FRONT LINE */}
      <section id="front-line" className="min-h-screen border-b border-white/10">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-16 md:px-10">

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <p className="uppercase text-white/70">Front Line</p>
              <h2 className="text-3xl md:text-5xl">
                Customer-facing. Clean. Brand-aligned.
              </h2>
            </div>

            <p className="max-w-xl text-white/90">
              Built for dealership teams who represent the brand every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {frontLineItems.map((item) => (
              <div key={item.title} className="border border-white/20 rounded-2xl p-6 bg-black/40 backdrop-blur">
                <p className="text-sm text-white/70">{item.eyebrow}</p>
                <h3 className="mt-3 text-xl">{item.title}</h3>
                <p className="mt-3 text-white/80">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BACK LOT */}
      <section className="min-h-screen border-y border-white/10">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-16 md:px-10">

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <p className="uppercase text-white/70">Back Lot</p>
              <h2 className="text-3xl md:text-5xl">
                Insider language. Restricted access.
              </h2>
            </div>

            <p className="max-w-xl text-white/90">
              This side of the business is not for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {backLotItems.map((item) => (
              <div key={item.title} className="border border-white/20 rounded-2xl p-6 bg-black/40 backdrop-blur">
                <h3 className="text-xl">{item.title}</h3>
                <p className="text-white/70 mt-2">{item.description}</p>

                <div className="absolute right-5 top-5 text-xs border px-2 py-1 rounded-full">
                  Locked
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <Link href="/dealership-series/backlot" className="bg-white text-black px-5 py-3 rounded-2xl font-semibold">
              Enter Back Lot <LockIcon />
            </Link>

            {/* 🔥 BOTTOM EXIT BUTTON */}
            <Link href="/" className="border border-white/30 px-5 py-3 rounded-2xl">
              ← Back to Main Site
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}

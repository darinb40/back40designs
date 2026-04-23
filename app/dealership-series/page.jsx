'use client';

import Link from 'next/link';
import React from 'react';

const ArrowRight = ({ className = 'h-4 w-4' }) => (
  <span className={className}>→</span>
);

const LockIcon = ({ className = 'h-4 w-4' }) => (
  <span className={className}>🔒</span>
);

const frontLineItems = [
  {
    title: 'Dealer Logo',
    eyebrow: 'Front Line',
    description:
      'Clean dealership-branded headwear built for the floor, events, and everyday team wear.',
  },
  {
    title: 'Write It Up',
    eyebrow: 'Front Line',
    description:
      'A clean, friendly nod to the sales process that still feels safe in front of customers.',
  },
  {
    title: 'Approved',
    eyebrow: 'Front Line',
    description:
      'Simple. Strong. Familiar. Built for teams that want something sharp without crossing the line.',
  },
];

const backLotItems = [
  {
    title: 'Let Me Guess...',
    eyebrow: 'Back Lot',
    description: 'Just looking, not buying today.',
  },
  {
    title: 'Closer High Gross',
    eyebrow: 'Back Lot',
    description: 'For the ones who know how to finish the deal.',
  },
  {
    title: 'No Stips',
    eyebrow: 'Back Lot',
    description: 'Insider language. Zero explanation needed.',
  },
];

export default function DealershipSeriesPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/images/frontline-showroom-bg.png')] bg-cover bg-center" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-stone-300 md:text-sm">
              B40 Dealership Series
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
              Built for the <span className="font-bold text-white">showroom</span>.
              <br />
              Forged in the <span className="font-bold text-white">back lot</span>.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-stone-200 md:text-xl md:leading-8">
              The first B40 collection built specifically for the car business — split into two lanes.
              <span className="font-semibold text-white"> Front Line</span> for clean, customer-facing dealership wear.
              <span className="font-semibold text-white"> Back Lot</span> for insider humor and culture.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#front-line"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950"
              >
                View Front Line <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/dealership-series/backlot"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white"
              >
                Enter Back Lot <LockIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FRONT LINE */}
      <section id="front-line" className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/images/frontline-showroom-bg.png')] bg-cover bg-center" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-300">Front Line</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Customer-facing. Clean. Brand-aligned.
              </h2>
            </div>

            <p className="max-w-xl text-stone-200">
              Built for dealership teams who represent the brand every day.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {frontLineItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/20 bg-black/40 p-6 backdrop-blur"
              >
                <p className="text-xs uppercase text-stone-300">{item.eyebrow}</p>
                <h3 className="mt-4 text-xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm text-stone-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACK LOT */}
      <section className="relative border-y border-white/10">
        <div className="absolute inset-0 bg-[url('/images/backlot-alley-bg.png')] bg-cover bg-center" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-300">Back Lot</p>
            <h2 className="mt-3 text-3xl md:text-5xl">
              Insider language. Restricted access.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {backLotItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/20 bg-black/50 p-6 backdrop-blur"
              >
                <p className="text-xs uppercase text-stone-300">{item.eyebrow}</p>
                <h3 className="mt-4 text-xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm text-stone-200">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/dealership-series/backlot"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Enter Back Lot <LockIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

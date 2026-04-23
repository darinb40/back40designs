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
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_26%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:52px_52px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-stone-400 md:text-sm">
              B40 Dealership Series
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
              Built for the <span className="font-bold text-white">showroom</span>.
              <br />
              Forged in the <span className="font-bold text-white">back lot</span>.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-stone-300 md:text-xl md:leading-8">
              The first B40 collection built specifically for the car business — split into two lanes.
              <span className="font-semibold text-white"> Front Line</span> for clean, customer-facing dealership wear.
              <span className="font-semibold text-white"> Back Lot</span> for insider humor, language, and culture that only the floor understands.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#front-line"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100"
              >
                View Front Line <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/dealership-series/backlot"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/5"
              >
                Enter Back Lot <LockIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="front-line" className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Front Line</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Customer-facing. Clean. Brand-aligned.
            </h2>
          </div>

          <p className="max-w-xl leading-7 text-stone-300">
            Built for dealership teams who represent the brand every day. These designs belong on the floor,
            at events, and anywhere your team needs to look sharp.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {frontLineItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-xl transition hover:-translate-y-1 md:p-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{item.eyebrow}</p>
              <h3 className="mt-4 text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-lg font-semibold text-white">Front Line is open for full visibility.</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300 md:text-base">
            Perfect for custom dealership logo hats, clean branded apparel, and team gear that feels polished,
            professional, and wearable in front of customers.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-stone-900/60">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Back Lot</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Insider language. Restricted access.
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-stone-300">
              This side of the business is not for everyone. Back Lot is built for the people behind the deal —
              the ones who know the language because they live it.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {backLotItems.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-stone-950/90 p-6 shadow-xl md:p-7"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
                <div className="absolute inset-0 backdrop-blur-[3px]" />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{item.eyebrow}</p>
                  <h3 className="mt-4 text-xl font-semibold text-white/90 md:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-400">{item.description}</p>
                </div>
                <div className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-300">
                  Locked
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-stone-950 p-6 md:p-8">
            <div>
              <p className="text-lg font-semibold text-white">This side of the lot isn&apos;t public.</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-300 md:text-base">
                Password-protected access gives Back Lot an exclusive, insider-only feel and lets you rotate access weekly or monthly.
              </p>
            </div>

            <Link
              href="/dealership-series/backlot"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100"
            >
              Enter Back Lot <LockIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

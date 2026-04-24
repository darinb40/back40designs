'use client';

import Link from 'next/link';
import React from 'react';

const serviceBayItems = [
  {
    title: 'No Comebacks',
    subtitle: 'Do it right the first time.',
    description: 'Built for the techs who know the job is not done until it leaves clean.',
  },
  {
    title: 'Flat Rate',
    subtitle: 'Clock is running.',
    description: 'For the ones who know every minute, every flag hour, and every repair order matters.',
  },
  {
    title: 'Diag First',
    subtitle: 'Don’t guess. Test.',
    description: 'A clean shop-floor piece for the gearheads who solve the problem before they turn the wrench.',
  },
];

export default function ServiceBayPage() {
  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 -z-20 bg-[url('/images/service-bay-bg.png')] bg-cover bg-center opacity-85" />
        <div className="fixed inset-0 -z-10 bg-black/20" />

      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 md:px-10">
        <div className="max-w-4xl drop-shadow-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
            B40 Dealership Series
          </p>

          <h1 className="text-4xl font-semibold leading-tight md:text-7xl">
            Built for the ones in the bay.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 md:text-xl">
            No spotlight. No applause. Just work that has to be done right.
            Service Bay is for the techs, parts crews, and gearheads who keep the whole place running.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dealership-series"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              ← Back to Dealership Series
            </Link>

            <Link
              href="/"
              className="rounded-2xl border border-white/30 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur"
            >
              Back to Main Site
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {serviceBayItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/20 bg-black/40 p-6 shadow-2xl backdrop-blur md:p-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Service Bay</p>
              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-white/70">{item.subtitle}</p>
              <p className="mt-5 text-sm leading-7 text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

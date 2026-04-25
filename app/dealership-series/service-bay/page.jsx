'use client';

import Link from 'next/link';
import React from 'react';

const serviceBayItems = [
  {
    title: 'No Comebacks',
    subtitle: 'Do it right the first time.',
    description:
      'Built for the techs who know the job is not done until it leaves clean.',
  },
  {
    title: 'Flat Rate',
    subtitle: 'Clock is running.',
    description:
      'For the ones who know every minute, every flag hour, and every repair order matters.',
  },
  {
    title: 'Diag First',
    subtitle: 'Don’t guess. Test.',
    description:
      'A clean shop-floor piece for the gearheads who solve the problem before they turn the wrench.',
  },
];

export default function ServiceBayPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/service-bay-bg.png')] bg-cover bg-center opacity-85" />
      <div className="fixed inset-0 -z-0 bg-black/20" />

      {/* HERO */}
      <section className="mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 pb-20 pt-[calc(env(safe-area-inset-top)+5rem)] md:px-10 md:py-28">
        <div className="max-w-4xl drop-shadow-2xl">
          
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
            B40 Dealership Series
          </p>

          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl">
            Built for the ones in the bay.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:text-xl">
            No spotlight. No applause. Just work that has to be done right.
            Service Bay is for the techs, parts crews, and gearheads who keep
            the whole place running.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            
            <Link
              href="/dealership-series"
              className="inline-flex w-full justify-center rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black sm:w-auto"
            >
              ← Back to Dealership Series
            </Link>

            <Link
              href="/"
              className="inline-flex w-full justify-center rounded-2xl border border-white/30 px-5 py-4 text-sm font-semibold text-white sm:w-auto"
            >
              Back to Main Site
            </Link>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          
          {serviceBayItems.map((item) => (
            <div
              key={item.title}
              className="p-2"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                Service Bay
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {item.title}
              </h2>

              <p className="mt-2 text-white/75">
                {item.subtitle}
              </p>

              <p className="mt-4 text-sm leading-7 text-white/85">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

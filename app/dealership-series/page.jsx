'use client';

import Link from 'next/link';

const ArrowRight = ({ className = 'h-4 w-4' }) => (
  <span className={className}>→</span>
);

const LockIcon = ({ className = 'h-4 w-4' }) => (
  <span className={className}>🔒</span>
);

export default function DealershipSeriesPage() {
  return (
    <div className="relative min-h-screen text-white">
      {/* KEEPING YOUR BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/frontline-showroom-bg.png')] bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-black/55" />

      {/* HERO */}
      <section className="min-h-[90vh] border-b border-white/10">
        <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-16 md:px-10">
          <div className="max-w-4xl drop-shadow-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              B40 Dealership Series
            </p>

            <h1 className="text-4xl font-semibold md:text-7xl">
              Built inside the car business.
            </h1>

            <p className="mt-6 max-w-3xl text-white/90 md:text-xl">
              Sales floor. Finance. Management.
            </p>

            <p className="mt-2 max-w-3xl text-white/90 md:text-xl">
              I’ve worn every hat—and I know which ones get worn, and which never make it past the desk.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dealership-series/front-line"
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-black"
              >
                View Front Line <ArrowRight />
              </Link>

              <Link
                href="/dealership-series/service-bay"
                className="rounded-2xl border border-white/30 px-5 py-3"
              >
                Enter Service Bay →
              </Link>

              <Link
                href="/dealership-series/backlot"
                className="rounded-2xl border border-white/30 px-5 py-3"
              >
                Enter Back Lot <LockIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-white/10 bg-black/45 px-4 py-20 backdrop-blur-sm md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">
              Not vendor merch
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Dealership gear should feel like it came from someone who actually knows the business.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/80">
              Most dealership apparel gets ordered because someone needed shirts or hats.
              This line is different. It’s built around dealership language, roles,
              culture, and the difference between something that gets worn and something
              that ends up in a drawer.
            </p>
          </div>
        </div>
      </section>

      {/* THREE LANES */}
      <section className="bg-black/55 px-4 py-20 backdrop-blur-sm md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">
              Three lanes
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Built for different sides of the store.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/20 bg-black/45 p-7 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Public Lane
              </p>

              <h3 className="mt-4 text-2xl font-semibold">Front Line</h3>

              <p className="mt-4 text-white/80">
                Clean dealership-focused headwear built for sales teams,
                managers, events, and customer-facing wear.
              </p>

              <Link
                href="/dealership-series/front-line"
                className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-black"
              >
                View Front Line →
              </Link>
            </div>

            <div className="rounded-3xl border border-white/20 bg-black/45 p-7 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Fixed Ops
              </p>

              <h3 className="mt-4 text-2xl font-semibold">Service Bay</h3>

              <p className="mt-4 text-white/80">
                Built for advisors, techs, service managers, and the people who
                keep the back half of the store moving.
              </p>

              <Link
                href="/dealership-series/service-bay"
                className="mt-6 inline-flex rounded-2xl border border-white/30 px-5 py-3 font-semibold text-white"
              >
                Enter Service Bay →
              </Link>
            </div>

            <div className="rounded-3xl border border-white/20 bg-black/45 p-7 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Private Lane
              </p>

              <h3 className="mt-4 text-2xl font-semibold">Back Lot</h3>

              <p className="mt-4 text-white/80">
                Password-protected. Not public. Not previewed. Built for select
                dealership buyers only.
              </p>

              <Link
                href="/dealership-series/backlot"
                className="mt-6 inline-flex rounded-2xl border border-white/30 px-5 py-3 font-semibold text-white"
              >
                Enter Password <LockIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BULK ORDERS */}
      <section className="border-y border-white/10 bg-black/60 px-4 py-20 backdrop-blur-sm md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl border border-white/15 bg-white/5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">
              Built for dealership orders
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Designed once. Reordered easily.
            </h2>

            <p className="mt-5 text-lg text-white/80">
              Built for small runs, team drops, event hats, and larger dealership
              orders from 24 to 300+ units.
            </p>
          </div>

          <a
            href="mailto:info@back40designco.com?subject=Dealer%20Series%20Order%20Inquiry"
            className="inline-flex rounded-2xl bg-white px-6 py-4 font-semibold text-black"
          >
            Start a Dealer Order →
          </a>
        </div>
      </section>
    </div>
  );
}

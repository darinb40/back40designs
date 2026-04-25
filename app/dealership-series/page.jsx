"use client";

import Link from "next/link";

const ArrowRight = ({ className = "h-4 w-4" }) => (
  <span className={className}>→</span>
);

const LockIcon = ({ className = "h-4 w-4" }) => (
  <span className={className}>🔒</span>
);

export default function DealershipSeriesPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-black text-white">
      <style jsx global>{`
        @keyframes b40HeadlightPass {
          0% {
            transform: translateX(-140%) skewX(-18deg);
            opacity: 0;
          }
          14% {
            opacity: 0;
          }
          28% {
            opacity: 0.14;
          }
          42% {
            opacity: 0.06;
          }
          56% {
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
          46% {
            opacity: 0;
          }
          60% {
            opacity: 0.1;
          }
          74% {
            opacity: 0.05;
          }
          88% {
            transform: translateX(-140%) skewX(16deg);
            opacity: 0;
          }
          100% {
            transform: translateX(-140%) skewX(16deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0 bg-[url('/images/frontline-showroom-bg.png')] bg-cover bg-center" />
      <div className="fixed inset-0 z-0 bg-black/20" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/45 via-transparent to-black/20" />

      {/* PASSING HEADLIGHTS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[18%] left-0 h-[42vh] w-[55vw] bg-gradient-to-r from-transparent via-white/15 to-transparent blur-2xl animate-[b40HeadlightPass_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-[12%] right-0 h-[32vh] w-[45vw] bg-gradient-to-r from-transparent via-amber-200/10 to-transparent blur-2xl animate-[b40SecondHeadlightPass_22s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section className="min-h-[100dvh] px-5 pb-20 pt-[calc(env(safe-area-inset-top)+5rem)] md:px-10 md:py-28">
          <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-7xl items-center">
            <div className="w-full max-w-4xl rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                B40 DEALERSHIP SERIES
              </p>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
                Built inside the car business.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:text-xl">
                A dealership-driven headwear line built for the people on the
                floor, at the desk, in finance, and in the service bay.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/dealership-series/front-line"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:scale-[1.02] sm:w-auto"
                >
                  View Front Line <ArrowRight />
                </Link>

                <Link
                  href="/dealership-series/service-bay"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Enter Service Bay →
                </Link>

                <Link
                  href="/dealership-series/backlot"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Enter Back Lot <LockIcon />
                </Link>
              </div>

              <div className="mt-6">
                <Link
                  href="/lot-stretcher"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-white/35 transition hover:border-white/25 hover:text-white/60 sm:w-auto"
                >
                  Go find the lot stretcher →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CREDIBILITY */}
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                  Built from experience
                </p>

                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl md:text-5xl">
                  Built by someone who's actually been inside the store.
                </h2>
              </div>

              <div className="space-y-4 text-base leading-7 text-white/85 sm:text-lg">
                <p>15+ years. Sales floor. Finance. Management.</p>

                <p className="text-xl font-semibold text-white">
                  I've worn almost every hat you can wear in a dealership—I know
                  which ones get worn, and which never make it past the desk.
                </p>

                <p>
                  I've desked deals, spot-delivered questionable ones, loaded up
                  trades and paid for it at the auction, chased stips, flipped
                  coins for $500, stayed two hours after close just to watch a
                  deal fall apart in finance—and I've gotten deals hung when no
                  one thought it was possible.
                </p>

                <p>
                  I've also trained and worked alongside some damn good
                  people—some of the best. That's why I believe you should look
                  good, feel good, and be proud of what you wear.
                </p>

                <p>
                  Most dealership gear gets ordered out of necessity—and worn
                  the same way.
                </p>

                <p>
                  That's why when I say I know what actually moves inside a
                  dealership—I know what does and what doesn't.
                </p>

                <p className="pt-2 font-semibold text-white">
                  This was built on purpose.
                  <br />
                  For you. By one of you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THREE LANES */}
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                Three distinct lanes
              </p>

              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl md:text-5xl">
                Built for different sides of the store.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-black/20 p-5 md:p-7">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">
                  Public Lane
                </p>
                <h3 className="mt-3 text-xl font-semibold">Front Line</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Clean dealership-focused headwear built for salespeople,
                  managers, events, and customer-facing teams.
                </p>
                <Link
                  href="/dealership-series/front-line"
                  className="mt-5 inline-flex w-full justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-black"
                >
                  View Front Line →
                </Link>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/20 p-5 md:p-7">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">
                  Fixed Ops
                </p>
                <h3 className="mt-3 text-xl font-semibold">Service Bay</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Built for advisors, techs, and the people who keep the store
                  moving.
                </p>
                <Link
                  href="/dealership-series/service-bay"
                  className="mt-5 inline-flex w-full justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 font-semibold text-white"
                >
                  Enter Service Bay →
                </Link>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/20 p-5 md:p-7">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">
                  Private Lane
                </p>
                <h3 className="mt-3 text-xl font-semibold">Back Lot</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Password-protected. Built for select dealership buyers only.
                </p>
                <Link
                  href="/dealership-series/backlot"
                  className="mt-5 inline-flex w-full justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 font-semibold text-white"
                >
                  Enter Password <LockIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

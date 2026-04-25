"use client";
import Link from "next/link";

export default function FrontLinePage() {
  const hats = [
    {
      name: "Closer",
      text: "Clean. Confident. Made for the one who knows how to finish.",
    },
    {
      name: "House Mouse",
      text: "For the steady operator who knows the desk, the floor, and the game.",
    },
    {
      name: "First Pencil",
      text: "Sharp enough for the showroom. Insider enough for the sales floor.",
    },
  ];

  return (
    <main className="relative min-h-[100dvh] text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes b40FrontHeadlightPass {
          0% {
            transform: translateX(-140%) skewX(-18deg);
            opacity: 0;
          }
          14% {
            opacity: 0;
          }
          26% {
            opacity: 0.14;
          }
          40% {
            opacity: 0.07;
          }
          55% {
            transform: translateX(140%) skewX(-18deg);
            opacity: 0;
          }
          100% {
            transform: translateX(140%) skewX(-18deg);
            opacity: 0;
          }
        }

        @keyframes b40FrontSecondHeadlightPass {
          0% {
            transform: translateX(140%) skewX(16deg);
            opacity: 0;
          }
          48% {
            opacity: 0;
          }
          62% {
            opacity: 0.1;
          }
          76% {
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

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: "url('/front-line.png')" }}
      />

      {/* LIGHT ATMOSPHERE */}
      <div className="fixed inset-0 -z-20 bg-black/5" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* PASSING HEADLIGHTS */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[18%] left-0 h-[42vh] w-[55vw] bg-gradient-to-r from-transparent via-white/15 to-transparent blur-2xl animate-[b40FrontHeadlightPass_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-[14%] right-0 h-[32vh] w-[45vw] bg-gradient-to-r from-transparent via-amber-200/10 to-transparent blur-2xl animate-[b40FrontSecondHeadlightPass_21s_ease-in-out_infinite]" />
      </div>

      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center">
        <div className="w-full px-5 sm:px-6 pt-[calc(env(safe-area-inset-top)+5rem)] pb-20">
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.35em] text-xs text-white/70 mb-3">
              Back 40 Designs · Dealership Series
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4">
              Front Line
            </h1>

            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-6 bg-black/25 inline-block px-4 py-3 rounded-xl border border-white/5">
              Showroom clean. Lot-ready. Built for the ones who stand out front,
              shake hands, and close car deals.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
            <a
              href="#drop"
              className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-2xl font-semibold text-center"
            >
              View the Drop →
            </a>

            <Link
              href="/dealership-series"
              className="w-full sm:w-auto text-center border border-white/10 px-6 py-3 rounded-2xl text-white/80 bg-black/20"
            >
              Back to Dealership Series
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-5 sm:px-6 py-20 md:py-28">
        <div className="max-w-3xl space-y-5">
          <p className="uppercase tracking-[0.3em] text-xs text-white/50">
            Corporate safe. Sales floor sharp.
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Built for the front row.
          </h2>

          <p className="text-white/75 text-base sm:text-lg leading-relaxed bg-black/25 inline-block px-4 py-4 rounded-xl border border-white/5">
            Front Line is the clean side of the Dealership Series — polished
            enough to wear with customers, sharp enough to stand apart from
            generic store gear, and still made by someone who actually knows
            the car business.
          </p>
        </div>
      </section>

      {/* DROP */}
      <section id="drop" className="px-5 sm:px-6 py-20 md:py-28">
        <div className="mb-12">
          <p className="uppercase tracking-[0.3em] text-xs text-white/50 mb-2">
            Launch Drop
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Front Line Hats
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {hats.map((hat) => (
            <div key={hat.name} className="flex flex-col gap-5">
              {/* PLACEHOLDER */}
              <div className="h-52 rounded-2xl border border-white/10 bg-white/[0.03] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(120deg,transparent_40%,white_50%,transparent_60%)]" />

                <div className="absolute left-1/2 top-1/2 h-20 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/20" />
                <div className="absolute left-1/2 top-[43%] h-12 w-28 -translate-x-1/2 rounded-t-full border border-white/10 bg-black/20" />

                <div className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-white/40">
                  {hat.name}
                </div>
              </div>

              <div className="max-w-md">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {hat.name}
                </h3>

                <p className="text-white/65 leading-relaxed text-sm sm:text-base bg-black/25 inline-block px-4 py-3 rounded-xl border border-white/5">
                  {hat.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section className="px-5 sm:px-6 py-20 md:py-28">
        <div className="flex flex-col gap-10 max-w-3xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Not generic dealership gear.
            </h3>

            <p className="text-white/65 leading-relaxed bg-black/25 inline-block px-4 py-4 rounded-xl border border-white/5">
              Most store apparel gets ordered out of necessity and worn the
              same way. This was built with intention — for the people who live
              the dealership life every day.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Clean enough to sell in.
            </h3>

            <p className="text-white/65 leading-relaxed bg-black/25 inline-block px-4 py-4 rounded-xl border border-white/5">
              Front Line keeps the edge subtle. It feels premium, wearable, and
              customer-facing without losing the inside nod to the people who
              understand the business.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-6 py-20 md:py-28 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">
            Built by one of you.
          </h2>

          <p className="text-white/65 mb-6 bg-black/25 inline-block px-4 py-3 rounded-xl border border-white/5">
            Dealership gear does not have to feel like an afterthought.
          </p>

          <Link
            href="/dealership-series"
            className="w-full sm:w-auto inline-flex justify-center bg-white text-black px-6 py-3 rounded-2xl font-semibold"
          >
            View Full Dealership Series →
          </Link>
        </div>
      </section>
    </main>
  );
}

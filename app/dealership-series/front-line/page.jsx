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

      {/* KEYFRAMES (fixes animation) */}
      <style jsx global>{`
        @keyframes b40FrontHeadlightPass {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0; }
          32% { opacity: 0.22; }
          45% { opacity: 0.1; }
          60% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }

        @keyframes b40FrontSecondHeadlightPass {
          0% { transform: translateX(140%) skewX(16deg); opacity: 0; }
          50% { opacity: 0; }
          64% { opacity: 0.2; }
          78% { opacity: 0.08; }
          92% { transform: translateX(-140%) skewX(16deg); opacity: 0; }
          100% { transform: translateX(-140%) skewX(16deg); opacity: 0; }
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

        {/* LEFT → RIGHT */}
        <div className="absolute top-[18%] left-0 h-[18vh] w-[38vw]">

          {/* wide glow */}
          <div className="absolute inset-0 
            bg-gradient-to-r from-transparent via-white/25 to-transparent 
            blur-lg 
            animate-[b40FrontHeadlightPass_16s_ease-in-out_infinite]" 
          />

          {/* tight beam */}
          <div className="absolute inset-0 
            bg-gradient-to-r from-transparent via-white/45 to-transparent 
            blur-md 
            animate-[b40FrontHeadlightPass_16s_ease-in-out_infinite]" 
          />

        </div>

        {/* RIGHT → LEFT */}
        <div className="absolute bottom-[14%] right-0 h-[16vh] w-[34vw]">

          {/* wide glow */}
          <div className="absolute inset-0 
            bg-gradient-to-r from-transparent via-amber-200/20 to-transparent 
            blur-lg 
            animate-[b40FrontSecondHeadlightPass_21s_ease-in-out_infinite]" 
          />

          {/* tight beam */}
          <div className="absolute inset-0 
            bg-gradient-to-r from-transparent via-amber-100/40 to-transparent 
            blur-md 
            animate-[b40FrontSecondHeadlightPass_21s_ease-in-out_infinite]" 
          />

        </div>

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
              className="w-full sm:w-auto text-center border border-white/10 px-6 py-3 rounded-2xl text-white/80 bg-black/20">
              Back to Dealership Series
            </Link>
          </div>

        </div>
      </section>

      {/* DROP */}
      <section id="drop" className="px-5 sm:px-6 py-20 md:py-28">
        <div className="mb-12">
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

    </main>
  );
}

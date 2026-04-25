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
      
      {/* BACKGROUND */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/front-line.png')" }}
      />

      {/* LIGHT ATMOSPHERE */}
      <div className="fixed inset-0 -z-10 bg-black/5" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center">
        <div className="w-full px-5 sm:px-6 pt-[calc(env(safe-area-inset-top)+5rem)] pb-20">

          <div className="bg-black/20 border border-white/5 rounded-2xl p-5 inline-block">
            <p className="uppercase tracking-[0.35em] text-xs text-white/70 mb-3">
              Back 40 Designs · Dealership Series
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4">
              Front Line
            </h1>

            <p className="text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed mb-6">
              Showroom clean. Lot-ready. Built for the ones who stand out front,
              shake hands, and close car deals.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full">
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
        <div className="max-w-3xl">
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6">
            <p className="uppercase tracking-[0.3em] text-xs text-white/50 mb-3">
              Corporate safe. Sales floor sharp.
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Built for the front row.
            </h2>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed">
              Front Line is the clean side of the Dealership Series — polished
              enough to wear with customers, sharp enough to stand apart from
              generic store gear, and still made by someone who actually knows
              the car business.
            </p>
          </div>
        </div>
      </section>

      {/* DROP */}
      <section id="drop" className="px-5 sm:px-6 py-20 md:py-28">
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-white/50 mb-2">
            Launch Drop
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Front Line Hats
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {hats.map((hat) => (
            <div key={hat.name} className="flex flex-col gap-4">

              <div className="h-52 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-white/30">
                Hat Image
              </div>

              <div className="bg-black/20 border border-white/5 rounded-2xl p-5">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{hat.name}</h3>
                <p className="text-white/65 leading-relaxed text-sm sm:text-base">
                  {hat.text}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section className="px-5 sm:px-6 py-20 md:py-28">
        <div className="flex flex-col gap-6 max-w-3xl">

          <div className="bg-black/20 border border-white/5 rounded-2xl p-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Not generic dealership gear.
            </h3>

            <p className="text-white/65 leading-relaxed">
              Most store apparel gets ordered out of necessity and worn the
              same way. This was built with intention — for the people who live
              the dealership life every day.
            </p>
          </div>

          <div className="bg-black/20 border border-white/5 rounded-2xl p-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Clean enough to sell in.
            </h3>

            <p className="text-white/65 leading-relaxed">
              Front Line keeps the edge subtle. It feels premium, wearable, and
              customer-facing without losing the inside nod to the people who
              understand the business.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-6 py-20 md:py-28 text-center">
        <div className="max-w-xl mx-auto bg-black/20 border border-white/5 rounded-2xl p-8">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">
            Built by one of you.
          </h2>

          <p className="text-white/65 mb-6">
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

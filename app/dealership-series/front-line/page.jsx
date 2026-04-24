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
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/front-line.png')",
        }}
      />

      {/* VERY LIGHT DARKEN */}
      <div className="fixed inset-0 -z-10 bg-black/5" />

      {/* TOP GRADIENT FOR TEXT READABILITY */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* HERO */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <p className="uppercase tracking-[0.35em] text-sm text-white/70 mb-4">
            Back 40 Designs · Dealership Series
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Front Line
          </h1>

          <p className="text-xl md:text-2xl text-white/85 max-w-2xl leading-relaxed mb-8">
            Showroom clean. Lot-ready. Built for the ones who stand out front,
            shake hands, hold gross, and make it happen.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#drop"
              className="bg-white text-black px-6 py-3 rounded-2xl font-semibold inline-flex items-center gap-2"
            >
              View the Drop <span>→</span>
            </a>

            <Link
              href="/dealership-series"
              className="border border-white/30 px-6 py-3 rounded-2xl text-white/80 hover:text-white bg-black/20 backdrop-blur-sm"
            >
              Back to Dealership Series
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-black/30 backdrop-blur-md">
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-4">
            Corporate safe. Sales floor sharp.
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for the front row.
          </h2>

          <p className="text-white/75 text-lg leading-relaxed">
            Front Line is the clean side of the Dealership Series — polished
            enough to wear with customers, sharp enough to stand apart from
            generic store gear, and still made by someone who actually knows
            the car business.
          </p>
        </div>
      </section>

      {/* DROP */}
      <section id="drop" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-3">
            Launch Drop
          </p>

          <h2 className="text-4xl md:text-5xl font-black">
            Front Line Hats
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {hats.map((hat) => (
            <div
              key={hat.name}
              className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-6 min-h-[360px] flex flex-col justify-between"
            >
              <div className="h-52 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-white/30 mb-6">
                Hat Image
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3">{hat.name}</h3>
                <p className="text-white/65 leading-relaxed">{hat.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-8">
            <h3 className="text-2xl font-bold mb-4">
              Not generic dealership gear.
            </h3>

            <p className="text-white/65 leading-relaxed">
              Most store apparel gets ordered out of necessity and worn the
              same way. This was built with intention — for the people who live
              the dealership life every day.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-8">
            <h3 className="text-2xl font-bold mb-4">
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
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-10 md:p-14">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Built by one of you.
          </h2>

          <p className="text-white/65 max-w-2xl mx-auto mb-8">
            Dealership gear does not have to feel like an afterthought.
          </p>

          <Link
            href="/dealership-series"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-semibold"
          >
            View Full Dealership Series <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";

export default function TrailSeriesPage() {
  return (
    <main className="relative w-full overflow-hidden text-white">

      {/* HERO SECTION */}
      <section className="relative h-[100vh] w-full">

        {/* Background */}
        <img
          src="/trail-series-bg.png"
          alt="Trail Series"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlays (environment, not cards) */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            TRAIL<br />SERIES
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-4 max-w-xl">
            A story worth wearing — from the dirt up.
          </p>

          <p className="text-sm md:text-base text-white/60 mb-8 max-w-md">
            Born in Northwest Arkansas and built for the riders, shops, and trail towns that make this place different.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <Link
              href="/collections/trail-series"
              className="bg-[#c6a36b] text-black px-6 py-3 text-sm tracking-wide uppercase font-semibold hover:bg-[#d4b07a] transition"
            >
              Shop Trail Drops →
            </Link>

            <Link
              href="/custom-orders"
              className="border border-white/40 text-white px-6 py-3 text-sm tracking-wide uppercase hover:bg-white/10 transition"
            >
              Build a Shop Collab →
            </Link>

          </div>
        </div>
      </section>

      {/* VALUE SECTIONS */}
      <section className="relative px-6 md:px-16 py-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="text-lg mb-2">Local Trail Drops</h3>
            <p className="text-white/60 text-sm">
              Slaughter Pen. Coler. Little Sugar. Built from the trails that shaped Northwest Arkansas riding culture.
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="text-lg mb-2">Shop Collabs</h3>
            <p className="text-white/60 text-sm">
              Custom headwear programs for shops, crews, and teams that want something different from stock merch.
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="text-lg mb-2">Premium Builds</h3>
            <p className="text-white/60 text-sm">
              Layered acrylic. Topo detail. Depth you can feel. Built different from traditional patches.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURED DROP */}
      <section className="relative px-6 md:px-16 py-20">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl md:text-3xl mb-8">
            Featured Trail Drop
          </h2>

          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">

            <img
              src="/featured-trail-hat.png"
              alt="Featured Trail Hat"
              className="w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-lg mb-2">Slaughter Pen Series</h3>
              <p className="text-white/60 text-sm mb-4">
                Inspired by one of the most iconic trail systems in the country. Built for riders who know.
              </p>

              <Link
                href="/collections/trail-series"
                className="text-sm uppercase tracking-wide border-b border-white/40 hover:border-white transition"
              >
                View Drop →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-6 md:px-16 py-24">

        <div className="max-w-3xl">

          <h2 className="text-3xl md:text-4xl mb-6 leading-tight">
            Want hats for your shop or crew?
          </h2>

          <p className="text-white/60 mb-8">
            We build custom programs for bike shops, teams, and local brands. No generic templates. Everything starts with your story.
          </p>

          <Link
            href="/custom-orders"
            className="bg-[#c6a36b] text-black px-8 py-4 text-sm uppercase tracking-wide font-semibold hover:bg-[#d4b07a] transition"
          >
            Start a Project →
          </Link>

        </div>
      </section>

    </main>
  );
}

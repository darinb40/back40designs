"use client";

import { useState } from "react";
import Link from "next/link";

const trailHats = [
  { name: "Back 40 Loop", sub: "Bella Vista, AR", href: "/trail/back-40-loop", img: "/images/back-40.PNG" },
  { name: "Back 40 Loop", sub: "Red, White & Blue", href: "/trail/back-40-loop-rwb", img: "/images/back-40-rwb.PNG" },
  { name: "Little Sugar Trail", sub: "Bella Vista, AR", href: "/trail/little-sugar", img: "/images/little-sugar.PNG" },
  { name: "Dragon Scales", sub: "Slaughter Pen, Bentonville", href: "/trail/dragon-scales", img: "/images/dragon-scales.PNG" },
];

const brandWork = [
  { name: "B40 OG Flat Bill", img: "/images/b40-flat-bill.PNG" },
  { name: "Bearded Buffalo", img: "/images/buffalo.PNG" },
  { name: "Wicked Guud Dogs", img: "/images/WICKED.PNG" },
  { name: "Hyundai Bentonville", img: "/images/hyundaigreen.png" },
  { name: "Hyundai Bentonville", img: "/images/hyundai2.png" },
  { name: "Amor Patriae Pistols", img: "/images/appistols.png" },
  { name: "Amor Patriae", img: "/images/apolive.png" },
  { name: "Amor Patriae Camo", img: "/images/apcamo.png" },
  { name: "MSDT", img: "/images/msdtblue.png" },
  { name: "Red Pig Hat Co", img: "/images/redpig.png" },
  { name: "All American PDR", img: "/images/usapdr.png" },
  { name: "Henny Dogs Camo", img: "/images/hennycamo.png" },
  { name: "Henny Dog", img: "/images/hennydog.png" },
  { name: "Lumber Lids", img: "/images/lumberlids.png" },
];

const customBuilds = [
  { name: "All Eyes On Me", img: "/images/all-eyes.PNG" },
  { name: "Jesters Privilege", img: "/images/jester.PNG" },
  { name: "JA > Speed", img: "/images/ja.PNG" },
  { name: "Wood & Wild", img: "/images/goose.png" },
  { name: "AR Letters", img: "/images/arletters.png" },
  { name: "Suicide King", img: "/images/suicideking.png" },
];

export default function GalleryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxName, setLightboxName] = useState("");

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt={lightboxName} className="w-full rounded-xl shadow-2xl" />
            <p className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#c6a36b]">{lightboxName}</p>
            <button onClick={() => setLightboxImg(null)} className="absolute -top-4 -right-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">✕ Close</button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
          <Link href="/">
            <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <Link href="/trail-series" className="transition hover:text-white">Shop</Link>
            <Link href="/trail-series" className="transition hover:text-white">Trail Series</Link>
            <Link href="/dealership-series" className="transition hover:text-white">Dealership Series</Link>
            <Link href="/gallery" className="text-[#c6a36b] font-semibold border-b border-[#c6a36b] pb-0.5">Gallery</Link>
            <Link href="/custom-orders" className="transition hover:text-white">Custom Orders</Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/custom-orders" className="inline-flex items-center gap-1.5 rounded-2xl bg-[#c6a36b] px-3 py-2 text-xs font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4b07a] md:px-4 md:text-sm">
              Start a Project →
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden">
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-stone-300">
              {[
                ["/trail-series", "Shop"],
                ["/trail-series", "Trail Series"],
                ["/dealership-series", "Dealership Series"],
                ["/gallery", "Gallery"],
                ["/custom-orders", "Custom Orders"],
              ].map(([href, label]) => (
                <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-16 px-6 md:px-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Back 40 Designs</p>
          <h1 className="mb-6 text-5xl font-black uppercase leading-tight md:text-7xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
            Built to Be<br />Worn.
          </h1>
          <p className="max-w-xl text-sm leading-7 text-white/60 md:text-base">
            Every hat here started with a story. A brand, a place, a memory, or a moment worth putting on a patch. This is what Back 40 builds.
          </p>
        </div>
      </section>

      {/* ── TRAIL SERIES ── */}
      <section className="relative overflow-hidden px-6 py-16 md:px-16 md:py-20">
        <div className="absolute inset-0 bg-[url('/images/trail-b40.png')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Available Now</p>
              <h2 className="text-4xl font-black uppercase md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
                B40 Trail Series
              </h2>
              <p className="mt-2 text-sm text-white/50">4 trails. 4 hats. Each one built to wear a story.</p>
            </div>
            <Link href="/trail-series" className="inline-flex w-fit items-center gap-2 bg-[#c6a36b] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
              Shop All Trail Hats →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trailHats.map(({ name, sub, href, img }) => (
              <Link key={href} href={href} className="group overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm transition hover:border-[#c6a36b]/50">
                <div className="aspect-square overflow-hidden">
                  <img src={img} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6a36b]">{name}</p>
                  <p className="mt-0.5 text-xs text-white/40">{sub}</p>
                  <p className="mt-2 text-xs font-semibold text-white/70 group-hover:text-[#c6a36b] transition">Get Yours → $35</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND WORK ── */}
      <section className="bg-black px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Portfolio</p>
            <h2 className="text-4xl font-black uppercase md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
              Brand Work
            </h2>
            <p className="mt-2 text-sm text-white/50">Custom hats built for businesses, shops, and brands.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
            {brandWork.map(({ name, img }) => (
              <button
                key={name + img}
                onClick={() => { setLightboxImg(img); setLightboxName(name); }}
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition hover:border-[#c6a36b]/50 hover:-translate-y-0.5"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={img} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/80">{name}</p>
                  <p className="mt-0.5 text-xs text-white/30">Brand Work</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM BUILDS ── */}
      <section className="bg-[#080808] px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Portfolio</p>
            <h2 className="text-4xl font-black uppercase md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
              Custom Builds
            </h2>
            <p className="mt-2 text-sm text-white/50">One-off pieces built from personal stories, places, and moments worth wearing.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
            {customBuilds.map(({ name, img }) => (
              <button
                key={name + img}
                onClick={() => { setLightboxImg(img); setLightboxName(name); }}
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition hover:border-[#c6a36b]/50 hover:-translate-y-0.5"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={img} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/80">{name}</p>
                  <p className="mt-0.5 text-xs text-white/30">Custom Build</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-black px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8 md:p-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36b]">Start a Project</p>
          <h2 className="mb-6 text-4xl font-black uppercase leading-tight md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
            Want something built<br />for your brand?
          </h2>
          <p className="mb-8 mx-auto max-w-xl text-sm leading-7 text-white/60 md:text-base">
            Every build starts with a story. Send a logo, a concept, or even just a direction and we'll take it from there.
          </p>
          <Link href="/custom-orders" className="inline-flex items-center gap-2 bg-[#c6a36b] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
            Start a Project →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/40 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="tel:479-544-1366" className="transition hover:text-white">479-544-1366</a>
            <a href="mailto:info@back40designco.com" className="transition hover:text-white">Email</a>
            <a href="https://www.instagram.com/b40_designs/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
            <Link href="/trail-series" className="transition hover:text-white">Shop</Link>
            <Link href="/" className="transition hover:text-white">Back to Home</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}

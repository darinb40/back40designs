"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const bebas = { fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" };
const PHONE = "479-544-1366";

// B40 styles — each one is a starting point a customer can ask for.
const styles = [
  ["Pink Topo", "pink-topo"],
  ["Black Marble Lightning", "black-marble-lightning"],
  ["Red Camo", "red-camo"],
  ["Tan Topo", "tan-topo"],
  ["Blaze Leaf Camo", "blaze-leaf-camo"],
  ["Gold B40 Camo", "gold-b40-camo"],
  ["Black Gold Topo", "black-gold-topo"],
  ["Teal Desert Camo", "teal-desert-camo"],
  ["Blackout Camo", "blackout-camo"],
  ["Blaze Duck Camo", "blaze-duck-camo"],
  ["Camo Trucker, Gold Rope", "camo-trucker-gold-rope"],
  ["Gray Camo, Red Patch", "gray-camo-red-patch"],
  ["Old School Duck Camo", "old-school-duck-camo"],
  ["Sand & Teal Camo", "sand-teal-camo"],
  ["Black Camo, Gold Rope", "black-camo-gold-rope"],
  ["Gray, Arctic Patch", "gray-arctic-patch"],
  ["Bone & Brown Camo", "bone-brown-camo"],
  ["Green Duck Camo", "green-duck-camo"],
  ["Woodland Rope", "woodland-rope"],
  ["Charcoal Duck Camo", "charcoal-duck-camo"],
  ["Classic Duck Camo", "classic-duck-camo"],
  ["Sand Duck Camo", "sand-duck-camo"],
  ["Green & Brown Duck Camo", "green-brown-duck-camo"],
  ["Woodland Camo", "woodland-camo"],
].map(([name, file]) => ({ name, img: `/images/gallery/${file}.jpg`, category: "styles" }));

const pastWork = [
  { name: "Back 40 Loop", sub: "Bella Vista, AR", img: "/images/back-40.PNG", category: "trail" },
  { name: "Back 40 Loop", sub: "Red, White & Blue", img: "/images/back-40-rwb.PNG", category: "trail" },
  { name: "Little Sugar Trail", sub: "Bella Vista, AR", img: "/images/little-sugar.PNG", category: "trail" },
  { name: "Dragon Scales", sub: "Slaughter Pen, Bentonville", img: "/images/dragon-scales.PNG", category: "trail" },

  { name: "B40 OG Flat Bill", img: "/images/b40-flat-bill.PNG", category: "brand" },
  { name: "Bearded Buffalo", img: "/images/buffalo.PNG", category: "brand" },
  { name: "Wicked Guud Dogs", img: "/images/WICKED.PNG", category: "brand" },
  { name: "Hyundai Bentonville", img: "/images/hyundaigreen.png", category: "brand" },
  { name: "Hyundai Bentonville", img: "/images/hyundai2.png", category: "brand" },
  { name: "Amor Patriae Pistols", img: "/images/appistols.png", category: "brand" },
  { name: "Amor Patriae", img: "/images/apolive.png", category: "brand" },
  { name: "Amor Patriae Camo", img: "/images/apcamo.png", category: "brand" },
  { name: "MSDT", img: "/images/msdtblue.png", category: "brand" },
  { name: "Red Pig Hat Co", img: "/images/redpig.png", category: "brand" },
  { name: "All American PDR", img: "/images/usapdr.png", category: "brand" },
  { name: "Henny Dogs Camo", img: "/images/hennycamo.png", category: "brand" },
  { name: "Henny Dog", img: "/images/hennydog.png", category: "brand" },
  { name: "Lumber Lids", img: "/images/lumberlids.png", category: "brand" },

  { name: "All Eyes On Me", img: "/images/all-eyes.PNG", category: "custom" },
  { name: "Jesters Privilege", img: "/images/jester.PNG", category: "custom" },
  { name: "JA > Speed", img: "/images/ja.PNG", category: "custom" },
  { name: "Wood & Wild", img: "/images/goose.png", category: "custom" },
  { name: "AR Letters", img: "/images/arletters.png", category: "custom" },
  { name: "Suicide King", img: "/images/suicideking.png", category: "custom" },
];

const hats = [...styles, ...pastWork];

const categories = {
  styles: { label: "B40 Styles", tag: "B40 Style", ask: "Want this style with your logo?" },
  trail: { label: "Trail Series", tag: "Trail Series", ask: "Want a hat for your trail, town, or team?" },
  brand: { label: "Brand Work", tag: "Brand Work", ask: "Want something like this for your brand?" },
  custom: { label: "Custom Builds", tag: "Custom Build", ask: "Got a story worth putting on a hat?" },
};

const options = [
  { title: "Hat Styles", items: ["7-panel snapback", "Mesh-back trucker", "Flat or curved bill"] },
  { title: "Fabrics", items: ["Duck & woodland camo", "Topo map prints", "Marble, solids & more"] },
  { title: "Patches", items: ["Your logo or artwork", "Filled with any pattern", "Shaped to fit your brand"] },
  { title: "Details", items: ["Rope accents", "Contrast bills & panels", "Your colors, start to finish"] },
];

const navLinks = [
  ["/trail-series", "Trail Series"],
  ["/dealership-series", "Dealership Series"],
  ["/gallery", "Gallery"],
  ["/custom-orders", "Custom Orders"],
];

export default function GalleryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const visible = filter === "all" ? hats : hats.filter((h) => h.category === filter);
  const open = openIndex === null ? null : visible[openIndex];
  const count = (key) => (key === "all" ? hats.length : hats.filter((h) => h.category === key).length);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i + 1) % visible.length);
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, visible.length]);

  const step = (dir) => (e) => {
    e.stopPropagation();
    setOpenIndex((openIndex + dir + visible.length) % visible.length);
  };

  return (
    <main className="relative w-full overflow-x-clip bg-black pb-20 text-white md:pb-0">

      {/* ── LIGHTBOX ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm" onClick={() => setOpenIndex(null)}>
          <button onClick={step(-1)} aria-label="Previous" className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-lg hover:bg-white/20 md:block">←</button>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.img} alt={open.name} className="max-h-[60vh] w-full rounded-xl object-contain" />
            <div className="mt-5 flex flex-col items-center gap-2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">{categories[open.category].tag}</p>
              <p className="text-3xl uppercase md:text-4xl" style={bebas}>{open.name}</p>
              {open.sub && <p className="-mt-1 text-sm text-white/50">{open.sub}</p>}
              <p className="mt-3 text-sm text-white/70">{categories[open.category].ask}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Link href="/custom-orders" className="inline-flex items-center gap-2 bg-[#c6a36b] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
                  Start a Project →
                </Link>
                <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:border-white/50">
                  Call {PHONE}
                </a>
              </div>
              <div className="mt-4 flex items-center gap-6 md:hidden">
                <button onClick={step(-1)} className="text-sm text-white/50">← Prev</button>
                <span className="text-xs text-white/30">{openIndex + 1} / {visible.length}</span>
                <button onClick={step(1)} className="text-sm text-white/50">Next →</button>
              </div>
            </div>
            <button onClick={() => setOpenIndex(null)} className="absolute -right-2 -top-2 rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20">✕ Close</button>
          </div>
          <button onClick={step(1)} aria-label="Next" className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-lg hover:bg-white/20 md:block">→</button>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
          <Link href="/">
            <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            {navLinks.map(([href, label]) =>
              href === "/gallery" ? (
                <Link key={label} href={href} className="border-b border-[#c6a36b] pb-0.5 font-semibold text-[#c6a36b]">{label}</Link>
              ) : (
                <Link key={label} href={href} className="transition hover:text-white">{label}</Link>
              )
            )}
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
              {navLinks.map(([href, label]) => (
                <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative px-6 pb-12 pt-28 md:px-16 md:pb-16 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-end gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">The Gallery</p>
            <h1 className="mb-6 text-6xl uppercase leading-[0.9] md:text-8xl" style={bebas}>
              Built to Be<br />Worn.
            </h1>
            <p className="mb-8 max-w-lg text-sm leading-7 text-white/60 md:text-base">
              Every hat here started with a story. Pick a style you like, send us your logo or idea, and we'll build it from there.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/custom-orders" className="inline-flex items-center gap-2 bg-[#c6a36b] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
                Start a Project →
              </Link>
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
                Call {PHONE}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["pink-topo", "red-camo", "black-marble-lightning", "tan-topo"].map((f) => (
              <img key={f} src={`/images/gallery/${f}.jpg`} alt="" className="aspect-[3/2] w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      </section>

      {/* ── OPTIONS ── */}
      <section className="border-y border-white/10 bg-[#080808] px-6 py-12 md:px-16 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Mix & Match</p>
              <h2 className="text-4xl uppercase md:text-5xl" style={bebas}>What You Can Choose</h2>
            </div>
            <p className="max-w-sm text-sm text-white/50">Not sure what you want? Tell us the vibe and we'll put options in front of you.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {options.map(({ title, items }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-3 text-2xl uppercase text-[#c6a36b]" style={bebas}>{title}</p>
                <ul className="space-y-1.5 text-sm text-white/60">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <div className="sticky top-[65px] z-30 border-b border-white/10 bg-black/90 backdrop-blur md:top-[81px]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 md:px-16 xl:px-0">
          {[["all", "All"], ...Object.entries(categories).map(([k, c]) => [k, c.label])].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setFilter(key); setOpenIndex(null); }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                filter === key ? "bg-[#c6a36b] text-black" : "border border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {label} <span className="opacity-50">{count(key)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <section className="px-6 py-10 md:px-16 md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {visible.map((hat, i) => (
            <button
              key={hat.img}
              onClick={() => setOpenIndex(i)}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition hover:-translate-y-0.5 hover:border-[#c6a36b]/50"
            >
              <div className="aspect-square overflow-hidden bg-black">
                <img src={hat.img} alt={hat.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
              </div>
              <div className="p-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/85">{hat.name}</p>
                <p className="mt-0.5 text-xs text-white/35">{hat.sub ?? categories[hat.category].tag}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS + CTA ── */}
      <section className="px-6 pb-20 md:px-16 md:pb-28">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-8 md:p-14">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36b]">Start a Project</p>
            <h2 className="text-4xl uppercase leading-tight md:text-6xl" style={bebas}>See something you like?</h2>
          </div>
          <div className="mb-10 grid gap-6 text-center md:grid-cols-3">
            {[
              ["01", "Reach out", "Call, text, or send the form. Tell us which style caught your eye."],
              ["02", "We design it", "Send a logo, a concept, or just a direction. We'll mock it up."],
              ["03", "You wear it", "Approve the design and we build your hats."],
            ].map(([n, title, body]) => (
              <div key={n}>
                <p className="text-5xl text-[#c6a36b]/40" style={bebas}>{n}</p>
                <p className="mb-2 text-2xl uppercase" style={bebas}>{title}</p>
                <p className="mx-auto max-w-xs text-sm leading-6 text-white/55">{body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/custom-orders" className="inline-flex items-center gap-2 bg-[#c6a36b] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
              Start a Project →
            </Link>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
              Call {PHONE}
            </a>
            <a href="mailto:info@back40designco.com" className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/40 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href={`tel:${PHONE}`} className="transition hover:text-white">{PHONE}</a>
            <a href="mailto:info@back40designco.com" className="transition hover:text-white">Email</a>
            <a href="https://www.instagram.com/b40_designs/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
            <Link href="/custom-orders" className="transition hover:text-white">Custom Orders</Link>
            <Link href="/" className="transition hover:text-white">Back to Home</Link>
          </div>
        </div>
      </footer>

      {/* ── MOBILE CONTACT BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
        <a href={`tel:${PHONE}`} className="py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white/80">Call</a>
        <a href={`sms:${PHONE}`} className="border-x border-white/10 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white/80">Text</a>
        <Link href="/custom-orders" className="bg-[#c6a36b] py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-black">Start →</Link>
      </div>

    </main>
  );
}

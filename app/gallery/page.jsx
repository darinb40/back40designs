"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const bebas = { fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" };
const PHONE = "479-544-1366";
const EMAIL = "info@back40designco.com";
const mailto = (subject = "New hat project") => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
// Texts open the visitor's messages app with a starter message they can edit.
const sms = (message = "Hi! I'm interested in a custom hat project.") => `sms:+14795441366?&body=${encodeURIComponent(message)}`;

// B40 styles — each one is a starting point a customer can ask for.
const styles = [
  ["B40 OG Flat Bill", "brand-b40-og-flat-bill"],
  ["Teal Desert Camo", "teal-desert-camo"],
  ["Black Marble Lightning", "black-marble-lightning"],
  ["Red Camo", "red-camo"],
  ["Tan Topo", "tan-topo"],
  ["Blaze Leaf Camo", "blaze-leaf-camo"],
  ["Gold B40 Camo", "gold-b40-camo"],
  ["Black Gold Topo", "black-gold-topo"],
  ["Pink Topo", "pink-topo"],
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
  ["Forest Green", "b40-forest-green"],
].map(([name, file]) => ({ name, photos: [`/images/${file}.jpg`], category: "styles" }));

const trail = [
  { name: "Back 40 Loop", sub: "Bella Vista, AR", photos: ["/images/trail-back-40-loop.jpg"], category: "trail" },
  { name: "Back 40 Loop", sub: "Red, White & Blue", photos: ["/images/trail-back-40-loop-rwb.jpg"], category: "trail" },
  { name: "Little Sugar Trail", sub: "Bella Vista, AR", photos: ["/images/trail-little-sugar.jpg"], category: "trail" },
  { name: "Dragon Scales", sub: "Slaughter Pen, Bentonville", photos: ["/images/trail-dragon-scales.jpg"], category: "trail" },
];

// B40 Originals — artwork designed in-house. [name, photo file, number of photos]
const originals = [
  ["Back 40 Eagle", "orig-back-40-eagle"],
  ["Dante's Hat", "orig-dantes-hat"],
  ["Samurai", "orig-samurai"],
  ["Arkansas Skulls", "orig-arkansas-skulls"],
  ["'Merica", "orig-merica"],
  ["Pool is Life", "orig-pool-is-life", 2],
  ["Billiards", "orig-billiards"],
  ["Let Me Guess", "custom-just-looking"],
  ["Bogey Goblin", "orig-bogey-goblin", 1, "B40 Golf"],
].map(([name, file, n = 1, sub]) => ({
  name,
  sub,
  photos: n === 1 ? [`/images/${file}.jpg`] : Array.from({ length: n }, (_, i) => `/images/${file}-${i + 1}.jpg`),
  category: "originals",
}));

// Brand Work — grouped by client. [name, photo file, number of photos]
const brands = [
  ["Wood Motor Company", "brand-wood-motor", 6],
  ["Hyundai Bentonville", "brand-hyundai-bentonville"],
  ["Seven Lakes Church", "brand-seven-lakes", 3],
  ["New Light Electric", "brand-new-light-electric", 3],
  ["Complete Wheel Restoration", "brand-complete-wheel", 3],
  ["Woolbright Auto Glass", "brand-woolbright", 2],
  ["All American PDR", "brand-all-american-pdr"],
  ["Garrett X", "brand-garrett-x", 2],
  ["War Eagle Mill", "brand-war-eagle-mill", 2],
  ["The Hubcap Kid", "brand-hubcap-kid", 3],
  ["Lot Nine Billiards & Games", "brand-lot-nine"],
  ["Bearded Buffalo", "brand-bearded-buffalo"],
  ["Amor Patriae", "brand-amor-patriae"],
  ["Red Pig Hat Co", "brand-red-pig"],
  ["Tiddy Tuggerz", "brand-tiddy-tuggerz", 2],
  ["Webb Auto Remarketing", "brand-webb-auto"],
  ["LiveLife Financial", "brand-livelife-financial"],
  ["Pinnacle Sports Ventures", "brand-pinnacle-sports"],
  ["DT Apparel", "brand-dt-apparel"],
  ["Armed and Hammered", "brand-armed-and-hammered"],
  ["Board It", "brand-board-it"],
  ["Goober Golf", "brand-goober-golf"],
  ["Vagabond Coffee Bar", "brand-vagabond-coffee"],
  ["The Bread Lady", "brand-bread-lady"],
  ["Slick Rick's Grooming Co", "brand-slick-ricks"],
  ["Dust Daddy", "brand-dust-daddy"],
  ["Arkansas Fly Adventures", "brand-arkansas-fly"],
].map(([name, file, n = 1]) => ({
  name,
  photos: n === 1 ? [`/images/${file}.jpg`] : Array.from({ length: n }, (_, i) => `/images/${file}-${i + 1}.jpg`),
  category: "brand",
}));

// One-off custom builds. [name, photo file]
const custom = [
  ["Any Weather Any Sea", "brand-any-weather-any-sea"],
  ["We Flow Like Water Baby", "brand-we-flow"],
  ["FML Fishing", "brand-fml-fishing"],
].map(([name, file]) => ({ name, photos: [`/images/${file}.jpg`], category: "custom" }));

// Every photo gets its own card so visitors can see all the hats without clicking.
const hats = [...styles, ...originals, ...trail, ...brands, ...custom].flatMap((hat) =>
  hat.photos.map((photo) => ({ ...hat, photos: [photo] }))
);

const categories = {
  styles: { label: "B40 Styles", tag: "B40 Style", ask: "Want this style with your logo?" },
  originals: { label: "B40 Originals", tag: "B40 Original", ask: "Want original artwork like this for your hat?" },
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
  ["/#contact", "Custom Orders"],
];

export default function GalleryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const visible = filter === "all" ? hats : hats.filter((h) => h.category === filter);
  const open = openIndex === null ? null : visible[openIndex];
  const [photoIndex, setPhotoIndex] = useState(0);
  const count = (key) => (key === "all" ? hats.length : hats.filter((h) => h.category === key).length);
  const shownCategories = Object.entries(categories).filter(([key]) => count(key) > 0);

  const openHat = (i) => { setOpenIndex(i); setPhotoIndex(0); };
  // Arrows walk through every photo of a client, then move on to the next card.
  const go = (dir) => {
    const hat = visible[openIndex];
    const next = photoIndex + dir;
    if (next >= 0 && next < hat.photos.length) return setPhotoIndex(next);
    const i = (openIndex + dir + visible.length) % visible.length;
    setOpenIndex(i);
    setPhotoIndex(dir > 0 ? 0 : visible[i].photos.length - 1);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, photoIndex, visible]);

  const step = (dir) => (e) => {
    e.stopPropagation();
    go(dir);
  };

  return (
    <main className="relative w-full overflow-x-clip bg-black pb-20 text-white md:pb-0">

      {/* ── LIGHTBOX ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm" onClick={() => setOpenIndex(null)}>
          <button onClick={step(-1)} aria-label="Previous" className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-lg hover:bg-white/20 md:block">←</button>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.photos[photoIndex]} alt={open.name} className="max-h-[55vh] w-full rounded-xl object-contain" />
            {open.photos.length > 1 && (
              <div className="mt-3 flex justify-center gap-2">
                {open.photos.map((src, i) => (
                  <button key={src} onClick={() => setPhotoIndex(i)} className={`h-12 w-16 overflow-hidden rounded-md border-2 transition md:h-14 md:w-20 ${i === photoIndex ? "border-[#c6a36b]" : "border-transparent opacity-50 hover:opacity-100"}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-5 flex flex-col items-center gap-2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">{categories[open.category].tag}</p>
              <p className="text-3xl uppercase md:text-4xl" style={bebas}>{open.name}</p>
              {open.sub && <p className="-mt-1 text-sm text-white/50">{open.sub}</p>}
              <p className="mt-3 text-sm text-white/70">{categories[open.category].ask}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Link href={`/?hat=${encodeURIComponent(open.name)}#contact`} className="inline-flex items-center gap-2 bg-[#c6a36b] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
                  Start a Project →
                </Link>
                <a href={mailto(`Hat inquiry: ${open.name}`)} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:border-white/50">
                  Email Us
                </a>
                <a href={sms(`Hi! I'm interested in a hat like "${open.name}" from your gallery.`)} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:border-white/50">
                  Text Us
                </a>
              </div>
              <div className="mt-4 flex items-center gap-6 md:hidden">
                <button onClick={step(-1)} className="text-sm text-white/50">← Prev</button>
                <span className="text-xs text-white/30">{open.photos.length > 1 ? `${photoIndex + 1} / ${open.photos.length}` : `${openIndex + 1} / ${visible.length}`}</span>
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
            <Link href="/#contact" className="inline-flex items-center gap-1.5 rounded-2xl bg-[#c6a36b] px-3 py-2 text-xs font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4b07a] md:px-4 md:text-sm">
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
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">The Gallery</p>
            <h1 className="mb-6 text-6xl uppercase leading-[0.9] md:text-8xl" style={bebas}>
              Built to Be<br />Worn.
            </h1>
            <p className="mb-8 max-w-lg text-sm leading-7 text-white/60 md:text-base">
              Every hat here started with a story. Pick a style you like, send us your logo or idea, and we'll build it from there.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#c6a36b] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
                Start a Project →
              </Link>
              <a href={mailto()} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
                Email Us
              </a>
              <a href={sms()} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
                Text Us
              </a>
            </div>
          </div>
          {/* Hat is cut out onto pure black so it floats on the page; the mask fades out its reflection. */}
          <img
            src="/images/hero-teal-desert.jpg"
            alt="Teal Desert Camo B40 hat"
            className="w-full [-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent)] [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
          />
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
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-16 xl:px-0">
          {[["all", "All"], ...shownCategories.map(([k, c]) => [k, c.label])].map(([key, label]) => (
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
        <div className="mx-auto flex max-w-6xl flex-col">
          {shownCategories
            .filter(([key]) => filter === "all" || filter === key)
            .map(([key, { label }]) => (
              <div key={key} className="border-t border-[#c6a36b]/40 pb-12 pt-8 first:border-t-0 first:pt-0 md:pb-16 md:pt-10">
                <div className="mb-5 flex items-baseline justify-between md:mb-6">
                  <h2 className="text-3xl uppercase text-[#c6a36b] md:text-4xl" style={bebas}>{label}</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/35">{count(key)} {count(key) === 1 ? "hat" : "hats"}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                  {visible.filter((hat) => hat.category === key).map((hat) => (
                    <button
                      key={hat.photos[0]}
                      onClick={() => openHat(visible.indexOf(hat))}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition hover:-translate-y-0.5 hover:border-[#c6a36b]/50"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-black">
                        <img src={hat.photos[0]} alt={hat.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                      </div>
                      {hat.photos.length > 1 && (
                        <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#c6a36b] backdrop-blur">
                          {hat.photos.length} hats
                        </span>
                      )}
                      <div className="p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/85">{hat.name}</p>
                        <p className="mt-0.5 text-xs text-white/35">{hat.sub ?? categories[hat.category].tag}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
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
              ["01", "Reach out", "Email us or send the form. Tell us which style caught your eye."],
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
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#c6a36b] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
              Start a Project →
            </Link>
            <a href={mailto()} className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
              Email Us
            </a>
            <a href={sms()} className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
              Text Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/40 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href={sms()} className="transition hover:text-white">Text {PHONE}</a>
            <a href={mailto()} className="transition hover:text-white">{EMAIL}</a>
            <a href="https://www.instagram.com/b40_designs/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
            <Link href="/#contact" className="transition hover:text-white">Custom Orders</Link>
            <Link href="/" className="transition hover:text-white">Back to Home</Link>
          </div>
        </div>
      </footer>

      {/* ── MOBILE CONTACT BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
        <a href={sms()} className="py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white/85">Text Us</a>
        <a href={mailto()} className="border-l border-white/10 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white/85">Email Us</a>
        <Link href="/#contact" className="bg-[#c6a36b] py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-black">Start →</Link>
      </div>

    </main>
  );
}

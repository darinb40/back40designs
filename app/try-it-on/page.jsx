"use client";

import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import MobileContactBar from "../../components/MobileContactBar";
import HatTryOn from "../../components/HatTryOn";
import HatOdometer from "../../components/HatOdometer";
import { hatBrands } from "../../components/hatBrands";
import { smsLink, mailtoLink } from "../../components/contact";

const bebas = { fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" };

const options = [
  { title: "Hat Styles", items: ["7-panel snapback", "Mesh-back trucker", "Flat or curved bill"] },
  { title: "Fabrics", items: ["Duck & woodland camo", "Topo map prints", "Marble, solids & more"] },
  { title: "Patches", items: ["Your logo or artwork", "Filled with any pattern", "Shaped to fit your brand"] },
  { title: "Details", items: ["Rope accents", "Contrast bills & panels", "Your colors, start to finish"] },
];

const textMessage = "Hi! I'm interested in a custom hat.";

export default function TryItOnPage() {
  return (
    <main className="relative w-full overflow-x-clip bg-black pb-20 text-white md:pb-0">
      <SiteHeader position="fixed" active="Try It On" />

      {/* ── HERO ── */}
      <section className="relative px-6 pb-10 pt-28 md:px-16 md:pb-14 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Try It On</p>
            <h1 className="mb-6 text-6xl uppercase leading-[0.9] md:text-8xl" style={bebas}>
              Your Hat.<br />Your Way.
            </h1>
            <p className="mb-8 max-w-lg text-sm leading-7 text-white/60 md:text-base">
              Pick a shape, pick a material, drop in your logo, and see it on a hat before we ever make it.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#try-it-on" className="inline-flex items-center gap-2 bg-[#c6a36b] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
                Try It On ↓
              </a>
              <a href={smsLink(textMessage)} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
                Text Us
              </a>
              <a href={mailtoLink("Custom hat")} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white/50">
                Email Us
              </a>
            </div>
          </div>
          {/* Blank hat on the studio floor; the mask fades its edges into the page. */}
          <img
            src="/images/try-it-on/hero-blank-hat.jpg"
            alt="Blank black hat with a royal blue bill, ready for a patch"
            className="w-full [-webkit-mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]"
          />
        </div>
      </section>

      {/* ── WHAT YOU CAN CHOOSE ── */}
      <section className="border-y border-white/10 bg-[#080808] px-6 py-10 md:px-16 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Mix &amp; Match</p>
              <h2 className="text-4xl uppercase md:text-5xl" style={bebas}>What You Can Choose</h2>
            </div>
            <p className="max-w-sm text-sm text-white/50">Not sure what you want? Tell us the vibe and we&apos;ll put options in front of you.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {options.map(({ title, items }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
                <p className="mb-1.5 text-xl uppercase text-[#c6a36b]" style={bebas}>{title}</p>
                <ul className="space-y-0.5 text-sm text-white/60">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div id="brands" className="mt-2 scroll-mt-40 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 md:mt-3">
            <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <p className="text-xl uppercase text-[#c6a36b]" style={bebas}>Hat Brands We Carry</p>
              <p className="text-xs text-white/40">Don&apos;t see your favorite? Just ask.</p>
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-4 sm:grid-cols-6 lg:grid-cols-9">
              {hatBrands.map((brand) => (
                <div key={brand.name} className="flex h-10 items-center justify-center md:h-12">
                  <img src={brand.logo} alt={brand.name} title={brand.name} loading="lazy" className="max-h-full max-w-[85%] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PREVIEW ── */}
      <section id="try-it-on" className="scroll-mt-24 px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
            <h2 className="mb-2 text-4xl uppercase md:text-5xl" style={bebas}>Take It for a Test Drive</h2>
            <p className="mb-4 max-w-3xl text-sm leading-6 text-white/65 md:text-base">
              This is just a starting point. Real orders can be any hat, any shape, any color, any material. If you can dream it, we can probably build it.
            </p>
            </div>
            <HatOdometer />
          </div>
          <HatTryOn />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="px-6 py-14 md:px-16 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-2xl text-4xl uppercase leading-[0.95] md:text-5xl" style={bebas}>Know what you want, or no clue yet? Either way, reach out.</h2>
          <div className="flex gap-3">
            <a href={smsLink(textMessage)} className="bg-[#c6a36b] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">Text Us</a>
            <a href={mailtoLink("Custom hat")} className="border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition hover:border-white/50">Email Us</a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileContactBar textMessage={textMessage} emailSubject="Custom hat" />
    </main>
  );
}

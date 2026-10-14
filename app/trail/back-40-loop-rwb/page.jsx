"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import MobileContactBar from "../../../components/MobileContactBar";


export default function Back40LoopRWBPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const emailLink = `mailto:info@back40designco.com?subject=${encodeURIComponent("Trail Series: Back 40 Loop (Red, White & Blue)")}`;
  const textLink = `sms:+14795441366?&body=${encodeURIComponent("Hi! I\'m interested in the Back 40 Loop (Red, White & Blue) hat.")}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">

      <SiteHeader position="fixed" active="Trail Series" />

      {/* HERO */}
      <section className="relative h-[100vh] w-full">
        <img src="/images/trail-back-40-loop-rwb-hero.jpg" alt="Back 40 Loop Red White Blue" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 pt-20 md:px-16 md:pt-0">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">
              B40 Trail Series — Bella Vista, AR
            </p>
            <h1 className="mb-6 text-6xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-8xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
              Back 40<br />Loop
            </h1>
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] md:text-lg" style={{ color: "#B22234" }}>
              Red, White & Blue Edition
            </p>
            <p className="mb-10 max-w-sm text-sm leading-6 text-white/60 md:text-base">
              Same legendary trail. Different story. This one's for the riders who bleed red, white, and blue on every descent.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={emailLink} className="inline-flex items-center justify-center gap-2 bg-[#c6a36b] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
                Email Us About This Hat →
              </a>
              <a href={textLink} className="inline-flex items-center justify-center gap-2 border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-white/10">
                Text Us
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* TRAIL STATS */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "url('/images/trail-b40.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }} />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 Q200,40 400,90 T800,70 T1200,85 T1600,60" stroke="#c6a36b" strokeWidth="1" fill="none"/>
            <path d="M0,160 Q200,120 400,170 T800,150 T1200,165 T1600,140" stroke="#c6a36b" strokeWidth="1" fill="none"/>
            <path d="M0,240 Q200,200 400,250 T800,230 T1200,245 T1600,220" stroke="#c6a36b" strokeWidth="1" fill="none"/>
            <path d="M0,320 Q200,280 400,330 T800,310 T1200,325 T1600,300" stroke="#c6a36b" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="relative z-10 px-6 py-20 md:px-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.4em] text-[#c6a36b]">Trail Stats — Back 40 Loop</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { stat: "40", label: "Miles of Trail" },
                { stat: "2016", label: "Year Opened" },
                { stat: "6", label: "World-Class Builders" },
                { stat: "1,950ft", label: "Elevation Change" },
              ].map(({ stat, label }) => (
                <div key={label} className="rounded-xl border border-[#c6a36b]/15 bg-[#c6a36b]/5 px-4 py-8 text-center backdrop-blur-sm">
                  <p className="text-4xl font-black text-white md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>{stat}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a36b]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bg-black px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">

            {/* LEFT -- Hat image + buy button */}
            <div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-full blur-2xl" style={{ backgroundColor: "rgba(178,34,52,0.15)" }} />
                <img src="/images/trail-back-40-loop-rwb.jpg" alt="Back 40 Loop Red White Blue Hat" className="relative w-full rounded-xl object-cover shadow-2xl" />
                <div className="absolute bottom-4 left-4 rounded-lg bg-black/80 px-4 py-2 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6a36b]">Back 40 Loop</p>
                  <p className="text-xs text-white/60">Red, White & Blue Edition</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Limited Run — Small Batch</p>
                <a href={emailLink} className="inline-flex w-full items-center justify-center gap-2 bg-[#c6a36b] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">Email Us About This Hat →</a>
                <a href={textLink} className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-white/30 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-white/10">Text Us</a>
              </div>
            </div>

            {/* RIGHT -- Story + specs */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">The Story</p>
              <h2 className="mb-6 text-4xl font-black uppercase leading-tight md:text-5xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
                Built on the<br />Same Dirt.<br />Worn with Pride.
              </h2>
              <div className="space-y-4 text-sm leading-7 text-white/60 md:text-base">
                <p>The Back 40 Loop is the backbone of mountain biking in Northwest Arkansas. Forty miles of Ozark singletrack built by six of the best trail builders in the country and opened in 2016 -- it's the trail that proved NWA belonged on the national stage.</p>
                <p>This Red, White & Blue edition is a different expression of the same story. The limestone bluffs, the creek crossings, the berms that drop into valleys -- all of it captured in a colorway that runs as deep as the people who built this place.</p>
                <p>Two hats. One trail. Your call which one tells your story.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Patch", value: "Layered Acrylic" },
                  { label: "Style", value: "Snapback" },
                  { label: "Location", value: "Bella Vista, AR" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-l-2 pl-3" style={{ borderColor: "#B22234" }}>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6a36b]">{label}</p>
                    <p className="text-sm text-white/80">{value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OTHER TRAIL HATS */}
      <section className="bg-black px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36b]">More From the Trail Series</p>
          <h2 className="mb-10 text-3xl font-black uppercase md:text-4xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
            More Trails. More Stories.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { name: "Back 40 Loop", sub: "Black Edition", href: "/trail/back-40-loop", img: "/images/trail-back-40-loop.jpg" },
              { name: "Little Sugar Trail", sub: "Bella Vista, AR", href: "/trail/little-sugar", img: "/images/trail-little-sugar.jpg" },
              { name: "Dragon Scales", sub: "Slaughter Pen, Bentonville", href: "/trail/dragon-scales", img: "/images/trail-dragon-scales.jpg" },
            ].map(({ name, sub, href, img }) => (
              <Link key={sub} href={href} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#c6a36b]/50">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={img} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6a36b]">{name}</p>
                  <p className="mt-1 text-xs text-white/50">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileContactBar textMessage="Hi! I'm interested in the Back 40 Loop (Red, White & Blue) hat." emailSubject="Trail Series: Back 40 Loop (Red, White & Blue)" />

    </main>
  );
}

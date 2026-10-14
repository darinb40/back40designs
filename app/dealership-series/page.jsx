"use client";

import React from "react";
import Link from "next/link";

// The whole Dealership Series on one page, grouped by lane.
const lanes = [
  {
    id: "front-line",
    eyebrow: "Public Lane",
    title: "Front Line",
    text: "Clean dealership-focused headwear built for salespeople, managers, and customer-facing teams.",
    hats: [
      { name: "Sticker is Quicker", text: "How many hats would you buy if all your customers paid sticker?", image: "/images/sticker-is-quicker.jpg" },
      { name: "Board It! (Classic)", text: "The moment every salesperson lives for. When the deal sticks and the board gets another name on it.", image: "/images/board-it-car-web.jpg" },
      { name: "Board It! (Crown)", text: "Same energy. Different look. For the closer who's been putting names on boards long enough to wear the crown.", image: "/images/board-it-crown.jpg" },
      { name: "We Fina C", text: "We finna see. Every F&I manager, desk guy, and closer knows exactly what this means.", image: "/images/we-finance.jpg" },
    ],
  },
  {
    id: "service-bay",
    eyebrow: "Fixed Ops",
    title: "Service Bay",
    text: "Built for advisors, techs, and the people who keep the store moving.",
    hats: [
      { name: "I Don't Work For Free", subtitle: "Flat rate. Every flag hour counts.", text: "Built for the techs who know exactly what their time is worth and aren't shy about it.", image: "/images/free-work.jpg" },
      { name: "Who Traded For This Piece of $#!T?", subtitle: "Someone upfront made a bad call.", text: "For the tech who pulls a car into the bay and immediately knows the whole story.", image: "/images/pos.jpg" },
      { name: "Cross Threaded Is Threaded", subtitle: "It's in there. That's what matters.", text: "Shop floor logic. You either get it or you don't.", image: "/images/cross-thread.jpg" },
    ],
  },
  {
    id: "back-lot",
    eyebrow: "Closer Lane",
    title: "Back Lot",
    text: "Insider language. Closer energy. Built for the ones who have earned the right to wear it.",
    hats: [
      { name: "Hold Gross", subtitle: "No discounts given.", text: "For the ones who know the difference between a deal and a donation. Hold the line.", image: "/images/hold-gross.jpg" },
      { name: "Let Me Guess / Just Looking / Not Buying Today", subtitle: "The line every closer has heard.", text: "Three sentences. One customer. Said it on a Tuesday and drove home in a new car.", image: "/images/let-me-guess.jpg" },
      { name: "Switch and Get Rich", subtitle: "Different unit. Better gross.", text: "The one you picked is solid. But let me show you something that actually fits you better. *cough*", image: "/images/switch-skull.jpg" },
      { name: "Down the Road Motors", subtitle: "\"They said they can do it for less.\"", text: "Est. Never. Located in Somewhere Elseville, USA. They've never actually been there — but somehow, some way... they always can.", image: "/images/down-the-road.jpg" },
    ],
  },
];

const mailto = (subject) => `mailto:info@back40designco.com?subject=${encodeURIComponent(subject)}`;
// Texts open the visitor's messages app with a starter message they can edit.
const sms = (message) => `sms:+14795441366?&body=${encodeURIComponent(message)}`;

const menuLinks = [
  ["/dealership-series#front-line", "Front Line"],
  ["/dealership-series#service-bay", "Service Bay"],
  ["/dealership-series#back-lot", "Back Lot"],
  ["/dealership-series/green-pea-guide", "Green Pea Guide"],
  ["/lot-stretcher", "Lot Stretcher"],
];

export default function DealershipSeriesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState(false);
  const instagramLink = "https://www.instagram.com/b40_designs/";
  const emailLink = mailto("Dealership Series hats");
  const textLink = sms("Hi! I'm interested in Dealership Series hats.");

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-black pb-14 text-white md:pb-0">

      {/* Background: the B40 Service Bay garage */}
      <div className="fixed inset-0 z-0 bg-[url('/images/service-bay-bg.jpg')] bg-cover bg-center" />
      <div className="fixed inset-0 z-0 bg-black/55" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />

      <div className="relative z-10">

        {/* HEADER */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
            <Link href="/">
              <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
              <div className="relative group">
                <Link href="/dealership-series" className="text-white font-semibold">Dealership Series</Link>
                <div className="absolute left-0 top-full mt-0 hidden w-60 flex-col rounded-xl border border-white/10 bg-black/95 p-2 pt-5 backdrop-blur-md shadow-2xl group-hover:flex before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']">
                  {menuLinks.map(([href, label]) => (
                    <Link key={label} href={href} className="rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-white">{label}</Link>
                  ))}
                </div>
              </div>
              <Link href="/trail-series" className="transition hover:text-white">Trail Series</Link>
              <Link href="/#process" className="transition hover:text-white">Process</Link>
              <Link href="/gallery" className="transition hover:text-white">Gallery</Link>
              <Link href="/#story" className="transition hover:text-white">Story</Link>
              <Link href="/#contact" className="transition hover:text-white">Contact</Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <a href={emailLink} className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100 md:px-4 md:text-sm">
                Email Us →
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden" aria-label="Toggle menu">
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
              <nav className="flex flex-col gap-4 text-sm text-stone-300">
                <div className="border-b border-white/5 pb-3">
                  <button type="button" onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} className="flex w-full items-center justify-between text-left transition hover:text-white">
                    <span>Dealership Series</span>
                    <span className="text-white/50">{mobileDropdownOpen ? "−" : "+"}</span>
                  </button>
                  {mobileDropdownOpen && (
                    <div className="mt-3 ml-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white/70">
                      {menuLinks.map(([href, label]) => (
                        <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="transition hover:text-white">{label}</Link>
                      ))}
                    </div>
                  )}
                </div>
                {[
                  ["/trail-series", "Trail Series"],
                  ["/#process", "Process"],
                  ["/gallery", "Gallery"],
                  ["/#story", "Story"],
                  ["/#contact", "Contact"],
                ].map(([href, label]) => (
                  <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label}</Link>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="px-5 pb-10 pt-8 md:px-10 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">B40 Dealership Series</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">Built inside the car business.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:text-xl">
                A dealership-driven headwear line built for the people on the floor, at the desk, in finance, and in the service bay.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {lanes.map((lane) => (
                  <a key={lane.id} href={`#${lane.id}`} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                    {lane.title} ↓
                  </a>
                ))}
                <a href={emailLink} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-stone-100 sm:w-auto">
                  Email Us →
                </a>
                <a href={textLink} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-black/30 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                  Text Us
                </a>
              </div>
              <div className="mt-5">
                <Link href="/lot-stretcher" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-white/35 transition hover:border-white/25 hover:text-white/60 sm:w-auto">
                  Go find the lot stretcher →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* THE HATS, BY LANE */}
        {lanes.map((lane) => (
          <section key={lane.id} id={lane.id} className="scroll-mt-24 px-5 pb-12 md:px-10 md:pb-16">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 max-w-3xl rounded-2xl border border-white/5 bg-black/40 p-5 backdrop-blur-sm sm:p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">{lane.eyebrow}</p>
                <h2 className="mt-2 text-3xl font-semibold sm:text-4xl md:text-5xl">{lane.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/75 md:text-base">{lane.text}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {lane.hats.map((hat) => (
                  <div key={hat.name} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm">
                    <img src={hat.image} alt={hat.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">{lane.title}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{hat.name}</h3>
                      {hat.subtitle && <p className="mt-1 text-sm italic text-white/55">{hat.subtitle}</p>}
                      <p className="mb-5 mt-2 flex-1 text-sm leading-6 text-white/75">{hat.text}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <a href={mailto(`Dealership Series: ${hat.name}`)} className="inline-flex items-center justify-center rounded-2xl bg-white px-3 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-stone-100">
                          Email Us
                        </a>
                        <a href={sms(`Hi! I'm interested in the ${hat.name} hat.`)} className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-3 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                          Text Us
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* EMAIL CTA */}
        <section className="px-5 pb-10 md:px-10 md:pb-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 rounded-2xl border border-[#c6a36b]/30 bg-black/60 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-[#c6a36b]">Get in touch</p>
                <h3 className="text-2xl font-semibold text-white">Want these for your team or your store?</h3>
                <p className="mt-1 text-sm text-white/60">One hat or a full team order. Email us and we&apos;ll take it from there. Built by hand in Bella Vista, AR.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={emailLink} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-stone-100">
                  Email Us →
                </a>
                <a href={textLink} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                  Text Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CREDIBILITY */}
        <section className="px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 rounded-2xl border border-white/5 bg-black/60 p-6 backdrop-blur-sm sm:p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/55">Built from experience</p>
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl md:text-5xl">Built by someone who&apos;s actually been inside the store.</h2>
              </div>
              <div className="space-y-4 text-base leading-7 text-white/85 sm:text-lg">
                <p>15+ years. Sales floor. Finance. Management.</p>
                <p className="text-xl font-semibold text-white">I&apos;ve worn almost every hat you can wear in a dealership — I know which ones get worn, and which never make it past the desk.</p>
                <p>I&apos;ve desked deals, spot-delivered questionable ones, loaded up trades and paid for it at the auction, chased stips, flipped coins for $500, stayed two hours after close just to watch a deal fall apart in finance — and I&apos;ve gotten deals hung when no one thought it was possible.</p>
                <p>I&apos;ve also trained and worked alongside some damn good people — some of the best. That&apos;s why I believe you should look good, feel good, and be proud of what you wear.</p>
                <p>Most dealership gear gets ordered out of necessity — and worn the same way.</p>
                <p>That&apos;s why when I say I know what actually moves inside a dealership — I know what does and what doesn&apos;t.</p>
                <p className="pt-2 font-semibold text-white">This was built on purpose.<br />For you. By one of you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/60 px-5 py-8 text-sm text-white/40 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <a href={textLink} className="transition hover:text-white">Text 479-544-1366</a>
              <a href="mailto:info@back40designco.com" className="transition hover:text-white">Email</a>
              <a href={instagramLink} target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
              <Link href="/lot-stretcher" className="transition hover:text-white">Lot Stretcher</Link>
              <Link href="/" className="transition hover:text-white">Back to Home</Link>
            </div>
          </div>
        </footer>

      </div>

      {/* MOBILE CONTACT BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
        <a href={textLink} className="py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white/85">Text Us</a>
        <a href={emailLink} className="bg-[#c6a36b] py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-black">Email Us</a>
      </div>
    </main>
  );
}

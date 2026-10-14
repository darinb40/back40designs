"use client";

import { useState } from "react";
import Link from "next/link";

// The one menu used on every page. `position` keeps each page's existing
// layout: "sticky" sits above the content, "fixed"/"absolute" float over a hero.
const dealershipLinks = [
  ["/dealership-series#front-line", "Front Line"],
  ["/dealership-series#service-bay", "Service Bay"],
  ["/dealership-series#back-lot", "Back Lot"],
  ["/dealership-series/green-pea-guide", "Green Pea Guide"],
  ["/lot-stretcher", "Lot Stretcher"],
];

const menu = [
  ["/gallery", "Gallery"],
  ["/try-it-on", "Try It On"],
  ["/trail-series", "Trail Series"],
  ["/dealership-series", "Dealership Series"],
  ["/#story", "Our Story"],
  ["/#contact", "Custom Orders"],
];

export default function SiteHeader({ position = "sticky", active }) {
  const [open, setOpen] = useState(false);
  const [dealerOpen, setDealerOpen] = useState(false);
  const place = position === "sticky" ? "sticky top-0" : `${position} top-0 left-0 right-0`;
  const linkClass = (label) =>
    label === active ? "font-semibold text-[#c6a36b]" : "text-stone-300 transition hover:text-white";

  return (
    <header className={`${place} z-40 border-b font-sans border-white/10 bg-black/90 backdrop-blur`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
        <Link href="/">
          <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {menu.map(([href, label]) =>
            label === "Dealership Series" ? (
              <div key={label} className="group relative">
                <Link href={href} className={linkClass(label)}>{label}</Link>
                <div className="absolute left-0 top-full hidden w-56 flex-col rounded-xl border border-white/10 bg-black/95 p-2 pt-4 shadow-2xl backdrop-blur-md before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-[''] group-hover:flex">
                  {dealershipLinks.map(([subHref, subLabel]) => (
                    <Link key={subLabel} href={subHref} className="rounded-lg px-4 py-2.5 text-stone-300 transition hover:bg-white/5 hover:text-white">{subLabel}</Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={label} href={href} className={linkClass(label)}>{label}</Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/#contact" className="inline-flex items-center gap-1.5 rounded-2xl bg-[#c6a36b] px-3 py-2 text-xs font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4b07a] md:px-4 md:text-sm">
            Start a Project →
          </Link>
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden" aria-label="Toggle menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm">
            {menu.map(([href, label]) =>
              label === "Dealership Series" ? (
                <div key={label} className="border-b border-white/5 pb-3">
                  <button type="button" onClick={() => setDealerOpen(!dealerOpen)} className={`flex w-full items-center justify-between text-left ${linkClass(label)}`}>
                    <span>{label}</span>
                    <span className="text-white/50">{dealerOpen ? "−" : "+"}</span>
                  </button>
                  {dealerOpen && (
                    <div className="ml-4 mt-3 flex flex-col gap-3 text-stone-400">
                      {[["/dealership-series", "All Dealership Hats"], ...dealershipLinks].map(([subHref, subLabel]) => (
                        <Link key={subLabel} href={subHref} onClick={() => setOpen(false)} className="transition hover:text-white">{subLabel}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={label} href={href} onClick={() => setOpen(false)} className={`border-b border-white/5 pb-3 ${linkClass(label)}`}>{label}</Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

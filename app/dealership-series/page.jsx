```jsx
"use client";

import React from "react";
import Link from "next/link";

const ArrowRight = ({ className = "h-4 w-4" }) => (
  <span className={className}>→</span>
);

const LockIcon = ({ className = "h-4 w-4" }) => (
  <span className={className}>🔒</span>
);

export default function DealershipSeriesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";
  const instagramLink = "https://www.instagram.com/b40_designs/";

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-black text-white">
      
      <style jsx global>{`
        @keyframes b40HeadlightPass {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          28% { opacity: 0.14; }
          42% { opacity: 0.06; }
          56% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        @keyframes b40SecondHeadlightPass {
          0% { transform: translateX(140%) skewX(16deg); opacity: 0; }
          60% { opacity: 0.1; }
          74% { opacity: 0.05; }
          88% { transform: translateX(-140%) skewX(16deg); opacity: 0; }
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 bg-[url('/images/firefly-dealership.png')] bg-cover bg-center" />
      <div className="fixed inset-0 z-0 bg-black/20" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/45 via-transparent to-black/20" />

      {/* LIGHT EFFECTS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[18%] left-0 h-[42vh] w-[55vw] bg-gradient-to-r from-transparent via-white/15 to-transparent blur-2xl animate-[b40HeadlightPass_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-[12%] right-0 h-[32vh] w-[45vw] bg-gradient-to-r from-transparent via-amber-200/10 to-transparent blur-2xl animate-[b40SecondHeadlightPass_22s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10">

        {/* HEADER */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
            
            <Link href="/">
              <img src="/images/b402026.png" className="h-10 md:h-12" />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">

              <Link href="/#collections" className="hover:text-white">Collections</Link>

              {/* DROPDOWN */}
              <div className="relative group">
                <Link href="/dealership-series" className="text-white font-semibold">
                  Dealership Series
                </Link>

                <div className="absolute left-0 top-full mt-3 hidden w-60 flex-col rounded-xl border border-white/10 bg-black/90 backdrop-blur-md group-hover:flex">

                  <Link href="/dealership-series/front-line" className="px-4 py-3 hover:bg-white/5 hover:text-white">
                    Front Line
                  </Link>

                  <Link href="/dealership-series/service-bay" className="px-4 py-3 hover:bg-white/5 hover:text-white">
                    Service Bay
                  </Link>

                  <Link href="/dealership-series/backlot" className="px-4 py-3 hover:bg-white/5 hover:text-white">
                    Back Lot 🔒
                  </Link>

                  <Link href="/dealership-series/green-pea-guide" className="px-4 py-3 hover:bg-white/5 hover:text-white">
                    Green Pea Guide
                  </Link>

                  <Link href="/lot-stretcher" className="px-4 py-3 hover:bg-white/5 hover:text-white">
                    Lot Stretcher
                  </Link>

                </div>
              </div>

              <Link href="/trail-series" className="hover:text-white">Trail Series</Link>
              <Link href="/#process" className="hover:text-white">Process</Link>
              <Link href="/gallery" className="hover:text-white">Gallery</Link>
              <Link href="/#story" className="hover:text-white">Story</Link>
              <Link href="/#contact" className="hover:text-white">Contact</Link>

            </nav>

            {/* BUTTONS */}
            <div className="flex items-center gap-3">
              <a href={shopLink} target="_blank" className="hidden md:inline-flex border px-4 py-2 rounded-xl">
                Shop
              </a>

              <Link href="/#contact" className="bg-white text-black px-4 py-2 rounded-xl">
                Start →
              </Link>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                ☰
              </button>
            </div>

          </div>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
              <nav className="flex flex-col gap-4">

                {[
                  ["/#collections", "Collections"],
                  ["/dealership-series", "Dealership Series"],
                  ["/dealership-series/front-line", "Front Line"],
                  ["/dealership-series/service-bay", "Service Bay"],
                  ["/dealership-series/backlot", "Back Lot"],
                  ["/dealership-series/green-pea-guide", "Green Pea Guide"],
                  ["/lot-stretcher", "Lot Stretcher"],
                  ["/trail-series", "Trail Series"],
                  ["/#process", "Process"],
                  ["/gallery", "Gallery"],
                  ["/#story", "Story"],
                  ["/#contact", "Contact"],
                ].map(([href, label]) => (
                  <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)}>
                    {label}
                  </Link>
                ))}

              </nav>
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="px-5 py-10 md:px-10">
          <h1 className="text-5xl md:text-7xl font-bold">
            Built inside the car business.
          </h1>
        </section>

      </div>
    </main>
  );
}
```

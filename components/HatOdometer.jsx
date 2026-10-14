"use client";

import { useEffect, useState } from "react";

// Old gas-pump style counter of hats saved on the Hat Maker. Reads the total from
// /api/hat-count, and rolls forward when HatTryOn announces a new save
// (a "hat-count" event on window).
const bebas = { fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" };
const DIGITS = 6;

function Wheel({ digit }) {
  return (
    <div className="relative h-14 w-10 overflow-hidden rounded-[3px] bg-[#efe6cf] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)] md:h-20 md:w-14">
      <div className="transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `translateY(-${digit * 10}%)` }}>
        {Array.from({ length: 10 }, (_, n) => (
          <div key={n} className="flex h-14 items-center justify-center text-5xl leading-none text-[#1b1b1b] md:h-20 md:text-7xl" style={bebas}>{n}</div>
        ))}
      </div>
      {/* curved-drum shading: darker at the top and bottom edges */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0)_28%,rgba(255,255,255,0.18)_50%,rgba(0,0,0,0)_72%,rgba(0,0,0,0.45))]" />
    </div>
  );
}

export default function HatOdometer() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/hat-count").then((r) => r.json()).then((d) => d.count != null && setCount(d.count)).catch(() => {});
    const onSave = (e) => setCount(e.detail);
    window.addEventListener("hat-count", onSave);
    return () => window.removeEventListener("hat-count", onSave);
  }, []);

  if (count == null) return null;
  const digits = String(count).padStart(DIGITS, "0").slice(-DIGITS).split("").map(Number);

  return (
    <div className="flex flex-col items-start lg:items-end" aria-label={`${count} hats designed`}>
      <div className="rounded-xl border-2 border-[#3a3a3a] bg-gradient-to-b from-[#2a2a2a] to-[#121212] p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] md:p-3">
        <div className="flex gap-1 rounded-md bg-black p-1.5 md:gap-1.5 md:p-2">
          {digits.map((d, i) => <Wheel key={i} digit={d} />)}
        </div>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">
        {count > 0 ? "Hats Designed" : "Hats Designed · Be the first!"}
      </p>
    </div>
  );
}

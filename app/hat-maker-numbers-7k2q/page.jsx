"use client";

import { useEffect, useState } from "react";

// How the Hat Maker is doing: visits, saved hats, and how many people reached out.
const bebas = { fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" };

const ROWS = [
  ["view", "Visits to the Hat Maker", "one per visit"],
  ["save", "Hats saved (Snap a Pic)", "the odometer number"],
  ["send_open", "Opened the Send Design form", ""],
  ["send", "Designs sent to B40", "these land in your email"],
  ["text_darin", "Tapped Send It to Darin", "opens a text; they may not hit send"],
  ["text_kayla", "Tapped Send It to Kayla", "opens a text; they may not hit send"],
  ["email", "Tapped Email Us", "opens an email; they may not hit send"],
  ["share", "Copied a share link", ""],
];

export default function HatMakerNumbers() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("/api/hat-stats", { cache: "no-store" }).then((r) => r.json()).then((d) => (d.error ? setError(true) : setStats(d))).catch(() => setError(true));
  }, []);

  const reached = stats ? stats.send + stats.text_darin + stats.text_kayla + stats.email : 0;
  const pct = (n) => (stats && stats.view ? `${Math.round((n / stats.view) * 100)}%` : "–");

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white md:px-16">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a36b]">Private · B40 only</p>
        <h1 className="mb-2 text-5xl uppercase" style={bebas}>Hat Maker Numbers</h1>
        <p className="mb-8 text-sm text-white/55">Totals since tracking started. No names or personal info, just counts. Refresh to update.</p>
        {error && <p className="text-red-300">Couldn&apos;t load the numbers right now.</p>}
        {!stats && !error && <p className="text-white/50">Loading…</p>}
        {stats && (
          <>
            <div className="mb-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#c6a36b]/50 bg-[#c6a36b]/10 p-5">
                <p className="text-5xl" style={bebas}>{reached}</p>
                <p className="text-sm text-white/70">people reached out from the Hat Maker</p>
              </div>
              <div className="rounded-xl border border-white/15 p-5">
                <p className="text-5xl" style={bebas}>{pct(reached)}</p>
                <p className="text-sm text-white/70">of visits reached out</p>
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <tbody>
                {ROWS.map(([key, label, note]) => (
                  <tr key={key} className="border-t border-white/10">
                    <td className="py-3 pr-4">
                      {label}
                      {note && <span className="block text-xs text-white/40">{note}</span>}
                    </td>
                    <td className="py-3 text-right text-3xl" style={bebas}>{stats[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </main>
  );
}

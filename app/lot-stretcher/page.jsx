"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LotStretcherPage() {
  const [stage, setStage] = useState("loading");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStage("reveal"), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (stage === "reveal") {
      const t = setTimeout(() => setShowText(true), 200);
      return () => clearTimeout(t);
    }
  }, [stage]);

  if (stage === "loading") {
    return (
      <main className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <p className="text-xs mb-4 opacity-60">
            B40 SYSTEM // BACK LOT UTILITIES
          </p>

          <p className="mb-2">Initializing Lot Stretcher Module...</p>
          <p className="mb-2">Checking inventory spread...</p>
          <p className="mb-2">Calibrating lot width...</p>
          <p className="mb-2">Extending asphalt boundaries...</p>
          <p className="mb-2 text-red-400">ERROR: USER NOT QUALIFIED</p>

          <div className="mt-6 h-2 w-full bg-white/10">
            <div className="h-full bg-green-400 animate-pulse w-full" />
          </div>

          <p className="mt-4 text-sm opacity-70">Please wait...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-white/30 mb-6">
          Back Lot Utility Dept.
        </p>

        <h1
          className={`text-5xl md:text-7xl font-black mb-6 tracking-tight ${
            showText ? "animate-flicker" : "opacity-0"
          }`}
        >
          Seriously?
        </h1>

        <p className="text-sm text-white/40 mb-12">
          If you have to ask…
          <br />
          you’re not ready for the Back Lot.
          <br />
          Come back after your first real Saturday.
        </p>

        <Link
          href="/training-room"
          className="text-sm text-white/50 hover:text-white transition"
        >
          ← Back to the Back Lot
        </Link>
      </div>
    </main>
  );
}

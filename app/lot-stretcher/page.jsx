"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LotStretcherPage() {
  const [stage, setStage] = useState("loading");
  const [showText, setShowText] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const sequence = [
      "Initializing Lot Stretcher Module...",
      "Checking inventory spread...",
      "Scanning back row alignment...",
      "Calibrating lot width...",
      "Extending asphalt boundaries...",
      "Verifying manager approval...",
      "Manager approval not found.",
      "Re-running calculations...",
      "ERROR: USER NOT QUALIFIED",
    ];

    const timers = [];

    sequence.forEach((line, i) => {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, i * 850);

      timers.push(timer);
    });

    const revealTimer = setTimeout(() => {
      setStage("reveal");
    }, sequence.length * 850 + 1400);

    timers.push(revealTimer);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (stage === "reveal") {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  if (stage === "loading") {
    const progress = Math.min((lines.length / 9) * 100, 100);

    return (
      <main className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center px-6">
        <div className="max-w-xl w-full border border-green-400/20 bg-green-400/5 p-6">
          <div className="flex items-center justify-between border-b border-green-400/20 pb-4 mb-6">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60">
              B40 SYSTEM // BACK LOT UTILITIES
            </p>

            <p className="text-[10px] text-green-300/60">
              v0.40
            </p>
          </div>

          <div className="min-h-[240px] space-y-2 text-sm">
            {lines.map((line, i) => {
              const isError = line.includes("ERROR");
              const isWarning = line.includes("not found");

              return (
                <p
                  key={i}
                  className={
                    isError
                      ? "text-red-400"
                      : isWarning
                      ? "text-yellow-300"
                      : "text-green-400/80"
                  }
                >
                  <span className="text-green-400/40 mr-2">
                    {String(i + 1).padStart(2, "0")}:
                  </span>
                  {line}
                </p>
              );
            })}

            <p className="text-green-400 animate-pulse">▌</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-green-400/50 mb-2">
              <span>Process</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-2 w-full bg-white/10 overflow-hidden border border-green-400/20">
              <div
                className="h-full bg-green-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-green-400/50">
            Please wait while the system determines if you know what a lot stretcher is...
          </p>
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
          className="inline-block border border-white/20 px-5 py-3 text-sm text-white/60 hover:text-white hover:border-white/50 transition"
        >
          Begin Remedial Training
        </Link>
      </div>
    </main>
  );
}

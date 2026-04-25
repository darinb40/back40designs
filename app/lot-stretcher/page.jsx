"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LotStretcherPage() {
  const [stage, setStage] = useState("loading");
  const [showText, setShowText] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const sequence = [
      "Checking detail...",
      "Scanning back row...",
      "Walking to service...",
      "Searching trade row...",
      "Asking floor manager...",
      "Sent to dealership across the street...",
      "Checking their back lot...",
      "Got laughed at.",
      "Sent back to dealership...",
      "Finding desk manager...",
      "Verifying approval...",
      "Manager approval not found.",
      "Contacting GSM...",
      "GSM response received: “Who hired this guy?”",
      "Escalating to GM...",
      "GM response received.",
      "Re-running job qualifications...",
      "Failure confirmed.",
      "ERROR: USER NOT QUALIFIED",
    ];

    const timers = [];

    sequence.forEach((line, i) => {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, i * 1500);

      timers.push(timer);
    });

    const revealTimer = setTimeout(() => {
      setStage("reveal");
    }, sequence.length * 1500 + 1400);

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
    const progress = Math.min((lines.length / 19) * 100, 100);
    const hasError = lines.some((line) => line.includes("ERROR"));

    return (
      <main
        className={`relative min-h-screen overflow-hidden bg-black text-green-400 font-mono flex items-center justify-center px-6 ${
          hasError ? "animate-glitch" : ""
        }`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:100%_4px]" />
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-green-400/10 to-transparent animate-scan" />
        </div>

        {hasError && (
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none" />
        )}

        <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] text-green-400/30">
          LOT CAM 04
        </div>

        <div className="absolute top-5 right-5 text-[10px] tracking-[0.3em] text-green-400/30">
          BACK ROW
        </div>

        <div className="absolute bottom-5 left-5 text-[10px] tracking-[0.3em] text-green-400/20">
          ACCESS CHECK
        </div>

        <div className="relative z-10 max-w-xl w-full border border-green-400/20 bg-black/75 backdrop-blur-sm p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-green-400/20 pb-4 mb-6">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60">
              B40 SYSTEM // BACK LOT UTILITIES
            </p>

            <p className="text-[10px] text-green-300/60">v0.40</p>
          </div>

          <div className="min-h-[320px] space-y-2 text-sm">
            {lines.map((line, i) => {
              const isError = line.includes("ERROR");
              const isWarning =
                line.includes("not found") ||
                line.includes("laughed") ||
                line.includes("Who hired");

              return (
                <p
                  key={i}
                  className={
                    isError
                      ? "text-red-400 font-bold"
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
                className={`h-full transition-all duration-500 ${
                  hasError ? "bg-red-500" : "bg-green-400"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-green-400/50">
            Please wait while the system determines if you know what a lot
            stretcher is...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.16),transparent_55%)]" />

      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:100%_5px]" />

      <div className="relative z-10 max-w-xl text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-red-400/40 mb-6">
          Access Denied
        </p>

        <h1
          className={`text-6xl md:text-8xl font-black mb-6 tracking-tight ${
            showText ? "animate-flicker" : "opacity-0"
          }`}
        >
          Seriously?
        </h1>

        <p className="text-sm text-white/40 mb-8 leading-relaxed">
          If you have to ask what a lot stretcher is…
          <br />
          <br />
          you’re not ready for the Back Lot.
        </p>

        <p className="mb-10 text-[10px] tracking-[0.35em] text-white/20">
          NOT YET.
        </p>

        <Link
          href="/training-room"
          className="inline-block border border-red-400/30 bg-red-400/5 px-6 py-3 text-xs text-red-200/70 hover:text-white hover:border-red-300/70 transition uppercase tracking-[0.25em]"
        >
          go train
        </Link>
      </div>
    </main>
  );
}

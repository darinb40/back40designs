"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function LotStretcherPage() {
  const [stage, setStage] = useState("loading");
  const [showText, setShowText] = useState(false);
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [stalled, setStalled] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);

  const sequence = [
    "Initializing lot search...",
    "Checking detail bay...",
    "Scanning back row...",
    "Walking to service...",
    "Searching trade row...",
    "Asking floor manager...",
    "Floor manager unavailable. On a smoke break.",
    "Sent to dealership across the street...",
    "Checking their back lot...",
    "Got laughed at.",
    "Sent back to dealership...",
    "Pulling CarFax on lot stretcher...",
    "No records found.",
    "Contacting previous owner...",
    "Previous owner: also looking for lot stretcher.",
    "Running credit on request...",
    "Credit declined.",
    "Finding desk manager...",
    "Verifying approval...",
    "Manager approval not found.",
    "Contacting GSM...",
    "GSM response received: \"Who hired this guy?\"",
    "Escalating to GM...",
    "GM response received.",
    "Re-running job qualifications...",
    "Failure confirmed.",
    "ERROR: USER NOT QUALIFIED",
  ];

  // Progress stall happens at line 13 (roughly 50%)
  const STALL_AT_LINE = 13;
  const STALL_DURATION = 5000;

  useEffect(() => {
    const timers = [];
    let totalDelay = 0;

    sequence.forEach((line, i) => {
      const delay = totalDelay;
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (i < STALL_AT_LINE) {
          setProgress(Math.round((i / sequence.length) * 100));
        }
      }, delay);
      timers.push(timer);

      // Add stall after line STALL_AT_LINE
      if (i === STALL_AT_LINE) {
        totalDelay += 1500;
        // Trigger stall
        const stallTimer = setTimeout(() => {
          setStalled(true);
          setProgress(Math.round((STALL_AT_LINE / sequence.length) * 100));
        }, totalDelay);
        timers.push(stallTimer);
        totalDelay += STALL_DURATION;
        // Resume after stall
        const resumeTimer = setTimeout(() => {
          setStalled(false);
        }, totalDelay);
        timers.push(resumeTimer);
      } else {
        totalDelay += 1500;
        if (i > STALL_AT_LINE) {
          const progressTimer = setTimeout(() => {
            setProgress(Math.round((i / sequence.length) * 100));
          }, totalDelay - 750);
          timers.push(progressTimer);
        }
      }
    });

    const revealTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setStage("reveal"), 1400);
    }, totalDelay + 1500);
    timers.push(revealTimer);

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (stage === "reveal") {
      const timer = setTimeout(() => setShowText(true), 250);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines]);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://back40designco.com/lot-stretcher");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const hasError = lines.some((l) => l.includes("ERROR"));

  // ── LOADING SCREEN ──
  if (stage === "loading") {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-green-400 font-mono flex items-center justify-center px-6">

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:100%_4px]" />
        </div>

        {/* Error red wash */}
        {hasError && (
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none animate-pulse" />
        )}

        {/* Stall orange wash */}
        {stalled && (
          <div className="absolute inset-0 bg-orange-500/8 pointer-events-none" />
        )}

        {/* Corner labels */}
        <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] text-green-400/30">LOT CAM 04</div>
        <div className="absolute top-5 right-5 text-[10px] tracking-[0.3em] text-green-400/30">BACK ROW</div>
        <div className="absolute bottom-5 left-5 text-[10px] tracking-[0.3em] text-green-400/20">ACCESS CHECK</div>
        <div className="absolute bottom-5 right-5 text-[10px] tracking-[0.3em] text-green-400/20">
          {new Date().toLocaleTimeString()}
        </div>

        {/* B40 watermark */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-green-400/20 uppercase">
          B40 // Back Lot Utilities
        </div>

        <div className="relative z-10 max-w-xl w-full border border-green-400/20 bg-black/75 backdrop-blur-sm p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-green-400/20 pb-4 mb-6">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60">
              B40 SYSTEM // LOT SEARCH v0.40
            </p>
            <p className="text-[10px] text-green-300/60">
              {stalled ? (
                <span className="text-orange-400 animate-pulse">● PROCESS INTERRUPTED</span>
              ) : hasError ? (
                <span className="text-red-400">● CRITICAL FAILURE</span>
              ) : (
                <span className="text-green-400/60">● RUNNING</span>
              )}
            </p>
          </div>

          {/* Terminal lines — scrollable */}
          <div className="min-h-[320px] max-h-[320px] overflow-y-auto space-y-2 text-sm pr-1">
            {lines.map((line, i) => {
              const isError = line.includes("ERROR");
              const isWarning =
                line.includes("not found") ||
                line.includes("laughed") ||
                line.includes("Who hired") ||
                line.includes("declined") ||
                line.includes("smoke break") ||
                line.includes("also looking");
              return (
                <p key={i} className={
                  isError ? "text-red-400 font-bold" :
                  isWarning ? "text-yellow-300" :
                  "text-green-400/80"
                }>
                  <span className="text-green-400/30 mr-2">{String(i + 1).padStart(2, "0")}:</span>
                  {line}
                </p>
              );
            })}
            {stalled && (
              <p className="text-orange-400 font-bold animate-pulse">
                ⚠ PROCESS INTERRUPTED — ATTEMPTING TO RESUME...
              </p>
            )}
            <p className="text-green-400 animate-pulse">▌</p>
            <div ref={bottomRef} />
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] mb-2">
              <span className={stalled ? "text-orange-400" : "text-green-400/50"}>
                {stalled ? "INTERRUPTED" : "Process"}
              </span>
              <span className={stalled ? "text-orange-400" : "text-green-400/50"}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 w-full bg-white/10 overflow-hidden border border-green-400/20">
              <div
                className={`h-full transition-all duration-700 ${
                  hasError ? "bg-red-500" :
                  stalled ? "bg-orange-400" :
                  "bg-green-400"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            {stalled && (
              <p className="mt-2 text-[10px] text-orange-400/70 animate-pulse tracking-widest uppercase">
                System stalled. Please wait...
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-green-400/40">
            Please wait while the system determines if you know what a lot stretcher is...
          </p>
        </div>
      </main>
    );
  }

  // ── REVEAL SCREEN ──
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6">

      {/* Red radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.18),transparent_55%)]" />

      {/* Scanlines */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:100%_5px]" />

      {/* Passing headlights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-0 h-[30vh] w-[55vw] bg-gradient-to-r from-transparent via-red-400/10 to-transparent blur-2xl animate-[b40HeadlightPass_14s_ease-in-out_infinite]" />
      </div>

      {/* B40 watermark top */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/15 uppercase">
        B40 // Back Lot Utilities
      </div>

      {/* Corner */}
      <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] text-red-400/30">ACCESS DENIED</div>
      <div className="absolute top-5 right-5 text-[10px] tracking-[0.3em] text-red-400/30">LOT CAM 04</div>

      <div className="relative z-10 max-w-xl w-full text-center">

        <p className="text-[10px] uppercase tracking-[0.45em] text-red-400/50 mb-6 font-mono">
          ERROR: USER NOT QUALIFIED
        </p>

        <h1 className={`text-6xl md:text-8xl font-black mb-4 tracking-tight transition-opacity duration-500 ${showText ? "opacity-100" : "opacity-0"}`}>
          Seriously?
        </h1>

        <p className={`text-xl text-white/60 mb-2 transition-opacity duration-700 delay-300 ${showText ? "opacity-100" : "opacity-0"}`}>
          There's no such thing as a lot stretcher.
        </p>

        <p className={`text-sm text-white/30 mb-10 transition-opacity duration-700 delay-500 ${showText ? "opacity-100" : "opacity-0"}`}>
          But you already knew that, didn't you.
        </p>

        <p className={`mb-10 text-[10px] tracking-[0.35em] text-white/20 font-mono transition-opacity duration-700 delay-700 ${showText ? "opacity-100" : "opacity-0"}`}>
          NOT YET.
        </p>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-opacity duration-700 delay-700 ${showText ? "opacity-100" : "opacity-0"}`}>

          <Link
            href="/training-room"
            className="w-full sm:w-auto border border-red-400/40 bg-red-400/8 px-6 py-3 text-xs text-red-300/80 hover:text-white hover:border-red-300/80 hover:bg-red-400/15 transition uppercase tracking-[0.25em] font-mono shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          >
            Go Train →
          </Link>

          {/* Share button */}
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto border border-white/10 bg-white/5 px-6 py-3 text-xs text-white/50 hover:text-white hover:border-white/30 hover:bg-white/10 transition uppercase tracking-[0.25em] font-mono"
          >
            {copied ? "✓ Link Copied" : "Send to a Green Pea →"}
          </button>

        </div>

        <div className={`mt-10 transition-opacity duration-700 delay-1000 ${showText ? "opacity-100" : "opacity-0"}`}>
          <Link href="/dealership-series/backlot" className="text-xs text-white/20 hover:text-white/50 tracking-widest uppercase font-mono transition">
            ← Back to Back Lot
          </Link>
        </div>

      </div>

      <style jsx global>{`
        @keyframes b40HeadlightPass {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          12% { opacity: 0; }
          22% { opacity: 0.18; }
          35% { opacity: 0.08; }
          48% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
      `}</style>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const QUESTION_TIME = 15; // seconds per question

const questions = [
  {
    question: (
      <>
        How many times have you said
        <br />
        "they're not buying today"
        <br />
        this week?
      </>
    ),
    answers: [
      { text: "Once or twice", points: 3 },
      { text: "A few times", points: 2 },
      { text: "Every day", points: 1 },
      { text: "I said it this morning", points: 0 },
    ],
    sting: "That's why this hat exists.",
  },
  {
    question: (
      <>
        When was the last time
        <br />
        you let a customer leave
        <br />
        without a T.O?
      </>
    ),
    answers: [
      { text: "Today", points: 0 },
      { text: "This week", points: 1 },
      { text: "Last month", points: 2 },
      { text: "What's a T.O?", points: 0 },
    ],
    sting: "That one cost you.",
  },
  {
    question: (
      <>
        Be honest…
        <br />
        how fast do you move
        <br />
        when a fresh up hits the lot?
      </>
    ),
    answers: [
      { text: "I'm already halfway there", points: 3 },
      { text: "Controlled, professional walk", points: 2 },
      { text: "I wait to see who grabs it", points: 1 },
      { text: "I suddenly have something to do", points: 0 },
    ],
    sting: "They saw you hesitate.",
  },
  {
    question: (
      <>
        Be honest…
        <br />
        what do you blame first
        <br />
        when a deal falls apart?
      </>
    ),
    answers: [
      { text: "The customer", points: 1 },
      { text: "The bank", points: 1 },
      { text: "Finance", points: 1 },
      { text: "Anything but me", points: 0 },
    ],
    sting: "Interesting.",
  },
  {
    question: (
      <>
        Do you actually know
        <br />
        what a lot stretcher is?
      </>
    ),
    answers: [
      { text: "Yes", points: 3 },
      { text: "I think so", points: 2 },
      { text: "I've heard it", points: 1 },
      { text: "No", points: 0 },
    ],
    sting: "Be honest.",
  },
];

const MAX_SCORE = questions.reduce((acc, q) => acc + Math.max(...q.answers.map((a) => a.points)), 0);

function Layout({ children, flash }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <style jsx global>{`
        @keyframes smoke {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(60px) translateY(-30px); }
        }
        @keyframes redFlash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes stamp {
          0% { opacity: 0; transform: rotate(-4deg) scale(3.5); }
          60% { opacity: 1; transform: rotate(-4deg) scale(1.95); }
          80% { transform: rotate(-4deg) scale(2.05); }
          100% { opacity: 1; transform: rotate(-4deg) scale(2); }
        }
        @keyframes impactFlash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes denied {
          0% { opacity: 0; transform: rotate(4deg) scale(3.5); }
          60% { opacity: 1; transform: rotate(4deg) scale(1.95); }
          80% { transform: rotate(4deg) scale(2.05); }
          100% { opacity: 1; transform: rotate(4deg) scale(2); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-flicker { animation: flicker 0.6s ease-in-out infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/training-room-bg.png"
          alt="B40 Training Room"
          className="h-full w-full object-cover object-center brightness-[1.25] contrast-[1.1]"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.14),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Smoke */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-full w-[140%] animate-[smoke_18s_linear_infinite] bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_65%)]" />
        <div className="absolute -right-24 bottom-0 h-full w-[140%] animate-[smoke_26s_linear_infinite_reverse] bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:100%_5px]" />

      {/* B40 logo watermark — bottom right */}
      <div className="pointer-events-none absolute bottom-6 right-6 w-20 md:w-28 select-none opacity-10 mix-blend-screen">
        <img src="/images/logo.png" alt="" aria-hidden="true" className="w-full" />
      </div>

      {/* Answer flash */}
      {flash && (
        <div className="pointer-events-none absolute inset-0 z-20 animate-[redFlash_0.18s_ease-out_forwards] bg-red-600/20" />
      )}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        {children}
      </div>
    </main>
  );
}

export default function TrainingRoomPage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showSting, setShowSting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const passed = score >= 9;

  // Timer logic
  useEffect(() => {
    if (!started || showSting || finished) return;
    setTimeLeft(QUESTION_TIME);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto submit worst answer (0 points)
          playClickSound();
          triggerFlash();
          handleAnswer(0, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, started, showSting, finished]);

  useEffect(() => {
    if (finished && passed) {
      setShake(true);
      playStampSound();
      setTimeout(() => setShake(false), 300);
    }
  }, [finished, passed]);

  function playClickSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(90, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12);
    } catch {}
  }

  function playStampSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(60, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.14, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch {}
  }

  function triggerFlash() {
    setFlash(true);
    setTimeout(() => setFlash(false), 180);
  }

  function resetAssessment() {
    clearInterval(timerRef.current);
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setShowSting(false);
    setFinished(false);
    setFlash(false);
    setTimeLeft(QUESTION_TIME);
  }

  function handleAnswer(points, timedOut = false) {
    clearInterval(timerRef.current);
    setScore((prev) => prev + points);
    setShowSting(true);
    setTimeout(() => {
      setShowSting(false);
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 1000);
  }

  function handleCopy() {
    navigator.clipboard.writeText("https://back40designco.com/training-room");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft <= 5 ? "bg-red-500" : timeLeft <= 9 ? "bg-yellow-400" : "bg-white/60";

  const cardClass = "w-full max-w-md rounded-3xl border border-white/10 bg-black/65 shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-md";

  // ── START SCREEN ──
  if (!started) {
    return (
      <Layout flash={flash}>
        <section className={`${cardClass} p-6 text-center`}>
          {/* Logo */}
          <div className="mx-auto mb-4 w-24 opacity-80 mix-blend-screen">
            <img src="/images/logo.png" alt="Back 40 Designs" className="w-full" />
          </div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-red-400/70">
            Dealer Training Portal
          </p>
          <h1 className="mb-4 text-4xl font-black tracking-tight">
            Training Room
          </h1>
          <p className="mb-2 text-sm leading-relaxed text-white/65">
            This isn't training.
            <br />
            This is honesty.
            <br />
            Back Lot access requires self-awareness.
          </p>
          <p className="mb-8 text-xs text-white/30">
            5 questions. {QUESTION_TIME} seconds each. Clock is running.
          </p>
          <button
            onClick={() => { playClickSound(); triggerFlash(); setStarted(true); }}
            className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-xs uppercase tracking-[0.25em] text-white/80 transition hover:border-red-400/70 hover:bg-red-500/20 hover:text-white active:scale-[0.97]"
          >
            begin assessment
          </button>
        </section>
      </Layout>
    );
  }

  // ── PASS SCREEN ──
  if (finished && passed) {
    return (
      <Layout flash={flash}>
        <section className={`${cardClass} p-6 text-center border-red-500/30 ${shake ? "animate-shake" : ""}`}>
          {/* Logo on cert */}
          <div className="mx-auto mb-4 w-20 opacity-70 mix-blend-screen">
            <img src="/images/logo.png" alt="Back 40 Designs" className="w-full" />
          </div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-red-400/70">
            B40 Back Lot Utilities
          </p>
          <h1 className="mb-5 text-3xl font-black leading-tight tracking-tight">
            BACK LOT
            <br />
            CERTIFICATION
          </h1>

          <div className="relative mb-6 inline-block">
            <div className="absolute inset-0 animate-[impactFlash_0.4s_ease-out_forwards] bg-red-500/20 opacity-0 blur-xl" />
            <div className="relative rotate-[-4deg] scale-[2] border-2 border-red-500 px-7 py-2 text-2xl font-black text-red-500 opacity-0 shadow-[0_0_25px_rgba(239,68,68,0.35)] animate-[stamp_0.45s_cubic-bezier(0.2,1.2,0.3,1)_forwards]">
              APPROVED
            </div>
          </div>

          <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-white/35">
            Designation
          </p>
          <h2 className="mb-2 text-3xl font-black leading-none text-red-500">
            CERTIFIED
            <br />
            SALES ASSOCIATE
          </h2>
          <p className="mb-6 text-xs text-white/30 tracking-widest">
            Score: {score} / {MAX_SCORE}
          </p>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-sm leading-relaxed text-white/70">
            <p>☑ Missed opportunities recognized</p>
            <p>☑ Bad assumptions acknowledged</p>
            <p>☑ Questionable effort corrected</p>
            <p>☑ Back Lot access conditionally granted</p>
          </div>

          <p className="mb-2 text-xl font-black">BACK LOT ACCESS GRANTED</p>
          <p className="mb-8 text-sm leading-relaxed text-white/55">
            Alright.
            <br />
            You might actually survive back there.
            <br />
            Don't touch anything with a sold tag on it.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleCopy}
              className="rounded-xl border border-white/15 bg-white/[0.04] py-4 text-xs uppercase tracking-widest text-white/75 transition hover:border-white/40 hover:text-white active:scale-[0.97]"
            >
              {copied ? "✓ Link Copied" : "Send to Your Floor →"}
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-xl border border-white/10 bg-white/[0.02] py-4 text-xs uppercase tracking-widest text-white/40 transition hover:border-white/30 hover:text-white/70 active:scale-[0.97]"
            >
              Screenshot / Save Certificate
            </button>
            <Link
              href="/dealership-series/backlot"
              className="rounded-xl border border-red-400/30 bg-red-500/10 py-4 text-xs uppercase tracking-widest text-red-200 transition hover:border-red-400/70 hover:bg-red-500/20 hover:text-white active:scale-[0.97]"
            >
              Enter Back Lot
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  // ── FAIL SCREEN ──
  if (finished && !passed) {
    return (
      <Layout flash={flash}>
        <section className={`${cardClass} p-6 text-center`}>
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-red-400/70">
            Assessment Failed
          </p>
          <h1 className="mb-3 text-5xl font-black">Not Yet.</h1>

          {/* Denied stamp */}
          <div className="relative my-6 inline-block">
            <div className="relative rotate-[4deg] scale-[2] border-2 border-red-700 px-7 py-2 text-2xl font-black text-red-700 shadow-[0_0_25px_rgba(185,28,28,0.35)] animate-[denied_0.45s_cubic-bezier(0.2,1.2,0.3,1)_forwards] opacity-0">
              DENIED
            </div>
          </div>

          <p className="mt-6 mb-2 text-sm leading-relaxed text-white/60">
            You're not ready for the Back Lot.
            <br />
            Go train.
          </p>
          <p className="mb-8 text-xs text-white/25 tracking-widest">
            Score: {score} / {MAX_SCORE}
          </p>

          <button
            onClick={() => { playClickSound(); triggerFlash(); resetAssessment(); }}
            className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-xs uppercase tracking-[0.25em] text-white/80 transition hover:border-red-400/70 hover:bg-red-500/20 hover:text-white active:scale-[0.97]"
          >
            Try Again
          </button>
        </section>
      </Layout>
    );
  }

  // ── QUESTION SCREEN ──
  const q = questions[current];

  return (
    <Layout flash={flash}>
      <section className={`${cardClass} p-5`}>
        <p className="mb-2 text-center text-[9px] uppercase tracking-[0.3em] text-white/30">
          Session Active • Performance Tracking
        </p>
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.35em] text-red-400/70">
          Question {current + 1} / {questions.length}
        </p>

        {/* Question progress bar */}
        <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Countdown timer bar */}
        <div className="mb-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
        <p className={`mb-4 text-right text-[9px] uppercase tracking-widest transition-colors ${timeLeft <= 5 ? "text-red-400 animate-flicker" : "text-white/20"}`}>
          {timeLeft}s
        </p>

        {showSting ? (
          <div className="flex h-[260px] items-center justify-center text-center">
            <p className="animate-flicker text-3xl font-black leading-tight text-red-500 drop-shadow-[0_0_18px_rgba(239,68,68,0.45)]">
              {q.sting}
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-7 text-center text-2xl font-black leading-tight tracking-tight text-white">
              {q.question}
            </h1>
            <div className="grid gap-3">
              {q.answers.map((answer, index) => (
                <button
                  key={answer.text}
                  onClick={() => { playClickSound(); triggerFlash(); handleAnswer(answer.points); }}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-left transition hover:border-red-400/60 hover:bg-red-500/15 active:scale-[0.97]"
                >
                  <span className="mr-2 text-sm font-black text-red-400">
                    {String.fromCharCode(65 + index)})
                  </span>
                  <span className="text-sm leading-relaxed text-white/80">
                    {answer.text}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    question: (
      <>
        How many times have you said
        <br />
        “they’re not buying today”
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
    sting: "That’s why this hat exists.",
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
      { text: "What’s a T.O?", points: 0 },
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
      { text: "I’m already halfway there", points: 3 },
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
      { text: "I’ve heard it", points: 1 },
      { text: "No", points: 0 },
    ],
    sting: "Be honest.",
  },
];

export default function TrainingRoomPage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showSting, setShowSting] = useState(false);
  const [finished, setFinished] = useState(false);

  const maxScore = questions.length * 3;
  const passed = score >= 9;

  function handleAnswer(points) {
    setScore((prev) => prev + points);
    setShowSting(true);

    setTimeout(() => {
      setShowSting(false);

      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 900);
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-red-400/50 mb-6">
            Dealer Training Portal
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Training Room
          </h1>

          <p className="text-white/45 text-sm leading-relaxed mb-10">
            This isn’t training.
            <br />
            This is honesty.
            <br />
            Back Lot access requires self-awareness.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="border border-red-400/30 bg-red-400/5 px-6 py-3 text-xs text-red-200/80 hover:text-white hover:border-red-300/70 transition uppercase tracking-[0.25em]"
          >
            begin assessment
          </button>
        </div>
      </main>
    );
  }

  if (finished && passed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl">
          <div className="border border-red-500/50 bg-zinc-950 p-6 md:p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:100%_5px]" />

            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.45em] text-red-400/70 mb-4">
                B40 Back Lot Utilities
              </p>

              <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-8">
                BACK LOT CERTIFICATION
              </h1>

              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
                This certifies that the individual viewing this screen
                <br className="hidden md:block" />
                has demonstrated a working understanding of:
              </p>

              <div className="max-w-xl mx-auto text-left space-y-3 text-white/75 mb-8">
                <p>☑ Missed opportunities</p>
                <p>☑ Poor assumptions</p>
                <p>☑ Questionable effort</p>
                <p>☑ And the reality of the back lot</p>
              </div>

              <div className="inline-block border-2 border-red-500 px-8 py-3 text-red-500 font-black text-3xl rotate-[-4deg] mb-8">
                APPROVED
              </div>

              <p className="text-xs uppercase tracking-[0.35em] text-white/35 mb-3">
                Designation
              </p>

              <h2 className="text-4xl md:text-6xl font-black text-red-500 mb-8">
                CERTIFIED SALES ASSOCIATE
              </h2>

              <p className="text-2xl md:text-3xl font-black mb-3">
                BACK LOT ACCESS GRANTED
              </p>

              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Alright.
                <br />
                You might actually survive back there.
                <br />
                Don’t touch anything with a sold tag on it.
              </p>

              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-8">
                Valid until your next bad TO
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.print()}
                  className="border border-red-400/30 px-5 py-3 text-xs text-red-300 hover:text-white hover:border-red-300 transition uppercase tracking-widest"
                >
                  screenshot / print certificate
                </button>

                <Link
                  href="/dealership-series/backlot"
                  className="border border-white/20 px-5 py-3 text-xs text-white/70 hover:text-white hover:border-white/50 transition uppercase tracking-widest"
                >
                  enter back lot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (finished && !passed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-red-400/50 mb-6">
            Assessment Failed
          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Not Yet.
          </h1>

          <p className="text-white/45 text-sm leading-relaxed mb-10">
            You’re not ready for the Back Lot.
            <br />
            Go train.
          </p>

          <button
            onClick={() => {
              setStarted(false);
              setCurrent(0);
              setScore(0);
              setFinished(false);
            }}
            className="border border-red-400/30 bg-red-400/5 px-6 py-3 text-xs text-red-200/80 hover:text-white hover:border-red-300/70 transition uppercase tracking-[0.25em]"
          >
            try again
          </button>
        </div>
      </main>
    );
  }

  const q = questions[current];

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-red-400/50 mb-4">
          Question {current + 1} / {questions.length}
        </p>

        <div className="h-2 w-full bg-white/10 mb-10 overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {showSting ? (
          <div className="min-h-[360px] flex items-center justify-center">
            <p className="text-4xl md:text-6xl font-black text-red-500 animate-flicker">
              {q.sting}
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-10">
              {q.question}
            </h1>

            <div className="grid gap-4">
              {q.answers.map((answer, index) => (
                <button
                  key={answer.text}
                  onClick={() => handleAnswer(answer.points)}
                  className="text-left border border-white/15 bg-white/[0.03] hover:bg-red-500/10 hover:border-red-400/50 transition p-4"
                >
                  <span className="text-red-400 mr-3">
                    {String.fromCharCode(65 + index)})
                  </span>
                  <span className="text-white/75">{answer.text}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

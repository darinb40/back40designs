"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrainingRoomPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [error, setError] = useState("");

  const questions = [
    {
      id: "q1",
      question: "1. A customer picks up a B40 hat… then puts it back. You:",
      options: [
        ["A", "Tackle them and secure the hat"],
        ["B", "Whisper “don’t leave me” to the display"],
        ["C", "Sprint to the break room"],
        ["D", "Say, “That one usually finds the right person.”"],
      ],
    },
    {
      id: "q2",
      question: "2. Customer: “Why is this one more?” You:",
      options: [
        ["A", "“Because inflation… probably.”"],
        ["B", "“I don’t make the rules, man.”"],
        ["C", "“We spun a wheel this morning.”"],
        ["D", "“Because it’s not for everyone.”"],
      ],
    },
    {
      id: "q3",
      question: "3. Customer is still holding the hat. You:",
      options: [
        ["A", "Slowly back away and avoid eye contact"],
        ["B", "Start folding shirts aggressively"],
        ["C", "Yell “DECISION TIME” from across the room"],
        ["D", "Say, “If it’s still in your hand, there’s a reason.”"],
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answers.q1 === "D" && answers.q2 === "D" && answers.q3 === "D") {
      router.push("/dealership-series/backlot");
    } else {
      setError("Incorrect. Please review the training material and try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#b9d9ee] text-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl rounded-[28px] border-[14px] border-[#123b5c] bg-[#eef6fb] shadow-2xl overflow-hidden">

        {/* Browser Bar */}
        <div className="h-16 bg-slate-100 border-b border-slate-300 flex items-center px-6 gap-4">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div className="ml-6 flex-1 h-9 bg-white rounded-md border border-slate-200 flex items-center px-4 text-slate-400 text-sm">
            B40 Dealer Training Portal / Required Certification
          </div>

          <div className="text-slate-400 text-2xl">☰</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-[720px]">

          {/* Sidebar */}
          <aside className="bg-[#0f3a5c] text-white p-8 flex flex-col">
            <div className="mb-12">
              <div className="text-5xl font-black tracking-tight">B40</div>
              <p className="text-sm tracking-[0.18em] uppercase mt-2">
                Dealer Training Portal
              </p>
            </div>

            <nav className="space-y-3 text-sm font-semibold">
              <div className="bg-blue-700 px-5 py-4 rounded-md">Dashboard</div>
              <div className="opacity-70 px-5 py-4">Training Modules</div>
              <div className="opacity-70 px-5 py-4">Certifications</div>
              <div className="opacity-70 px-5 py-4">Resources</div>
              <div className="opacity-70 px-5 py-4">Support</div>
            </nav>

            <div className="mt-auto text-xs text-white/60">
              © 2026 B40 Systems
              <br />
              All rights reserved.
            </div>
          </aside>

          {/* Main Dashboard */}
          <section className="p-6 md:p-10">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_370px] gap-8">

              {/* Center */}
              <div>
                <p className="text-blue-700 font-bold uppercase tracking-wide mb-2">
                  Sales Process Certification
                </p>

                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0b2740] mb-4">
                  Module 01: Product Value Recognition
                </h1>

                <div className="inline-flex items-center gap-2 border border-blue-400 bg-white px-4 py-2 rounded-md text-blue-700 font-bold mb-6">
                  REQUIRED CERTIFICATION
                </div>

                <div className="bg-white border border-slate-300 rounded-lg p-5 mb-5">
                  <div className="flex justify-between text-sm font-bold mb-3">
                    <span>Module Progress</span>
                    <span className="text-blue-700">
                      {started ? "33% Complete" : "0% Complete"}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 transition-all duration-500"
                      style={{ width: started ? "33%" : "0%" }}
                    />
                  </div>
                </div>

                <div className="bg-white border border-slate-300 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 border-b border-slate-300 text-sm font-bold">
                    <div className="bg-blue-700 text-white px-5 py-4">
                      Assessment
                    </div>
                    <div className="px-5 py-4 text-slate-500 border-l border-slate-300">
                      Materials
                    </div>
                    <div className="px-5 py-4 text-slate-500 border-l border-slate-300">
                      Notes
                    </div>
                  </div>

                  {!started ? (
                    <div className="p-8">
                      <h2 className="text-2xl font-black mb-4">
                        Welcome to Required Training
                      </h2>

                      <p className="text-slate-600 mb-6 max-w-2xl">
                        Please complete this mandatory certification before
                        accessing Back Lot operations and tools.
                      </p>

                      <div className="bg-slate-100 border border-slate-300 p-4 text-sm mb-8">
                        <strong>Training Reminder:</strong> This module may not
                        reflect real-world Saturdays.
                      </div>

                      <button
                        onClick={() => setStarted(true)}
                        className="bg-blue-700 text-white px-8 py-3 font-bold rounded hover:bg-blue-800 transition"
                      >
                        Begin Assessment
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                      {questions.map((q) => (
                        <div key={q.id} className="border-b border-slate-200 pb-6">
                          <p className="text-xl font-black mb-4">{q.question}</p>

                          <div className="space-y-3">
                            {q.options.map(([key, text]) => (
                              <label
                                key={key}
                                className="flex gap-3 items-start bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded-md p-4 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={key}
                                  onChange={(e) =>
                                    setAnswers({
                                      ...answers,
                                      [q.id]: e.target.value,
                                    })
                                  }
                                  className="mt-1"
                                />
                                <span>
                                  <strong>{key})</strong> {text}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}

                      {error && (
                        <p className="text-red-600 text-sm font-bold text-center">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-4 font-black rounded hover:bg-blue-800 transition"
                      >
                        Submit Assessment
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-5">
                <div className="bg-white border border-blue-200 rounded-lg p-5">
                  <h3 className="font-black uppercase mb-4">Vehicle Module</h3>

                  <div className="relative bg-sky-50 border border-sky-100 rounded-md h-44 flex items-end justify-center overflow-hidden">
                    <div className="absolute top-8 w-28 h-16 bg-neutral-800 rounded-t-full border-4 border-neutral-700 rotate-[-4deg] flex items-center justify-center text-white font-black">
                      B40
                    </div>

                    <div className="w-64 h-20 bg-yellow-400 rounded-t-[60px] rounded-b-md relative mb-8 shadow-md">
                      <div className="absolute top-4 left-16 w-28 h-8 bg-slate-800 rounded-t-full" />
                      <div className="absolute bottom-[-18px] left-8 w-12 h-12 bg-slate-900 rounded-full border-4 border-white" />
                      <div className="absolute bottom-[-18px] right-8 w-12 h-12 bg-slate-900 rounded-full border-4 border-white" />
                    </div>
                  </div>

                  <div className="border-t border-slate-300 mt-4 pt-4">
                    <p className="font-black">B40 Product Line</p>
                    <p className="text-sm text-slate-600">
                      Quality. Purpose. Culture.
                    </p>
                    <p className="text-yellow-400 mt-2">★★★★★</p>
                  </div>
                </div>

                <div className="bg-white border border-blue-200 rounded-lg p-5">
                  <h3 className="font-black uppercase mb-4">Module Status</h3>
                  <p className="text-sm">
                    Status:{" "}
                    <span className="text-blue-700 font-bold">
                      {started ? "In Progress" : "Not Started"}
                    </span>
                  </p>
                  <p className="text-sm">Required: Yes</p>
                  <p className="text-sm">Attempts: 0</p>
                  <p className="text-sm">Passing Score: 100%</p>
                </div>

                <div className="bg-white border border-blue-200 rounded-lg p-5">
                  <h3 className="font-black uppercase mb-3">Compliance Notice</h3>
                  <p className="text-sm text-slate-600">
                    Failure to complete this module may result in restricted
                    system access.
                  </p>
                </div>

                <div className="bg-white border border-blue-200 rounded-lg p-5">
                  <h3 className="font-black uppercase mb-3">System Notice</h3>
                  <p className="text-sm text-slate-600">
                    This training system is monitored. All activity is recorded.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

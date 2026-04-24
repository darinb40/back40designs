"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrainingRoomPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      answers.q1 === "D" &&
      answers.q2 === "D" &&
      answers.q3 === "D"
    ) {
      router.push("/dealership-series/backlot");
    } else {
      setError("Incorrect. Please review the training material and try again.");
    }
  };

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

  return (
    <main className="min-h-screen bg-gray-200 text-black flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full bg-white border border-gray-300 shadow-sm">
        <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
          <p className="text-xs tracking-[0.35em] uppercase">
            B40 Dealer Training Systems
          </p>
          <p className="text-xs uppercase">Module 01</p>
        </div>

        <div className="p-8">
          {!started ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs bg-gray-200 border border-gray-300 px-3 py-1">
                  REQUIRED TRAINING
                </span>
                <span className="text-xs text-gray-500">
                  Status: Incomplete
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Welcome to Sales Process Training Module 01
              </h1>

              <p className="text-gray-600 mb-6">
                Please complete this mandatory certification before returning to
                the Back Lot.
              </p>

              <div className="mb-8">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="h-3 bg-gray-200 border border-gray-300">
                  <div className="h-full bg-blue-700 w-0" />
                </div>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="bg-blue-800 text-white px-6 py-3 font-semibold hover:bg-blue-900 transition"
              >
                Begin Assessment
              </button>

              <p className="text-[10px] text-gray-400 mt-8">
                © B40 Dealer Training Systems. This module may not reflect
                real-world Saturdays.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs bg-gray-200 border border-gray-300 px-3 py-1">
                  ASSESSMENT IN PROGRESS
                </span>
                <span className="text-xs text-gray-500">
                  Progress: 33%
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Sales Process Assessment
              </h1>

              <p className="text-gray-600 mb-8">
                Select the most appropriate response according to B40 training
                standards.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {questions.map((q) => (
                  <div key={q.id} className="border-t border-gray-200 pt-6">
                    <p className="font-semibold mb-4">{q.question}</p>

                    <div className="space-y-3 text-sm">
                      {q.options.map(([key, text]) => (
                        <label
                          key={key}
                          className="flex items-start gap-3 cursor-pointer border border-gray-200 p-3 hover:bg-gray-50"
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
                            {key}) {text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {error && (
                  <p className="text-red-600 text-sm text-center font-semibold">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-3 font-semibold hover:bg-blue-900 transition"
                >
                  Submit Assessment
                </button>
              </form>

              <p className="text-[11px] text-gray-400 text-center mt-8">
                This module is monitored.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrainingRoomPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      answers.q1 === "B" &&
      answers.q2 === "B" &&
      answers.q3 === "A"
    ) {
      router.push("/dealership-series/backlot");
    } else {
      setError("Not ready. Try again.");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-100 text-black flex items-center justify-center px-6">
      <div className="max-w-xl w-full">
        <p className="text-xs uppercase tracking-[0.45em] text-gray-400 mb-6 text-center">
          B40 TRAINING ROOM
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-center">
          Earn your way back.
        </h1>

        <p className="text-gray-600 text-center mb-10">
          You don’t get access… you earn it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* QUESTION 1 */}
          <div>
            <p className="font-semibold mb-3">
              1. What is the first step to the road to the sale?
            </p>

            <div className="space-y-2 text-sm">
              {[
                ["A", "Manager Turn Over"],
                ["B", "Meet and Greet"],
                ["C", "Run away from the customer and go to lunch"],
                ["D", "There is a Road to the sale?"],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q1"
                    value={key}
                    onChange={(e) =>
                      setAnswers({ ...answers, q1: e.target.value })
                    }
                  />
                  {key}) {text}
                </label>
              ))}
            </div>
          </div>

          {/* QUESTION 2 */}
          <div>
            <p className="font-semibold mb-3">
              2. What are you protecting in every deal?
            </p>

            <div className="space-y-2 text-sm">
              {[
                ["A", "Time"],
                ["B", "Gross"],
                ["C", "Feelings"],
                ["D", "Nothing really matters"],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q2"
                    value={key}
                    onChange={(e) =>
                      setAnswers({ ...answers, q2: e.target.value })
                    }
                  />
                  {key}) {text}
                </label>
              ))}
            </div>
          </div>

          {/* QUESTION 3 */}
          <div>
            <p className="font-semibold mb-3">
              3. Who controls the process?
            </p>

            <div className="space-y-2 text-sm">
              {[
                ["A", "You"],
                ["B", "The customer"],
                ["C", "Finance"],
                ["D", "Whoever talks the most"],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q3"
                    value={key}
                    onChange={(e) =>
                      setAnswers({ ...answers, q3: e.target.value })
                    }
                  />
                  {key}) {text}
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button className="w-full bg-black text-white py-3 font-semibold">
            Submit
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-10">
          Most people never make it out of here.
        </p>
      </div>
    </main>
  );
}

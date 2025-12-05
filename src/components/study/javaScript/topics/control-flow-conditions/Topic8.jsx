import React, { useState } from "react";
import questions from "./js-control-flow-test.json";

export default function Topic8() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [score, setScore] = useState(0);

  const handleChange = (questionId, optionIndex) => {
    if (submitted[questionId]) return; // cannot change after submit
    setResponses((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuestion = (q) => {
    // Prevent re-submission
    if (submitted[q.id]) return;

    const userAnswer = responses[q.id];
    const correct = q.answerIndex;

    // Update score
    if (userAnswer === correct) {
      setScore((prev) => prev + 1);
    }

    // Mark question as submitted
    setSubmitted((prev) => ({
      ...prev,
      [q.id]: true,
    }));
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-sky-300">
          Module Test – Control Flow & Decision Making
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Each question must be submitted individually.  
          You will see the correct answer immediately after submitting.
        </p>

        <p className="text-xs text-slate-500">
          Score: {score} / {questions.length}
        </p>
      </header>

      {/* QUESTIONS LIST */}
      <div className="space-y-6">
        {questions.map((q, index) => {
          const userAnswer = responses[q.id];
          const isSubmitted = submitted[q.id];
          const correctAnswer = q.answerIndex;

          return (
            <article
              key={q.id}
              className="border border-slate-800 bg-slate-900/60 rounded-2xl p-4 md:p-5 space-y-3"
            >

              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm md:text-base font-semibold text-slate-100">
                  <span className="text-sky-400 mr-2">Q{index + 1}.</span>
                  {q.question}
                </h3>

                {q.topic && (
                  <span className="text-[10px] md:text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {q.topic}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-1 mt-1">
                {q.options.map((opt, optIndex) => {
                  const inputId = `q${q.id}-opt${optIndex}`;
                  const selected = userAnswer === optIndex;

                  // Determine style based on correctness
                  let optionStyle =
                    "border-slate-700 bg-slate-900/60 hover:bg-slate-800";

                  if (isSubmitted) {
                    if (optIndex === correctAnswer) {
                      optionStyle =
                        "border-emerald-500 bg-emerald-900/30 text-emerald-300";
                    } else if (selected && selected !== correctAnswer) {
                      optionStyle =
                        "border-rose-500 bg-rose-900/30 text-rose-300";
                    }
                  } else if (selected) {
                    optionStyle =
                      "border-sky-500 bg-sky-900/30 text-sky-50";
                  }

                  return (
                    <label
                      key={inputId}
                      htmlFor={inputId}
                      className={`flex items-start gap-2 text-sm md:text-base cursor-pointer rounded-lg px-3 py-2 border transition ${optionStyle}`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={`question-${q.id}`}
                        disabled={isSubmitted}
                        checked={selected}
                        onChange={() => handleChange(q.id, optIndex)}
                        className="mt-0.5 accent-sky-500"
                      />
                      <span className="leading-snug">
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Submit Button per Question */}
              {!isSubmitted ? (
                <button
                  onClick={() => handleSubmitQuestion(q)}
                  disabled={responses[q.id] == null}
                  className="mt-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-400 transition text-white text-sm font-semibold"
                >
                  Submit Answer
                </button>
              ) : (
                <p className="text-[12px] text-emerald-400 mt-1">
                  Correct Answer: {q.options[q.answerIndex]}
                </p>
              )}

            </article>
          );
        })}
      </div>
    </div>
  );
}

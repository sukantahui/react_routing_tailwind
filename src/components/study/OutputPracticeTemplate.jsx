import React, { useState } from "react";
import JavaCodeBlock from "../../common/JavaCodeBlock";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function OutputPracticeTemplate({ data }) {

  const [showAns, setShowAns] = useState([]);
  const [level, setLevel] = useState("all");
  const [limit, setLimit] = useState(10);
  const [started, setStarted] = useState(false);
  const [sessionQ, setSessionQ] = useState([]);

  if (!data || !data.questions)
    return <p className="p-4 text-red-400">No questions found.</p>;

  const filteredByLevel =
    level === "all"
      ? data.questions
      : data.questions.filter(q => q.difficulty === level);

//   const questions = started
//     ? shuffleArray(filteredByLevel).slice(0, limit)
//     : [];

  function toggle(id) {
    setShowAns(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-200 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <svg className="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
          </svg>
          <h1 className="text-3xl font-bold text-sky-400 tracking-wide">
            {data.title || "Java Output Practice"}
          </h1>
        </div>

        {/* Control Panel */}
        <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl mb-8 flex flex-wrap gap-4 items-center justify-between">

          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">Difficulty</span>
            <select
              value={level}
              onChange={e => { setLevel(e.target.value); setStarted(false); }}
              className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
            >
              <option value="all">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Moderate">Moderate</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">Questions</span>
            <select
              value={limit}
              onChange={e => { setLimit(Number(e.target.value)); setStarted(false); }}
              className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>

          <button
  onClick={() => {
    setShowAns([]);
    setSessionQ(shuffleArray(filteredByLevel).slice(0, limit));
    setStarted(true);
  }}
  className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg shadow"
>
  Start Practice
</button>

        </div>

        {/* Questions */}
        {started && sessionQ.map((q, index) => (
          <div
            key={q.id}
            className="bg-zinc-900/80 border border-zinc-800 p-5 mb-6 rounded-2xl shadow-lg hover:shadow-sky-900/30 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-zinc-100">
                Q{index + 1}. {q.question}
              </p>
              <span className="text-xs px-2 py-1 rounded bg-sky-900 text-sky-300">
                {q.difficulty}
              </span>
            </div>

            <JavaCodeBlock code={q.code} />

            <button
              onClick={() => toggle(q.id)}
              className="mt-3 px-4 py-1.5 bg-sky-600 hover:bg-sky-500 rounded-md text-white"
            >
              {showAns.includes(q.id) ? "Hide Answer" : "Show Answer"}
            </button>

            {showAns.includes(q.id) && (
              <div className="mt-3 bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl">
                <p className="text-emerald-300"><b>Output:</b> {q.output}</p>
                <p className="text-sm text-emerald-200 mt-1">
                  <b>Explanation:</b> {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}

        {!started && (
          <p className="text-center text-zinc-500 mt-10">
            Select difficulty & number of questions, then click <b>Start Practice</b>.
          </p>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import JavaCodeBlock from "../../common/JavaCodeBlock";

export default function OutputPracticeTemplate({ data }) {

  const [showAns, setShowAns] = useState([]);
  const [level, setLevel] = useState("all");

  if (!data || !data.questions)
    return <p className="p-4 text-red-400">No questions found.</p>;

  const filtered =
    level === "all"
      ? data.questions
      : data.questions.filter(q => q.difficulty === level);

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
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <svg className="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
          </svg>

          <h1 className="text-3xl font-bold text-sky-400 tracking-wide">
            {data.title || "Java Output Practice"}
          </h1>

          <div className="ml-auto flex items-center gap-2">
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM15 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM3 16a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM15 16a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/>
            </svg>

            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-zinc-200 p-2 rounded-md"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Moderate">Moderate</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Questions */}
        {filtered.map((q, index) => (
          <div
            key={q.id}
            className="bg-zinc-900/80 border border-zinc-800 p-5 mb-6 rounded-2xl shadow-lg hover:shadow-sky-900/30 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-zinc-100">
                Q{index + 1}. {q.question}
              </p>

              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-sky-900 text-sky-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
                </svg>
                {q.difficulty}
              </span>
            </div>

            <JavaCodeBlock code={q.code} />

            <button
              onClick={() => toggle(q.id)}
              className="mt-3 flex items-center gap-2 px-4 py-1.5 bg-sky-600 hover:bg-sky-500 rounded-md text-white"
            >
              {showAns.includes(q.id) ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01"/>
                  </svg>
                  Hide Answer
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m3-3v6"/>
                  </svg>
                  Show Answer
                </>
              )}
            </button>

            {showAns.includes(q.id) && (
              <div className="mt-3 bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl">
                <p className="text-emerald-300">
                  <b>Output:</b> {q.output}
                </p>
                <p className="text-sm text-emerald-200 mt-1">
                  <b>Explanation:</b> {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

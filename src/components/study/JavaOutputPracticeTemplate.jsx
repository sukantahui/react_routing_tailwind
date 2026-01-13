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

export default function JavaOutputPracticeTemplate({ data }) {

  const [showAns, setShowAns] = useState([]);
  const [level, setLevel] = useState("all");
  const [limit, setLimit] = useState(30);
  const [started, setStarted] = useState(false);
  const [sessionQ, setSessionQ] = useState([]);

  if (!data || !data.questions)
    return <p className="p-4 text-red-400">No questions found.</p>;

  const filteredByLevel =
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
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900
              shadow-[0_0_30px_rgba(56,189,248,0.35)] ring-1 ring-sky-500/40">
            <img
              src={data.subjectLogo?.path}
              alt={data.subjectLogo?.alt || "Logo"}
              className="w-12 h-12 object-contain dark:invert dark:brightness-125 dark:contrast-125
                dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-sky-400 tracking-wide">
              {data.topic}
            </h1>
            <p className="text-sm text-zinc-400">
              {data.subject} • Class {data.class} • {data.board}
            </p>
          </div>
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
              onChange={e => {
                const val = e.target.value;
                setLimit(val === "all" ? "all" : Number(val));
                setStarted(false);
              }}
              className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
            >
              <option value="all">All</option>
              {[5,10,20,30,40,50,60,70,80,90,100].map(n =>
                <option key={n} value={n}>{n}</option>
              )}
            </select>
          </div>

          <button
            onClick={() => {
              setShowAns([]);
              const pool = shuffleArray(filteredByLevel);
              setSessionQ(limit === "all" ? pool : pool.slice(0, limit));
              setStarted(true);
            }}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg shadow"
          >
            Start Practice
          </button>
        </div>

        {/* Questions */}
        {started && sessionQ.map((q, index) => (
          <div key={q.id}
            className="bg-zinc-900/80 border border-zinc-800 p-5 mb-6 rounded-2xl shadow-lg hover:shadow-sky-900/30 transition">

            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-zinc-100">
                Q{index + 1}. {q.question}
              </p>
              <span className="text-xs px-2 py-1 rounded bg-sky-900 text-sky-300">
                {q.difficulty}
              </span>
            </div>

            <JavaCodeBlock code={q.code} />

            {/* Eye Button */}
            <button
              onClick={() => toggle(q.id)}
              className="mt-3 p-2 rounded-full border border-sky-500/40 bg-slate-900 hover:bg-sky-700/40 transition"
              title={showAns.includes(q.id) ? "Hide Answer" : "Show Answer"}
            >
              {showAns.includes(q.id) ? (
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.05 11.05 0 014.95-5.9M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.12 5.88L3 3" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0S18.27 4.5 12 4.5 1.5 12 1.5 12 5.73 19.5 12 19.5 22.5 12 22.5 12z" />
                </svg>
              )}
            </button>

            {showAns.includes(q.id) && (
              <div className="mt-3 bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl">
                <div className="text-emerald-300">
                  <b>Output:</b>
                  <pre className="mt-1 bg-emerald-950/40 p-2 rounded-lg text-sm whitespace-pre-wrap">
                    {q.output}
                  </pre>
                </div>
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

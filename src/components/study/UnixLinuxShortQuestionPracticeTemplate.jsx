import React, { useState } from "react";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function UnixLinuxShortQuestionPracticeTemplate({ data }) {
  const [showAns, setShowAns] = useState([]);
  const [topic, setTopic] = useState("all");
  const [limit, setLimit] = useState(50);
  const [started, setStarted] = useState(false);
  const [sessionQ, setSessionQ] = useState([]);

  if (!data || !data.questions)
    return <p className="p-4 text-red-400">No questions found.</p>;

  const uniqueTopics = [...new Set(data.questions.map(q => q.topic))];

  const filteredByTopic =
    topic === "all"
      ? data.questions
      : data.questions.filter(q => q.topic === topic);

  function toggle(id) {
    setShowAns(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-200 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-slate-900 ring-1 ring-emerald-500/40">
            <img
              src={data.subjectLogo?.path}
              alt={data.subjectLogo?.alt || "Linux Logo"}
              className="w-12 h-12 object-contain dark:invert dark:brightness-125"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-emerald-400 tracking-wide">
              {data.topic}
            </h1>
            <p className="text-sm text-slate-400">
              {data.subject}
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl mb-8 flex flex-wrap gap-4 items-center justify-between">

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Topic</span>
            <select
              value={topic}
              onChange={e => { setTopic(e.target.value); setStarted(false); }}
              className="
                bg-slate-900/70 border border-slate-700
                h-8 px-2 text-sm leading-tight
                rounded-md
                focus:outline-none focus:ring-1 focus:ring-emerald-600
                "

            >
              <option value="all">All</option>
              {uniqueTopics.map((t, i) =>
                <option key={i} value={t}>{t}</option>
              )}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Questions</span>
            <select
              value={limit}
              onChange={e => {
                const val = e.target.value;
                setLimit(val === "all" ? "all" : Number(val));
                setStarted(false);
              }}
              className="bg-slate-900 border border-slate-700 p-2 rounded-md"
            >
              <option value="all">All</option>
              {[5, 10, 20, 30, 40, 50].map(n =>
                <option key={n} value={n}>{n}</option>
              )}
            </select>
          </div>

          <button
            onClick={() => {
              setShowAns([]);
              const pool = shuffleArray(filteredByTopic);
              setSessionQ(limit === "all" ? pool : pool.slice(0, limit));
              setStarted(true);
            }}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow"
          >
            Start Practice
          </button>
        </div>

        {/* Questions */}
        {started && sessionQ.map((q, index) => (
          <div key={q.id}
            className="bg-slate-900/80 border border-slate-800 p-5 mb-6 rounded-2xl shadow-lg">

            <p className="font-semibold text-slate-100 text-lg leading-relaxed">

              Q{index + 1}. {q.question}
            </p>

            <span className="inline-block mt-1 mb-3 text-[11px] bg-emerald-900/30 text-emerald-300 px-2 py-0.5 rounded">
              Topic: {q.topic}
            </span>

            {q.code && (
              <pre className="bg-black text-emerald-400 p-3 rounded-lg text-sm overflow-x-auto mb-3">
                {q.code}
              </pre>
            )}

            <button
              onClick={() => toggle(q.id)}
              className="mt-2 px-3 py-1 text-xs rounded-full border border-emerald-500/40 
              bg-slate-900 hover:bg-emerald-700/30 transition"
            >
              {showAns.includes(q.id) ? "Hide Answer" : "Show Answer"}
            </button>

            {showAns.includes(q.id) && (
              <div className="mt-3 bg-black/70 border border-emerald-700 p-4 rounded-xl">
                <p className="text-slate-300 text-sm">
                  <b>Answer:</b> {q.answer}
                </p>
              </div>
            )}
          </div>
        ))}

        {!started && (
          <p className="text-center text-slate-500 mt-10">
            Select topic & number of questions, then click <b>Start Practice</b>.
          </p>
        )}

      </div>
    </div>
  );
}

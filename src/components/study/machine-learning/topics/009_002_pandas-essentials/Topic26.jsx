import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic26_files/01_short_questions_core_series_dataframe.py?raw";
import pyCode2 from "./topic26_files/02_short_questions_grouping_merging.py?raw";
import pyCode3 from "./topic26_files/03_short_questions_performance_best_practices.py?raw";
import noteText from "./topic26_files/topic26_note.txt?raw";
import questions from "./topic26_files/topic26_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_short_questions_core_series_dataframe.py",
    title: "1. Core Series, DataFrame & Indexing",
    badge: "Core Indexing Q&A",
    code: pyCode1,
    summary: "Code demonstrations for Series vs 1D NumPy arrays, loc[] vs iloc[] indexing mechanics, and SettingWithCopyWarning prevention.",
  },
  {
    id: "part2",
    fileName: "02_short_questions_grouping_merging.py",
    title: "2. Grouping, Aggregation & Joins",
    badge: "GroupBy & Joins Q&A",
    code: pyCode2,
    summary: "Code demonstrations for agg() vs transform() vs filter(), and merge() vs concat() vs join() decision criteria.",
  },
  {
    id: "part3",
    fileName: "03_short_questions_performance_best_practices.py",
    title: "3. Vectorization & Memory Optimization",
    badge: "Performance Q&A",
    code: pyCode3,
    summary: "Code demonstrations for why inplace=True is discouraged, np.where SIMD speedups, and categorical dtype memory optimization.",
  },
];

const FLASHCARDS = [
  {
    id: 1,
    category: "core",
    q: "What is the fundamental difference between a Pandas Series and a 1D NumPy array?",
    a: "A NumPy array is a raw, homogeneous C-level contiguous memory buffer indexed solely by integer positions (0..N-1). A Pandas Series is a high-level 1D labeled data structure built on top of NumPy that possesses an explicit Index object with arbitrary labels, datetime alignment, and native NaN missing data handling.",
  },
  {
    id: 2,
    category: "core",
    q: "How does df.loc[] differ from df.iloc[]?",
    a: "df.loc[] is strictly label-based (referencing row index labels and column names, inclusive of the stop boundary), whereas df.iloc[] is strictly integer position-based (0 to N-1, exclusive of the stop boundary following standard Python slice semantics).",
  },
  {
    id: 3,
    category: "core",
    q: "What causes the 'SettingWithCopyWarning' and how do you resolve it?",
    a: "It occurs when modifying a slice of a DataFrame where Pandas cannot determine if the slice is a reference view or an independent copy. Always call .copy() explicitly (e.g. subset = df[mask].copy()) before adding or modifying columns on sliced subsets.",
  },
  {
    id: 4,
    category: "groupby",
    q: "What is the key difference between groupby().agg() and groupby().transform()?",
    a: "groupby().agg() reduces each group to a single summary metric, collapsing N rows down to G unique group rows. groupby().transform() computes group metrics but broadcasts the result back across every original row, preserving the original N-row length for feature engineering.",
  },
  {
    id: 5,
    category: "groupby",
    q: "When should you use pd.merge() vs pd.concat() vs df.join()?",
    a: "Use pd.merge() for relational database-style joins on arbitrary key columns. Use pd.concat() for physical vertical row stacking (axis=0) or horizontal column binding (axis=1). Use df.join() for fast index-to-index joins.",
  },
  {
    id: 6,
    category: "perf",
    q: "Why is 'inplace=True' discouraged in modern Pandas 2.x and 3.x?",
    a: "inplace=True prevents fluent method chaining pipelines, often performs hidden memory copies under the hood anyway, complicates Copy-on-Write (CoW) memory management, and is planned for deprecation in future Pandas major releases.",
  },
  {
    id: 7,
    category: "perf",
    q: "Why does np.where() run up to 300x faster than df.apply(axis=1)?",
    a: "df.apply(axis=1) constructs a separate Python Series object for every single row and executes interpreted Python bytecode in a slow loop. np.where() operates directly on contiguous C memory buffers using SIMD CPU vectorization.",
  },
  {
    id: 8,
    category: "perf",
    q: "How does converting repetitive text columns to 'category' reduce RAM footprint?",
    a: "Converting to 'category' replaces bulky duplicate Python string objects with compact integer dictionary lookup keys (int8/int16), slashing memory usage by 80% to 95% on large datasets.",
  },
];

const Topic26 = () => {
  const [activeTab, setActiveTab] = useState("qa_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [activeCategory, setActiveCategory] = useState("all");
  const [revealedIds, setRevealedIds] = useState(new Set([1, 2]));

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const toggleReveal = (id) => {
    const next = new Set(revealedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setRevealedIds(next);
  };

  const filteredCards =
    activeCategory === "all" ? FLASHCARDS : FLASHCARDS.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/60 border border-purple-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                  Module 009_002 Finale &bull; Conceptual Mastery
                </span>
                <span className="text-xs text-slate-400 font-mono">Topic 26 of 26</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Short Questions &amp; Interview Mastery in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Review and master core interview questions and architecture paradigms: Series vs DataFrames, indexing subtleties, Copy-on-Write, group transformations, join algorithms, and vectorization performance.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-purple-500/20">
                🎓 Q&amp;A
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("qa_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "qa_studio"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Flashcard &amp; Interview Q&amp;A Hub
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Master Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: QA STUDIO */}
        {activeTab === "qa_studio" && (
          <div className="space-y-6">
            {/* Category Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All Questions (8)" },
                  { id: "core", label: "Core & Indexing (3)" },
                  { id: "groupby", label: "GroupBy & Joins (2)" },
                  { id: "perf", label: "Performance & Best Practices (3)" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="text-xs font-mono text-slate-400">
                {revealedIds.size} of {FLASHCARDS.length} answers revealed
              </div>
            </div>

            {/* Flashcard List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCards.map((card) => {
                const isRevealed = revealedIds.has(card.id);
                return (
                  <div
                    key={card.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                          Question {card.id} &bull; {card.category.toUpperCase()}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            isRevealed
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {isRevealed ? "Answer Revealed" : "Hidden"}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-snug">{card.q}</h3>
                    </div>

                    {isRevealed ? (
                      <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/30 text-xs text-slate-300 leading-relaxed">
                        <span className="font-bold text-emerald-400 block mb-1">Answer / Technical Rationale:</span>
                        {card.a}
                      </div>
                    ) : (
                      <div className="bg-slate-950/40 p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                        Click 'Reveal Answer' to view detailed technical explanation.
                      </div>
                    )}

                    <button
                      onClick={() => toggleReveal(card.id)}
                      className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                        isRevealed
                          ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          : "bg-purple-600 text-white shadow-md shadow-purple-600/20 hover:bg-purple-500"
                      }`}
                    >
                      {isRevealed ? "Hide Answer" : "Reveal Answer 👁️"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Congratulations on Completing Pandas Essentials!"
              text="You have now mastered all 27 core topics of Pandas Essentials (Module 009_002)! From Series creation, CSV loading, Boolean filtering, and multi-metric GroupBy aggregations, all the way to relational merges and production ETL exports, you now possess the complete toolkit required to prepare clean tabular feature matrices for state-of-the-art machine learning models!"
            />
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "python_code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedScriptId === script.id
                      ? "bg-purple-950/60 border-purple-500 text-white shadow-lg shadow-purple-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
                    {script.badge}
                  </div>
                  <div className="font-bold text-sm text-slate-100">{script.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">{script.summary}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <h3 className="text-md font-bold text-white font-mono">{activeScript.fileName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeScript.summary}</p>
                </div>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === "theory_notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <PlainTextPrint text={noteText} title="Topic 26 Revision Notes: Short Questions &amp; Master Cheatsheet" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 26 Knowledge Check: Master Pandas Review" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic26;

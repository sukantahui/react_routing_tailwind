import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic22_files/01_rapid_interview_numpy_puzzles.py?raw";
import pyCode2 from "./topic22_files/02_memory_and_stride_diagnostics.py?raw";
import pyCode3 from "./topic22_files/03_module_summary_cheat_sheet.py?raw";
import noteText from "./topic22_files/topic22_note.txt?raw";
import questions from "./topic22_files/topic22_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_rapid_interview_numpy_puzzles.py",
    title: "1. Rapid Interview Code Puzzles",
    badge: "Interview Puzzles",
    code: pyCode1,
    summary: "Exposes views vs copies, NaN equality traps, in-place operator mutations, and boolean masking edge cases.",
  },
  {
    id: "part2",
    fileName: "02_memory_and_stride_diagnostics.py",
    title: "2. Memory Strides & Flag Diagnostics",
    badge: "Memory Diagnostics",
    code: pyCode2,
    summary: "Inspects array itemsize, byte strides, C vs Fortran contiguity flags, and base pointer memory sharing.",
  },
  {
    id: "part3",
    fileName: "03_module_summary_cheat_sheet.py",
    title: "3. Master NumPy Module Summary",
    badge: "Master Cheat Sheet",
    code: pyCode3,
    summary: "Executes a complete syntax review across all 23 topics: creation, slicing, axis stats, broadcasting, matmul, and PRNG.",
  },
];

const FLASHCARDS = [
  {
    id: 1,
    category: "Memory & Performance",
    q: "Why is NumPy drastically faster than native Python lists for numeric operations?",
    a: "NumPy arrays use contiguous C-order memory blocks with homogeneous data types (e.g. float64, int32). This eliminates Python object pointers, dynamic type checking, and enables CPU L1/L2 cache locality with vectorized SIMD hardware instructions.",
  },
  {
    id: 2,
    category: "Memory & Views",
    q: "What is the difference between an Array View and a Copy?",
    a: "A View shares the underlying memory buffer with the original array (mutations affect both). Views are created by basic slicing (arr[1:4]), transposition (.T), and ravel(). A Copy allocates brand-new memory and is created by fancy indexing (arr[[0, 2]]), boolean masks, and flatten().",
  },
  {
    id: 3,
    category: "Broadcasting",
    q: "State the 3 Golden Rules of NumPy Broadcasting.",
    a: "1. If arrays have different ndim, prepend 1s to the smaller shape on the left.\n2. Moving from right to left, dimensions must either be EQUAL or ONE of them must be 1.\n3. Dimensions of size 1 are virtually stretched across memory without physical data copying.",
  },
  {
    id: 4,
    category: "Linear Algebra",
    q: "What is the difference between `A * B` and `A @ B` for 2D matrices?",
    a: "`A * B` computes element-wise Hadamard multiplication where C[i,j] = A[i,j] * B[i,j] (requires matching or broadcastable shapes). `A @ B` (or np.matmul) computes true matrix dot multiplication where C[i,j] is the row-by-column dot product (requires (M, K) @ (K, N) inner dimension matching).",
  },
  {
    id: 5,
    category: "Statistics & Axis",
    q: "What does `axis=0` vs `axis=1` mean in `np.mean(X)` on a 2D feature matrix (N samples, D features)?",
    a: "`axis=0` collapses rows (moves down columns) to compute per-feature statistics of shape (D,). `axis=1` collapses columns (moves across rows) to compute per-sample statistics of shape (N,).",
  },
  {
    id: 6,
    category: "Random Numbers",
    q: "Why should you use `np.random.default_rng(seed)` instead of `np.random.seed()`?",
    a: "`default_rng` initializes an isolated Generator instance using the modern, faster PCG64 bit-generator. It avoids mutating global C-level state, is thread-safe, and prevents hidden side effects across external libraries.",
  },
];

const Topic22 = () => {
  const [activeTab, setActiveTab] = useState("flashcards");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const categories = ["All", "Memory & Performance", "Memory & Views", "Broadcasting", "Linear Algebra", "Statistics & Axis", "Random Numbers"];

  const filteredCards = selectedCategory === "All"
    ? FLASHCARDS
    : FLASHCARDS.filter((c) => c.category === selectedCategory);

  const toggleReveal = (id) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-900/60 border border-purple-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/40">
                Topic 22 • Module Conclusion &amp; Revision
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                Short Questions &amp; Viva Voce
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-200 via-indigo-100 to-pink-300 bg-clip-text text-transparent">
              NumPy Essentials: Short Questions &amp; Viva Voce
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Consolidate your mastery across all 23 NumPy topics: memory striding, views vs copies, broadcasting edge cases, linear algebra GEMM rules, axis statistical reductions, and machine learning data pipelines.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "flashcards", label: "Viva Voce Flashcards", icon: "🎴" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Module Final Quiz", icon: "🏆" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Viva Voce Flashcards */}
      {activeTab === "flashcards" && (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Flashcard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map((card) => {
              const isRevealed = !!revealedAnswers[card.id];
              return (
                <div
                  key={card.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {card.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Card #{card.id}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-200 leading-snug mb-4">
                      {card.q}
                    </h4>

                    {isRevealed && (
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-purple-900/40 text-xs text-slate-300 leading-relaxed whitespace-pre-line animate-fadeIn">
                        {card.a}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleReveal(card.id)}
                    className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isRevealed
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30"
                    }`}
                  >
                    <span>{isRevealed ? "Hide Model Answer" : "Reveal Model Answer"}</span>
                    <span>{isRevealed ? "▲" : "▼"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {s.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.py</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-purple-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Short Questions &amp; Revision Suite
              </span>
            </div>
            <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Notes */}
      {activeTab === "teacher_notes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Teacher
            name="Sukanta Hui"
            title="Senior ML Instructor, Barrackpore Lab"
            quote="Congratulations on completing the NumPy Essentials module! You now understand not just the syntax, but the true internal memory architecture, stride offsets, vectorization rules, and broadcasting mechanics that power the entire modern Python scientific and AI stack (Pandas, PyTorch, TensorFlow, Scikit-Learn). Keep experimenting and writing pure vectorized code!"
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
              <span>📚 Comprehensive Topic Notes</span>
            </h3>
            <PlainTextPrint content={noteText} />
          </div>
        </div>
      )}

      {/* Tab 4: Quizzes & FAQs */}
      {activeTab === "faqs_questions" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <FAQTemplate questions={questions} />
        </div>
      )}
    </div>
  );
};

export default Topic22;

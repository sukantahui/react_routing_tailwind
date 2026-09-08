import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic8_files/01_boolean_mask_generation_and_filtering.py?raw";
import pyCode2 from "./topic8_files/02_compound_logical_conditions_and_bitwise.py?raw";
import pyCode3 from "./topic8_files/03_conditional_mutation_and_relu.py?raw";
import pyCode4 from "./topic8_files/04_ml_outlier_filtering_and_nan_removal.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_boolean_mask_generation_and_filtering.py",
    title: "1. Boolean Masking & 1D Collapsing Rule",
    badge: "Masks & Filtering",
    code: pyCode1,
    summary: "Demonstrates comparison predicate vectors, element counting, and why 2D matrix masking returns a 1D copy.",
  },
  {
    id: "part2",
    fileName: "02_compound_logical_conditions_and_bitwise.py",
    title: "2. Compound Bitwise &, |, ~ Conditions",
    badge: "Bitwise Operators",
    code: pyCode2,
    summary: "Covers & / | / ~ operators, mandatory parentheses, and explains why Python keywords 'and'/'or' throw ambiguous truth errors.",
  },
  {
    id: "part3",
    fileName: "03_conditional_mutation_and_relu.py",
    title: "3. In-Place Mutation & Neural ReLU",
    badge: "ReLU & np.where",
    code: pyCode3,
    summary: "Implements in-place ReLU activation (x[x < 0] = 0) and branchless ternary selection using np.where().",
  },
  {
    id: "part4",
    fileName: "04_ml_outlier_filtering_and_nan_removal.py",
    title: "4. ML Outlier & NaN Data Cleaning",
    badge: "ML Data Cleaning",
    code: pyCode4,
    summary: "Cleans dirty datasets with np.isnan(), synchronized row filtering of X and y, and Z-Score outlier removal.",
  },
];

// ─── Student Exam Dataset ───────────────────────────────────────────────────
const BARRACKPORE_STUDENTS = [
  { name: "Debangshu", score: 78, attendance: 92, status: "Pass" },
  { name: "Susmita", score: 42, attendance: 65, status: "Fail" },
  { name: "Swadeep", score: 91, attendance: 95, status: "Pass" },
  { name: "Tuhina", score: 35, attendance: 50, status: "Fail" },
  { name: "Sachin", score: 88, attendance: 88, status: "Pass" },
  { name: "Mahima", score: 59, attendance: 76, status: "Pass" },
  { name: "Abhronila", score: 95, attendance: 98, status: "Pass" },
  { name: "Rohan", score: 48, attendance: 62, status: "Fail" },
  { name: "Priyanka", score: 83, attendance: 84, status: "Pass" },
];

const PRESET_CONDITIONS = [
  { id: "pass", label: "Pass (Score >= 50)", minScore: 50, maxScore: 100, syntax: "scores >= 50" },
  { id: "distinction", label: "Distinction (Score >= 75)", minScore: 75, maxScore: 100, syntax: "scores >= 75" },
  { id: "remedial", label: "Remedial (Score < 50)", minScore: 0, maxScore: 49, syntax: "scores < 50" },
  { id: "mid_range", label: "Mid-Range (60 <= Score <= 85)", minScore: 60, maxScore: 85, syntax: "(scores >= 60) & (scores <= 85)" },
];

const Topic8 = () => {
  const [activeTab, setActiveTab] = useState("interactive_masker");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive Filter State
  const [minScore, setMinScore] = useState(50);
  const [maxScore, setMaxScore] = useState(100);

  // ReLU Activations State
  const [neuronLogits, setNeuronLogits] = useState([-3.2, 4.5, -0.8, 6.1, -2.0, 1.4]);

  const applyPreset = (preset) => {
    setMinScore(preset.minScore);
    setMaxScore(preset.maxScore);
  };

  const isMatched = (score) => score >= minScore && score <= maxScore;
  const matchedStudents = BARRACKPORE_STUDENTS.filter((s) => isMatched(s.score));
  const booleanMask = BARRACKPORE_STUDENTS.map((s) => isMatched(s.score));

  const reluOutputs = neuronLogits.map((val) => (val < 0 ? 0 : val));

  const updateLogit = (index, newVal) => {
    const next = [...neuronLogits];
    next[index] = parseFloat(newVal) || 0;
    setNeuronLogits(next);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* ─── HEADER ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  BCAC701B • Segment 9
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Module 1 • Topic 8
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>🎭 Boolean Indexing & Masking</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  arr[mask] • (a &gt; 50) &amp; (b &lt; 90) • arr[arr &lt; 0] = 0
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Mastering vectorized boolean masks, bitwise compound logic, in-place ReLU activation, and ML outlier filtering.
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-mono px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700 text-slate-400">
                Mentor: <strong className="text-emerald-400">Sukanta Hui</strong> • Barrackpore
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── TOP LEVEL NAVIGATION TABS ─────────────────────────────────────────── */}
      <nav className="bg-slate-950 border-b border-slate-800/80 sticky top-[73px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-1 py-2 scrollbar-thin scrollbar-thumb-slate-700">
            {[
              { id: "interactive_masker", label: "🎛️ Interactive Boolean Masker", icon: "🎭" },
              { id: "relu_simulator", label: "⚡ In-Place Mutation & ReLU", icon: "🧠" },
              { id: "compound_bitwise", label: "📏 Compound Logic (&, |, ~)", icon: "🧩" },
              { id: "ml_data_cleaning", label: "🤖 ML Cleaning & Class Subsetting", icon: "🧹" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── MAIN CONTENT CONTAINER ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ─── TAB 1: INTERACTIVE BOOLEAN MASKER ─── */}
        {activeTab === "interactive_masker" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🎛️ Interactive Student Exam Score Filter & Boolean Mask Generator</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Adjust score boundaries to see how NumPy generates a boolean array of True/False and filters the matching elements in real time.
                  </p>
                </div>
                {/* Presets */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_CONDITIONS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-emerald-500 hover:text-emerald-300 transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Minimum Score Threshold (<code className="text-emerald-400">&gt;= {minScore}</code>):
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minScore}
                    onChange={(e) => setMinScore(Math.min(maxScore, parseInt(e.target.value, 10)))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Maximum Score Threshold (<code className="text-blue-400">&lt;= {maxScore}</code>):
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={maxScore}
                    onChange={(e) => setMaxScore(Math.max(minScore, parseInt(e.target.value, 10)))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>

              {/* Syntax & Metrics Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono">
                    mask = (scores &gt;= {minScore}) &amp; (scores &lt;= {maxScore})
                  </span>
                  <span className="text-xs text-slate-300">
                    Matches: <strong className="text-emerald-400">{matchedStudents.length}</strong> of{" "}
                    <strong className="text-white">{BARRACKPORE_STUDENTS.length}</strong> students (
                    {Math.round((matchedStudents.length / BARRACKPORE_STUDENTS.length) * 100)}%)
                  </span>
                </div>
                <code className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  filtered = scores[mask]
                </code>
              </div>

              {/* Interactive Student Dataset Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {BARRACKPORE_STUDENTS.map((st, idx) => {
                  const match = isMatched(st.score);
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all ${
                        match
                          ? "bg-emerald-950/20 border-emerald-500/50 shadow-md shadow-emerald-950/30"
                          : "bg-slate-950/60 border-slate-800/80 opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{st.name}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            match
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          mask[{idx}] = {match ? "True" : "False"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>Score: <strong className={match ? "text-emerald-300" : "text-slate-400"}>{st.score}</strong></span>
                        <span>Att: {st.attendance}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extracted 1D Result Vector */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Resulting 1D Vector: scores[mask]
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    shape: ({matchedStudents.length},) • ndim: 1
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchedStudents.length > 0 ? (
                    matchedStudents.map((st, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-emerald-600/30 to-blue-600/30 border border-emerald-500/40 rounded-lg text-xs font-mono font-bold text-white"
                      >
                        {st.name}: {st.score}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No student scores matched this criteria.</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 2: RELU & IN-PLACE MUTATIONS ─── */}
        {activeTab === "relu_simulator" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧠 In-Place Conditional Mutation: Neural Network ReLU Activation</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                In deep learning, the Rectified Linear Unit (ReLU) activation <code className="text-emerald-400">f(x) = max(0, x)</code> replaces all negative values with 0. In NumPy, this is executed in-place via <code className="text-white font-mono">arr[arr &lt; 0] = 0</code>.
              </p>

              {/* Interactive Logits Editor */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {neuronLogits.map((val, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 font-mono block">Neuron x[{idx}]</span>
                    <input
                      type="number"
                      step="0.5"
                      value={val}
                      onChange={(e) => updateLogit(idx, e.target.value)}
                      className={`w-full bg-slate-900 border rounded px-2 py-1 text-xs font-mono font-bold text-center focus:outline-none ${
                        val < 0
                          ? "border-rose-500/50 text-rose-300"
                          : "border-emerald-500/50 text-emerald-300"
                      }`}
                    />
                    <div className="text-[10px] text-center font-mono">
                      {val < 0 ? (
                        <span className="text-rose-400 font-semibold">Negative ➔ 0</span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">Kept: {val}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before ReLU */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    1. Pre-Activation Tensor (Raw Logits)
                  </span>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      raw_x = np.array([{neuronLogits.join(", ")}])
                    </code>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {neuronLogits.map((v, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded text-xs font-mono ${
                          v < 0
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                            : "bg-slate-800 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* After ReLU */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    2. Post-Activation (After arr[arr &lt; 0] = 0)
                  </span>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-emerald-300 border border-slate-800">
                    <code>
                      raw_x[raw_x &lt; 0] = 0 # In-place zero clamping!
                    </code>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {reluOutputs.map((v, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                          v === 0 && neuronLogits[i] < 0
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                            : "bg-slate-800 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 3: COMPOUND BITWISE LOGIC ─── */}
        {activeTab === "compound_bitwise" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>📏 Compound Boolean Expressions & Operator Precedence</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Learn why bitwise operators (<code className="text-emerald-400">&amp;</code>, <code className="text-blue-400">|</code>, <code className="text-purple-400">~</code>) are mandatory in NumPy and how the parentheses rule prevents catastrophic syntax errors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono font-bold text-emerald-300 bg-slate-800 px-2 py-1 rounded">
                      &amp; (Bitwise AND)
                    </code>
                    <span className="text-[10px] text-slate-400">Element-wise AND</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evaluates to <code className="text-emerald-400">True</code> only when BOTH conditions are met simultaneously.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                    <code>(scores &gt;= 50) &amp; (scores &lt;= 80)</code>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono font-bold text-blue-300 bg-slate-800 px-2 py-1 rounded">
                      | (Bitwise OR)
                    </code>
                    <span className="text-[10px] text-slate-400">Element-wise OR</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evaluates to <code className="text-blue-400">True</code> if AT LEAST ONE condition is satisfied.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                    <code>(scores &lt; 40) | (scores &gt; 90)</code>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono font-bold text-purple-300 bg-slate-800 px-2 py-1 rounded">
                      ~ (Bitwise NOT)
                    </code>
                    <span className="text-[10px] text-slate-400">Inversion / Negation</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Flips True to False and False to True across the entire boolean array.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                    <code>non_failed = scores[~(scores &lt; 50)]</code>
                  </div>
                </div>
              </div>

              {/* The Operator Precedence Trap Alert */}
              <div className="bg-rose-950/30 border border-rose-500/50 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>🚨 The Mandatory Parentheses Rule</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In Python, the bitwise operator <code className="text-rose-300">&amp;</code> has a higher precedence than comparison operators (<code className="text-white">&gt;</code>, <code className="text-white">&lt;</code>).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-slate-900/80 rounded border border-rose-500/40 text-rose-300">
                    <p className="text-slate-500 font-sans font-bold">❌ Fatal Error (Without Parentheses):</p>
                    <p className="mt-1">scores &gt; 50 &amp; scores &lt; 80</p>
                    <p className="text-[10px] text-slate-400 font-sans mt-1">
                      Evaluated as: scores &gt; (50 &amp; scores) &lt; 80 ➔ Crashes!
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded border border-emerald-500/40 text-emerald-300">
                    <p className="text-slate-500 font-sans font-bold">✅ Correct Form (With Parentheses):</p>
                    <p className="mt-1">(scores &gt; 50) &amp; (scores &lt; 80)</p>
                    <p className="text-[10px] text-slate-400 font-sans mt-1">
                      Evaluates both sub-masks first, then performs element-wise AND.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 4: ML DATA CLEANING & SCENARIOS ─── */}
        {activeTab === "ml_data_cleaning" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🤖 4 Essential Machine Learning Use Cases</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                From outlier elimination to missing value filtering, boolean indexing is the backbone of ML data preparation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Case 1: Outlier Removal */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    <h3 className="text-sm font-bold text-emerald-400">1. Statistical Outlier Removal (3-Sigma Rule)</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Filter out anomalous data points located more than 3 standard deviations away from the mean.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      mu = np.mean(X)<br />
                      sigma = np.std(X)<br />
                      clean_X = X[np.abs(X - mu) &lt;= 3 * sigma]
                    </code>
                  </div>
                </div>

                {/* Case 2: NaN Masking */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🩹</span>
                    <h3 className="text-sm font-bold text-blue-400">2. Missing Value / NaN Filtering</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Never use <code className="text-white">x != np.nan</code>! Always use <code className="text-blue-300">~np.isnan()</code> to remove corrupted float NaNs.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      # Select non-NaN rows only<br />
                      valid_data = raw_data[~np.isnan(raw_data)]
                    </code>
                  </div>
                </div>

                {/* Case 3: Class Filtering */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    <h3 className="text-sm font-bold text-purple-400">3. Class-Specific Feature Subsetting</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Extract all sample feature rows in matrix <code className="text-white">X</code> belonging to class 1 for visualization or balancing.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      # y is 1D array of target labels<br />
                      X_positive = X[y == 1]<br />
                      X_negative = X[y == 0]
                    </code>
                  </div>
                </div>

                {/* Case 4: Binary Thresholding */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚖️</span>
                    <h3 className="text-sm font-bold text-amber-400">4. Binary Classification Thresholding</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Convert model probabilities into discrete 0/1 predictions using vectorized comparison and dtype casting.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      probs = model.predict_proba(X_test)[:, 1]<br />
                      preds = (probs &gt;= 0.5).astype(int)
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── CODE DEMONSTRATION (MULTI-SCRIPT SUITE) ────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">💻</div>
            <div>
              <h2 className="text-xl font-bold text-white">Python Code Demonstration Suite (4 Focused Scripts)</h2>
              <p className="text-xs text-slate-400">Select a script below to inspect boolean filtering, compound bitwise conditions, ReLU mutation, or ML outlier cleaning</p>
            </div>
          </div>

          {/* Script Selection Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PYTHON_SCRIPTS.map((script) => (
              <button
                key={script.id}
                onClick={() => setSelectedScriptId(script.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedScriptId === script.id
                    ? "bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40 scale-[1.02]"
                    : "bg-slate-950/70 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      selectedScriptId === script.id
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    {script.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-white truncate">{script.title}</p>
              </button>
            ))}
          </div>

          {/* Active Script Description Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {activeScript.fileName}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{activeScript.summary}</p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={activeScript.code}
            title={activeScript.fileName}
          />
        </section>

        {/* ─── COMMON PITFALLS ───────────────────────────────────────────────── */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <span>⚠️ Boolean Indexing Pitfalls & How to Avoid Them</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                1. Using Python `and` / `or` Keywords
              </strong>
              <p>
                Writing <code className="text-white">a &gt; 0 and a &lt; 10</code> crashes with <code className="text-rose-300">ValueError: The truth value of an array is ambiguous</code>. Always use <code className="text-emerald-400">(a &gt; 0) &amp; (a &lt; 10)</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                2. Comparing Directly with NaN: `x == np.nan`
              </strong>
              <p>
                By IEEE 754 standard, <code className="text-white">np.nan == np.nan</code> is <code className="text-rose-300">False</code>. Therefore, <code className="text-white">arr[arr == np.nan]</code> matches NOTHING! Always use <code className="text-blue-300">np.isnan(arr)</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                3. Expecting 2D Output from 2D Boolean Masking
              </strong>
              <p>
                <code className="text-white">mat[mat &gt; 50]</code> always returns a 1D vector because the count of True items per row varies. Use <code className="text-purple-300">np.where(mat &gt; 50, mat, 0)</code> if you must preserve 2D shape.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                4. Boolean Mask Dimension Mismatch
              </strong>
              <p>
                Indexing an array of length 10 with a boolean mask of length 9 raises an <code className="text-rose-300">IndexError</code>. Ensure masks match the target axis dimension.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CLASSROOM INTERACTION / BARRACKPORE DIALOGUES ─────────────────── */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💬 Barrackpore Classroom Q&A</span>
            </h2>
            <span className="text-xs text-emerald-400 font-mono">Coder & AccoTax Live Session</span>
          </div>

          <div className="space-y-3">
            {[
              {
                student: "Debangshu",
                avatar: "👨‍💻",
                question: "Sir, why does NumPy give an error when I use 'and' between two conditions on an array of marks?",
                answer: "Debangshu, Python's 'and' keyword tries to evaluate the entire array as a single boolean entity. Since an array has many booleans, Python complains that its truth value is ambiguous! To check element-by-element, we must use the bitwise '&' operator wrapped in parentheses: (marks >= 40) & (marks <= 80).",
              },
              {
                student: "Susmita",
                avatar: "👩‍💻",
                question: "How does NumPy count the number of passed students with np.sum(scores >= 50)?",
                answer: "Susmita, in Python and NumPy, boolean True is mathematically treated as 1, and False as 0! When np.sum() adds up all the True (1) and False (0) values in the mask, it gives the exact count of students who passed.",
              },
              {
                student: "Swadeep",
                avatar: "👨‍🎓",
                question: "If I want to replace all negative numbers in my neural network weights with 0, is arr[arr < 0] = 0 faster than a Python for-loop?",
                answer: "Infinitely faster, Swadeep! arr[arr < 0] = 0 executes entirely inside compiled C without Python interpreter overhead. On a 1-million weight tensor, it runs in under 1 millisecond compared to 200+ milliseconds with a Python loop.",
              },
            ].map((dialogue, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                  <span>{dialogue.avatar}</span>
                  <span>{dialogue.student} asks:</span>
                </div>
                <p className="text-xs text-slate-300 italic pl-6">"{dialogue.question}"</p>
                <div className="flex items-start gap-2 pt-2 border-t border-slate-800 text-xs text-emerald-300">
                  <span className="font-bold text-emerald-400 whitespace-nowrap">Sukanta Sir:</span>
                  <p className="text-slate-300">{dialogue.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ACCORDION ─────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>❓ Frequently Asked Questions & Practice Problems</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">{questions.length} Questions & Answers</span>
          </div>
          <FAQTemplate questions={questions} />
        </section>

        {/* ─── PRINTABLE SUMMARY NOTE ────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📄 Printable Topic Summary Note</span>
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              topic8_note.txt
            </span>
          </div>
          <PlainTextPrint text={noteText} fileName="topic8_note.txt" />
        </section>

        {/* ─── TEACHER PERSONA SIGNATURE ─────────────────────────────────────── */}
        <Teacher />
      </main>
    </div>
  );
};

export default Topic8;

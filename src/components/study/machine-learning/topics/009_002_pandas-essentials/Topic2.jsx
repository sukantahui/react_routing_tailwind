import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic2_files/01_series_deep_dive_index_alignment.py?raw";
import pyCode2 from "./topic2_files/02_dataframe_anatomy_axes_and_dtypes.py?raw";
import pyCode3 from "./topic2_files/03_series_to_dataframe_conversions.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_series_deep_dive_index_alignment.py",
    title: "1. Series & Automatic Index Alignment",
    badge: "Index Alignment",
    code: pyCode1,
    summary: "Demonstrates label-based arithmetic alignment, automatic NaN generation on union mismatches, and safe addition with fill_value=0.",
  },
  {
    id: "part2",
    fileName: "02_dataframe_anatomy_axes_and_dtypes.py",
    title: "2. DataFrame Anatomy & Memory Usage",
    badge: "Axes & Dtypes",
    code: pyCode2,
    summary: "Explores df.index (Axis 0), df.columns (Axis 1), heterogeneous column dtypes, and deep memory profiling in RAM.",
  },
  {
    id: "part3",
    fileName: "03_series_to_dataframe_conversions.py",
    title: "3. Series to DataFrame Conversions",
    badge: "Conversions & Concat",
    code: pyCode3,
    summary: "Converts Series via .to_frame(), concatenates multiple Series along columns (axis=1), and explores single vs double bracket indexing.",
  },
];

const SERIES_A = [
  { label: "Debangshu", val: 85 },
  { label: "Susmita",   val: 92 },
  { label: "Swadeep",   val: 65 },
  { label: "Tuhina",    val: 88 },
];

const SERIES_B = [
  { label: "Susmita",   val: 90 },
  { label: "Debangshu", val: 88 },
  { label: "Sachin",    val: 78 },
  { label: "Tuhina",    val: 85 },
];

const Topic2 = () => {
  const [activeTab, setActiveTab] = useState("alignment_simulator");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [fillMode, setFillMode] = useState("standard"); // "standard" (+), "fill_zero" (.add(fill_value=0))

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Combined Union of labels
  const allLabels = Array.from(new Set([...SERIES_A.map((s) => s.label), ...SERIES_B.map((s) => s.label)]));

  const mapA = Object.fromEntries(SERIES_A.map((s) => [s.label, s.val]));
  const mapB = Object.fromEntries(SERIES_B.map((s) => [s.label, s.val]));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-teal-900/60 via-slate-900 to-indigo-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/40">
                Module 009_002 • Pandas Essentials
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                Topic 2 • Series &amp; DataFrame Concepts
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Series &amp; DataFrame Anatomy
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master the internal mechanics of 1D <code className="text-teal-300 font-mono">pd.Series</code> and 2D <code className="text-cyan-300 font-mono">pd.DataFrame</code>: index-label alignment, handling NaN propagation with <code className="text-amber-300 font-mono">fill_value</code>, single vs double bracket slicing, and deep memory diagnostics.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "alignment_simulator", label: "Automatic Index Alignment Simulator", icon: "🧬" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Automatic Index Alignment Simulator */}
      {activeTab === "alignment_simulator" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Operation Mode:</h3>
              <p className="text-xs text-slate-400">Toggle standard arithmetic vs fill_value handling</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFillMode("standard")}
                className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition ${
                  fillMode === "standard"
                    ? "bg-teal-500 border-teal-400 text-slate-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                Series A + Series B (Default)
              </button>
              <button
                onClick={() => setFillMode("fill_zero")}
                className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition ${
                  fillMode === "fill_zero"
                    ? "bg-teal-500 border-teal-400 text-slate-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                Series A.add(Series B, fill_value=0)
              </button>
            </div>
          </div>

          {/* Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Series A */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-teal-300">Series A (Exam 1)</h4>
                <span className="text-xs font-mono text-slate-400">len=4</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                {SERIES_A.map((s) => (
                  <div key={s.label} className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-cyan-300">{s.label}</span>
                    <span className="text-teal-300 font-bold">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Series B */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-indigo-300">Series B (Exam 2)</h4>
                <span className="text-xs font-mono text-slate-400">len=4</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                {SERIES_B.map((s) => (
                  <div key={s.label} className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-cyan-300">{s.label}</span>
                    <span className="text-indigo-300 font-bold">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aligned Result */}
            <div className="bg-slate-900/90 border border-teal-500/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-bold text-amber-300">
                    {fillMode === "standard" ? "Result (A + B)" : "Result (A.add(B, fill=0))"}
                  </h4>
                  <span className="text-xs font-mono text-amber-400">Union len={allLabels.length}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                  {allLabels.map((lbl) => {
                    const valA = mapA[lbl];
                    const valB = mapB[lbl];

                    let res = "NaN";
                    let isNan = false;

                    if (fillMode === "standard") {
                      if (valA !== undefined && valB !== undefined) {
                        res = (valA + valB).toFixed(1);
                      } else {
                        isNan = true;
                      }
                    } else {
                      const safeA = valA ?? 0;
                      const safeB = valB ?? 0;
                      res = (safeA + safeB).toFixed(1);
                    }

                    return (
                      <div
                        key={lbl}
                        className={`flex justify-between p-2 rounded border transition ${
                          isNan
                            ? "bg-rose-950/40 border-rose-800 text-rose-300 font-bold"
                            : "bg-emerald-950/30 border-emerald-800 text-emerald-200 font-bold"
                        }`}
                      >
                        <span className="text-slate-200">{lbl}</span>
                        <span>{res}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                🔍 Notice: <strong>Swadeep</strong> and <strong>Sachin</strong> only exist in one series. Without <code className="text-teal-300 font-mono">fill_value=0</code>, the outer join returns <code className="text-rose-400 font-mono">NaN</code>!
              </div>
            </div>
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
                    ? "bg-teal-950/40 border-teal-500 shadow-lg shadow-teal-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
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
                <h3 className="text-lg font-bold text-teal-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Series &amp; DataFrame Suite
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
            quote="The fundamental superpower that makes Pandas so reliable for data science is automatic label alignment. When joining, subtracting, or aggregating datasets, Pandas matches rows by their explicit index keys, preventing silent mismatch bugs that often plague raw Python lists and coordinate-based arrays."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-teal-300 mb-4 flex items-center gap-2">
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

export default Topic2;

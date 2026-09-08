import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic18_files/01_feature_centering_mean_subtraction.py?raw";
import pyCode2 from "./topic18_files/02_per_sample_baseline_adjustment.py?raw";
import pyCode3 from "./topic18_files/03_batch_image_rgb_channel_normalization.py?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_feature_centering_mean_subtraction.py",
    title: "1. Feature Centering (Columnar Broadcasting)",
    badge: "Column Centering",
    code: pyCode1,
    summary: "Demonstrates column mean subtraction X - mu where (3,) broadcasts across (4, 3) to yield zero-centered features.",
  },
  {
    id: "part2",
    fileName: "02_per_sample_baseline_adjustment.py",
    title: "2. Per-Sample Row-wise Broadcasting",
    badge: "Row (N, 1) Alignment",
    code: pyCode2,
    summary: "Fixes broadcasting shape mismatches using np.newaxis / keepdims=True to subtract per-student min values (4, 1) from (4, 3).",
  },
  {
    id: "part3",
    fileName: "03_batch_image_rgb_channel_normalization.py",
    title: "3. 4D ImageNet RGB Channel Broadcasting",
    badge: "4D Vision Tensor",
    code: pyCode3,
    summary: "Applies 1D RGB channel constants (3,) to 4D image batch tensors (8, 224, 224, 3) with zero memory duplication.",
  },
];

const RAW_DATA = [
  { name: "Debangshu", math: 85, science: 90, english: 88 },
  { name: "Susmita",   math: 92, science: 95, english: 91 },
  { name: "Swadeep",   math: 65, science: 70, english: 72 },
  { name: "Tuhina",    math: 88, science: 85, english: 94 },
];

const Topic18 = () => {
  const [activeTab, setActiveTab] = useState("broadcasting_simulator");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [broadcastMode, setBroadcastMode] = useState("column_centering"); // "column_centering", "row_baseline", "scalar_boost"

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Calculations
  const colMeans = {
    math: 82.5,
    science: 85.0,
    english: 86.25,
  };

  const rowMins = RAW_DATA.map((s) => Math.min(s.math, s.science, s.english));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-emerald-900/60 via-slate-900 to-teal-900/60 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/40">
                Topic 18 • Practical Case Study
              </span>
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/40">
                Worked Example 2
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-300 bg-clip-text text-transparent">
              Worked Example 2: Broadcasting Addition &amp; Centering
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Apply broadcasting principles to real-world machine learning preprocessing: zero-centering feature columns, per-sample baseline subtractions, and high-dimensional computer vision image normalization.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "broadcasting_simulator", label: "Interactive Broadcasting Sandbox", icon: "📡" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive Broadcasting Sandbox */}
      {activeTab === "broadcasting_simulator" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">
              Select Broadcasting Scenario:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "column_centering", title: "1. Column Mean Centering", desc: "X - mu (Shape: (4, 3) - (3,))" },
                { id: "row_baseline", title: "2. Row-Wise Min Subtraction", desc: "X - min[:, np.newaxis] (Shape: (4, 3) - (4, 1))" },
                { id: "scalar_boost", title: "3. Scalar Grace Score", desc: "X + 5.0 (Shape: (4, 3) + ())" },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBroadcastMode(b.id)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    broadcastMode === b.id
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{b.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Array & Broadcast Vector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h4 className="text-base font-bold text-slate-200 flex items-center justify-between">
                <span>1. Original Feature Matrix X</span>
                <span className="text-xs px-2.5 py-0.5 bg-slate-800 text-slate-400 font-mono rounded">
                  Shape: (4, 3)
                </span>
              </h4>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="p-1.5 text-left">Student</th>
                      <th className="p-1.5 text-emerald-400">Math</th>
                      <th className="p-1.5 text-emerald-400">Science</th>
                      <th className="p-1.5 text-emerald-400">English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RAW_DATA.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-900">
                        <td className="p-2 text-slate-400 font-sans text-left text-xs">{row.name}</td>
                        <td className="p-2 bg-slate-900/60 text-slate-200">{row.math}</td>
                        <td className="p-2 bg-slate-900/60 text-slate-200">{row.science}</td>
                        <td className="p-2 bg-slate-900/60 text-slate-200">{row.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Broadcast Vector Display */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400 mb-2 font-bold">
                  <span>Broadcast Vector / Constant B</span>
                  <span>
                    Shape: {broadcastMode === "column_centering" ? "(3,)" : broadcastMode === "row_baseline" ? "(4, 1)" : "()"}
                  </span>
                </div>
                {broadcastMode === "column_centering" && (
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 bg-cyan-950/40 border border-cyan-800/60 rounded text-cyan-300">
                      Math: {colMeans.math}
                    </div>
                    <div className="p-2 bg-cyan-950/40 border border-cyan-800/60 rounded text-cyan-300">
                      Sci: {colMeans.science}
                    </div>
                    <div className="p-2 bg-cyan-950/40 border border-cyan-800/60 rounded text-cyan-300">
                      Eng: {colMeans.english}
                    </div>
                  </div>
                )}
                {broadcastMode === "row_baseline" && (
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    {RAW_DATA.map((s, i) => (
                      <div key={i} className="p-2 bg-cyan-950/40 border border-cyan-800/60 rounded text-cyan-300">
                        {s.name}: {rowMins[i]}
                      </div>
                    ))}
                  </div>
                )}
                {broadcastMode === "scalar_boost" && (
                  <div className="p-2 bg-cyan-950/40 border border-cyan-800/60 rounded text-cyan-300 text-center font-mono text-xs">
                    Scalar Value = +5.0 Marks
                  </div>
                )}
              </div>
            </div>

            {/* Transformed Broadcast Result */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-emerald-300 mb-2">
                  2. Resulting Transformed Matrix
                </h4>
                <p className="text-xs text-slate-400 mb-4 font-mono">
                  {broadcastMode === "column_centering"
                    ? "X_centered = X - np.mean(X, axis=0)"
                    : broadcastMode === "row_baseline"
                    ? "X_relative = X - np.min(X, axis=1)[:, np.newaxis]"
                    : "X_boosted = X + 5.0"}
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-center text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        <th className="p-1.5 text-left">Student</th>
                        <th className="p-1.5 text-amber-400">Math</th>
                        <th className="p-1.5 text-amber-400">Science</th>
                        <th className="p-1.5 text-amber-400">English</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RAW_DATA.map((row, idx) => {
                        let m = row.math;
                        let s = row.science;
                        let e = row.english;

                        if (broadcastMode === "column_centering") {
                          m = parseFloat((m - colMeans.math).toFixed(2));
                          s = parseFloat((s - colMeans.science).toFixed(2));
                          e = parseFloat((e - colMeans.english).toFixed(2));
                        } else if (broadcastMode === "row_baseline") {
                          const base = rowMins[idx];
                          m = m - base;
                          s = s - base;
                          e = e - base;
                        } else if (broadcastMode === "scalar_boost") {
                          m = m + 5;
                          s = s + 5;
                          e = e + 5;
                        }

                        return (
                          <tr key={idx} className="border-b border-slate-900">
                            <td className="p-2 text-slate-400 font-sans text-left text-xs">{row.name}</td>
                            <td className="p-2 bg-emerald-950/30 text-emerald-200 font-bold">{m > 0 && broadcastMode === "column_centering" ? `+${m}` : m}</td>
                            <td className="p-2 bg-emerald-950/30 text-emerald-200 font-bold">{s > 0 && broadcastMode === "column_centering" ? `+${s}` : s}</td>
                            <td className="p-2 bg-emerald-950/30 text-emerald-200 font-bold">{e > 0 && broadcastMode === "column_centering" ? `+${e}` : e}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-950/30 border border-emerald-900/60 rounded-xl text-xs text-slate-300">
                <span className="text-emerald-300 font-bold block mb-1">⚡ Zero Memory Duplication:</span>
                Broadcasting does not physically clone the vector into a 4x3 array in RAM. Instead, it strides across memory at pointer offset 0, executing blazing-fast SIMD operations!
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
                    ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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
                <h3 className="text-lg font-bold text-emerald-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Worked Example 2 Suite
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
            quote="Broadcasting is the secret weapon of efficient NumPy and PyTorch code. Always align dimensions from right to left in your head. When subtracting per-row statistics like mins or medians, never forget to keep the singleton column dimension (N, 1) using keepdims=True or np.newaxis!"
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
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

export default Topic18;

import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic15_files/01_vstack_hstack_dstack_mechanics.py?raw";
import pyCode2 from "./topic15_files/02_concatenate_and_stack_new_axis.py?raw";
import pyCode3 from "./topic15_files/03_vsplit_hsplit_array_split.py?raw";
import pyCode4 from "./topic15_files/04_ml_adding_bias_column_and_kfolds.py?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_vstack_hstack_dstack_mechanics.py",
    title: "1. vstack, hstack & dstack Mechanics",
    badge: "Stacking",
    code: pyCode1,
    summary: "Demonstrates vertical stacking (axis 0 rows), horizontal stacking (axis 1 cols), 1D vector edge cases, and 3D image depth stacking (dstack).",
  },
  {
    id: "part2",
    fileName: "02_concatenate_and_stack_new_axis.py",
    title: "2. concatenate vs stack & New Axis",
    badge: "concatenate vs stack",
    code: pyCode2,
    summary: "Contrasts joining along existing dimensions (np.concatenate) with creating brand-new higher dimensions (np.stack) and column_stack.",
  },
  {
    id: "part3",
    fileName: "03_vsplit_hsplit_array_split.py",
    title: "3. vsplit, hsplit & array_split",
    badge: "Array Splitting",
    code: pyCode3,
    summary: "Performs row splits (vsplit), separates features and labels (hsplit), and handles non-divisible chunk counts safely with np.array_split.",
  },
  {
    id: "part4",
    fileName: "04_ml_adding_bias_column_and_kfolds.py",
    title: "4. ML Bias Column & K-Fold Splitter",
    badge: "ML K-Fold & Bias",
    code: pyCode4,
    summary: "Prepends augmented bias column [1 | X] for linear regression and generates complete K-Fold Cross Validation train/validation partitions.",
  },
];

const ARRAY_A = [
  [85, 90, 88],
  [92, 95, 91],
];

const ARRAY_B = [
  [65, 70, 72],
  [88, 85, 94],
];

const EXTRA_FEATURES = [
  [100, 95],
  [98, 99],
];

const Topic15 = () => {
  const [activeTab, setActiveTab] = useState("interactive_stacker");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [stackMode, setStackMode] = useState("vstack"); // "vstack", "hstack", "concat_ax0", "concat_ax1", "bias_term", "vsplit", "hsplit"

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Helper calculations for dynamic display
  const getOutputData = () => {
    switch (stackMode) {
      case "vstack":
      case "concat_ax0":
        return {
          title: "np.vstack((A, B)) / np.concatenate(axis=0)",
          shape: "(4, 3)",
          desc: "Vertical row concatenation along Axis 0 (4 students × 3 subjects)",
          rows: [...ARRAY_A, ...ARRAY_B],
          tags: ["A[0]", "A[1]", "B[0]", "B[1]"],
        };
      case "hstack":
      case "concat_ax1":
        return {
          title: "np.hstack((A, Extra)) / np.concatenate(axis=1)",
          shape: "(2, 5)",
          desc: "Horizontal column concatenation along Axis 1 (2 students × 5 features)",
          rows: ARRAY_A.map((r, i) => [...r, ...EXTRA_FEATURES[i]]),
          tags: ["A + Extra [0]", "A + Extra [1]"],
        };
      case "bias_term":
        return {
          title: "Design Matrix: [1 | A] (np.hstack)",
          shape: "(2, 4)",
          desc: "Augmented feature matrix with prepended bias column (x_0 = 1)",
          rows: ARRAY_A.map((r) => [1, ...r]),
          tags: ["Student 1", "Student 2"],
          highlightCol: 0,
        };
      case "vsplit":
        return {
          title: "np.vsplit(vstack_result, 2)",
          shape: "2 arrays of (2, 3)",
          desc: "Splits 4-row matrix vertically into Train (2 samples) and Test (2 samples)",
          splitGroups: [ARRAY_A, ARRAY_B],
          groupNames: ["Split 1 (Train)", "Split 2 (Test)"],
        };
      case "hsplit":
        return {
          title: "np.hsplit(A, [2]) -> Features X vs Target y",
          shape: "X: (2, 2), y: (2, 1)",
          desc: "Splits columns horizontally: First 2 cols as Features, 3rd col as Target label",
          splitGroups: [
            ARRAY_A.map((r) => [r[0], r[1]]),
            ARRAY_A.map((r) => [r[2]]),
          ],
          groupNames: ["Features X (2x2)", "Target y (2x1)"],
        };
      default:
        return null;
    }
  };

  const output = getOutputData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-cyan-900/60 via-slate-900 to-emerald-900/60 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/40">
                Topic 15 • Array Reshaping &amp; Structuring
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/40">
                Stacking &amp; Splitting
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-200 via-teal-100 to-emerald-300 bg-clip-text text-transparent">
              Stacking &amp; Splitting Arrays in NumPy
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master horizontal and vertical concatenation (<code className="text-cyan-300 font-mono">vstack</code>, <code className="text-emerald-300 font-mono">hstack</code>, <code className="text-teal-300 font-mono">concatenate</code>), new dimension injection with <code className="text-amber-300 font-mono">np.stack</code>, and dataset partitioning with <code className="text-rose-300 font-mono">vsplit</code>, <code className="text-indigo-300 font-mono">hsplit</code>, and <code className="text-cyan-300 font-mono">array_split</code>.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "interactive_stacker", label: "Interactive Stacking & Splitting Simulator", icon: "🧱" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive Stacking & Splitting */}
      {activeTab === "interactive_stacker" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
              Select Stacking / Splitting Transformation:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {[
                { id: "vstack", label: "np.vstack", badge: "Row Stack (Axis 0)", color: "cyan" },
                { id: "hstack", label: "np.hstack", badge: "Col Stack (Axis 1)", color: "emerald" },
                { id: "bias_term", label: "Add Bias Term", badge: "Augment [1 | X]", color: "amber" },
                { id: "vsplit", label: "np.vsplit", badge: "Row Partition", color: "indigo" },
                { id: "hsplit", label: "np.hsplit", badge: "Feature / Label Split", color: "rose" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setStackMode(btn.id)}
                  className={`p-3 rounded-xl border text-left transition ${
                    stackMode === btn.id
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="font-mono font-bold text-xs">{btn.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{btn.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Arrays Display */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-cyan-300 flex items-center justify-between">
                <span>Input Arrays (Barrackpore Batch Records)</span>
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 font-mono rounded">2D Arrays</span>
              </h4>

              {/* Array A */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400 mb-2 font-bold">
                  <span>Array A: Batch 1 (Debangshu, Susmita)</span>
                  <span>Shape: (2, 3)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  {ARRAY_A.map((row, r) =>
                    row.map((val, c) => (
                      <div key={`${r}-${c}`} className="p-2 bg-cyan-950/40 border border-cyan-800/60 rounded text-cyan-200">
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Array B or Extra Features */}
              {stackMode === "hstack" ? (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-mono text-emerald-400 mb-2 font-bold">
                    <span>Extra Features: Project 1 &amp; Project 2</span>
                    <span>Shape: (2, 2)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                    {EXTRA_FEATURES.map((row, r) =>
                      row.map((val, c) => (
                        <div key={`${r}-${c}`} className="p-2 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-200">
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-mono text-emerald-400 mb-2 font-bold">
                    <span>Array B: Batch 2 (Swadeep, Tuhina)</span>
                    <span>Shape: (2, 3)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    {ARRAY_B.map((row, r) =>
                      row.map((val, c) => (
                        <div key={`${r}-${c}`} className="p-2 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-200">
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Transformed Result Output */}
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-bold text-emerald-300">{output.title}</h4>
                  <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono font-bold rounded-lg border border-emerald-500/30">
                    Shape: {output.shape}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{output.desc}</p>

                {/* Display Grid or Split Groups */}
                {output.rows && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                    <table className="w-full text-center text-xs font-mono">
                      <tbody>
                        {output.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-slate-900">
                            <td className="p-2 text-slate-500 text-[11px] text-left">{output.tags[rIdx]}</td>
                            {row.map((val, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-2 border border-slate-800/80 rounded ${
                                  output.highlightCol === cIdx
                                    ? "bg-amber-500/30 border-amber-400 text-amber-200 font-bold"
                                    : "bg-slate-900/60 text-slate-200"
                                }`}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {output.splitGroups && (
                  <div className="space-y-4">
                    {output.splitGroups.map((group, gIdx) => (
                      <div key={gIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="text-xs font-mono text-teal-400 font-bold mb-2">
                          {output.groupNames[gIdx]}
                        </div>
                        <div className="grid gap-1 text-center text-xs font-mono" style={{ gridTemplateColumns: `repeat(${group[0].length}, minmax(0, 1fr))` }}>
                          {group.map((row, r) =>
                            row.map((val, c) => (
                              <div key={`${r}-${c}`} className="p-2 bg-slate-900 border border-slate-800 rounded text-slate-200">
                                {val}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Memory & Axis Mechanics Tip */}
              <div className="mt-6 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="text-cyan-400 font-semibold font-mono">💡 Pro-Tip:</span> Concatenation and stacking create a <strong>new contiguous memory block</strong> (copying elements). In contrast, array splitting returns <strong>views</strong> of the underlying data whenever memory layout permits!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
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
                <h3 className="text-lg font-bold text-cyan-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                NumPy Structuring Suite
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
            quote="When preparing data for machine learning models, you spend considerable time structuring arrays: stacking batches of images along new axes, prepending 1s to feature matrices for regression bias terms, and splitting datasets into training, validation, and test folds. Keep a clear mental model of Axis 0 (rows) vs Axis 1 (columns) to avoid dimension bugs."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
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

export default Topic15;

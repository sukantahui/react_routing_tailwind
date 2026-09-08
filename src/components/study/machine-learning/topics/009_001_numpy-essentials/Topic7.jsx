import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic7_files/01_1d_and_2d_slicing_basics.py?raw";
import pyCode2 from "./topic7_files/02_views_vs_copies_slicing_mutations.py?raw";
import pyCode3 from "./topic7_files/03_ellipsis_and_axis_slicing.py?raw";
import pyCode4 from "./topic7_files/04_ml_dataset_splitting_and_feature_target_extraction.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_1d_and_2d_slicing_basics.py",
    title: "1. 1D & 2D Slicing Mechanics",
    badge: "1D & 2D Slicing",
    code: pyCode1,
    summary: "Demonstrates half-open start:stop:step slicing, row/column sub-matrices on student marks tables, and array reversals.",
  },
  {
    id: "part2",
    fileName: "02_views_vs_copies_slicing_mutations.py",
    title: "2. Views vs Copies & In-Place Mutation Trap",
    badge: "Views vs Copies",
    code: pyCode2,
    summary: "Demonstrates how basic slices share memory (.base), why mutating slices corrupts parent data, and how to use .copy().",
  },
  {
    id: "part3",
    fileName: "03_ellipsis_and_axis_slicing.py",
    title: "3. Ellipsis (...) & Tensor Slicing",
    badge: "Ellipsis (...)",
    code: pyCode3,
    summary: "Uses Ellipsis (...) across 3D time-series and 4D image tensors to extract specific channels and timestamps with clean syntax.",
  },
  {
    id: "part4",
    fileName: "04_ml_dataset_splitting_and_feature_target_extraction.py",
    title: "4. ML Dataset Splitting & X/y Extraction",
    badge: "ML Data Split",
    code: pyCode4,
    summary: "Extracts feature matrix X and target labels y with data[:, :-1] and data[:, -1], performing an 80/20 train/test split.",
  },
];

// ─── Preset Dataset Grid (4 Students x 4 Subjects) ───────────────────────────
const STUDENT_GRID = [
  { student: "Debangshu", marks: [75, 82, 90, 68] },
  { student: "Susmita", marks: [88, 94, 91, 85] },
  { student: "Swadeep", marks: [62, 70, 74, 60] },
  { student: "Tuhina", marks: [92, 89, 96, 95] },
];

const PRESET_SLICES = [
  {
    id: "full",
    label: "Full Matrix [:, :]",
    rStart: 0,
    rEnd: 4,
    cStart: 0,
    cEnd: 4,
    syntax: "mat[:, :]",
    shape: "(4, 4)",
    desc: "Selects all 4 students and all 4 subjects.",
  },
  {
    id: "susmita",
    label: "Susmita Row [1:2, :]",
    rStart: 1,
    rEnd: 2,
    cStart: 0,
    cEnd: 4,
    syntax: "mat[1:2, :]",
    shape: "(1, 4)",
    desc: "Preserves 2D matrix shape for a single student row.",
  },
  {
    id: "math_col",
    label: "Math Column [:, 2:3]",
    rStart: 0,
    rEnd: 4,
    cStart: 2,
    cEnd: 3,
    syntax: "mat[:, 2:3]",
    shape: "(4, 1)",
    desc: "2D column feature for Math across all students.",
  },
  {
    id: "top_left_2x2",
    label: "Top-Left 2x2 Submatrix [0:2, 0:2]",
    rStart: 0,
    rEnd: 2,
    cStart: 0,
    cEnd: 2,
    syntax: "mat[0:2, 0:2]",
    shape: "(2, 2)",
    desc: "Debangshu & Susmita for Sub 1 & Sub 2.",
  },
  {
    id: "bottom_right_2x2",
    label: "Bottom-Right 2x2 [2:4, 2:4]",
    rStart: 2,
    rEnd: 4,
    cStart: 2,
    cEnd: 4,
    syntax: "mat[2:4, 2:4]",
    shape: "(2, 2)",
    desc: "Swadeep & Tuhina for Sub 3 & Sub 4.",
  },
];

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState("visual_grid");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive Slicing Sliders State
  const [rStart, setRStart] = useState(0);
  const [rEnd, setREnd] = useState(2);
  const [cStart, setCStart] = useState(0);
  const [cEnd, setCEnd] = useState(2);

  // View vs Copy Interactive State
  const [gridData, setGridData] = useState([
    [10, 20, 30],
    [40, 50, 60],
  ]);
  const [copyData, setCopyData] = useState([
    [10, 20],
    [40, 50],
  ]);

  const handleApplyPreset = (preset) => {
    setRStart(preset.rStart);
    setREnd(preset.rEnd);
    setCStart(preset.cStart);
    setCEnd(preset.cEnd);
  };

  const selectedRows = Math.max(0, rEnd - rStart);
  const selectedCols = Math.max(0, cEnd - cStart);
  const totalSelected = selectedRows * selectedCols;

  const isCellSelected = (r, c) => {
    return r >= rStart && r < rEnd && c >= cStart && c < cEnd;
  };

  const mutateViewCell = (newVal) => {
    const next = gridData.map((row) => [...row]);
    next[0][0] = newVal;
    setGridData(next);
  };

  const resetViewDemo = () => {
    setGridData([
      [10, 20, 30],
      [40, 50, 60],
    ]);
    setCopyData([
      [10, 20],
      [40, 50],
    ]);
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
                  Module 1 • Topic 7
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>🔪 Indexing and Slicing Arrays</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  arr[start:stop:step] • mat[r, c] • X = data[:, :-1]
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Mastering multi-axis slicing, zero-copy views, feature/target matrix extraction, and image tensor cropping.
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
              { id: "visual_grid", label: "📐 Interactive 2D Slicing Grid", icon: "🎛️" },
              { id: "views_vs_copies", label: "🧬 Slices are Views (Zero-Copy)", icon: "⚡" },
              { id: "ml_feature_split", label: "🤖 ML Feature / Target Split (X & y)", icon: "🎯" },
              { id: "strided_reversals", label: "🔁 Strided Slices & Array Reversal", icon: "⏳" },
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
        {/* ─── TAB 1: VISUAL 2D SLICING GRID ─── */}
        {activeTab === "visual_grid" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🎛️ Interactive 2D Matrix Slicing Visualizer</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Adjust the slice boundaries below or pick a preset to see exactly which cells in the 4×4 student marks matrix are selected in real time.
                  </p>
                </div>
                {/* Presets */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_SLICES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleApplyPreset(p)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-emerald-500 hover:text-emerald-300 transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Row Start (<code className="text-emerald-400">r_start = {rStart}</code>):
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={rStart}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setRStart(val);
                      if (val >= rEnd) setREnd(Math.min(4, val + 1));
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Row Stop (<code className="text-emerald-400">r_stop = {rEnd}</code>):
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={rEnd}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setREnd(val);
                      if (val <= rStart) setRStart(Math.max(0, val - 1));
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Col Start (<code className="text-blue-400">c_start = {cStart}</code>):
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={cStart}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setCStart(val);
                      if (val >= cEnd) setCEnd(Math.min(4, val + 1));
                    }}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Col Stop (<code className="text-blue-400">c_stop = {cEnd}</code>):
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={cEnd}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setCEnd(val);
                      if (val <= cStart) setCStart(Math.max(0, val - 1));
                    }}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>

              {/* Code & Shape Info Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono">
                    Slice: marks[{rStart}:{rEnd}, {cStart}:{cEnd}]
                  </span>
                  <span className="text-xs text-slate-300">
                    Resulting Shape: <strong className="text-white">({selectedRows}, {selectedCols})</strong> • Elements:{" "}
                    <strong className="text-emerald-400">{totalSelected}</strong>
                  </span>
                </div>
                <code className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  submatrix = marks[{rStart}:{rEnd}, {cStart}:{cEnd}]
                </code>
              </div>

              {/* Matrix Grid Visualization */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-x-auto">
                <div className="min-w-[500px] flex flex-col gap-3">
                  {/* Column Headers */}
                  <div className="flex gap-3 pl-28">
                    {["Sub 1 (ML)", "Sub 2 (Python)", "Sub 3 (Math)", "Sub 4 (Stats)"].map((sub, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 text-center text-xs font-mono py-1 rounded border ${
                          idx >= cStart && idx < cEnd
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/40 font-bold"
                            : "text-slate-500 border-transparent"
                        }`}
                      >
                        col {idx}: {sub}
                      </div>
                    ))}
                  </div>

                  {/* Matrix Rows */}
                  {STUDENT_GRID.map((row, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-3">
                      <div
                        className={`w-28 text-xs font-mono py-2 px-2 rounded border text-right truncate ${
                          rIdx >= rStart && rIdx < rEnd
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                            : "text-slate-500 border-transparent"
                        }`}
                      >
                        r{rIdx}: {row.student}
                      </div>
                      <div className="flex-1 flex gap-3">
                        {row.marks.map((val, cIdx) => {
                          const active = isCellSelected(rIdx, cIdx);
                          return (
                            <div
                              key={cIdx}
                              className={`flex-1 h-12 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-bold transition-all shadow ${
                                active
                                  ? "bg-gradient-to-br from-emerald-600/30 to-blue-600/30 border-2 border-emerald-400 text-white scale-105 shadow-emerald-950/50"
                                  : "bg-slate-900 border border-slate-800 text-slate-500 opacity-60"
                              }`}
                            >
                              <span>{val}</span>
                              <span className="text-[9px] text-slate-400 font-normal">
                                [{rIdx},{cIdx}]
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 2: VIEWS VS COPIES (CRITICAL MEMORY BEHAVIOR) ─── */}
        {activeTab === "views_vs_copies" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧬 Critical NumPy Concept: Slices are Zero-Copy Views</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Unlike Python lists where slicing creates an independent copy, NumPy slices return a <strong>VIEW</strong> that points to the exact same RAM buffer.
              </p>

              {/* Interactive Mutation Demo */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* View Panel */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      1. Slice View: sub_view = grid[0:2, 0:2]
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      sub_view.base is grid: True
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Click a value to mutate <code className="text-emerald-300">sub_view[0, 0]</code> and watch the parent <code className="text-white">grid[0, 0]</code> change simultaneously!
                  </p>
                  <div className="flex gap-2">
                    {[999, 500, 10].map((val) => (
                      <button
                        key={val}
                        onClick={() => mutateViewCell(val)}
                        className="px-3 py-1.5 bg-slate-900 border border-emerald-500/50 text-emerald-300 rounded text-xs font-mono hover:bg-emerald-500 hover:text-slate-950 font-bold transition-all"
                      >
                        Set sub_view[0, 0] = {val}
                      </button>
                    ))}
                    <button
                      onClick={resetViewDemo}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 rounded text-xs font-mono hover:text-white"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <p className="text-slate-500 font-semibold mb-1">Parent Master Grid in RAM:</p>
                    <p className="text-emerald-400 font-bold">
                      Row 0: [{gridData[0][0]}, {gridData[0][1]}, {gridData[0][2]}]
                    </p>
                    <p className="text-slate-400">
                      Row 1: [{gridData[1][0]}, {gridData[1][1]}, {gridData[1][2]}]
                    </p>
                  </div>
                </div>

                {/* Safe Copy Panel */}
                <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-400 font-mono">
                      2. Safe Copy: safe_copy = grid[0:2, 0:2].copy()
                    </span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      safe_copy.base is grid: False
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Explicitly calling <code className="text-blue-300">.copy()</code> allocates a brand new memory block. Mutating it never harms the original master dataset.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-2">
                    <p className="text-slate-400">
                      safe_copy[0, 1] = 888 <span className="text-slate-500"># Modifies copy only</span>
                    </p>
                    <p className="text-emerald-400">
                      grid[0, 1] remains: 20 <span className="text-slate-500"># Untouched and safe!</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Memory Summary Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Language / Operation</th>
                      <th className="p-3">Memory Structure</th>
                      <th className="p-3">Mutation Effect</th>
                      <th className="p-3">Speed & Overhead</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50 font-mono">
                    <tr>
                      <td className="p-3 text-white font-bold">Python List Slicing (list[1:3])</td>
                      <td className="p-3 text-blue-400">Shallow Copy</td>
                      <td className="p-3 text-slate-400">Independent list created</td>
                      <td className="p-3 text-slate-400">O(K) memory allocation</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-emerald-400 font-bold">NumPy Array Slicing (arr[1:3])</td>
                      <td className="p-3 text-emerald-400">Zero-Copy View</td>
                      <td className="p-3 text-rose-400 font-bold">Mutates original array!</td>
                      <td className="p-3 text-emerald-400">Instant O(1) stride update</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-purple-400 font-bold">NumPy Explicit Copy (arr[1:3].copy())</td>
                      <td className="p-3 text-purple-400">Deep Memory Copy</td>
                      <td className="p-3 text-emerald-400 font-bold">Safely isolated</td>
                      <td className="p-3 text-slate-400">O(K) buffer allocation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 3: MACHINE LEARNING FEATURE / TARGET SPLIT ─── */}
        {activeTab === "ml_feature_split" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🤖 The Standard ML Dataset Splitting Pattern: X and y</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                In every Machine Learning workflow, 2D tabular matrices are split into input feature matrix <code className="text-blue-400">X</code> and target label vector <code className="text-emerald-400">y</code>.
              </p>

              {/* Visual Split Layout */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Original Tabular Dataset: dataset.shape = (5, 4)
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* Feature Matrix X (Cols 0 to 2) */}
                  <div className="lg:col-span-3 bg-blue-950/20 border-2 border-dashed border-blue-500/50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-400 font-mono">
                        X = dataset[:, :-1]
                      </span>
                      <span className="text-xs font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                        Feature Matrix X: shape (5, 3) [2D]
                      </span>
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="text-slate-500 flex justify-between px-2 border-b border-slate-800 pb-1">
                        <span>Age</span>
                        <span>Study Hours</span>
                        <span>Attendance %</span>
                      </div>
                      {[
                        [21, 5.5, 92],
                        [22, 2.0, 65],
                        [20, 8.0, 98],
                        [23, 3.5, 78],
                        [21, 6.0, 88],
                      ].map((row, idx) => (
                        <div key={idx} className="flex justify-between px-2 py-1 bg-slate-900/60 rounded text-slate-200">
                          <span>{row[0]} yrs</span>
                          <span>{row[1]} hrs</span>
                          <span>{row[2]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Vector y (Col 3) */}
                  <div className="bg-emerald-950/20 border-2 border-dashed border-emerald-500/50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        y = dataset[:, -1]
                      </span>
                      <span className="text-xs font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                        Target y: (5,) [1D]
                      </span>
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="text-slate-500 text-center border-b border-slate-800 pb-1">
                        Pass / Fail
                      </div>
                      {[1, 0, 1, 0, 1].map((label, idx) => (
                        <div
                          key={idx}
                          className={`text-center py-1 rounded font-bold ${
                            label === 1
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          }`}
                        >
                          {label === 1 ? "1 (Pass)" : "0 (Fail)"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scikit-Learn Code Integration */}
                <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800">
                  <p className="text-slate-500"># Standard Scikit-learn Model Training Flow</p>
                  <p className="text-blue-400">X = dataset[:, :-1] <span className="text-slate-500"># 2D feature matrix (N, 3)</span></p>
                  <p className="text-emerald-400">y = dataset[:, -1]  <span className="text-slate-500"># 1D target labels (N,)</span></p>
                  <p className="pt-2 text-white">model = LogisticRegression()</p>
                  <p className="text-emerald-300">model.fit(X, y) <span className="text-slate-500"># ✅ Fits perfectly without shape mismatch errors!</span></p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 4: STRIDED SLICING & REVERSALS ─── */}
        {activeTab === "strided_reversals" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>⏳ Advanced Step Slicing, Reversals, and Ellipsis</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Explore powerful strided indexing, negative step flips, and multi-dimensional tensor ellipsis operators.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-emerald-400 font-mono">arr[::-1] (Array Reverse)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Reverses array elements in O(1) time by flipping the stride multiplier to -1 without reallocating elements.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                    <code>
                      arr = np.array([10, 20, 30, 40])<br />
                      rev = arr[::-1]<br />
                      # Output: [40, 30, 20, 10]
                    </code>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-blue-400 font-mono">mat[::2, ::2] (Sub-Grid)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Subsamples every second row and column. Widely used for downsampling feature maps or grid coordinates.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                    <code>
                      # Subsamples 2x downscaled grid<br />
                      small_grid = mat[::2, ::2]
                    </code>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-purple-400 font-mono">tensor[..., 0] (Ellipsis)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The Ellipsis <code className="text-purple-300">...</code> expands across all preceding axes, such as extracting the Red channel from a 4D image batch.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                    <code>
                      # tensor (Batch, H, W, C)<br />
                      red_channel = tensor[..., 0]
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
              <p className="text-xs text-slate-400">Select a script below to inspect 1D/2D slicing, views vs copies, ellipsis indexing, or ML dataset splits</p>
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
            <span>⚠️ Indexing & Slicing Pitfalls & How to Avoid Them</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                1. Forgetting that Slices are Views
              </strong>
              <p>
                Modifying a slice directly changes the original array. If you need an isolated test set or feature slice, always append <code className="text-emerald-400">.copy()</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                2. Dimension Reduction with Integer Indexing
              </strong>
              <p>
                <code className="text-white">mat[0, :]</code> returns shape <code className="text-white">(N,)</code> (1D vector). If Scikit-learn requires a 2D row matrix, write <code className="text-blue-300">mat[0:1, :]</code> to preserve shape <code className="text-white">(1, N)</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                3. Exclusive Stop Index Off-by-One Error
              </strong>
              <p>
                Remember that <code className="text-white">arr[0:5]</code> only gives 5 items (indices 0, 1, 2, 3, 4). Index 5 is never included!
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                4. Scalar Indexing IndexError vs Slicing Graceful Clamping
              </strong>
              <p>
                <code className="text-white">arr[100]</code> raises <code className="text-rose-300">IndexError</code> if the array has only 10 elements, but <code className="text-white">arr[0:100]</code> safely clamps and returns all 10 elements.
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
                question: "Sir, why did my original master dataset change when I only normalized a small slice `sub_train = X[:100]`?",
                answer: "Debangshu, that is the classic 'Slices are Views' trap! Because NumPy arrays are contiguous C-buffers, slicing creates a view sharing the same RAM addresses. To normalize safely without corrupting `X`, always do `sub_train = X[:100].copy()`!",
              },
              {
                student: "Swadeep",
                avatar: "👨‍🎓",
                question: "What is the fastest way to extract the test labels from our student exam dataset with 10 features and 1 label at the end?",
                answer: "Swadeep, simply use `y = dataset[:, -1]`! The colon `:` grabs every student row, and `-1` grabs the last column as a 1D target vector in O(1) time.",
              },
              {
                student: "Susmita",
                avatar: "👩‍💻",
                question: "How do I extract a 50x50 face region from a 1080x1920 color photograph in NumPy?",
                answer: "Susmita, 3D images have axes (Height, Width, Channels). Slicing `face = photo[ymin:ymax, xmin:xmax, :]` crops the rectangle across all 3 RGB color channels instantly!",
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
              topic7_note.txt
            </span>
          </div>
          <PlainTextPrint text={noteText} fileName="topic7_note.txt" />
        </section>

        {/* ─── TEACHER PERSONA SIGNATURE ─────────────────────────────────────── */}
        <Teacher />
      </main>
    </div>
  );
};

export default Topic7;

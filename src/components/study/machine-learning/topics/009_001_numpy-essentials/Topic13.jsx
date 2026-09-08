import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic13_files/01_basic_aggregations_and_axis.py?raw";
import pyCode2 from "./topic13_files/02_keepdims_and_broadcasting_alignment.py?raw";
import pyCode3 from "./topic13_files/03_argmin_argmax_index_discovery.py?raw";
import pyCode4 from "./topic13_files/04_ml_zscore_standardization_and_rmse.py?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_basic_aggregations_and_axis.py",
    title: "1. Basic Aggregations & Axis Mechanics",
    badge: "Axis Reductions",
    code: pyCode1,
    summary: "Demonstrates global reductions vs axis=0 (per-feature column stats) vs axis=1 (per-student row stats) on exam marks.",
  },
  {
    id: "part2",
    fileName: "02_keepdims_and_broadcasting_alignment.py",
    title: "2. keepdims=True & Broadcasting Alignment",
    badge: "keepdims & Shapes",
    code: pyCode2,
    summary: "Explains why keepdims=True preserves singleton 2D dimensions ((1, p) and (N, 1)), preventing broadcasting shape mismatches.",
  },
  {
    id: "part3",
    fileName: "03_argmin_argmax_index_discovery.py",
    title: "3. Extrema Discovery with argmin & argmax",
    badge: "argmax & Softmax",
    code: pyCode3,
    summary: "Locates indices of maximum values for multi-class classification and extracts winning class labels from Softmax outputs.",
  },
  {
    id: "part4",
    fileName: "04_ml_zscore_standardization_and_rmse.py",
    title: "4. Z-Score Standardization & RMSE Metric",
    badge: "ML Z-Score & RMSE",
    code: pyCode4,
    summary: "Manually implements StandardScaler (Z = (X - mu) / sigma) and calculates Root Mean Squared Error regression metric.",
  },
];

const STUDENT_MARKS = [
  { name: "Debangshu", math: 85, science: 90, english: 88 },
  { name: "Susmita",   math: 92, science: 95, english: 91 },
  { name: "Swadeep",   math: 65, science: 70, english: 72 },
  { name: "Tuhina",    math: 88, science: 85, english: 94 },
];

const AGGREGATION_FNS = [
  { id: "sum",  name: "np.sum",  label: "Sum",  desc: "Total sum of elements", formula: "∑ x_i" },
  { id: "mean", name: "np.mean", label: "Mean", desc: "Arithmetic average",    formula: "(1/N) ∑ x_i" },
  { id: "std",  name: "np.std",  label: "Std",  desc: "Standard deviation",    formula: "√((1/N) ∑(x_i - μ)²)" },
  { id: "min",  name: "np.min",  label: "Min",  desc: "Minimum value",         formula: "min(x_1, ..., x_N)" },
  { id: "max",  name: "np.max",  label: "Max",  desc: "Maximum value",         formula: "max(x_1, ..., x_N)" },
];

const Topic13 = () => {
  const [activeTab, setActiveTab] = useState("interactive_reducer");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedAxis, setSelectedAxis] = useState("none"); // "none", "0", "1"
  const [keepDims, setKeepDims] = useState(false);
  const [selectedFn, setSelectedFn] = useState("mean");
  const [activeHint, setActiveHint] = useState(null);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Matrix values
  const matrix = [
    [85, 90, 88],
    [92, 95, 91],
    [65, 70, 72],
    [88, 85, 94]
  ];

  // Calculations
  const calculateStats = () => {
    const flat = matrix.flat();
    const compute = (arr) => {
      switch (selectedFn) {
        case "sum":
          return arr.reduce((a, b) => a + b, 0);
        case "mean":
          return parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2));
        case "std": {
          const m = arr.reduce((a, b) => a + b, 0) / arr.length;
          const variance = arr.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / arr.length;
          return parseFloat(Math.sqrt(variance).toFixed(2));
        }
        case "min":
          return Math.min(...arr);
        case "max":
          return Math.max(...arr);
        default:
          return 0;
      }
    };

    if (selectedAxis === "none") {
      const val = compute(flat);
      return {
        shape: keepDims ? "(1, 1)" : "() [Scalar]",
        result: keepDims ? [[val]] : val,
        desc: "Global reduction over all 12 elements"
      };
    } else if (selectedAxis === "0") {
      // Column-wise (features)
      const cols = [0, 1, 2].map((c) => compute(matrix.map((row) => row[c])));
      return {
        shape: keepDims ? "(1, 3)" : "(3,)",
        result: keepDims ? [cols] : cols,
        desc: "Collapsed rows (axis=0) -> 1 metric per subject (Math, Science, English)"
      };
    } else {
      // Row-wise (samples)
      const rows = matrix.map((row) => compute(row));
      return {
        shape: keepDims ? "(4, 1)" : "(4,)",
        result: keepDims ? rows.map((r) => [r]) : rows,
        desc: "Collapsed columns (axis=1) -> 1 metric per student"
      };
    }
  };

  const statData = calculateStats();

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* HEADER */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Segment 9 • Module 1 • Topic 13
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
              Aggregation &amp; Reductions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Statistical Aggregations &amp; Axis Reductions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
            Mastering <code className="text-cyan-300 font-mono">np.sum()</code>, <code className="text-cyan-300 font-mono">np.mean()</code>, <code className="text-cyan-300 font-mono">np.std()</code>, <code className="text-cyan-300 font-mono">np.min()</code>, <code className="text-cyan-300 font-mono">np.max()</code>, and <code className="text-cyan-300 font-mono">np.argmax()</code> across dimensions. Learn the vital role of <code className="text-amber-300 font-mono">keepdims=True</code> in Machine Learning preprocessing pipelines.
          </p>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-2">
        {[
          { id: "interactive_reducer", label: "📊 Interactive Axis Reducer" },
          { id: "keepdims_deepdive",  label: "📐 The keepdims=True Trap" },
          { id: "argmax_discovery",   label: "🎯 argmax & Softmax Labels" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all shrink-0 ${
              activeTab === tab.id
                ? "bg-slate-900 text-cyan-400 border-t-2 border-x border-slate-800 border-t-cyan-500 shadow-lg"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: INTERACTIVE AXIS REDUCER */}
      {activeTab === "interactive_reducer" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📊 Interactive Visual Aggregation Sandbox</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Experiment with Global reductions, axis=0 (features), and axis=1 (samples)
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 px-2 font-medium">keepdims:</span>
              <button
                onClick={() => setKeepDims(!keepDims)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  keepDims ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-slate-800 text-slate-400"
                }`}
              >
                {keepDims ? "keepdims=True" : "keepdims=False (Default)"}
              </button>
            </div>
          </div>

          {/* Function Selector & Axis Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Aggregation Function:</label>
              <div className="grid grid-cols-5 gap-2">
                {AGGREGATION_FNS.map((fn) => (
                  <button
                    key={fn.id}
                    onClick={() => setSelectedFn(fn.id)}
                    className={`py-2 px-1 text-center rounded-xl border transition-all ${
                      selectedFn === fn.id
                        ? "bg-cyan-950/40 border-cyan-500 text-cyan-300 shadow"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="text-xs font-bold">{fn.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{fn.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Reduction Axis:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "none", label: "Global (axis=None)", desc: "Reduces all elements" },
                  { id: "0",    label: "axis=0 (Columns)",   desc: "Per-subject feature stats" },
                  { id: "1",    label: "axis=1 (Rows)",      desc: "Per-student sample stats" },
                ].map((ax) => (
                  <button
                    key={ax.id}
                    onClick={() => setSelectedAxis(ax.id)}
                    className={`py-2 px-2 text-left rounded-xl border transition-all ${
                      selectedAxis === ax.id
                        ? "bg-indigo-950/40 border-indigo-500 text-indigo-300 shadow"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="text-xs font-bold">{ax.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">{ax.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Matrix Grid Representation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Input Student Matrix <span className="text-slate-500">shape (4, 3)</span>
                </span>
                <span className="text-xs text-slate-400">4 Students × 3 Subjects</span>
              </div>
              <div className="overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="py-2 text-left">Student</th>
                      <th className={`py-2 text-center ${selectedAxis === "0" ? "text-cyan-400 bg-cyan-950/30 rounded-t" : ""}`}>Math</th>
                      <th className={`py-2 text-center ${selectedAxis === "0" ? "text-cyan-400 bg-cyan-950/30 rounded-t" : ""}`}>Science</th>
                      <th className={`py-2 text-center ${selectedAxis === "0" ? "text-cyan-400 bg-cyan-950/30 rounded-t" : ""}`}>English</th>
                      {selectedAxis === "1" && <th className="py-2 text-center text-indigo-400 bg-indigo-950/30">Result</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENT_MARKS.map((st, idx) => (
                      <tr key={st.name} className={`border-b border-slate-900/50 ${selectedAxis === "1" ? "bg-indigo-950/10" : ""}`}>
                        <td className="py-2.5 text-slate-300 font-bold">{st.name}</td>
                        <td className={`py-2.5 text-center ${selectedAxis === "0" ? "bg-cyan-950/20" : ""}`}>{st.math}</td>
                        <td className={`py-2.5 text-center ${selectedAxis === "0" ? "bg-cyan-950/20" : ""}`}>{st.science}</td>
                        <td className={`py-2.5 text-center ${selectedAxis === "0" ? "bg-cyan-950/20" : ""}`}>{st.english}</td>
                        {selectedAxis === "1" && (
                          <td className="py-2.5 text-center font-bold text-indigo-300 bg-indigo-950/40">
                            {Array.isArray(statData.result) ? (keepDims ? statData.result[idx][0] : statData.result[idx]) : ""}
                          </td>
                        )}
                      </tr>
                    ))}
                    {selectedAxis === "0" && (
                      <tr className="bg-cyan-950/40 font-bold text-cyan-300 border-t-2 border-cyan-500/50">
                        <td className="py-2.5">Result (axis=0):</td>
                        {Array.isArray(statData.result) && (
                          (keepDims ? statData.result[0] : statData.result).map((val, i) => (
                            <td key={i} className="py-2.5 text-center">{val}</td>
                          ))
                        )}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Output Calculation Inspector */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  NumPy Evaluation Result
                </span>
                <div className="font-mono text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500"># Function Call:</span>
                  <p className="text-cyan-300 font-bold mt-1">
                    np.{selectedFn}(marks{selectedAxis !== "none" ? `, axis=${selectedAxis}` : ""}{keepDims ? ", keepdims=True" : ""})
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Result Shape:</span>
                    <span className="font-mono font-bold text-amber-300">{statData.shape}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Output Values:</span>
                    <span className="font-mono font-bold text-emerald-300">{JSON.stringify(statData.result)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                  {statData.desc}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 font-mono bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                Formula: {AGGREGATION_FNS.find((f) => f.id === selectedFn)?.formula}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: KEEPDIMS DEEP DIVE */}
      {activeTab === "keepdims_deepdive" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📐 Why keepdims=True is Essential in Machine Learning Preprocessing</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300">
            <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
              <span className="font-mono font-bold text-rose-400 uppercase text-xs">❌ The Bug without keepdims (axis=1)</span>
              <p>
                When normalizing student marks per row, <code className="text-rose-300">row_sum = X.sum(axis=1)</code> collapses from shape <code className="text-white">(N, p)</code> to 1D shape <code className="text-rose-300">(N,)</code>.
              </p>
              <div className="bg-slate-900 p-3 rounded font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
                <p className="text-slate-500"># Shape (4, 3) / Shape (4,)</p>
                <p className="text-rose-400">X_norm = X / X.sum(axis=1)</p>
                <p className="text-rose-300"># 💥 ValueError: operands could not be broadcast together with shapes (4,3) (4,)</p>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
              <span className="font-mono font-bold text-emerald-400 uppercase text-xs">✔ The Fix with keepdims=True</span>
              <p>
                Setting <code className="text-emerald-300">keepdims=True</code> preserves the reduced axis as a singleton dimension of length 1, creating shape <code className="text-emerald-300">(N, 1)</code>.
              </p>
              <div className="bg-slate-900 p-3 rounded font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
                <p className="text-slate-500"># Shape (4, 3) / Shape (4, 1)</p>
                <p className="text-emerald-400">X_norm = X / X.sum(axis=1, keepdims=True)</p>
                <p className="text-emerald-300"># ✅ Clean 2D column-wise broadcasting across all 3 features!</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: ARGMAX DISCOVERY */}
      {activeTab === "argmax_discovery" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🎯 Multi-Class Classifier Prediction with np.argmax()</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Neural networks output Softmax probability distributions over classes. <code className="text-cyan-300 font-mono">np.argmax(probs, axis=1)</code> selects the index of the highest-confidence class for every input sample.
          </p>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <p className="text-slate-500"># Softmax output: 3 samples x 3 classes (Cat, Dog, Bird)</p>
            <p className="text-slate-300">probs = np.array([</p>
            <p className="text-slate-300">&nbsp;&nbsp;[0.10, 0.85, 0.05], # Sample 0 ➔ Class 1 (Dog)</p>
            <p className="text-slate-300">&nbsp;&nbsp;[0.92, 0.04, 0.04], # Sample 1 ➔ Class 0 (Cat)</p>
            <p className="text-slate-300">&nbsp;&nbsp;[0.08, 0.12, 0.80]  # Sample 2 ➔ Class 2 (Bird)</p>
            <p className="text-slate-300">])</p>
            <p className="text-cyan-400 font-bold pt-2">preds = np.argmax(probs, axis=1) # ➔ array([1, 0, 2])</p>
          </div>
        </section>
      )}

      {/* ─── CODE DEMONSTRATION (MULTI-SCRIPT SUITE) ─────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">💻</div>
          <div>
            <h2 className="text-xl font-bold text-white">Python Code Demonstration Suite (4 Focused Scripts)</h2>
            <p className="text-xs text-slate-400">Select a script below to inspect axis reductions, keepdims alignment, argmax classification, or Z-score normalization</p>
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

      {/* ─── COMMON PITFALLS ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">⚠️ Pitfalls &amp; Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-2">
            <h3 className="text-sm font-bold text-rose-400">❌ Common Reductions Mistakes</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>Confusing <code className="text-rose-300">axis=0</code> (column-wise feature reduction) with <code className="text-rose-300">axis=1</code> (row-wise sample reduction).</li>
              <li>Forgetting that <code className="text-rose-300">np.std()</code> defaults to <code className="text-white">ddof=0</code> (population standard deviation) while Pandas uses <code className="text-white">ddof=1</code>.</li>
              <li>Calling <code className="text-rose-300">np.mean()</code> on arrays containing <code className="text-white">np.nan</code> — produces <code className="text-rose-300">nan</code>. Use <code className="text-emerald-300">np.nanmean()</code> instead!</li>
              <li>Omitting <code className="text-rose-300">keepdims=True</code> during sample-wise normalization.</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400">✔ Best Practices</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>Always specify <code className="text-emerald-300">keepdims=True</code> when calculating statistics destined for feature centering or scaling.</li>
              <li>Use <code className="text-cyan-300">np.argmax(probs, axis=1)</code> to extract discrete class label predictions from Neural Network softmax outputs.</li>
              <li>Use <code className="text-cyan-300">np.median()</code> instead of mean when datasets have extreme outliers or skewed distributions.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── HINT SECTION ───────────────────────────────────────────────────── */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            💡
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Think About This... (Interactive Concept Checks)</h2>
            <p className="text-xs sm:text-sm text-slate-400">Test your mental model of axis reductions and statistical moments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              q: "If an array has shape (100, 20, 5), what is the shape of np.sum(arr, axis=(0, 2))?",
              a: "Shape (20,). Axes 0 (100) and 2 (5) are collapsed, leaving only axis 1 with 20 elements.",
            },
            {
              id: 2,
              q: "Why does np.nanmean([10, 20, np.nan]) return 15.0 while np.mean() returns nan?",
              a: "nanmean masks out IEEE 754 NaN values before computing the sum and dividing by the count of valid items (2).",
            },
            {
              id: 3,
              q: "What does np.argmin(loss_history) tell a machine learning engineer?",
              a: "The epoch index at which the model achieved its lowest validation loss (optimal model checkpoint).",
            },
          ].map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <p className="text-xs font-semibold text-slate-200">{item.q}</p>
              <div>
                {activeHint === item.id ? (
                  <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-700/50 text-xs text-indigo-200 mt-2">
                    {item.a}
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveHint(item.id)}
                    className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded transition-all cursor-pointer border border-slate-700"
                  >
                    Reveal Answer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <FAQTemplate title="Statistical Reductions & Aggregations — Frequently Asked Questions" questions={questions} />
      </section>

      {/* PLAIN TEXT NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="NumPy Aggregations & Axis Reductions — Study & Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 13 Study Note"
          downloadFileName="numpy_aggregations_note.txt"
        />
      </section>

      {/* TEACHER */}
      <Teacher
        note="In our Barrackpore data science sessions, Susmita and Swadeep often get confused about axis=0 vs axis=1. Here is my simple trick: axis=0 collapses the rows vertically downwards to give you 1 number per feature column. axis=1 collapses horizontally across the columns to give you 1 number per student sample. And always use keepdims=True when standardizing features! — Sukanta Hui"
      />
    </div>
  );
};

export default Topic13;

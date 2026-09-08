import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic12_files/01_unary_and_binary_ufunc_basics.py?raw";
import pyCode2 from "./topic12_files/02_ufunc_methods_reduce_accumulate_outer.py?raw";
import pyCode3 from "./topic12_files/03_out_parameter_for_memory_reuse.py?raw";
import pyCode4 from "./topic12_files/04_ml_activation_functions_and_losses.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_unary_and_binary_ufunc_basics.py",
    title: "1. Unary & Binary ufuncs Basics",
    badge: "Unary & Binary",
    code: pyCode1,
    summary: "Demonstrates fast C-level vectorized math: unary (exp, log, sin, sqrt) and binary (maximum, minimum, power) functions.",
  },
  {
    id: "part2",
    fileName: "02_ufunc_methods_reduce_accumulate_outer.py",
    title: "2. Special ufunc Methods (.reduce, .accumulate, .outer)",
    badge: "Special Methods",
    code: pyCode2,
    summary: "Explores .reduce() for collapsing axes, .accumulate() for running cumulative sums, and .outer() for pairwise grids.",
  },
  {
    id: "part3",
    fileName: "03_out_parameter_for_memory_reuse.py",
    title: "3. Zero Allocation with `out=`",
    badge: "Memory & `out=`",
    code: pyCode3,
    summary: "Demonstrates zero-copy memory reuse with the out= parameter, reusing existing RAM buffers to eliminate garbage collection.",
  },
  {
    id: "part4",
    fileName: "04_ml_activation_functions_and_losses.py",
    title: "4. Neural Activations & Log Loss",
    badge: "ML Activations & BCE",
    code: pyCode4,
    summary: "Implements Sigmoid, numerically stable Softmax, and Binary Cross-Entropy Loss with epsilon clipping.",
  },
];

// ─── Preset Unary and Binary ufuncs ──────────────────────────────────────────
const UNARY_UFUNCS = [
  { id: "sqrt", label: "np.sqrt(x)", math: "√x", compute: (x) => (x < 0 ? "nan" : parseFloat(Math.sqrt(x).toFixed(3))) },
  { id: "exp", label: "np.exp(x)", math: "e^x", compute: (x) => parseFloat(Math.exp(x).toFixed(3)) },
  { id: "log", label: "np.log(x)", math: "ln(x)", compute: (x) => (x <= 0 ? (x === 0 ? "-inf" : "nan") : parseFloat(Math.log(x).toFixed(3))) },
  { id: "abs", label: "np.abs(x)", math: "|x|", compute: (x) => Math.abs(x) },
  { id: "round", label: "np.round(x)", math: "round(x)", compute: (x) => Math.round(x) },
  { id: "floor", label: "np.floor(x)", math: "⌊x⌋", compute: (x) => Math.floor(x) },
  { id: "ceil", label: "np.ceil(x)", math: "⌈x⌉", compute: (x) => Math.ceil(x) },
];

const BINARY_UFUNCS = [
  { id: "maximum", label: "np.maximum(a, b)", desc: "Element-wise maximum", compute: (a, b) => Math.max(a, b) },
  { id: "minimum", label: "np.minimum(a, b)", desc: "Element-wise minimum", compute: (a, b) => Math.min(a, b) },
  { id: "power", label: "np.power(a, b)", desc: "a raised to power b", compute: (a, b) => Math.pow(a, b) },
  { id: "hypot", label: "np.hypot(a, b)", desc: "Hypotenuse √(a² + b²)", compute: (a, b) => parseFloat(Math.hypot(a, b).toFixed(3)) },
];

const Topic12 = () => {
  const [activeTab, setActiveTab] = useState("unary_binary_gallery");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Gallery State
  const [selectedUnary, setSelectedUnary] = useState("exp");
  const [unaryInputs, setUnaryInputs] = useState([-2.0, 0.0, 1.5, 4.0, 9.0]);

  const [selectedBinary, setSelectedBinary] = useState("maximum");
  const [binaryA, setBinaryA] = useState([10, -5, 30, 45]);
  const [binaryB, setBinaryB] = useState([20, 0, 15, 60]);

  // ML Activation State
  const [logitZ, setLogitZ] = useState(1.5);
  const [softmaxLogits, setSoftmaxLogits] = useState([2.0, 1.0, 0.1]);
  const [probPrediction, setProbPrediction] = useState(0.85);
  const [trueLabel, setTrueLabel] = useState(1);

  // Active ufunc objects
  const activeUnaryObj = UNARY_UFUNCS.find((u) => u.id === selectedUnary) || UNARY_UFUNCS[1];
  const activeBinaryObj = BINARY_UFUNCS.find((b) => b.id === selectedBinary) || BINARY_UFUNCS[0];

  // ML Calculations
  const sigmoidVal = (1.0 / (1.0 + Math.exp(-logitZ))).toFixed(4);

  // Softmax
  const maxSoftmaxLogit = Math.max(...softmaxLogits);
  const expShifted = softmaxLogits.map((z) => Math.exp(z - maxSoftmaxLogit));
  const sumExp = expShifted.reduce((a, b) => a + b, 0);
  const softmaxProbs = expShifted.map((e) => (e / sumExp).toFixed(4));

  // Log-Loss (BCE)
  const eps = 1e-15;
  const clampedProb = Math.min(Math.max(probPrediction, eps), 1 - eps);
  const bceLoss = (
    -(trueLabel * Math.log(clampedProb) + (1 - trueLabel) * Math.log(1 - clampedProb))
  ).toFixed(4);

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
                  Module 1 • Topic 12
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>⚡ Universal Functions (ufuncs)</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  np.exp() • np.maximum() • .reduce() • .accumulate()
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Mastering fast C-vectorized math wrappers, unary & binary ufuncs, reduction methods, and ML activation functions.
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
              { id: "unary_binary_gallery", label: "🧪 Unary & Binary ufunc Gallery", icon: "🔬" },
              { id: "advanced_methods", label: "🧬 .reduce(), .accumulate(), .outer()", icon: "📐" },
              { id: "ml_activation_loss", label: "🤖 ML Activations & Loss Functions", icon: "🧠" },
              { id: "numerical_stability", label: "🛡️ Numerical Stability & Overflows", icon: "⚖️" },
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
        {/* ─── TAB 1: UNARY & BINARY UFUNC GALLERY ─── */}
        {activeTab === "unary_binary_gallery" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧪 Interactive Universal Function (ufunc) Gallery</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Explore how NumPy executes element-wise math transformations in compiled C using CPU SIMD vectorization.
              </p>

              {/* 1. Unary ufuncs */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">1. Unary ufuncs:</span>
                    <span className="text-xs text-slate-400">Single array input (1 operand)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {UNARY_UFUNCS.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => setSelectedUnary(u.id)}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                          selectedUnary === u.id
                            ? "bg-blue-600 text-white border-blue-400 shadow"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {unaryInputs.map((val, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-mono">x[{idx}]:</span>
                      <input
                        type="number"
                        step="0.5"
                        value={val}
                        onChange={(e) => {
                          const next = [...unaryInputs];
                          next[idx] = parseFloat(e.target.value) || 0;
                          setUnaryInputs(next);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center font-mono font-bold text-white text-xs focus:border-blue-500 focus:outline-none"
                      />
                      <div className="bg-blue-950/40 border border-blue-500/40 rounded p-1.5 text-center font-mono text-xs font-bold text-blue-300">
                        {activeUnaryObj.compute(val)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Binary ufuncs */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">2. Binary ufuncs:</span>
                    <span className="text-xs text-slate-400">Two array inputs (2 operands)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {BINARY_UFUNCS.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBinary(b.id)}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                          selectedBinary === b.id
                            ? "bg-emerald-600 text-white border-emerald-400 shadow"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {binaryA.map((valA, idx) => {
                    const valB = binaryB[idx];
                    const res = activeBinaryObj.compute(valA, valB);
                    return (
                      <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-blue-400">a: {valA}</span>
                          <span className="text-purple-400">b: {valB}</span>
                        </div>
                        <div className="bg-emerald-950/40 border border-emerald-500/50 rounded p-2 text-center font-mono font-bold text-emerald-300 text-sm">
                          {res}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 2: ADVANCED UFUNC METHODS ─── */}
        {activeTab === "advanced_methods" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧬 Advanced ufunc Methods: .reduce, .accumulate, .outer & out=</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Every binary universal function in NumPy comes pre-equipped with high-performance reduction and memory-writing methods.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* .reduce() Card */}
                <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-400 font-mono">1. .reduce(arr)</h3>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      Axis Collapse
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Repeatedly applies the binary ufunc until the array axis is collapsed into a scalar.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500">arr = np.array([1, 2, 3, 4, 5])</p>
                    <p className="text-blue-300">np.add.reduce(arr) ➔ 15 (Sum)</p>
                    <p className="text-emerald-300">np.multiply.reduce(arr) ➔ 120 (Product / Factorial)</p>
                  </div>
                </div>

                {/* .accumulate() Card */}
                <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-purple-400 font-mono">2. .accumulate(arr)</h3>
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      Running Accumulation
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Preserves the intermediate reduction results at each step, yielding running cumulative vectors.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500">arr = np.array([1, 2, 3, 4])</p>
                    <p className="text-purple-300">np.add.accumulate(arr) ➔ [1, 3, 6, 10] (cumsum)</p>
                    <p className="text-emerald-300">np.multiply.accumulate(arr) ➔ [1, 2, 6, 24] (cumprod)</p>
                  </div>
                </div>

                {/* .outer() Card */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-400 font-mono">3. .outer(A, B)</h3>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      Pairwise Outer Grid
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Applies the ufunc across all pairs of elements from A and B, producing a 2D cross-product matrix.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-emerald-300">
                      np.multiply.outer([1, 2, 3], [10, 20])<br />
                      ➔ [[10, 20], [20, 40], [30, 60]]
                    </p>
                  </div>
                </div>

                {/* out= Parameter Card */}
                <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-amber-400 font-mono">4. out= Parameter</h3>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      In-Place Memory Buffer
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Directs the C computation to write directly into an existing array buffer without allocating temporary heap memory.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-amber-300">
                      np.sqrt(large_X, out=large_X)<br />
                      ➔ Mutates large_X in-place (0 MB extra RAM)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 3: ML ACTIVATIONS & LOSS ─── */}
        {activeTab === "ml_activation_loss" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧠 Machine Learning Activation Functions & Loss Sandbox</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Experience how <code className="text-emerald-400">np.exp()</code>, <code className="text-blue-400">np.log()</code>, and <code className="text-purple-400">np.maximum()</code> compute fundamental deep learning equations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Sigmoid Activation */}
                <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-400 font-mono">1. Sigmoid: σ(z) = 1 / (1 + e^-z)</h3>
                    <span className="text-xs font-mono font-bold text-blue-300">Output: {sigmoidVal}</span>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Input Logit <code className="text-white">z = {logitZ}</code>:
                    </label>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      step="0.1"
                      value={logitZ}
                      onChange={(e) => setLogitZ(parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>sigmoid = 1.0 / (1.0 + np.exp(-z)) # Maps (-inf, +inf) ➔ (0, 1)</code>
                  </div>
                </div>

                {/* 2. Softmax Activation */}
                <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-purple-400 font-mono">2. Stable Softmax: exp(z - max) / Σexp</h3>
                    <span className="text-xs text-emerald-400 font-mono font-bold">Sum = 1.0000</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {softmaxLogits.map((val, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="text-[10px] text-slate-500 font-mono">Logit z[{idx}]:</span>
                        <input
                          type="number"
                          step="0.5"
                          value={val}
                          onChange={(e) => {
                            const next = [...softmaxLogits];
                            next[idx] = parseFloat(e.target.value) || 0;
                            setSoftmaxLogits(next);
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-center font-mono text-xs text-white"
                        />
                        <div className="p-1 bg-purple-950/40 border border-purple-500/40 rounded text-center font-mono text-xs font-bold text-purple-300">
                          {softmaxProbs[idx]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Binary Cross-Entropy Loss */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-400 font-mono">3. Log-Loss (BCE): -[y ln(p) + (1-y) ln(1-p)]</h3>
                    <span className="text-xs font-mono font-bold text-emerald-300">Loss: {bceLoss}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-slate-400 mb-1">
                        Predicted Prob <code className="text-white">p = {probPrediction}</code>:
                      </label>
                      <input
                        type="range"
                        min="0.01"
                        max="0.99"
                        step="0.01"
                        value={probPrediction}
                        onChange={(e) => setProbPrediction(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Target y:</label>
                      <button
                        onClick={() => setTrueLabel(trueLabel === 1 ? 0 : 1)}
                        className="px-3 py-1 bg-slate-900 border border-emerald-500/40 rounded text-xs font-mono font-bold text-white"
                      >
                        y = {trueLabel}
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>loss = -np.mean(y * np.log(p + 1e-15) + (1 - y) * np.log(1 - p + 1e-15))</code>
                  </div>
                </div>

                {/* 4. ReLU via np.maximum */}
                <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-amber-400 font-mono">4. ReLU: np.maximum(0, x)</h3>
                    <span className="text-xs text-amber-300 font-mono">Zero Clamping</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <code className="text-amber-300">np.maximum(0, x)</code> replaces all negative values with 0 using fast binary ufunc comparisons without branching.
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      # Fast vectorized ReLU activation<br />
                      activations = np.maximum(0.0, layer_outputs)
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 4: NUMERICAL STABILITY & OVERFLOWS ─── */}
        {activeTab === "numerical_stability" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🛡️ Numerical Stability & Overflow Protection Lab</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Deep learning models often crash due to floating-point overflows or logarithms of zero. Learn how expert ML engineers use NumPy ufuncs to prevent these failures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exp Overflow */}
                <div className="bg-slate-950 border border-rose-500/40 rounded-xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-rose-400 font-mono">1. Exponent Overflow Trap (np.exp)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Computing <code className="text-rose-300">np.exp(800)</code> exceeds standard IEEE 754 float64 limits (~1.79e308), overflowing into <code className="text-white">inf</code> and corrupting Softmax into <code className="text-white">nan</code>.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-rose-400"># ❌ Naive Softmax (Crashes with overflow):</p>
                    <p>exp_z = np.exp(z) # ➔ array([inf, inf])</p>
                    <p className="text-emerald-400 pt-1"># ✅ Stable Softmax (Max Subtraction):</p>
                    <p>exp_z = np.exp(z - np.max(z)) # ➔ Max exponent is exp(0)=1</p>
                  </div>
                </div>

                {/* Log Zero Trap */}
                <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-amber-400 font-mono">2. Logarithm of Zero Trap (np.log)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    In classification loss, if predicted probability <code className="text-white">p = 0.0</code>, <code className="text-amber-300">np.log(0.0)</code> evaluates to <code className="text-white">-inf</code>, corrupting gradients.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-rose-400"># ❌ Dangerous Log:</p>
                    <p>loss = -np.log(0.0) # ➔ inf</p>
                    <p className="text-emerald-400 pt-1"># ✅ Safe Log (Epsilon Clamping):</p>
                    <p>loss = -np.log(0.0 + 1e-15) # ➔ Finite safe float (34.5)</p>
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
              <p className="text-xs text-slate-400">Select a script below to inspect unary/binary ufuncs, reduce/accumulate/outer, memory reuse with out=, or neural activations</p>
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
            <span>⚠️ ufunc Pitfalls & How to Avoid Them</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                1. Confusing `np.maximum` with `np.max`
              </strong>
              <p>
                <code className="text-white">np.maximum(0, x)</code> performs element-wise ReLU comparison. <code className="text-white">np.max(x)</code> is an aggregation function returning a single scalar maximum!
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                2. Assuming `np.vectorize` is a Fast C ufunc
              </strong>
              <p>
                <code className="text-white">np.vectorize()</code> is syntactic sugar around a slow Python for-loop; it does not generate compiled C machine code. Always prefer built-in ufuncs.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                3. Calling np.log on Negative Numbers
              </strong>
              <p>
                <code className="text-white">np.log(-5)</code> emits a RuntimeWarning and inserts <code className="text-rose-300">nan</code>. Use <code className="text-emerald-400">np.abs()</code> or clipping before taking logs.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                4. Forgetting `out=` in High-Throughput Loops
              </strong>
              <p>
                In high-frequency training iterations, avoid heap memory allocations by writing into pre-allocated destination buffers: <code className="text-emerald-400">np.sqrt(X, out=X)</code>.
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
                question: "Sir, what makes ufuncs so much faster than writing math equations in Python?",
                answer: "Debangshu, universal functions are pre-compiled C loops that leverage CPU vector registers (SIMD - Single Instruction, Multiple Data). A single CPU clock cycle processes 4 or 8 floats at once, bypassing Python's dynamic type checking!",
              },
              {
                student: "Susmita",
                avatar: "👩‍💻",
                question: "Why do we use np.add.reduce(arr) when np.sum(arr) already exists?",
                answer: "Susmita, np.sum(arr) is actually just a user-friendly alias for np.add.reduce(arr)! The '.reduce' method works universally on ANY binary ufunc, like np.multiply.reduce (product), np.maximum.reduce, or np.logical_and.reduce!",
              },
              {
                student: "Tuhina",
                avatar: "👩‍🔬",
                question: "Why did our Softmax function return [nan, nan, nan] when training on raw unnormalized logits?",
                answer: "Tuhina, raw unnormalized logits can reach 500 or 1000. np.exp(1000) overflows float64 to 'inf', and inf / inf evaluates to 'nan'! Always subtract np.max(logits) before exponentiating to keep the maximum exponent at exp(0) = 1.0!",
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
              topic12_note.txt
            </span>
          </div>
          <PlainTextPrint text={noteText} fileName="topic12_note.txt" />
        </section>

        {/* ─── TEACHER PERSONA SIGNATURE ─────────────────────────────────────── */}
        <Teacher />
      </main>
    </div>
  );
};

export default Topic12;

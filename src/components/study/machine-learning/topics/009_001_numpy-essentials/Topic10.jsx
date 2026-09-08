import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic10_files/01_vectorized_elementwise_arithmetic.py?raw";
import pyCode2 from "./topic10_files/02_elementwise_product_vs_dot_product.py?raw";
import pyCode3 from "./topic10_files/03_in_place_arithmetic_memory_mutations.py?raw";
import pyCode4 from "./topic10_files/04_ml_loss_functions_and_gradient_step.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_vectorized_elementwise_arithmetic.py",
    title: "1. Vectorized Element-Wise Arithmetic",
    badge: "Arithmetic Basics",
    code: pyCode1,
    summary: "Demonstrates +, -, *, /, //, %, ** operators and compares 1M elements execution against pure Python loops.",
  },
  {
    id: "part2",
    fileName: "02_elementwise_product_vs_dot_product.py",
    title: "2. Hadamard Product (*) vs Matrix Dot (@)",
    badge: "Hadamard vs Dot",
    code: pyCode2,
    summary: "Clarifies element-wise multiplication vs matrix dot product (@ / np.dot) and inner-dimension alignment rules in ML.",
  },
  {
    id: "part3",
    fileName: "03_in_place_arithmetic_memory_mutations.py",
    title: "3. In-Place Operators (+=, *=) & RAM",
    badge: "In-Place & Memory",
    code: pyCode3,
    summary: "Proves that in-place operators reuse memory buffers (identical ctypes.data) and avoids redundant temporary array allocations.",
  },
  {
    id: "part4",
    fileName: "04_ml_loss_functions_and_gradient_step.py",
    title: "4. ML Loss Functions & Gradient Updates",
    badge: "MSE & Gradient Step",
    code: pyCode4,
    summary: "Computes vectorized Mean Squared Error (MSE) / MAE losses and performs gradient descent parameter updates (w -= lr * grad).",
  },
];

// ─── Preset Arrays for Interactive Calculator ────────────────────────────────
const PRESET_OPS = [
  { id: "add", label: "Addition (+)", symbol: "+", ufunc: "np.add(A, B)", desc: "Element-wise summation" },
  { id: "sub", label: "Subtraction (-)", symbol: "-", ufunc: "np.subtract(A, B)", desc: "Element-wise difference" },
  { id: "mul", label: "Multiplication (*)", symbol: "*", ufunc: "np.multiply(A, B)", desc: "Hadamard element-wise product" },
  { id: "div", label: "True Division (/)", symbol: "/", ufunc: "np.divide(A, B)", desc: "True floating-point division" },
  { id: "floor_div", label: "Floor Division (//)", symbol: "//", ufunc: "np.floor_divide(A, B)", desc: "Integer floor quotient" },
  { id: "mod", label: "Modulus (%)", symbol: "%", ufunc: "np.remainder(A, B)", desc: "Remainder after division" },
  { id: "pow", label: "Power (**)", symbol: "**", ufunc: "np.power(A, B)", desc: "Element-wise exponentiation" },
];

const Topic10 = () => {
  const [activeTab, setActiveTab] = useState("interactive_calculator");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive Array Arithmetic State
  const [arrA, setArrA] = useState([75, 82, 90, 68]);
  const [arrB, setArrB] = useState([5, 8, 10, 4]);
  const [selectedOp, setSelectedOp] = useState("add");

  // ML Scaling & Loss State
  const [rawScores, setRawScores] = useState([45, 60, 75, 90, 100]);
  const [predValues, setPredValues] = useState([48, 58, 79, 88, 95]);

  const activeOpData = PRESET_OPS.find((op) => op.id === selectedOp) || PRESET_OPS[0];

  const computeResult = () => {
    return arrA.map((valA, idx) => {
      const valB = arrB[idx];
      switch (selectedOp) {
        case "add":
          return valA + valB;
        case "sub":
          return valA - valB;
        case "mul":
          return valA * valB;
        case "div":
          return valB === 0 ? "inf" : parseFloat((valA / valB).toFixed(2));
        case "floor_div":
          return valB === 0 ? "inf" : Math.floor(valA / valB);
        case "mod":
          return valB === 0 ? "nan" : valA % valB;
        case "pow":
          return Math.pow(valA, valB);
        default:
          return valA + valB;
      }
    });
  };

  const calculatedResult = computeResult();

  // ML Metrics Computations
  const minVal = Math.min(...rawScores);
  const maxVal = Math.max(...rawScores);
  const range = maxVal - minVal || 1;
  const minMaxScaled = rawScores.map((x) => parseFloat(((x - minVal) / range).toFixed(3)));

  const meanVal = rawScores.reduce((a, b) => a + b, 0) / rawScores.length;
  const variance = rawScores.reduce((acc, x) => acc + Math.pow(x - meanVal, 2), 0) / rawScores.length;
  const stdVal = Math.sqrt(variance) || 1;
  const zScoreScaled = rawScores.map((x) => parseFloat(((x - meanVal) / stdVal).toFixed(3)));

  // Loss Calculation (MSE & RMSE)
  const residuals = predValues.map((p, i) => p - rawScores[i]);
  const squaredErrors = residuals.map((r) => r * r);
  const mseLoss = (squaredErrors.reduce((a, b) => a + b, 0) / squaredErrors.length).toFixed(2);
  const rmseLoss = Math.sqrt(parseFloat(mseLoss)).toFixed(2);

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
                  Module 1 • Topic 10
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>➕ Array Arithmetic Operations</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  a + b • a * b (Hadamard) • (X - μ) / σ • MSE
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Mastering vectorized element-wise math, in-place memory mutations, Hadamard vs dot products, and ML loss calculations.
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
              { id: "interactive_calculator", label: "🧮 Vector Arithmetic Sandbox", icon: "➕" },
              { id: "hadamard_vs_dot", label: "✖️ Hadamard (*) vs Dot (@)", icon: "📐" },
              { id: "inplace_mutator", label: "⚡ In-Place (+=) & Memory", icon: "💾" },
              { id: "ml_scaling_loss", label: "🤖 ML Normalization & MSE Loss", icon: "🎯" },
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
        {/* ─── TAB 1: VECTOR ARITHMETIC SANDBOX ─── */}
        {activeTab === "interactive_calculator" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🧮 Interactive Vector Arithmetic Sandbox</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Select an operation below to execute element-wise arithmetic across matching student mark positions in NumPy.
                  </p>
                </div>
                {/* Operations Selector */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_OPS.map((op) => (
                    <button
                      key={op.id}
                      onClick={() => setSelectedOp(op.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedOp === op.id
                          ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md scale-105"
                          : "bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code & Formula Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono">
                    result = arrA {activeOpData.symbol} arrB
                  </span>
                  <span className="text-xs text-slate-400">
                    Equivalent ufunc: <code className="text-blue-400 font-mono">{activeOpData.ufunc}</code>
                  </span>
                </div>
                <span className="text-xs text-slate-300 italic">{activeOpData.desc}</span>
              </div>

              {/* Visual Element-by-Element Operation Grid */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-4 gap-3 text-center font-mono">
                  {["Debangshu", "Susmita", "Swadeep", "Tuhina"].map((name, i) => (
                    <div key={i} className="text-xs text-slate-400 font-sans font-bold">
                      Student #{i}: {name}
                    </div>
                  ))}
                </div>

                {/* Array A Inputs */}
                <div className="space-y-1">
                  <span className="text-xs text-blue-400 font-mono font-bold">Array A (Base Marks):</span>
                  <div className="grid grid-cols-4 gap-3">
                    {arrA.map((val, idx) => (
                      <input
                        key={idx}
                        type="number"
                        value={val}
                        onChange={(e) => {
                          const next = [...arrA];
                          next[idx] = parseFloat(e.target.value) || 0;
                          setArrA(next);
                        }}
                        className="bg-slate-900 border border-blue-500/40 rounded-lg p-2 text-center font-mono font-bold text-white text-sm focus:border-blue-400 focus:outline-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Operation Symbol Indicator */}
                <div className="flex justify-center">
                  <span className="px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-base font-bold border border-emerald-500/40 shadow">
                    {activeOpData.symbol} ({activeOpData.label})
                  </span>
                </div>

                {/* Array B Inputs */}
                <div className="space-y-1">
                  <span className="text-xs text-purple-400 font-mono font-bold">Array B (Modifiers / Scores):</span>
                  <div className="grid grid-cols-4 gap-3">
                    {arrB.map((val, idx) => (
                      <input
                        key={idx}
                        type="number"
                        value={val}
                        onChange={(e) => {
                          const next = [...arrB];
                          next[idx] = parseFloat(e.target.value) || 0;
                          setArrB(next);
                        }}
                        className="bg-slate-900 border border-purple-500/40 rounded-lg p-2 text-center font-mono font-bold text-white text-sm focus:border-purple-400 focus:outline-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Resulting Array Output */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">
                      Computed Output Vector (arrA {activeOpData.symbol} arrB):
                    </span>
                    <span className="text-xs font-mono text-slate-400">shape: (4,) • dtype: float64</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {calculatedResult.map((res, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-emerald-600/30 to-blue-600/30 border-2 border-emerald-400 rounded-lg p-3 text-center font-mono font-bold text-white text-base shadow-lg shadow-emerald-950/40"
                      >
                        {res}
                        <span className="block text-[10px] text-emerald-300/80 font-normal">
                          {arrA[idx]} {activeOpData.symbol} {arrB[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 2: HADAMARD VS DOT PRODUCT ─── */}
        {activeTab === "hadamard_vs_dot" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>✖️ Element-Wise Hadamard (*) vs Matrix Multiplication (@)</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Understand the fundamental linear algebra distinction between multiplying corresponding cells vs computing row-by-column dot products.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Element-wise Multiplication Card */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-emerald-400 font-mono">
                      1. Element-Wise: A * B
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/30">
                      Hadamard Product
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Multiplies matching cells at position <code className="text-white">(i, j)</code>. Both matrices must have identical dimensions.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500"># A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]</p>
                    <p className="text-emerald-300">
                      A * B = [[1*5, 2*6],<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3*7, 4*8]]
                    </p>
                    <p className="text-white font-bold pt-1">
                      ➔ [[5, 12], [21, 32]]
                    </p>
                  </div>
                </div>

                {/* Matrix Multiplication Card */}
                <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-blue-400 font-mono">
                      2. Matrix Multiplication: A @ B
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded border border-blue-500/30">
                      np.matmul / np.dot
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Computes linear algebra dot products between rows of A and columns of B. Inner dimensions must match.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500"># A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]</p>
                    <p className="text-blue-300">
                      Row 0 dot Col 0: 1*5 + 2*7 = 19<br />
                      Row 0 dot Col 1: 1*6 + 2*8 = 22<br />
                      Row 1 dot Col 0: 3*5 + 4*7 = 43<br />
                      Row 1 dot Col 1: 3*6 + 4*8 = 50
                    </p>
                    <p className="text-white font-bold pt-1">
                      ➔ [[19, 22], [43, 50]]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 3: IN-PLACE MUTATION & MEMORY ─── */}
        {activeTab === "inplace_mutator" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>⚡ In-Place Arithmetic Mutations (+=, *=) & RAM Efficiency</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Understand how in-place operators reuse existing memory buffers to avoid gigabytes of garbage collection overhead during model training.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-bold font-mono text-emerald-300 bg-slate-900 px-2 py-1 rounded">
                      arr += 10 (In-Place)
                    </code>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      Zero Extra RAM
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Directly updates the original memory buffer without creating intermediate array copies on the heap.
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      # For a 10 GB dataset:<br />
                      X += offset # Uses exactly 10 GB
                    </code>
                  </div>
                </div>

                <div className="bg-slate-950 border border-rose-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-bold font-mono text-rose-300 bg-slate-900 px-2 py-1 rounded">
                      arr = arr + 10 (Reallocation)
                    </code>
                    <span className="text-[10px] bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                      Doubles RAM Peak
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Allocates a temporary new 10 GB buffer in RAM before reassigning the variable name, causing memory spikes.
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      # For a 10 GB dataset:<br />
                      X = X + offset # Peaks at 20 GB!
                    </code>
                  </div>
                </div>
              </div>

              {/* Dtype Casting Trap Alert */}
              <div className="bg-amber-950/30 border border-amber-500/50 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <span>⚠️ The In-Place Dtype Casting Trap</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In-place operations cannot change an array's dtype. Adding a float to an integer array in-place raises a <code className="text-amber-300">TypeError</code> because float decimals cannot fit into fixed 32-bit integer slots without reallocation.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                  <code>
                    int_arr = np.array([1, 2, 3], dtype=np.int32)<br />
                    int_arr += 2.5 # ❌ TypeError: Cannot cast ufunc 'add' output from float64 to int32<br />
                    <br />
                    # ✅ Solution: Ensure float dtype beforehand<br />
                    float_arr = int_arr.astype(np.float64)<br />
                    float_arr += 2.5 # Works smoothly!
                  </code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 4: ML NORMALIZATION & MSE LOSS ─── */}
        {activeTab === "ml_scaling_loss" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🤖 Machine Learning Feature Scaling & MSE Loss Sandbox</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Explore vectorized feature scaling formulas and real-time Mean Squared Error (MSE) loss computation.
              </p>

              {/* Min-Max and Z-Score Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Min-Max Scaling */}
                <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-300 font-mono">
                      1. Min-Max Scaling: (X - min) / (max - min)
                    </h3>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      Range: [0.0, 1.0]
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500">Raw Scores: [{rawScores.join(", ")}]</p>
                    <p className="text-blue-300 font-bold">Scaled: [{minMaxScaled.join(", ")}]</p>
                  </div>
                  <p className="text-xs text-slate-400">
                    Binds all values strictly between 0 and 1. Standard for image pixel normalization and Neural Networks.
                  </p>
                </div>

                {/* Z-Score Standardization */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-300 font-mono">
                      2. Z-Score: (X - μ) / σ
                    </h3>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      μ = 0, σ = 1
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-slate-500">Mean: {meanVal.toFixed(1)} | Std: {stdVal.toFixed(1)}</p>
                    <p className="text-emerald-300 font-bold">Standardized: [{zScoreScaled.join(", ")}]</p>
                  </div>
                  <p className="text-xs text-slate-400">
                    Standardizes distribution around zero with unit variance. Essential for SVMs, Logistic Regression, and PCA.
                  </p>
                </div>
              </div>

              {/* Interactive Loss Computation */}
              <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-purple-300 font-mono">
                    3. Regression Loss: Mean Squared Error (MSE)
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-xs font-mono bg-purple-500/10 text-purple-300 px-3 py-1 rounded border border-purple-500/30">
                      MSE: <strong>{mseLoss}</strong>
                    </span>
                    <span className="text-xs font-mono bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded border border-emerald-500/30">
                      RMSE: <strong>{rmseLoss}</strong>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-2">
                  <p className="text-slate-500"># Vectorized Loss Calculation Formula:</p>
                  <p className="text-purple-300">residuals = y_pred - y_true ➔ [{residuals.join(", ")}]</p>
                  <p className="text-blue-300">squared_errors = residuals ** 2 ➔ [{squaredErrors.join(", ")}]</p>
                  <p className="text-emerald-400 font-bold">mse = np.mean(squared_errors) ➔ {mseLoss}</p>
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
              <p className="text-xs text-slate-400">Select a script below to inspect elementwise arithmetic, hadamard vs dot, in-place memory, or ML losses</p>
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
            <span>⚠️ Arithmetic Pitfalls & How to Avoid Them</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                1. Confusing `*` with Matrix Multiplication
              </strong>
              <p>
                <code className="text-white">A * B</code> performs element-wise Hadamard multiplication. For linear algebra matrix dot products, always use the <code className="text-emerald-400">@</code> operator (or <code className="text-emerald-400">np.dot(A, B)</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                2. In-Place Float Addition on Integer Arrays
              </strong>
              <p>
                <code className="text-white">int_arr += 1.5</code> raises <code className="text-rose-300">TypeError</code>. Convert your array to float before performing in-place float additions: <code className="text-blue-300">arr = arr.astype(float)</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                3. Expecting Python List Concatenation Behavior
              </strong>
              <p>
                Adding two arrays <code className="text-white">arr1 + arr2</code> adds their numbers element-by-element. If you intended to concatenate them end-to-end, use <code className="text-purple-300">np.concatenate([arr1, arr2])</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                4. Silent Division by Zero Warnings
              </strong>
              <p>
                NumPy does not raise a ZeroDivisionError on <code className="text-white">1 / 0</code>; it produces <code className="text-rose-300">inf</code>. Always inspect datasets for infinite values with <code className="text-emerald-400">np.isinf()</code> before training ML models.
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
                question: "Sir, why did A * B give me a (2, 2) matrix of element-wise products instead of the matrix dot product from our class notes?",
                answer: "Debangshu, in NumPy, '*' is strictly the Hadamard element-by-element product! To compute the true linear algebra matrix multiplication (dot product of rows and columns), you must use Python's '@' operator: A @ B!",
              },
              {
                student: "Susmita",
                avatar: "👩‍💻",
                question: "Why does dividing by zero in NumPy not crash my Python script like normal?",
                answer: "Susmita, NumPy adheres to the IEEE 754 floating-point standard used in high-performance computing. Instead of crashing, it emits a RuntimeWarning and inserts 'inf' (infinity) or 'nan' (Not a Number), allowing massive batch pipelines to continue processing.",
              },
              {
                student: "Tuhina",
                avatar: "👩‍🔬",
                question: "Why do we divide digital image pixels by 255.0 before passing them to neural networks?",
                answer: "Tuhina, raw image pixels range from 0 to 255. Dividing by 255.0 normalizes all pixel intensities into the [0.0, 1.0] range, which prevents neural network weights from exploding during gradient descent!",
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
              topic10_note.txt
            </span>
          </div>
          <PlainTextPrint text={noteText} fileName="topic10_note.txt" />
        </section>

        {/* ─── TEACHER PERSONA SIGNATURE ─────────────────────────────────────── */}
        <Teacher />
      </main>
    </div>
  );
};

export default Topic10;

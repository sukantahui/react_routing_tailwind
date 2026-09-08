import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic11_files/01_scalar_and_row_broadcasting.py?raw";
import pyCode2 from "./topic11_files/02_column_and_outer_broadcasting.py?raw";
import pyCode3 from "./topic11_files/03_broadcasting_mismatch_and_fixes.py?raw";
import pyCode4 from "./topic11_files/04_ml_feature_centering_and_biases.py?raw";
import pyCode5 from "./topic11_files/05_ml_image_norm_and_pairwise_distance.py?raw";

import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

// ─── Multiple Python Scripts Suite ───────────────────────────────────────────
const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_scalar_and_row_broadcasting.py",
    title: "1. Scalar & Row Vector Broadcasting",
    badge: "Basic 1D/2D",
    code: pyCode1,
    summary: "Demonstrates scalar-to-array addition and 1D row vector broadcasting across all rows of a 2D student marks matrix.",
    shapes: "(3, 4) + (4,) ➔ (3, 4)",
  },
  {
    id: "part2",
    fileName: "02_column_and_outer_broadcasting.py",
    title: "2. Column Vector & Outer Grid Broadcasting",
    badge: "Column & Outer Grid",
    code: pyCode2,
    summary: "Shows column vector broadcasting (3, 4) + (3, 1) and simultaneous 2D outer grid generation from (3, 1) + (1, 4).",
    shapes: "(3, 1) + (1, 4) ➔ (3, 4)",
  },
  {
    id: "part3",
    fileName: "03_broadcasting_mismatch_and_fixes.py",
    title: "3. Shape Mismatch Errors & Resolution",
    badge: "Error Handling & Fixes",
    code: pyCode3,
    summary: "Demonstrates why (3, 4) + (3,) raises ValueError and provides two standard fixes: .reshape(-1, 1) and [:, np.newaxis].",
    shapes: "(3, 4) + (3,) ➔ ValueError",
  },
  {
    id: "part4",
    fileName: "04_ml_feature_centering_and_biases.py",
    title: "4. ML Feature Centering & Neural Net Biases",
    badge: "ML Tabular & NN",
    code: pyCode4,
    summary: "Real-world ML workflows: column-wise zero-mean feature centering X - X.mean(axis=0) and neural network dense layer bias addition (X @ W) + b.",
    shapes: "(N, D) - (D,) & (B, Out) + (Out,)",
  },
  {
    id: "part5",
    fileName: "05_ml_image_norm_and_pairwise_distance.py",
    title: "5. Image Channel Normalization & Pairwise Distances",
    badge: "Vision & Clustering",
    code: pyCode5,
    summary: "ImageNet RGB channel mean/std normalization across 4D batches and vectorized pairwise Euclidean distance matrix calculation for K-Means/KNN.",
    shapes: "(B, H, W, 3) - (3,) & (N, 1, D) - (1, M, D)",
  },
];

// ─── Preset Broadcasting Scenarios ───────────────────────────────────────────
const BROADCAST_SCENARIOS = [
  {
    id: "row_broadcast",
    label: "1. Matrix (3, 4) + Row (4,)",
    shapeA: "(3, 4)",
    shapeB: "(4,)",
    alignedB: "(1, 4)",
    resultShape: "(3, 4)",
    valid: true,
    desc: "1D Bonus row [5, 2, 0, 1] is prepended to (1, 4) and broadcast across all 3 student rows.",
    matA: [
      [70, 80, 85, 90],
      [65, 75, 80, 85],
      [88, 92, 95, 90],
    ],
    matB: [[5, 2, 0, 1]],
    isColB: false,
  },
  {
    id: "col_broadcast",
    label: "2. Matrix (3, 4) + Column (3, 1)",
    shapeA: "(3, 4)",
    shapeB: "(3, 1)",
    alignedB: "(3, 1)",
    resultShape: "(3, 4)",
    valid: true,
    desc: "Attendance bonus column [[2], [5], [1]] is broadcast across all 4 subject columns.",
    matA: [
      [70, 80, 85, 90],
      [65, 75, 80, 85],
      [88, 92, 95, 90],
    ],
    matB: [[2], [5], [1]],
    isColB: true,
  },
  {
    id: "outer_grid",
    label: "3. Column (3, 1) + Row (1, 4) [Outer Grid]",
    shapeA: "(3, 1)",
    shapeB: "(1, 4)",
    alignedB: "(1, 4)",
    resultShape: "(3, 4)",
    valid: true,
    desc: "Both arrays stretch along their singleton axis to form a full (3, 4) 2D addition table.",
    matA: [[10], [20], [30]],
    matB: [[1, 2, 3, 4]],
    isOuter: true,
  },
  {
    id: "mismatch_error",
    label: "4. Matrix (3, 4) + Row (3,) [❌ Mismatch Error]",
    shapeA: "(3, 4)",
    shapeB: "(3,)",
    alignedB: "(1, 3)",
    resultShape: "ValueError",
    valid: false,
    desc: "Aligning rightmost dimensions: 4 vs 3 mismatch! Neither is 1. Raises ValueError.",
    matA: [
      [70, 80, 85, 90],
      [65, 75, 80, 85],
      [88, 92, 95, 90],
    ],
    matB: [[10, 20, 30]],
    isError: true,
  },
];

const Topic11 = () => {
  const [activeTab, setActiveTab] = useState("interactive_broadcaster");
  const [selectedScenario, setSelectedScenario] = useState("row_broadcast");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // Shape Compatibility Checker State
  const [shapeInputA, setShapeInputA] = useState("3, 4");
  const [shapeInputB, setShapeInputB] = useState("4");

  const activeScenario = BROADCAST_SCENARIOS.find((s) => s.id === selectedScenario) || BROADCAST_SCENARIOS[0];
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Helper to test shape compatibility
  const checkCompatibility = () => {
    const parseDims = (str) =>
      str
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n > 0);

    const dimsA = parseDims(shapeInputA);
    const dimsB = parseDims(shapeInputB);

    if (dimsA.length === 0 || dimsB.length === 0) {
      return { valid: false, error: "Please enter valid comma-separated positive integer dimensions." };
    }

    const maxLen = Math.max(dimsA.length, dimsB.length);
    const paddedA = [...Array(maxLen - dimsA.length).fill(1), ...dimsA];
    const paddedB = [...Array(maxLen - dimsB.length).fill(1), ...dimsB];

    const resultDims = [];
    const stepAnalysis = [];

    for (let i = maxLen - 1; i >= 0; i--) {
      const a = paddedA[i];
      const b = paddedB[i];
      if (a === b) {
        resultDims.unshift(a);
        stepAnalysis.unshift(`Axis ${i}: ${a} == ${b} ➔ Output: ${a}`);
      } else if (a === 1) {
        resultDims.unshift(b);
        stepAnalysis.unshift(`Axis ${i}: 1 vs ${b} ➔ A is stretched to ${b}`);
      } else if (b === 1) {
        resultDims.unshift(a);
        stepAnalysis.unshift(`Axis ${i}: ${a} vs 1 ➔ B is stretched to ${a}`);
      } else {
        return {
          valid: false,
          paddedA: `(${paddedA.join(", ")})`,
          paddedB: `(${paddedB.join(", ")})`,
          error: `ValueError: operands could not be broadcast together with shapes (${dimsA.join(",")}) (${dimsB.join(",")}) at Axis ${i} (${a} vs ${b})`,
          stepAnalysis,
        };
      }
    }

    return {
      valid: true,
      paddedA: `(${paddedA.join(", ")})`,
      paddedB: `(${paddedB.join(", ")})`,
      resultShape: `(${resultDims.join(", ")})`,
      ndim: resultDims.length,
      stepAnalysis,
    };
  };

  const compatResult = checkCompatibility();

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
                  Module 1 • Topic 11
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>📡 Broadcasting Concept</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  (3, 4) + (4,) ➔ (3, 4) • Stride 0 • Multi-Script Suite
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Mastering shape alignment rules, zero-copy stride tricks, vector-matrix expansion, and ML batch broadcasting.
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
              { id: "interactive_broadcaster", label: "📡 Live Broadcasting Visualizer", icon: "📐" },
              { id: "rules_checker", label: "📏 Shape Compatibility Checker", icon: "🧮" },
              { id: "stride_zero_proof", label: "🧬 Stride 0 (Zero-Copy Proof)", icon: "⚡" },
              { id: "ml_broadcasting", label: "🤖 ML Tensor Broadcasting", icon: "🧠" },
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
        {/* ─── TAB 1: LIVE BROADCASTING VISUALIZER ─── */}
        {activeTab === "interactive_broadcaster" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>📡 Live Broadcasting Visualizer</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Select a broadcasting scenario to see how NumPy virtually stretches dimensions without copying bytes in RAM.
                  </p>
                </div>
                {/* Scenario Selector */}
                <div className="flex flex-wrap gap-2">
                  {BROADCAST_SCENARIOS.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScenario(sc.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedScenario === sc.id
                          ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md scale-105"
                          : "bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 mb-6 ${
                  activeScenario.valid
                    ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-200"
                    : "bg-rose-950/30 border-rose-500/50 text-rose-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-900 border border-slate-700">
                    A: {activeScenario.shapeA} + B: {activeScenario.shapeB} ➔ Output:{" "}
                    <strong>{activeScenario.resultShape}</strong>
                  </span>
                  <span className="text-xs">{activeScenario.desc}</span>
                </div>
              </div>

              {/* Visual Matrices Grid */}
              {!activeScenario.isError ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Array A Card */}
                  <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-blue-400">
                        Array A: Shape {activeScenario.shapeA}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Master</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-xs">
                      {activeScenario.matA.map((row, r) => (
                        <div key={r} className="flex gap-1.5 justify-center">
                          {row.map((v, c) => (
                            <div
                              key={c}
                              className="flex-1 h-9 rounded bg-slate-900 border border-blue-500/30 flex items-center justify-center font-bold text-white shadow-sm"
                            >
                              {v}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Array B (Broadcasted Virtual Stride) */}
                  <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-purple-400">
                        Array B: {activeScenario.shapeB} (Stretched)
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">Stride 0</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-xs">
                      {/* Virtual replication visualizer */}
                      {[0, 1, 2].map((r) => (
                        <div key={r} className="flex gap-1.5 justify-center">
                          {activeScenario.isColB
                            ? Array(4)
                                .fill(activeScenario.matB[r][0])
                                .map((v, c) => (
                                  <div
                                    key={c}
                                    className="flex-1 h-9 rounded bg-purple-950/40 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300"
                                  >
                                    {v}
                                  </div>
                                ))
                            : activeScenario.matB[0].map((v, c) => (
                                <div
                                  key={c}
                                  className="flex-1 h-9 rounded bg-purple-950/40 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300"
                                >
                                  {v}
                                </div>
                              ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result Matrix */}
                  <div className="bg-slate-950 border border-emerald-500/50 rounded-xl p-4 space-y-3 shadow-lg shadow-emerald-950/30">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        Result: Shape {activeScenario.resultShape}
                      </span>
                      <span className="text-[10px] text-emerald-300 font-mono font-bold">Computed</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-xs">
                      {activeScenario.matA.map((row, r) => (
                        <div key={r} className="flex gap-1.5 justify-center">
                          {row.map((vA, c) => {
                            let vB = activeScenario.isColB
                              ? activeScenario.matB[r][0]
                              : activeScenario.matB[0][c];
                            return (
                              <div
                                key={c}
                                className="flex-1 h-9 rounded bg-gradient-to-br from-emerald-600/30 to-blue-600/30 border-2 border-emerald-400 flex items-center justify-center font-bold text-white shadow"
                              >
                                {vA + vB}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-6 rounded-xl border border-rose-500/40 font-mono text-xs space-y-3">
                  <p className="text-rose-400 font-bold text-sm">
                    ❌ ValueError: operands could not be broadcast together with shapes (3,4) (3,)
                  </p>
                  <p className="text-slate-300">
                    Step 1: Shape (3,) is prepended on the left with 1 ➔ <code className="text-white">(1, 3)</code>
                    <br />
                    Step 2: Trailing dimension comparison: <code className="text-rose-300">4 vs 3</code> (Mismatch! Neither is 1).
                  </p>
                  <div className="p-3 bg-slate-900 rounded border border-emerald-500/40 text-emerald-300">
                    <strong>✅ How to Fix:</strong> Reshape the 3-element vector into a column vector of shape{" "}
                    <code className="text-white">(3, 1)</code>:
                    <br />
                    <code className="text-white mt-1 block">
                      result = marks_3x4 + bad_row.reshape(-1, 1) # Works perfectly!
                    </code>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ─── TAB 2: SHAPE COMPATIBILITY CHECKER ─── */}
        {activeTab === "rules_checker" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>📏 Interactive Shape Compatibility & Output Dimension Calculator</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Enter any two array shape tuples to test if NumPy can broadcast them according to Rule 1 and Rule 2.
              </p>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Shape Array A (comma-separated, e.g. <code className="text-white">8, 1, 6, 1</code>):
                  </label>
                  <input
                    type="text"
                    value={shapeInputA}
                    onChange={(e) => setShapeInputA(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-blue-400 font-mono focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. 3, 4"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Shape Array B (comma-separated, e.g. <code className="text-white">7, 1, 5</code>):
                  </label>
                  <input
                    type="text"
                    value={shapeInputB}
                    onChange={(e) => setShapeInputB(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-purple-400 font-mono focus:border-purple-500 focus:outline-none"
                    placeholder="e.g. 4"
                  />
                </div>
              </div>

              {/* Compatibility Output Card */}
              <div
                className={`p-5 rounded-xl border ${
                  compatResult.valid
                    ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-200"
                    : "bg-rose-950/30 border-rose-500/50 text-rose-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {compatResult.valid ? "✅ Broadcasting Compatible" : "❌ Incompatible Shapes"}
                  </span>
                  {compatResult.valid && (
                    <span className="text-xs font-mono px-2.5 py-1 bg-slate-900 rounded border border-slate-700 text-emerald-300 font-bold">
                      Result Shape: {compatResult.resultShape} (ndim={compatResult.ndim})
                    </span>
                  )}
                </div>

                {compatResult.valid ? (
                  <div className="space-y-3 text-xs font-mono">
                    <p className="text-slate-300">
                      Rule 1 (Padded on Left): A: {compatResult.paddedA} | B: {compatResult.paddedB}
                    </p>
                    <div className="bg-slate-900/80 p-3 rounded border border-slate-800 space-y-1">
                      <p className="text-slate-500 font-bold">Rule 2 Step-by-Step Axis Analysis (Right to Left):</p>
                      {compatResult.stepAnalysis.map((step, idx) => (
                        <p key={idx} className="text-slate-300">{step}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs font-mono">
                    <p className="text-rose-300 font-semibold">{compatResult.error}</p>
                    <p className="text-slate-400">
                      Broadcasting Rule: Each axis must either be equal in size, or one of them must be 1.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 3: STRIDE 0 ZERO-COPY PROOF ─── */}
        {activeTab === "stride_zero_proof" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧬 The Stride 0 Memory Trick: How Broadcasting Uses Zero Extra RAM</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Broadcasting does not copy or tile arrays in RAM. NumPy achieves virtual stretching by setting the stride multiplier to 0 bytes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-emerald-400 font-mono">
                    1. Zero-Copy Broadcasting (arr + vec)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When vector <code className="text-emerald-300">(4,)</code> is broadcasted across a matrix of 1,000,000 rows, NumPy sets <code className="text-white font-mono">stride[0] = 0 bytes</code>.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-emerald-300">Memory Allocated: 16 bytes (4 floats)</p>
                    <p className="text-slate-400">RAM Overhead: 0 MB extra</p>
                    <p className="text-white font-bold pt-1">Speed: Blazing fast SIMD loop in C</p>
                  </div>
                </div>

                <div className="bg-slate-950 border border-rose-500/40 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-rose-400 font-mono">
                    2. Physical Replication (np.tile / np.repeat)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Calling <code className="text-rose-300">np.tile(vec, (1000000, 1))</code> physically allocates and copies 1,000,000 duplicate rows into RAM.
                  </p>
                  <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="text-rose-300">Memory Allocated: 16 Megabytes</p>
                    <p className="text-slate-400">RAM Overhead: 100% duplicate buffer</p>
                    <p className="text-white font-bold pt-1">Speed: Slower due to memcpy and GC churn</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 4: ML TENSOR BROADCASTING ─── */}
        {activeTab === "ml_broadcasting" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🤖 4 Essential Machine Learning Broadcasting Workflows</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                From feature centering to deep learning convolution normalization, broadcasting powers the ML pipeline.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Feature Centering */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-400">1. Column-Wise Mean Centering</h3>
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      (N, D) - (D,)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Subtracting the mean vector of shape <code className="text-white">(D,)</code> from feature matrix <code className="text-white">(N, D)</code> centers all features at 0 without a loop.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      col_means = np.mean(X, axis=0) # (D,)<br />
                      X_centered = X - col_means     # (N, D)
                    </code>
                  </div>
                </div>

                {/* 2. Neural Net Bias Addition */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-400">2. Neural Network Bias Addition</h3>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      (Batch, Out) + (Out,)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Dense layer matrix multiplication produces <code className="text-white">(Batch, Out)</code>. Bias vector <code className="text-white">(Out,)</code> is broadcasted to every sample in the batch.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      logits = (X @ W) + bias # (64, 10) + (10,)
                    </code>
                  </div>
                </div>

                {/* 3. Image Channel Normalization */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-purple-400">3. Image RGB Channel Normalization</h3>
                    <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      (B, H, W, 3) - (3,)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The 3-element channel mean vector broadcasts across batch, height, and width axes simultaneously.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      norm_img = (batch_img - rgb_mean) / rgb_std
                    </code>
                  </div>
                </div>

                {/* 4. Pairwise Distance Matrix */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-amber-400">4. Pairwise Distance Tensor (KNN)</h3>
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      (N, 1, D) - (1, M, D)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    By expanding dimensions with <code className="text-white">np.newaxis</code>, broadcasting computes distances between all N samples and M centroids in a single line.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      diff = X[:, np.newaxis, :] - C[np.newaxis, :, :]
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── MULTI-SCRIPT CODE DEMONSTRATION ──────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>💻 Python Code Demonstration Suite (5 Focused Scripts)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Select a script below to inspect focused implementations for scalar, column, error handling, and ML tensors.
              </p>
            </div>
          </div>

          {/* Script Selection Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {PYTHON_SCRIPTS.map((script) => (
              <button
                key={script.id}
                onClick={() => setSelectedScriptId(script.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedScriptId === script.id
                    ? "bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40 scale-[1.02]"
                    : "bg-slate-950/70 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      selectedScriptId === script.id
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-slate-800 text-slate-500 border-slate-700"
                    }`}
                  >
                    {script.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-white truncate">{script.title}</p>
                <p className="text-[10px] font-mono text-emerald-400/80 mt-1 truncate">{script.shapes}</p>
              </button>
            ))}
          </div>

          {/* Active Script Description Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {activeScript.fileName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-400">
                  {activeScript.shapes}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{activeScript.summary}</p>
            </div>
          </div>

          {/* Python File Loader Component */}
          <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
        </section>

        {/* ─── COMMON PITFALLS ───────────────────────────────────────────────── */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <span>⚠️ Broadcasting Pitfalls & How to Avoid Them</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                1. Trying to Broadcast (3, 4) with (3,)
              </strong>
              <p>
                <code className="text-white">(3,)</code> pads to <code className="text-white">(1, 3)</code> on the left, failing to broadcast with <code className="text-white">(3, 4)</code>. You must reshape it to a column vector <code className="text-emerald-400">(3, 1)</code> via <code className="text-emerald-400">v.reshape(-1, 1)</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                2. In-Place Target Shape Growth Trap
              </strong>
              <p>
                Writing <code className="text-white">v += M</code> when <code className="text-white">v.shape==(4,)</code> and <code className="text-white">M.shape==(3,4)</code> crashes with <code className="text-rose-300">ValueError: non-broadcastable output operand</code> because the destination array cannot expand in-place.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                3. Accidental Outer Grid Production
              </strong>
              <p>
                Subtracting a (100, 1) array from a (1, 100) array silently produces a massive 10,000-element (100, 100) matrix! Always verify shapes with <code className="text-blue-300">.shape</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                4. Forgetting Right-to-Left Alignment Rule
              </strong>
              <p>
                Remember that broadcasting always aligns from trailing dimensions (rightmost) backward.
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
                question: "Sir, why did my array of shape (3, 4) fail to add with my column marks of shape (3,)?",
                answer: "Debangshu, remember Rule 1! When NumPy sees shape (3,), it pads a 1 to the LEFT side, turning it into (1, 3). Then it aligns (3, 4) with (1, 3) from the right: 4 vs 3 mismatch! To add it across columns, you must make it an explicit column vector of shape (3, 1) using col.reshape(-1, 1)!",
              },
              {
                student: "Susmita",
                avatar: "👩‍💻",
                question: "How does NumPy add a 10-element bias vector to 64,000 image predictions without running out of RAM?",
                answer: "Susmita, this is the magic of Stride-0 indexing! NumPy does not copy the 10 bias numbers 64,000 times. It sets the memory step to 0 bytes, so the CPU loops over the exact same 10 numbers for all 64,000 samples with 0 extra memory!",
              },
              {
                student: "Swadeep",
                avatar: "👨‍🎓",
                question: "If A has shape (5, 1) and B has shape (1, 6), what is the resulting shape of A + B?",
                answer: "Swadeep, applying Rule 3: max(5, 1) = 5 for rows, and max(1, 6) = 6 for columns. A + B produces a full (5, 6) 2D grid containing all 30 pairwise sums!",
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
              topic11_note.txt
            </span>
          </div>
          <PlainTextPrint text={noteText} fileName="topic11_note.txt" />
        </section>

        {/* ─── TEACHER PERSONA SIGNATURE ─────────────────────────────────────── */}
        <Teacher />
      </main>
    </div>
  );
};

export default Topic11;

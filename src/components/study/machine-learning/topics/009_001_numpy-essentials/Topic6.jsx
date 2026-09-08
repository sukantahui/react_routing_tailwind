import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic6_files/01_reshape_and_negative_one_wildcard.py?raw";
import pyCode2 from "./topic6_files/02_flatten_vs_ravel_and_views.py?raw";
import pyCode3 from "./topic6_files/03_transpose_and_axis_swapping.py?raw";
import pyCode4 from "./topic6_files/04_ml_flattening_image_batches.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_reshape_and_negative_one_wildcard.py",
    title: "1. Reshaping & -1 Wildcard Mechanics",
    badge: "Reshape & -1",
    code: pyCode1,
    summary: "Demonstrates 1D to 2D/3D transformations, total element count conservation, and using -1 for automatic dimension solving.",
  },
  {
    id: "part2",
    fileName: "02_flatten_vs_ravel_and_views.py",
    title: "2. ravel() vs flatten() & Zero-Copy Views",
    badge: "ravel vs flatten",
    code: pyCode2,
    summary: "Explores memory base pointers (.base), in-place mutation side-effects, and performance differences between views and deep copies.",
  },
  {
    id: "part3",
    fileName: "03_transpose_and_axis_swapping.py",
    title: "3. Transposition & CV Axis Permutations",
    badge: "Transpose & Axes",
    code: pyCode3,
    summary: "Covers 2D matrix transposition and multi-axis permutations converting TensorFlow (NHWC) format to PyTorch (NCHW) format.",
  },
  {
    id: "part4",
    fileName: "04_ml_flattening_image_batches.py",
    title: "4. ML Image Batch Flattening & Reconstruction",
    badge: "ML Image Prep",
    code: pyCode4,
    summary: "Flattens 28x28 MNIST images into (N, 784) feature matrices for classifiers and reconstructs 2D images back from flat feature rows.",
  },
];

// ─── Preset Reshape Transformations ──────────────────────────────────────────
const PRESET_RESHAPES = [
  {
    id: "flat",
    label: "1D Vector (12,)",
    shape: [12],
    rows: 1,
    cols: 12,
    desc: "Single contiguous flat sequence of 12 elements. ndim = 1.",
    badge: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    layout: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
  },
  {
    id: "3x4",
    label: "2D Matrix (3, 4)",
    shape: [3, 4],
    rows: 3,
    cols: 4,
    desc: "3 rows × 4 columns. Row-major (C-order) filling.",
    badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    layout: [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
    ],
  },
  {
    id: "4x3",
    label: "2D Matrix (4, 3)",
    shape: [4, 3],
    rows: 4,
    cols: 3,
    desc: "4 rows × 3 columns. Common for 4 samples with 3 features each.",
    badge: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    layout: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 11],
    ],
  },
  {
    id: "2x6",
    label: "2D Matrix (2, 6)",
    shape: [2, 6],
    rows: 2,
    cols: 6,
    desc: "2 batches/semesters × 6 student marks.",
    badge: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    layout: [
      [0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11],
    ],
  },
  {
    id: "col_12x1",
    label: "Column Vector (12, 1)",
    shape: [12, 1],
    rows: 12,
    cols: 1,
    desc: "12 samples × 1 single feature for Scikit-learn regression (.reshape(-1, 1)).",
    badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    layout: [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11]],
  },
  {
    id: "3d_2x2x3",
    label: "3D Tensor (2, 2, 3)",
    shape: [2, 2, 3],
    rows: 2,
    cols: 6,
    desc: "2 batches, each containing a (2, 3) matrix.",
    badge: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    layout: [
      [0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11],
    ],
    is3D: true,
  },
];

// ─── Ravel vs Flatten Comparison Data ────────────────────────────────────────
const FLATTEN_METHODS = [
  {
    method: "arr.ravel()",
    returnType: "Zero-Copy View (whenever possible)",
    memory: "O(1) memory overhead; shares same RAM buffer with parent",
    mutation: "Modifying elements in view WILL mutate the original parent array!",
    speed: "Blazing fast — no memory allocation or byte copying",
    useCase: "Data pipelines, loss calculations, high-throughput model training",
    badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  {
    method: "arr.flatten()",
    returnType: "Deep Copy (always)",
    memory: "O(N) memory allocation; creates independent duplicate buffer in RAM",
    mutation: "Completely safe — modifying copy does NOT affect original array",
    speed: "Slower for large tensors due to RAM allocation and memcpy",
    useCase: "When you need an isolated 1D copy to modify without altering original dataset",
    badge: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  },
  {
    method: "arr.reshape(-1)",
    returnType: "Zero-Copy View (if contiguous)",
    memory: "O(1) memory overhead; creates new shape metadata",
    mutation: "Shares memory if contiguous — mutations alter parent array",
    speed: "Blazing fast equivalent to ravel()",
    useCase: "Standard syntax in modern deep learning workflows (PyTorch / NumPy)",
    badge: "border-purple-500/40 bg-purple-500/10 text-purple-300",
  },
];

const Topic6 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPreset, setSelectedPreset] = useState("3x4");
  const [activeHint, setActiveHint] = useState(null);
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive Reshape Calculator State
  const [inputSize, setInputSize] = useState(24);
  const [dim1, setDim1] = useState("4");
  const [dim2, setDim2] = useState("6");
  const [dim3, setDim3] = useState("");

  const calculateReshape = () => {
    const d1 = dim1.trim() === "-1" ? -1 : parseInt(dim1, 10);
    const d2 = dim2.trim() === "-1" ? -1 : dim2.trim() === "" ? null : parseInt(dim2, 10);
    const d3 = dim3.trim() === "-1" ? -1 : dim3.trim() === "" ? null : parseInt(dim3, 10);

    const dims = [d1, d2, d3].filter((d) => d !== null && !isNaN(d));
    const minusOnes = dims.filter((d) => d === -1).length;

    if (minusOnes > 1) {
      return { valid: false, error: "ValueError: can only specify one unknown dimension (-1)" };
    }

    if (dims.some((d) => d !== -1 && d <= 0)) {
      return { valid: false, error: "Dimensions must be positive integers (or -1)." };
    }

    if (minusOnes === 1) {
      const knownProduct = dims.filter((d) => d !== -1).reduce((acc, val) => acc * val, 1);
      if (knownProduct === 0 || inputSize % knownProduct !== 0) {
        return {
          valid: false,
          error: `ValueError: total size ${inputSize} is not divisible by ${knownProduct}`,
        };
      }
      const inferred = inputSize / knownProduct;
      const finalShape = dims.map((d) => (d === -1 ? inferred : d));
      return {
        valid: true,
        shape: `(${finalShape.join(", ")})`,
        ndim: finalShape.length,
        inferredNote: `Inferred -1 as ${inferred} (${inputSize} / ${knownProduct})`,
      };
    }

    const product = dims.reduce((acc, val) => acc * val, 1);
    if (product !== inputSize) {
      return {
        valid: false,
        error: `ValueError: cannot reshape array of size ${inputSize} into shape (${dims.join(", ")}) [product = ${product}]`,
      };
    }

    return {
      valid: true,
      shape: `(${dims.join(", ")})`,
      ndim: dims.length,
      inferredNote: `Exact match: product ${product} == size ${inputSize}`,
    };
  };

  const calcResult = calculateReshape();
  const activePresetData = PRESET_RESHAPES.find((p) => p.id === selectedPreset) || PRESET_RESHAPES[1];

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
                  Module 1 • Topic 6
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>🔄 Reshaping Arrays</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  .reshape() • .ravel() • .flatten() • .T
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Mastering dimension manipulation, zero-copy views, wildcard inferences, matrix transpositions, and ML tensor flattening.
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

      {/* ─── TAB NAVIGATION ───────────────────────────────────────────────────── */}
      <nav className="bg-slate-950 border-b border-slate-800/80 sticky top-[73px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-1 py-2 scrollbar-thin scrollbar-thumb-slate-700">
            {[
              { id: "overview", label: "🌟 Visual Playground", icon: "📐" },
              { id: "syntax_rules", label: "📏 Invariance & -1 Wildcard", icon: "⚡" },
              { id: "ravel_vs_flatten", label: "⚡ Ravel vs Flatten (Views)", icon: "🧬" },
              { id: "transpose_ops", label: "🔄 Transpose & Axes Permutation", icon: "🔁" },
              { id: "ml_use_cases", label: "🤖 ML & Deep Learning Reshaping", icon: "🧠" },
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

      {/* ─── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ─── TAB 1: VISUAL PLAYGROUND ─── */}
        {activeTab === "overview" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🎮 Interactive 12-Element Reshape Playground</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Select a preset shape below to visualize how 12 student test marks in Barrackpore rearrange without copying memory.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESET_RESHAPES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedPreset === preset.id
                          ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md scale-105"
                          : "bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transformation Banner */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${activePresetData.badge}`}>
                      Shape: ({activePresetData.shape.join(", ")})
                    </span>
                    <span className="text-xs text-slate-400">
                      ndim: <strong className="text-white">{activePresetData.shape.length}</strong> • total elements:{" "}
                      <strong className="text-emerald-400">12</strong>
                    </span>
                  </div>
                  <code className="text-xs bg-slate-900 px-3 py-1 rounded border border-slate-700 font-mono text-emerald-300">
                    arr = np.arange(12).reshape({activePresetData.shape.join(", ")})
                  </code>
                </div>
                <p className="text-xs text-slate-300 mt-2">{activePresetData.desc}</p>
              </div>

              {/* Visual Grid of Elements */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
                  Memory Buffer Layout: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                </div>
                <div className="flex flex-col gap-2 w-full max-w-2xl">
                  {activePresetData.layout.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-2 justify-center">
                      <span className="text-[10px] font-mono text-slate-500 self-center w-8 text-right">
                        r{rIdx}:
                      </span>
                      {row.map((val, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex-1 max-w-[64px] h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/40 flex flex-col items-center justify-center text-emerald-300 font-mono font-bold text-sm shadow transition-transform hover:scale-110 hover:border-emerald-400"
                        >
                          <span>{val}</span>
                          <span className="text-[8px] text-slate-400 font-normal">
                            [{rIdx},{cIdx}]
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-1">
                  <span>⚡ Zero-Copy Views</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Reshaping alters the array metadata (shape & strides) in O(1) time without reallocating or copying data buffer in RAM.
                </p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-1">
                  <span>📏 Size Invariance</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The product of the new shape dimensions MUST strictly match the original total size (<code className="text-white">arr.size</code>).
                </p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-1">
                  <span>🎯 The -1 Wildcard</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Passing <code className="text-purple-300">-1</code> lets NumPy deduce the remaining dimension automatically. Only ONE -1 is allowed!
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 2: INVARIANCE & -1 WILDCARD CALCULATOR ─── */}
        {activeTab === "syntax_rules" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧮 Live Reshape Validation & -1 Inferrer Calculator</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Enter your total array size and target dimensions to test if NumPy accepts your reshape or throws a <code className="text-rose-400">ValueError</code>.
              </p>

              {/* Interactive Calculator Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Original Total Size (<code className="text-white">arr.size</code>):
                  </label>
                  <input
                    type="number"
                    value={inputSize}
                    onChange={(e) => setInputSize(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-emerald-400 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Dimension 1 (or -1):
                  </label>
                  <input
                    type="text"
                    value={dim1}
                    onChange={(e) => setDim1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="e.g. 4 or -1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Dimension 2 (or -1, optional):
                  </label>
                  <input
                    type="text"
                    value={dim2}
                    onChange={(e) => setDim2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="e.g. 6 or -1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Dimension 3 (optional):
                  </label>
                  <input
                    type="text"
                    value={dim3}
                    onChange={(e) => setDim3(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="e.g. 2 (leave blank if 2D)"
                  />
                </div>
              </div>

              {/* Calculator Output Display */}
              <div
                className={`p-5 rounded-xl border ${
                  calcResult.valid
                    ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-200"
                    : "bg-rose-950/30 border-rose-500/50 text-rose-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {calcResult.valid ? "✅ Reshape Succeeded" : "❌ Reshape Failed"}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700">
                    Input Size: {inputSize} elements
                  </span>
                </div>

                {calcResult.valid ? (
                  <div className="space-y-2">
                    <p className="text-lg font-mono font-bold text-white">
                      Target Shape: <span className="text-emerald-400">{calcResult.shape}</span> (ndim = {calcResult.ndim})
                    </p>
                    <p className="text-xs text-emerald-300/80">{calcResult.inferredNote}</p>
                    <div className="mt-3 text-xs bg-slate-900/80 p-3 rounded font-mono text-slate-300 border border-slate-800">
                      <code>
                        arr = np.arange({inputSize})<br />
                        reshaped = arr.reshape({calcResult.shape.slice(1, -1)})<br />
                        print(reshaped.shape) # Output: {calcResult.shape}
                      </code>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-rose-300 font-semibold">{calcResult.error}</p>
                    <p className="text-xs text-slate-400">
                      Rule: All non-negative dimensions multiplied together must divide evenly into {inputSize}, and at most one dimension can be -1.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Invariance Rules Table */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <span>📚 4 Golden Rules of NumPy Reshaping</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <span className="font-bold text-emerald-400">1.</span>
                  <div>
                    <strong className="text-white">Strict Size Equality:</strong> The element count cannot grow or shrink. For an array of 24 elements, valid shapes include (24,), (1, 24), (24, 1), (2, 12), (3, 8), (4, 6), (2, 3, 4), (2, 2, 2, 3).
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <span className="font-bold text-blue-400">2.</span>
                  <div>
                    <strong className="text-white">Single -1 Wildcard:</strong> You can leave one axis as <code className="text-blue-300">-1</code>. NumPy computes <code className="text-white">missing_dim = total_size / product(other_dims)</code>.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <span className="font-bold text-purple-400">3.</span>
                  <div>
                    <strong className="text-white">Memory Contiguity:</strong> If the original array is contiguous in C-order, .reshape() returns a view in O(1) time. If it is non-contiguous (e.g. from sliced steps), it creates a new copy.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <span className="font-bold text-amber-400">4.</span>
                  <div>
                    <strong className="text-white">Reshape vs Resize:</strong> Never confuse <code className="text-amber-300">arr.reshape()</code> (safe, invariant) with <code className="text-amber-300">np.resize()</code> (pads with repeated copies or truncates data).
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 3: RAVEL VS FLATTEN ─── */}
        {activeTab === "ravel_vs_flatten" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🧬 ravel() vs flatten() vs reshape(-1): Memory & Performance Deep Dive</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Understand the critical distinction between zero-copy views and deep memory copies when collapsing multidimensional arrays to 1D vectors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {FLATTEN_METHODS.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <code className="text-sm font-mono font-bold text-white bg-slate-800 px-2 py-1 rounded">
                          {item.method}
                        </code>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badge}`}>
                          {item.returnType}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <p>
                          <strong className="text-slate-400">Memory:</strong> {item.memory}
                        </p>
                        <p>
                          <strong className="text-slate-400">Mutation Effect:</strong> {item.mutation}
                        </p>
                        <p>
                          <strong className="text-slate-400">Execution Speed:</strong> {item.speed}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        Best For: {item.useCase}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Memory Mutation Simulation */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span>🔬 Memory Mutation Proof (Python Base Pointer Check)</span>
                </h3>
                <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 space-y-2">
                  <p className="text-slate-500"># 1. Create a 2x3 matrix of student scores</p>
                  <p>
                    <span className="text-blue-400">orig</span> = np.array([[10, 20, 30], [40, 50, 60]])
                  </p>
                  <p>
                    <span className="text-emerald-400">r_view</span> = orig.<span className="text-emerald-300">ravel()</span>{" "}
                    <span className="text-slate-500"># Zero-copy view</span>
                  </p>
                  <p>
                    <span className="text-blue-400">f_copy</span> = orig.<span className="text-blue-300">flatten()</span>{" "}
                    <span className="text-slate-500"># Deep copy in RAM</span>
                  </p>
                  <p className="pt-2 text-slate-500"># 2. Check base memory owners</p>
                  <p>
                    print(r_view.base is orig) <span className="text-emerald-400"># True (Shares memory buffer)</span>
                  </p>
                  <p>
                    print(f_copy.base is orig) <span className="text-rose-400"># False (Owns independent memory)</span>
                  </p>
                  <p className="pt-2 text-slate-500"># 3. Mutate view and copy</p>
                  <p>
                    r_view[0] = 999 <span className="text-emerald-400"># Modifies orig[0, 0] to 999!</span>
                  </p>
                  <p>
                    f_copy[1] = 888 <span className="text-blue-400"># orig[0, 1] remains 20 (Untouched)</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 4: TRANSPOSE & MULTI-AXIS PERMUTATION ─── */}
        {activeTab === "transpose_ops" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🔄 Transposition (.T) & Multi-Axis Permutation (np.transpose)</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Understand how swapping rows and columns works in O(1) constant time, and how deep learning pipelines convert image tensor layouts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* 2D Matrix Transpose Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-emerald-400">
                      2D Matrix Transpose (<code className="text-white">mat.T</code>)
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      (Rows, Cols) → (Cols, Rows)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Swaps axis 0 and axis 1. If <code className="text-white">mat.shape == (3, 4)</code>, then <code className="text-emerald-400">mat.T.shape == (4, 3)</code>.
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      X = np.array([[1, 2, 3], [4, 5, 6]]) # shape (2, 3)<br />
                      X_T = X.T # shape (3, 2)<br />
                      <br />
                      # X_T is:<br />
                      # [[1, 4],<br />
                      #  [2, 5],<br />
                      #  [3, 6]]
                    </code>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-200">
                    ⚠️ <strong>Gotcha for 1D Vectors:</strong> If <code className="text-white">v = np.array([1, 2, 3])</code> (shape <code className="text-white">(3,)</code>), then <code className="text-white">v.T</code> does NOTHING! Shape remains <code className="text-white">(3,)</code>. Use <code className="text-white">v.reshape(-1, 1)</code> instead.
                  </div>
                </div>

                {/* Deep Learning Tensor Permutation Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-purple-400">
                      DL Channel Swapping (NHWC ↔ NCHW)
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      np.transpose(arr, axes)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    TensorFlow stores images as <strong>NHWC</strong> (Batch, Height, Width, Channels), while PyTorch requires <strong>NCHW</strong> (Batch, Channels, Height, Width).
                  </p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 border border-slate-800">
                    <code>
                      # TensorFlow batch of 32 images (32, 224, 224, 3)<br />
                      tf_images = np.zeros((32, 224, 224, 3))<br />
                      <br />
                      # Permute axes to PyTorch format (0, 3, 1, 2)<br />
                      torch_images = np.transpose(tf_images, (0, 3, 1, 2))<br />
                      print(torch_images.shape) # (32, 3, 224, 224)
                    </code>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-200">
                    💡 <strong>Stride Magic:</strong> Transposition simply swaps stride multipliers in the metadata header, executing in instantaneous O(1) time without moving image pixels in RAM.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── TAB 5: ML & DEEP LEARNING USE CASES ─── */}
        {activeTab === "ml_use_cases" && (
          <section className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <span>🤖 Real-World Machine Learning Reshaping Scenarios</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Three indispensable reshaping patterns that every Machine Learning engineer in Kolkata and Barrackpore uses daily.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Scenario 1: MNIST Flattening */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🖼️</span>
                      <h3 className="text-sm font-bold text-emerald-400">MNIST Image Flattening</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Dense / Multi-Layer Perceptron (MLP) layers cannot ingest 2D pixel grids directly. They require a flat 1D vector of features per image.
                    </p>
                    <div className="mt-3 bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                      <code>
                        # 60,000 images of 28x28<br />
                        X_train = load_mnist() # (60000, 28, 28)<br />
                        <br />
                        # Flatten to 784 features<br />
                        X_flat = X_train.reshape(60000, -1)<br />
                        print(X_flat.shape) # (60000, 784)
                      </code>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (Batch, 28, 28) → (Batch, 784)
                  </span>
                </div>

                {/* Scenario 2: Scikit-learn Single Feature */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">📈</span>
                      <h3 className="text-sm font-bold text-blue-400">Single Feature Regression</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Scikit-learn requires 2D matrices <code className="text-white">(n_samples, n_features)</code>. Passing a 1D vector of shape <code className="text-white">(N,)</code> throws a ValueError.
                    </p>
                    <div className="mt-3 bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                      <code>
                        # Study hours for 5 students<br />
                        hours = np.array([2.5, 5.1, 3.2, 8.5, 4.0])<br />
                        <br />
                        # Reshape to 2D column matrix<br />
                        X = hours.reshape(-1, 1) # (5, 1)<br />
                        model.fit(X, y) # ✅ Success!
                      </code>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (N,) → (N, 1) via .reshape(-1, 1)
                  </span>
                </div>

                {/* Scenario 3: Image Color Quantization */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🎨</span>
                      <h3 className="text-sm font-bold text-purple-400">K-Means Color Quantization</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      To cluster pixel colors using K-Means, collapse the spatial height and width into a continuous list of RGB pixel triplets.
                    </p>
                    <div className="mt-3 bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
                      <code>
                        # High-res photo (1080, 1920, 3)<br />
                        img = load_photo() # 2M+ pixels<br />
                        <br />
                        # Flatten pixels to (N, 3)<br />
                        pixels = img.reshape(-1, 3)<br />
                        kmeans.fit(pixels)
                      </code>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (H, W, 3) → (H*W, 3)
                  </span>
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
              <p className="text-xs text-slate-400">Select a script below to inspect reshape mechanics, ravel vs flatten, axis permutations, or image flattening</p>
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

        {/* ─── COMMON PITFALLS & GOTCHAS ─────────────────────────────────────── */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <span>⚠️ Common Pitfalls & How to Avoid Them</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                1. Assuming arr.T Transposes a 1D Vector
              </strong>
              <p>
                A 1D array of shape <code className="text-white">(5,)</code> has only one axis. Calling <code className="text-white">v.T</code> does not turn it into a column vector — its shape remains <code className="text-white">(5,)</code>. Always use <code className="text-emerald-400">v.reshape(-1, 1)</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                2. Passing Multiple -1 Dimensions
              </strong>
              <p>
                Writing <code className="text-white">arr.reshape(-1, -1)</code> raises <code className="text-rose-300">ValueError: can only specify one unknown dimension</code>. NumPy can only solve a linear equation for one unknown at a time.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                3. Unintended Side Effects with arr.ravel()
              </strong>
              <p>
                Because <code className="text-white">ravel()</code> returns a view, mutating it alters the parent array. If you need an isolated copy that won't corrupt your source data, use <code className="text-blue-300">arr.flatten()</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-xl border border-rose-500/20 space-y-2">
              <strong className="text-rose-300 font-bold block">
                4. Confusing reshape() with np.resize()
              </strong>
              <p>
                <code className="text-white">.reshape()</code> guarantees strict size invariance. <code className="text-white">np.resize()</code> silently duplicates or drops elements to fill the shape, which causes silent data corruption in ML pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CLASSROOM INTERACTION / STUDENT DIALOGUE ─────────────────────── */}
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
                question: "Sir, what happens under the hood when I do .reshape(3, 4) on an array of 12 numbers? Does Python re-create all 12 integers in memory?",
                answer: "No, Debangshu! This is the brilliance of NumPy. The 12 numbers remain in their exact same contiguous RAM addresses. NumPy merely creates a tiny new 32-byte header with shape=(3, 4) and updated stride multipliers (16 bytes to hop a row, 4 bytes to hop a column). It runs in instantaneous O(1) time!",
              },
              {
                student: "Susmita",
                avatar: "👩‍💻",
                question: "Why does Scikit-learn reject my 1D array y_data when I pass it as X to LinearRegression?",
                answer: "Excellent question, Susmita! Scikit-learn's design contract requires X to be a 2D table of shape (n_samples, n_features). A 1D array of shape (N,) has no feature axis. Transforming it with X = hours.reshape(-1, 1) provides 1 column of features across N sample rows.",
              },
              {
                student: "Tuhina",
                avatar: "👩‍🔬",
                question: "If I have 1,000 images of size 28x28 in grayscale, can I reshape them to (1000, 784) and later reshape back to (1000, 28, 28) without scrambling pixels?",
                answer: "Yes, exactly Tuhina! Because C-order reads and writes sequentially across rows, reversing the reshape with flat_images.reshape(1000, 28, 28) perfectly restores the original 2D image matrix pixel for pixel without any scrambling.",
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
              topic6_note.txt
            </span>
          </div>
          <PlainTextPrint text={noteText} fileName="topic6_note.txt" />
        </section>

        {/* ─── TEACHER PERSONA SIGNATURE ─────────────────────────────────────── */}
        <Teacher />
      </main>
    </div>
  );
};

export default Topic6;

import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic2_files/01_ndarray_memory_layout_and_strides.py?raw";
import pyCode2 from "./topic2_files/02_ndarray_attributes_deep_dive.py?raw";
import pyCode3 from "./topic2_files/03_c_speed_vs_python_pointer_overhead.py?raw";
import pyCode4 from "./topic2_files/04_real_world_ml_tensor_inspection.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_ndarray_memory_layout_and_strides.py",
    title: "1. Memory Layout, Pointers & Strides",
    badge: "RAM & Strides",
    code: pyCode1,
    summary: "Inspects raw C-contiguous memory addresses (.ctypes.data), row-major byte strides, and item byte offsets.",
  },
  {
    id: "part2",
    fileName: "02_ndarray_attributes_deep_dive.py",
    title: "2. Core Attributes Deep Dive",
    badge: "Attributes",
    code: pyCode2,
    summary: "Systematically compares .shape, .ndim, .size, .dtype, .itemsize, and .nbytes across 1D vectors, 2D matrices, and 3D tensors.",
  },
  {
    id: "part3",
    fileName: "03_c_speed_vs_python_pointer_overhead.py",
    title: "3. Pointer Overhead vs SIMD Vectorization",
    badge: "C vs Python",
    code: pyCode3,
    summary: "Explains why Python lists of pointer objects take up to 36x more RAM than flat C-buffers loaded into CPU L1 cache.",
  },
  {
    id: "part4",
    fileName: "04_real_world_ml_tensor_inspection.py",
    title: "4. Computer Vision & NLP ML Tensors",
    badge: "CV & NLP Tensors",
    code: pyCode4,
    summary: "Simulates 4D RGB image batches (NCHW) and 3D Transformer sentence batches, calculating byte strides and total GPU footprint.",
  },
];

// ─── Attribute definitions ───────────────────────────────────────────────────
const ATTRIBUTES = [
  { attr: "arr.shape", type: "tuple", example: "(3, 4)", desc: "Lengths of each axis (rows, columns, depths, etc.)" },
  { attr: "arr.ndim", type: "int", example: "2", desc: "Number of array dimensions / axes (rank of tensor)" },
  { attr: "arr.size", type: "int", example: "12", desc: "Total count of elements (product of shape dimensions)" },
  { attr: "arr.dtype", type: "dtype", example: "float64", desc: "Data type of all elements (homogeneous across buffer)" },
  { attr: "arr.itemsize", type: "int", example: "8", desc: "Bytes consumed by a single element in RAM" },
  { attr: "arr.nbytes", type: "int", example: "96", desc: "Total RAM occupied by array data buffer (size × itemsize)" },
  { attr: "arr.strides", type: "tuple", example: "(32, 8)", desc: "Bytes to step in RAM along each axis to jump 1 index" },
  { attr: "arr.data", type: "memoryview", example: "<memory at 0x...>", desc: "Pointer to the start of the contiguous C memory buffer" },
  { attr: "arr.base", type: "ndarray / None", example: "None", desc: "Original array if this ndarray is a view, else None" },
];

// ─── Dimension breakdown cards ───────────────────────────────────────────────
const DIMENSIONS = [
  {
    rank: "1D Array (Vector)",
    shape: "(5,)",
    ndim: 1,
    analogy: "A single row / column list of features or target values",
    mlUse: "Target labels vector y, single sample features, bias vectors",
    color: "border-blue-500/50 bg-blue-950/20 text-blue-300",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  },
  {
    rank: "2D Array (Matrix)",
    shape: "(N_samples, N_features)",
    ndim: 2,
    analogy: "A tabular dataset of rows and columns (e.g., student marks)",
    mlUse: "Feature matrix X for Linear Regression, Logistic Regression, KNN",
    color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  {
    rank: "3D Array (Tensor)",
    shape: "(Height, Width, Channels)",
    ndim: 3,
    analogy: "A single RGB digital image or sequence of time-series steps",
    mlUse: "Computer vision image inputs, LSTM/RNN time-series windows",
    color: "border-purple-500/50 bg-purple-950/20 text-purple-300",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  },
  {
    rank: "4D Array (Batched Tensor)",
    shape: "(Batch, Height, Width, Channels)",
    ndim: 4,
    analogy: "A batch of video frames or batch of images sent to GPU",
    mlUse: "CNN training batches (e.g. 32 RGB images of 224×224 pixels)",
    color: "border-amber-500/50 bg-amber-950/20 text-amber-300",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
];

// ─── Memory comparison items ─────────────────────────────────────────────────
const MEMORY_COMPARISON = [
  {
    aspect: "Storage Model",
    pyList: "Array of 64-bit pointers pointing to scattered PyObject items on heap",
    npArray: "Single contiguous C memory buffer storing raw unboxed binary values",
    winner: "NumPy (Cache Locality)",
  },
  {
    aspect: "Memory Overhead",
    pyList: "~28 bytes per integer + 8 bytes pointer = ~36 bytes per number",
    npArray: "Exact binary size: 4 bytes (int32) or 8 bytes (int64/float64)",
    winner: "NumPy (4x-9x less RAM)",
  },
  {
    aspect: "Type Constraint",
    pyList: "Heterogeneous — can mix strings, floats, ints, dictionaries",
    npArray: "Strictly homogeneous — all items share identical dtype and itemsize",
    winner: "NumPy (Enables SIMD)",
  },
  {
    aspect: "Slicing Operation",
    pyList: "Always creates a shallow copy (allocates new pointer list in memory)",
    npArray: "Creates a zero-copy View sharing memory via stride calculations",
    winner: "NumPy (O(1) Instant)",
  },
  {
    aspect: "CPU Hardware Execution",
    pyList: "Interpreted Python loop with dynamic type check per iteration",
    npArray: "Direct vectorized C execution with SIMD AVX-512 register instructions",
    winner: "NumPy (50x-200x Faster)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
const Topic2 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAxis, setSelectedAxis] = useState(0);
  const [activeHint, setActiveHint] = useState(null);
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  const [viewMutationDemo, setViewMutationDemo] = useState({
    original: [10, 20, 30, 40, 50],
    isViewMutated: false,
  });

  const handleMutateView = () => {
    setViewMutationDemo({
      original: [10, 999, 30, 40, 50],
      isViewMutated: true,
    });
  };

  const handleResetView = () => {
    setViewMutationDemo({
      original: [10, 20, 30, 40, 50],
      isViewMutated: false,
    });
  };

  const tabs = [
    { id: "overview", label: "Overview & Memory Architecture" },
    { id: "anatomy", label: "ndarray Anatomy" },
    { id: "dimensions", label: "Dimensions (1D to 4D)" },
    { id: "memory", label: "Memory & Strides" },
    { id: "views", label: "Views vs Copies" },
    { id: "comparison", label: "Python List vs ndarray" },
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">

      {/* ================================================================= */}
      {/* 1. HEADER SECTION */}
      {/* ================================================================= */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Segment 9 • Module 1 • Topic 2
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Core Concept
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Data Structure
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            The NumPy <code className="text-cyan-400 font-mono">ndarray</code> Concept
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            The <strong className="text-white font-mono">ndarray</strong> (N-dimensional array) is the
            fundamental atomic data structure powering all of scientific Python, Machine Learning, and Deep Learning.
            Click the tabs below to explore its contiguous C memory blocks, multidimensional strides, and zero-copy views.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400 ring-2 ring-indigo-400/30"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. DYNAMIC TAB CONTENT */}
      {/* ================================================================= */}

      {/* TAB: OVERVIEW & MEMORY ARCHITECTURE */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Conceptual Overview */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
                01
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Conceptual Overview & Purpose</h2>
                <p className="text-xs sm:text-sm text-slate-400">Understanding ndarray from theory to production architecture</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <h3 className="font-bold text-cyan-300 text-base">What is an ndarray?</h3>
                </div>
                <p className="text-sm text-slate-300">
                  An <code className="text-indigo-300 font-mono">ndarray</code> is a homogeneous multidimensional container of fixed-size items.
                  Every element in the array shares the exact same numeric data type (e.g. <code className="text-amber-300">np.float64</code>) and
                  occupies contiguous memory in RAM.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Uniform element size and binary representation</li>
                  <li>Indexed by tuples of integers e.g. <code className="text-slate-200">arr[row, col]</code></li>
                  <li>Managed via Python metadata header wrapping raw C/C++ memory</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h3 className="font-bold text-emerald-300 text-base">Why is it Needed in Machine Learning?</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Machine learning algorithms (such as Linear Regression and Neural Networks) execute billions of matrix multiplications,
                  dot products, and loss computations. Python lists cannot be executed on CPU SIMD hardware because list items are scattered pointers across RAM.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Enables CPU vectorization and SIMD parallel operations</li>
                  <li>Drastically cuts RAM footprint (no pointer or boxing overhead)</li>
                  <li>Allows zero-copy reshape, transpose, and slice operations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SVG Diagram & Interactive Axis Switcher */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
                02
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Visual Memory Architecture & Strides</h2>
                <p className="text-xs sm:text-sm text-slate-400">How ndarray maps 2D logical matrices onto 1D physical RAM</p>
              </div>
            </div>

            {/* SVG Diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                className="w-full max-w-3xl h-auto"
                viewBox="0 0 800 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background glow */}
                <rect width="800" height="420" rx="16" fill="#0B1120" />
                <circle cx="200" cy="150" r="100" fill="#3B82F6" fillOpacity="0.05" />
                <circle cx="600" cy="280" r="120" fill="#10B981" fillOpacity="0.05" />

                {/* Logical 2D Grid Representation */}
                <g transform="translate(40, 40)">
                  <text x="0" y="0" fill="#93C5FD" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    LOGICAL 2D MATRIX: shape = (3, 4) • dtype = float64
                  </text>
                  <text x="0" y="20" fill="#64748B" fontSize="11" fontFamily="sans-serif">
                    Indexed as arr[row, col]
                  </text>

                  {/* Axis 1 Arrow */}
                  <path d="M 50 40 L 260 40" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 2" />
                  <polygon points="265,40 255,36 255,44" fill="#38BDF8" />
                  <text x="110" y="34" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    Axis 1 → (Columns)
                  </text>

                  {/* Axis 0 Arrow */}
                  <path d="M 30 60 L 30 190" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 2" />
                  <polygon points="30,195 26,185 34,185" fill="#A855F7" />
                  <text x="10" y="130" fill="#A855F7" fontSize="11" fontWeight="bold" fontFamily="monospace" transform="rotate(-90, 15, 130)">
                    Axis 0 ↓ (Rows)
                  </text>

                  {/* Matrix Cells */}
                  {[
                    { r: 0, c: 0, val: "72", label: "arr[0,0]" },
                    { r: 0, c: 1, val: "85", label: "arr[0,1]" },
                    { r: 0, c: 2, val: "61", label: "arr[0,2]" },
                    { r: 0, c: 3, val: "90", label: "arr[0,3]" },
                    { r: 1, c: 0, val: "88", label: "arr[1,0]" },
                    { r: 1, c: 1, val: "76", label: "arr[1,1]" },
                    { r: 1, c: 2, val: "95", label: "arr[1,2]" },
                    { r: 1, c: 3, val: "70", label: "arr[1,3]" },
                    { r: 2, c: 0, val: "55", label: "arr[2,0]" },
                    { r: 2, c: 1, val: "65", label: "arr[2,1]" },
                    { r: 2, c: 2, val: "72", label: "arr[2,2]" },
                    { r: 2, c: 3, val: "80", label: "arr[2,3]" },
                  ].map((cell, idx) => {
                    const x = 50 + cell.c * 56;
                    const y = 50 + cell.r * 50;
                    const isRow0 = cell.r === 0;
                    const isRow1 = cell.r === 1;
                    const fillCol = isRow0 ? "#1E293B" : isRow1 ? "#0F2942" : "#1B2A38";
                    const borderCol = isRow0 ? "#38BDF8" : isRow1 ? "#10B981" : "#F59E0B";

                    return (
                      <g key={idx}>
                        <rect
                          x={x}
                          y={y}
                          width="50"
                          height="44"
                          rx="6"
                          fill={fillCol}
                          stroke={borderCol}
                          strokeWidth="1.5"
                        >
                          <animate
                            attributeName="stroke-opacity"
                            values="0.4;1;0.4"
                            dur="3s"
                            begin={`${idx * 0.15}s`}
                            repeatCount="indefinite"
                          />
                        </rect>
                        <text x={x + 25} y={y + 22} fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          {cell.val}
                        </text>
                        <text x={x + 25} y={y + 36} fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                          {cell.label}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Metadata Box */}
                <g transform="translate(380, 40)">
                  <rect x="0" y="0" width="380" height="150" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
                  <text x="20" y="28" fill="#A5B4FC" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    NDARRAY METADATA HEADER
                  </text>
                  <line x1="20" y1="38" x2="360" y2="38" stroke="#4338CA" strokeWidth="1" />

                  <text x="25" y="60" fill="#E2E8F0" fontSize="12" fontFamily="monospace">
                    arr.data    → <tspan fill="#38BDF8">0x7ffee4b1a0 (Pointer)</tspan>
                  </text>
                  <text x="25" y="80" fill="#E2E8F0" fontSize="12" fontFamily="monospace">
                    arr.shape   → <tspan fill="#4ADE80">(3, 4)</tspan> [rows, cols]
                  </text>
                  <text x="25" y="100" fill="#E2E8F0" fontSize="12" fontFamily="monospace">
                    arr.strides → <tspan fill="#FBBF24">(32, 8)</tspan> [bytes to jump]
                  </text>
                  <text x="25" y="120" fill="#E2E8F0" fontSize="12" fontFamily="monospace">
                    arr.dtype   → <tspan fill="#F472B6">float64</tspan> (8 bytes/elem)
                  </text>
                  <text x="25" y="140" fill="#E2E8F0" fontSize="12" fontFamily="monospace">
                    arr.flags   → <tspan fill="#2DD4BF">C_CONTIGUOUS, OWNDATA</tspan>
                  </text>
                </g>

                {/* Connector Arrow */}
                <path d="M 400 200 L 400 240" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="400,245 396,237 404,237" fill="#6366F1" />
                <text x="410" y="225" fill="#A5B4FC" fontSize="10" fontFamily="monospace">
                  Points directly to flat buffer
                </text>

                {/* Physical 1D Contiguous RAM Buffer */}
                <g transform="translate(40, 255)">
                  <text x="0" y="0" fill="#34D399" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    PHYSICAL 1D C-CONTIGUOUS MEMORY (RAM): 12 Elements × 8 Bytes = 96 Bytes
                  </text>
                  <text x="0" y="18" fill="#64748B" fontSize="11" fontFamily="sans-serif">
                    Row 0 (blue) followed immediately in RAM by Row 1 (green) and Row 2 (amber)
                  </text>

                  {/* Flat blocks */}
                  {[72, 85, 61, 90, 88, 76, 95, 70, 55, 65, 72, 80].map((v, i) => {
                    const x = i * 58;
                    const isRow0 = i < 4;
                    const isRow1 = i >= 4 && i < 8;
                    const fill = isRow0 ? "#1E293B" : isRow1 ? "#0F2942" : "#1B2A38";
                    const stroke = isRow0 ? "#38BDF8" : isRow1 ? "#10B981" : "#F59E0B";

                    return (
                      <g key={i}>
                        <rect
                          x={x}
                          y="30"
                          width="54"
                          height="50"
                          rx="6"
                          fill={fill}
                          stroke={stroke}
                          strokeWidth="1.5"
                        />
                        <text x={x + 27} y="55" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          {v}
                        </text>
                        <text x={x + 27} y="72" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          +{i * 8}B
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Interactive Axis Switcher */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-bold text-white text-base">Interactive Axis Inspector: <code className="text-cyan-400">np.sum(marks, axis={selectedAxis === null ? "None" : selectedAxis})</code></h3>
                <div className="flex gap-2">
                  {[
                    { id: 0, label: "Axis 0 (Collapse Rows ↓)" },
                    { id: 1, label: "Axis 1 (Collapse Cols →)" },
                    { id: null, label: "axis=None (All Elements)" },
                  ].map((opt) => (
                    <button
                      key={String(opt.id)}
                      onClick={() => setSelectedAxis(opt.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedAxis === opt.id
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-1">Matrix Input:</span>
                  <pre className="text-slate-300">
{`[[72, 85, 61, 90],  # Sachin (Barrackpore)
 [88, 76, 95, 70],  # Mahima (Shyamnagar)
 [55, 65, 72, 80]]  # Susmita (Ichapur)`}
                  </pre>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Calculation & Result:</span>
                  {selectedAxis === 0 && (
                    <div className="space-y-1 text-emerald-300">
                      <p>Column-wise totals (Subject totals across all students):</p>
                      <p className="text-sm font-bold text-white bg-slate-950 p-2 rounded border border-emerald-500/40">
                        np.sum(marks, axis=0) = [215, 226, 228, 240]
                      </p>
                      <p className="text-slate-400 text-[11px]">Output shape: (4,) — reduced axis 0 from (3, 4)</p>
                    </div>
                  )}
                  {selectedAxis === 1 && (
                    <div className="space-y-1 text-cyan-300">
                      <p>Row-wise totals (Total marks for each student):</p>
                      <p className="text-sm font-bold text-white bg-slate-950 p-2 rounded border border-cyan-500/40">
                        np.sum(marks, axis=1) = [308, 329, 272]
                      </p>
                      <p className="text-slate-400 text-[11px]">Output shape: (3,) — reduced axis 1 from (3, 4)</p>
                    </div>
                  )}
                  {selectedAxis === null && (
                    <div className="space-y-1 text-amber-300">
                      <p>Grand total across the entire 2D matrix:</p>
                      <p className="text-sm font-bold text-white bg-slate-950 p-2 rounded border border-amber-500/40">
                        np.sum(marks, axis=None) = 909
                      </p>
                      <p className="text-slate-400 text-[11px]">Output: scalar float (all 12 elements summed)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB: ANATOMY */}
      {activeTab === "anatomy" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Anatomy of the ndarray Object</h2>
              <p className="text-xs sm:text-sm text-slate-400">Essential attributes inspected in every data science session</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/60 text-xs uppercase font-mono text-slate-400">
                  <th className="p-3">Attribute</th>
                  <th className="p-3">Return Type</th>
                  <th className="p-3">Example Value</th>
                  <th className="p-3">Technical Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono text-xs sm:text-sm">
                {ATTRIBUTES.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300">{row.attr}</td>
                    <td className="p-3 text-purple-300">{row.type}</td>
                    <td className="p-3 text-amber-300">{row.example}</td>
                    <td className="p-3 font-sans text-xs sm:text-sm text-slate-300">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB: DIMENSIONS */}
      {activeTab === "dimensions" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Dimensional Hierarchy (1D to 4D)</h2>
              <p className="text-xs sm:text-sm text-slate-400">From 1D vectors to 4D tensor batches used in Deep Learning</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DIMENSIONS.map((dim, i) => (
              <div key={i} className={`p-5 rounded-xl border ${dim.color} space-y-3`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{dim.rank}</h3>
                  <span className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-full border ${dim.badge}`}>
                    ndim = {dim.ndim}
                  </span>
                </div>
                <p className="text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800 text-slate-200">
                  shape = <strong className="text-white">{dim.shape}</strong>
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-100">Analogy:</strong> {dim.analogy}
                </p>
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-200">ML Application:</strong> {dim.mlUse}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB: MEMORY & STRIDES */}
      {activeTab === "memory" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">C-Order Memory Layout & Strides Math</h2>
              <p className="text-xs sm:text-sm text-slate-400">Why Transpose is an instantaneous O(1) operation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base">C-Contiguous (Row-Major) vs Fortran (Col-Major)</h3>
              <p className="text-sm text-slate-300">
                In C-order (NumPy's default), items in the last axis (columns) are adjacent in RAM. Moving to the next column takes 1 itemsize step.
                Moving to the next row jumps by <code className="text-indigo-300 font-mono">N_cols × itemsize</code> bytes.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p className="text-slate-400"># Check continuity flags</p>
                <p>arr = np.array([[1, 2], [3, 4]], dtype=np.int32)</p>
                <p className="text-emerald-400">arr.flags['C_CONTIGUOUS'] # True</p>
                <p className="text-rose-400">arr.flags['F_CONTIGUOUS'] # False</p>
                <p className="text-cyan-400">arr.strides # (8, 4) bytes</p>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-cyan-300 text-base">Why Transpose <code className="text-white font-mono">arr.T</code> is 0.000 ms</h3>
              <p className="text-sm text-slate-300">
                When you transpose a 1,000,000 × 1,000,000 matrix in NumPy, zero bytes of numeric data are moved or copied.
                NumPy simply swaps the shape tuple and swaps the strides tuple!
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p className="text-slate-400"># Original array shape (3, 4), strides (32, 8)</p>
                <p>t = arr.T  # Transposed view</p>
                <p className="text-amber-400">t.shape   # (4, 3) &lt;-- swapped</p>
                <p className="text-purple-400">t.strides # (8, 32) &lt;-- swapped</p>
                <p className="text-emerald-400">t.base is arr # True (zero copy view)</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: VIEWS VS COPIES */}
      {activeTab === "views" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Views vs Copies Mechanics</h2>
              <p className="text-xs sm:text-sm text-slate-400">The single most common source of data mutation bugs in Python ML</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-amber-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">A. Array Slice = VIEW</span>
              <p className="text-sm text-slate-300">
                Basic slicing (<code className="text-amber-300 font-mono">arr[1:4]</code>) creates a lightweight metadata wrapper pointing to the <strong>exact same RAM buffer</strong>.
                Mutating an element inside a view modifies the original array!
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p>orig = np.array([10, 20, 30])</p>
                <p>v = orig[1:]       # View</p>
                <p>v[0] = 999         # Mutating view</p>
                <p className="text-rose-400">print(orig) # [10, 999, 30] MUTATED!</p>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">B. Explicit Copy = .copy()</span>
              <p className="text-sm text-slate-300">
                Calling <code className="text-emerald-300 font-mono">arr[1:4].copy()</code> allocates a completely separate memory block in RAM.
                Changes made to the copy have zero effect on the parent array.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p>orig = np.array([10, 20, 30])</p>
                <p>c = orig[1:].copy() # Independent Copy</p>
                <p>c[0] = 999          # Mutating copy</p>
                <p className="text-emerald-400">print(orig) # [10, 20, 30] SAFE!</p>
              </div>
            </div>
          </div>

          {/* Interactive view mutation simulator */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm sm:text-base">
              Interactive View Mutation Sandbox:
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleMutateView}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-md"
              >
                Execute: view[0] = 999
              </button>
              <button
                onClick={handleResetView}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-slate-700"
              >
                Reset Array
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Original Array in Memory:</span>
                <span className={`text-base font-bold ${viewMutationDemo.isViewMutated ? "text-rose-400" : "text-emerald-400"}`}>
                  [{viewMutationDemo.original.join(", ")}]
                </span>
                {viewMutationDemo.isViewMutated && (
                  <span className="block text-[11px] text-rose-300 mt-1">
                    ⚠️ Notice: original[1] changed from 20 to 999 because view shared memory!
                  </span>
                )}
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">View Slice (orig[1:4]):</span>
                <span className="text-base font-bold text-amber-300">
                  [{viewMutationDemo.original.slice(1, 4).join(", ")}]
                </span>
                <span className="block text-[11px] text-slate-400 mt-1">
                  view.base is orig: <strong className="text-cyan-300">True</strong>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: PYTHON LIST VS NDARRAY COMPARISON */}
      {activeTab === "comparison" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Python List vs NumPy ndarray Comparison</h2>
              <p className="text-xs sm:text-sm text-slate-400">Architectural differences in memory, speed, and execution</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/60 text-xs uppercase font-mono text-slate-400">
                  <th className="p-3">Feature</th>
                  <th className="p-3 text-rose-300">Python Builtin List</th>
                  <th className="p-3 text-emerald-300">NumPy ndarray</th>
                  <th className="p-3 text-cyan-300">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {MEMORY_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white font-mono">{row.aspect}</td>
                    <td className="p-3 text-slate-300">{row.pyList}</td>
                    <td className="p-3 text-slate-200">{row.npArray}</td>
                    <td className="p-3 font-semibold text-emerald-400">{row.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 3. CODE DEMONSTRATION (MULTI-SCRIPT SUITE) */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">💻</div>
          <div>
            <h2 className="text-xl font-bold text-white">Python Code Demonstration Suite (4 Focused Scripts)</h2>
            <p className="text-xs text-slate-400">Select a script below to inspect ndarray memory pointers, core attributes, or tensor representations</p>
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

      {/* ================================================================= */}
      {/* 4. COMMON PITFALLS & BEST PRACTICES */}
      {/* ================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Common Pitfalls & Best Practices</h2>
            <p className="text-xs sm:text-sm text-slate-400">Avoid these beginner and intermediate ndarray traps</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 1: Unintended View Mutation</span>
            <p className="text-xs text-slate-300">
              Slicing an array and modifying it mutates the parent training set.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># BAD:</span> sub = X[:, 0:2]; sub[0] = 0<br/>
              <span className="text-emerald-400"># GOOD:</span> sub = X[:, 0:2].copy(); sub[0] = 0
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 2: Shape (N,) vs (N, 1) in ML Models</span>
            <p className="text-xs text-slate-300">
              Passing a 1D vector of shape <code className="text-amber-300">(N,)</code> as feature matrix X into Scikit-learn throws a ValueError.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># BAD:</span> model.fit(x_1d, y) # shape (100,)<br/>
              <span className="text-emerald-400"># GOOD:</span> model.fit(x_1d.reshape(-1, 1), y) # shape (100, 1)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 3: Chained Indexing Performance Trap</span>
            <p className="text-xs text-slate-300">
              Writing <code className="text-rose-300 font-mono">arr[i][j]</code> creates an unnecessary intermediate 1D slice object per access.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># SLOW:</span> val = arr[5][10]<br/>
              <span className="text-emerald-400"># FAST (Idiomatic):</span> val = arr[5, 10]
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 4: Implicit String Upcasting</span>
            <p className="text-xs text-slate-300">
              If a single string is accidentally added to a numeric list during array creation, NumPy converts the entire array to string dtype.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># BAD:</span> arr = np.array([1, 2, "3"]) # dtype &lt;U21<br/>
              <span className="text-emerald-400"># GOOD:</span> arr = np.array([1, 2, "3"], dtype=np.float64)
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. HINT SECTION ("THINK ABOUT THIS...") */}
      {/* ================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Think About This... (Interactive Concept Checks)</h2>
            <p className="text-xs sm:text-sm text-slate-400">Test your mental model of ndarray memory and dimensions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              q: "If an array has shape (4, 5, 6), what is its arr.ndim and arr.size?",
              a: "ndim = 3 (number of dimensions in tuple). size = 4 × 5 × 6 = 120 total elements.",
            },
            {
              id: 2,
              q: "Why does arr.ravel() run faster and use less RAM than arr.flatten()?",
              a: "ravel() returns a zero-copy View if memory is contiguous. flatten() always allocates a brand new copy.",
            },
            {
              id: 3,
              q: "What are the strides for a (3, 4) array of float32 (4 bytes each)?",
              a: "strides = (16, 4). Each element is 4 bytes, so advancing 1 column = 4B, advancing 1 row (4 items) = 16B.",
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

      {/* ================================================================= */}
      {/* 6. FAQ SECTION (<FAQTemplate>) */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="NumPy ndarray Concept — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ================================================================= */}
      {/* 7. PLAIN TEXT PRINTABLE NOTE (<PlainTextPrint>) */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="NumPy ndarray Concept Quick Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note"
          downloadFileName="numpy_ndarray_concept_note.txt"
        />
      </section>

      {/* ================================================================= */}
      {/* 8. TEACHER'S NOTE (<Teacher>) */}
      {/* ================================================================= */}
      <Teacher
        note="Remember in our Barrackpore lab sessions: Sachin, Mahima, and Susmita often ask why a slice modified in one function alters the dataset in another. Slices are Views, not Copies! Always use .copy() when you intend to create an independent snapshot of your feature matrix before preprocessing. — Sukanta Hui"
      />

    </div>
  );
};

export default Topic2;

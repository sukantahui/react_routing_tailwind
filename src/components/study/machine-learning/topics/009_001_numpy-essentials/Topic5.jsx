import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic5_files/01_shape_ndim_size_inspection.py?raw";
import pyCode2 from "./topic5_files/02_1d_vector_vs_2d_column_matrix.py?raw";
import pyCode3 from "./topic5_files/03_expanding_and_squeezing_dimensions.py?raw";
import pyCode4 from "./topic5_files/04_ml_batch_dimension_manipulation.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_shape_ndim_size_inspection.py",
    title: "1. Shape, ndim & Size Inspection",
    badge: "Tensor Ranks",
    code: pyCode1,
    summary: "Systematically checks shape tuples, rank dimensions (.ndim), item count (.size), and byte footprints across 1D to 4D tensors.",
  },
  {
    id: "part2",
    fileName: "02_1d_vector_vs_2d_column_matrix.py",
    title: "2. (N,) 1D Vector vs (N, 1) Column Matrix",
    badge: "Shape Paradox",
    code: pyCode2,
    summary: "Demystifies why 1D vectors do not transpose and explains the exact shape requirement for Scikit-learn feature matrices.",
  },
  {
    id: "part3",
    fileName: "03_expanding_and_squeezing_dimensions.py",
    title: "3. np.newaxis, expand_dims & squeeze",
    badge: "Axis Expansion",
    code: pyCode3,
    summary: "Demonstrates inserting singleton batch axes using np.newaxis and np.expand_dims, and eliminating redundant axes with np.squeeze.",
  },
  {
    id: "part4",
    fileName: "04_ml_batch_dimension_manipulation.py",
    title: "4. ML Inference Batch Formatting",
    badge: "ML Batch Shape",
    code: pyCode4,
    summary: "Prepares raw single student test vectors into (1, N_features) batches for model inference and converts prediction matrices back to scalars.",
  },
];

// ─── Hierarchy levels ────────────────────────────────────────────────────────
const HIERARCHY_LEVELS = [
  {
    rank: "0D Array (Scalar)",
    shape: "()",
    ndim: 0,
    elements: "1",
    desc: "Single scalar value (e.g. loss value, metric, learning rate)",
    badge: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  },
  {
    rank: "1D Array (Vector)",
    shape: "(N,)",
    ndim: 1,
    elements: "N",
    desc: "Single list of numbers (target labels y, bias vector, single feature)",
    badge: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  },
  {
    rank: "2D Array (Matrix)",
    shape: "(N_samples, N_features)",
    ndim: 2,
    elements: "Rows × Cols",
    desc: "Tabular dataset matrix X for Scikit-learn models and linear regression",
    badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  {
    rank: "3D Array (Tensor)",
    shape: "(Height, Width, Channels)",
    ndim: 3,
    elements: "H × W × C",
    desc: "Digital color image (RGB) or time-series sequence (Timesteps, Features)",
    badge: "border-purple-500/40 bg-purple-500/10 text-purple-300",
  },
  {
    rank: "4D Array (Batched Tensor)",
    shape: "(Batch, Height, Width, Channels)",
    ndim: 4,
    elements: "B × H × W × C",
    desc: "Deep learning training mini-batch of images passed to Convolutional Neural Networks",
    badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
];

// ─── Shape Comparison Table ──────────────────────────────────────────────────
const SHAPE_COMPARISONS = [
  {
    format: "1D Vector",
    syntax: "v = np.array([10, 20, 30])",
    shape: "(3,)",
    ndim: 1,
    indexing: "v[i]",
    mlRole: "Target labels y (e.g. Pass/Fail labels)",
    verdict: "1 axis only",
    color: "text-blue-400",
  },
  {
    format: "2D Row Matrix",
    syntax: "row = v.reshape(1, 3)",
    shape: "(1, 3)",
    ndim: 2,
    indexing: "row[0, j]",
    mlRole: "Single sample test prediction in Scikit-learn",
    verdict: "1 row, 3 columns",
    color: "text-emerald-400",
  },
  {
    format: "2D Column Matrix",
    syntax: "col = v.reshape(3, 1)",
    shape: "(3, 1)",
    ndim: 2,
    indexing: "col[i, 0]",
    mlRole: "Single feature column in Linear Regression",
    verdict: "3 rows, 1 column",
    color: "text-amber-400",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
const Topic5 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeHint, setActiveHint] = useState(null);
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive shape transformation state
  const [selectedFormat, setSelectedFormat] = useState("1d");

  const getFormatData = () => {
    switch (selectedFormat) {
      case "1d":
        return {
          name: "1D Vector",
          shape: "(4,)",
          ndim: 1,
          size: 4,
          syntax: "x = np.array([75, 88, 92, 64])",
          scikitLearnValid: false,
          warning: "Scikit-learn requires 2D matrix for X! Will throw ValueError.",
        };
      case "row":
        return {
          name: "2D Row Matrix (1, 4)",
          shape: "(1, 4)",
          ndim: 2,
          size: 4,
          syntax: "x = np.array([75, 88, 92, 64]).reshape(1, -1)",
          scikitLearnValid: true,
          warning: "Valid: 1 sample with 4 features (suitable for model.predict).",
        };
      case "col":
        return {
          name: "2D Column Matrix (4, 1)",
          shape: "(4, 1)",
          ndim: 2,
          size: 4,
          syntax: "x = np.array([75, 88, 92, 64]).reshape(-1, 1)",
          scikitLearnValid: true,
          warning: "Valid: 4 samples with 1 feature (suitable for model.fit).",
        };
      case "matrix":
        return {
          name: "2D Tabular Dataset (3, 4)",
          shape: "(3, 4)",
          ndim: 2,
          size: 12,
          syntax: "X = np.zeros((3, 4)) # 3 students x 4 subjects",
          scikitLearnValid: true,
          warning: "Standard feature matrix X with 3 samples and 4 features.",
        };
      default:
        return {};
    }
  };

  const fmt = getFormatData();

  const tabs = [
    { id: "overview", label: "Overview & Visual Hierarchy" },
    { id: "shape_vs_ndim", label: "Shape vs Ndim vs Size" },
    { id: "shape_trap", label: "The (N,) vs (N, 1) Shape Trap" },
    { id: "slicing_shapes", label: "Slicing & Axis Reduction" },
    { id: "expand_squeeze", label: "Expand Dims & Squeeze" },
    { id: "ml_validation", label: "ML Dataset Shape Validation" },
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">

      {/* ================================================================= */}
      {/* 1. HEADER SECTION WITH WORKING DIRECT TABS */}
      {/* ================================================================= */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Segment 9 • Module 1 • Topic 5
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Core Attributes
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Array Geometry
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Array <code className="text-cyan-400 font-mono">shape</code>, <code className="text-emerald-400 font-mono">size</code>, and <code className="text-indigo-400 font-mono">dimensions (ndim)</code>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            In Machine Learning, 90% of model bugs stem from shape mismatches.
            Master the mathematical definitions of <strong className="text-white font-mono">shape</strong>, <strong className="text-white font-mono">ndim</strong>, and <strong className="text-white font-mono">size</strong>, understand the critical difference between 1D vectors and 2D matrices, and learn how to defensively audit dataset dimensions.
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
      {/* 2. DYNAMIC TAB CONTENT (SWITCHES DIRECTLY BELOW HEADER) */}
      {/* ================================================================= */}

      {/* TAB: OVERVIEW & VISUAL HIERARCHY */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Conceptual Overview */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
                01
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">The Three Pillars of Array Geometry</h2>
                <p className="text-xs sm:text-sm text-slate-400">Understanding how NumPy measures multidimensional space</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-950 p-5 rounded-xl border border-cyan-900/40 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. arr.shape (Tuple)</span>
                <h3 className="font-bold text-white text-base">Axis Lengths</h3>
                <p className="text-xs text-slate-300">
                  Returns a tuple of integers showing the size along each dimension. E.g. <code className="text-cyan-300 font-mono">(3, 4)</code> represents 3 rows and 4 columns.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. arr.ndim (Integer)</span>
                <h3 className="font-bold text-white text-base">Number of Axes (Rank)</h3>
                <p className="text-xs text-slate-300">
                  Returns the integer count of dimensions. E.g. 1 for vectors, 2 for tabular matrices, 3 for RGB images, 4 for image batches.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-purple-900/40 space-y-2">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">3. arr.size (Integer)</span>
                <h3 className="font-bold text-white text-base">Total Element Count</h3>
                <p className="text-xs text-slate-300">
                  Total numeric items in memory, equal to the mathematical product: <code className="text-purple-300 font-mono">∏ shape_i</code>. E.g. <code className="text-slate-200">3 × 4 = 12</code>.
                </p>
              </div>
            </div>
          </section>

          {/* SVG Visual Hierarchy Diagram */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
                02
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Visual Dimensional Hierarchy (0D to 4D)</h2>
                <p className="text-xs sm:text-sm text-slate-400">From a single scalar dot to 4D computer vision tensor batches</p>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                className="w-full max-w-3xl h-auto"
                viewBox="0 0 800 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="360" rx="16" fill="#0B1120" />

                {/* 0D Scalar */}
                <g transform="translate(40, 40)">
                  <rect x="0" y="0" width="120" height="130" rx="8" fill="#18181B" stroke="#64748B" strokeWidth="1" />
                  <text x="60" y="24" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    0D: Scalar
                  </text>
                  <circle cx="60" cy="65" r="16" fill="#3B82F6" fillOpacity="0.3" stroke="#60A5FA" strokeWidth="2">
                    <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="60" y="70" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    42
                  </text>
                  <text x="60" y="105" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    shape: () • ndim: 0
                  </text>
                </g>

                {/* 1D Vector */}
                <g transform="translate(180, 40)">
                  <rect x="0" y="0" width="180" height="130" rx="8" fill="#18181B" stroke="#3B82F6" strokeWidth="1" />
                  <text x="90" y="24" fill="#93C5FD" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    1D: Vector
                  </text>
                  <g transform="translate(15, 45)">
                    {[75, 88, 92, 64].map((v, i) => (
                      <g key={i} transform={`translate(${i * 38}, 0)`}>
                        <rect x="0" y="0" width="34" height="34" rx="4" fill="#1E293B" stroke="#3B82F6" strokeWidth="1" />
                        <text x="17" y="22" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          {v}
                        </text>
                      </g>
                    ))}
                  </g>
                  <text x="90" y="105" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    shape: (4,) • ndim: 1
                  </text>
                </g>

                {/* 2D Matrix */}
                <g transform="translate(380, 40)">
                  <rect x="0" y="0" width="180" height="130" rx="8" fill="#18181B" stroke="#10B981" strokeWidth="1" />
                  <text x="90" y="24" fill="#6EE7B7" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    2D: Matrix (Tabular X)
                  </text>
                  <g transform="translate(20, 38)">
                    {[
                      [75, 88, 92],
                      [92, 95, 89],
                    ].map((row, r) =>
                      row.map((val, c) => (
                        <g key={`${r}-${c}`} transform={`translate(${c * 46}, ${r * 26})`}>
                          <rect x="0" y="0" width="42" height="22" rx="3" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
                          <text x="21" y="15" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                            {val}
                          </text>
                        </g>
                      ))
                    )}
                  </g>
                  <text x="90" y="112" fill="#34D399" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    shape: (2, 3) • ndim: 2
                  </text>
                </g>

                {/* 3D Tensor */}
                <g transform="translate(580, 40)">
                  <rect x="0" y="0" width="180" height="130" rx="8" fill="#18181B" stroke="#A855F7" strokeWidth="1" />
                  <text x="90" y="24" fill="#D8B4FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    3D: Image Tensor
                  </text>
                  <g transform="translate(45, 45)">
                    {/* Layer 2 (Blue Channel) */}
                    <rect x="16" y="0" width="70" height="40" rx="4" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1" />
                    {/* Layer 1 (Green Channel) */}
                    <rect x="8" y="8" width="70" height="40" rx="4" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
                    {/* Layer 0 (Red Channel) */}
                    <rect x="0" y="16" width="70" height="40" rx="4" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1">
                      <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <text x="35" y="40" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      RGB (H, W, 3)
                    </text>
                  </g>
                  <text x="90" y="112" fill="#C084FC" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    shape: (H, W, 3) • ndim: 3
                  </text>
                </g>

                {/* Lower Section: Interactive Shape Simulator */}
                <g transform="translate(40, 190)">
                  <rect x="0" y="0" width="720" height="140" rx="10" fill="#030712" stroke="#4F46E5" strokeWidth="1" />
                  <text x="20" y="28" fill="#A5B4FC" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    THE SHAPE INVARIANCE THEOREM: Total Elements (size) is strictly conserved
                  </text>
                  <text x="20" y="50" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">
                    An array of size = 12 can be viewed as: (12,) 1D vector = (3, 4) matrix = (2, 6) matrix = (2, 2, 3) tensor
                  </text>

                  <g transform="translate(20, 70)">
                    {[
                      { s: "(12,)", n: "1D (12)", col: "#38BDF8" },
                      { s: "(1, 12)", n: "2D Row", col: "#34D399" },
                      { s: "(12, 1)", n: "2D Col", col: "#FBBF24" },
                      { s: "(3, 4)", n: "2D (3x4)", col: "#A855F7" },
                      { s: "(2, 2, 3)", n: "3D (2x2x3)", col: "#F472B6" },
                    ].map((item, idx) => (
                      <g key={idx} transform={`translate(${idx * 138}, 0)`}>
                        <rect x="0" y="0" width="126" height="48" rx="6" fill="#111827" stroke={item.col} strokeWidth="1.5" />
                        <text x="63" y="20" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          {item.s}
                        </text>
                        <text x="63" y="38" fill={item.col} fontSize="9" textAnchor="middle" fontFamily="monospace">
                          {item.n}
                        </text>
                      </g>
                    ))}
                  </g>
                </g>
              </svg>
            </div>

            {/* Interactive Shape Selector */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-bold text-white text-base">Interactive Shape Transformation Sandbox</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "1d", label: "1D Vector (4,)" },
                    { id: "row", label: "2D Row Matrix (1, 4)" },
                    { id: "col", label: "2D Col Matrix (4, 1)" },
                    { id: "matrix", label: "2D Matrix (3, 4)" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedFormat(btn.id)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                        selectedFormat === btn.id
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-1">Python Creation & Reshape Command:</span>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-emerald-300">
                    {fmt.syntax}
                  </div>
                  <p className="mt-2 text-slate-400">Format Name: <strong className="text-white">{fmt.name}</strong></p>
                </div>

                <div className="space-y-1 text-slate-300">
                  <p>arr.shape : <strong className="text-cyan-300 text-sm">{fmt.shape}</strong></p>
                  <p>arr.ndim  : <strong className="text-indigo-300 text-sm">{fmt.ndim} Dimensions</strong></p>
                  <p>arr.size  : <strong className="text-amber-300 text-sm">{fmt.size} total items</strong></p>
                  <div className={`mt-2 p-2 rounded border text-[11px] ${
                    fmt.scikitLearnValid ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-rose-950/40 border-rose-800 text-rose-300"
                  }`}>
                    {fmt.warning}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB: SHAPE VS NDIM VS SIZE */}
      {activeTab === "shape_vs_ndim" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Dimensional Hierarchy Reference (0D to 4D)</h2>
              <p className="text-xs sm:text-sm text-slate-400">How ndim, shape, and size behave across tensor ranks</p>
            </div>
          </div>

          <div className="space-y-4">
            {HIERARCHY_LEVELS.map((lvl, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono text-sm">{lvl.rank}</span>
                    <span className={`px-2 py-0.5 text-xs font-mono rounded border ${lvl.badge}`}>
                      ndim={lvl.ndim}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{lvl.desc}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-cyan-300">
                    shape: {lvl.shape}
                  </span>
                  <span className="bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-amber-300">
                    size: {lvl.elements}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB: THE SHAPE TRAP */}
      {activeTab === "shape_trap" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">The (N,) vs (1, N) vs (N, 1) Shape Trap</h2>
              <p className="text-xs sm:text-sm text-slate-400">The most common bug encountered by beginners in Python Machine Learning</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/60 text-xs uppercase font-mono text-slate-400">
                  <th className="p-3">Data Format</th>
                  <th className="p-3">Creation / Reshape Syntax</th>
                  <th className="p-3">shape</th>
                  <th className="p-3">ndim</th>
                  <th className="p-3">Role in ML Models</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono text-xs sm:text-sm">
                {SHAPE_COMPARISONS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className={`p-3 font-bold ${row.color}`}>{row.format}</td>
                    <td className="p-3 text-slate-300">{row.syntax}</td>
                    <td className="p-3 text-cyan-300 font-bold">{row.shape}</td>
                    <td className="p-3 text-indigo-300">{row.ndim}</td>
                    <td className="p-3 font-sans text-xs sm:text-sm text-slate-300">{row.mlRole}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB: SLICING SHAPES */}
      {activeTab === "slicing_shapes" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Slicing Syntax & Dimension Collapse</h2>
              <p className="text-xs sm:text-sm text-slate-400">Integer indexing collapses axes; slice ranges preserve 2D shapes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">A. Integer Indexing: arr[0, :]</span>
              <p className="text-sm text-slate-300">
                Passing an integer collapses the row dimension, returning a <strong>1D vector</strong> of shape <code className="text-cyan-300 font-mono">(4,)</code>.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p>mat = np.zeros((3, 4)) # (3, 4)</p>
                <p>row = mat[0, :]        # Extracts Row 0</p>
                <p className="text-rose-400">print(row.shape) # (4,) -&gt; DROPPED TO 1D!</p>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">B. Slice Range: arr[0:1, :]</span>
              <p className="text-sm text-slate-300">
                Passing a range slice preserves the 2D matrix structure, returning a <strong>2D row matrix</strong> of shape <code className="text-emerald-300 font-mono">(1, 4)</code>.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p>mat = np.zeros((3, 4)) # (3, 4)</p>
                <p>row = mat[0:1, :]      # Slice range</p>
                <p className="text-emerald-400">print(row.shape) # (1, 4) -&gt; 2D PRESERVED!</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: EXPAND DIMS & SQUEEZE */}
      {activeTab === "expand_squeeze" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">np.expand_dims() and np.squeeze()</h2>
              <p className="text-xs sm:text-sm text-slate-400">Inserting and removing singleton (length 1) dimensions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-cyan-300 text-base">Expanding Dimensions (<code className="text-white font-mono">np.expand_dims</code>)</h3>
              <p className="text-sm text-slate-300">
                Inserts a new axis of length 1 at the specified index, commonly used to prepare single feature inputs for models.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p>v = np.array([10, 20, 30]) # shape (3,)</p>
                <p>col = np.expand_dims(v, axis=1) # (3, 1)</p>
                <p className="text-cyan-300"># Equivalent: v[:, np.newaxis]</p>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-pink-300 text-base">Squeezing Dimensions (<code className="text-white font-mono">np.squeeze</code>)</h3>
              <p className="text-sm text-slate-300">
                Collapses all singleton axes of size 1, flattening redundant dimensions without copying data.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p>arr = np.zeros((1, 10, 1)) # shape (1, 10, 1)</p>
                <p>flat = np.squeeze(arr)     # shape (10,)</p>
                <p className="text-pink-300"># Squeezed 3D to 1D vector</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: ML VALIDATION */}
      {activeTab === "ml_validation" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Machine Learning Dataset Shape Audit Checklist</h2>
              <p className="text-xs sm:text-sm text-slate-400">Defensive programming rules before calling model.fit()</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <ul className="text-sm text-slate-300 space-y-3 list-disc list-inside">
              <li><strong className="text-white">Feature Matrix X:</strong> Must always have <code className="text-cyan-300 font-mono">X.ndim == 2</code> and shape <code className="text-amber-300 font-mono">(N_samples, N_features)</code>.</li>
              <li><strong className="text-white">Target Labels y:</strong> Must have <code className="text-cyan-300 font-mono">y.ndim == 1</code> and shape <code className="text-amber-300 font-mono">(N_samples,)</code>.</li>
              <li><strong className="text-white">Sample Count Consistency:</strong> <code className="text-indigo-300 font-mono">X.shape[0] == y.shape[0]</code> must always evaluate to True.</li>
            </ul>

            <div className="font-mono text-xs bg-slate-900 p-4 rounded-lg border border-emerald-900/40 text-emerald-300 space-y-1">
              <p className="text-slate-400"># Standard Defensive Audit Function:</p>
              <p>def audit_shapes(X, y):</p>
              <p>{"  assert X.ndim == 2, f'X must be 2D matrix, got shape {X.shape}'"}</p>
              <p>{"  assert y.ndim == 1, f'y must be 1D vector, got shape {y.shape}'"}</p>
              <p>{"  assert X.shape[0] == y.shape[0], 'Sample count mismatch!'"}</p>
              <p>{"  print(f'✔ Audit Passed: X={X.shape}, y={y.shape}')"}</p>
            </div>
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
            <p className="text-xs text-slate-400">Select a script below to inspect shape tuples, (N,) vs (N, 1) vectors, newaxis expansion, or ML batch formatting</p>
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
            <p className="text-xs sm:text-sm text-slate-400">Avoid these frequent shape and dimension errors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 1: Passing (N,) 1D Vector for X</span>
            <p className="text-xs text-slate-300">
              Scikit-learn algorithms throw a ValueError if feature matrix X has shape <code className="text-rose-300 font-mono">(N,)</code>.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># BAD:</span> model.fit(x_1d, y)<br/>
              <span className="text-emerald-400"># CORRECT:</span> model.fit(x_1d.reshape(-1, 1), y)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 2: Axis Collapse in Slicing</span>
            <p className="text-xs text-slate-300">
              Writing <code className="text-rose-300 font-mono">X[0, :]</code> returns a 1D vector instead of a single-sample 2D row.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># 1D:</span> single_row = X[0, :] # shape (p,)<br/>
              <span className="text-emerald-400"># 2D:</span> single_row = X[0:1, :] # shape (1, p)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 3: Reshaping with Incompatible Size</span>
            <p className="text-xs text-slate-300">
              Attempting to reshape a 10-item array into <code className="text-rose-300 font-mono">(3, 4)</code> throws a ValueError.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># CRASH:</span> np.arange(10).reshape(3, 4)<br/>
              <span className="text-emerald-400"># VALID:</span> np.arange(12).reshape(3, 4)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 4: Forgetting keepdims=True</span>
            <p className="text-xs text-slate-300">
              Computing <code className="text-amber-300 font-mono">X.mean(axis=0)</code> drops the dimension, breaking 2D broadcasting in normalization.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># DROPPED:</span> mu = X.mean(axis=0) # shape (p,)<br/>
              <span className="text-emerald-400"># PRESERVED:</span> mu = X.mean(axis=0, keepdims=True) # (1, p)
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
            <p className="text-xs sm:text-sm text-slate-400">Test your mental model of multidimensional shapes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              q: "If an array has shape (5, 4, 3, 2), what is its ndim and size?",
              a: "ndim = 4 (length of shape tuple). size = 5 × 4 × 3 × 2 = 120 total elements.",
            },
            {
              id: 2,
              q: "How does reshape(-1, 2) work on an array with 18 elements?",
              a: "NumPy calculates: 18 / 2 = 9 rows, producing an array of shape (9, 2).",
            },
            {
              id: 3,
              q: "Why does np.squeeze(arr) on shape (1, 5, 1) return shape (5,)?",
              a: "squeeze eliminates all dimensions of length 1, leaving only the dimension of length 5.",
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
          title="NumPy Shape, Size, and Dimensions — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ================================================================= */}
      {/* 7. PLAIN TEXT PRINTABLE NOTE (<PlainTextPrint>) */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="NumPy Array Shape, Size & Dimensions Quick Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note"
          downloadFileName="numpy_shape_size_dimensions_note.txt"
        />
      </section>

      {/* ================================================================= */}
      {/* 8. TEACHER'S NOTE (<Teacher>) */}
      {/* ================================================================= */}
      <Teacher
        note="Whenever students like Abhronila, Swadeep, or Susmita encounter model fitting bugs in our Barrackpore laboratory, my first question is always: 'Did you print X.shape and y.shape?' Remember: Scikit-learn will never accept a 1D vector of shape (N,) as a feature matrix. Always convert it with .reshape(-1, 1) or np.expand_dims(x, axis=1) before training! — Sukanta Hui"
      />

    </div>
  );
};

export default Topic5;

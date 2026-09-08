import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic4_files/01_zeros_and_ones_initialization.py?raw";
import pyCode2 from "./topic4_files/02_arange_vs_linspace_mechanics.py?raw";
import pyCode3 from "./topic4_files/03_empty_and_eye_matrices.py?raw";
import pyCode4 from "./topic4_files/04_ml_coordinate_grid_mesh.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_zeros_and_ones_initialization.py",
    title: "1. Zeros, Ones & Full Initializers",
    badge: "Zeros & Ones",
    code: pyCode1,
    summary: "Demonstrates zero bias vectors, gradient accumulator matrices, sentiment score prior matrices, and _like shape-matching variants.",
  },
  {
    id: "part2",
    fileName: "02_arange_vs_linspace_mechanics.py",
    title: "2. arange vs linspace & Float Pitfalls",
    badge: "Step vs Samples",
    code: pyCode2,
    summary: "Explains step intervals vs sample counts, floating-point accumulation drift in arange, and smooth activation domain curves with linspace.",
  },
  {
    id: "part3",
    fileName: "03_empty_and_eye_matrices.py",
    title: "3. np.empty() Speedup & Identity / Eye Matrices",
    badge: "Empty & Eye",
    code: pyCode3,
    summary: "Demonstrates fast uninitialized buffer allocation with np.empty() and identity matrices for Ridge L2 regularization and One-Hot encoding.",
  },
  {
    id: "part4",
    fileName: "04_ml_coordinate_grid_mesh.py",
    title: "4. ML Decision Boundary Meshgrids",
    badge: "ML Meshgrids",
    code: pyCode4,
    summary: "Generates continuous 2D coordinate test grids using linspace and meshgrid to simulate boundary classifications across thousands of points.",
  },
];

// ─── Function summary cards ──────────────────────────────────────────────────
const FUNCTIONS = [
  {
    fn: "np.zeros(shape, dtype)",
    purpose: "Fills matrix entirely with 0.0",
    example: "np.zeros((3, 4), dtype=np.float32)",
    mlUse: "Weight gradient accumulators, empty buffer allocations",
    color: "border-blue-500/50 bg-blue-950/20 text-blue-300",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  },
  {
    fn: "np.ones(shape, dtype)",
    purpose: "Fills matrix entirely with 1.0",
    example: "np.ones((N_samples, 1))",
    mlUse: "Adding bias/intercept column (x0 = 1) to feature matrix X",
    color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  {
    fn: "np.full(shape, fill_value)",
    purpose: "Fills matrix with arbitrary constant",
    example: "np.full((3, 3), fill_value=5.0)",
    mlUse: "Baseline default predictions, threshold masks",
    color: "border-purple-500/50 bg-purple-950/20 text-purple-300",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  },
  {
    fn: "np.eye(N, M, k)",
    purpose: "Creates 2D Identity matrix (1s on diagonal)",
    example: "np.eye(p, dtype=np.float64)",
    mlUse: "Ridge Regression (L2) regularizer (X^T X + λI)^(-1)",
    color: "border-amber-500/50 bg-amber-950/20 text-amber-300",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
  {
    fn: "np.arange(start, stop, step)",
    purpose: "Step-based numeric sequence (stop exclusive)",
    example: "np.arange(0, 10, 2)",
    mlUse: "Epoch counters, discrete index ranges, iteration steps",
    color: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  },
  {
    fn: "np.linspace(start, stop, num)",
    purpose: "Count-based evenly spaced points (stop inclusive)",
    example: "np.linspace(-5.0, 5.0, 100)",
    mlUse: "Continuous loss curve plotting, decision boundary grids",
    color: "border-pink-500/50 bg-pink-950/20 text-pink-300",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",
  },
];

// ─── arange vs linspace comparison table ─────────────────────────────────────
const COMPARISON_ROWS = [
  {
    aspect: "Primary Parameter",
    arange: "Step Size (step): e.g. step=0.5",
    linspace: "Total Point Count (num): e.g. num=100",
  },
  {
    aspect: "Stop Value Treatment",
    arange: "Strictly EXCLUSIVE (stops before stop)",
    linspace: "Strictly INCLUSIVE by default (endpoint=True)",
  },
  {
    aspect: "Floating-Point Safety",
    arange: "⚠️ Rounding accumulation can cause missing/extra elements",
    linspace: "✔ Mathematically exact endpoint and division: (stop-start)/(num-1)",
  },
  {
    aspect: "Best Use Case",
    arange: "Discrete integer iteration (e.g. batch slices 0, 32, 64...)",
    linspace: "Smooth mathematical curves, plotting functions & test meshes",
  },
  {
    aspect: "Returns Step Size?",
    arange: "No",
    linspace: "Yes, via retstep=True (returns tuple: array, step)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
const Topic4 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeHint, setActiveHint] = useState(null);
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive generator sandbox state
  const [selectedFunction, setSelectedFunction] = useState("zeros");
  const [gridRows, setGridRows] = useState(3);
  const [gridCols, setGridCols] = useState(4);
  const [linStart, setLinStart] = useState(0);
  const [linStop, setLinStop] = useState(10);
  const [linCount, setLinCount] = useState(5);

  const tabs = [
    { id: "overview", label: "Overview & Sandbox" },
    { id: "initializers", label: "zeros & ones Initializers" },
    { id: "arange_vs_linspace", label: "arange vs linspace" },
    { id: "full_empty_eye", label: "full, empty & eye" },
    { id: "cloning", label: "Template Cloning (_like)" },
    { id: "ml_uses", label: "ML Initialization Use-Cases" },
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">

      {/* ================================================================= */}
      {/* 1. HEADER SECTION */}
      {/* ================================================================= */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Segment 9 • Module 1 • Topic 4
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Array Generators
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Built-in Functions
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Built-in Array Creation: <code className="text-cyan-400 font-mono">np.zeros</code>, <code className="text-emerald-400 font-mono">np.ones</code>, <code className="text-amber-400 font-mono">np.arange</code>, <code className="text-pink-400 font-mono">np.linspace</code>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            NumPy provides high-speed built-in array generator functions that instantiate structured memory directly in C without passing Python sequences.
            Click any tab below to explore continuous mathematical sequences, bias column insertions, weight matrix initialization, and identity matrices.
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

      {/* TAB: OVERVIEW & SANDBOX */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Conceptual Overview */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
                01
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Generator Functions Overview & Purpose</h2>
                <p className="text-xs sm:text-sm text-slate-400">Why specialized array initializers are essential in Machine Learning</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <h3 className="font-bold text-cyan-300 text-base">What are Built-in Initializers?</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Built-in creation functions (<code className="text-cyan-300 font-mono">zeros</code>, <code className="text-emerald-300 font-mono">ones</code>, <code className="text-amber-300 font-mono">arange</code>, <code className="text-pink-300 font-mono">linspace</code>, <code className="text-purple-300 font-mono">eye</code>) allocate ndarrays of specified dimensions and contents without requiring existing data.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Direct C-level allocation bypassing Python sequence translation</li>
                  <li>Generates exact mathematical intervals, constants, or diagonal matrices</li>
                  <li>Supports arbitrary N-dimensional shape tuples</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h3 className="font-bold text-emerald-300 text-base">Why Use Them Instead of Python Loops?</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Creating large arrays using Python syntax like <code className="text-rose-300 font-mono">[0.0] * 1000000</code> or <code className="text-rose-300 font-mono">[i * 0.1 for i in range(100)]</code> is both slow and prone to precision loss.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li><strong className="text-white">OS Speed:</strong> <code className="text-emerald-300">np.zeros()</code> invokes C <code className="text-slate-200">calloc()</code> for instant zero-page mapping</li>
                  <li><strong className="text-white">Endpoint Accuracy:</strong> <code className="text-pink-300">np.linspace()</code> computes exact non-accumulating mathematical steps</li>
                  <li><strong className="text-white">Zero Fragmentation:</strong> Allocates a single solid memory block immediately</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SVG Diagram & Interactive Sandbox */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
                02
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Visual Structure & Generator Sandbox</h2>
                <p className="text-xs sm:text-sm text-slate-400">Compare how zeros, ones, identity matrices, and linspace coordinate grids are laid out</p>
              </div>
            </div>

            {/* SVG Matrix Comparison Diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                className="w-full max-w-3xl h-auto"
                viewBox="0 0 800 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="360" rx="16" fill="#0B1120" />

                {/* Box 1: np.zeros((3, 3)) */}
                <g transform="translate(40, 30)">
                  <rect x="0" y="0" width="210" height="150" rx="10" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
                  <text x="15" y="24" fill="#93C5FD" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    np.zeros((3, 3))
                  </text>
                  <text x="15" y="40" fill="#64748B" fontSize="10" fontFamily="sans-serif">
                    Weight initialization / buffer
                  </text>

                  {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => (
                      <g key={`${r}-${c}`} transform={`translate(${20 + c * 56}, ${52 + r * 28})`}>
                        <rect x="0" y="0" width="50" height="24" rx="4" fill="#1E293B" stroke="#3B82F6" strokeWidth="1">
                          <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
                        </rect>
                        <text x="25" y="16" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          0.0
                        </text>
                      </g>
                    ))
                  )}
                </g>

                {/* Box 2: np.ones((3, 3)) */}
                <g transform="translate(295, 30)">
                  <rect x="0" y="0" width="210" height="150" rx="10" fill="#064E3B" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
                  <text x="15" y="24" fill="#6EE7B7" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    np.ones((3, 3))
                  </text>
                  <text x="15" y="40" fill="#64748B" fontSize="10" fontFamily="sans-serif">
                    Bias column / mask filter
                  </text>

                  {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => (
                      <g key={`${r}-${c}`} transform={`translate(${20 + c * 56}, ${52 + r * 28})`}>
                        <rect x="0" y="0" width="50" height="24" rx="4" fill="#064E3B" stroke="#34D399" strokeWidth="1">
                          <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
                        </rect>
                        <text x="25" y="16" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          1.0
                        </text>
                      </g>
                    ))
                  )}
                </g>

                {/* Box 3: np.eye(3) */}
                <g transform="translate(550, 30)">
                  <rect x="0" y="0" width="210" height="150" rx="10" fill="#78350F" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="15" y="24" fill="#FDE68A" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    np.eye(3)
                  </text>
                  <text x="15" y="40" fill="#64748B" fontSize="10" fontFamily="sans-serif">
                    Identity matrix / Ridge L2
                  </text>

                  {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => {
                      const isDiag = r === c;
                      return (
                        <g key={`${r}-${c}`} transform={`translate(${20 + c * 56}, ${52 + r * 28})`}>
                          <rect
                            x="0"
                            y="0"
                            width="50"
                            height="24"
                            rx="4"
                            fill={isDiag ? "#78350F" : "#1E293B"}
                            stroke={isDiag ? "#F59E0B" : "#475569"}
                            strokeWidth={isDiag ? "1.5" : "1"}
                          >
                            {isDiag && (
                              <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
                            )}
                          </rect>
                          <text
                            x="25"
                            y="16"
                            fill={isDiag ? "#FBBF24" : "#94A3B8"}
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {isDiag ? "1.0" : "0.0"}
                          </text>
                        </g>
                      );
                    })
                  )}
                </g>

                {/* Lower Section */}
                <g transform="translate(40, 210)">
                  <rect x="0" y="0" width="720" height="120" rx="10" fill="#18181B" stroke="#6366F1" strokeWidth="1" />
                  <text x="20" y="25" fill="#A5B4FC" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    SEQUENCE COMPARISON: np.arange(0, 10, 2) vs np.linspace(0, 10, 5)
                  </text>

                  {/* arange line */}
                  <g transform="translate(20, 45)">
                    <text x="0" y="12" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      arange (step=2, exclusive stop):
                    </text>
                    <line x1="220" y1="8" x2="680" y2="8" stroke="#334155" strokeWidth="2" />
                    {[0, 2, 4, 6, 8].map((val, idx) => {
                      const x = 220 + (val / 10) * 460;
                      return (
                        <g key={idx}>
                          <circle cx={x} cy="8" r="4" fill="#38BDF8" />
                          <text x={x} y="24" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                            {val}
                          </text>
                        </g>
                      );
                    })}
                    <circle cx={680} cy="8" r="4" fill="#EF4444" stroke="#7F1D1D" />
                    <text x="680" y="24" fill="#EF4444" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      10 ✗
                    </text>
                  </g>

                  {/* linspace line */}
                  <g transform="translate(20, 80)">
                    <text x="0" y="12" fill="#EC4899" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      linspace (num=5, inclusive stop):
                    </text>
                    <line x1="220" y1="8" x2="680" y2="8" stroke="#334155" strokeWidth="2" />
                    {[0.0, 2.5, 5.0, 7.5, 10.0].map((val, idx) => {
                      const x = 220 + (val / 10.0) * 460;
                      return (
                        <g key={idx}>
                          <circle cx={x} cy="8" r="4" fill="#EC4899" />
                          <text x={x} y="24" fill="#F472B6" fontSize="9" textAnchor="middle" fontFamily="monospace">
                            {val.toFixed(1)}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </g>
              </svg>
            </div>

            {/* Interactive Generator Sandbox */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">Interactive Generator Sandbox</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
                  Live Python Code Generator
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: "zeros", label: "np.zeros()" },
                  { id: "ones", label: "np.ones()" },
                  { id: "eye", label: "np.eye()" },
                  { id: "linspace", label: "np.linspace()" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFunction(item.id)}
                    className={`p-2.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedFunction === item.id
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                        : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Controls based on selected function */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                {selectedFunction === "zeros" || selectedFunction === "ones" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-slate-400">Rows (Dimension 0):</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={gridRows}
                        onChange={(e) => setGridRows(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Columns (Dimension 1):</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={gridCols}
                        onChange={(e) => setGridCols(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Data Type (dtype):</label>
                      <div className="p-2 bg-slate-900 border border-slate-700 rounded text-cyan-300">
                        np.float32 (4 bytes)
                      </div>
                    </div>
                  </>
                ) : selectedFunction === "eye" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-slate-400">Matrix Dimension N (N×N):</label>
                      <input
                        type="number"
                        min="2"
                        max="6"
                        value={gridRows}
                        onChange={(e) => setGridRows(Math.max(2, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">ML Use Context:</label>
                      <div className="p-2 bg-slate-900 border border-slate-700 rounded text-amber-300">
                        Ridge L2 Regularization (λI)
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Result Shape:</label>
                      <div className="p-2 bg-slate-900 border border-slate-700 rounded text-emerald-300">
                        ({gridRows}, {gridRows}) Square Matrix
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-slate-400">Start Value (start):</label>
                      <input
                        type="number"
                        value={linStart}
                        onChange={(e) => setLinStart(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Stop Value (stop):</label>
                      <input
                        type="number"
                        value={linStop}
                        onChange={(e) => setLinStop(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Sample Count (num):</label>
                      <input
                        type="number"
                        min="2"
                        max="10"
                        value={linCount}
                        onChange={(e) => setLinCount(Math.max(2, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Generated Code & Output Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-1">Generated NumPy Code:</span>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-emerald-300">
                    {selectedFunction === "zeros" && `arr = np.zeros((${gridRows}, ${gridCols}), dtype=np.float32)`}
                    {selectedFunction === "ones" && `arr = np.ones((${gridRows}, ${gridCols}), dtype=np.float32)`}
                    {selectedFunction === "eye" && `arr = np.eye(${gridRows}, dtype=np.float64)`}
                    {selectedFunction === "linspace" && `arr, step = np.linspace(${linStart}, ${linStop}, num=${linCount}, retstep=True)`}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Array Metadata:</span>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-300 space-y-1">
                    {selectedFunction === "zeros" || selectedFunction === "ones" ? (
                      <>
                        <p>Shape: <strong className="text-cyan-300">({gridRows}, {gridCols})</strong></p>
                        <p>Total Size: <strong className="text-amber-300">{gridRows * gridCols}</strong> elements</p>
                        <p>RAM Footprint: <strong className="text-emerald-300">{gridRows * gridCols * 4} Bytes</strong></p>
                      </>
                    ) : selectedFunction === "eye" ? (
                      <>
                        <p>Shape: <strong className="text-cyan-300">({gridRows}, {gridRows})</strong></p>
                        <p>Non-zero 1s on diagonal: <strong className="text-amber-300">{gridRows}</strong></p>
                        <p>RAM Footprint: <strong className="text-emerald-300">{gridRows * gridRows * 8} Bytes</strong></p>
                      </>
                    ) : (
                      <>
                        <p>Generated Elements: <strong className="text-pink-300">{linCount} points</strong></p>
                        <p>Computed Step Size: <strong className="text-cyan-300">{((linStop - linStart) / (linCount - 1)).toFixed(3)}</strong></p>
                        <p>Includes Endpoints: <strong className="text-emerald-300">[{linStart} ... {linStop}]</strong></p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB: INITIALIZERS */}
      {activeTab === "initializers" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">np.zeros() and np.ones() Deep Dive</h2>
              <p className="text-xs sm:text-sm text-slate-400">Zero-filled buffers and augmented bias column construction</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-blue-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">1. np.zeros(shape, dtype=float64)</span>
              <p className="text-sm text-slate-300">
                Instantly requests zero-initialized memory pages via C <code className="text-indigo-300 font-mono">calloc()</code>.
                Use it when initializing weight gradient accumulators or neural network placeholder layers.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p># 3D Tensor for video batch (16 frames, 224x224, 3 channels)</p>
                <p className="text-blue-300">video_batch = np.zeros((16, 224, 224, 3), dtype=np.float32)</p>
                <p className="text-slate-400"># Total size: 2,408,448 float32s = ~9.63 MB</p>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. np.ones(shape, dtype=float64)</span>
              <p className="text-sm text-slate-300">
                Allocates memory and fills every element with 1.0. Crucial for linear models where the intercept <code className="text-amber-300 font-mono">β0</code> requires an augmented column of 1s in feature matrix X.
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p># Augmenting X with bias feature x0</p>
                <p>X_raw = np.array([[2.5, 50], [3.8, 80]]) # (2, 2)</p>
                <p>x0_col = np.ones((X_raw.shape[0], 1))   # (2, 1)</p>
                <p className="text-emerald-300">X_aug = np.hstack([x0_col, X_raw])    # (2, 3)</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: ARANGE VS LINSPACE */}
      {activeTab === "arange_vs_linspace" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">np.arange() vs np.linspace() Architectural Comparison</h2>
              <p className="text-xs sm:text-sm text-slate-400">Step-based discrete ranges versus count-based continuous coordinates</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/60 text-xs uppercase font-mono text-slate-400">
                  <th className="p-3">Comparison Metric</th>
                  <th className="p-3 text-cyan-300">np.arange(start, stop, step)</th>
                  <th className="p-3 text-pink-300">np.linspace(start, stop, num)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white font-mono">{row.aspect}</td>
                    <td className="p-3 text-slate-300">{row.arange}</td>
                    <td className="p-3 text-slate-200">{row.linspace}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB: FULL, EMPTY & EYE */}
      {activeTab === "full_empty_eye" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">np.full(), np.empty(), and np.eye()</h2>
              <p className="text-xs sm:text-sm text-slate-400">Constant initializers, fast uninitialized buffers, and linear algebra matrices</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/40 space-y-2">
              <span className="font-bold text-purple-300 font-mono text-xs">np.full(shape, fill_value)</span>
              <p className="text-xs text-slate-300">
                Initializes all elements to a custom constant (e.g. baseline -1 or 99).
              </p>
              <div className="font-mono text-[11px] bg-slate-900 p-2 rounded text-slate-300">
                arr = np.full((3, 3), -1, dtype=np.int8)
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 space-y-2">
              <span className="font-bold text-rose-300 font-mono text-xs">np.empty(shape, dtype)</span>
              <p className="text-xs text-slate-300">
                Allocates memory without zeroing bytes. Fastest raw allocation, but contains RAM garbage!
              </p>
              <div className="font-mono text-[11px] bg-slate-900 p-2 rounded text-rose-400">
                # Must overwrite before reading!<br/>
                arr = np.empty((1000, 1000))
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-2">
              <span className="font-bold text-amber-300 font-mono text-xs">np.eye(N, M, k)</span>
              <p className="text-xs text-slate-300">
                Identity matrix with 1s on main diagonal (k=0) or shifted diagonal.
              </p>
              <div className="font-mono text-[11px] bg-slate-900 p-2 rounded text-amber-300">
                I = np.eye(4) # 4x4 Identity
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: CLONING */}
      {activeTab === "cloning" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Template Cloning with <code className="text-indigo-300 font-mono">_like</code> Functions</h2>
              <p className="text-xs sm:text-sm text-slate-400">Cloning shape, dtype, and memory flags from reference arrays</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <p className="text-sm text-slate-300">
              When working with complex model pipelines, you frequently need a placeholder array matching an existing tensor's shape and dtype.
              Using <code className="text-cyan-300 font-mono">np.zeros_like()</code>, <code className="text-emerald-300 font-mono">np.ones_like()</code>, or <code className="text-purple-300 font-mono">np.full_like()</code> avoids writing boilerplate:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400"># Verbose manual method:</span>
                <p>grad = np.zeros(weights.shape, dtype=weights.dtype, order='C')</p>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-emerald-900/50 space-y-1">
                <span className="text-emerald-400"># Idiomatic template cloning:</span>
                <p>grad = np.zeros_like(weights)</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: ML USES */}
      {activeTab === "ml_uses" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Concrete Machine Learning Applications</h2>
              <p className="text-xs sm:text-sm text-slate-400">Where each function fits inside practical ML algorithms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FUNCTIONS.map((fn, i) => (
              <div key={i} className={`p-5 rounded-xl border ${fn.color} space-y-2`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white font-mono text-sm">{fn.fn}</h3>
                </div>
                <div className="font-mono text-xs bg-slate-950 p-2 rounded border border-slate-800 text-slate-200">
                  {fn.example}
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-100">Purpose:</strong> {fn.purpose}
                </p>
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-200">ML Pipeline Role:</strong> {fn.mlUse}
                </p>
              </div>
            ))}
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
            <p className="text-xs text-slate-400">Select a script below to inspect zeros/ones initialization, arange vs linspace, empty/eye matrices, or ML meshgrids</p>
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
            <p className="text-xs sm:text-sm text-slate-400">Avoid these frequent initialisation mistakes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 1: Missing Shape Tuple Parentheses</span>
            <p className="text-xs text-slate-300">
              Writing <code className="text-rose-300 font-mono">np.zeros(3, 4)</code> treats 4 as the dtype parameter, raising a TypeError.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># WRONG:</span> np.zeros(3, 4)<br/>
              <span className="text-emerald-400"># CORRECT:</span> np.zeros((3, 4))
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 2: Accumulating on np.empty()</span>
            <p className="text-xs text-slate-300">
              Performing <code className="text-rose-300 font-mono">arr += x</code> on an uninitialized <code className="text-slate-200">empty()</code> buffer corrupts your sum with RAM garbage.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># CORRUPTED:</span> acc = np.empty((3, 3)); acc += grad<br/>
              <span className="text-emerald-400"># SAFE:</span> acc = np.zeros((3, 3)); acc += grad
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 3: Floating Steps in np.arange()</span>
            <p className="text-xs text-slate-300">
              Floating point rounding errors in <code className="text-amber-300 font-mono">np.arange(0, 0.3, 0.1)</code> can unpredictably exclude the last point.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># UNSTABLE:</span> np.arange(0.0, 1.0, 0.1)<br/>
              <span className="text-emerald-400"># STABLE:</span> np.linspace(0.0, 1.0, 11)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 4: Unnecessary float64 Memory Allocation</span>
            <p className="text-xs text-slate-300">
              Defaulting to <code className="text-amber-300 font-mono">float64</code> for neural networks doubles GPU VRAM usage without training gain.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-amber-400"># 8 Bytes:</span> np.zeros((1000, 1000)) # 8.0 MB<br/>
              <span className="text-emerald-400"># 4 Bytes:</span> np.zeros((1000, 1000), dtype=np.float32) # 4.0 MB
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
            <p className="text-xs sm:text-sm text-slate-400">Test your mental model of array generator functions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              q: "How many points does np.linspace(0, 10, 5) return, and what are they?",
              a: "5 points: [0.0, 2.5, 5.0, 7.5, 10.0]. The step size is (10 - 0) / (5 - 1) = 2.5.",
            },
            {
              id: 2,
              q: "Why is np.eye() used in Ridge Regression normal equations?",
              a: "It adds λ * I to X^T X, ensuring the matrix is strictly non-singular (invertible) and shrinking collinear feature weights.",
            },
            {
              id: 3,
              q: "What is the difference between np.logspace(-3, 0, 4) and np.geomspace(0.001, 1, 4)?",
              a: "They produce the exact same array [0.001, 0.01, 0.1, 1.0]. logspace takes exponents; geomspace takes actual boundary numbers.",
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
          title="NumPy Array Creation Functions — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ================================================================= */}
      {/* 7. PLAIN TEXT PRINTABLE NOTE (<PlainTextPrint>) */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="NumPy Array Creation Functions Quick Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="numpy_array_creation_functions_note.txt"
        />
      </section>

      {/* ================================================================= */}
      {/* 8. TEACHER'S NOTE (<Teacher>) */}
      {/* ================================================================= */}
      <Teacher
        note="In our Barrackpore machine learning labs, students like Susmita and Mahima frequently ask whether to use np.arange or np.linspace when plotting loss functions and decision boundaries. My golden rule: if you want exact step counts or smooth plots, always choose np.linspace! And remember to use np.ones() whenever you need to add an intercept column x0 to your feature matrix X. — Sukanta Hui"
      />

    </div>
  );
};

export default Topic4;

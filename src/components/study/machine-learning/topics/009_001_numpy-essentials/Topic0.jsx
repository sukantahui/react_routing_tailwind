import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic0_files/01_speed_benchmark_python_vs_numpy.py?raw";
import pyCode2 from "./topic0_files/02_numpy_dtypes_and_memory.py?raw";
import pyCode3 from "./topic0_files/03_numpy_in_ml_pipeline.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_speed_benchmark_python_vs_numpy.py",
    title: "1. Speed Benchmark: Python vs NumPy",
    badge: "50x-100x Speedup",
    code: pyCode1,
    summary: "Benchmarks 1,000,000 element multiplication to demonstrate C-speed and CPU SIMD acceleration over pure Python list comprehensions.",
  },
  {
    id: "part2",
    fileName: "02_numpy_dtypes_and_memory.py",
    title: "2. Data Types & Memory Footprint",
    badge: "Memory & dtypes",
    code: pyCode2,
    summary: "Explores int8/32/64 and float32/64 precision, byte sizes, and shows how float32 saves 50% RAM in deep learning models.",
  },
  {
    id: "part3",
    fileName: "03_numpy_in_ml_pipeline.py",
    title: "3. NumPy in the Machine Learning Pipeline",
    badge: "ML Data Prep",
    code: pyCode3,
    summary: "End-to-end ML data preparation: converting raw marks, Min-Max feature normalization, and formatting 2D matrix X and 1D label vector y.",
  },
];

// ─── Speed benchmark data ───────────────────────────────────────────────────
const BENCHMARK_ROWS = [
  { label: "Python list (1M elements)", time: "~195 ms", bar: 100, color: "bg-rose-500" },
  { label: "NumPy array (1M elements)", time: "~2 ms",   bar: 1,   color: "bg-emerald-500" },
];

// ─── Ecosystem nodes ─────────────────────────────────────────────────────────
const ECOSYSTEM = [
  { name: "Pandas",      color: "border-amber-500/60  text-amber-300",  bg: "bg-amber-500/10"  },
  { name: "Scikit-learn",color: "border-orange-500/60 text-orange-300", bg: "bg-orange-500/10" },
  { name: "TensorFlow",  color: "border-cyan-500/60   text-cyan-300",   bg: "bg-cyan-500/10"   },
  { name: "SciPy",       color: "border-purple-500/60 text-purple-300", bg: "bg-purple-500/10" },
  { name: "Matplotlib",  color: "border-pink-500/60   text-pink-300",   bg: "bg-pink-500/10"   },
  { name: "PyTorch",     color: "border-rose-500/60   text-rose-300",   bg: "bg-rose-500/10"   },
];

// ─── dtypes table ────────────────────────────────────────────────────────────
const DTYPES = [
  { name: "np.int8",    bytes: 1, range: "−128 to 127",        use: "Tiny integer labels" },
  { name: "np.int32",   bytes: 4, range: "−2.1B to 2.1B",      use: "Index arrays" },
  { name: "np.int64",   bytes: 8, range: "Very large integer",  use: "Default integers" },
  { name: "np.float32", bytes: 4, range: "7 decimal digits",    use: "Deep learning (GPU)" },
  { name: "np.float64", bytes: 8, range: "15 decimal digits",   use: "Default floats (ML)" },
  { name: "np.bool_",   bytes: 1, range: "True / False",        use: "Boolean masks" },
];

// ─── ML pipeline steps ───────────────────────────────────────────────────────
const PIPELINE = [
  { step: "1", label: "Raw Data",         detail: "CSV, database, sensors",            color: "bg-slate-700" },
  { step: "2", label: "Pandas DataFrame", detail: "Labeled rows and columns",          color: "bg-amber-600" },
  { step: "3", label: ".values / np.array()", detail: "Convert to NumPy ndarray",     color: "bg-blue-600"  },
  { step: "4", label: "NumPy ndarray",    detail: "Feature matrix X, target y",       color: "bg-indigo-600"},
  { step: "5", label: "ML Model",         detail: "Scikit-learn / TensorFlow input",   color: "bg-emerald-600"},
];

// ─────────────────────────────────────────────────────────────────────────────
const Topic0 = () => {
  const [activeSection, setActiveSection] = useState("why");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const tabs = [
    { id: "why",      label: "Why NumPy?" },
    { id: "what",     label: "What is ndarray?" },
    { id: "where",    label: "Where is it used?" },
    { id: "dtypes",   label: "Data Types" },
    { id: "pipeline", label: "ML Pipeline" },
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">

      {/* ================================================================= */}
      {/* HEADER */}
      {/* ================================================================= */}
      <header className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 rounded-2xl border border-blue-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
              BCAC701B • Segment 9 • Module 1 • Topic 0
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              Foundational
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Easy
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Introduction to NumPy
          </h1>

          {/* Summary */}
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            NumPy (Numerical Python) is the backbone of data science and machine learning in Python.
            Understand why it exists, what makes it dramatically faster than Python lists, and how it
            sits at the core of every ML pipeline you will ever build.
          </p>

          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400"
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
      {/* TAB CONTENT */}
      {/* ================================================================= */}

      {/* WHY NUMPY */}
      {activeSection === "why" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Why Does NumPy Exist?</h2>
              <p className="text-xs sm:text-sm text-slate-400">The problem with Python lists for numerical computing</p>
            </div>
          </div>

          {/* Problem statement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3 hover:border-rose-500/50 transition-all duration-300">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">Python List — The Problem</span>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                <li>Stores <strong className="text-white">pointers to Python objects</strong>, not raw numbers</li>
                <li>Each element has type info, reference count overhead</li>
                <li>Memory is <strong className="text-white">fragmented</strong> — elements scattered in RAM</li>
                <li>Cannot use CPU SIMD (parallel math) instructions</li>
                <li>Every loop iteration goes through the Python interpreter</li>
              </ul>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-rose-300">
                # Slow: Python loop over 1 million elements<br/>
                result = [x * 2 for x in py_list]  # ~195 ms
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3 hover:border-emerald-500/50 transition-all duration-300">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">NumPy Array — The Solution</span>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                <li>Stores raw numbers in <strong className="text-white">contiguous C memory</strong></li>
                <li>All elements share the <strong className="text-white">same dtype</strong> (e.g., float64)</li>
                <li>CPU cache prefetcher loads data ahead of time</li>
                <li>SIMD instructions process multiple elements per clock cycle</li>
                <li>No Python interpreter overhead for math operations</li>
              </ul>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-emerald-300">
                # Fast: vectorized NumPy operation<br/>
                result = np_array * 2  # ~2 ms (100× faster!)
              </div>
            </div>
          </div>

          {/* Speed benchmark visual */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Speed Benchmark: 1,000,000 Element Multiplication</h3>
            <div className="space-y-3">
              {BENCHMARK_ROWS.map((row) => (
                <div key={row.label} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>{row.label}</span>
                    <span className="font-mono font-bold text-white">{row.time}</span>
                  </div>
                  <div className="h-5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${row.color} rounded-full transition-all duration-700`}
                      style={{ width: `${row.bar}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 italic">
              NumPy is typically <span className="text-emerald-400 font-bold">10× to 100×</span> faster than
              equivalent Python loops — essential for ML training on large datasets.
            </p>
          </div>

          {/* Historical context */}
          <div className="bg-gradient-to-r from-slate-950 to-indigo-950/40 p-5 rounded-xl border border-indigo-800/30 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">Brief History</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { year: "1995", event: "Numeric created by Jim Hugunin" },
                { year: "2001", event: "SciPy built on Numeric" },
                { year: "2005", event: "NumPy created by Travis Oliphant" },
                { year: "2006", event: "NumPy 1.0 officially released" },
              ].map((h) => (
                <div key={h.year} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-indigo-400 font-bold font-mono">{h.year}</div>
                  <div className="text-slate-300">{h.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT IS NDARRAY */}
      {activeSection === "what" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">What is the ndarray?</h2>
              <p className="text-xs sm:text-sm text-slate-400">The N-dimensional array — NumPy's core object</p>
            </div>
          </div>

          {/* ndarray SVG diagram */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 overflow-x-auto">
            <h3 className="text-sm font-bold text-white mb-4">ndarray Memory Layout (1D, 2D, 3D)</h3>
            <svg viewBox="0 0 700 200" className="w-full max-w-2xl mx-auto" aria-label="ndarray memory layout diagram">
              {/* 1D array */}
              <text x="10" y="25" fill="#94a3b8" fontSize="11" fontFamily="monospace">1D  shape=(5,)</text>
              {[10,70,130,190,250].map((x, i) => (
                <g key={i}>
                  <rect x={x} y={32} width={52} height={30} rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x={x+26} y={52} textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="monospace">{(i+1)*10}</text>
                </g>
              ))}
              {/* stride arrows */}
              <text x="310" y="52" fill="#64748b" fontSize="10" fontFamily="monospace">← stride: 8 bytes →</text>

              {/* 2D array */}
              <text x="10" y="100" fill="#94a3b8" fontSize="11" fontFamily="monospace">2D  shape=(2,3)</text>
              {[[0,1,2],[3,4,5]].map((row, r) =>
                row.map((val, c) => (
                  <g key={`${r}${c}`}>
                    <rect x={10 + c*62} y={107 + r*35} width={55} height={28} rx="4"
                      fill={r===0?"#1e3a5f":"#14304d"} stroke="#6366f1" strokeWidth="1.5"/>
                    <text x={37+c*62} y={126+r*35} textAnchor="middle" fill="#a5b4fc" fontSize="11" fontFamily="monospace">
                      [{r},{c}]
                    </text>
                  </g>
                ))
              )}
              <text x="210" y="130" fill="#64748b" fontSize="10" fontFamily="monospace">axis=0 ↓   axis=1 →</text>

              {/* 3D box illustration */}
              <text x="430" y="25" fill="#94a3b8" fontSize="11" fontFamily="monospace">3D  shape=(2,3,4)</text>
              {/* simplified 3D box */}
              <rect x="430" y="35" width="100" height="70" rx="4" fill="#1a2744" stroke="#22d3ee" strokeWidth="1.5"/>
              <rect x="450" y="25" width="100" height="70" rx="4" fill="#162035" stroke="#22d3ee" strokeWidth="1"/>
              <line x1="430" y1="35" x2="450" y2="25" stroke="#22d3ee" strokeWidth="1"/>
              <line x1="530" y1="35" x2="550" y2="25" stroke="#22d3ee" strokeWidth="1"/>
              <line x1="430" y1="105" x2="450" y2="95" stroke="#22d3ee" strokeWidth="1"/>
              <line x1="530" y1="105" x2="550" y2="95" stroke="#22d3ee" strokeWidth="1"/>
              <text x="475" y="75" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace">depth</text>
              <text x="475" y="88" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace">axis=0</text>
              <text x="590" y="130" fill="#94a3b8" fontSize="10" fontFamily="monospace">e.g., video</text>
              <text x="590" y="143" fill="#94a3b8" fontSize="10" fontFamily="monospace">frames ×</text>
              <text x="590" y="156" fill="#94a3b8" fontSize="10" fontFamily="monospace">H × W</text>

              {/* Label: axis */}
              <text x="10" y="190" fill="#475569" fontSize="10" fontFamily="monospace">
                Each dimension = one axis. shape describes sizes along each axis.
              </text>
            </svg>
          </div>

          {/* Key attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { attr: ".shape",    desc: "Tuple of dimension sizes",             eg: "(150, 4)" },
              { attr: ".dtype",    desc: "Data type of all elements",            eg: "float64" },
              { attr: ".ndim",     desc: "Number of dimensions (axes)",          eg: "2" },
              { attr: ".size",     desc: "Total number of elements",             eg: "600" },
              { attr: ".itemsize", desc: "Bytes per element",                    eg: "8" },
              { attr: ".nbytes",   desc: "Total memory in bytes",                eg: "4800" },
            ].map((a) => (
              <div key={a.attr} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-indigo-700/50 transition-all duration-300 space-y-1">
                <div className="font-mono text-indigo-400 font-bold text-sm">arr{a.attr}</div>
                <div className="text-xs text-slate-300">{a.desc}</div>
                <div className="font-mono text-xs text-emerald-400">→ {a.eg}</div>
              </div>
            ))}
          </div>

          {/* Key vocabulary */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">Key Vocabulary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                ["axis",       "A single dimension of the array"],
                ["shape",      "A tuple like (rows, cols) describing array size"],
                ["dtype",      "Data type shared by all elements (float64, etc.)"],
                ["stride",     "Bytes to skip to move one step along an axis"],
                ["view",       "A slice that shares the original memory (no copy)"],
                ["vectorize",  "Apply an operation to every element without a loop"],
              ].map(([term, def]) => (
                <div key={term} className="flex gap-2">
                  <span className="text-cyan-400 font-mono font-bold shrink-0">{term}</span>
                  <span className="text-slate-300">{def}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHERE IS NUMPY USED */}
      {activeSection === "where" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Where is NumPy Used?</h2>
              <p className="text-xs sm:text-sm text-slate-400">NumPy powers the entire Python scientific computing ecosystem</p>
            </div>
          </div>

          {/* Ecosystem map */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-blue-600/20 border-2 border-blue-500 rounded-xl text-blue-300 font-bold text-base">
                🔢 NumPy (ndarray)
              </div>
              <div className="text-xs text-slate-400 mt-1">The Foundation</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0.5 h-8 bg-slate-700" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ECOSYSTEM.map((lib) => (
                <div key={lib.name} className={`p-3 rounded-xl border ${lib.color} ${lib.bg} text-center text-sm font-semibold transition-all duration-300 hover:scale-105`}>
                  {lib.name}
                </div>
              ))}
            </div>
          </div>

          {/* Real-world array shapes */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-800 bg-slate-950 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-3 border-r border-slate-800 text-left">Domain</th>
                  <th className="p-3 border-r border-slate-800 text-left">Data</th>
                  <th className="p-3 border-r border-slate-800 text-left">Array Shape</th>
                  <th className="p-3 text-left">dtype</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {[
                  ["Computer Vision",  "MNIST digit image",     "(28, 28)",        "float32"],
                  ["Computer Vision",  "MNIST full dataset",    "(60000, 28, 28)", "float32"],
                  ["Tabular ML",       "Iris features (X)",     "(150, 4)",        "float64"],
                  ["NLP",              "Word embedding matrix", "(50000, 300)",    "float32"],
                  ["Audio",            "1 second of audio",     "(44100,)",        "float32"],
                  ["Time Series",      "Stock price history",   "(252,)",          "float64"],
                  ["ML (Sachin, BCA)", "Student marks dataset", "(100, 5)",        "float64"],
                ].map(([domain, data, shape, dtype]) => (
                  <tr key={data} className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white border-r border-slate-800">{domain}</td>
                    <td className="p-3 border-r border-slate-800">{data}</td>
                    <td className="p-3 font-mono text-cyan-300 border-r border-slate-800">{shape}</td>
                    <td className="p-3 font-mono text-amber-300">{dtype}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Classroom story */}
          <div className="bg-gradient-to-r from-slate-950 to-indigo-950/40 p-5 rounded-xl border border-indigo-800/30 space-y-2">
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">📖 Classroom Story — Barrackpore Lab</div>
            <p className="text-sm text-slate-300">
              Sukanta Hui told his students — Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, and Tuhina —
              to imagine a school register with rows for students and columns for marks. &ldquo;That register
              is a 2D NumPy array. Shape <code className="text-cyan-300 font-mono">(50, 5)</code> means 50
              students, 5 subjects. Every single ML model you will train starts with a NumPy array like this.&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* DATA TYPES */}
      {activeSection === "dtypes" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">NumPy Data Types (dtypes)</h2>
              <p className="text-xs sm:text-sm text-slate-400">Choosing the right dtype saves memory and prevents errors</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-800 bg-slate-950 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-3 border-r border-slate-800 text-left">dtype</th>
                  <th className="p-3 border-r border-slate-800 text-left">Bytes</th>
                  <th className="p-3 border-r border-slate-800 text-left">Range / Precision</th>
                  <th className="p-3 text-left">Typical ML Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {DTYPES.map((d) => (
                  <tr key={d.name} className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-cyan-300 font-bold border-r border-slate-800">{d.name}</td>
                    <td className="p-3 border-r border-slate-800 text-center font-mono text-amber-300">{d.bytes}</td>
                    <td className="p-3 border-r border-slate-800">{d.range}</td>
                    <td className="p-3 text-emerald-300">{d.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* dtype cost comparison */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Memory Cost: 1 Million Elements</h3>
            <div className="space-y-3">
              {[
                { label: "int8  (1 byte each)",   mb: "1 MB",  w: "12.5%" },
                { label: "int32 (4 bytes each)",  mb: "4 MB",  w: "50%" },
                { label: "float32 (4 bytes each)","mb": "4 MB",  w: "50%" },
                { label: "float64 (8 bytes each)","mb": "8 MB",  w: "100%" },
              ].map((r) => (
                <div key={r.label} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="font-mono">{r.label}</span>
                    <span className="font-bold text-amber-300">{r.mb}</span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: r.w }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              💡 Using <code className="text-cyan-300">float32</code> instead of <code className="text-cyan-300">float64</code> halves memory usage —
              critical for fitting large models on GPU VRAM.
            </p>
          </div>

          {/* dtype code examples */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-slate-400 text-[11px] uppercase font-semibold mb-3">dtype in practice</div>
            <div className="text-emerald-400"># Inferred dtype (float64 by default)</div>
            <div className="text-slate-200">arr = np.array([1.0, 2.5, 3.7])</div>
            <div className="text-slate-400">print(arr.dtype)  # float64</div>
            <div className="mt-3 text-emerald-400"># Explicit dtype for deep learning</div>
            <div className="text-slate-200">arr32 = np.array([1.0, 2.5, 3.7], dtype=np.float32)</div>
            <div className="text-slate-400">print(arr32.nbytes)  # 12  (vs 24 for float64)</div>
            <div className="mt-3 text-emerald-400"># Boolean labels</div>
            <div className="text-slate-200">labels = np.array([True, False, True], dtype=np.bool_)</div>
            <div className="text-slate-400">print(labels.itemsize)  # 1 byte per element</div>
          </div>
        </section>
      )}

      {/* ML PIPELINE */}
      {activeSection === "pipeline" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">NumPy in the ML Pipeline</h2>
              <p className="text-xs sm:text-sm text-slate-400">From raw data to model input — NumPy is always in the middle</p>
            </div>
          </div>

          {/* Pipeline steps */}
          <div className="space-y-3">
            {PIPELINE.map((step, idx) => (
              <div key={step.step} className="flex items-start gap-4">
                <div className={`shrink-0 w-9 h-9 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {step.step}
                </div>
                <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  <div className="font-mono text-sm text-white font-bold">{step.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{step.detail}</div>
                </div>
                {idx < PIPELINE.length - 1 && (
                  <div className="absolute ml-4 mt-9">
                    {/* connector line drawn by CSS spacing */}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Real pipeline code */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-400 text-[11px] uppercase font-semibold mb-3">Complete pipeline code snippet</div>
            <div className="text-slate-500"># Step 1: Load raw data using Pandas</div>
            <div className="text-slate-200">import pandas as pd</div>
            <div className="text-slate-200">df = pd.read_csv("student_marks.csv")</div>
            <div className="mt-2 text-slate-500"># Step 2: Select features and target</div>
            <div className="text-slate-200">X_df = df[["study_hours", "attendance", "prev_marks"]]</div>
            <div className="text-slate-200">y_df = df["result"]</div>
            <div className="mt-2 text-slate-500"># Step 3: Convert to NumPy arrays</div>
            <div className="text-slate-200">X = X_df.values   <span className="text-slate-500"># shape (n_students, 3)</span></div>
            <div className="text-slate-200">y = y_df.values   <span className="text-slate-500"># shape (n_students,)</span></div>
            <div className="mt-2 text-slate-500"># Step 4: Feed to Scikit-learn model</div>
            <div className="text-slate-200">from sklearn.linear_model import LogisticRegression</div>
            <div className="text-slate-200">model = LogisticRegression()</div>
            <div className="text-slate-200">model.fit(X, y)   <span className="text-slate-500"># X and y are NumPy arrays!</span></div>
          </div>

          {/* Key points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📐", title: "Feature Matrix X", desc: "Always shape (n_samples, n_features) — rows=samples, cols=features", color: "border-blue-800" },
              { icon: "🎯", title: "Target Vector y",  desc: "Always shape (n_samples,) — one label per sample",                   color: "border-emerald-800" },
              { icon: "🔄", title: ".values",          desc: "Convert any Pandas DataFrame column to a NumPy ndarray instantly",    color: "border-purple-800" },
            ].map((c) => (
              <div key={c.title} className={`bg-slate-950 p-4 rounded-xl border ${c.color} space-y-2`}>
                <div className="text-2xl">{c.icon}</div>
                <div className="font-bold text-white text-sm">{c.title}</div>
                <div className="text-xs text-slate-400">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* COMMON PITFALLS */}
      {/* ================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">⚠</div>
          <div>
            <h2 className="text-xl font-bold text-white">Common Pitfalls &amp; Best Practices</h2>
            <p className="text-xs text-slate-400">Mistakes beginners make with NumPy</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-sm font-bold text-rose-400">❌ Pitfalls</h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Using Python loops</strong> instead of vectorized operations defeats the purpose of NumPy.</li>
              <li><strong className="text-white">Mixed-type arrays</strong> (int + string) cause dtype=object — no SIMD speedup.</li>
              <li><strong className="text-white">Forgetting that slices are views</strong> — modifying a slice modifies the original array.</li>
              <li><strong className="text-white">Defaulting to float64</strong> for large deep learning arrays wastes 2× GPU memory.</li>
              <li><strong className="text-white">Confusing shape (5,) and shape (5,1)</strong> — subtle bugs in matrix operations.</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400">✔ Best Practices</h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Always specify dtype</strong> explicitly when creating large arrays for ML.</li>
              <li><strong className="text-white">Use arr.copy()</strong> when you need an independent copy instead of a view.</li>
              <li><strong className="text-white">Check .shape and .dtype</strong> immediately after loading any dataset.</li>
              <li><strong className="text-white">Use float32</strong> for neural network weights to halve GPU memory usage.</li>
              <li><strong className="text-white">Use np.issubdtype()</strong> to write dtype-agnostic utility functions.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* HINT */}
      {/* ================================================================= */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-indigo-800/30 space-y-3">
        <h2 className="text-lg font-bold text-indigo-300">💡 Think About This…</h2>
        <p className="text-sm text-slate-300">
          Mahima asked: <em>"Why can't we just use Python lists for ML? They work perfectly fine."</em>
        </p>
        <p className="text-sm text-slate-300">
          Sukanta replied: <em>"You can — for a dataset of 100 rows. But Tuhina's image recognition project
          will train on 60,000 images × 784 pixels = 47 million numbers. At 195ms per million elements with
          Python lists, that's over 9 seconds just for one multiplication step. NumPy does it in under 0.1 second.
          Training 100 epochs would take 15 minutes vs 10 seconds. NumPy isn't optional — it's mandatory."</em>
        </p>
      </section>

      {/* ================================================================= */}
      {/* PYTHON LAB */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">💻</div>
          <div>
            <h2 className="text-xl font-bold text-white">Python Code Demonstration Suite (3 Focused Scripts)</h2>
            <p className="text-xs text-slate-400">Select a script below to inspect benchmarks, data type memory, or the ML pipeline</p>
          </div>
        </div>

        {/* Script Selection Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
      {/* FAQ */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Introduction to NumPy — FAQs"
          questions={questions}
        />
      </section>

      {/* ================================================================= */}
      {/* PLAIN TEXT NOTE */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Introduction to NumPy — Quick Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Study Note"
          downloadFileName="numpy_intro_note.txt"
        />
      </section>

      {/* ================================================================= */}
      {/* TEACHER'S NOTE */}
      {/* ================================================================= */}
      <section>
        <Teacher
          note="NumPy is not just a library — it is the lingua franca of numerical computing in Python. Before you write a single line of machine learning code, make sure you are completely fluent in NumPy arrays: their shapes, dtypes, and vectorized operations. Every hour you spend mastering NumPy will save you ten hours of debugging in Scikit-learn and TensorFlow. — Sukanta Hui, Coder & AccoTax, Barrackpore"
        />
      </section>

    </div>
  );
};

export default Topic0;

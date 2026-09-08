import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic3_files/01_basic_and_nested_array_creation.py?raw";
import pyCode2 from "./topic3_files/02_explicit_dtypes_and_upcasting.py?raw";
import pyCode3 from "./topic3_files/03_copy_parameter_and_memory_buffers.py?raw";
import pyCode4 from "./topic3_files/04_ragged_nested_sequence_pitfall.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_basic_and_nested_array_creation.py",
    title: "1. 1D, 2D & 3D Sequence Instantiation",
    badge: "Basic & Nested",
    code: pyCode1,
    summary: "Creates 1D score vectors, 2D tabular student marks matrices, and 3D multi-batch lab tensors from nested lists and tuples.",
  },
  {
    id: "part2",
    fileName: "02_explicit_dtypes_and_upcasting.py",
    title: "2. Explicit dtypes & Upcasting Traps",
    badge: "dtypes & Casting",
    code: pyCode2,
    summary: "Demonstrates float32/int8 memory optimizations, implicit float promotion, and the dangerous accidental string upcasting trap.",
  },
  {
    id: "part3",
    fileName: "03_copy_parameter_and_memory_buffers.py",
    title: "3. The copy Parameter & np.asarray()",
    badge: "copy vs asarray",
    code: pyCode3,
    summary: "Compares defensive array copying (copy=True) with zero-copy buffer re-use via np.asarray() to avoid memory duplication.",
  },
  {
    id: "part4",
    fileName: "04_ragged_nested_sequence_pitfall.py",
    title: "4. Ragged Sequences & ML Padding",
    badge: "ML Padding",
    code: pyCode4,
    summary: "Explains why inhomogeneous sequence creation is invalid and provides the standard constant-padding fix for ML inputs.",
  },
];

// ─── Constructor Parameters ──────────────────────────────────────────────────
const PARAMETERS = [
  { param: "object", type: "array_like", default: "Required", desc: "Input data sequence: list, tuple, nested list, generator, or existing array" },
  { param: "dtype", type: "data-type, optional", default: "None (Inferred)", desc: "Explicit desired data type (e.g., np.float32, np.int64, np.uint8, np.bool_)" },
  { param: "copy", type: "bool, optional", default: "True", desc: "If True, always copies data. If False, reuses memory when input is already an ndarray" },
  { param: "order", type: "{'K', 'A', 'C', 'F'}", default: "'K'", desc: "Memory layout order: 'C' (row-major), 'F' (column-major), 'A' (any), 'K' (keep)" },
  { param: "subok", type: "bool, optional", default: "False", desc: "If True, subclasses like np.matrix are preserved; otherwise returns base ndarray" },
  { param: "ndmin", type: "int, optional", default: "0", desc: "Specifies the minimum number of dimensions the resulting array must possess" },
];

// ─── Upcasting Hierarchy ─────────────────────────────────────────────────────
const UPCASTING_STEPS = [
  { level: "Level 1", type: "bool_", example: "[True, False]", bytes: "1 byte", note: "Pure truth values (0 or 1)" },
  { level: "Level 2", type: "int32 / int64", example: "[1, 2, 3]", bytes: "4 / 8 bytes", note: "Promotes booleans (True -> 1, False -> 0)" },
  { level: "Level 3", type: "float32 / float64", example: "[1, 2, 3.5]", bytes: "4 / 8 bytes", note: "Promotes integers to floating-point (1 -> 1.0)" },
  { level: "Level 4", type: "complex128", example: "[1, 2.5, 3+4j]", bytes: "16 bytes", note: "Promotes floats to real+imaginary complex numbers" },
  { level: "Level 5", type: "<U (Unicode String)", example: "[1, 2.5, 'Kolkata']", bytes: "Variable", note: "Promotes all numeric data to fixed-width string (avoid in ML!)" },
];

// ─── Creation Methods Comparison ─────────────────────────────────────────────
const CREATION_EXAMPLES = [
  {
    title: "1D Feature Vector",
    code: "np.array([75, 88, 92, 64])",
    shape: "(4,)",
    ndim: 1,
    mlContext: "Target labels y or single student feature vector",
    badge: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  },
  {
    title: "2D Tabular Matrix",
    code: "np.array([[75, 88, 82], [92, 95, 89]])",
    shape: "(2, 3)",
    ndim: 2,
    mlContext: "Feature matrix X (2 samples × 3 features)",
    badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  {
    title: "3D Digital Image Tensor",
    code: "np.array([[[255, 0, 0], [0, 255, 0]]], dtype=np.uint8)",
    shape: "(1, 2, 3)",
    ndim: 3,
    mlContext: "RGB pixel grid (Height × Width × 3 Channels)",
    badge: "border-purple-500/40 bg-purple-500/10 text-purple-300",
  },
  {
    title: "2D Forced Matrix (ndmin=2)",
    code: "np.array([10, 20, 30], ndmin=2)",
    shape: "(1, 3)",
    ndim: 2,
    mlContext: "Single-row feature sample formatted for Scikit-learn X",
    badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
const Topic3 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeHint, setActiveHint] = useState(null);
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Interactive constructor simulator state
  const [inputDataType, setInputDataType] = useState("nested2d");
  const [selectedDtype, setSelectedDtype] = useState("float32");
  const [selectedNdmin, setSelectedNdmin] = useState(0);

  // Simulation calculations
  const getSimulationResult = () => {
    let rawData = "[75, 88, 92]";
    let inferredShape = "(3,)";
    let baseNdim = 1;
    let elemCount = 3;

    if (inputDataType === "1d") {
      rawData = "[75, 88, 92, 64]";
      elemCount = 4;
      baseNdim = 1;
      inferredShape = selectedNdmin === 2 ? "(1, 4)" : selectedNdmin === 3 ? "(1, 1, 4)" : "(4,)";
    } else if (inputDataType === "nested2d") {
      rawData = "[[75, 88, 82, 90], [92, 95, 89, 94], [68, 74, 80, 85]]";
      elemCount = 12;
      baseNdim = 2;
      inferredShape = selectedNdmin === 3 ? "(1, 3, 4)" : "(3, 4)";
    } else if (inputDataType === "image3d") {
      rawData = "[[[255, 0, 0], [0, 255, 0]], [[0, 0, 255], [255, 255, 0]]]";
      elemCount = 12;
      baseNdim = 3;
      inferredShape = "(2, 2, 3)";
    }

    const bytesPerElem = selectedDtype === "float64" || selectedDtype === "int64" ? 8 : selectedDtype === "float32" || selectedDtype === "int32" ? 4 : 1;
    const totalBytes = elemCount * bytesPerElem;
    const effectiveNdim = Math.max(baseNdim, selectedNdmin);

    return { rawData, inferredShape, effectiveNdim, elemCount, bytesPerElem, totalBytes };
  };

  const sim = getSimulationResult();

  const tabs = [
    { id: "overview", label: "Overview & Sandbox" },
    { id: "signature", label: "Function Signature & Parameters" },
    { id: "creation", label: "1D / 2D / 3D Creation" },
    { id: "dtype", label: "Dtype & Precision Control" },
    { id: "ndmin", label: "The ndmin Parameter" },
    { id: "upcasting", label: "Type Upcasting Rules" },
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">

      {/* ================================================================= */}
      {/* 1. HEADER SECTION WITH WORKING NAVIGATION TABS */}
      {/* ================================================================= */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Segment 9 • Module 1 • Topic 3
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Core Constructor
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Syntax & Mechanics
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Creating Arrays with <code className="text-cyan-400 font-mono">np.array()</code>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            <code className="text-cyan-400 font-mono">np.array()</code> is the fundamental constructor function used to instantiate ndarrays
            from Python lists, tuples, and nested sequences. Click any tab below to explore its exact parameter syntax, explicit dtype specification, dimension constraints with <code className="text-indigo-300 font-mono">ndmin</code>,
            and automatic type upcasting hierarchies.
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
      {/* 2. DYNAMIC TAB CONTENT (SWITCHES IMMEDIATELY BELOW HEADER) */}
      {/* ================================================================= */}

      {/* TAB: OVERVIEW & SANDBOX */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Conceptual Overview Cards */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
                01
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Constructor Overview & Architecture</h2>
                <p className="text-xs sm:text-sm text-slate-400">How np.array() transforms standard Python sequences into high-performance C memory</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <h3 className="font-bold text-cyan-300 text-base">What is np.array()?</h3>
                </div>
                <p className="text-sm text-slate-300">
                  <code className="text-indigo-300 font-mono">np.array()</code> is the primary factory function in NumPy.
                  It accepts any Python sequence or iterable object and creates a homogeneous, multi-dimensional <code className="text-amber-300 font-mono">ndarray</code> backed by contiguous C memory.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Parses nested list depth to automatically deduce array rank (<code className="text-slate-200">ndim</code>)</li>
                  <li>Inspects element types to infer a common homogeneous data type (<code className="text-slate-200">dtype</code>)</li>
                  <li>Allocates a contiguous block of bytes in RAM matching the exact layout requested</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h3 className="font-bold text-emerald-300 text-base">Why Use np.array() in ML Workflows?</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Machine Learning libraries like Scikit-learn, TensorFlow, and PyTorch require inputs in structured matrix formats.
                  Converting raw datasets (CSV rows, student records, sensor feeds) via <code className="text-emerald-300 font-mono">np.array()</code> provides:
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Deterministic shape validation (e.g. guaranteeing 2D matrices)</li>
                  <li>Memory optimization via explicit precision selection (<code className="text-slate-200">float32</code> vs <code className="text-slate-200">float64</code>)</li>
                  <li>Compatibility with compiled BLAS and LAPACK numerical linear algebra subroutines</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Visual Transformation SVG & Interactive Sandbox */}
          <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
                02
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Visual Memory Transformation & Constructor Playground</h2>
                <p className="text-xs sm:text-sm text-slate-400">How Python's fragmented heap lists are flattened into high-speed C buffers</p>
              </div>
            </div>

            {/* SVG Transformation Diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                className="w-full max-w-3xl h-auto"
                viewBox="0 0 800 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="380" rx="16" fill="#0B1120" />
                <circle cx="180" cy="180" r="110" fill="#EF4444" fillOpacity="0.04" />
                <circle cx="620" cy="180" r="110" fill="#10B981" fillOpacity="0.04" />

                {/* Left Box: Python Nested List (Fragmented Heap Objects) */}
                <g transform="translate(40, 40)">
                  <rect x="0" y="0" width="280" height="300" rx="12" fill="#18181B" stroke="#EF4444" strokeWidth="1.5" />
                  <text x="20" y="28" fill="#FCA5A5" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    PYTHON LIST: [[75, 88], [92, 95]]
                  </text>
                  <line x1="20" y1="38" x2="260" y2="38" stroke="#7F1D1D" strokeWidth="1" />

                  <text x="20" y="60" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">
                    Outer List (Array of 2 Pointers)
                  </text>
                  <rect x="20" y="70" width="100" height="35" rx="6" fill="#27272A" stroke="#71717A" />
                  <text x="70" y="92" fill="#E4E4E7" fontSize="11" textAnchor="middle" fontFamily="monospace">
                    ptr → Row 0
                  </text>

                  <rect x="140" y="70" width="100" height="35" rx="6" fill="#27272A" stroke="#71717A" />
                  <text x="190" y="92" fill="#E4E4E7" fontSize="11" textAnchor="middle" fontFamily="monospace">
                    ptr → Row 1
                  </text>

                  {/* Scattered Heap Objects */}
                  <text x="20" y="130" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">
                    Heap-Allocated PyLongObject Boxes (~28B each)
                  </text>

                  <rect x="20" y="145" width="110" height="55" rx="6" fill="#3F3F46" stroke="#EF4444" strokeWidth="1" />
                  <text x="75" y="168" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Val: 75
                  </text>
                  <text x="75" y="186" fill="#FCA5A5" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    PyObject (28B)
                  </text>

                  <rect x="150" y="145" width="110" height="55" rx="6" fill="#3F3F46" stroke="#EF4444" strokeWidth="1" />
                  <text x="205" y="168" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Val: 88
                  </text>
                  <text x="205" y="186" fill="#FCA5A5" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    PyObject (28B)
                  </text>

                  <rect x="20" y="215" width="110" height="55" rx="6" fill="#3F3F46" stroke="#EF4444" strokeWidth="1" />
                  <text x="75" y="238" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Val: 92
                  </text>
                  <text x="75" y="256" fill="#FCA5A5" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    PyObject (28B)
                  </text>

                  <rect x="150" y="215" width="110" height="55" rx="6" fill="#3F3F46" stroke="#EF4444" strokeWidth="1" />
                  <text x="205" y="238" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Val: 95
                  </text>
                  <text x="205" y="256" fill="#FCA5A5" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    PyObject (28B)
                  </text>

                  <text x="20" y="290" fill="#EF4444" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Total RAM: ~160 Bytes (Pointers + Boxes)
                  </text>
                </g>

                {/* Middle Transformation Arrow */}
                <g transform="translate(340, 150)">
                  <rect x="0" y="0" width="120" height="60" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
                  <text x="60" y="26" fill="#A5B4FC" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    np.array()
                  </text>
                  <text x="60" y="44" fill="#38BDF8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    dtype=float32
                  </text>

                  {/* Animated pulses */}
                  <path d="M 125 30 L 140 30" stroke="#38BDF8" strokeWidth="3">
                    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                  </path>
                  <polygon points="145,30 137,25 137,35" fill="#38BDF8" />
                </g>

                {/* Right Box: NumPy ndarray (Contiguous C Buffer) */}
                <g transform="translate(480, 40)">
                  <rect x="0" y="0" width="280" height="300" rx="12" fill="#064E3B" fillOpacity="0.3" stroke="#10B981" strokeWidth="1.5" />
                  <text x="20" y="28" fill="#6EE7B7" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    NUMPY ndarray: shape=(2, 2)
                  </text>
                  <line x1="20" y1="38" x2="260" y2="38" stroke="#065F46" strokeWidth="1" />

                  <text x="20" y="60" fill="#A7F3D0" fontSize="11" fontFamily="monospace">
                    dtype: float32 • strides: (8, 4)
                  </text>

                  {/* Contiguous C Block */}
                  <g transform="translate(20, 80)">
                    <text x="0" y="0" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">
                      Contiguous Raw Binary Buffer (RAM)
                    </text>

                    {[
                      { val: "75.0", offset: "0B", row: 0, col: 0 },
                      { val: "88.0", offset: "4B", row: 0, col: 1 },
                      { val: "92.0", offset: "8B", row: 1, col: 0 },
                      { val: "95.0", offset: "12B", row: 1, col: 1 },
                    ].map((item, idx) => (
                      <g key={idx} transform={`translate(${idx * 58}, 15)`}>
                        <rect
                          x="0"
                          y="0"
                          width="54"
                          height="65"
                          rx="6"
                          fill="#065F46"
                          stroke="#34D399"
                          strokeWidth="1.5"
                        >
                          <animate
                            attributeName="stroke-opacity"
                            values="0.4;1;0.4"
                            dur="2s"
                            begin={`${idx * 0.25}s`}
                            repeatCount="indefinite"
                          />
                        </rect>
                        <text x="27" y="26" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          {item.val}
                        </text>
                        <text x="27" y="42" fill="#6EE7B7" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          +{item.offset}
                        </text>
                        <text x="27" y="56" fill="#93C5FD" fontSize="8" textAnchor="middle" fontFamily="monospace">
                          [{item.row},{item.col}]
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Features List */}
                  <g transform="translate(20, 190)">
                    <rect x="0" y="0" width="240" height="90" rx="8" fill="#022C22" stroke="#059669" strokeWidth="1" />
                    <text x="12" y="24" fill="#A7F3D0" fontSize="10" fontFamily="sans-serif">
                      ✔ 16 Bytes Total (4 elements × 4B)
                    </text>
                    <text x="12" y="44" fill="#A7F3D0" fontSize="10" fontFamily="sans-serif">
                      ✔ Zero pointer dereferencing
                    </text>
                    <text x="12" y="64" fill="#A7F3D0" fontSize="10" fontFamily="sans-serif">
                      ✔ Hardware SIMD AVX vectorization ready
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Interactive Constructor Sandbox */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">Interactive Constructor Sandbox</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
                  Live Parameter Simulator
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Input Data Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">1. Input Sequence (object):</label>
                  <select
                    value={inputDataType}
                    onChange={(e) => setInputDataType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500"
                  >
                    <option value="1d">1D List: [75, 88, 92, 64] (4 elements)</option>
                    <option value="nested2d">2D Nested List: 3 Students × 4 Marks</option>
                    <option value="image3d">3D Nested List: 2×2 RGB Mini-Tensor</option>
                  </select>
                </div>

                {/* Dtype Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">2. Target Data Type (dtype):</label>
                  <select
                    value={selectedDtype}
                    onChange={(e) => setSelectedDtype(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500"
                  >
                    <option value="float32">np.float32 (4 bytes - standard ML)</option>
                    <option value="float64">np.float64 (8 bytes - high precision)</option>
                    <option value="int32">np.int32 (4 bytes - integer counts)</option>
                    <option value="uint8">np.uint8 (1 byte - image pixels)</option>
                    <option value="bool_">np.bool_ (1 byte - boolean masks)</option>
                  </select>
                </div>

                {/* ndmin Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">3. Minimum Dimensions (ndmin):</label>
                  <select
                    value={selectedNdmin}
                    onChange={(e) => setSelectedNdmin(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500"
                  >
                    <option value={0}>ndmin=0 (Default inferred rank)</option>
                    <option value={2}>ndmin=2 (Force at least 2D matrix)</option>
                    <option value={3}>ndmin=3 (Force at least 3D tensor)</option>
                  </select>
                </div>
              </div>

              {/* Result Output Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-1">Generated Python Command:</span>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-emerald-300 overflow-x-auto">
                    arr = np.array(<br/>
                    &nbsp;&nbsp;{sim.rawData},<br/>
                    &nbsp;&nbsp;dtype=np.{selectedDtype},<br/>
                    &nbsp;&nbsp;ndmin={selectedNdmin}<br/>
                    )
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 block mb-1">Resulting ndarray Metadata:</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">arr.shape:</span>
                      <span className="font-bold text-cyan-300 text-sm">{sim.inferredShape}</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">arr.ndim:</span>
                      <span className="font-bold text-indigo-300 text-sm">{sim.effectiveNdim}D</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">arr.size:</span>
                      <span className="font-bold text-amber-300 text-sm">{sim.elemCount} elements</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">arr.nbytes:</span>
                      <span className="font-bold text-emerald-300 text-sm">{sim.totalBytes} Bytes ({sim.bytesPerElem}B/item)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB: SIGNATURE & PARAMETERS */}
      {activeTab === "signature" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Full Constructor Signature & Parameters</h2>
              <p className="text-xs sm:text-sm text-slate-400">Exhaustive parameter reference for np.array()</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/40 font-mono text-xs sm:text-sm text-indigo-300">
            np.array(object, dtype=None, *, copy=True, order='K', subok=False, ndmin=0)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/60 text-xs uppercase font-mono text-slate-400">
                  <th className="p-3">Parameter</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Detailed Functionality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono text-xs sm:text-sm">
                {PARAMETERS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300">{row.param}</td>
                    <td className="p-3 text-purple-300">{row.type}</td>
                    <td className="p-3 text-amber-300">{row.default}</td>
                    <td className="p-3 font-sans text-xs sm:text-sm text-slate-300">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB: 1D / 2D / 3D CREATION */}
      {activeTab === "creation" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Creating 1D Vectors, 2D Matrices & 3D Tensors</h2>
              <p className="text-xs sm:text-sm text-slate-400">Pattern reference for machine learning data formats</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CREATION_EXAMPLES.map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{item.title}</h3>
                  <span className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-full border ${item.badge}`}>
                    shape: {item.shape}
                  </span>
                </div>
                <div className="font-mono text-xs bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                  {item.code}
                </div>
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-200">ML Context:</strong> {item.mlContext}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB: DTYPE & PRECISION CONTROL */}
      {activeTab === "dtype" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Dtype Specification & Precision Tradeoffs</h2>
              <p className="text-xs sm:text-sm text-slate-400">Managing RAM footprint for massive datasets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-cyan-300 text-base">Numeric Dtypes Summary Table</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-white">np.float32 (Single Precision)</span>
                  <span className="text-emerald-400">4 Bytes / item (ML Standard)</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-white">np.float64 (Double Precision)</span>
                  <span className="text-amber-400">8 Bytes / item (Scientific Default)</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-white">np.int32 (Standard Integer)</span>
                  <span className="text-cyan-400">4 Bytes / item (-2.1B to +2.1B)</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-white">np.uint8 (Unsigned Byte)</span>
                  <span className="text-purple-400">1 Byte / item (0 to 255 Image Pixels)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base">Memory Impact for 10M Elements</h3>
              <p className="text-sm text-slate-300">
                Consider an array of 10,000,000 feature observations (e.g. sensor readings in Barrackpore industrial labs):
              </p>
              <div className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <p># Default float64 allocation:</p>
                <p className="text-amber-300">np.array(data, dtype=np.float64) → 80.0 MB RAM</p>
                <p className="mt-2"># Optimized float32 allocation:</p>
                <p className="text-emerald-300">np.array(data, dtype=np.float32) → 40.0 MB RAM (50% Savings!)</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: THE NDMIN PARAMETER */}
      {activeTab === "ndmin" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">The <code className="text-indigo-300 font-mono">ndmin</code> Parameter</h2>
              <p className="text-xs sm:text-sm text-slate-400">Guaranteeing 2D Matrix Inputs for Scikit-learn Models</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <p className="text-sm text-slate-300">
              Scikit-learn algorithms strictly enforce that feature matrix <code className="text-cyan-300 font-mono">X</code> must be a 2-dimensional array of shape <code className="text-amber-300 font-mono">(n_samples, n_features)</code>.
              When passing a single sample vector <code className="text-slate-200 font-mono">[75, 88, 92]</code>, standard creation produces shape <code className="text-rose-400 font-mono">(3,)</code>, crashing model inference.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-rose-900/50 space-y-1">
                <span className="text-rose-400 font-bold block">Without ndmin (1D Vector):</span>
                <p>x = np.array([75, 88, 92])</p>
                <p className="text-slate-400">x.shape → (3,) [1D]</p>
                <p className="text-rose-300 text-[11px]">⚠️ ValueError: Expected 2D array, got 1D array instead</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-900/50 space-y-1">
                <span className="text-emerald-400 font-bold block">With ndmin=2 (2D Row Matrix):</span>
                <p>x = np.array([75, 88, 92], ndmin=2)</p>
                <p className="text-slate-400">x.shape → (1, 3) [2D]</p>
                <p className="text-emerald-300 text-[11px]">✔ model.predict(x) runs flawlessly!</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: UPCASTING RULES */}
      {activeTab === "upcasting" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">NumPy Type Coercion & Upcasting Hierarchy</h2>
              <p className="text-xs sm:text-sm text-slate-400">How mixed types are promoted to maintain strict homogeneity</p>
            </div>
          </div>

          <div className="space-y-3">
            {UPCASTING_STEPS.map((step, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/40">
                    {step.level}
                  </span>
                  <span className="font-mono text-sm font-bold text-cyan-300">{step.type}</span>
                </div>
                <div className="font-mono text-xs text-amber-300 bg-slate-900 px-2 py-1 rounded">
                  {step.example}
                </div>
                <div className="text-xs text-slate-400 font-sans">{step.note}</div>
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
            <p className="text-xs text-slate-400">Select a script below to inspect array construction, dtypes, copy mechanics, or sequence padding</p>
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
            <p className="text-xs sm:text-sm text-slate-400">Avoid these frequent array constructor errors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 1: Missing Outer Brackets</span>
            <p className="text-xs text-slate-300">
              Writing <code className="text-rose-300 font-mono">np.array(1, 2, 3)</code> passes 2 as the dtype argument, throwing a TypeError.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># WRONG:</span> np.array(1, 2, 3)<br/>
              <span className="text-emerald-400"># CORRECT:</span> np.array([1, 2, 3])
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 2: Ragged Nested Sub-lists</span>
            <p className="text-xs text-slate-300">
              Passing sub-lists of varying lengths prevents rectangular matrix formation and throws a ValueError in modern NumPy.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># WRONG:</span> np.array([[1, 2], [3, 4, 5]])<br/>
              <span className="text-emerald-400"># CORRECT:</span> np.array([[1, 2, 0], [3, 4, 5]])
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 3: Accidental String Contamination</span>
            <p className="text-xs text-slate-300">
              If an uncleaned dataset contains a string like <code className="text-rose-300 font-mono">"NA"</code>, the entire array is converted to Unicode string.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># DANGEROUS:</span> np.array([10, 20, "NA"]) # dtype &lt;U21<br/>
              <span className="text-emerald-400"># DEFENSIVE:</span> np.array([10, 20, np.nan], dtype=np.float64)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 hover:border-rose-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Pitfall 4: Integer Truncation on Float Inputs</span>
            <p className="text-xs text-slate-300">
              Forcing <code className="text-amber-300 font-mono">dtype=np.int32</code> on continuous probabilities or weights silently truncates decimals toward zero.
            </p>
            <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
              <span className="text-rose-400"># TRUNCATES:</span> np.array([0.95, 0.40], dtype=np.int32) # [0, 0]<br/>
              <span className="text-emerald-400"># CORRECT:</span> np.array([0.95, 0.40], dtype=np.float32)
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
            <p className="text-xs sm:text-sm text-slate-400">Deepen your understanding of array instantiation mechanics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              q: "What is the resulting dtype of np.array([True, 0, 3.14])?",
              a: "float64. True becomes 1.0, 0 becomes 0.0, and 3.14 is preserved under the numeric upcasting hierarchy.",
            },
            {
              id: 2,
              q: "When should you use np.asarray(X) instead of np.array(X)?",
              a: "In library utility functions where X might already be an ndarray. asarray avoids redundant memory copies (copy=False).",
            },
            {
              id: 3,
              q: "What does np.array([1, 2, 3], ndmin=2) produce?",
              a: "A 2D row matrix of shape (1, 3) containing [[1, 2, 3]].",
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
          title="Creating Arrays with np.array() — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ================================================================= */}
      {/* 7. PLAIN TEXT PRINTABLE NOTE (<PlainTextPrint>) */}
      {/* ================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="NumPy np.array() Constructor Quick Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note"
          downloadFileName="numpy_array_creation_note.txt"
        />
      </section>

      {/* ================================================================= */}
      {/* 8. TEACHER'S NOTE (<Teacher>) */}
      {/* ================================================================= */}
      <Teacher
        note="When teaching in our Barrackpore class, Sachin and Debangshu often run into Scikit-learn ValueError issues when passing raw 1D arrays as single test samples. Remember: always specify ndmin=2 or call .reshape(1, -1) to supply a proper 2D feature matrix X. And always be mindful of dtype=float32 to save RAM in large data pipelines! — Sukanta Hui"
      />

    </div>
  );
};

export default Topic3;

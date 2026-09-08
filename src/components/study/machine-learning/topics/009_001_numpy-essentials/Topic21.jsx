import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic21_files/01_problem1_one_hot_encoding.py?raw";
import pyCode2 from "./topic21_files/02_problem2_pairwise_euclidean_distance.py?raw";
import pyCode3 from "./topic21_files/03_problem3_moving_average_1d_convolution.py?raw";
import pyCode4 from "./topic21_files/04_problem4_minibatch_generator.py?raw";
import noteText from "./topic21_files/topic21_note.txt?raw";
import questions from "./topic21_files/topic21_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_problem1_one_hot_encoding.py",
    title: "1. Vectorized One-Hot Encoding",
    badge: "np.eye Indexing",
    code: pyCode1,
    summary: "Converts integer class arrays into 2D One-Hot matrices in O(1) time using np.eye(C)[labels] and decodes with np.argmax.",
  },
  {
    id: "part2",
    fileName: "02_problem2_pairwise_euclidean_distance.py",
    title: "2. Pairwise Euclidean Distance Matrix",
    badge: "KNN Distance Engine",
    code: pyCode2,
    summary: "Implements loop-free distance matrix between (M, D) and (N, D) using 3D broadcasting and algebraic BLAS GEMM expansion.",
  },
  {
    id: "part3",
    fileName: "03_problem3_moving_average_1d_convolution.py",
    title: "3. 1D Moving Average Filter",
    badge: "1D Convolution",
    code: pyCode3,
    summary: "Applies 1D box filter convolution np.convolve(series, kernel, mode='valid') and O(N) cumulative sum moving averages.",
  },
  {
    id: "part4",
    fileName: "04_problem4_minibatch_generator.py",
    title: "4. Mini-Batch SGD Training Generator",
    badge: "SGD Mini-Batches",
    code: pyCode4,
    summary: "Builds a synchronous shuffle iterator yielding mini-batches of (X_batch, y_batch) for neural network optimization.",
  },
];

const Topic21 = () => {
  const [activeTab, setActiveTab] = useState("practice_hub");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [activeProblem, setActiveProblem] = useState(1);
  const [oneHotInput, setOneHotInput] = useState([2, 3, 1, 0]);
  const [maWindow, setMaWindow] = useState(3);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Moving average raw sample data
  const rawTemps = [28, 30, 35, 32, 29, 27, 31, 33];
  const computedMA = [];
  for (let i = 0; i <= rawTemps.length - maWindow; i++) {
    const chunk = rawTemps.slice(i, i + maWindow);
    const avg = chunk.reduce((a, b) => a + b, 0) / maWindow;
    computedMA.push(parseFloat(avg.toFixed(1)));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-cyan-900/60 via-slate-900 to-blue-900/60 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/40">
                Topic 21 • Hands-on Coding Hub
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/40">
                Practice Problems
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-300 bg-clip-text text-transparent">
              NumPy Practice Problems &amp; Algorithms
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Tackle essential machine learning algorithmic challenges: Vectorized One-Hot Encoding, Loopless Pairwise Euclidean Distances (KNN engine), 1D Moving Average Filters, and Mini-Batch SGD Training Iterators.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "practice_hub", label: "Interactive Problem Testbench", icon: "⚡" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive Problem Testbench */}
      {activeTab === "practice_hub" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Problem Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 1, title: "Problem 1", name: "Vectorized One-Hot", badge: "np.eye Indexing" },
              { id: 2, title: "Problem 2", name: "Pairwise Distance", badge: "KNN Distance Matrix" },
              { id: 3, title: "Problem 3", name: "Moving Average", badge: "1D Convolution" },
              { id: 4, title: "Problem 4", name: "Mini-Batch SGD", badge: "Batch Iterator" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveProblem(p.id);
                  setSelectedScriptId(`part${p.id}`);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeProblem === p.id
                    ? "bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-cyan-400">{p.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {p.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">{p.name}</h4>
              </button>
            ))}
          </div>

          {/* Interactive Testbench Content */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            {/* Problem 1: One-Hot */}
            {activeProblem === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-1">
                    Problem 1: Vectorized One-Hot Encoding with `np.eye`
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Convert integer class labels into a one-hot binary matrix without loops or Python dict lookups.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block mb-2">Input Class Labels Array:</span>
                  <div className="flex flex-wrap gap-2">
                    {oneHotInput.map((val, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const next = [...oneHotInput];
                          next[idx] = (next[idx] + 1) % 4;
                          setOneHotInput(next);
                        }}
                        className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded-lg text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-500/30 transition"
                      >
                        Sample {idx}: Class {val} ↻
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-2">
                    (Click any badge to toggle class label 0..3)
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-cyan-900/40">
                  <div className="flex justify-between items-center text-xs font-mono text-cyan-400 mb-3 font-bold">
                    <span>Generated One-Hot Matrix: `np.eye(4)[labels]`</span>
                    <span>Shape: ({oneHotInput.length}, 4)</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-center text-xs font-mono">
                      <thead>
                        <tr className="text-slate-500 border-b border-slate-800">
                          <th className="p-1 text-left">Sample</th>
                          <th className="p-1 text-cyan-400">Class 0</th>
                          <th className="p-1 text-cyan-400">Class 1</th>
                          <th className="p-1 text-cyan-400">Class 2</th>
                          <th className="p-1 text-cyan-400">Class 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oneHotInput.map((val, r) => (
                          <tr key={r} className="border-b border-slate-900">
                            <td className="p-2 text-slate-400 font-sans text-left text-xs">Sample {r} (Label {val})</td>
                            {[0, 1, 2, 3].map((c) => (
                              <td
                                key={c}
                                className={`p-2 border border-slate-800/80 rounded ${
                                  val === c
                                    ? "bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold"
                                    : "bg-slate-900/40 text-slate-600"
                                }`}
                              >
                                {val === c ? 1 : 0}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Problem 2: Pairwise Distance */}
            {activeProblem === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-1">
                    Problem 2: Fully Vectorized Pairwise Euclidean Distance Matrix
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Compute distance matrix between query samples A (3, 2) and training anchors B (4, 2) using 3D broadcasting and algebraic BLAS GEMM expansion.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-2">3D Broadcasting Equation:</span>
                    <p className="text-slate-300">diff = A[:, np.newaxis, :] - B[np.newaxis, :, :]</p>
                    <p className="text-slate-400 mt-1"># Shape: (3, 1, 2) - (1, 4, 2) =&gt; (3, 4, 2)</p>
                    <p className="text-emerald-400 font-bold mt-2">D = np.sqrt(np.sum(diff**2, axis=2))</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-blue-400 font-bold block mb-2">Algebraic GEMM Expansion:</span>
                    <p className="text-slate-300">||a - b||² = ||a||² + ||b||² - 2(a · b)</p>
                    <p className="text-slate-400 mt-1"># Uses fast BLAS Level-3 GEMM matrix dot product</p>
                    <p className="text-emerald-400 font-bold mt-2">D_sq = A_sq + B_sq.T - 2*(A @ B.T)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Problem 3: Moving Average */}
            {activeProblem === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-1">
                    Problem 3: 1D Moving Average Filter with `np.convolve`
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Smooth raw time-series sensor fluctuations using rolling discrete box filter convolution.
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400">Select Window Size (w):</span>
                  {[2, 3, 4, 5].map((w) => (
                    <button
                      key={w}
                      onClick={() => setMaWindow(w)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition ${
                        maWindow === w
                          ? "bg-cyan-500 border-cyan-400 text-slate-950"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      w = {w}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-1">Raw Series ({rawTemps.length} points):</span>
                    <span className="text-slate-200 font-bold">[{rawTemps.join(", ")}]</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-cyan-900/50">
                    <span className="text-cyan-400 block mb-1 font-bold">
                      Moving Average Output ({computedMA.length} points):
                    </span>
                    <span className="text-cyan-200 font-bold">[{computedMA.join(", ")}]</span>
                  </div>
                </div>
              </div>
            )}

            {/* Problem 4: Mini-Batch SGD */}
            {activeProblem === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-1">
                    Problem 4: Synchronous Mini-Batch SGD Generator
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Construct a Python generator that yields synchronous batches of features and target labels without losing sample alignment.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <p className="text-slate-500"># Pure NumPy Batch Iterator Pattern</p>
                  <p>def generate_mini_batches(X, y, batch_size=32, shuffle=True):</p>
                  <p className="pl-4">indices = np.arange(len(X))</p>
                  <p className="pl-4">if shuffle: np.random.default_rng().shuffle(indices)</p>
                  <p className="pl-4">for i in range(0, len(X), batch_size):</p>
                  <p className="pl-8 text-cyan-300 font-bold">yield X[indices[i:i+batch_size]], y[indices[i:i+batch_size]]</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {s.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.py</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-cyan-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Practice Problems Suite
              </span>
            </div>
            <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Notes */}
      {activeTab === "teacher_notes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Teacher
            name="Sukanta Hui"
            title="Senior ML Instructor, Barrackpore Lab"
            quote="Solving algorithmic problems in pure vectorized NumPy transforms you from a code scripter into a real machine learning engineer. Mastering one-liners like np.eye(C)[labels] and loopless pairwise distances proves that you think in terms of memory layouts and hardware vector pipelines."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <span>📚 Comprehensive Topic Notes</span>
            </h3>
            <PlainTextPrint content={noteText} />
          </div>
        </div>
      )}

      {/* Tab 4: Quizzes & FAQs */}
      {activeTab === "faqs_questions" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <FAQTemplate questions={questions} />
        </div>
      )}
    </div>
  );
};

export default Topic21;

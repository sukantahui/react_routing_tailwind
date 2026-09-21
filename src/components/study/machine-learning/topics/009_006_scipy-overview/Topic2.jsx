import React, { useState } from "react";
import {
  GitCompare,
  Terminal,
  BookOpen,
  Code2,
  HelpCircle,
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
  Zap,
  CheckCircle2,
  Database
} from "lucide-react";

import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic2_files/01_scipy_vs_numpy_comparison.py?raw";
import pyCode2 from "./topic2_files/02_linear_algebra_speedup.py?raw";
import pyCode3 from "./topic2_files/03_sparse_matrices_demo.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

const comparisons = [
  {
    feature: "Core Scope",
    numpy: "N-dimensional array object, slicing, indexing, basic element-wise math.",
    scipy: "Full scientific stack: numerical calculus, probability distributions, optimization, signal processing.",
    badge: "Scope"
  },
  {
    feature: "Linear Algebra",
    numpy: "numpy.linalg (basic solvers, may omit full LAPACK on some builds).",
    scipy: "scipy.linalg (always compiled with full BLAS/LAPACK; includes LU, SVD, Schur, Cholesky, matrix functions).",
    badge: "Linear Algebra"
  },
  {
    feature: "Statistics & Probability",
    numpy: "Basic sample stats (mean, std, median) and raw pseudo-random numbers.",
    scipy: "scipy.stats (80+ continuous/discrete distributions with PDF, CDF, PPF, moments, hypothesis tests, z-score).",
    badge: "Statistics"
  },
  {
    feature: "Memory & Sparse Data",
    numpy: "Dense contiguous memory allocations only (every cell stored in RAM).",
    scipy: "scipy.sparse (CSR, CSC, COO, DOK, BSR matrices for high-dimensional 99% sparse ML data).",
    badge: "Memory Efficiency"
  },
  {
    feature: "Optimization & Solvers",
    numpy: "None (requires writing manual gradient descent loops).",
    scipy: "scipy.optimize (BFGS, Nelder-Mead, L-BFGS-B, curve_fit, least_squares, root finding).",
    badge: "Optimization"
  }
];

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_scipy_vs_numpy_comparison.py",
    title: "1. Functional Comparison & Seamless Interop",
    badge: "NumPy vs SciPy",
    code: pyCode1,
    summary: "Demonstrates zero-copy data passing between NumPy arrays and SciPy scientific routines."
  },
  {
    id: "part2",
    fileName: "02_linear_algebra_speedup.py",
    title: "2. scipy.linalg vs numpy.linalg Speedup",
    badge: "BLAS Benchmark",
    code: pyCode2,
    summary: "Benchmarks matrix inversions, eigenvalues, and LU decompositions using full LAPACK acceleration."
  },
  {
    id: "part3",
    fileName: "03_sparse_matrices_demo.py",
    title: "3. SciPy Sparse Matrices (CSR vs Dense RAM)",
    badge: "Sparse Storage",
    code: pyCode3,
    summary: "Constructs a 10,000x10,000 matrix with 99.9% zeros, showing 99% RAM savings with Compressed Sparse Row (CSR)."
  }
];

export default function Topic2() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [sparseSize, setSparseSize] = useState(5000);
  const [nonZeroCount, setNonZeroCount] = useState(20);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const denseRamMb = ((sparseSize * sparseSize * 8) / (1024 * 1024)).toFixed(2);
  const sparseRamKb = ((nonZeroCount * (8 + 4) + (sparseSize + 1) * 4) / 1024).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 border border-violet-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <GitCompare className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 2</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                SciPy vs NumPy: What SciPy Adds
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Understanding the complementary synergy between NumPy’s core array engine and SciPy’s compiled scientific algorithms, sparse matrix storage, and advanced LAPACK solvers.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Architecture Studio", icon: Sparkles },
              { id: "code", label: "Python Code Lab", icon: Code2 },
              { id: "notes", label: "Revision Notes", icon: BookOpen },
              { id: "quiz", label: "Practice & FAQs", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Comparison Studio */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Feature Comparison Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-violet-400" />
                  <span>NumPy vs SciPy Architectural Comparison</span>
                </h3>
                <span className="text-xs text-violet-300 font-mono">Side-by-Side Analysis</span>
              </div>

              <div className="space-y-3">
                {comparisons.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                  >
                    <div className="md:col-span-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold block mb-1">
                        {item.badge}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.feature}</h4>
                    </div>
                    <div className="md:col-span-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <span className="text-cyan-400 font-semibold font-mono block">NumPy (Foundation)</span>
                      <p className="text-slate-300 leading-relaxed">{item.numpy}</p>
                    </div>
                    <div className="hidden md:flex md:col-span-1 justify-center text-violet-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="md:col-span-4 p-3 rounded-lg bg-violet-950/20 border border-violet-800/40 text-xs space-y-1">
                      <span className="text-violet-300 font-semibold font-mono block">SciPy (Scientific Stack)</span>
                      <p className="text-slate-200 leading-relaxed">{item.scipy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Sparse Matrix RAM Calculator */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <span>SciPy Sparse Matrix (CSR) vs Dense RAM Calculator</span>
                </h3>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                  Memory Optimization Simulator
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-medium">Matrix Dimensions (N × N):</span>
                      <span className="text-emerald-400 font-mono font-bold">{sparseSize} × {sparseSize}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="20000"
                      step="1000"
                      value={sparseSize}
                      onChange={(e) => setSparseSize(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-medium">Non-Zero Entries Count:</span>
                      <span className="text-emerald-400 font-mono font-bold">{nonZeroCount}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="500"
                      step="5"
                      value={nonZeroCount}
                      onChange={(e) => setNonZeroCount(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold text-rose-400 block mb-1">
                        Dense NumPy ndarray
                      </span>
                      <p className="text-2xl font-black text-rose-300">{denseRamMb} MB</p>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">Stores all {sparseSize * sparseSize} float64 cells in RAM.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 block mb-1">
                        SciPy scipy.sparse.csr_matrix
                      </span>
                      <p className="text-2xl font-black text-emerald-300">{sparseRamKb} KB</p>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-semibold mt-2">
                      ~{((1 - (sparseRamKb / 1024) / denseRamMb) * 100).toFixed(1)}% Memory Saved!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Lab */}
        {activeTab === "code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedScriptId === script.id
                      ? "bg-violet-950/40 border-violet-500 shadow-md shadow-violet-950/40 scale-[1.02]"
                      : "bg-slate-900/80 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        selectedScriptId === script.id
                          ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
                          : "bg-slate-800 text-slate-500 border-slate-700"
                      }`}
                    >
                      {script.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">.py</span>
                  </div>
                  <p className="text-xs font-bold text-white truncate">{script.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{script.summary}</p>
                </button>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-violet-300">{activeScript.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
                </div>
                <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  NumPy vs SciPy Suite
                </span>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="space-y-6">
            <Teacher
              note={
                "Remember the distinction: NumPy is your storage container and basic arithmetic engine. SciPy is your scientific mathematics department. Whenever you need sparse representations, eigenvalue decompositions, or probability density calculations, turn directly to SciPy. — Sukanta Hui, Barrackpore ML Lab"
              }
            />
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <PlainTextPrint
                content={noteText}
                title="SciPy vs NumPy — Study Note"
                stampEnabled={true}
                showDownload={true}
                downloadButtonText="Download Topic 2 Study Note"
                downloadFileName="scipy_vs_numpy_note.txt"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Practice & FAQs */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <FAQTemplate
              title="SciPy vs NumPy — Domain FAQs"
              subtitle="Master the differences between ndarrays, compiled LAPACK routines, and sparse matrix representations"
              questions={questions}
            />
          </div>
        )}
      </div>
    </div>
  );
}

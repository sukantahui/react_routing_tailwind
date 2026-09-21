import React, { useState } from "react";
import {
  Activity,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Layers,
  Cpu,
  Compass,
  PieChart,
  Binary,
  Maximize2,
  CheckCircle2,
  Workflow
} from "lucide-react";

import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic0_files/01_intro_scipy_ecosystem.py?raw";
import pyCode2 from "./topic0_files/02_subpackage_overview.py?raw";
import pyCode3 from "./topic0_files/03_scipy_architecture.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

const subpackages = [
  {
    id: "stats",
    name: "scipy.stats",
    title: "Statistical Distributions & Hypothesis Testing",
    desc: "Probability distributions (Normal, Student-t, Poisson), descriptive stats (z-score, skew, kurtosis), and hypothesis testing.",
    icon: PieChart,
    color: "#38bdf8",
    methods: ["stats.norm", "stats.ttest_ind", "stats.zscore", "stats.describe", "stats.mode"],
    mlUse: "Feature standardization, p-value hypothesis testing, distribution fitting, outlier detection."
  },
  {
    id: "spatial",
    name: "scipy.spatial",
    title: "Spatial Data & Distance Metrics",
    desc: "Distance algorithms (Euclidean, Cityblock, Cosine, Minkowski), KDTree for rapid KNN spatial search, and Delaunay triangulation.",
    icon: Compass,
    color: "#818cf8",
    methods: ["distance.euclidean", "distance.cityblock", "distance.cosine", "KDTree", "Voronoi"],
    mlUse: "K-Nearest Neighbors indexing, embedding similarity metrics, clustering centroid matching."
  },
  {
    id: "linalg",
    name: "scipy.linalg",
    title: "Advanced Linear Algebra & Decompositions",
    desc: "Fast BLAS/LAPACK solvers, matrix inverses, eigenvalues, eigenvectors, SVD, LU, and Cholesky matrix factorizations.",
    icon: Binary,
    color: "#34d399",
    methods: ["linalg.inv", "linalg.solve", "linalg.det", "linalg.eig", "linalg.svd"],
    mlUse: "PCA dimensionality reduction, ordinary least squares linear regression, matrix inversion."
  },
  {
    id: "optimize",
    name: "scipy.optimize",
    title: "Numerical Optimization & Curve Fitting",
    desc: "Loss minimization algorithms (BFGS, Nelder-Mead, L-BFGS-B), non-linear least squares curve fitting, and root finding.",
    icon: Maximize2,
    color: "#f59e0b",
    methods: ["optimize.minimize", "optimize.curve_fit", "optimize.root", "optimize.least_squares"],
    mlUse: "Custom cost function optimization, logistic sigmoid parameter fitting, hyperparameter search."
  },
  {
    id: "sparse",
    name: "scipy.sparse",
    title: "Sparse Matrices & Compressed Storage",
    desc: "Compressed Sparse Row (CSR), CSC, and COO matrix representations to store high-dimensional sparse datasets with 99% RAM savings.",
    icon: Layers,
    color: "#ec4899",
    methods: ["sparse.csr_matrix", "sparse.csc_matrix", "sparse.eye", "sparse.vstack", "sparse.linalg.svds"],
    mlUse: "TF-IDF text feature matrices, graph adjacency matrices, recommendation collaborative filtering."
  }
];

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_intro_scipy_ecosystem.py",
    title: "1. SciPy Ecosystem & Architecture",
    badge: "Ecosystem Overview",
    code: pyCode1,
    summary: "Demonstrates how SciPy sits on top of NumPy, passing raw contiguous memory buffers directly into C/Fortran solvers."
  },
  {
    id: "part2",
    fileName: "02_subpackage_overview.py",
    title: "2. Core Subpackages & Essential Modules",
    badge: "Subpackage Tour",
    code: pyCode2,
    summary: "Walks through scipy.stats, scipy.spatial, scipy.linalg, and scipy.optimize with concrete ML examples."
  },
  {
    id: "part3",
    fileName: "03_scipy_architecture.py",
    title: "3. Compiled C/BLAS Acceleration Check",
    badge: "Low-Level Performance",
    code: pyCode3,
    summary: "Inspects underlying BLAS/LAPACK linking, confirming hardware SIMD acceleration across numerical routines."
  }
];

export default function Topic0() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [activeSubpackage, setActiveSubpackage] = useState(subpackages[0]);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Activity className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 0</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Introduction to SciPy
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                The cornerstone of scientific Python. Explore SciPy’s high-performance compiled mathematical subpackages powering classical statistics, spatial metrics, linear algebra, and machine learning optimization.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Ecosystem Studio", icon: Sparkles },
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
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
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

        {/* Tab 1: Interactive Ecosystem Studio */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Ecosystem Hierarchy Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-emerald-400" />
                  <span>Scientific Python Software Stack</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Layered Architecture</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Layer 4: ML Frameworks</span>
                  <h4 className="text-sm font-bold text-white">Scikit-Learn, PyTorch</h4>
                  <p className="text-xs text-slate-300">Estimators, Neural Nets, Model Selection pipelines.</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Layer 3: Scientific Algorithms</span>
                  <h4 className="text-sm font-bold text-white">SciPy</h4>
                  <p className="text-xs text-slate-300">Stats distributions, KDTree spatial search, numerical optimizers.</p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Layer 2: N-D Array Engine</span>
                  <h4 className="text-sm font-bold text-white">NumPy &amp; Pandas</h4>
                  <p className="text-xs text-slate-300">Fast contiguous ndarrays, vectorized SIMD math, tabular frames.</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">Layer 1: Compiled Kernels</span>
                  <h4 className="text-sm font-bold text-white">C / Fortran / BLAS</h4>
                  <p className="text-xs text-slate-300">LAPACK, OpenBLAS, MKL hardware vectorized primitives.</p>
                </div>
              </div>
            </div>

            {/* Subpackage Selector Studio */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Select SciPy Subpackage
                </h3>
                <div className="space-y-2">
                  {subpackages.map((sub) => {
                    const Icon = sub.icon;
                    const isSelected = activeSubpackage.id === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubpackage(sub)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 ${
                          isSelected
                            ? "bg-slate-850 border-emerald-500/80 shadow-md shadow-emerald-950/50"
                            : "bg-slate-900/70 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div
                          className="p-2 rounded-lg shrink-0 mt-0.5"
                          style={{ backgroundColor: `${sub.color}20`, color: sub.color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-xs font-mono font-bold text-white block">{sub.name}</span>
                          <span className="text-[11px] text-slate-400 block line-clamp-1">{sub.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subpackage Inspector Card */}
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${activeSubpackage.color}20`, color: activeSubpackage.color }}
                    >
                      <activeSubpackage.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{activeSubpackage.name}</h3>
                      <p className="text-xs text-slate-400">{activeSubpackage.title}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    High-Performance C/Fortran
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Functional Description
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed">{activeSubpackage.desc}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Core Functions &amp; Classes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeSubpackage.methods.map((method, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      🎯 Machine Learning Application
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeSubpackage.mlUse}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Lab */}
        {activeTab === "code" && (
          <div className="space-y-6">
            {/* Script Selection Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedScriptId === script.id
                      ? "bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40 scale-[1.02]"
                      : "bg-slate-900/80 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        selectedScriptId === script.id
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
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

            {/* Active Script Code Viewer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-emerald-300">{activeScript.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
                </div>
                <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  SciPy Demonstration Lab
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
                "Mastering SciPy is the bridge between pure mathematical theory and scalable machine learning engineering. While NumPy stores your matrices, SciPy gives you the statistical inference, probability calculus, and numerical solvers required to understand how algorithms converge under the hood. — Sukanta Hui, Barrackpore ML Lab"
              }
            />
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <PlainTextPrint
                content={noteText}
                title="Introduction to SciPy — Study Note"
                stampEnabled={true}
                showDownload={true}
                downloadButtonText="Download Topic 0 Study Note"
                downloadFileName="scipy_intro_note.txt"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Practice & FAQs */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <FAQTemplate
              title="Introduction to SciPy — Domain FAQs"
              subtitle="Master essential scientific Python architecture, subpackage roles, and ML integration patterns"
              questions={questions}
            />
          </div>
        )}
      </div>
    </div>
  );
}

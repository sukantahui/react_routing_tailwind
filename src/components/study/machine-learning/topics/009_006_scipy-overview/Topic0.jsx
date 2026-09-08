import React, { useState } from "react";
import {
  Activity,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Layers,
  Cpu,
  Compass,
  PieChart,
  Binary,
  Maximize2,
  CheckCircle2
} from "lucide-react";

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
    methods: ["stats.norm", "stats.ttest_ind", "stats.zscore", "stats.describe", "stats.mode"]
  },
  {
    id: "spatial",
    name: "scipy.spatial",
    title: "Spatial Data & Distance Metrics",
    desc: "Distance algorithms (Euclidean, Cityblock, Cosine, Minkowski), KDTree for rapid KNN spatial search, and Delaunay triangulation.",
    icon: Compass,
    color: "#818cf8",
    methods: ["distance.euclidean", "distance.cityblock", "distance.cosine", "KDTree", "Voronoi"]
  },
  {
    id: "linalg",
    name: "scipy.linalg",
    title: "Advanced Linear Algebra & Decompositions",
    desc: "Fast BLAS/LAPACK solvers, matrix inverses, eigenvalues, eigenvectors, SVD, LU, and Cholesky matrix factorizations.",
    icon: Binary,
    color: "#34d399",
    methods: ["linalg.inv", "linalg.solve", "linalg.det", "linalg.eig", "linalg.svd"]
  },
  {
    id: "optimize",
    name: "scipy.optimize",
    title: "Numerical Optimization & Curve Fitting",
    desc: "Loss minimization algorithms (BFGS, Nelder-Mead, L-BFGS-B), non-linear least squares curve fitting, and root finding.",
    icon: Maximize2,
    color: "#f59e0b",
    methods: ["optimize.minimize", "optimize.curve_fit", "optimize.root", "optimize.least_squares"]
  },
  {
    id: "signal",
    name: "scipy.signal",
    title: "Signal Processing & Filtering",
    desc: "Convolution, B-splines, FIR/IIR digital filter design, spectral analysis, and Fourier transforms for feature extraction.",
    icon: Activity,
    color: "#ec4899",
    methods: ["signal.convolve", "signal.butter", "signal.spectrogram", "signal.find_peaks"]
  }
];

export default function Topic0() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [activeSubpackage, setActiveSubpackage] = useState(subpackages[0]);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_intro_scipy_ecosystem.py", code: pyCode1 },
    { name: "02_subpackage_overview.py", code: pyCode2 },
    { name: "03_scipy_architecture.py", code: pyCode3 }
  ];

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

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
              { id: "quiz", label: "Knowledge Check", icon: HelpCircle }
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
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Studio */}
        {activeTab === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subpackages Navigator */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Layers className="w-4 h-4" />
                <span>SciPy Core Subpackages</span>
              </div>

              <div className="space-y-2.5">
                {subpackages.map((pkg) => {
                  const Icon = pkg.icon;
                  const isSel = activeSubpackage.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setActiveSubpackage(pkg)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSel
                          ? "bg-emerald-950/60 border-emerald-500 shadow-md"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" style={{ color: pkg.color }} />
                          <span className="font-semibold text-xs text-white">{pkg.name}</span>
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pkg.color }} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{pkg.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subpackage Deep Dive Inspector */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">Subpackage Spotlight</span>
                    <h2 className="text-xl font-bold text-white mt-0.5">{activeSubpackage.name}</h2>
                  </div>
                  <div
                    className="p-3 rounded-2xl border"
                    style={{ backgroundColor: `${activeSubpackage.color}15`, borderColor: `${activeSubpackage.color}40` }}
                  >
                    <activeSubpackage.icon className="w-6 h-6" style={{ color: activeSubpackage.color }} />
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Functional Description</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{activeSubpackage.desc}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Key API Methods &amp; Functions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeSubpackage.methods.map((method, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/60 font-mono text-xs text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture comparison box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-slate-200">Why SciPy in Machine Learning?</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      While NumPy provides the <span className="text-white font-mono">ndarray</span> container and basic linear algebra, SciPy supplies the scientific computational machinery. Scikit-learn, TensorFlow, and PyTorch rely heavily on SciPy routines for underlying statistical checks, KDTree searches, and numerical optimization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Underlying implementations: Compiled C, C++, and Fortran wrappers</span>
                <span className="text-emerald-400 font-semibold">Zero Python overhead</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((script, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {script.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
              <pre>{scripts[selectedScript].code}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Classroom Printable Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Notes"}</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Quiz */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Validation &amp; Knowledge Check</span>
              </div>
              {submittedQuiz && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300";
                        if (selected === optIdx) {
                          btnClass = "bg-emerald-950 border-emerald-500 text-white";
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnClass = "bg-emerald-900/80 border-emerald-500 text-white font-semibold";
                          } else if (selected === optIdx && selected !== q.correctAnswer) {
                            btnClass = "bg-rose-950 border-rose-500 text-rose-200";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-emerald-400">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSubmittedQuiz(!submittedQuiz)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                {submittedQuiz ? "Reset Quiz" : "Submit Answers"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

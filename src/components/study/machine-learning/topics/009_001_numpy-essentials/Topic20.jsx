import React, { useState, useMemo } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic20_files/01_multivariate_classification_clusters.py?raw";
import pyCode2 from "./topic20_files/02_synthetic_polynomial_regression_pipeline.py?raw";
import pyCode3 from "./topic20_files/03_imbalanced_churn_dataset_synthesis.py?raw";
import noteText from "./topic20_files/topic20_note.txt?raw";
import questions from "./topic20_files/topic20_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_multivariate_classification_clusters.py",
    title: "1. Multi-Class Gaussian Clusters",
    badge: "Gaussian Clusters",
    code: pyCode1,
    summary: "Generates 3 distinct 2D Gaussian clusters using multivariate_normal with customized covariance matrices and shuffles rows synchronously.",
  },
  {
    id: "part2",
    fileName: "02_synthetic_polynomial_regression_pipeline.py",
    title: "2. Non-Linear Polynomial Regression Data",
    badge: "Polynomial Curve",
    code: pyCode2,
    summary: "Synthesizes quadratic parabola y = 0.5x^2 - 3x + 5 + noise and expands features into design matrix [1 | x | x^2].",
  },
  {
    id: "part3",
    fileName: "03_imbalanced_churn_dataset_synthesis.py",
    title: "3. Tabular Churn Dataset with Imbalance",
    badge: "Tabular Churn",
    code: pyCode3,
    summary: "Creates realistic tabular data mixing uniform, normal, poisson, and categorical distributions with sigmoid-activated class imbalance.",
  },
];

const Topic20 = () => {
  const [activeTab, setActiveTab] = useState("synthetic_generator");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [datasetType, setDatasetType] = useState("clusters"); // "clusters", "polynomial"
  const [noiseLevel, setNoiseLevel] = useState(1.0);
  const [sampleCount, setSampleCount] = useState(60);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Deterministic cluster generation
  const clusterPoints = useMemo(() => {
    if (datasetType !== "clusters") return [];
    const pts = [];
    const perClass = Math.floor(sampleCount / 3);

    // Seeded pseudo random
    let s = 42;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const gauss = () => {
      const u1 = Math.max(1e-15, rnd());
      const u2 = rnd();
      return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    };

    // Class 0: Center (-3, -3)
    for (let i = 0; i < perClass; i++) {
      pts.push({
        x: -3.0 + gauss() * noiseLevel,
        y: -3.0 + gauss() * noiseLevel,
        cls: 0,
        color: "#38bdf8", // Sky blue
      });
    }
    // Class 1: Center (3, 3)
    for (let i = 0; i < perClass; i++) {
      pts.push({
        x: 3.0 + gauss() * noiseLevel,
        y: 3.0 + gauss() * noiseLevel,
        cls: 1,
        color: "#f43f5e", // Rose
      });
    }
    // Class 2: Center (0, 4)
    for (let i = 0; i < perClass; i++) {
      pts.push({
        x: 0.0 + gauss() * noiseLevel,
        y: 4.0 + gauss() * noiseLevel,
        cls: 2,
        color: "#10b981", // Emerald
      });
    }
    return pts;
  }, [datasetType, noiseLevel, sampleCount]);

  // Deterministic polynomial points
  const polyPoints = useMemo(() => {
    if (datasetType !== "polynomial") return [];
    const pts = [];
    let s = 101;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const gauss = () => {
      const u1 = Math.max(1e-15, rnd());
      const u2 = rnd();
      return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    };

    for (let i = 0; i < sampleCount; i++) {
      const x = -4.0 + (8.0 * i) / sampleCount; // [-4, 4]
      const yTrue = 0.5 * (x * x) - 1.5 * x - 2.0;
      const yNoisy = yTrue + gauss() * noiseLevel;
      pts.push({ x, yNoisy, yTrue });
    }
    return pts;
  }, [datasetType, noiseLevel, sampleCount]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-fuchsia-900/60 via-slate-900 to-rose-900/60 border border-fuchsia-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 text-xs font-semibold rounded-full border border-fuchsia-500/40">
                Topic 20 • Practical Case Study
              </span>
              <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-xs font-semibold rounded-full border border-rose-500/40">
                Worked Example 4
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-fuchsia-200 via-rose-100 to-pink-300 bg-clip-text text-transparent">
              Worked Example 4: Random Dataset Generation
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Synthesize production-grade machine learning datasets from scratch: multivariate Gaussian clusters, non-linear polynomial regression targets with additive noise, and imbalanced tabular churn records.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "synthetic_generator", label: "Interactive 2D Dataset Studio", icon: "🌌" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-fuchsia-500 text-slate-950 shadow-lg shadow-fuchsia-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive 2D Dataset Studio */}
      {activeTab === "synthetic_generator" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dataset Type Selector */}
              <div>
                <label className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider block mb-2">
                  1. Dataset Geometry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "clusters", label: "Gaussian Clusters", sub: "3-Class Classification" },
                    { id: "polynomial", label: "Polynomial Curve", sub: "Non-Linear Regression" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setDatasetType(btn.id)}
                      className={`p-3 rounded-xl border text-center transition ${
                        datasetType === btn.id
                          ? "bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-200 font-bold shadow-md shadow-fuchsia-500/10"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="text-xs font-mono">{btn.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{btn.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Noise Level Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    2. Additive Noise (σ)
                  </label>
                  <span className="text-xs font-mono text-rose-400 font-bold">σ = {noiseLevel.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.2"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0.2 (Clean)</span>
                  <span>1.5</span>
                  <span>3.0 (High Variance)</span>
                </div>
              </div>

              {/* Sample Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-pink-300 uppercase tracking-wider">
                    3. Total Samples (N)
                  </label>
                  <span className="text-xs font-mono text-pink-400 font-bold">{sampleCount} points</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="150"
                  step="15"
                  value={sampleCount}
                  onChange={(e) => setSampleCount(Number(e.target.value))}
                  className="w-full accent-pink-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>30</span>
                  <span>90</span>
                  <span>150</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scatter Plot Visualizer */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-200">
                  {datasetType === "clusters" ? "Multi-Class Gaussian Scatter (2D)" : "Quadratic Polynomial Regression Scatter"}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {datasetType === "clusters"
                    ? "X ~ N(μ_c, Σ_c), y ∈ {0, 1, 2}"
                    : "y = 0.5x² - 1.5x - 2 + ε, where ε ~ N(0, σ²)"}
                </p>
              </div>

              {datasetType === "clusters" && (
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span> Class 0 (μ=[-3,-3])</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Class 1 (μ=[3,3])</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Class 2 (μ=[0,4])</span>
                </div>
              )}
            </div>

            {/* SVG Plot */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex justify-center">
              <svg viewBox="-8 -8 16 16" className="w-full max-w-xl h-72 md:h-96">
                {/* Coordinate Grid Axes */}
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#334155" strokeWidth="0.1" strokeDasharray="0.3" />
                <line x1="0" y1="-8" x2="0" y2="8" stroke="#334155" strokeWidth="0.1" strokeDasharray="0.3" />

                {/* Gaussian Clusters Points */}
                {datasetType === "clusters" &&
                  clusterPoints.map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={-pt.y} /* Flip Y for Cartesian coordinates */
                      r="0.25"
                      fill={pt.color}
                      opacity="0.85"
                      className="transition-all duration-300 hover:scale-150 cursor-pointer"
                    />
                  ))}

                {/* Polynomial Regression Line & Points */}
                {datasetType === "polynomial" && (
                  <>
                    {/* True Function Curve */}
                    <path
                      d={polyPoints.reduce((acc, p, idx) => {
                        const cmd = idx === 0 ? "M" : "L";
                        return `${acc} ${cmd} ${p.x} ${-p.yTrue}`;
                      }, "")}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="0.15"
                      opacity="0.7"
                    />
                    {/* Noisy Sample Points */}
                    {polyPoints.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={-p.yNoisy}
                        r="0.2"
                        fill="#ec4899"
                        opacity="0.9"
                      />
                    ))}
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-fuchsia-950/40 border-fuchsia-500 shadow-lg shadow-fuchsia-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
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
                <h3 className="text-lg font-bold text-fuchsia-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Worked Example 4 Suite
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
            quote="Creating synthetic data is an indispensable tool for machine learning researchers and practitioners. When developing new algorithms or testing edge cases (like extreme class imbalance or non-linear polynomial curvatures), synthetic datasets let you isolate bugs with mathematically guaranteed ground truth."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-fuchsia-300 mb-4 flex items-center gap-2">
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

export default Topic20;

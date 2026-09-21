import React, { useState } from "react";
import {
  Activity,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  TrendingUp,
  Sliders,
  Layers,
  CheckCircle2,
  LineChart
} from "lucide-react";

import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic4_files/01_continuous_distributions_norm.py?raw";
import pyCode2 from "./topic4_files/02_discrete_distributions_binom_poisson.py?raw";
import pyCode3 from "./topic4_files/03_distribution_methods_pdf_cdf_ppf_rvs.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_continuous_distributions_norm.py",
    title: "1. Continuous Distributions: Normal (Gaussian)",
    badge: "Continuous rv_continuous",
    code: pyCode1,
    summary: "Visualizes standard and parameterized normal distributions using norm.pdf(), norm.cdf(), and norm.ppf()."
  },
  {
    id: "part2",
    fileName: "02_discrete_distributions_binom_poisson.py",
    title: "2. Discrete Distributions: Binomial & Poisson",
    badge: "Discrete rv_discrete",
    code: pyCode2,
    summary: "Models binary conversion trials with binom.pmf() and server request counts with poisson.pmf()."
  },
  {
    id: "part3",
    fileName: "03_distribution_methods_pdf_cdf_ppf_rvs.py",
    title: "3. Unified Distribution Object Methods",
    badge: "API Architecture",
    code: pyCode3,
    summary: "Comprehensive guide to the 4 universal methods: .pdf(), .cdf(), .ppf(), and .rvs() with frozen objects."
  }
];

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [evalX, setEvalX] = useState(1.0);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Calculate Normal PDF & CDF for interactive visualizer
  const calcPdf = (x, m, s) => {
    return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - m) / s, 2));
  };

  // Standard Normal CDF approximation (erf-based)
  const erf = (x) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const calcCdf = (x, m, s) => {
    return 0.5 * (1 + erf((x - m) / (s * Math.sqrt(2))));
  };

  const currentPdf = calcPdf(evalX, mu, sigma);
  const currentCdf = calcCdf(evalX, mu, sigma);

  // Generate 25 points for SVG curve preview
  const curvePoints = [];
  const minX = mu - 3.5 * sigma;
  const maxX = mu + 3.5 * sigma;
  const step = (maxX - minX) / 40;
  for (let x = minX; x <= maxX; x += step) {
    curvePoints.push({ x, y: calcPdf(x, mu, sigma) });
  }

  const maxY = Math.max(...curvePoints.map((p) => p.y), 0.01);
  const svgWidth = 500;
  const svgHeight = 160;
  const pathD = curvePoints
    .map((p, idx) => {
      const px = ((p.x - minX) / (maxX - minX)) * svgWidth;
      const py = svgHeight - (p.y / maxY) * (svgHeight - 20) - 10;
      return `${idx === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(" ");

  const evalPx = Math.max(0, Math.min(svgWidth, ((evalX - minX) / (maxX - minX)) * svgWidth));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <LineChart className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 4</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Probability Distributions in <code className="text-blue-300 font-mono">scipy.stats</code>
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Continuous &amp; discrete random variable architectures: Normal (Gaussian), Binomial, Poisson, and the unified <code className="text-blue-300 font-mono">.pdf()</code>, <code className="text-blue-300 font-mono">.cdf()</code>, <code className="text-blue-300 font-mono">.ppf()</code>, and <code className="text-blue-300 font-mono">.rvs()</code> API.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Distribution Studio", icon: Sparkles },
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
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
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

        {/* Tab 1: Interactive Distribution Studio */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Interactive Normal Visualizer */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span>Interactive Gaussian Curve Simulator: $\mathcal&#123;N&#125;(\mu, \sigma^2)$</span>
                </h3>
                <span className="text-xs px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 font-mono">
                  Live SciPy PDF / CDF Evaluator
                </span>
              </div>

              {/* Slider Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Mean ($\mu$ / loc):</span>
                    <span className="text-blue-400 font-mono font-bold">{mu}</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.5"
                    value={mu}
                    onChange={(e) => setMu(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Std Dev ($\sigma$ / scale):</span>
                    <span className="text-blue-400 font-mono font-bold">{sigma}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={sigma}
                    onChange={(e) => setSigma(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Evaluation Point ($x$):</span>
                    <span className="text-emerald-400 font-mono font-bold">{evalX.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={mu - 3 * sigma}
                    max={mu + 3 * sigma}
                    step="0.1"
                    value={evalX}
                    onChange={(e) => setEvalX(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Curve Display */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>x = {minX.toFixed(1)}</span>
                  <span>$\mu = {mu}$</span>
                  <span>x = {maxX.toFixed(1)}</span>
                </div>

                <div className="relative w-full overflow-hidden">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-40">
                    {/* Grid line */}
                    <line x1="0" y1={svgHeight - 10} x2={svgWidth} y2={svgHeight - 10} stroke="#334155" strokeWidth="1" />
                    {/* PDF Curve */}
                    <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3" />
                    {/* Eval X Marker Line */}
                    <line x1={evalPx} y1="0" x2={evalPx} y2={svgHeight - 10} stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                    <circle cx={evalPx} cy={svgHeight - (currentPdf / maxY) * (svgHeight - 20) - 10} r="5" fill="#10b981" />
                  </svg>
                </div>
              </div>

              {/* SciPy Method Values Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase block">
                    norm.pdf(x={evalX.toFixed(2)})
                  </span>
                  <p className="text-xl font-bold text-sky-300 font-mono">{currentPdf.toFixed(4)}</p>
                  <p className="text-[10px] text-slate-400">Height of probability density curve</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                    norm.cdf(x={evalX.toFixed(2)})
                  </span>
                  <p className="text-xl font-bold text-emerald-300 font-mono">{(currentCdf * 100).toFixed(2)}%</p>
                  <p className="text-[10px] text-slate-400">Area under curve to the left ($P(X \le x)$)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">
                    norm.sf(x={evalX.toFixed(2)})
                  </span>
                  <p className="text-xl font-bold text-purple-300 font-mono">{((1 - currentCdf) * 100).toFixed(2)}%</p>
                  <p className="text-[10px] text-slate-400">Right tail probability ($P(X &gt; x)$)</p>
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
                      ? "bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/40 scale-[1.02]"
                      : "bg-slate-900/80 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        selectedScriptId === script.id
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
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
                  <h3 className="text-base font-bold text-blue-300">{activeScript.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
                </div>
                <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  Probability Distributions Suite
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
                "Remember the core 4: `.pdf()` for density, `.cdf()` for cumulative area, `.ppf()` for quantile cutoff lookups, and `.rvs()` for generating synthetic datasets. In ML classification and Bayesian modeling, mastering these methods is fundamental to understanding probability thresholds and priors. — Sukanta Hui, Barrackpore ML Lab"
              }
            />
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <PlainTextPrint
                content={noteText}
                title="Probability Distributions — Study Note"
                stampEnabled={true}
                showDownload={true}
                downloadButtonText="Download Topic 4 Study Note"
                downloadFileName="scipy_distributions_note.txt"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Practice & FAQs */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <FAQTemplate
              title="Probability Distributions — Domain FAQs"
              subtitle="Master continuous/discrete distribution objects, PDF/CDF/PPF/RVS methods, and parameter freezing"
              questions={questions}
            />
          </div>
        )}
      </div>
    </div>
  );
}

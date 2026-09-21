import React, { useState } from "react";
import {
  PieChart,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Calculator,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Sliders,
  CheckCircle2
} from "lucide-react";

import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic3_files/01_descriptive_stats_describe.py?raw";
import pyCode2 from "./topic3_files/02_trimmed_and_geometric_means.py?raw";
import pyCode3 from "./topic3_files/03_skewness_and_kurtosis.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const presets = [
  { name: "Barrackpore Exam Scores", values: [78, 85, 92, 88, 75, 60, 95, 89, 90, 82, 88, 94] },
  { name: "Salaries with Outlier (₹ Lakhs)", values: [3.5, 4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 6.0, 50.0] },
  { name: "Symmetric Normal Feature", values: [10, 12, 14, 15, 15, 16, 16, 17, 18, 20] },
  { name: "Heavy Tailed Metric", values: [2, 3, 5, 8, 12, 20, 35, 70, 150] }
];

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_descriptive_stats_describe.py",
    title: "1. Single-Pass describe() Metrics",
    badge: "Summary NamedTuple",
    code: pyCode1,
    summary: "Demonstrates stats.describe() calculating nobs, minmax, mean, variance, skewness, and kurtosis in one C pass."
  },
  {
    id: "part2",
    fileName: "02_trimmed_and_geometric_means.py",
    title: "2. Trimmed, Geometric & Harmonic Means",
    badge: "Central Tendency",
    code: pyCode2,
    summary: "Compares outlier-robust stats.trim_mean, growth-rate stats.gmean, and classification F1-metric stats.hmean."
  },
  {
    id: "part3",
    fileName: "03_skewness_and_kurtosis.py",
    title: "3. Skewness & Fisher Kurtosis Deep Dive",
    badge: "Shape & Tails",
    code: pyCode3,
    summary: "Visualizes positive vs negative skewness and explains Fisher's excess kurtosis where Normal = 0.0."
  }
];

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [dataInput, setDataInput] = useState(presets[0].values.join(", "));
  const [trimPct, setTrimPct] = useState(10);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Parse numbers
  const parseNumbers = () => {
    return dataInput
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);
  };

  const nums = parseNumbers();
  const n = nums.length;

  const mean = n > 0 ? nums.reduce((a, b) => a + b, 0) / n : 0;
  const median = n > 0 ? (n % 2 === 0 ? (nums[n / 2 - 1] + nums[n / 2]) / 2 : nums[Math.floor(n / 2)]) : 0;

  // Trimmed mean
  const trimCount = Math.floor(n * (trimPct / 100));
  const trimmedSlice = n > 2 * trimCount ? nums.slice(trimCount, n - trimCount) : nums;
  const trimmedMean = trimmedSlice.length > 0 ? trimmedSlice.reduce((a, b) => a + b, 0) / trimmedSlice.length : 0;

  // Variance & Std Dev (sample ddof=1)
  const variance = n > 1 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1) : 0;
  const stdDev = Math.sqrt(variance);

  // Skewness
  const m3 = n > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) / n : 0;
  const m2 = n > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n : 0;
  const skewness = m2 > 0 ? m3 / Math.pow(m2, 1.5) : 0;

  // Kurtosis (Fisher Excess Kurtosis)
  const m4 = n > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0) / n : 0;
  const kurtosis = m2 > 0 ? m4 / Math.pow(m2, 2) - 3.0 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <PieChart className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 3</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Descriptive Statistics with <code className="text-teal-300 font-mono">scipy.stats</code>
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Computing single-pass moments with <code className="text-teal-300 font-mono">stats.describe()</code>, robust trimmed/harmonic means, skewness asymmetry, and Fisher’s excess kurtosis for exploratory ML pipelines.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Moments Calculator", icon: Sparkles },
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
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
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

        {/* Tab 1: Interactive Calculator Studio */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Input & Presets Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-teal-400" />
                  <span>Live SciPy Stats Moments Calculator</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDataInput(p.values.join(", "))}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                  Comma-Separated Data Array:
                </label>
                <input
                  type="text"
                  value={dataInput}
                  onChange={(e) => setDataInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-teal-300 focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <Sliders className="w-4 h-4 text-teal-400 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Trim Percentage (Trimmed Mean):</span>
                    <span className="text-teal-400 font-mono font-bold">{trimPct}% per tail</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="5"
                    value={trimPct}
                    onChange={(e) => setTrimPct(parseInt(e.target.value))}
                    className="w-full accent-teal-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Sample Size (nobs)</span>
                <p className="text-xl font-bold text-white font-mono">{n}</p>
                <span className="text-[10px] text-slate-400">Total points</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">Arithmetic Mean</span>
                <p className="text-xl font-bold text-teal-300 font-mono">{mean.toFixed(2)}</p>
                <span className="text-[10px] text-slate-400">1st moment</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">Trimmed Mean ({trimPct}%)</span>
                <p className="text-xl font-bold text-sky-300 font-mono">{trimmedMean.toFixed(2)}</p>
                <span className="text-[10px] text-slate-400">stats.trim_mean</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Variance / Std</span>
                <p className="text-xl font-bold text-emerald-300 font-mono">{stdDev.toFixed(2)}</p>
                <span className="text-[10px] text-slate-400">Var: {variance.toFixed(2)}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Skewness (Asymmetry)</span>
                <p className="text-xl font-bold text-amber-300 font-mono">{skewness.toFixed(3)}</p>
                <span className="text-[10px] text-slate-400">{skewness > 0.5 ? "Right Skewed" : skewness < -0.5 ? "Left Skewed" : "Symmetric"}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">Fisher Kurtosis</span>
                <p className="text-xl font-bold text-purple-300 font-mono">{kurtosis.toFixed(3)}</p>
                <span className="text-[10px] text-slate-400">{kurtosis > 0 ? "Leptokurtic (Tails)" : "Platykurtic"}</span>
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
                      ? "bg-teal-950/40 border-teal-500 shadow-md shadow-teal-950/40 scale-[1.02]"
                      : "bg-slate-900/80 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        selectedScriptId === script.id
                          ? "bg-teal-500/20 text-teal-300 border-teal-500/40"
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
                  <h3 className="text-base font-bold text-teal-300">{activeScript.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
                </div>
                <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  Descriptive Stats Suite
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
                "Always check skewness and kurtosis before applying parametric models like Linear Regression or PCA. High skewness (>1.0) means you must apply a log or Box-Cox transform. And when dealing with real-world financial or salary data with outliers, use `stats.trim_mean` instead of standard `np.mean`. — Sukanta Hui, Barrackpore ML Lab"
              }
            />
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <PlainTextPrint
                content={noteText}
                title="Descriptive Statistics with scipy.stats — Study Note"
                stampEnabled={true}
                showDownload={true}
                downloadButtonText="Download Topic 3 Study Note"
                downloadFileName="scipy_descriptive_stats_note.txt"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Practice & FAQs */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <FAQTemplate
              title="Descriptive Statistics with scipy.stats — Domain FAQs"
              subtitle="Master single-pass describe() routines, trimmed/geometric means, skewness, and Fisher kurtosis"
              questions={questions}
            />
          </div>
        )}
      </div>
    </div>
  );
}

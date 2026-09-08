import React, { useState } from "react";
import {
  PieChart,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Calculator,
  BarChart3,
  TrendingUp,
  AlertCircle
} from "lucide-react";

import pyCode1 from "./topic3_files/01_descriptive_stats_describe.py?raw";
import pyCode2 from "./topic3_files/02_trimmed_and_geometric_means.py?raw";
import pyCode3 from "./topic3_files/03_skewness_and_kurtosis.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const presets = [
  { name: "Barrackpore Exam Scores", values: [78, 85, 92, 88, 75, 60, 95, 89, 90, 82, 88, 94] },
  { name: "Salaries with High Outlier (₹ Lakhs)", values: [3.5, 4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 6.0, 50.0] },
  { name: "Symmetric Normal Feature", values: [10, 12, 14, 15, 15, 16, 16, 17, 18, 20] },
  { name: "Heavy Tailed Metric", values: [2, 3, 5, 8, 12, 20, 35, 70, 150] }
];

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [dataInput, setDataInput] = useState(presets[0].values.join(", "));
  const [trimPct, setTrimPct] = useState(10);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_descriptive_stats_describe.py", code: pyCode1 },
    { name: "02_trimmed_and_geometric_means.py", code: pyCode2 },
    { name: "03_skewness_and_kurtosis.py", code: pyCode3 }
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

  // Parse and calculate descriptive statistics
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

  // Mode
  const counts = {};
  nums.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
  let modeVal = nums[0];
  let maxCount = 0;
  Object.keys(counts).forEach((k) => {
    if (counts[k] > maxCount) {
      maxCount = counts[k];
      modeVal = parseFloat(k);
    }
  });

  // Variance & Std Dev (sample, ddof=1)
  const variance = n > 1 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1) : 0;
  const stdDev = Math.sqrt(variance);

  // Skewness (Sample skewness formula)
  const m3 = n > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) / n : 0;
  const m2 = n > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n : 0;
  const skewness = m2 > 0 ? m3 / Math.pow(m2, 1.5) : 0;

  // Kurtosis (Fisher's definition)
  const m4 = n > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0) / n : 0;
  const kurtosis = m2 > 0 ? m4 / Math.pow(m2, 2) - 3.0 : 0;

  // Trimmed Mean
  const cutCount = Math.floor((trimPct / 100) * n);
  const trimmedSlice = nums.slice(cutCount, n - cutCount);
  const trimMean = trimmedSlice.length > 0 ? trimmedSlice.reduce((a, b) => a + b, 0) / trimmedSlice.length : mean;

  // Geometric Mean (for positive values)
  const allPositive = nums.every((x) => x > 0);
  const gMean = allPositive && n > 0 ? Math.exp(nums.reduce((acc, val) => acc + Math.log(val), 0) / n) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <PieChart className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 3</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                scipy.stats: Descriptive Statistics
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master statistical profiling of Machine Learning features. Calculate higher-order moments (skewness, kurtosis), robust trimmed means, and comprehensive summaries via <code className="text-emerald-400">stats.describe()</code>.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Descriptive Statistics Studio", icon: Sparkles },
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
          <div className="space-y-6">
            {/* Input & Presets */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Calculator className="w-4 h-4" />
                  <span>Feature Dataset Input (Comma Separated)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDataInput(preset.values.join(", "))}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs md:text-sm font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. 10, 15, 20, 25, 30"
              />
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">Sample Size (nobs)</span>
                <div className="text-lg font-bold text-white font-mono">{n}</div>
                <span className="text-[10px] text-slate-500">Total Observations</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">Arithmetic Mean</span>
                <div className="text-lg font-bold text-emerald-400 font-mono">{mean.toFixed(2)}</div>
                <span className="text-[10px] text-slate-500">Standard average</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">{trimPct}% Trimmed Mean</span>
                <div className="text-lg font-bold text-teal-400 font-mono">{trimMean.toFixed(2)}</div>
                <span className="text-[10px] text-emerald-400">stats.trim_mean()</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">Median &amp; Mode</span>
                <div className="text-lg font-bold text-white font-mono">{median.toFixed(2)} / {modeVal}</div>
                <span className="text-[10px] text-slate-500">Mode count: {maxCount}</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">Std Dev &amp; Variance</span>
                <div className="text-lg font-bold text-cyan-400 font-mono">{stdDev.toFixed(2)} / {variance.toFixed(2)}</div>
                <span className="text-[10px] text-slate-500">Spread dispersion</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">Skewness (3rd Moment)</span>
                <div className="text-lg font-bold text-amber-400 font-mono">{skewness.toFixed(3)}</div>
                <span className="text-[10px] text-amber-400/90">
                  {skewness > 0.5 ? "Right-Skewed" : skewness < -0.5 ? "Left-Skewed" : "Symmetric"}
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">Fisher Kurtosis (4th)</span>
                <div className="text-lg font-bold text-fuchsia-400 font-mono">{kurtosis.toFixed(3)}</div>
                <span className="text-[10px] text-fuchsia-400/90">
                  {kurtosis > 0 ? "Leptokurtic (Heavy tail)" : kurtosis < 0 ? "Platykurtic" : "Mesokurtic"}
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-slate-400">Geometric Mean</span>
                <div className="text-lg font-bold text-indigo-400 font-mono">{gMean !== null ? gMean.toFixed(2) : "N/A (<=0)"}</div>
                <span className="text-[10px] text-slate-500">stats.gmean()</span>
              </div>
            </div>

            {/* Skewness Diagnostic Guide */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Feature Engineering Recommendation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {Math.abs(skewness) > 0.75 ? (
                  <span className="text-amber-300">
                    ⚠️ <b>High Skewness Detected ({skewness.toFixed(2)}):</b> In linear regression or neural networks, consider applying a log transform (<code className="text-white font-mono">np.log1p</code>) or a PowerTransformer (Box-Cox / Yeo-Johnson) to stabilize variance and achieve normal residual behavior.
                  </span>
                ) : (
                  <span className="text-emerald-300">
                    ✅ <b>Well-Behaved Distribution ({skewness.toFixed(2)}):</b> Skewness is within normal bounds. Standard feature scaling (StandardScaler or MinMaxScaler) will work effectively without requiring non-linear monotonic transforms.
                  </span>
                )}
              </p>
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

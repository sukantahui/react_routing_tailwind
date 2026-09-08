import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  BarChart,
  Box,
  Radio,
  Split
} from "lucide-react";

import pyCode1 from "./topic4_files/01_barplot_ci_estimator.py?raw";
import pyCode2 from "./topic4_files/02_boxplot_quartiles.py?raw";
import pyCode3 from "./topic4_files/03_violinplot_distribution.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

const trackStats = {
  "Deep Learning": {
    mean: 48,
    median: 46,
    q1: 42,
    q3: 54,
    min: 36,
    max: 60,
    outliers: [64],
    color: "#ec4899",
    violinPath: "M 120 70 C 145 100, 150 140, 120 180 C 90 140, 95 100, 120 70 Z"
  },
  "Data Science": {
    mean: 42,
    median: 41,
    q1: 37,
    q3: 47,
    min: 30,
    max: 53,
    outliers: [],
    color: "#3b82f6",
    violinPath: "M 250 85 C 275 115, 275 155, 250 195 C 225 155, 225 115, 250 85 Z"
  },
  "Web ML": {
    mean: 34,
    median: 33,
    q1: 29,
    q3: 39,
    min: 24,
    max: 45,
    outliers: [50],
    color: "#10b981",
    violinPath: "M 380 110 C 400 135, 405 170, 380 210 C 355 170, 360 135, 380 110 Z"
  }
};

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [plotType, setPlotType] = useState("boxplot"); // 'barplot' | 'boxplot' | 'violinplot'
  const [estimator, setEstimator] = useState("mean");
  const [splitViolin, setSplitViolin] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_barplot_ci_estimator.py", code: pyCode1 },
    { name: "02_boxplot_quartiles.py", code: pyCode2 },
    { name: "03_violinplot_distribution.py", code: pyCode3 }
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
        <div className="bg-gradient-to-r from-pink-950 via-slate-900 to-purple-950 border border-pink-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-pink-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Box className="w-4 h-4" />
                <span>Machine Learning Module • Topic 4</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Categorical Plots: barplot, boxplot, violinplot
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Compare numerical metrics across categorical features. Master central tendency estimators, IQR quartiles, and continuous split-violin distributions.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Categorical Plot Studio", icon: Sparkles },
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
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30"
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
            {/* Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Plot Family Selector</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "barplot", label: "Barplot", icon: BarChart },
                  { id: "boxplot", label: "Boxplot", icon: Box },
                  { id: "violinplot", label: "Violin", icon: Radio }
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlotType(p.id)}
                      className={`p-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        plotType === p.id
                          ? "bg-pink-600 text-white border border-pink-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Conditional Options */}
              {plotType === "barplot" && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Estimator Function:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setEstimator("mean")}
                      className={`p-2 rounded-lg text-xs font-mono ${
                        estimator === "mean" ? "bg-pink-600/30 border border-pink-500 text-pink-300" : "bg-slate-950 border border-slate-800 text-slate-400"
                      }`}
                    >
                      estimator=np.mean
                    </button>
                    <button
                      onClick={() => setEstimator("median")}
                      className={`p-2 rounded-lg text-xs font-mono ${
                        estimator === "median" ? "bg-pink-600/30 border border-pink-500 text-pink-300" : "bg-slate-950 border border-slate-800 text-slate-400"
                      }`}
                    >
                      estimator=np.median
                    </button>
                  </div>
                </div>
              )}

              {plotType === "violinplot" && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Split className="w-4 h-4 text-pink-400" />
                    <span>Split Gender Halves (split=True):</span>
                  </div>
                  <button
                    onClick={() => setSplitViolin(!splitViolin)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      splitViolin ? "bg-pink-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {splitViolin ? "On" : "Off"}
                  </button>
                </div>
              )}

              {/* Code preview snippet */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-pink-400 font-semibold mb-1"># Generated Code:</div>
                <div className="text-purple-300">sns.{plotType}(</div>
                <div className="pl-3 text-slate-400">data=df,</div>
                <div className="pl-3 text-slate-400">x="Track",</div>
                <div className="pl-3 text-slate-400">y="Stipend_k",</div>
                {plotType === "barplot" && estimator === "median" && (
                  <div className="pl-3 text-emerald-300">estimator=np.median,</div>
                )}
                {plotType === "violinplot" && splitViolin && (
                  <div className="pl-3 text-emerald-300">hue="Gender", split=True,</div>
                )}
                <div className="pl-3 text-pink-300">palette="Set2"</div>
                <div className="text-purple-300">)</div>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Box className="w-4 h-4 text-pink-400" />
                  Live Rendering: sns.{plotType}()
                </span>
                <span className="text-xs font-mono text-slate-400">Metric: Monthly Stipend (₹ in Thousands)</span>
              </div>

              {/* Dynamic SVG */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="500" height="280" viewBox="0 0 500 280" className="max-w-full">
                  {/* Grid lines */}
                  <line x1="50" y1="50" x2="460" y2="50" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="110" x2="460" y2="110" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="460" y2="170" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="230" x2="460" y2="230" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#64748b" strokeWidth="1.5" />

                  {/* Y Axis ticks */}
                  <text x="40" y="234" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">₹20k</text>
                  <text x="40" y="174" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">₹35k</text>
                  <text x="40" y="114" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">₹50k</text>
                  <text x="40" y="54" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">₹65k</text>

                  {/* Render Categories */}
                  {Object.entries(trackStats).map(([trk, stat], i) => {
                    const centerX = 120 + i * 130;

                    // Bar Plot Mode
                    if (plotType === "barplot") {
                      const val = estimator === "mean" ? stat.mean : stat.median;
                      // Map 20k-65k -> height [0, 180]
                      const h = ((val - 20) / 45) * 180;
                      const y = 230 - h;
                      return (
                        <g key={trk}>
                          <rect
                            x={centerX - 35}
                            y={y}
                            width="70"
                            height={h}
                            fill={stat.color}
                            opacity="0.85"
                            rx="4"
                          />
                          {/* Error bar */}
                          <line x1={centerX} y1={y - 12} x2={centerX} y2={y + 12} stroke="#ffffff" strokeWidth="2" />
                          <line x1={centerX - 6} y1={y - 12} x2={centerX + 6} y2={y - 12} stroke="#ffffff" strokeWidth="2" />
                          <line x1={centerX - 6} y1={y + 12} x2={centerX + 6} y2={y + 12} stroke="#ffffff" strokeWidth="2" />
                          <text x={centerX} y={y - 18} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                            ₹{val}k
                          </text>
                        </g>
                      );
                    }

                    // Box Plot Mode
                    if (plotType === "boxplot") {
                      const yMin = 230 - ((stat.min - 20) / 45) * 180;
                      const yMax = 230 - ((stat.max - 20) / 45) * 180;
                      const yQ1 = 230 - ((stat.q1 - 20) / 45) * 180;
                      const yQ3 = 230 - ((stat.q3 - 20) / 45) * 180;
                      const yMed = 230 - ((stat.median - 20) / 45) * 180;

                      return (
                        <g key={trk}>
                          {/* Whiskers */}
                          <line x1={centerX} y1={yMax} x2={centerX} y2={yMin} stroke="#cbd5e1" strokeWidth="1.5" />
                          <line x1={centerX - 15} y1={yMax} x2={centerX + 15} y2={yMax} stroke="#cbd5e1" strokeWidth="1.5" />
                          <line x1={centerX - 15} y1={yMin} x2={centerX + 15} y2={yMin} stroke="#cbd5e1" strokeWidth="1.5" />

                          {/* IQR Box */}
                          <rect
                            x={centerX - 28}
                            y={yQ3}
                            width="56"
                            height={yQ1 - yQ3}
                            fill={stat.color}
                            opacity="0.8"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            rx="2"
                          />

                          {/* Median Line */}
                          <line x1={centerX - 28} y1={yMed} x2={centerX + 28} y2={yMed} stroke="#ffffff" strokeWidth="3" />

                          {/* Outliers */}
                          {stat.outliers.map((out, outIdx) => {
                            const yOut = 230 - ((out - 20) / 45) * 180;
                            return (
                              <circle key={outIdx} cx={centerX} cy={yOut} r="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                            );
                          })}

                          <text x={centerX} y={yMed - 6} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                            Med: ₹{stat.median}k
                          </text>
                        </g>
                      );
                    }

                    // Violin Plot Mode
                    if (plotType === "violinplot") {
                      return (
                        <g key={trk}>
                          {/* Violin SVG Body */}
                          <path
                            d={stat.violinPath}
                            fill={stat.color}
                            opacity="0.75"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                          {/* Inner Stick */}
                          <line x1={centerX} y1="100" x2={centerX} y2="160" stroke="#ffffff" strokeWidth="2.5" />
                          <circle cx={centerX} cy="130" r="3.5" fill="#ffffff" />
                        </g>
                      );
                    }

                    return null;
                  })}

                  {/* X Axis Labels */}
                  {Object.keys(trackStats).map((trk, i) => (
                    <text
                      key={trk}
                      x={120 + i * 130}
                      y="255"
                      fill="#e2e8f0"
                      fontSize="11"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {trk}
                    </text>
                  ))}
                </svg>
              </div>

              {/* Footer info */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span>Barrackpore ML Cohort: 2026 Batch</span>
                <span className="text-pink-400 font-semibold font-mono">
                  {plotType === "boxplot" && "Box shows [Q1, Median, Q3] + Whiskers + Outliers"}
                  {plotType === "barplot" && `Bars display ${estimator} + 95% bootstrap confidence interval`}
                  {plotType === "violinplot" && "Mirrored KDE shapes reveal density distribution peaks"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((sc, idx) => (
                  <button
                    key={sc.name}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-pink-600 text-white shadow"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-4 text-xs font-mono text-pink-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 4 Summary &amp; Theoretical Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[520px] overflow-y-auto">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Check */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 4 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="font-medium text-sm text-slate-200">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-300";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-950/70 border-rose-500 text-rose-300";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-pink-600/30 border-pink-500 text-pink-200";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? "bg-emerald-950/40 text-emerald-300 border border-emerald-900/50"
                            : "bg-rose-950/40 text-rose-300 border border-rose-900/50"
                        }`}
                      >
                        <span className="font-semibold">{isCorrect ? "✓ Correct: " : "✗ Incorrect: "}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmittedQuiz(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Reset
              </button>
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-pink-600/30 transition-all"
              >
                Submit Answers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

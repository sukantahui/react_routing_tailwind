import React, { useState } from "react";
import {
  Activity,
  Sliders,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Eye,
  BarChart2,
  Waves
} from "lucide-react";

import pyCode1 from "./topic3_files/01_histplot_kde_demo.py?raw";
import pyCode2 from "./topic3_files/02_kde_bandwidth_tuning.py?raw";
import pyCode3 from "./topic3_files/03_bivariate_kde_hist.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

// Generate synthetic marks distribution datasets
const datasets = {
  bimodal: [
    55, 58, 62, 63, 65, 65, 66, 67, 68, 69, 70, 71, 72, 73, 75,
    84, 85, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
  ],
  normal: [
    60, 64, 67, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 88, 90, 93, 96
  ],
  skewed: [
    50, 52, 53, 54, 55, 56, 57, 58, 60, 62, 65, 68, 72, 78, 85, 92, 98
  ]
};

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Distribution interactive controls
  const [distType, setDistType] = useState("bimodal");
  const [binsCount, setBinsCount] = useState(12);
  const [bwAdjust, setBwAdjust] = useState(1.0);
  const [showHist, setShowHist] = useState(true);
  const [showKde, setShowKde] = useState(true);
  const [fillKde, setFillKde] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_histplot_kde_demo.py", code: pyCode1 },
    { name: "02_kde_bandwidth_tuning.py", code: pyCode2 },
    { name: "03_bivariate_kde_hist.py", code: pyCode3 }
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

  // Math for bins and KDE calculation
  const rawData = datasets[distType];
  const minVal = 45;
  const maxVal = 105;
  const binWidth = (maxVal - minVal) / binsCount;

  // Compute histogram bins
  const bins = Array.from({ length: binsCount }, (_, i) => {
    const start = minVal + i * binWidth;
    const end = start + binWidth;
    const count = rawData.filter((x) => x >= start && x < end).length;
    return { start, end, count, mid: (start + end) / 2 };
  });

  const maxBinCount = Math.max(...bins.map((b) => b.count), 1);

  // Compute Gaussian KDE curve
  const kdePoints = [];
  const bandwidth = 5 * bwAdjust;
  const nPoints = 80;
  for (let i = 0; i <= nPoints; i++) {
    const x = minVal + (i / nPoints) * (maxVal - minVal);
    let density = 0;
    rawData.forEach((xi) => {
      const u = (x - xi) / bandwidth;
      density += Math.exp(-0.5 * u * u) / (Math.sqrt(2 * Math.PI) * bandwidth);
    });
    density = density / rawData.length;
    kdePoints.push({ x, density });
  }

  const maxDensity = Math.max(...kdePoints.map((p) => p.density), 0.001);

  // Build SVG path for KDE
  const kdePathD = kdePoints
    .map((p, idx) => {
      // Map x [45, 105] -> [50, 470]
      const svgX = 50 + ((p.x - 45) / 60) * 420;
      // Map density [0, maxDensity] -> [240, 50]
      const svgY = 240 - (p.density / maxDensity) * 180;
      return `${idx === 0 ? "M" : "L"} ${svgX} ${svgY}`;
    })
    .join(" ");

  const kdeFillD = `${kdePathD} L 470 240 L 50 240 Z`;

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
                <span>Machine Learning Module • Topic 3</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Distribution Plots: histplot() &amp; kdeplot()
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Inspect continuous probability distributions, bin sizes, and continuous kernel density bandwidth adjustments for exploratory machine learning analysis.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Density Studio", icon: Sparkles },
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
            {/* Control Panel */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Distribution &amp; KDE Controls</span>
              </div>

              {/* Dataset type selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Data Shape (Barrackpore Batch):</label>
                <div className="grid grid-cols-3 gap-2">
                  {["bimodal", "normal", "skewed"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDistType(d)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                        distType === d
                          ? "bg-emerald-600 text-white border border-emerald-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bins Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Histogram Bins (bins):</span>
                  <span className="font-mono text-emerald-400">{binsCount}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={binsCount}
                  onChange={(e) => setBinsCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* bw_adjust Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">KDE Bandwidth (bw_adjust):</span>
                  <span className="font-mono text-teal-400">{bwAdjust.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2.5"
                  step="0.1"
                  value={bwAdjust}
                  onChange={(e) => setBwAdjust(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Layer Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setShowHist(!showHist)}
                  className={`p-2 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-1.5 ${
                    showHist ? "bg-emerald-600/30 border border-emerald-500 text-emerald-300" : "bg-slate-950 border border-slate-800 text-slate-500"
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Histplot</span>
                </button>
                <button
                  onClick={() => setShowKde(!showKde)}
                  className={`p-2 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-1.5 ${
                    showKde ? "bg-teal-600/30 border border-teal-500 text-teal-300" : "bg-slate-950 border border-slate-800 text-slate-500"
                  }`}
                >
                  <Waves className="w-3.5 h-3.5" />
                  <span>Kdeplot</span>
                </button>
              </div>

              {/* Code preview snippet */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-emerald-400 font-semibold mb-1"># Generated Code:</div>
                <div className="text-teal-300">sns.histplot(</div>
                <div className="pl-3 text-slate-400">data=marks,</div>
                <div className="pl-3 text-slate-400">bins={binsCount},</div>
                <div className="pl-3 text-emerald-300">kde={showKde ? "True" : "False"},</div>
                {showKde && <div className="pl-3 text-teal-300">kde_kws={"{"}bw_adjust: {bwAdjust.toFixed(1)}{"}"}</div>}
                <div className="text-teal-300">)</div>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Live Probability Density Function (PDF)
                </span>
                <span className="text-xs font-mono text-slate-400">Total Samples: {rawData.length} students</span>
              </div>

              {/* Interactive SVG */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="520" height="290" viewBox="0 0 520 290" className="max-w-full">
                  {/* Grid */}
                  <line x1="50" y1="60" x2="470" y2="60" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="120" x2="470" y2="120" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="180" x2="470" y2="180" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="240" x2="470" y2="240" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="50" y1="40" x2="50" y2="240" stroke="#64748b" strokeWidth="1.5" />

                  {/* X Axis ticks */}
                  {[50, 60, 70, 80, 90, 100].map((val) => {
                    const x = 50 + ((val - 45) / 60) * 420;
                    return (
                      <g key={val}>
                        <line x1={x} y1="240" x2={x} y2="245" stroke="#94a3b8" />
                        <text x={x} y="260" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Histogram Bars */}
                  {showHist &&
                    bins.map((b, i) => {
                      const x = 50 + ((b.start - 45) / 60) * 420;
                      const w = (binWidth / 60) * 420 - 2;
                      const barH = (b.count / maxBinCount) * 180;
                      const y = 240 - barH;
                      return (
                        <rect
                          key={i}
                          x={x + 1}
                          y={y}
                          width={Math.max(w, 2)}
                          height={barH}
                          fill="#10b981"
                          opacity="0.45"
                          stroke="#34d399"
                          strokeWidth="1"
                          rx="2"
                        />
                      );
                    })}

                  {/* Filled KDE Area */}
                  {showKde && fillKde && (
                    <path d={kdeFillD} fill="#14b8a6" opacity="0.25" />
                  )}

                  {/* KDE Line */}
                  {showKde && (
                    <path
                      d={kdePathD}
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Labels */}
                  <text x="260" y="282" fill="#e2e8f0" fontSize="11" fontWeight="600" textAnchor="middle">
                    Exam Marks Scale (/100)
                  </text>
                  <text x="-140" y="20" fill="#e2e8f0" fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90)">
                    Density / Frequency
                  </text>
                </svg>
              </div>

              {/* Status info bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-300 font-mono">Bins: {binsCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="text-slate-300 font-mono">Bandwidth Factor: {bwAdjust.toFixed(2)}x</span>
                </div>
                <div className="text-slate-400">
                  {distType === "bimodal" ? "Notice 2 distinct clusters (Modes) in the KDE curve!" : "Single unified peak distribution."}
                </div>
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
                        ? "bg-emerald-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 3 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 3 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-emerald-600/30 border-emerald-500 text-emerald-200";
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
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all"
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

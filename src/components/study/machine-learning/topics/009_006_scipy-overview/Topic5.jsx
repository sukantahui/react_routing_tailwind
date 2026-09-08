import React, { useState } from "react";
import {
  Activity,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Target,
  Layers,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic5_files/01_zscore_computation_basics.py?raw";
import pyCode2 from "./topic5_files/02_empirical_rule_68_95_99.py?raw";
import pyCode3 from "./topic5_files/03_zscore_outlier_filtering.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

export default function Topic5() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [rawMean, setRawMean] = useState(70);
  const [rawStd, setRawStd] = useState(10);
  const [rawValue, setRawValue] = useState(85);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_zscore_computation_basics.py", code: pyCode1 },
    { name: "02_empirical_rule_68_95_99.py", code: pyCode2 },
    { name: "03_zscore_outlier_filtering.py", code: pyCode3 }
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

  // Z-score calculation
  const zScore = rawStd > 0 ? (rawValue - rawMean) / rawStd : 0;

  // CDF approximation for standard normal
  const normalCDF = (z) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  };

  const percentile = normalCDF(zScore) * 100;

  // SVG dimensions & curve
  const svgWidth = 500;
  const svgHeight = 160;
  const normalPDF = (z) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);

  const curvePoints = [];
  for (let z = -3.5; z <= 3.5; z += 0.1) {
    const px = ((z + 3.5) / 7) * svgWidth;
    const py = svgHeight - (normalPDF(z) / 0.42) * (svgHeight - 20);
    curvePoints.push(`${px},${py}`);
  }

  const markerX = Math.max(0, Math.min(svgWidth, ((zScore + 3.5) / 7) * svgWidth));
  const markerY = svgHeight - (normalPDF(zScore) / 0.42) * (svgHeight - 20);

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
                <span>Machine Learning Module 009_006 • Topic 5</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Normal Distribution &amp; Z-Scores
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master the fundamental standard score: <code className="text-emerald-400 font-mono">Z = (X - \mu)/\sigma</code>. Explore the 68-95-99.7 Empirical Rule, Gaussian standard curves, and robust outlier detection.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Z-Score & Bell Curve Studio", icon: Sparkles },
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
            {/* Input Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Target className="w-4 h-4" />
                <span>Feature Normalizer Inputs</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Feature Mean (<code className="text-emerald-400 font-mono">\mu</code>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{rawMean}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={rawMean}
                    onChange={(e) => setRawMean(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Standard Deviation (<code className="text-emerald-400 font-mono">\sigma</code>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{rawStd}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={rawStd}
                    onChange={(e) => setRawStd(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Observation Value (<code className="text-emerald-400 font-mono">X</code>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{rawValue}</span>
                  </div>
                  <input
                    type="range"
                    min={rawMean - 4 * rawStd}
                    max={rawMean + 4 * rawStd}
                    value={rawValue}
                    onChange={(e) => setRawValue(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="font-bold text-slate-200">The Empirical Rule (68-95-99.7):</div>
                <div className="flex justify-between text-slate-400">
                  <span>±1σ ({rawMean - rawStd} to {rawMean + rawStd}):</span>
                  <span className="font-mono text-emerald-400 font-semibold">68.27%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>±2σ ({rawMean - 2 * rawStd} to {rawMean + 2 * rawStd}):</span>
                  <span className="font-mono text-teal-400 font-semibold">95.45%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>±3σ ({rawMean - 3 * rawStd} to {rawMean + 3 * rawStd}):</span>
                  <span className="font-mono text-cyan-400 font-semibold">99.73%</span>
                </div>
              </div>
            </div>

            {/* Standard Normal Curve & Metrics */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Activity className="w-4 h-4" />
                  <span>Standard Normal Curve N(0, 1)</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">Z = {zScore > 0 ? `+${zScore.toFixed(2)}` : zScore.toFixed(2)}σ</span>
              </div>

              {/* Bell Curve SVG */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-40 overflow-visible">
                  {/* ±1 Sigma Zone Shading */}
                  <rect
                    x={((2.5) / 7) * svgWidth}
                    y="0"
                    width={(2 / 7) * svgWidth}
                    height={svgHeight}
                    fill="rgba(16, 185, 129, 0.12)"
                  />
                  {/* ±2 Sigma Zone Shading */}
                  <rect
                    x={((1.5) / 7) * svgWidth}
                    y="0"
                    width={(4 / 7) * svgWidth}
                    height={svgHeight}
                    fill="rgba(56, 189, 248, 0.06)"
                  />

                  {/* Standard Curve Line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={curvePoints.join(" ")}
                  />

                  {/* X Axis Center */}
                  <line x1={svgWidth / 2} y1="0" x2={svgWidth / 2} y2={svgHeight} stroke="#475569" strokeDasharray="3 3" />

                  {/* Current Z-Score Pointer */}
                  <line x1={markerX} y1="0" x2={markerX} y2={svgHeight} stroke="#f43f5e" strokeWidth="2" />
                  <circle cx={markerX} cy={markerY} r="5" fill="#f43f5e" />
                </svg>

                {/* X Axis Labels */}
                <div className="w-full flex justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
                  <span>-3σ</span>
                  <span>-2σ</span>
                  <span>-1σ</span>
                  <span className="text-emerald-400 font-bold">0 (Mean)</span>
                  <span>+1σ</span>
                  <span>+2σ</span>
                  <span>+3σ</span>
                </div>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Calculated Z-Score</span>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                    {zScore > 0 ? `+${zScore.toFixed(2)}` : zScore.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-500">Standard deviations from \mu</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Percentile Rank</span>
                  <div className="text-xl font-bold text-teal-400 font-mono mt-0.5">{percentile.toFixed(2)}%</div>
                  <span className="text-[10px] text-slate-500">Greater than {percentile.toFixed(1)}% of population</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Outlier Status</span>
                  <div className="text-sm font-bold font-mono mt-1">
                    {Math.abs(zScore) > 3.0 ? (
                      <span className="text-rose-400">🚨 Extreme Outlier (|Z| &gt; 3)</span>
                    ) : Math.abs(zScore) > 2.0 ? (
                      <span className="text-amber-400">⚠️ Mild Outlier (|Z| &gt; 2)</span>
                    ) : (
                      <span className="text-emerald-400">✅ Normal Observation</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500">Threshold filter check</span>
                </div>
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

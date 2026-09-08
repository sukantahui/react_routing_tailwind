import React, { useState } from "react";
import {
  GitCompare,
  Layers,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Zap,
  Sliders,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import pyCode1 from "./topic2_files/01_matplotlib_vs_seaborn_syntax.py?raw";
import pyCode2 from "./topic2_files/02_default_aesthetics_diff.py?raw";
import pyCode3 from "./topic2_files/03_combining_plt_and_sns.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

const studentData = [
  { dept: "CS", avgScore: 88, ciLow: 83, ciHigh: 93, color: "#3b82f6" },
  { dept: "ECE", avgScore: 78, ciLow: 71, ciHigh: 85, color: "#10b981" },
  { dept: "IT", avgScore: 84, ciLow: 79, ciHigh: 89, color: "#f59e0b" }
];

export default function Topic2() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Comparison mode
  const [viewMode, setViewMode] = useState("seaborn"); // "matplotlib" | "seaborn" | "hybrid"
  const [showCI, setShowCI] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_matplotlib_vs_seaborn_syntax.py", code: pyCode1 },
    { name: "02_default_aesthetics_diff.py", code: pyCode2 },
    { name: "03_combining_plt_and_sns.py", code: pyCode3 }
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
        <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 border border-violet-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <GitCompare className="w-4 h-4" />
                <span>Machine Learning Module • Topic 2</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Seaborn vs Matplotlib
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Compare imperative low-level primitives against declarative statistical abstractions. Understand when to use pure Matplotlib, Seaborn, or the hybrid pattern.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Side-by-Side Comparator", icon: Sparkles },
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
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
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

        {/* Tab 1: Interactive Comparator */}
        {activeTab === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Zap className="w-4 h-4" />
                <span>Select Architecture Paradigm</span>
              </div>

              <div className="space-y-2">
                {[
                  { id: "matplotlib", label: "Raw Matplotlib (Imperative)", desc: "10+ lines of explicit loops & mappings" },
                  { id: "seaborn", label: "Seaborn (Declarative)", desc: "1 line with auto CI errorbars & palettes" },
                  { id: "hybrid", label: "Hybrid Subplots (Recommended)", desc: "Matplotlib Grid + Seaborn Statistics" }
                ].map((mode) => (
                  <div
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      viewMode === mode.id
                        ? "bg-violet-950/60 border-violet-500 shadow-md shadow-violet-500/10"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-semibold text-xs text-white flex items-center justify-between">
                      <span>{mode.label}</span>
                      {viewMode === mode.id && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{mode.desc}</p>
                  </div>
                ))}
              </div>

              {/* Toggle Statistical Confidence Interval */}
              {viewMode !== "matplotlib" && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300 font-medium">Auto 95% Bootstrap CI:</span>
                  <button
                    onClick={() => setShowCI(!showCI)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      showCI ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {showCI ? "Enabled" : "Disabled"}
                  </button>
                </div>
              )}

              {/* Comparison Summary Box */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5">
                <div className="text-violet-400 font-semibold mb-1">Paradigm Verdict:</div>
                {viewMode === "matplotlib" && (
                  <div className="text-amber-300">
                    ⚠ Heavy boilerplate. Requires manual category filtering and explicit error bar calculations.
                  </div>
                )}
                {viewMode === "seaborn" && (
                  <div className="text-emerald-300">
                    ✓ High efficiency. Statistical calculations (CI, mean) performed automatically on DataFrame columns.
                  </div>
                )}
                {viewMode === "hybrid" && (
                  <div className="text-cyan-300">
                    ★ Industry Best Practice. Combine Matplotlib figure layout with Seaborn plotting power!
                  </div>
                )}
              </div>
            </div>

            {/* Visual Canvas Comparison */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Live Visual Comparison: Student Department Marks
                </span>
                <span className="text-xs font-mono text-violet-400">
                  {viewMode === "matplotlib" ? "plt.bar()" : viewMode === "seaborn" ? "sns.barplot()" : "fig, ax + sns"}
                </span>
              </div>

              {/* Rendered SVG Simulation */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="500" height="280" viewBox="0 0 500 280" className="max-w-full">
                  {/* Grid */}
                  <line x1="50" y1="50" x2="460" y2="50" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="110" x2="460" y2="110" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="460" y2="170" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="230" x2="460" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#475569" strokeWidth="1.5" />

                  {/* Y Ticks */}
                  <text x="40" y="234" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">0</text>
                  <text x="40" y="174" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">35</text>
                  <text x="40" y="114" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">70</text>
                  <text x="40" y="54" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">100</text>

                  {/* Bars */}
                  {studentData.map((d, i) => {
                    const barWidth = 70;
                    const x = 100 + i * 130;
                    // Scale 0-100 -> height [0, 180]
                    const barHeight = (d.avgScore / 100) * 180;
                    const y = 230 - barHeight;

                    const color = viewMode === "matplotlib" ? "#64748b" : d.color;

                    return (
                      <g key={d.dept}>
                        {/* Bar */}
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          fill={color}
                          rx={viewMode === "matplotlib" ? "0" : "4"}
                          opacity="0.9"
                        />

                        {/* Error bar for CI */}
                        {showCI && viewMode !== "matplotlib" && (
                          <g stroke="#ffffff" strokeWidth="2">
                            {/* Whisker line */}
                            <line
                              x1={x + barWidth / 2}
                              y1={230 - (d.ciHigh / 100) * 180}
                              x2={x + barWidth / 2}
                              y2={230 - (d.ciLow / 100) * 180}
                            />
                            {/* Top cap */}
                            <line
                              x1={x + barWidth / 2 - 8}
                              y1={230 - (d.ciHigh / 100) * 180}
                              x2={x + barWidth / 2 + 8}
                              y2={230 - (d.ciHigh / 100) * 180}
                            />
                            {/* Bottom cap */}
                            <line
                              x1={x + barWidth / 2 - 8}
                              y1={230 - (d.ciLow / 100) * 180}
                              x2={x + barWidth / 2 + 8}
                              y2={230 - (d.ciLow / 100) * 180}
                            />
                          </g>
                        )}

                        {/* Value Text */}
                        <text
                          x={x + barWidth / 2}
                          y={y - (showCI && viewMode !== "matplotlib" ? 18 : 6)}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {d.avgScore}%
                        </text>

                        {/* X label */}
                        <text
                          x={x + barWidth / 2}
                          y="250"
                          fill="#e2e8f0"
                          fontSize="12"
                          fontWeight="600"
                          textAnchor="middle"
                        >
                          {d.dept} Dept
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Code Snippet Box for the current Mode */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                {viewMode === "matplotlib" && (
                  <div className="space-y-1">
                    <span className="text-slate-500"># Matplotlib requires manual mean calculation &amp; color mapping:</span>
                    <div className="text-amber-300">plt.bar(df['dept'].unique(), means, color='gray')</div>
                    <div className="text-slate-400">plt.xlabel('Department'); plt.ylabel('Score')</div>
                  </div>
                )}
                {viewMode === "seaborn" && (
                  <div className="space-y-1">
                    <span className="text-slate-500"># Seaborn calculates mean &amp; 95% bootstrap CI automatically:</span>
                    <div className="text-emerald-400">sns.barplot(data=df, x='dept', y='score', palette='muted')</div>
                  </div>
                )}
                {viewMode === "hybrid" && (
                  <div className="space-y-1">
                    <span className="text-slate-500"># Hybrid Matplotlib layout + Seaborn statistical plot:</span>
                    <div className="text-cyan-300">fig, ax = plt.subplots(figsize=(6, 4))</div>
                    <div className="text-emerald-400">sns.barplot(data=df, x='dept', y='score', ax=ax)</div>
                    <div className="text-slate-400">ax.set_title("Barrackpore Department Performance")</div>
                  </div>
                )}
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
                        ? "bg-violet-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-violet-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 2 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 2 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-violet-600/30 border-violet-500 text-violet-200";
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
                className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all"
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

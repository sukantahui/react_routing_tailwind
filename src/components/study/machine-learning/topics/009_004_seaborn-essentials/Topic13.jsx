import React, { useState } from "react";
import {
  Grid3X3,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Maximize2,
  Layers,
  ZoomIn,
  TrendingUp
} from "lucide-react";

import pyCode1 from "./topic13_files/01_small_dataset_pairplot.py?raw";
import pyCode2 from "./topic13_files/02_corner_pairplot.py?raw";
import pyCode3 from "./topic13_files/03_pairplot_kde_diagonal.py?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions.js";

const pairFeatures = ["Hours", "Projects", "FinalExam"];

const studentCohort = [
  { name: "Debangshu", hours: 14, projects: 5, exam: 92, track: "DL", col: "#ec4899" },
  { name: "Susmita", hours: 16, projects: 6, exam: 96, track: "DS", col: "#3b82f6" },
  { name: "Swadeep", hours: 8, projects: 2, exam: 72, track: "Web", col: "#10b981" },
  { name: "Tuhina", hours: 13, projects: 4, exam: 89, track: "DS", col: "#3b82f6" },
  { name: "Sachin", hours: 10, projects: 3, exam: 78, track: "Web", col: "#10b981" },
  { name: "Mahima", hours: 15, projects: 5, exam: 95, track: "DL", col: "#ec4899" },
  { name: "Abhronila", hours: 11, projects: 4, exam: 85, track: "DS", col: "#3b82f6" }
];

export default function Topic13() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [cornerMode, setCornerMode] = useState(false);
  const [diagKind, setDiagKind] = useState("kde"); // "kde" | "hist"
  const [fillDiag, setFillDiag] = useState(true);
  const [pointSize, setPointSize] = useState(4);
  const [selectedSubplot, setSelectedSubplot] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_small_dataset_pairplot.py", code: pyCode1 },
    { name: "02_corner_pairplot.py", code: pyCode2 },
    { name: "03_pairplot_kde_diagonal.py", code: pyCode3 }
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
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Grid3X3 className="w-4 h-4" />
                <span>Machine Learning Module • Topic 13 (Worked Example 3)</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Worked Example 3: Pair Plot for a Small Dataset
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                End-to-end multi-feature student cohort case study. Build pair plots with track-based class separation, diagonal density curves, and corner-mode optimization.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Pairplot Case Studio", icon: Sparkles },
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
                <span>Pairplot Case Parameters</span>
              </div>

              {/* Corner Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">corner=True (Lower Triangle):</div>
                <button
                  onClick={() => setCornerMode(!cornerMode)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    cornerMode ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {cornerMode ? "ON" : "OFF"}
                </button>
              </div>

              {/* Diag Kind */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Diagonal Type (diag_kind):</label>
                <div className="grid grid-cols-2 gap-2">
                  {["kde", "hist"].map((k) => (
                    <button
                      key={k}
                      onClick={() => setDiagKind(k)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono uppercase transition-all ${
                        diagKind === k
                          ? "bg-emerald-600 text-white border border-emerald-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fill Diagonal Toggle */}
              {diagKind === "kde" && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-300 font-medium">diag_kws={"{"}fill: True{"}"}:</div>
                  <button
                    onClick={() => setFillDiag(!fillDiag)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      fillDiag ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {fillDiag ? "ON" : "OFF"}
                  </button>
                </div>
              )}

              {/* Scatter Point Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Scatter Marker Size (plot_kws):</span>
                  <span className="font-mono text-emerald-400">{pointSize}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={pointSize}
                  onChange={(e) => setPointSize(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Generated Code */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-emerald-400 font-semibold mb-1"># Python Code:</div>
                <div className="text-indigo-300">g = sns.pairplot(</div>
                <div className="pl-3 text-slate-400">data=df,</div>
                <div className="pl-3 text-cyan-300">hue="Track",</div>
                <div className="pl-3 text-emerald-300">diag_kind="{diagKind}",</div>
                {diagKind === "kde" && (
                  <div className="pl-3 text-teal-300">diag_kws={"{"}"fill": {fillDiag ? "True" : "False"}{"}"},</div>
                )}
                <div className="pl-3 text-amber-300">corner={cornerMode ? "True" : "False"},</div>
                <div className="pl-3 text-slate-400">plot_kws={"{"}"s": {pointSize * 15}{"}"}</div>
                <div className="text-indigo-300">)</div>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Grid3X3 className="w-4 h-4 text-emerald-400" />
                  Live 3×3 Pairplot Grid (Barrackpore Cohort)
                </span>
                <span className="text-xs font-mono text-slate-400">Tracks: DL, DS, Web</span>
              </div>

              {/* 3x3 SVG Grid */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="480" height="290" viewBox="0 0 480 290" className="max-w-full">
                  {pairFeatures.map((rowFeat, rIdx) =>
                    pairFeatures.map((colFeat, cIdx) => {
                      const isMasked = cornerMode && cIdx > rIdx;
                      if (isMasked) return null;

                      const isDiag = rIdx === cIdx;
                      const subX = 65 + cIdx * 125;
                      const subY = 25 + rIdx * 80;
                      const subW = 110;
                      const subH = 68;

                      return (
                        <g
                          key={`${rIdx}-${cIdx}`}
                          className="cursor-pointer"
                          onClick={() => setSelectedSubplot({ row: rowFeat, col: colFeat, isDiag })}
                        >
                          <rect
                            x={subX}
                            y={subY}
                            width={subW}
                            height={subH}
                            fill="#090d16"
                            stroke="#334155"
                            strokeWidth="1"
                            rx="4"
                          />

                          {/* Diagonal Subplot (KDE / Hist) */}
                          {isDiag ? (
                            diagKind === "kde" ? (
                              <g>
                                {fillDiag && (
                                  <path
                                    d={`M ${subX + 10} ${subY + 55} Q ${subX + 40} ${subY + 18}, ${subX + 55} ${subY + 18} T ${subX + 100} ${subY + 55} Z`}
                                    fill="#10b981"
                                    opacity="0.25"
                                  />
                                )}
                                <path
                                  d={`M ${subX + 10} ${subY + 55} Q ${subX + 40} ${subY + 18}, ${subX + 55} ${subY + 18} T ${subX + 100} ${subY + 55}`}
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="2.5"
                                />
                              </g>
                            ) : (
                              <g fill="#10b981" opacity="0.6">
                                <rect x={subX + 15} y={subY + 40} width="16" height="20" rx="1" />
                                <rect x={subX + 35} y={subY + 20} width="16" height="40" rx="1" />
                                <rect x={subX + 55} y={subY + 10} width="16" height="50" rx="1" />
                                <rect x={subX + 75} y={subY + 30} width="16" height="30" rx="1" />
                              </g>
                            )
                          ) : (
                            /* Off-diagonal Scatter Dots */
                            <g>
                              {studentCohort.map((st, sIdx) => {
                                const px = subX + 15 + (sIdx * 12);
                                const py = subY + 55 - (sIdx * 6);
                                return (
                                  <circle
                                    key={sIdx}
                                    cx={px}
                                    cy={py}
                                    r={pointSize}
                                    fill={st.col}
                                    stroke="#ffffff"
                                    strokeWidth="0.8"
                                    opacity="0.85"
                                  />
                                );
                              })}
                            </g>
                          )}

                          <text x={subX + 6} y={subY + 14} fill="#64748b" fontSize="8" fontFamily="monospace">
                            {isDiag ? `${rowFeat} (KDE)` : `${colFeat} vs ${rowFeat}`}
                          </text>
                        </g>
                      );
                    })
                  )}

                  {/* Axis Headers */}
                  {pairFeatures.map((rf, rIdx) => (
                    <text key={rf} x="55" y={25 + rIdx * 80 + 38} fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="end">
                      {rf}
                    </text>
                  ))}
                  {pairFeatures.map((cf, cIdx) => (
                    <text key={cf} x={65 + cIdx * 125 + 55} y="280" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {cf}
                    </text>
                  ))}
                </svg>
              </div>

              {/* Dynamic Legend */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 font-semibold">Track Legend:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899]" />
                    <span className="text-slate-300">Deep Learning</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                    <span className="text-slate-300">Data Science</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span className="text-slate-300">Web ML</span>
                  </div>
                </div>
                {selectedSubplot ? (
                  <span className="text-emerald-300 font-mono font-bold">
                    Active Subplot: {selectedSubplot.col} × {selectedSubplot.row}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Click any cell to zoom into relationships</span>
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
                <span>Topic 13 Summary &amp; Theoretical Notes</span>
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
                <span>Topic 13 Knowledge Assessment (4 Questions)</span>
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

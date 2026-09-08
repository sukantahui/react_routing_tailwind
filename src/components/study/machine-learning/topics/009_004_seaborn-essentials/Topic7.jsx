import React, { useState } from "react";
import {
  Network,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Eye,
  ShieldAlert,
  Layers,
  Filter
} from "lucide-react";

import pyCode1 from "./topic7_files/01_df_corr_matrix.py?raw";
import pyCode2 from "./topic7_files/02_mask_upper_triangle.py?raw";
import pyCode3 from "./topic7_files/03_feature_selection_corr.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

const features = ["Hours", "Attend", "Projects", "ExamScore"];

// Correlation coefficients matrix
const corrData = [
  [1.0, 0.72, 0.81, 0.94],   // Hours
  [0.72, 1.0, 0.64, 0.76],   // Attend
  [0.81, 0.64, 1.0, 0.88],   // Projects
  [0.94, 0.76, 0.88, 1.0]    // ExamScore
];

export default function Topic7() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [maskUpper, setMaskUpper] = useState(false);
  const [corrCmap, setCorrCmap] = useState("coolwarm");
  const [threshold, setThreshold] = useState(0.0);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_df_corr_matrix.py", code: pyCode1 },
    { name: "02_mask_upper_triangle.py", code: pyCode2 },
    { name: "03_feature_selection_corr.py", code: pyCode3 }
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

  // Color generator for [-1, 1] range centered at 0
  const getCorrColor = (r) => {
    if (Math.abs(r) < threshold && r !== 1.0) {
      return "#1e293b"; // Dimmed out by threshold
    }

    if (corrCmap === "coolwarm") {
      // Negative: Blue | 0: White/Slate | Positive: Red
      if (r >= 0) {
        const red = Math.round(239 * r + 50 * (1 - r));
        const green = Math.round(68 * (1 - r) + 50 * (1 - r));
        const blue = Math.round(68 * (1 - r) + 50 * (1 - r));
        return `rgb(${red}, ${green}, ${blue})`;
      } else {
        const posR = Math.abs(r);
        const red = Math.round(59 * (1 - posR) + 50 * (1 - posR));
        const green = Math.round(130 * (1 - posR) + 50 * (1 - posR));
        const blue = Math.round(246 * posR + 50 * (1 - posR));
        return `rgb(${red}, ${green}, ${blue})`;
      }
    } else {
      // vlag colormap
      if (r >= 0) {
        const red = Math.round(225 * r + 40 * (1 - r));
        const green = Math.round(80 * r + 40 * (1 - r));
        const blue = Math.round(80 * r + 40 * (1 - r));
        return `rgb(${red}, ${green}, ${blue})`;
      } else {
        const posR = Math.abs(r);
        return `rgb(${Math.round(40 * (1 - posR))}, ${Math.round(120 * posR + 40 * (1 - posR))}, ${Math.round(220 * posR)})`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Network className="w-4 h-4" />
                <span>Machine Learning Module • Topic 7</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Correlation Matrix Visualization
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Diagnose collinearity, feature correlations, and target associations. Master upper-triangle masking, symmetric diverging scales, and ML feature selection.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Correlation Matrix Studio", icon: Sparkles },
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
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
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
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Correlation Controls</span>
              </div>

              {/* Mask Upper Triangle Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">Mask Upper Triangle:</div>
                <button
                  onClick={() => setMaskUpper(!maskUpper)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    maskUpper ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {maskUpper ? "ON" : "OFF"}
                </button>
              </div>

              {/* Colormap choice */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Diverging Colormap:</label>
                <div className="grid grid-cols-2 gap-2">
                  {["coolwarm", "vlag"].map((cm) => (
                    <button
                      key={cm}
                      onClick={() => setCorrCmap(cm)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        corrCmap === cm
                          ? "bg-rose-600 text-white border border-rose-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {cm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Threshold Filter Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Highlight Threshold (|r| &gt;=):</span>
                  <span className="font-mono text-rose-400">{threshold.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.9"
                  step="0.05"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Generated Python Code */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-rose-400 font-semibold mb-1"># Generated Code:</div>
                <div className="text-slate-400">corr = df.corr(numeric_only=True)</div>
                {maskUpper && (
                  <div className="text-amber-300">mask = np.triu(np.ones_like(corr, dtype=bool))</div>
                )}
                <div className="text-indigo-300">sns.heatmap(</div>
                <div className="pl-3 text-slate-400">corr,</div>
                {maskUpper && <div className="pl-3 text-amber-300">mask=mask,</div>}
                <div className="pl-3 text-rose-300">annot=True, fmt=".2f",</div>
                <div className="pl-3 text-emerald-300">cmap="{corrCmap}", vmin=-1, vmax=1, center=0,</div>
                <div className="pl-3 text-slate-400">square=True, linewidths=1.5</div>
                <div className="text-indigo-300">)</div>
              </div>
            </div>

            {/* SVG Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Network className="w-4 h-4 text-rose-400" />
                  Live Correlation Matrix (Pearson r)
                </span>
                <span className="text-xs font-mono text-slate-400">Student Dataset Features</span>
              </div>

              {/* Matrix Grid */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="490" height="290" viewBox="0 0 490 290" className="max-w-full">
                  {/* Column Header Titles */}
                  {features.map((feat, colIdx) => (
                    <text
                      key={feat}
                      x={110 + colIdx * 70 + 35}
                      y="25"
                      fill="#e2e8f0"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {feat}
                    </text>
                  ))}

                  {/* Rows and Cells */}
                  {features.map((rowFeat, rowIdx) => (
                    <g key={rowFeat}>
                      {/* Row Label */}
                      <text
                        x="95"
                        y={45 + rowIdx * 52 + 30}
                        fill="#cbd5e1"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="end"
                      >
                        {rowFeat}
                      </text>

                      {/* Cells */}
                      {corrData[rowIdx].map((rVal, colIdx) => {
                        const isMasked = maskUpper && colIdx > rowIdx;
                        if (isMasked) return null;

                        const x = 110 + colIdx * 70;
                        const y = 45 + rowIdx * 52;
                        const cellCol = getCorrColor(rVal);
                        const isHovered =
                          hoveredCell && hoveredCell.row === rowIdx && hoveredCell.col === colIdx;

                        return (
                          <g
                            key={`${rowIdx}-${colIdx}`}
                            className="cursor-pointer"
                            onMouseEnter={() =>
                              setHoveredCell({ feat1: rowFeat, feat2: features[colIdx], r: rVal, row: rowIdx, col: colIdx })
                            }
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            <rect
                              x={x + 1}
                              y={y + 1}
                              width={68}
                              height={50}
                              fill={cellCol}
                              stroke={isHovered ? "#ffffff" : "#0f172a"}
                              strokeWidth={isHovered ? 2 : 1}
                              rx="3"
                            />
                            <text
                              x={x + 35}
                              y={y + 30}
                              fill="#ffffff"
                              fontSize="12"
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="monospace"
                            >
                              {rVal.toFixed(2)}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  ))}

                  {/* Colorbar strip */}
                  <g transform="translate(425, 45)">
                    <rect x="0" y="0" width="16" height="208" fill="url(#corrGradient)" rx="2" stroke="#475569" strokeWidth="1" />
                    <text x="22" y="10" fill="#94a3b8" fontSize="9" fontFamily="monospace">+1.0</text>
                    <text x="22" y="109" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.0</text>
                    <text x="22" y="208" fill="#94a3b8" fontSize="9" fontFamily="monospace">-1.0</text>
                  </g>

                  {/* SVG Gradient definition */}
                  <defs>
                    <linearGradient id="corrGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={getCorrColor(1.0)} />
                      <stop offset="50%" stopColor={getCorrColor(0.0)} />
                      <stop offset="100%" stopColor={getCorrColor(-1.0)} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Hover Inspection / ML Diagnostic */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                {hoveredCell ? (
                  <span className="text-rose-300 font-mono font-bold">
                    🔍 {hoveredCell.feat1} ↔ {hoveredCell.feat2} : r = {hoveredCell.r.toFixed(2)}{" "}
                    {hoveredCell.r >= 0.85 && hoveredCell.feat1 !== hoveredCell.feat2
                      ? "⚠ High Collinearity!"
                      : hoveredCell.r >= 0.7
                      ? "✓ Strong Linear Signal"
                      : "• Moderate Relationship"}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Hover any correlation tile to inspect ML relationship strength</span>
                )}
                <span className="font-mono text-slate-400">Pearson Correlation r</span>
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
                        ? "bg-rose-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 7 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 7 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-rose-600/30 border-rose-500 text-rose-200";
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
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-all"
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

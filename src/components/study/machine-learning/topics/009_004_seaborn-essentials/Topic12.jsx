import React, { useState } from "react";
import {
  FileSpreadsheet,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  AlertTriangle,
  Layers,
  Search,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic12_files/01_ml_feature_correlations.py?raw";
import pyCode2 from "./topic12_files/02_filtered_correlations_heatmap.py?raw";
import pyCode3 from "./topic12_files/03_multicollinearity_analysis.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

const houseFeatures = ["Area_SqFt", "Rooms", "Metro_KM", "Age", "Price"];

const houseCorr = [
  [1.0, 0.91, -0.42, -0.15, 0.88],  // Area_SqFt
  [0.91, 1.0, -0.38, -0.12, 0.82],  // Rooms
  [-0.42, -0.38, 1.0, 0.05, -0.58], // Metro_KM
  [-0.15, -0.12, 0.05, 1.0, -0.34], // Age
  [0.88, 0.82, -0.58, -0.34, 1.0]   // Price
];

export default function Topic12() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [maskUpper, setMaskUpper] = useState(true);
  const [collinearThreshold, setCollinearThreshold] = useState(0.85);
  const [highlightTarget, setHighlightTarget] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_ml_feature_correlations.py", code: pyCode1 },
    { name: "02_filtered_correlations_heatmap.py", code: pyCode2 },
    { name: "03_multicollinearity_analysis.py", code: pyCode3 }
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

  // Color generator for correlation
  const getCellColor = (r) => {
    if (r >= 0) {
      // White to Red
      const red = Math.round(239 * r + 50 * (1 - r));
      const green = Math.round(68 * (1 - r) + 50 * (1 - r));
      const blue = Math.round(68 * (1 - r) + 50 * (1 - r));
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      // White to Blue
      const posR = Math.abs(r);
      const red = Math.round(59 * (1 - posR) + 50 * (1 - posR));
      const green = Math.round(130 * (1 - posR) + 50 * (1 - posR));
      const blue = Math.round(246 * posR + 50 * (1 - posR));
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 border border-red-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Machine Learning Module • Topic 12 (Worked Example 2)</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Worked Example 2: Heatmap of Feature Correlations
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                End-to-end Machine Learning feature correlation case study on a Real Estate Price dataset. Diagnose collinear pairs and select top predictive indicators.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Correlation Case Studio", icon: Sparkles },
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
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
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
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Feature Selection &amp; Masking</span>
              </div>

              {/* Mask Upper Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">Mask Upper Triangle (np.triu):</div>
                <button
                  onClick={() => setMaskUpper(!maskUpper)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    maskUpper ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {maskUpper ? "ON" : "OFF"}
                </button>
              </div>

              {/* Target Highlight Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">Highlight Target Feature ('Price'):</div>
                <button
                  onClick={() => setHighlightTarget(!highlightTarget)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    highlightTarget ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {highlightTarget ? "ON" : "OFF"}
                </button>
              </div>

              {/* Collinearity Threshold */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Collinearity Alert (|r| &gt;):
                  </span>
                  <span className="font-mono text-amber-400">{collinearThreshold.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="0.95"
                  step="0.05"
                  value={collinearThreshold}
                  onChange={(e) => setCollinearThreshold(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* ML Engineering Advice Box */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>ML Diagnostic Engine:</span>
                </div>
                <p className="text-slate-300">
                  • <span className="text-rose-400 font-bold">Area_SqFt ↔ Rooms (r = 0.91)</span>: High collinearity! Dropping 'Rooms' prevents coefficient variance inflation.
                </p>
                <p className="text-emerald-300">
                  • <span className="font-bold">Price Predictors</span>: Area (+0.88) &amp; Metro Distance (-0.58) provide strong linear signals.
                </p>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-red-400" />
                  Housing Price Dataset Feature Correlation Matrix
                </span>
                <span className="text-xs font-mono text-slate-400">5 Continuous Features</span>
              </div>

              {/* Matrix Grid */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="490" height="290" viewBox="0 0 490 290" className="max-w-full">
                  {/* Column Headers */}
                  {houseFeatures.map((feat, colIdx) => (
                    <text
                      key={feat}
                      x={110 + colIdx * 62 + 31}
                      y="25"
                      fill={highlightTarget && feat === "Price" ? "#fbbf24" : "#e2e8f0"}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {feat}
                    </text>
                  ))}

                  {/* Rows and Cells */}
                  {houseFeatures.map((rowFeat, rowIdx) => (
                    <g key={rowFeat}>
                      {/* Row Label */}
                      <text
                        x="95"
                        y={45 + rowIdx * 45 + 26}
                        fill={highlightTarget && rowFeat === "Price" ? "#fbbf24" : "#cbd5e1"}
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="end"
                      >
                        {rowFeat}
                      </text>

                      {/* Cells */}
                      {houseCorr[rowIdx].map((rVal, colIdx) => {
                        const isMasked = maskUpper && colIdx > rowIdx;
                        if (isMasked) return null;

                        const x = 110 + colIdx * 62;
                        const y = 45 + rowIdx * 45;
                        const cellCol = getCellColor(rVal);
                        const isCollinear =
                          Math.abs(rVal) >= collinearThreshold && rowIdx !== colIdx && rowFeat !== "Price" && houseFeatures[colIdx] !== "Price";
                        const isHovered =
                          hoveredCell && hoveredCell.row === rowIdx && hoveredCell.col === colIdx;

                        return (
                          <g
                            key={`${rowIdx}-${colIdx}`}
                            className="cursor-pointer"
                            onMouseEnter={() =>
                              setHoveredCell({
                                f1: rowFeat,
                                f2: houseFeatures[colIdx],
                                r: rVal,
                                isCollinear,
                                row: rowIdx,
                                col: colIdx
                              })
                            }
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            <rect
                              x={x + 1}
                              y={y + 1}
                              width={60}
                              height={43}
                              fill={cellCol}
                              stroke={isCollinear ? "#f59e0b" : isHovered ? "#ffffff" : "#0f172a"}
                              strokeWidth={isCollinear ? 2.5 : isHovered ? 2 : 1}
                              rx="2"
                            />
                            <text
                              x={x + 31}
                              y={y + 26}
                              fill="#ffffff"
                              fontSize="11"
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
                  <g transform="translate(435, 45)">
                    <rect x="0" y="0" width="16" height="225" fill="url(#houseGrad)" rx="2" stroke="#475569" strokeWidth="1" />
                    <text x="22" y="10" fill="#94a3b8" fontSize="9" fontFamily="monospace">+1.0</text>
                    <text x="22" y="115" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.0</text>
                    <text x="22" y="225" fill="#94a3b8" fontSize="9" fontFamily="monospace">-1.0</text>
                  </g>

                  {/* SVG Gradient */}
                  <defs>
                    <linearGradient id="houseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={getCellColor(1.0)} />
                      <stop offset="50%" stopColor={getCellColor(0.0)} />
                      <stop offset="100%" stopColor={getCellColor(-1.0)} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Hover Inspection / Feedback */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                {hoveredCell ? (
                  <span className="text-red-300 font-mono font-bold">
                    🔍 {hoveredCell.f1} ↔ {hoveredCell.f2} : r = {hoveredCell.r.toFixed(2)}{" "}
                    {hoveredCell.isCollinear && "⚠ Multicollinear Pair!"}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Hover any tile to inspect feature association</span>
                )}
                <span className="font-mono text-slate-400">Dataset: Barrackpore Real Estate</span>
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
                        ? "bg-red-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-red-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 12 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 12 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-red-600/30 border-red-500 text-red-200";
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
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-all"
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

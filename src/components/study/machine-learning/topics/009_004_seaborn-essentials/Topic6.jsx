import React, { useState } from "react";
import {
  Grid,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Eye,
  Layers,
  Palette
} from "lucide-react";

import pyCode1 from "./topic6_files/01_heatmap_basics.py?raw";
import pyCode2 from "./topic6_files/02_heatmap_annot_fmt_cmap.py?raw";
import pyCode3 from "./topic6_files/03_clustermap_hierarchy.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

const students = ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin"];
const subjects = ["LinReg", "LogReg", "DecTrees", "KMeans", "NeuralNets"];

// Matrix scores
const matrixData = [
  [88, 92, 85, 90, 94], // Debangshu
  [95, 98, 92, 96, 99], // Susmita
  [72, 70, 78, 75, 71], // Swadeep
  [91, 89, 94, 88, 92], // Tuhina
  [79, 82, 76, 80, 85]  // Sachin
];

export default function Topic6() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [showAnnot, setShowAnnot] = useState(true);
  const [cmap, setCmap] = useState("YlGnBu");
  const [lineWidth, setLineWidth] = useState(1);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_heatmap_basics.py", code: pyCode1 },
    { name: "02_heatmap_annot_fmt_cmap.py", code: pyCode2 },
    { name: "03_clustermap_hierarchy.py", code: pyCode3 }
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

  // Color generator based on score [70, 100] and cmap
  const getCellColor = (val) => {
    const t = (val - 70) / 30; // normalized 0 to 1
    if (cmap === "YlGnBu") {
      // Yellow -> Green -> Dark Blue
      const r = Math.round(255 * (1 - t * 0.9));
      const g = Math.round(240 * (1 - t * 0.4) + 50 * t);
      const b = Math.round(150 * (1 - t) + 240 * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (cmap === "coolwarm") {
      // Blue (low) -> White -> Red (high)
      if (t < 0.5) {
        const u = t * 2;
        return `rgb(${Math.round(59 + 196 * u)}, ${Math.round(130 + 125 * u)}, ${Math.round(246 + 9 * u)})`;
      } else {
        const u = (t - 0.5) * 2;
        return `rgb(${Math.round(255 - 15 * (1 - u))}, ${Math.round(255 - 180 * u)}, ${Math.round(255 - 200 * u)})`;
      }
    } else if (cmap === "magma") {
      // Dark purple -> bright orange/yellow
      const r = Math.round(20 + 235 * t);
      const g = Math.round(10 + 180 * t * t);
      const b = Math.round(60 + 120 * (1 - t));
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // viridis
      const r = Math.round(68 + 185 * t * (1 - t));
      const g = Math.round(1 + 230 * t);
      const b = Math.round(84 + 100 * (1 - t));
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Grid className="w-4 h-4" />
                <span>Machine Learning Module • Topic 6</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Heatmaps with sns.heatmap()
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Visualize 2D matrix grids, pivot tables, and tabular intensities. Master numeric cell annotations, color scales, and boundary customization.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Heatmap Matrix Studio", icon: Sparkles },
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
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
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
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Heatmap Styling Parameters</span>
              </div>

              {/* Colormap selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Colormap Palette (cmap=...):</label>
                <div className="grid grid-cols-2 gap-2">
                  {["YlGnBu", "viridis", "coolwarm", "magma"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCmap(c)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        cmap === c
                          ? "bg-teal-600 text-white border border-teal-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Annotation toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">Cell Annotations (annot=True):</div>
                <button
                  onClick={() => setShowAnnot(!showAnnot)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    showAnnot ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {showAnnot ? "ON" : "OFF"}
                </button>
              </div>

              {/* Line Width Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Grid Line Spacing (linewidths):</span>
                  <span className="font-mono text-teal-400">{lineWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Generated Code Snippet */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-teal-400 font-semibold mb-1"># Generated Code:</div>
                <div className="text-indigo-300">sns.heatmap(</div>
                <div className="pl-3 text-slate-400">df_scores,</div>
                <div className="pl-3 text-teal-300">annot={showAnnot ? "True" : "False"},</div>
                <div className="pl-3 text-slate-400">fmt="d",</div>
                <div className="pl-3 text-emerald-300">cmap="{cmap}",</div>
                <div className="pl-3 text-amber-300">linewidths={lineWidth}</div>
                <div className="text-indigo-300">)</div>
              </div>
            </div>

            {/* SVG Matrix Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-teal-400" />
                  Live SVG Heatmap Grid
                </span>
                <span className="text-xs font-mono text-slate-400">Scores Matrix [5x5]</span>
              </div>

              {/* Matrix Grid */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="490" height="290" viewBox="0 0 490 290" className="max-w-full">
                  {/* Column Header Titles */}
                  {subjects.map((sub, colIdx) => (
                    <text
                      key={sub}
                      x={110 + colIdx * 65 + 32}
                      y="25"
                      fill="#e2e8f0"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {sub}
                    </text>
                  ))}

                  {/* Row Names and Tiles */}
                  {students.map((st, rowIdx) => (
                    <g key={st}>
                      {/* Row Student Name */}
                      <text
                        x="95"
                        y={45 + rowIdx * 45 + 26}
                        fill="#cbd5e1"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="end"
                      >
                        {st}
                      </text>

                      {/* Cells for this row */}
                      {matrixData[rowIdx].map((val, colIdx) => {
                        const x = 110 + colIdx * 65;
                        const y = 45 + rowIdx * 45;
                        const cellCol = getCellColor(val);
                        const isHovered =
                          hoveredCell && hoveredCell.row === rowIdx && hoveredCell.col === colIdx;

                        return (
                          <g
                            key={`${rowIdx}-${colIdx}`}
                            className="cursor-pointer"
                            onMouseEnter={() =>
                              setHoveredCell({ student: st, subject: subjects[colIdx], val, row: rowIdx, col: colIdx })
                            }
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            <rect
                              x={x + lineWidth / 2}
                              y={y + lineWidth / 2}
                              width={65 - lineWidth}
                              height={45 - lineWidth}
                              fill={cellCol}
                              stroke={isHovered ? "#ffffff" : "#0f172a"}
                              strokeWidth={isHovered ? 2 : 0.5}
                              rx="2"
                            />
                            {showAnnot && (
                              <text
                                x={x + 32}
                                y={y + 27}
                                fill={val > 88 ? "#ffffff" : "#0f172a"}
                                fontSize="12"
                                fontWeight="bold"
                                textAnchor="middle"
                                fontFamily="monospace"
                              >
                                {val}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  ))}

                  {/* Colorbar strip on right side */}
                  <g transform="translate(445, 45)">
                    <rect x="0" y="0" width="16" height="225" fill="url(#cbarGradient)" rx="2" stroke="#475569" strokeWidth="1" />
                    <text x="22" y="10" fill="#94a3b8" fontSize="9" fontFamily="monospace">100</text>
                    <text x="22" y="115" fill="#94a3b8" fontSize="9" fontFamily="monospace">85</text>
                    <text x="22" y="225" fill="#94a3b8" fontSize="9" fontFamily="monospace">70</text>
                  </g>

                  {/* SVG Gradient definition for colorbar */}
                  <defs>
                    <linearGradient id="cbarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={getCellColor(100)} />
                      <stop offset="50%" stopColor={getCellColor(85)} />
                      <stop offset="100%" stopColor={getCellColor(70)} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Hover Inspection */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                {hoveredCell ? (
                  <span className="text-teal-300 font-mono font-bold">
                    🎯 {hoveredCell.student} • {hoveredCell.subject} : Score = {hoveredCell.val}/100
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Hover any tile to inspect student performance coordinates</span>
                )}
                <span className="font-mono text-slate-400">Matrix size: 5 × 5</span>
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
                        ? "bg-teal-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 6 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 6 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-teal-600/30 border-teal-500 text-teal-200";
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
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-teal-600/30 transition-all"
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

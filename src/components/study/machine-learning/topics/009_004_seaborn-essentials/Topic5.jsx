import React, { useState } from "react";
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Maximize2,
  CircleDot,
  Layers
} from "lucide-react";

import pyCode1 from "./topic5_files/01_scatterplot_hue_size.py?raw";
import pyCode2 from "./topic5_files/02_lineplot_aggregation_ci.py?raw";
import pyCode3 from "./topic5_files/03_relplot_facets.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

const studentPoints = [
  { name: "Debangshu", hours: 14, score: 92, projCount: 5, dept: "Deep Learning", style: "circle" },
  { name: "Susmita", hours: 16, score: 96, projCount: 6, dept: "Data Science", style: "square" },
  { name: "Swadeep", hours: 8, score: 72, projCount: 2, dept: "Web ML", style: "cross" },
  { name: "Tuhina", hours: 13, score: 89, projCount: 4, dept: "Data Science", style: "square" },
  { name: "Sachin", hours: 10, score: 78, projCount: 3, dept: "Web ML", style: "cross" },
  { name: "Mahima", hours: 15, score: 95, projCount: 5, dept: "Deep Learning", style: "circle" },
  { name: "Abhronila", hours: 11, score: 85, projCount: 4, dept: "Data Science", style: "square" }
];

// Aggregated trend points for lineplot
const trendPoints = [
  { x: 6, y: 60, low: 55, high: 65 },
  { x: 8, y: 72, low: 67, high: 77 },
  { x: 10, y: 78, low: 73, high: 83 },
  { x: 12, y: 84, low: 79, high: 89 },
  { x: 14, y: 91, low: 86, high: 95 },
  { x: 16, y: 96, low: 92, high: 99 }
];

const deptColors = {
  "Deep Learning": "#ec4899",
  "Data Science": "#3b82f6",
  "Web ML": "#10b981"
};

export default function Topic5() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [plotKind, setPlotKind] = useState("scatter"); // "scatter" | "line"
  const [enableHue, setEnableHue] = useState(true);
  const [enableSize, setEnableSize] = useState(true);
  const [enableStyle, setEnableStyle] = useState(true);
  const [showCI, setShowCI] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_scatterplot_hue_size.py", code: pyCode1 },
    { name: "02_lineplot_aggregation_ci.py", code: pyCode2 },
    { name: "03_relplot_facets.py", code: pyCode3 }
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

  // SVG Line coordinates
  const linePointsString = trendPoints
    .map((p) => {
      const sx = 60 + ((p.x - 6) / 10) * 400;
      const sy = 240 - ((p.y - 50) / 50) * 190;
      return `${sx},${sy}`;
    })
    .join(" ");

  // Shaded CI band area
  const ciAreaPath = () => {
    const top = trendPoints.map((p) => {
      const sx = 60 + ((p.x - 6) / 10) * 400;
      const sy = 240 - ((p.high - 50) / 50) * 190;
      return `${sx},${sy}`;
    });
    const bottom = [...trendPoints].reverse().map((p) => {
      const sx = 60 + ((p.x - 6) / 10) * 400;
      const sy = 240 - ((p.low - 50) / 50) * 190;
      return `${sx},${sy}`;
    });
    return `M ${top[0]} ${top.slice(1).map((pt) => `L ${pt}`).join(" ")} ${bottom.map((pt) => `L ${pt}`).join(" ")} Z`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border border-sky-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Machine Learning Module • Topic 5</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Relationship Plots: scatterplot &amp; lineplot
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Explore continuous statistical relationships. Encode multidimensional channels with hue, size, style, and automatic time series aggregation.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Relationship Plot Studio", icon: Sparkles },
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
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
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
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Plot Family &amp; Encodings</span>
              </div>

              {/* Plot type */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPlotKind("scatter")}
                  className={`p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    plotKind === "scatter"
                      ? "bg-sky-600 text-white border border-sky-400 shadow"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  sns.scatterplot()
                </button>
                <button
                  onClick={() => setPlotKind("line")}
                  className={`p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    plotKind === "line"
                      ? "bg-sky-600 text-white border border-sky-400 shadow"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  sns.lineplot()
                </button>
              </div>

              {/* Scatter Encodings */}
              {plotKind === "scatter" ? (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-medium text-slate-300">Visual Encoding Channels:</div>
                  <div className="space-y-2">
                    <button
                      onClick={() => setEnableHue(!enableHue)}
                      className={`w-full p-2.5 rounded-xl text-xs font-mono flex items-center justify-between border ${
                        enableHue ? "bg-sky-950/60 border-sky-500 text-sky-300" : "bg-slate-950 border-slate-800 text-slate-500"
                      }`}
                    >
                      <span>hue="Track" (Color)</span>
                      <span>{enableHue ? "✓ ON" : "OFF"}</span>
                    </button>
                    <button
                      onClick={() => setEnableSize(!enableSize)}
                      className={`w-full p-2.5 rounded-xl text-xs font-mono flex items-center justify-between border ${
                        enableSize ? "bg-sky-950/60 border-sky-500 text-sky-300" : "bg-slate-950 border-slate-800 text-slate-500"
                      }`}
                    >
                      <span>size="Projects" (Point Area)</span>
                      <span>{enableSize ? "✓ ON" : "OFF"}</span>
                    </button>
                    <button
                      onClick={() => setEnableStyle(!enableStyle)}
                      className={`w-full p-2.5 rounded-xl text-xs font-mono flex items-center justify-between border ${
                        enableStyle ? "bg-sky-950/60 border-sky-500 text-sky-300" : "bg-slate-950 border-slate-800 text-slate-500"
                      }`}
                    >
                      <span>style="Track" (Markers)</span>
                      <span>{enableStyle ? "✓ ON" : "OFF"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-300 font-medium">95% Shaded CI Band:</span>
                    <button
                      onClick={() => setShowCI(!showCI)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        showCI ? "bg-sky-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {showCI ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>
              )}

              {/* Generated code snippet */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-sky-400 font-semibold mb-1"># Generated Code:</div>
                <div className="text-indigo-300">sns.{plotKind === "scatter" ? "scatterplot" : "lineplot"}(</div>
                <div className="pl-3 text-slate-400">data=df, x="Hours", y="Score",</div>
                {plotKind === "scatter" && enableHue && <div className="pl-3 text-sky-300">hue="Track",</div>}
                {plotKind === "scatter" && enableSize && <div className="pl-3 text-amber-300">size="Projects", sizes=(40, 180),</div>}
                {plotKind === "scatter" && enableStyle && <div className="pl-3 text-pink-300">style="Track",</div>}
                {plotKind === "line" && showCI && <div className="pl-3 text-emerald-300">errorbar="ci",</div>}
                <div className="text-indigo-300">)</div>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  Live SVG Rendering: sns.{plotKind === "scatter" ? "scatterplot" : "lineplot"}()
                </span>
                <span className="text-xs font-mono text-slate-400">Study Hours vs ML Exam Score</span>
              </div>

              {/* Dynamic SVG */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="500" height="290" viewBox="0 0 500 290" className="max-w-full">
                  {/* Grid */}
                  <line x1="50" y1="50" x2="470" y2="50" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="110" x2="470" y2="110" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="470" y2="170" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="240" x2="470" y2="240" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="240" stroke="#64748b" strokeWidth="1.5" />

                  {/* Y Axis ticks */}
                  <text x="40" y="244" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">50</text>
                  <text x="40" y="174" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">65</text>
                  <text x="40" y="114" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">80</text>
                  <text x="40" y="54" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">100</text>

                  {/* X Axis ticks */}
                  {[6, 8, 10, 12, 14, 16].map((hrs) => {
                    const x = 60 + ((hrs - 6) / 10) * 400;
                    return (
                      <g key={hrs}>
                        <line x1={x} y1="240" x2={x} y2="245" stroke="#94a3b8" />
                        <text x={x} y="260" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {hrs}h
                        </text>
                      </g>
                    );
                  })}

                  {/* Scatter Mode */}
                  {plotKind === "scatter" &&
                    studentPoints.map((st, i) => {
                      const cx = 60 + ((st.hours - 6) / 10) * 400;
                      const cy = 240 - ((st.score - 50) / 50) * 190;
                      const r = enableSize ? 5 + st.projCount * 2.2 : 8;
                      const col = enableHue ? deptColors[st.dept] : "#38bdf8";

                      return (
                        <g
                          key={i}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredPoint(st)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                          {enableStyle && st.style === "square" ? (
                            <rect
                              x={cx - r}
                              y={cy - r}
                              width={r * 2}
                              height={r * 2}
                              fill={col}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              opacity="0.9"
                            />
                          ) : (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={r}
                              fill={col}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              opacity="0.9"
                            />
                          )}
                          <text x={cx} y={cy - r - 4} fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">
                            {st.name}
                          </text>
                        </g>
                      );
                    })}

                  {/* Line Plot Mode */}
                  {plotKind === "line" && (
                    <>
                      {showCI && <path d={ciAreaPath()} fill="#38bdf8" opacity="0.25" />}
                      <polyline
                        points={linePointsString}
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {trendPoints.map((p, idx) => {
                        const sx = 60 + ((p.x - 6) / 10) * 400;
                        const sy = 240 - ((p.y - 50) / 50) * 190;
                        return <circle key={idx} cx={sx} cy={sy} r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />;
                      })}
                    </>
                  )}

                  {/* Axis Title */}
                  <text x="260" y="280" fill="#e2e8f0" fontSize="11" fontWeight="600" textAnchor="middle">
                    Study Hours / Week
                  </text>
                </svg>
              </div>

              {/* Hover / Legend Details */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                {hoveredPoint ? (
                  <div className="text-sky-400 font-mono">
                    🎓 {hoveredPoint.name}: {hoveredPoint.hours} hrs -&gt; Score {hoveredPoint.score} | Track: {hoveredPoint.dept} | {hoveredPoint.projCount} Projects
                  </div>
                ) : (
                  <div className="text-slate-400 font-mono">
                    {plotKind === "scatter"
                      ? "Hover a dot to inspect multidimensional metadata"
                      : "Solid line: Mean regression curve | Shading: 95% Confidence Interval"}
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
                        ? "bg-sky-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 5 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 5 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-sky-600/30 border-sky-500 text-sky-200";
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
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-sky-600/30 transition-all"
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

import React, { useState } from "react";
import {
  PieChart as PieIcon,
  Terminal,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  Code
} from "lucide-react";
import pyCode1 from "./topic7_files/01_pie_charts_and_proportions.py?raw";
import pyCode2 from "./topic7_files/02_donut_charts_and_center_circles.py?raw";
import pyCode3 from "./topic7_files/03_nested_pie_charts_hierarchical.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

export default function Topic7() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Pie / Donut Controls
  const [isDonut, setIsDonut] = useState(true);
  const [holeRadius, setHoleRadius] = useState(55);
  const [explodeVal, setExplodeVal] = useState(12);
  const [startAngle, setStartAngle] = useState(90);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_pie_charts_and_proportions.py", code: pyCode1, desc: "Slices, explode offsets, percentage formatting (autopct), and drop shadows" },
    2: { name: "02_donut_charts_and_center_circles.py", code: pyCode2, desc: "Modern donut charts with wedgeprops width carving and central KPI metric overlays" },
    3: { name: "03_nested_pie_charts_hierarchical.py", code: pyCode3, desc: "Nested concentric double-ring donut charts for hierarchical data structures" }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionSelect = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  // Synthetic fraud distribution dataset
  const slices = [
    { label: "Normal (Legitimate)", pct: 68, color: "#10b981", explode: 0 },
    { label: "Card Fraud", pct: 18, color: "#ef4444", explode: explodeVal },
    { label: "Wire Fraud", pct: 9, color: "#f59e0b", explode: explodeVal * 0.7 },
    { label: "Account Takeover", pct: 5, color: "#8b5cf6", explode: explodeVal * 0.5 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-rose-900/40 via-pink-900/30 to-purple-900/40 border border-rose-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 7: Pie &amp; Donut Charts with plt.pie()
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Master categorical proportion and class balance visualization in machine learning. Learn slice explosion (<code className="text-rose-300 font-mono">explode</code>), precision percentage formatting (<code className="text-rose-300 font-mono">autopct</code>), modern Donut charts with central KPI annotations, and nested double-ring hierarchies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <PieIcon className="w-3.5 h-3.5" /> plt.pie()
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Donut &amp; Nested
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-rose-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "When Susmita and Swadeep built an anomaly detection pipeline for banking fraud, legitimate records were 98% and fraud was 2%. A plain pie chart made the fraud slice almost invisible. By exploding the target slice with <code className="text-rose-300 font-mono">explode=(0, 0.15)</code> and turning it into a Donut chart with the total count in the center, the class imbalance was instantly clear!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Pie & Donut Studio", icon: PieIcon },
            { id: "lab", label: "Python Code Lab (3 Scripts)", icon: Terminal },
            { id: "notes", label: "Revision Notes", icon: FileText },
            { id: "quiz", label: "MCQ Assessment", icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px rounded-t-lg ${
                  activeTab === tab.id
                    ? "border-rose-500 text-rose-400 bg-rose-950/30"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: STUDIO */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="text-rose-400 w-5 h-5" />
                  Wedge &amp; Geometry Configurator
                </h2>

                {/* Donut Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Chart Style Geometry
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsDonut(false)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition ${
                        !isDonut
                          ? "border-rose-500 bg-rose-950/60 text-rose-300 ring-1 ring-rose-500"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      Solid Pie Chart
                    </button>
                    <button
                      onClick={() => setIsDonut(true)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition ${
                        isDonut
                          ? "border-rose-500 bg-rose-950/60 text-rose-300 ring-1 ring-rose-500"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      Modern Donut (wedgeprops)
                    </button>
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-3 pt-2">
                  {isDonut && (
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <span>Hole Radius (Center Cutout)</span>
                        <span className="text-rose-400 font-mono">{holeRadius}%</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="75"
                        step="5"
                        value={holeRadius}
                        onChange={(e) => setHoleRadius(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Target Slice Explode Offset</span>
                      <span className="text-rose-400 font-mono">{(explodeVal / 100).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="2"
                      value={explodeVal}
                      onChange={(e) => setExplodeVal(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>startangle (Degrees)</span>
                      <span className="text-rose-400 font-mono">{startAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="15"
                      value={startAngle}
                      onChange={(e) => setStartAngle(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-rose-400" />
                      Live Pie/Donut Visual Canvas
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-rose-300 border border-slate-800">
                      startangle={startAngle}° | {isDonut ? `width=${(100 - holeRadius) / 100}` : "solid"}
                    </span>
                  </div>

                  {/* SVG Renderer */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                      {/* Donut / Pie Slices using SVG path arcs */}
                      <g transform={`rotate(${startAngle - 90} 180 125)`}>
                        {/* Slice 1: Normal (68%) -> 244.8 deg */}
                        <path
                          d="M 180 125 L 180 35 A 90 90 0 1 1 97 160 Z"
                          fill="#10b981"
                          stroke="#0f172a"
                          strokeWidth="2"
                        />
                        {/* Slice 2: Card Fraud (18%) -> Exploded */}
                        <g transform={`translate(${explodeVal * 0.8}, ${explodeVal * 0.8})`}>
                          <path
                            d="M 180 125 L 97 160 A 90 90 0 0 1 95 85 Z"
                            fill="#ef4444"
                            stroke="#0f172a"
                            strokeWidth="2"
                          />
                        </g>
                        {/* Slice 3: Wire Fraud (9%) */}
                        <path
                          d="M 180 125 L 95 85 A 90 90 0 0 1 135 45 Z"
                          fill="#f59e0b"
                          stroke="#0f172a"
                          strokeWidth="2"
                        />
                        {/* Slice 4: Takeover (5%) */}
                        <path
                          d="M 180 125 L 135 45 A 90 90 0 0 1 180 35 Z"
                          fill="#8b5cf6"
                          stroke="#0f172a"
                          strokeWidth="2"
                        />

                        {/* Center Cutout for Donut */}
                        {isDonut && (
                          <circle
                            cx="180"
                            cy="125"
                            r={holeRadius * 0.9}
                            fill="#0b0f19"
                            stroke="#1e293b"
                            strokeWidth="2"
                          />
                        )}
                      </g>

                      {/* Center KPI text if donut */}
                      {isDonut && (
                        <g>
                          <text x="180" y="118" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                            9,300
                          </text>
                          <text x="180" y="134" fill="#94a3b8" fontSize="8" textAnchor="middle">
                            Total Trans
                          </text>
                        </g>
                      )}

                      {/* Legend List on the right */}
                      <g transform="translate(320, 45)">
                        <rect x="0" y="0" width="180" height="150" fill="#0f172a" rx="6" stroke="#334155" />
                        <text x="15" y="22" fill="#f8fafc" fontSize="11" fontWeight="bold">
                          Class Breakdown
                        </text>
                        {slices.map((s, idx) => (
                          <g key={idx} transform={`translate(15, ${38 + idx * 28})`}>
                            <rect x="0" y="0" width="12" height="12" fill={s.color} rx="2" />
                            <text x="20" y="10" fill="#cbd5e1" fontSize="9.5">
                              {s.label} ({s.pct}%)
                            </text>
                          </g>
                        ))}
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-rose-400" />
                    Generated Matplotlib Python Code:
                  </div>
                  <pre className="text-rose-300">
{`explode = (0, ${(explodeVal / 100).toFixed(2)}, 0, 0)
wedges, texts, autotexts = ax.pie(
    counts,
    explode=explode,
    labels=labels,
    colors=colors,
    autopct='%1.1f%%',
    startangle=${startAngle}${isDonut ? `,\n    wedgeprops=dict(width=${((100 - holeRadius) / 100).toFixed(2)}, edgecolor='#0f172a', linewidth=2)` : ""}
)
${isDonut ? "ax.text(0, 0, 'TOTAL\\n9.3k', ha='center', va='center', fontweight='bold')\n" : ""}ax.set_title("Fraud Class Distribution")
plt.show()`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "lab" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Terminal className="text-rose-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore pie chart explosion, modern donut wedgeprops, and nested hierarchical rings.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-rose-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Script 0{num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-rose-400">{scripts[activeScript].name}</span>
                <p className="text-xs text-slate-300 mt-0.5">{scripts[activeScript].desc}</p>
              </div>
              <button
                onClick={() => copyCode(scripts[activeScript].code)}
                className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[500px]">
                {scripts[activeScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION NOTES */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-rose-400 w-5 h-5" />
                Pie &amp; Donut Chart Technical Notes
              </h2>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {noteText}
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="text-rose-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of pie chart parameters, slice explosion, and donut charts.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-300 text-sm font-bold">
                  Score: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, qIndex) => (
                <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-semibold text-white mb-3">
                    {qIndex + 1}. {q.question}
                  </h3>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedAnswers[q.id] === optIndex;
                      const isCorrect = q.correctAnswer === optIndex;
                      let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700";

                      if (showResults) {
                        if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
                        else if (isSelected && !isCorrect) btnStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200 ring-1 ring-rose-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => !showResults && handleOptionSelect(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-lg text-xs border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-400">
                      <strong className="text-rose-300">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                Reset
              </button>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-rose-600/30"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

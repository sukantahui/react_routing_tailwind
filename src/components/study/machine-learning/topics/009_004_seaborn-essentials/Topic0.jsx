import React, { useState } from "react";
import {
  BarChart3,
  Layers,
  Sparkles,
  BookOpen,
  Code2,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  Copy,
  Check,
  Eye,
  Sliders,
  Palette
} from "lucide-react";

import pyCode1 from "./topic0_files/01_intro_seaborn_basics.py?raw";
import pyCode2 from "./topic0_files/02_dataset_loading_tips.py?raw";
import pyCode3 from "./topic0_files/03_seaborn_figure_styles.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

const sampleStudents = [
  { name: "Debangshu", hours: 12, score: 88, track: "Deep Learning", gender: "Male" },
  { name: "Susmita", hours: 15, score: 95, track: "Data Science", gender: "Female" },
  { name: "Swadeep", hours: 8, score: 72, track: "Web ML", gender: "Male" },
  { name: "Tuhina", hours: 14, score: 91, track: "Data Science", gender: "Female" },
  { name: "Sachin", hours: 10, score: 79, track: "Web ML", gender: "Male" },
  { name: "Mahima", hours: 16, score: 98, track: "Deep Learning", gender: "Female" },
  { name: "Abhronila", hours: 11, score: 84, track: "Data Science", gender: "Female" }
];

const trackColors = {
  "Deep Learning": "#ec4899",
  "Data Science": "#3b82f6",
  "Web ML": "#10b981"
};

const genderColors = {
  "Male": "#06b6d4",
  "Female": "#f43f5e"
};

export default function Topic0() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [theme, setTheme] = useState("darkgrid");
  const [hueField, setHueField] = useState("track");
  const [pointSize, setPointSize] = useState(10);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_intro_seaborn_basics.py", code: pyCode1 },
    { name: "02_dataset_loading_tips.py", code: pyCode2 },
    { name: "03_seaborn_figure_styles.py", code: pyCode3 }
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

  // Canvas background according to theme
  const getThemeBg = () => {
    switch (theme) {
      case "darkgrid":
        return { bg: "#0f172a", grid: "#334155", text: "#e2e8f0" };
      case "whitegrid":
        return { bg: "#ffffff", grid: "#e2e8f0", text: "#1e293b" };
      case "dark":
        return { bg: "#090d16", grid: "transparent", text: "#e2e8f0" };
      case "white":
      case "ticks":
        return { bg: "#f8fafc", grid: "transparent", text: "#1e293b" };
      default:
        return { bg: "#0f172a", grid: "#334155", text: "#e2e8f0" };
    }
  };

  const currentTheme = getThemeBg();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <BarChart3 className="w-4 h-4" />
                <span>Machine Learning Module • Topic 0</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Introduction to Seaborn
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master statistical data visualization in Python. Explore high-level DataFrame integration, declarative aesthetic styling, and multidimensional visual encodings.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono self-start md:self-auto">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Visual Studio", icon: Sparkles },
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
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
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
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Seaborn Parameters &amp; Theme</span>
              </div>

              {/* Theme selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>sns.set_theme(style)</span>
                  <span className="font-mono text-indigo-400">{theme}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["darkgrid", "whitegrid", "dark", "white"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setTheme(s)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        theme === s
                          ? "bg-indigo-600 text-white border border-indigo-400"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hue Field selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Hue Category (hue=...)</span>
                  <span className="font-mono text-cyan-400">{hueField}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHueField("track")}
                    className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                      hueField === "track"
                        ? "bg-cyan-600 text-white border border-cyan-400"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    Track (3 classes)
                  </button>
                  <button
                    onClick={() => setHueField("gender")}
                    className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                      hueField === "gender"
                        ? "bg-cyan-600 text-white border border-cyan-400"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    Gender (2 classes)
                  </button>
                </div>
              </div>

              {/* Point Size Slider */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Marker Size (s=...)</span>
                  <span className="font-mono text-amber-400">{pointSize}px</span>
                </label>
                <input
                  type="range"
                  min="6"
                  max="16"
                  step="1"
                  value={pointSize}
                  onChange={(e) => setPointSize(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Live Generated Seaborn Python snippet */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-indigo-400 font-semibold mb-1"># Live Seaborn Code:</div>
                <div className="text-emerald-400">sns.set_theme(style="{theme}")</div>
                <div className="text-indigo-300">sns.scatterplot(</div>
                <div className="pl-3 text-slate-400">data=df,</div>
                <div className="pl-3 text-slate-400">x="Study_Hours",</div>
                <div className="pl-3 text-slate-400">y="ML_Score",</div>
                <div className="pl-3 text-cyan-300">hue="{hueField}",</div>
                <div className="pl-3 text-amber-300">s={pointSize * 15}</div>
                <div className="text-indigo-300">)</div>
              </div>
            </div>

            {/* Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  Live SVG Rendering: sns.scatterplot()
                </span>
                <span className="text-xs font-mono text-slate-400">Dataset: Barrackpore Batch 2026</span>
              </div>

              {/* Canvas SVG */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto" style={{ backgroundColor: currentTheme.bg }}>
                <svg width="520" height="320" viewBox="0 0 520 320" className="max-w-full">
                  {/* Grid Lines */}
                  {currentTheme.grid !== "transparent" && (
                    <>
                      {/* Vertical grid */}
                      {[60, 140, 220, 300, 380, 460].map((x) => (
                        <line key={`vg-${x}`} x1={x} y1="30" x2={x} y2="260" stroke={currentTheme.grid} strokeWidth="1" strokeDasharray="3 3" />
                      ))}
                      {/* Horizontal grid */}
                      {[60, 110, 160, 210, 260].map((y) => (
                        <line key={`hg-${y}`} x1="50" y1={y} x2="470" y2={y} stroke={currentTheme.grid} strokeWidth="1" strokeDasharray="3 3" />
                      ))}
                    </>
                  )}

                  {/* Axes lines */}
                  <line x1="50" y1="260" x2="470" y2="260" stroke={currentTheme.text} strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="260" stroke={currentTheme.text} strokeWidth="1.5" />

                  {/* Y Axis Labels */}
                  <text x="40" y="264" fill={currentTheme.text} fontSize="10" textAnchor="end" fontFamily="monospace">60</text>
                  <text x="40" y="214" fill={currentTheme.text} fontSize="10" textAnchor="end" fontFamily="monospace">70</text>
                  <text x="40" y="164" fill={currentTheme.text} fontSize="10" textAnchor="end" fontFamily="monospace">80</text>
                  <text x="40" y="114" fill={currentTheme.text} fontSize="10" textAnchor="end" fontFamily="monospace">90</text>
                  <text x="40" y="64" fill={currentTheme.text} fontSize="10" textAnchor="end" fontFamily="monospace">100</text>

                  {/* X Axis Labels */}
                  <text x="60" y="278" fill={currentTheme.text} fontSize="10" textAnchor="middle" fontFamily="monospace">6h</text>
                  <text x="140" y="278" fill={currentTheme.text} fontSize="10" textAnchor="middle" fontFamily="monospace">8h</text>
                  <text x="220" y="278" fill={currentTheme.text} fontSize="10" textAnchor="middle" fontFamily="monospace">10h</text>
                  <text x="300" y="278" fill={currentTheme.text} fontSize="10" textAnchor="middle" fontFamily="monospace">12h</text>
                  <text x="380" y="278" fill={currentTheme.text} fontSize="10" textAnchor="middle" fontFamily="monospace">14h</text>
                  <text x="460" y="278" fill={currentTheme.text} fontSize="10" textAnchor="middle" fontFamily="monospace">16h</text>

                  {/* Axis Titles */}
                  <text x="260" y="305" fill={currentTheme.text} fontSize="11" fontWeight="600" textAnchor="middle">
                    Study Hours / Week
                  </text>
                  <text x="-145" y="20" fill={currentTheme.text} fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90)">
                    ML Score (/100)
                  </text>

                  {/* Data Points */}
                  {sampleStudents.map((st, i) => {
                    // Map hours [6, 17] -> x [60, 480]
                    const cx = 60 + ((st.hours - 6) / 11) * 410;
                    // Map score [60, 100] -> y [260, 60]
                    const cy = 260 - ((st.score - 60) / 40) * 200;
                    const color = hueField === "track" ? trackColors[st.track] : genderColors[st.gender];

                    return (
                      <g
                        key={i}
                        className="cursor-pointer transition-transform duration-150"
                        onMouseEnter={() => setHoveredPoint(st)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={pointSize}
                          fill={color}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          opacity="0.9"
                        />
                        {/* Name tag */}
                        <text
                          x={cx}
                          y={cy - pointSize - 4}
                          fill={currentTheme.text}
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {st.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legend & Hover details */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                {/* Dynamic Legend */}
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 font-semibold">Legend:</span>
                  {hueField === "track"
                    ? Object.entries(trackColors).map(([trk, col]) => (
                        <div key={trk} className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col }} />
                          <span className="text-slate-300">{trk}</span>
                        </div>
                      ))
                    : Object.entries(genderColors).map(([g, col]) => (
                        <div key={g} className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col }} />
                          <span className="text-slate-300">{g}</span>
                        </div>
                      ))}
                </div>

                {/* Hover inspection */}
                {hoveredPoint ? (
                  <div className="text-cyan-400 font-mono">
                    🎓 {hoveredPoint.name}: {hoveredPoint.hours} hrs -&gt; Score {hoveredPoint.score} ({hoveredPoint[hueField]})
                  </div>
                ) : (
                  <div className="text-slate-500 italic">Hover any student dot to inspect properties</div>
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
                        ? "bg-indigo-600 text-white shadow"
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
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 0 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 0 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-indigo-600/30 border-indigo-500 text-indigo-200";
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
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
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

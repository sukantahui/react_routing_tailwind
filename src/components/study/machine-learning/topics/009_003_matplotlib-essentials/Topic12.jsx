import React, { useState } from "react";
import {
  GraduationCap,
  Terminal,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  Code,
  Award
} from "lucide-react";
import pyCode1 from "./topic12_files/01_student_marks_grouped_bar.py?raw";
import pyCode2 from "./topic12_files/02_student_progress_timeline_and_ranking.py?raw";
import pyCode3 from "./topic12_files/03_radar_spider_competency_chart.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

export default function Topic12() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Studio View
  const [viewMode, setViewMode] = useState("grouped"); // "grouped", "timeline", "radar"

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_student_marks_grouped_bar.py", code: pyCode1, desc: "Multi-subject grouped bar benchmark comparison across student cohorts" },
    2: { name: "02_student_progress_timeline_and_ranking.py", code: pyCode2, desc: "Mock test score progression and growth trajectory curves" },
    3: { name: "03_radar_spider_competency_chart.py", code: pyCode3, desc: "Polar coordinate spider/radar assessment for multi-skill evaluations" }
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

  const students = [
    { name: "Debangshu", py: 88, ml: 84, sql: 90 },
    { name: "Susmita", py: 95, ml: 98, sql: 92 },
    { name: "Swadeep", py: 74, ml: 70, sql: 82 },
    { name: "Tuhina", py: 92, ml: 94, sql: 89 },
    { name: "Sachin", py: 85, ml: 88, sql: 84 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-blue-900/40 border border-emerald-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 12: Worked Example 1 — Plotting Student Marks
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              End-to-end practical case study from Coder &amp; AccoTax (Barrackpore). Compare student cohorts across Python, ML, and SQL using grouped bar benchmarks, analyze mock test progression curves, and build polar radar/spider competency profiles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Case Study 01
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Performance Analytics
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-emerald-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "In our Barrackpore classroom, we evaluate students across multiple dimensions: raw subject benchmark scores, test-over-test velocity, and multi-skill competency webs. This worked example demonstrates how to synthesize these three distinct perspectives into production-grade Matplotlib figures!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Academic Analytics Studio", icon: GraduationCap },
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
                    ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
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
                  <Sliders className="text-emerald-400 w-5 h-5" />
                  Analytics Perspective
                </h2>

                <div className="space-y-2.5">
                  {[
                    { id: "grouped", title: "1. Grouped Subject Benchmark", desc: "Python vs ML vs SQL across all students" },
                    { id: "timeline", title: "2. Score Growth Trajectory", desc: "6 Mock tests showing learning acceleration" },
                    { id: "radar", title: "3. Polar Radar Competency Web", desc: "6-Skill diagnostic profile (Susmita vs Swadeep)" }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setViewMode(m.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition ${
                        viewMode === m.id
                          ? "border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500 shadow-md"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-semibold text-white text-xs">{m.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-300 block mb-1">Pedagogical Insight:</strong>
                  {viewMode === "grouped" && "Grouped bars highlight that while Susmita leads overall with 98% in ML, Swadeep excels in SQL (82%) despite needing support in ML."}
                  {viewMode === "timeline" && "The trajectory curve highlights Swadeep's steep +27% learning curve from Mock 1 (55%) to Mock 6 (82%)."}
                  {viewMode === "radar" && "The polar radar chart reveals Susmita's balanced mastery across all 6 data science domains."}
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      Live Educational Dashboard
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-slate-800 uppercase">
                      View: {viewMode}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    {viewMode === "grouped" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="45" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        {/* 75% Benchmark Line */}
                        <line x1="45" y1="72" x2="490" y2="72" stroke="#ef4444" strokeDasharray="4,4" strokeWidth="1.2" />
                        <text x="480" y="66" fill="#ef4444" fontSize="8" textAnchor="end">75% Distinction</text>

                        <line x1="45" y1="200" x2="490" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="45" y1="20" x2="45" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {students.map((s, idx) => {
                          const x = 75 + idx * 85;
                          const hPy = (s.py / 100) * 170;
                          const hML = (s.ml / 100) * 170;
                          const hSQL = (s.sql / 100) * 170;
                          return (
                            <g key={idx}>
                              <rect x={x - 24} y={200 - hPy} width="15" height={hPy} fill="#0284c7" rx="2" />
                              <rect x={x - 7} y={200 - hML} width="15" height={hML} fill="#10b981" rx="2" />
                              <rect x={x + 10} y={200 - hSQL} width="15" height={hSQL} fill="#f59e0b" rx="2" />
                              <text x={x} y="215" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                                {s.name}
                              </text>
                            </g>
                          );
                        })}

                        {/* Legend */}
                        <rect x="330" y="20" width="150" height="35" fill="#0f172a" rx="4" stroke="#334155" />
                        <rect x="338" y="27" width="8" height="8" fill="#0284c7" />
                        <text x="350" y="34" fill="#cbd5e1" fontSize="8">Python</text>
                        <rect x="385" y="27" width="8" height="8" fill="#10b981" />
                        <text x="397" y="34" fill="#cbd5e1" fontSize="8">ML</text>
                        <rect x="425" y="27" width="8" height="8" fill="#f59e0b" />
                        <text x="437" y="34" fill="#cbd5e1" fontSize="8">SQL</text>
                      </svg>
                    )}

                    {viewMode === "timeline" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="45" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="45" y1="200" x2="490" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="45" y1="20" x2="45" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {/* Susmita curve (Green) */}
                        <polyline fill="none" stroke="#10b981" strokeWidth="2.5" points="70,60 145,55 225,45 305,40 385,30 465,24" />
                        {/* Swadeep curve (Yellow most improved) */}
                        <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4,4" points="70,120 145,105 225,90 305,80 385,72 465,58" />
                        {/* Debangshu curve (Blue) */}
                        <polyline fill="none" stroke="#0284c7" strokeWidth="2" points="70,95 145,85 225,72 305,65 385,60 465,48" />

                        {["M1", "M2", "M3", "M4", "M5", "M6"].map((m, idx) => (
                          <text key={idx} x={70 + idx * 79} y="215" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                            {m}
                          </text>
                        ))}

                        {/* Legend */}
                        <rect x="320" y="80" width="160" height="55" fill="#0f172a" rx="4" stroke="#334155" />
                        <line x1="330" y1="92" x2="350" y2="92" stroke="#10b981" strokeWidth="2" />
                        <text x="355" y="95" fill="#cbd5e1" fontSize="8.5">Susmita (Leader)</text>
                        <line x1="330" y1="108" x2="350" y2="108" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                        <text x="355" y="111" fill="#cbd5e1" fontSize="8.5">Swadeep (+27% Growth)</text>
                        <line x1="330" y1="124" x2="350" y2="124" stroke="#0284c7" strokeWidth="2" />
                        <text x="355" y="127" fill="#cbd5e1" fontSize="8.5">Debangshu (Steady)</text>
                      </svg>
                    )}

                    {viewMode === "radar" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {/* Polar Concentric Circles */}
                        {[25, 50, 75, 95].map((r) => (
                          <circle key={r} cx="260" cy="125" r={r} fill="none" stroke="#334155" strokeDasharray="3,3" />
                        ))}

                        {/* 6 Radial Axes */}
                        {[0, 60, 120, 180, 240, 300].map((deg) => {
                          const rad = (deg * Math.PI) / 180;
                          return (
                            <line
                              key={deg}
                              x1="260"
                              y1="125"
                              x2={260 + 95 * Math.cos(rad)}
                              y2={125 + 95 * Math.sin(rad)}
                              stroke="#475569"
                            />
                          );
                        })}

                        {/* Susmita Radar Polygon (Green) */}
                        <polygon
                          points="350,125 305,200 215,200 170,125 215,50 305,50"
                          fill="#10b981"
                          opacity="0.3"
                          stroke="#10b981"
                          strokeWidth="2"
                        />

                        {/* Swadeep Radar Polygon (Yellow) */}
                        <polygon
                          points="335,125 295,185 230,185 190,125 230,65 295,65"
                          fill="#f59e0b"
                          opacity="0.3"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        />

                        {/* Labels */}
                        <text x="365" y="128" fill="#cbd5e1" fontSize="8">Python Core</text>
                        <text x="315" y="215" fill="#cbd5e1" fontSize="8">Pandas EDA</text>
                        <text x="205" y="215" fill="#cbd5e1" fontSize="8">Scikit-Learn</text>
                        <text x="130" y="128" fill="#cbd5e1" fontSize="8">Math/Stats</text>
                        <text x="205" y="42" fill="#cbd5e1" fontSize="8">Feature Eng</text>
                        <text x="315" y="42" fill="#cbd5e1" fontSize="8">Model Tuning</text>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    Python Matplotlib Code:
                  </div>
                  <pre className="text-emerald-300">
{viewMode === "grouped"
  ? `rects1 = ax.bar(x - 0.26, python_marks, 0.26, label='Python')\nrects2 = ax.bar(x, ml_marks, 0.26, label='ML')\nrects3 = ax.bar(x + 0.26, sql_marks, 0.26, label='SQL')\nax.set_xticks(x); ax.set_xticklabels(students)\nax.axhline(75, color='r', linestyle=':', label='Distinction')`
  : viewMode === "timeline"
  ? `for name, scores in student_series.items():\n    ax.plot(mock_tests, scores, marker='o', lw=2.5, label=name)\nax.set_ylim(50, 100); ax.legend()`
  : `fig, ax = plt.subplots(subplot_kw=dict(polar=True))\nax.plot(angles, susmita_scores, color='#10b981', label='Susmita')\nax.fill(angles, susmita_scores, color='#10b981', alpha=0.25)`}
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
                  <Terminal className="text-emerald-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore multi-subject benchmarks, trajectory timelines, and polar radar competency webs.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-emerald-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-emerald-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-emerald-400 w-5 h-5" />
                Case Study 1: Educational Analytics Notes
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
                  <HelpCircle className="text-emerald-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of grouped benchmark charts and polar radar plots.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-sm font-bold">
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
                        btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 ring-1 ring-emerald-500";
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
                      <strong className="text-emerald-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-emerald-600/30"
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

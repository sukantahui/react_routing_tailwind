import React, { useState } from "react";
import {
  Users,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Eye,
  Layers,
  Award
} from "lucide-react";

import pyCode1 from "./topic11_files/01_student_marks_boxplot.py?raw";
import pyCode2 from "./topic11_files/02_gender_comparisons_palette.py?raw";
import pyCode3 from "./topic11_files/03_stripplot_overlay_box.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

const maleStudents = [
  { name: "Debangshu", score: 88, jitter: -12 },
  { name: "Swadeep", score: 72, jitter: 14 },
  { name: "Sachin", score: 79, jitter: -6 },
  { name: "Suman", score: 84, jitter: 10 },
  { name: "Rohan", score: 92, jitter: -18 },
  { name: "Aritra", score: 62, jitter: 6 } // outlier
];

const femaleStudents = [
  { name: "Susmita", score: 95, jitter: 12 },
  { name: "Tuhina", score: 91, jitter: -14 },
  { name: "Mahima", score: 98, jitter: 8 },
  { name: "Abhronila", score: 84, jitter: -8 },
  { name: "Pooja", score: 87, jitter: 15 },
  { name: "Riya", score: 93, jitter: -10 }
];

const genderStats = {
  Male: {
    min: 70,
    q1: 76,
    median: 82,
    mean: 80.5,
    q3: 88,
    max: 94,
    outliers: [62],
    color: "#38bdf8"
  },
  Female: {
    min: 80,
    q1: 85,
    median: 91,
    mean: 91.3,
    q3: 95,
    max: 99,
    outliers: [],
    color: "#f472b6"
  }
};

export default function Topic11() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [showStripplot, setShowStripplot] = useState(true);
  const [showMeans, setShowMeans] = useState(true);
  const [hoveredStudent, setHoveredStudent] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_student_marks_boxplot.py", code: pyCode1 },
    { name: "02_gender_comparisons_palette.py", code: pyCode2 },
    { name: "03_stripplot_overlay_box.py", code: pyCode3 }
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
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Users className="w-4 h-4" />
                <span>Machine Learning Module • Topic 11 (Worked Example 1)</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Worked Example 1: Box Plot of Marks by Gender
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                End-to-end practical case study. Compare examination mark distributions conditioned on gender with custom palettes, stripplot overlays, and mean markers.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Case Studio", icon: Sparkles },
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
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
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
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Visual Enhancements</span>
              </div>

              {/* Stripplot Jitter Overlay */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">Overlay Raw Points (stripplot):</div>
                <button
                  onClick={() => setShowStripplot(!showStripplot)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    showStripplot ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {showStripplot ? "ON" : "OFF"}
                </button>
              </div>

              {/* Mean Marker Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">Show Mean Indicator (showmeans=True):</div>
                <button
                  onClick={() => setShowMeans(!showMeans)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    showMeans ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {showMeans ? "ON" : "OFF"}
                </button>
              </div>

              {/* 5-Number Summary Cards */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400">Statistical Summary:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-sky-900/50 space-y-1">
                    <span className="text-sky-400 font-bold">Male (n=25)</span>
                    <div>Median: 82</div>
                    <div>Mean: 80.5</div>
                    <div>IQR: [76 - 88]</div>
                    <div className="text-rose-400">Outlier: 62</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-pink-900/50 space-y-1">
                    <span className="text-pink-400 font-bold">Female (n=30)</span>
                    <div>Median: 91</div>
                    <div>Mean: 91.3</div>
                    <div>IQR: [85 - 95]</div>
                    <div className="text-emerald-400">Outliers: None</div>
                  </div>
                </div>
              </div>

              {/* Generated Code */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-cyan-400 font-semibold mb-1"># Python Code:</div>
                <div className="text-indigo-300">sns.boxplot(</div>
                <div className="pl-3 text-slate-400">data=df, x="Gender", y="ML_Marks",</div>
                <div className="pl-3 text-cyan-300">palette={"{"}'Male': '#38bdf8', 'Female': '#f472b6'{"}"},</div>
                <div className="pl-3 text-amber-300">showmeans={showMeans ? "True" : "False"}</div>
                <div className="text-indigo-300">)</div>
                {showStripplot && (
                  <div className="text-emerald-300 pt-1">
                    sns.stripplot(data=df, x="Gender", y="ML_Marks", color="#0f172a", jitter=0.2)
                  </div>
                )}
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Barrackpore Cohort: ML Exam Marks Conditioning
                </span>
                <span className="text-xs font-mono text-slate-400">Boxplot + Stripplot</span>
              </div>

              {/* SVG Canvas */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="480" height="280" viewBox="0 0 480 280" className="max-w-full">
                  {/* Grid */}
                  <line x1="50" y1="50" x2="450" y2="50" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="110" x2="450" y2="110" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="450" y2="170" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="230" x2="450" y2="230" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#64748b" strokeWidth="1.5" />

                  {/* Y Axis ticks [50, 100] -> [230, 50] */}
                  <text x="40" y="234" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">50</text>
                  <text x="40" y="174" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">65</text>
                  <text x="40" y="114" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">80</text>
                  <text x="40" y="54" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">100</text>

                  {/* Male Box (centerX = 160) */}
                  {(() => {
                    const cx = 160;
                    const st = genderStats.Male;
                    const yMin = 230 - ((st.min - 50) / 50) * 180;
                    const yMax = 230 - ((st.max - 50) / 50) * 180;
                    const yQ1 = 230 - ((st.q1 - 50) / 50) * 180;
                    const yQ3 = 230 - ((st.q3 - 50) / 50) * 180;
                    const yMed = 230 - ((st.median - 50) / 50) * 180;
                    const yMean = 230 - ((st.mean - 50) / 50) * 180;

                    return (
                      <g key="MaleBox">
                        {/* Whiskers */}
                        <line x1={cx} y1={yMax} x2={cx} y2={yMin} stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1={cx - 15} y1={yMax} x2={cx + 15} y2={yMax} stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1={cx - 15} y1={yMin} x2={cx + 15} y2={yMin} stroke="#cbd5e1" strokeWidth="1.5" />

                        {/* Box */}
                        <rect x={cx - 35} y={yQ3} width="70" height={yQ1 - yQ3} fill={st.color} opacity="0.8" stroke="#ffffff" strokeWidth="1.5" rx="3" />
                        {/* Median Line */}
                        <line x1={cx - 35} y1={yMed} x2={cx + 35} y2={yMed} stroke="#ffffff" strokeWidth="3" />

                        {/* Mean indicator */}
                        {showMeans && (
                          <polygon
                            points={`${cx},${yMean - 5} ${cx - 5},${yMean + 4} ${cx + 5},${yMean + 4}`}
                            fill="#ffffff"
                            stroke="#0f172a"
                            strokeWidth="1"
                          />
                        )}

                        {/* Outlier */}
                        {st.outliers.map((out, idx) => {
                          const yOut = 230 - ((out - 50) / 50) * 180;
                          return (
                            <circle key={idx} cx={cx} cy={yOut} r="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                          );
                        })}

                        {/* Stripplot overlay points */}
                        {showStripplot &&
                          maleStudents.map((m, idx) => {
                            const py = 230 - ((m.score - 50) / 50) * 180;
                            const px = cx + m.jitter;
                            return (
                              <circle
                                key={idx}
                                cx={px}
                                cy={py}
                                r="4.5"
                                fill="#0f172a"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                opacity="0.9"
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredStudent({ name: m.name, gender: "Male", score: m.score })}
                                onMouseLeave={() => setHoveredStudent(null)}
                              />
                            );
                          })}

                        <text x={cx} y="255" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">
                          Male
                        </text>
                      </g>
                    );
                  })()}

                  {/* Female Box (centerX = 330) */}
                  {(() => {
                    const cx = 330;
                    const st = genderStats.Female;
                    const yMin = 230 - ((st.min - 50) / 50) * 180;
                    const yMax = 230 - ((st.max - 50) / 50) * 180;
                    const yQ1 = 230 - ((st.q1 - 50) / 50) * 180;
                    const yQ3 = 230 - ((st.q3 - 50) / 50) * 180;
                    const yMed = 230 - ((st.median - 50) / 50) * 180;
                    const yMean = 230 - ((st.mean - 50) / 50) * 180;

                    return (
                      <g key="FemaleBox">
                        {/* Whiskers */}
                        <line x1={cx} y1={yMax} x2={cx} y2={yMin} stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1={cx - 15} y1={yMax} x2={cx + 15} y2={yMax} stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1={cx - 15} y1={yMin} x2={cx + 15} y2={yMin} stroke="#cbd5e1" strokeWidth="1.5" />

                        {/* Box */}
                        <rect x={cx - 35} y={yQ3} width="70" height={yQ1 - yQ3} fill={st.color} opacity="0.8" stroke="#ffffff" strokeWidth="1.5" rx="3" />
                        {/* Median Line */}
                        <line x1={cx - 35} y1={yMed} x2={cx + 35} y2={yMed} stroke="#ffffff" strokeWidth="3" />

                        {/* Mean indicator */}
                        {showMeans && (
                          <polygon
                            points={`${cx},${yMean - 5} ${cx - 5},${yMean + 4} ${cx + 5},${yMean + 4}`}
                            fill="#ffffff"
                            stroke="#0f172a"
                            strokeWidth="1"
                          />
                        )}

                        {/* Stripplot overlay points */}
                        {showStripplot &&
                          femaleStudents.map((f, idx) => {
                            const py = 230 - ((f.score - 50) / 50) * 180;
                            const px = cx + f.jitter;
                            return (
                              <circle
                                key={idx}
                                cx={px}
                                cy={py}
                                r="4.5"
                                fill="#0f172a"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                opacity="0.9"
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredStudent({ name: f.name, gender: "Female", score: f.score })}
                                onMouseLeave={() => setHoveredStudent(null)}
                              />
                            );
                          })}

                        <text x={cx} y="255" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">
                          Female
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Hover Details */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                {hoveredStudent ? (
                  <span className="text-cyan-300 font-mono font-bold">
                    🎓 Student: {hoveredStudent.name} ({hoveredStudent.gender}) • Score = {hoveredStudent.score}/100
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Hover any jittered student dot to inspect individual test score</span>
                )}
                <span className="font-mono text-slate-400">Total: 55 Students</span>
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
                        ? "bg-cyan-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 11 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 11 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-cyan-600/30 border-cyan-500 text-cyan-200";
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
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition-all"
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

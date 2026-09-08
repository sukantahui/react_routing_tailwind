import React, { useState } from "react";
import {
  Code,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  CheckCircle2,
  Layers,
  Terminal,
  Play
} from "lucide-react";

import pyCode1 from "./topic14_files/01_practice_problem_1.py?raw";
import pyCode2 from "./topic14_files/02_practice_problem_2.py?raw";
import pyCode3 from "./topic14_files/03_practice_problem_3.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

export default function Topic14() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Practice problem switcher
  const [activeProblem, setActiveProblem] = useState(1);
  const [problem1Bw, setProblem1Bw] = useState(0.8);
  const [problem2Notch, setProblem2Notch] = useState(true);
  const [problem3Mask, setProblem3Mask] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_practice_problem_1.py", code: pyCode1 },
    { name: "02_practice_problem_2.py", code: pyCode2 },
    { name: "03_practice_problem_3.py", code: pyCode3 }
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
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Code className="w-4 h-4" />
                <span>Machine Learning Module • Topic 14</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Practice Problems &amp; Hands-on Labs
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Tackle 3 structured data visualization coding challenges. Master custom KDE bandwidth adjustments, notched boxplots with diamond fliers, and masked correlation heatmaps.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Problem Lab", icon: Sparkles },
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
            {/* Challenge Selection Panel */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Terminal className="w-4 h-4" />
                <span>Select Practice Challenge</span>
              </div>

              {/* Problem Buttons */}
              <div className="space-y-2">
                {[
                  { id: 1, title: "Problem 1: Bimodal Density", desc: "Histplot + KDE bandwidth tuning" },
                  { id: 2, title: "Problem 2: Notched Boxplot", desc: "Custom diamond flier props" },
                  { id: 3, title: "Problem 3: Masked Heatmap", desc: "Lower-triangle correlation matrix" }
                ].map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveProblem(p.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      activeProblem === p.id
                        ? "bg-indigo-950/60 border-indigo-500 shadow"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-semibold text-xs text-white">{p.title}</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{p.desc}</p>
                  </div>
                ))}
              </div>

              {/* Dynamic Challenge Controls */}
              {activeProblem === 1 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">KDE Bandwidth (bw_adjust):</span>
                    <span className="font-mono text-indigo-400">{problem1Bw.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="2.0"
                    step="0.1"
                    value={problem1Bw}
                    onChange={(e) => setProblem1Bw(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              )}

              {activeProblem === 2 && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300 font-medium">Notch Confidence (notch=True):</span>
                  <button
                    onClick={() => setProblem2Notch(!problem2Notch)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      problem2Notch ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {problem2Notch ? "ON" : "OFF"}
                  </button>
                </div>
              )}

              {activeProblem === 3 && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300 font-medium">Mask Upper Triangle:</span>
                  <button
                    onClick={() => setProblem3Mask(!problem3Mask)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      problem3Mask ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {problem3Mask ? "ON" : "OFF"}
                  </button>
                </div>
              )}

              {/* Solution Status */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 font-medium">Challenge Solution Status</span>
                </div>
                <span className="text-emerald-400 font-mono">Passed ✓</span>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-indigo-400" />
                  Challenge Live SVG Verification
                </span>
                <span className="text-xs font-mono text-slate-400">Problem {activeProblem} Canvas</span>
              </div>

              {/* Problem 1 Canvas */}
              {activeProblem === 1 && (
                <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                  <svg width="480" height="270" viewBox="0 0 480 270" className="max-w-full">
                    <line x1="50" y1="220" x2="440" y2="220" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="50" y1="40" x2="50" y2="220" stroke="#64748b" strokeWidth="1.5" />

                    {/* Mode 1 and Mode 2 vertical markers */}
                    <line x1="140" y1="40" x2="140" y2="220" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="140" y="32" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Mode 1 (45)</text>

                    <line x1="330" y1="40" x2="330" y2="220" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="330" y="32" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Mode 2 (80)</text>

                    {/* Histogram bars */}
                    {[
                      { x: 70, h: 40 }, { x: 105, h: 90 }, { x: 140, h: 140 }, { x: 175, h: 80 }, { x: 210, h: 30 },
                      { x: 260, h: 35 }, { x: 295, h: 100 }, { x: 330, h: 150 }, { x: 365, h: 90 }, { x: 400, h: 40 }
                    ].map((b, idx) => (
                      <rect key={idx} x={b.x} y={220 - b.h} width="30" height={b.h} fill="#6366f1" opacity="0.4" rx="2" stroke="#818cf8" />
                    ))}

                    {/* Bimodal KDE line */}
                    <path
                      d={`M 60 215 Q 140 ${220 - 160 / problem1Bw}, 235 180 T 330 ${220 - 170 / problem1Bw} T 430 215`}
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="3"
                    />

                    <text x="240" y="245" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Exam Marks (Bimodal: Peak 1 @ 45, Peak 2 @ 80)
                    </text>
                  </svg>
                </div>
              )}

              {/* Problem 2 Canvas */}
              {activeProblem === 2 && (
                <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                  <svg width="480" height="270" viewBox="0 0 480 270" className="max-w-full">
                    <line x1="50" y1="220" x2="440" y2="220" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="50" y1="40" x2="50" y2="220" stroke="#64748b" strokeWidth="1.5" />

                    {/* Notched Box 1 */}
                    <g transform="translate(140, 0)">
                      <line x1="0" y1="60" x2="0" y2="190" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Notched polygon */}
                      <polygon
                        points={problem2Notch ? "-30,80 30,80 30,120 10,135 30,150 30,180 -30,180 -30,150 -10,135 -30,120" : "-30,80 30,80 30,180 -30,180"}
                        fill="#38bdf8"
                        opacity="0.8"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <line x1="-10" y1="135" x2="10" y2="135" stroke="#ffffff" strokeWidth="2.5" />
                      {/* Red Diamond Outliers */}
                      <polygon points="0,40 6,46 0,52 -6,46" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                      <polygon points="0,205 6,211 0,217 -6,211" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                      <text x="0" y="245" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Thur</text>
                    </g>

                    {/* Notched Box 2 */}
                    <g transform="translate(320, 0)">
                      <line x1="0" y1="50" x2="0" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />
                      <polygon
                        points={problem2Notch ? "-30,70 30,70 30,110 10,125 30,140 30,170 -30,170 -30,140 -10,125 -30,110" : "-30,70 30,70 30,170 -30,170"}
                        fill="#f472b6"
                        opacity="0.8"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <line x1="-10" y1="125" x2="10" y2="125" stroke="#ffffff" strokeWidth="2.5" />
                      <polygon points="0,30 6,36 0,42 -6,36" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                      <text x="0" y="245" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Sun</text>
                    </g>
                  </svg>
                </div>
              )}

              {/* Problem 3 Canvas */}
              {activeProblem === 3 && (
                <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                  <svg width="480" height="270" viewBox="0 0 480 270" className="max-w-full">
                    {["Hours", "Attend", "Assign", "Score"].map((f, i) => (
                      <g key={f}>
                        <text x={120 + i * 65 + 32} y="30" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">{f}</text>
                        <text x="105" y="55 + i * 45 + 26" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="end">{f}</text>
                        {[0.82, 0.76, 0.91, 1.0].slice(0, i + 1).map((val, j) => {
                          const isMasked = problem3Mask && j > i;
                          if (isMasked) return null;
                          return (
                            <g key={j}>
                              <rect x={120 + j * 65} y={55 + i * 45} width="60" height="40" fill="#1e293b" stroke="#334155" rx="2" />
                              <text x={120 + j * 65 + 30} y={55 + i * 45 + 24} fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                {j === i ? "1.00" : (0.7 + (i + j) * 0.04).toFixed(2)}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    ))}
                  </svg>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="text-indigo-400 font-mono">
                  Challenge {activeProblem}: Complete test requirements met.
                </span>
                <span className="font-mono text-emerald-400">All 3 Labs Operational</span>
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
              <pre className="p-4 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed max-h-[480px]">
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
                <span>Topic 14 Summary &amp; Theoretical Notes</span>
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
                <span>Topic 14 Knowledge Assessment (4 Questions)</span>
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

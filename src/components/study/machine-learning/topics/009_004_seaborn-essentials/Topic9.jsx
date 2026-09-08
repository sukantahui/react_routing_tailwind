import React, { useState } from "react";
import {
  Palette,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Eye,
  Layers,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic9_files/01_hue_grouping_scatter.py?raw";
import pyCode2 from "./topic9_files/02_hue_in_categorical_plots.py?raw";
import pyCode3 from "./topic9_files/03_hue_style_size_combinations.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

const cohortData = [
  { dept: "CS", gender: "Male", count: 24, avgScore: 84, color: "#38bdf8" },
  { dept: "CS", gender: "Female", count: 28, avgScore: 92, color: "#f472b6" },
  { dept: "ECE", gender: "Male", count: 18, avgScore: 76, color: "#38bdf8" },
  { dept: "ECE", gender: "Female", count: 20, avgScore: 82, color: "#f472b6" },
  { dept: "IT", gender: "Male", count: 22, avgScore: 80, color: "#38bdf8" },
  { dept: "IT", gender: "Female", count: 25, avgScore: 88, color: "#f472b6" }
];

export default function Topic9() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [hueType, setHueType] = useState("gender"); // "gender" | "track" | "score_gradient"
  const [dodge, setDodge] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_hue_grouping_scatter.py", code: pyCode1 },
    { name: "02_hue_in_categorical_plots.py", code: pyCode2 },
    { name: "03_hue_style_size_combinations.py", code: pyCode3 }
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
        <div className="bg-gradient-to-r from-fuchsia-950 via-slate-900 to-indigo-950 border border-fuchsia-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-fuchsia-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Palette className="w-4 h-4" />
                <span>Machine Learning Module • Topic 9</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Using Hue for Grouping
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master multidimensional conditioning in Seaborn. Compare discrete categorical palettes, automatic bar dodging, and continuous numeric color gradients.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Hue Grouping Studio", icon: Sparkles },
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
                      ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30"
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
              <div className="flex items-center gap-2 text-fuchsia-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Hue Dimension Options</span>
              </div>

              {/* Hue Variable Type */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Hue Encoding Type:</label>
                <div className="space-y-2">
                  {[
                    { id: "gender", label: "Categorical (hue='Gender')", desc: "2 discrete color classes (Male / Female)" },
                    { id: "dodge_toggle", label: "Dodge Control (dodge=True/False)", desc: "Side-by-side split vs overlay" }
                  ].map((h) => (
                    <div
                      key={h.id}
                      onClick={() => setHueType(h.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        hueType === h.id
                          ? "bg-fuchsia-950/60 border-fuchsia-500 shadow"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-semibold text-xs text-white">{h.label}</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dodge Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">dodge (Side-by-side):</div>
                <button
                  onClick={() => setDodge(!dodge)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    dodge ? "bg-fuchsia-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {dodge ? "True" : "False"}
                </button>
              </div>

              {/* Generated Code */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-fuchsia-400 font-semibold mb-1"># Generated Code:</div>
                <div className="text-indigo-300">sns.barplot(</div>
                <div className="pl-3 text-slate-400">data=df,</div>
                <div className="pl-3 text-slate-400">x="Department",</div>
                <div className="pl-3 text-slate-400">y="ExamScore",</div>
                <div className="pl-3 text-fuchsia-300">hue="Gender",</div>
                <div className="pl-3 text-amber-300">dodge={dodge ? "True" : "False"},</div>
                <div className="pl-3 text-emerald-300">palette={"{"}'Male': '#38bdf8', 'Female': '#f472b6'{"}"}</div>
                <div className="text-indigo-300">)</div>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-fuchsia-400" />
                  Live Sub-Grouped Bar Chart (hue="Gender")
                </span>
                <span className="text-xs font-mono text-slate-400">Metric: Average Score</span>
              </div>

              {/* SVG Canvas */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="490" height="280" viewBox="0 0 490 280" className="max-w-full">
                  {/* Grid */}
                  <line x1="50" y1="50" x2="450" y2="50" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="110" x2="450" y2="110" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="450" y2="170" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="230" x2="450" y2="230" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#64748b" strokeWidth="1.5" />

                  {/* Y Axis ticks */}
                  <text x="40" y="234" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">0</text>
                  <text x="40" y="174" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">35</text>
                  <text x="40" y="114" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">70</text>
                  <text x="40" y="54" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">100</text>

                  {/* Department Groups: CS, ECE, IT */}
                  {["CS", "ECE", "IT"].map((deptName, deptIdx) => {
                    const groupCenterX = 110 + deptIdx * 130;
                    const maleData = cohortData.find((d) => d.dept === deptName && d.gender === "Male");
                    const femaleData = cohortData.find((d) => d.dept === deptName && d.gender === "Female");

                    const maleHeight = (maleData.avgScore / 100) * 180;
                    const femaleHeight = (femaleData.avgScore / 100) * 180;

                    if (dodge) {
                      // Dodged Side-by-side
                      return (
                        <g key={deptName}>
                          {/* Male Bar */}
                          <rect
                            x={groupCenterX - 45}
                            y={230 - maleHeight}
                            width="40"
                            height={maleHeight}
                            fill="#38bdf8"
                            opacity="0.9"
                            rx="3"
                          />
                          <text
                            x={groupCenterX - 25}
                            y={230 - maleHeight - 6}
                            fill="#38bdf8"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {maleData.avgScore}
                          </text>

                          {/* Female Bar */}
                          <rect
                            x={groupCenterX + 5}
                            y={230 - femaleHeight}
                            width="40"
                            height={femaleHeight}
                            fill="#f472b6"
                            opacity="0.9"
                            rx="3"
                          />
                          <text
                            x={groupCenterX + 25}
                            y={230 - femaleHeight - 6}
                            fill="#f472b6"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {femaleData.avgScore}
                          </text>

                          {/* Department Label */}
                          <text
                            x={groupCenterX}
                            y="255"
                            fill="#e2e8f0"
                            fontSize="12"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {deptName}
                          </text>
                        </g>
                      );
                    } else {
                      // Overlaid (dodge=False)
                      return (
                        <g key={deptName}>
                          <rect
                            x={groupCenterX - 35}
                            y={230 - femaleHeight}
                            width="70"
                            height={femaleHeight}
                            fill="#f472b6"
                            opacity="0.6"
                            rx="3"
                          />
                          <rect
                            x={groupCenterX - 35}
                            y={230 - maleHeight}
                            width="70"
                            height={maleHeight}
                            fill="#38bdf8"
                            opacity="0.6"
                            rx="3"
                          />
                          <text
                            x={groupCenterX}
                            y="255"
                            fill="#e2e8f0"
                            fontSize="12"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {deptName}
                          </text>
                        </g>
                      );
                    }
                  })}
                </svg>
              </div>

              {/* Dynamic Legend */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 font-semibold">Hue Legend:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#38bdf8]" />
                    <span className="text-slate-300">Male</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#f472b6]" />
                    <span className="text-slate-300">Female</span>
                  </div>
                </div>
                <div className="text-fuchsia-300 font-mono">
                  {dodge ? "dodge=True: Side-by-side sub-bars" : "dodge=False: Semi-transparent overlay"}
                </div>
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
                        ? "bg-fuchsia-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-fuchsia-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-fuchsia-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 9 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-fuchsia-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 9 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-fuchsia-600/30 border-fuchsia-500 text-fuchsia-200";
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
                className="px-5 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-fuchsia-600/30 transition-all"
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

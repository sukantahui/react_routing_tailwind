import React, { useState } from "react";
import {
  Code2,
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
  CheckCircle2
} from "lucide-react";
import pyCode1 from "./topic15_files/01_practice_problem_1_dual_axis_early_stop.py?raw";
import pyCode2 from "./topic15_files/02_practice_problem_2_4d_bubble_scatter.py?raw";
import pyCode3 from "./topic15_files/03_practice_problem_3_gridspec_dashboard.py?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions.js";

export default function Topic15() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Problem Selector
  const [selectedProblem, setSelectedProblem] = useState(1);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_practice_problem_1_dual_axis_early_stop.py", code: pyCode1, desc: "Problem 1: Dual-Axis learning curve with early stopping detection and annotation" },
    2: { name: "02_practice_problem_2_4d_bubble_scatter.py", code: pyCode2, desc: "Problem 2: 4D Used automobile performance bubble scatter with custom colormap" },
    3: { name: "03_practice_problem_3_gridspec_dashboard.py", code: pyCode3, desc: "Problem 3: Multi-panel production telemetry dashboard with GridSpec and confusion matrix" }
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-indigo-900/40 border border-emerald-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 15: Hands-on Practice Problems
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Synthesize and solidify your complete Matplotlib mastery through 3 comprehensive machine learning project challenges. Build dual-axis early stopping monitors, 4D continuous bubble feature maps, and multi-panel GridSpec telemetry dashboards.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> 3 Coding Labs
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> End-to-End Synthesis
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
              "To Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, and Abhronila: True mastery of data visualization is not memorizing syntax, but knowing which chart geometry to choose for each machine learning bottleneck. Tackle these 3 real-world challenges to test your problem-solving skills!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Problem Solver Studio", icon: Code2 },
            { id: "lab", label: "Python Code Lab (3 Solutions)", icon: Terminal },
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
                  Select Practice Challenge
                </h2>

                <div className="space-y-3">
                  {[
                    { id: 1, title: "Problem 1: Early Stopping Dual-Axis Plot", desc: "Combine Train/Val loss with Val accuracy and detect minimum checkpoint with ax.annotate." },
                    { id: 2, title: "Problem 2: 4D Automobile Performance Bubble", desc: "Map Engine Size, Mileage, Price (size), and Vehicle Age (color) with colorbars and trendlines." },
                    { id: 3, title: "Problem 3: Multi-Panel GridSpec Telemetry", desc: "Build a 3-panel dashboard with training curves, error bar benchmarks, and confusion matrix heatmap." }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProblem(p.id);
                        setActiveScript(p.id);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition ${
                        selectedProblem === p.id
                          ? "border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500 shadow-md"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-semibold text-white text-xs">{p.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{p.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-300 block mb-1">Challenge Focus:</strong>
                  {selectedProblem === 1 && "Tests dual-axis coordination with `twinx()`, `argmin()` minimum detection, and precision arrow callout annotations."}
                  {selectedProblem === 2 && "Tests multi-dimensional continuous feature mapping (`s=...`, `c=...`), colormap inversion (`plasma_r`), and polynomial line fitting."}
                  {selectedProblem === 3 && "Tests complex asymmetric multi-panel architecture with `GridSpec`, `imshow()` matrix rendering, and error bars."}
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      Live Problem Solution Output
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-slate-800 uppercase">
                      Problem {selectedProblem}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    {selectedProblem === 1 && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="50" y1={y} x2="470" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="50" y1="200" x2="470" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="50" y1="20" x2="50" y2="200" stroke="#ef4444" strokeWidth="1.5" />
                        <line x1="470" y1="20" x2="470" y2="200" stroke="#0284c7" strokeWidth="1.5" />

                        {/* Train Loss (Red dashed) */}
                        <path d="M 50 45 Q 150 140 470 185" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
                        {/* Val Loss (Red solid) */}
                        <path d="M 50 55 Q 180 135 280 145 T 470 120" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                        {/* Val Accuracy (Blue solid) */}
                        <path d="M 50 180 Q 200 160 300 70 T 470 45" fill="none" stroke="#0284c7" strokeWidth="2.5" />

                        {/* Early Stopping Marker (Epoch 22 -> x=280) */}
                        <line x1="280" y1="20" x2="280" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                        <circle cx="280" cy="145" r="5" fill="#f59e0b" />
                        
                        {/* Annotation Callout */}
                        <g transform="translate(300, 100)">
                          <rect x="0" y="0" width="130" height="35" fill="#0f172a" rx="4" stroke="#f59e0b" />
                          <text x="8" y="14" fill="#f59e0b" fontSize="8.5" fontWeight="bold">Early Stop (Epoch 22)</text>
                          <text x="8" y="27" fill="#cbd5e1" fontSize="8">Min Val Loss: 0.284</text>
                        </g>

                        <text x="260" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">Training Epoch</text>
                        <text x="20" y="110" fill="#ef4444" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">Loss</text>
                        <text x="495" y="110" fill="#0284c7" fontSize="10" textAnchor="middle" transform="rotate(90 495 110)">Accuracy</text>
                      </svg>
                    )}

                    {selectedProblem === 2 && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="50" y1={y} x2="460" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="50" y1="200" x2="460" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {/* Trendline */}
                        <line x1="60" y1="50" x2="440" y2="185" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />

                        {/* Bubble Points (4D) */}
                        {[
                          { x: 80, y: 60, r: 8, c: "#a855f7" },
                          { x: 130, y: 85, r: 12, c: "#ec4899" },
                          { x: 190, y: 110, r: 14, c: "#f97316" },
                          { x: 260, y: 130, r: 18, c: "#eab308" },
                          { x: 330, y: 155, r: 22, c: "#84cc16" },
                          { x: 410, y: 175, r: 26, c: "#10b981" }
                        ].map((b, idx) => (
                          <circle key={idx} cx={b.x} cy={b.y} r={b.r} fill={b.c} opacity="0.8" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        {/* Colorbar */}
                        <g transform="translate(470, 30)">
                          <defs>
                            <linearGradient id="plasmaGrad" x1="0" y1="1" x2="0" y2="0">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="50%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                          </defs>
                          <rect x="0" y="0" width="10" height="160" fill="url(#plasmaGrad)" rx="2" />
                          <text x="15" y="10" fill="#cbd5e1" fontSize="7.5">1 Yr</text>
                          <text x="15" y="155" fill="#cbd5e1" fontSize="7.5">12 Yrs</text>
                        </g>

                        <text x="255" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">Engine Displacement (Liters)</text>
                        <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">Fuel Efficiency (km/L)</text>
                      </svg>
                    )}

                    {selectedProblem === 3 && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {/* Top Hero Plot */}
                        <g>
                          <rect x="20" y="15" width="480" height="95" fill="#0f172a" stroke="#38bdf8" rx="3" />
                          <text x="35" y="32" fill="#38bdf8" fontSize="10" fontWeight="bold">1. Training Loss Convergence Telemetry</text>
                          <path d="M 40 95 Q 150 85 300 45 T 480 35" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                        </g>
                        {/* Bottom Left: Error Bar Benchmark */}
                        <g>
                          <rect x="20" y="120" width="230" height="105" fill="#0f172a" stroke="#10b981" rx="3" />
                          <text x="30" y="136" fill="#10b981" fontSize="9" fontWeight="bold">2. 5-Fold F1 Benchmark</text>
                          {/* 3 small bars */}
                          <rect x="45" y="160" width="25" height="50" fill="#10b981" rx="2" />
                          <rect x="85" y="155" width="25" height="55" fill="#06b6d4" rx="2" />
                          <rect x="125" y="150" width="25" height="60" fill="#6366f1" rx="2" />
                          <rect x="165" y="168" width="25" height="42" fill="#f59e0b" rx="2" />
                        </g>
                        {/* Bottom Right: Confusion Matrix Heatmap */}
                        <g>
                          <rect x="270" y="120" width="230" height="105" fill="#0f172a" stroke="#ec4899" rx="3" />
                          <text x="280" y="136" fill="#ec4899" fontSize="9" fontWeight="bold">3. Confusion Matrix Heatmap</text>
                          <rect x="300" y="150" width="40" height="30" fill="#1e3a8a" />
                          <text x="320" y="168" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">890</text>
                          <rect x="345" y="150" width="40" height="30" fill="#93c5fd" />
                          <text x="365" y="168" fill="#000000" fontSize="9" textAnchor="middle" fontWeight="bold">40</text>
                          <rect x="300" y="185" width="40" height="30" fill="#93c5fd" />
                          <text x="320" y="203" fill="#000000" fontSize="9" textAnchor="middle" fontWeight="bold">35</text>
                          <rect x="345" y="185" width="40" height="30" fill="#1e3a8a" />
                          <text x="365" y="203" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">935</text>
                        </g>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    Python Solution Code:
                  </div>
                  <pre className="text-emerald-300">
{selectedProblem === 1
  ? `best_epoch = epochs[np.argmin(val_loss)]\nax1.axvline(best_epoch, color='#f59e0b', linestyle='--')\nax1.annotate('Optimal Checkpoint', xy=(best_epoch, best_loss), arrowprops=dict(facecolor='#f59e0b'))\nax2 = ax1.twinx(); ax2.plot(epochs, val_acc)`
  : selectedProblem === 2
  ? `scatter = ax.scatter(engine_size, mileage, s=price*15, c=age, cmap='plasma_r')\nfig.colorbar(scatter, ax=ax, label='Vehicle Age (Years)')\nslope, intercept = np.polyfit(engine_size, mileage, 1)\nax.plot(x_line, slope*x_line + intercept, 'r--')`
  : `gs = fig.add_gridspec(2, 2, height_ratios=[1.3, 1])\nax1 = fig.add_subplot(gs[0, :]); ax1.plot(epochs, train_loss)\nax2 = fig.add_subplot(gs[1, 0]); ax2.bar(models, mean_f1, yerr=std_f1)\nax3 = fig.add_subplot(gs[1, 1]); ax3.imshow(cm, cmap='Blues')`}
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
                  Explore complete runnable solutions to all 3 practice problems.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setActiveScript(num);
                      setSelectedProblem(num);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Problem 0{num}
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
                Practice Problems Architecture Checklist
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
                  Test your understanding of dual-axis synchronization, imshow heatmaps, and colormap reversals.
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

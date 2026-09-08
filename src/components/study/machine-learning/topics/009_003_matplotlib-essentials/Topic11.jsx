import React, { useState } from "react";
import {
  Grid,
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
  Layout
} from "lucide-react";
import pyCode1 from "./topic11_files/01_classic_subplot_syntax_and_indexing.py?raw";
import pyCode2 from "./topic11_files/02_complex_gridspec_asymmetric_layouts.py?raw";
import pyCode3 from "./topic11_files/03_inset_axes_and_zoomed_regions.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

export default function Topic11() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Subplot Layout Selector
  const [layoutMode, setLayoutMode] = useState("grid2x2"); // "grid2x2", "hero", "marginals", "inset"

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_classic_subplot_syntax_and_indexing.py", code: pyCode1, desc: "Classic 1-indexed plt.subplot(nrows, ncols, index) and 3-digit shorthand (221)" },
    2: { name: "02_complex_gridspec_asymmetric_layouts.py", code: pyCode2, desc: "Complex asymmetric GridSpec layouts, spanning cells, and marginal distribution plots" },
    3: { name: "03_inset_axes_and_zoomed_regions.py", code: pyCode3, desc: "Embedded microscope inset axes (ax.inset_axes) with connector lines" }
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
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-indigo-900/40 via-blue-900/30 to-violet-900/40 border border-indigo-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 11: Subplots with plt.subplot() &amp; GridSpec
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Construct multi-panel model evaluation dashboards. Master classic 1-indexed <code className="text-indigo-300 font-mono">plt.subplot()</code>, modern <code className="text-indigo-300 font-mono">GridSpec</code> for asymmetric cell spanning (marginal histograms), and microscope <code className="text-indigo-300 font-mono">ax.inset_axes</code> for magnifying loss minima.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5" /> plt.subplot &amp; GridSpec
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5" /> Inset Zoom Axes
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-indigo-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "When Sachin and Swadeep built a real-time training monitor, they wanted the main training loss curve on top taking 70% of the screen, and two smaller plots below comparing learning rate and gradient norms. Standard subplots were too rigid—using <code className="text-indigo-300 font-mono">GridSpec</code> gave them total layout freedom to build professional ML monitor dashboards!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Subplots & GridSpec Studio", icon: Grid },
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
                    ? "border-indigo-500 text-indigo-400 bg-indigo-950/30"
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
                  <Sliders className="text-indigo-400 w-5 h-5" />
                  Subplot Layout Architectures
                </h2>

                <div className="space-y-2.5">
                  {[
                    { id: "grid2x2", title: "1. Symmetrical 2x2 Grid", desc: "Classic 4-panel evaluation: Loss, Accuracy, Precision, Recall" },
                    { id: "hero", title: "2. Asymmetric Hero Dashboard", desc: "Wide Top Hero Plot + 2 Small Bottom Subplots (GridSpec)" },
                    { id: "marginals", title: "3. Joint Plot with Marginals", desc: "Central Scatter + Top & Right Marginal Histograms" },
                    { id: "inset", title: "4. Microscope Inset Zoom", desc: "Child Axes embedded inside main plot with connector lines" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLayoutMode(item.id)}
                      className={`w-full text-left p-3 rounded-xl border transition ${
                        layoutMode === item.id
                          ? "border-indigo-500 bg-indigo-950/60 text-indigo-200 ring-1 ring-indigo-500 shadow-md"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-semibold text-white text-xs">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-indigo-400" />
                      Live Subplot Structure Visualizer
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800 uppercase">
                      Architecture: {layoutMode}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    {layoutMode === "grid2x2" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {/* 4 Quadrants */}
                        <g>
                          <rect x="20" y="20" width="220" height="95" fill="#0f172a" stroke="#334155" rx="4" />
                          <text x="35" y="40" fill="#38bdf8" fontSize="10" fontWeight="bold">plt.subplot(2, 2, 1): Train Loss</text>
                          <path d="M 35 100 Q 100 80 220 55" fill="none" stroke="#38bdf8" strokeWidth="2" />
                        </g>
                        <g>
                          <rect x="260" y="20" width="220" height="95" fill="#0f172a" stroke="#334155" rx="4" />
                          <text x="275" y="40" fill="#10b981" fontSize="10" fontWeight="bold">plt.subplot(2, 2, 2): Val Accuracy</text>
                          <path d="M 275 95 Q 360 80 460 45" fill="none" stroke="#10b981" strokeWidth="2" />
                        </g>
                        <g>
                          <rect x="20" y="125" width="220" height="95" fill="#0f172a" stroke="#334155" rx="4" />
                          <text x="35" y="145" fill="#f59e0b" fontSize="10" fontWeight="bold">plt.subplot(2, 2, 3): F1-Score</text>
                          <path d="M 35 200 Q 120 180 220 155" fill="none" stroke="#f59e0b" strokeWidth="2" />
                        </g>
                        <g>
                          <rect x="260" y="125" width="220" height="95" fill="#0f172a" stroke="#334155" rx="4" />
                          <text x="275" y="145" fill="#ec4899" fontSize="10" fontWeight="bold">plt.subplot(2, 2, 4): Learning Rate</text>
                          <path d="M 275 155 L 340 155 L 340 180 L 410 180 L 410 205 L 460 205" fill="none" stroke="#ec4899" strokeWidth="2" />
                        </g>
                      </svg>
                    )}

                    {layoutMode === "hero" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {/* Top Hero Plot (Wide) */}
                        <g>
                          <rect x="20" y="15" width="460" height="110" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" rx="4" />
                          <text x="35" y="35" fill="#a5b4fc" fontSize="11" fontWeight="bold">gs[0, :] : Hero Training Convergence Curve</text>
                          <path d="M 40 110 Q 150 90 280 50 T 460 35" fill="none" stroke="#818cf8" strokeWidth="2.5" />
                        </g>
                        {/* Bottom Left */}
                        <g>
                          <rect x="20" y="135" width="220" height="90" fill="#0f172a" stroke="#334155" rx="4" />
                          <text x="35" y="155" fill="#38bdf8" fontSize="10" fontWeight="bold">gs[1, 0]: Gradient Norms</text>
                          <path d="M 35 210 Q 100 180 220 170" fill="none" stroke="#38bdf8" strokeWidth="2" />
                        </g>
                        {/* Bottom Right */}
                        <g>
                          <rect x="260" y="135" width="220" height="90" fill="#0f172a" stroke="#334155" rx="4" />
                          <text x="275" y="155" fill="#10b981" fontSize="10" fontWeight="bold">gs[1, 1]: Epoch Durations</text>
                          <rect x="285" y="170" width="25" height="40" fill="#10b981" rx="2" />
                          <rect x="325" y="165" width="25" height="45" fill="#10b981" rx="2" />
                          <rect x="365" y="160" width="25" height="50" fill="#10b981" rx="2" />
                          <rect x="405" y="162" width="25" height="48" fill="#10b981" rx="2" />
                        </g>
                      </svg>
                    )}

                    {layoutMode === "marginals" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {/* Top Marginal Hist */}
                        <rect x="30" y="15" width="340" height="45" fill="#0f172a" stroke="#38bdf8" rx="3" />
                        <text x="45" y="32" fill="#38bdf8" fontSize="9" fontWeight="bold">Top Marginal Hist (Feature X)</text>
                        {/* Main 2D Scatter */}
                        <rect x="30" y="65" width="340" height="155" fill="#0f172a" stroke="#6366f1" rx="3" />
                        <text x="45" y="85" fill="#a5b4fc" fontSize="10" fontWeight="bold">Bivariate Feature Scatter Space</text>
                        {/* Right Marginal Hist */}
                        <rect x="380" y="65" width="90" height="155" fill="#0f172a" stroke="#ec4899" rx="3" />
                        <text x="390" y="85" fill="#ec4899" fontSize="9" fontWeight="bold">Right Hist</text>
                      </svg>
                    )}

                    {layoutMode === "inset" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {/* Main Global Plot */}
                        <rect x="20" y="15" width="460" height="210" fill="#0f172a" stroke="#334155" rx="4" />
                        <path d="M 30 180 Q 120 170 200 130 T 360 80 T 470 50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                        
                        {/* Zoom Box Indicator in Main */}
                        <rect x="180" y="115" width="40" height="30" fill="none" stroke="#ef4444" strokeDasharray="3,3" strokeWidth="1.5" />
                        
                        {/* Connecting lines */}
                        <line x1="220" y1="115" x2="280" y2="45" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2,2" />
                        <line x1="220" y1="145" x2="280" y2="135" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2,2" />

                        {/* Inset Subplot Box */}
                        <rect x="280" y="45" width="180" height="90" fill="#0b0f19" stroke="#ef4444" strokeWidth="1.5" rx="4" />
                        <text x="290" y="62" fill="#ef4444" fontSize="9" fontWeight="bold">ax.inset_axes (Microscope Zoom)</text>
                        <path d="M 290 115 Q 360 110 440 85" fill="none" stroke="#38bdf8" strokeWidth="3" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    Python Matplotlib Layout Code:
                  </div>
                  <pre className="text-indigo-300">
{layoutMode === "grid2x2"
  ? `fig, axs = plt.subplots(2, 2, figsize=(9, 6))\naxs[0, 0].plot(epochs, train_loss)\naxs[0, 1].plot(epochs, val_acc)\naxs[1, 0].plot(epochs, f1_scores)\naxs[1, 1].step(epochs, lr_schedule)`
  : layoutMode === "hero"
  ? `gs = fig.add_gridspec(2, 2, height_ratios=[2, 1])\nax_hero = fig.add_subplot(gs[0, :]) # Spans full top row\nax_b1   = fig.add_subplot(gs[1, 0])\nax_b2   = fig.add_subplot(gs[1, 1])`
  : layoutMode === "marginals"
  ? `gs = fig.add_gridspec(4, 4, width_ratios=[4,4,4,1.2], height_ratios=[1.2,4,4,4])\nax_histx = fig.add_subplot(gs[0, 0:3])\nax_main  = fig.add_subplot(gs[1:4, 0:3])\nax_histy = fig.add_subplot(gs[1:4, 3])`
  : `axins = ax.inset_axes([0.5, 0.45, 0.45, 0.45])\naxins.plot(x, loss)\naxins.set_xlim(2.8, 3.8); axins.set_ylim(0.05, 0.45)\nax.indicate_inset_zoom(axins, edgecolor='red')`}
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
                  <Terminal className="text-indigo-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore procedural subplots, asymmetric GridSpec layouts, and inset zoom magnifications.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-indigo-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-indigo-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-indigo-400 w-5 h-5" />
                Subplots &amp; GridSpec Technical Notes
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
                  <HelpCircle className="text-indigo-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of subplot indexing, GridSpec spanning, and inset zoom axes.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-sm font-bold">
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
                        btnStyle = "border-indigo-500 bg-indigo-950/50 text-indigo-200 ring-1 ring-indigo-500";
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
                      <strong className="text-indigo-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-indigo-600/30"
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

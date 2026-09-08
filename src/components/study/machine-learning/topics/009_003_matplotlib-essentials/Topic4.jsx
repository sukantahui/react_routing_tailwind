import React, { useState } from "react";
import {
  BarChart2,
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
import pyCode1 from "./topic4_files/01_vertical_horizontal_bars.py?raw";
import pyCode2 from "./topic4_files/02_grouped_and_stacked_bars.py?raw";
import pyCode3 from "./topic4_files/03_bar_containers_and_annotations.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Bar Studio State
  const [chartMode, setChartMode] = useState("vertical"); // "vertical", "horizontal", "grouped", "stacked"
  const [showLabels, setShowLabels] = useState(true);
  const [showErrorBars, setShowErrorBars] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_vertical_horizontal_bars.py", code: pyCode1, desc: "Vertical & horizontal bar charts with modern ax.bar_label annotations" },
    2: { name: "02_grouped_and_stacked_bars.py", code: pyCode2, desc: "Grouped bars with numeric offsets and stacked bars using bottom parameter" },
    3: { name: "03_bar_containers_and_annotations.py", code: pyCode3, desc: "Feature importance ranking charts with error bars (xerr / yerr)" }
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

  // Sample ML Model Performance Data
  const models = [
    { name: "XGBoost", train: 0.96, test: 0.92, std: 0.03, color: "#10b981" },
    { name: "Random Forest", train: 0.94, test: 0.89, std: 0.04, color: "#38bdf8" },
    { name: "Logistic Reg", train: 0.82, test: 0.80, std: 0.02, color: "#f59e0b" },
    { name: "SVM (RBF)", train: 0.91, test: 0.86, std: 0.035, color: "#8b5cf6" },
    { name: "KNN (k=5)", train: 0.85, test: 0.78, std: 0.05, color: "#ec4899" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-sky-900/40 border border-emerald-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 4: Bar Chart with plt.bar()
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Master categorical comparisons in machine learning. Plot model benchmark metrics (Accuracy, F1-Score), compare Train vs Test generalization with grouped bars, evaluate confusion breakdowns with stacked bars, and rank feature importances with horizontal error bars.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" /> plt.bar &amp; barh
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Grouped &amp; Stacked
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
              "When Swadeep and Sachin were building a credit risk classifier, they had 15 feature importances with long names like <code className="text-slate-200">Revolving_Utilization_Of_Unsecured_Lines</code>. Vertical bars turned the labels into an unreadable slanted mess! Switching to <code className="text-emerald-300">plt.barh()</code> sorted by importance and annotated with <code className="text-emerald-300">ax.bar_label()</code> turned their report into an executive-ready dashboard."
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Bar Studio", icon: BarChart2 },
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
                  Bar Layout Configuration
                </h2>

                {/* Chart Mode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Chart Variant / Geometry
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "vertical", label: "Vertical (plt.bar)" },
                      { id: "horizontal", label: "Horizontal (plt.barh)" },
                      { id: "grouped", label: "Grouped (Clustered)" },
                      { id: "stacked", label: "Stacked (bottom=...)" }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setChartMode(mode.id)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-semibold border text-left transition ${
                          chartMode === mode.id
                            ? "border-emerald-500 bg-emerald-950/60 text-emerald-300 ring-1 ring-emerald-500"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">
                      ax.bar_label() Annotations
                    </span>
                    <button
                      onClick={() => setShowLabels(!showLabels)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        showLabels ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {showLabels ? "ON" : "OFF"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">
                      Error Bars (xerr / yerr std)
                    </span>
                    <button
                      onClick={() => setShowErrorBars(!showErrorBars)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        showErrorBars ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {showErrorBars ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      Live Model Benchmark Visualization
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-slate-800 capitalize">
                      Mode: {chartMode}
                    </span>
                  </div>

                  {/* SVG Renderer */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    {chartMode === "vertical" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="45" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="45" y1="200" x2="480" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="45" y1="20" x2="45" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {models.map((m, idx) => {
                          const x = 70 + idx * 85;
                          const h = m.test * 170;
                          const y = 200 - h;
                          return (
                            <g key={idx}>
                              <rect x={x - 22} y={y} width="44" height={h} fill={m.color} rx="4" opacity="0.9" />
                              {showErrorBars && (
                                <g>
                                  <line x1={x} y1={y - m.std * 100} x2={x} y2={y + m.std * 100} stroke="#ffffff" strokeWidth="1.5" />
                                  <line x1={x - 6} y1={y - m.std * 100} x2={x + 6} y2={y - m.std * 100} stroke="#ffffff" strokeWidth="1.5" />
                                  <line x1={x - 6} y1={y + m.std * 100} x2={x + 6} y2={y + m.std * 100} stroke="#ffffff" strokeWidth="1.5" />
                                </g>
                              )}
                              {showLabels && (
                                <text x={x} y={y - (showErrorBars ? m.std * 100 + 4 : 5)} fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">
                                  {m.test.toFixed(2)}
                                </text>
                              )}
                              <text x={x} y="215" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                                {m.name}
                              </text>
                            </g>
                          );
                        })}
                        <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">
                          Test Accuracy
                        </text>
                      </svg>
                    )}

                    {chartMode === "horizontal" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {[100, 200, 300, 400, 480].map((x) => (
                          <line key={x} x1={x} y1="20" x2={x} y2="210" stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="100" y1="210" x2="480" y2="210" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="100" y1="20" x2="100" y2="210" stroke="#64748b" strokeWidth="1.5" />

                        {models.map((m, idx) => {
                          const y = 35 + idx * 36;
                          const w = m.test * 360;
                          return (
                            <g key={idx}>
                              <text x="92" y={y + 14} fill="#cbd5e1" fontSize="10" textAnchor="end">
                                {m.name}
                              </text>
                              <rect x="100" y={y} width={w} height="22" fill={m.color} rx="3" opacity="0.9" />
                              {showErrorBars && (
                                <g>
                                  <line x1={100 + w - m.std * 200} y1={y + 11} x2={100 + w + m.std * 200} y2={y + 11} stroke="#ffffff" strokeWidth="1.5" />
                                  <line x1={100 + w - m.std * 200} y1={y + 6} x2={100 + w - m.std * 200} y2={y + 16} stroke="#ffffff" strokeWidth="1.5" />
                                  <line x1={100 + w + m.std * 200} y1={y + 6} x2={100 + w + m.std * 200} y2={y + 16} stroke="#ffffff" strokeWidth="1.5" />
                                </g>
                              )}
                              {showLabels && (
                                <text x={100 + w + (showErrorBars ? m.std * 200 + 8 : 8)} y={y + 15} fill="#f8fafc" fontSize="10" fontWeight="bold">
                                  {m.test.toFixed(2)}
                                </text>
                              )}
                            </g>
                          );
                        })}
                        <text x="290" y="232" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          F1-Score / Accuracy
                        </text>
                      </svg>
                    )}

                    {chartMode === "grouped" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="45" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="45" y1="200" x2="480" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="45" y1="20" x2="45" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {models.slice(0, 4).map((m, idx) => {
                          const x = 85 + idx * 105;
                          const hTrain = m.train * 170;
                          const hTest = m.test * 170;
                          return (
                            <g key={idx}>
                              {/* Train bar */}
                              <rect x={x - 22} y={200 - hTrain} width="20" height={hTrain} fill="#0284c7" rx="3" />
                              {/* Test bar */}
                              <rect x={x + 2} y={200 - hTest} width="20" height={hTest} fill="#10b981" rx="3" />
                              <text x={x} y="215" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                                {m.name}
                              </text>
                            </g>
                          );
                        })}
                        {/* Legend */}
                        <rect x="330" y="25" width="140" height="45" fill="#0f172a" rx="4" stroke="#334155" />
                        <rect x="340" y="35" width="12" height="12" fill="#0284c7" rx="2" />
                        <text x="360" y="45" fill="#cbd5e1" fontSize="10">Train Acc</text>
                        <rect x="340" y="53" width="12" height="12" fill="#10b981" rx="2" />
                        <text x="360" y="63" fill="#cbd5e1" fontSize="10">Test Acc</text>
                      </svg>
                    )}

                    {chartMode === "stacked" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="45" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="45" y1="200" x2="480" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="45" y1="20" x2="45" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {models.slice(0, 4).map((m, idx) => {
                          const x = 85 + idx * 105;
                          const hTP = 110;
                          const hFP = 35;
                          return (
                            <g key={idx}>
                              {/* Bottom True Positives */}
                              <rect x={x - 18} y={200 - hTP} width="36" height={hTP} fill="#6366f1" rx="2" />
                              {/* Top False Positives */}
                              <rect x={x - 18} y={200 - hTP - hFP} width="36" height={hFP} fill="#f43f5e" rx="2" />
                              <text x={x} y="215" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                                {m.name}
                              </text>
                            </g>
                          );
                        })}
                        {/* Legend */}
                        <rect x="330" y="25" width="140" height="45" fill="#0f172a" rx="4" stroke="#334155" />
                        <rect x="340" y="35" width="12" height="12" fill="#6366f1" rx="2" />
                        <text x="360" y="45" fill="#cbd5e1" fontSize="10">True Positives</text>
                        <rect x="340" y="53" width="12" height="12" fill="#f43f5e" rx="2" />
                        <text x="360" y="63" fill="#cbd5e1" fontSize="10">False Positives</text>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Code Snippet */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    Python Snippet:
                  </div>
                  <pre className="text-emerald-300">
{chartMode === "vertical"
  ? `bars = ax.bar(models, test_scores, color=colors, width=0.55)\n${showLabels ? "ax.bar_label(bars, fmt='%.2f', padding=3)\n" : ""}ax.set_ylabel("Accuracy")`
  : chartMode === "horizontal"
  ? `bars = ax.barh(models, test_scores, color=colors, height=0.55)\n${showLabels ? "ax.bar_label(bars, fmt='%.2f', padding=5)\n" : ""}ax.set_xlabel("Accuracy")`
  : chartMode === "grouped"
  ? `x = np.arange(len(models))\nax.bar(x - 0.17, train_acc, 0.35, label='Train')\nax.bar(x + 0.17, test_acc, 0.35, label='Test')\nax.set_xticks(x); ax.set_xticklabels(models)`
  : `ax.bar(models, true_positives, width=0.5, label='TP', color='#6366f1')\nax.bar(models, false_positives, width=0.5, bottom=true_positives, label='FP', color='#f43f5e')`}
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
                  Explore vertical, horizontal, grouped, stacked, and error bar charts.
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
                Bar Chart Technical Reference Notes
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
                  Test your understanding of bar charts, barh, grouped offsets, and stacked bars.
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

import React, { useState } from "react";
import {
  DollarSign,
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
  TrendingUp
} from "lucide-react";
import pyCode1 from "./topic13_files/01_salary_skewness_and_kde.py?raw";
import pyCode2 from "./topic13_files/02_hybrid_box_histogram_dashboard.py?raw";
import pyCode3 from "./topic13_files/03_log_transformed_salary_pipeline.py?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions.js";

export default function Topic13() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Studio Mode
  const [mode, setMode] = useState("skewed"); // "skewed", "hybrid", "transformed"
  const [numBins, setNumBins] = useState(25);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_salary_skewness_and_kde.py", code: pyCode1, desc: "Right-skewed compensation distributions, mean vs median disparity, and skewness metrics" },
    2: { name: "02_hybrid_box_histogram_dashboard.py", code: pyCode2, desc: "Synchronized dual-panel GridSpec aligning a horizontal boxplot with a density histogram" },
    3: { name: "03_log_transformed_salary_pipeline.py", code: pyCode3, desc: "Feature normalization using np.log1p(x) to achieve Gaussian symmetry for ML models" }
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
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-sky-900/40 via-blue-900/30 to-indigo-900/40 border border-sky-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 13: Worked Example 2 — Salary Distribution &amp; Skewness
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              End-to-end practical case study analyzing tech industry compensation in Kolkata and Bengaluru. Diagnose positive skewness with <code className="text-sky-300 font-mono">ax.axvline</code> (Mean vs Median), construct aligned Boxplot + Histogram EDA dashboards, and prepare features with <code className="text-sky-300 font-mono">np.log1p()</code> normalizations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" /> Case Study 02
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Skewness &amp; Log1p
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-sky-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "When Swadeep and Sachin analyzed salary distributions, the Mean was ₹18.5 LPA but the Median was ₹12.0 LPA! The histogram immediately exposed why: a handful of senior lead architects earning ₹50L+ pulled the mean up. Visualizing this skewness warned us that Linear Regression would produce poor predictions without a log transformation!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Salary Distribution Studio", icon: DollarSign },
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
                    ? "border-sky-500 text-sky-400 bg-sky-950/30"
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
                  <Sliders className="text-sky-400 w-5 h-5" />
                  Statistical View Controls
                </h2>

                <div className="space-y-2.5">
                  {[
                    { id: "skewed", title: "1. Raw Skewed Salary Histogram", desc: "Mean (₹18.5L) vs Median (₹12.0L) Disparity" },
                    { id: "hybrid", title: "2. Aligned Boxplot + Histogram", desc: "Outlier isolation with shared horizontal axes" },
                    { id: "transformed", title: "3. np.log1p(x) Normalization", desc: "Gaussian symmetry transformation for regression" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setMode(item.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition ${
                        mode === item.id
                          ? "border-sky-500 bg-sky-950/60 text-sky-200 ring-1 ring-sky-500 shadow-md"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-semibold text-white text-xs">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Histogram Bins (bins parameter)</span>
                    <span className="text-sky-400 font-mono">{numBins}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="40"
                    step="5"
                    value={numBins}
                    onChange={(e) => setNumBins(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-sky-400" />
                      Live Statistical Analysis Canvas
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-sky-300 border border-slate-800 uppercase">
                      Mode: {mode}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    {mode === "skewed" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="50" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="50" y1="200" x2="490" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {/* Right-Skewed Bars */}
                        {[
                          { x: 55, h: 45 }, { x: 75, h: 110 }, { x: 95, h: 165 }, { x: 115, h: 175 },
                          { x: 135, h: 150 }, { x: 155, h: 120 }, { x: 175, h: 90 }, { x: 195, h: 70 },
                          { x: 215, h: 55 }, { x: 235, h: 40 }, { x: 255, h: 30 }, { x: 275, h: 22 },
                          { x: 295, h: 16 }, { x: 315, h: 12 }, { x: 335, h: 10 }, { x: 355, h: 7 },
                          { x: 375, h: 5 }, { x: 395, h: 4 }, { x: 415, h: 3 }, { x: 435, h: 2 }, { x: 455, h: 2 }
                        ].map((b, idx) => (
                          <rect key={idx} x={b.x} y={200 - b.h} width="16" height={b.h} fill="#38bdf8" opacity="0.8" stroke="#0284c7" rx="1" />
                        ))}

                        {/* Median Line (Green - 12 LPA) */}
                        <line x1="125" y1="20" x2="125" y2="200" stroke="#10b981" strokeWidth="2.5" />
                        {/* Mean Line (Red - 18.5 LPA) */}
                        <line x1="175" y1="20" x2="175" y2="200" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4,4" />

                        {/* Legend */}
                        <rect x="300" y="25" width="180" height="55" fill="#0f172a" rx="4" stroke="#334155" />
                        <line x1="310" y1="40" x2="330" y2="40" stroke="#10b981" strokeWidth="2.5" />
                        <text x="338" y="44" fill="#cbd5e1" fontSize="9">Median: ₹12.0 LPA</text>
                        <line x1="310" y1="60" x2="330" y2="60" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4,4" />
                        <text x="338" y="64" fill="#cbd5e1" fontSize="9">Mean: ₹18.5 LPA (Skewed)</text>

                        <text x="270" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Annual Compensation (Lakh INR)
                        </text>
                        <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">
                          Frequency Count
                        </text>
                      </svg>
                    )}

                    {mode === "hybrid" && (
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                        {/* Top Boxplot */}
                        <g>
                          <rect x="50" y="15" width="420" height="50" fill="#0b0f19" stroke="#334155" rx="3" />
                          {/* Box IQR */}
                          <rect x="110" y="25" width="90" height="30" fill="#6366f1" opacity="0.6" stroke="#818cf8" rx="2" />
                          {/* Median inside box */}
                          <line x1="140" y1="25" x2="140" y2="55" stroke="#f43f5e" strokeWidth="2.5" />
                          {/* Whiskers */}
                          <line x1="75" y1="40" x2="110" y2="40" stroke="#cbd5e1" strokeWidth="1.5" />
                          <line x1="200" y1="40" x2="310" y2="40" stroke="#cbd5e1" strokeWidth="1.5" />
                          {/* Outliers */}
                          <circle cx="370" cy="40" r="3.5" fill="#f43f5e" />
                          <circle cx="420" cy="40" r="3.5" fill="#f43f5e" />
                          <circle cx="450" cy="40" r="3.5" fill="#f43f5e" />
                          <text x="60" y="30" fill="#a5b4fc" fontSize="8" fontWeight="bold">Boxplot Outliers</text>
                        </g>

                        {/* Bottom Histogram */}
                        <g transform="translate(0, 50)">
                          <line x1="50" y1="160" x2="470" y2="160" stroke="#64748b" strokeWidth="1.5" />
                          {[
                            { x: 55, h: 30 }, { x: 80, h: 90 }, { x: 105, h: 125 }, { x: 130, h: 130 },
                            { x: 155, h: 100 }, { x: 180, h: 70 }, { x: 205, h: 45 }, { x: 230, h: 30 },
                            { x: 255, h: 20 }, { x: 280, h: 15 }, { x: 305, h: 10 }, { x: 330, h: 6 },
                            { x: 355, h: 4 }, { x: 420, h: 2 }, { x: 450, h: 2 }
                          ].map((b, idx) => (
                            <rect key={idx} x={b.x} y={160 - b.h} width="20" height={b.h} fill="#0ea5e9" opacity="0.8" stroke="#0284c7" rx="1" />
                          ))}
                        </g>
                      </svg>
                    )}

                    {mode === "transformed" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="50" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="50" y1="200" x2="490" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {/* Symmetrical Bell Curve Bins */}
                        {[
                          { x: 70, h: 10 }, { x: 100, h: 35 }, { x: 130, h: 75 }, { x: 160, h: 125 },
                          { x: 190, h: 165 }, { x: 220, h: 180 }, { x: 250, h: 175 }, { x: 280, h: 145 },
                          { x: 310, h: 100 }, { x: 340, h: 60 }, { x: 370, h: 30 }, { x: 400, h: 12 }
                        ].map((b, idx) => (
                          <rect key={idx} x={b.x} y={200 - b.h} width="24" height={b.h} fill="#10b981" opacity="0.85" stroke="#047857" rx="2" />
                        ))}

                        <text x="270" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Log-Transformed: np.log1p(Salary) (Near-Gaussian Normal)
                        </text>
                        <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">
                          Frequency Count
                        </text>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-sky-400" />
                    Python Matplotlib Code:
                  </div>
                  <pre className="text-sky-300">
{mode === "skewed"
  ? `ax.hist(salaries, bins=${numBins}, color='#38bdf8', edgecolor='black')\nax.axvline(np.median(salaries), color='#10b981', lw=2.5, label='Median')\nax.axvline(np.mean(salaries), color='#ef4444', lw=2.5, linestyle='--', label='Mean')\nax.legend()`
  : mode === "hybrid"
  ? `gs = fig.add_gridspec(2, 1, height_ratios=[1, 3], hspace=0.05)\nax_box = fig.add_subplot(gs[0])\nax_box.boxplot(salaries, vert=False)\nax_hist = fig.add_subplot(gs[1], sharex=ax_box)\nax_hist.hist(salaries, bins=35)`
  : `log_salaries = np.log1p(salaries)\nax.hist(log_salaries, bins=30, color='#10b981', edgecolor='black')\nax.set_title("Log-Transformed Normal Distribution")`}
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
                  <Terminal className="text-sky-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore salary distribution histograms, boxplot hybrid dashboards, and log1p transforms.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-sky-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-sky-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-sky-400 w-5 h-5" />
                Case Study 2: Compensation Analytics Notes
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
                  <HelpCircle className="text-sky-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of right-skewed distributions, mean vs median, and log transforms.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-300 text-sm font-bold">
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
                        btnStyle = "border-sky-500 bg-sky-950/50 text-sky-200 ring-1 ring-sky-500";
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
                      <strong className="text-sky-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-sky-600/30"
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

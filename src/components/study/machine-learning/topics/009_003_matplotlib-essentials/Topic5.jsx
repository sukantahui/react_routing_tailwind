import React, { useState } from "react";
import {
  Activity,
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
import pyCode1 from "./topic5_files/01_histograms_and_binning_rules.py?raw";
import pyCode2 from "./topic5_files/02_multiclass_and_stacked_histograms.py?raw";
import pyCode3 from "./topic5_files/03_cumulative_and_kde_overlays.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

export default function Topic5() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Histogram Studio Controls
  const [numBins, setNumBins] = useState(15);
  const [isDensity, setIsDensity] = useState(false);
  const [showPdfOverlay, setShowPdfOverlay] = useState(true);
  const [isMultiClass, setIsMultiClass] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_histograms_and_binning_rules.py", code: pyCode1, desc: "Binning algorithms (bins='fd', 'auto'), density normalization, and edge arrays" },
    2: { name: "02_multiclass_and_stacked_histograms.py", code: pyCode2, desc: "Overlaid transparent distributions vs barstacked class comparisons" },
    3: { name: "03_cumulative_and_kde_overlays.py", code: pyCode3, desc: "Gaussian PDF theoretical curves and empirical cumulative distribution (CDF)" }
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

  // Synthetic distribution simulation
  const generateBinsData = () => {
    const totalWidth = 420;
    const startX = 60;
    const binWidth = totalWidth / numBins;

    // Normal bell profile generator
    const bins = [];
    for (let i = 0; i < numBins; i++) {
      const x = startX + i * binWidth;
      const normalizedPos = (i - (numBins - 1) / 2) / ((numBins - 1) / 4);
      // Gaussian shape
      let height1 = Math.exp(-0.5 * normalizedPos * normalizedPos);
      let height2 = Math.exp(-0.5 * (normalizedPos - 1.2) * (normalizedPos - 1.2)) * 0.7;

      const scale = isDensity ? 140 : 160;
      bins.push({
        x,
        w: binWidth * 0.9,
        h1: height1 * scale,
        h2: height2 * scale
      });
    }
    return bins;
  };

  const binsData = generateBinsData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-indigo-900/40 border border-violet-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 5: Histogram with plt.hist()
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Understand feature distributions and probability densities in machine learning datasets. Master binning estimators (<code className="text-violet-300 font-mono">bins='fd'</code>, <code className="text-violet-300 font-mono">'auto'</code>), density normalization (<code className="text-violet-300 font-mono">density=True</code>), Gaussian PDF overlays, and multi-class classification separation histograms.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> plt.hist()
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> PDF &amp; CDF Analysis
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-violet-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "Before applying algorithms like Linear Regression or Gaussian Naive Bayes, Debangshu and Abhronila always plot feature histograms. If a feature like <code className="text-slate-200">Customer Income</code> is heavily right-skewed, the histogram immediately tells us that a log transformation <code className="text-violet-300 font-mono">np.log1p(x)</code> is needed before training!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Distribution Studio", icon: Activity },
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
                    ? "border-violet-500 text-violet-400 bg-violet-950/30"
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
                  <Sliders className="text-violet-400 w-5 h-5" />
                  Histogram &amp; Density Controls
                </h2>

                {/* Bins Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Number of Bins (bins parameter)</span>
                    <span className="text-violet-400 font-mono">{numBins} bins</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={numBins}
                    onChange={(e) => setNumBins(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>5 (Under-smoothed)</span>
                    <span>35 (Over-granular)</span>
                  </div>
                </div>

                {/* Normalization Mode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Y-Axis Metric Scaling
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsDensity(false)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                        !isDensity
                          ? "border-violet-500 bg-violet-950/60 text-violet-300 ring-1 ring-violet-500"
                          : "border-slate-800 bg-slate-950 text-slate-400"
                      }`}
                    >
                      Count (Frequency)
                    </button>
                    <button
                      onClick={() => setIsDensity(true)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                        isDensity
                          ? "border-violet-500 bg-violet-950/60 text-violet-300 ring-1 ring-violet-500"
                          : "border-slate-800 bg-slate-950 text-slate-400"
                      }`}
                    >
                      density=True (PDF)
                    </button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">
                      Gaussian Normal PDF Curve Overlay
                    </span>
                    <button
                      onClick={() => setShowPdfOverlay(!showPdfOverlay)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        showPdfOverlay ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {showPdfOverlay ? "ON" : "OFF"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">
                      Multi-Class Class Separation (Approved vs Rejected)
                    </span>
                    <button
                      onClick={() => setIsMultiClass(!isMultiClass)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        isMultiClass ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isMultiClass ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Visual Display */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-violet-400" />
                      Live Histogram Distribution
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-violet-300 border border-slate-800">
                      bins={numBins} | density={isDensity ? "True" : "False"}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                      {[50, 100, 150, 200].map((y) => (
                        <line key={y} x1="50" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                      ))}
                      <line x1="50" y1="200" x2="490" y2="200" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                      {/* Render Bins */}
                      {binsData.map((b, idx) => (
                        <g key={idx}>
                          {/* Class 1 (Approved / Main) */}
                          <rect
                            x={b.x}
                            y={200 - b.h1}
                            width={b.w}
                            height={b.h1}
                            fill="#8b5cf6"
                            opacity={isMultiClass ? "0.6" : "0.85"}
                            stroke="#4c1d95"
                            strokeWidth="1"
                            rx="2"
                          />
                          {/* Class 2 (Rejected) if multiclass */}
                          {isMultiClass && (
                            <rect
                              x={b.x}
                              y={200 - b.h2}
                              width={b.w}
                              height={b.h2}
                              fill="#ef4444"
                              opacity="0.55"
                              stroke="#991b1b"
                              strokeWidth="1"
                              rx="2"
                            />
                          )}
                        </g>
                      ))}

                      {/* Theoretical Gaussian Curve Overlay */}
                      {showPdfOverlay && !isMultiClass && (
                        <path
                          d="M 60 198 Q 165 190 270 40 T 480 198"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="3"
                        />
                      )}

                      {/* Legend */}
                      {isMultiClass ? (
                        <g>
                          <rect x="330" y="25" width="145" height="50" fill="#0f172a" rx="4" stroke="#334155" />
                          <rect x="340" y="36" width="12" height="12" fill="#8b5cf6" rx="2" />
                          <text x="360" y="46" fill="#cbd5e1" fontSize="10">Class 1: Approved</text>
                          <rect x="340" y="54" width="12" height="12" fill="#ef4444" rx="2" />
                          <text x="360" y="64" fill="#cbd5e1" fontSize="10">Class 0: Rejected</text>
                        </g>
                      ) : showPdfOverlay ? (
                        <g>
                          <rect x="330" y="25" width="145" height="30" fill="#0f172a" rx="4" stroke="#334155" />
                          <line x1="340" y1="40" x2="365" y2="40" stroke="#f43f5e" strokeWidth="2" />
                          <text x="375" y="44" fill="#f43f5e" fontSize="10" fontWeight="bold">Normal PDF</text>
                        </g>
                      ) : null}

                      {/* Axis labels */}
                      <text x="270" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Applicant Credit Score (Bins)
                      </text>
                      <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">
                        {isDensity ? "Probability Density" : "Frequency Count"}
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-violet-400" />
                    Python Matplotlib Code:
                  </div>
                  <pre className="text-violet-300">
{isMultiClass
  ? `ax.hist(approved, bins=${numBins}, density=${isDensity ? "True" : "False"}, alpha=0.6, color='#8b5cf6', label='Approved')
ax.hist(rejected, bins=${numBins}, density=${isDensity ? "True" : "False"}, alpha=0.5, color='#ef4444', label='Rejected')
ax.legend()`
  : `counts, edges, patches = ax.hist(data, bins=${numBins}, density=${isDensity ? "True" : "False"}, color='#8b5cf6', rwidth=0.9)
${showPdfOverlay ? "ax.plot(x_range, normal_pdf, color='#f43f5e', lw=2.5, label='Normal PDF')\nax.legend()" : ""}`}
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
                  <Terminal className="text-violet-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore binning strategies, multi-class overlays, and theoretical PDF curves.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-violet-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-violet-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-violet-400 w-5 h-5" />
                Histogram &amp; Density Estimation Reference
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
                  <HelpCircle className="text-violet-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of histogram parameters, density scaling, and binning rules.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-violet-950 border border-violet-500/40 text-violet-300 text-sm font-bold">
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
                        btnStyle = "border-violet-500 bg-violet-950/50 text-violet-200 ring-1 ring-violet-500";
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
                      <strong className="text-violet-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-violet-600/30"
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

import React, { useState } from "react";
import {
  Maximize2,
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
  Compass
} from "lucide-react";
import pyCode1 from "./topic9_files/01_axis_limits_and_margins.py?raw";
import pyCode2 from "./topic9_files/02_inverted_and_aspect_ratio_limits.py?raw";
import pyCode3 from "./topic9_files/03_log_and_symlog_scales.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

export default function Topic9() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Axis Limits Controls
  const [xMin, setXMin] = useState(0);
  const [xMax, setXMax] = useState(100);
  const [yMin, setYMin] = useState(0);
  const [yMax, setYMax] = useState(100);
  const [isLogScale, setIsLogScale] = useState(false);
  const [isInvertedY, setIsInvertedY] = useState(false);
  const [isEqualAspect, setIsEqualAspect] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_axis_limits_and_margins.py", code: pyCode1, desc: "Setting explicit limits (set_xlim, set_ylim), margins, and tight autoscaling" },
    2: { name: "02_inverted_and_aspect_ratio_limits.py", code: pyCode2, desc: "Equal aspect ratios for PCA/Euclidean distances and inverted axes" },
    3: { name: "03_log_and_symlog_scales.py", code: pyCode3, desc: "Logarithmic and symmetrical log (symlog) scaling for vast dynamic ranges" }
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
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-blue-900/40 via-sky-900/30 to-indigo-900/40 border border-blue-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 9: Setting Axis Limits &amp; Scales
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Gain precise viewport control over your machine learning charts. Master explicit limits (<code className="text-blue-300 font-mono">ax.set_xlim</code>, <code className="text-blue-300 font-mono">ax.set_ylim</code>), margin clamping, inverted axes for rankings, Euclidean aspect ratio normalization (<code className="text-blue-300 font-mono">ax.set_aspect('equal')</code>), and logarithmic/symlog scaling.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> set_xlim &amp; set_ylim
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Log &amp; Symlog Scales
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "When Tuhina plotted learning rate decay from 0.1 down to 0.00001, on a linear axis all values after epoch 5 looked like a flat zero line! Switching to <code className="text-blue-300 font-mono">ax.set_yscale('log')</code> and clamping <code className="text-blue-300 font-mono">ax.set_xlim(0, 50)</code> revealed the true exponential decay curve. Controlling axes limits is vital for honest data interpretation!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Limits & Scale Studio", icon: Maximize2 },
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
                    ? "border-blue-500 text-blue-400 bg-blue-950/30"
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
                  <Sliders className="text-blue-400 w-5 h-5" />
                  Viewport Bounds &amp; Scaling
                </h2>

                {/* X Limits Sliders */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>ax.set_xlim X-Min</span>
                      <span className="text-blue-400 font-mono">{xMin}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={xMin}
                      onChange={(e) => setXMin(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>ax.set_xlim X-Max</span>
                      <span className="text-blue-400 font-mono">{xMax}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={xMax}
                      onChange={(e) => setXMax(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>

                {/* Y Limits Sliders */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>ax.set_ylim Y-Min</span>
                      <span className="text-blue-400 font-mono">{yMin}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={yMin}
                      onChange={(e) => setYMin(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>ax.set_ylim Y-Max</span>
                      <span className="text-blue-400 font-mono">{yMax}%</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="120"
                      value={yMax}
                      onChange={(e) => setYMax(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-300">ax.set_yscale('log')</span>
                    <button
                      onClick={() => setIsLogScale(!isLogScale)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        isLogScale ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isLogScale ? "ON" : "OFF"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-300">ax.invert_yaxis()</span>
                    <button
                      onClick={() => setIsInvertedY(!isInvertedY)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        isInvertedY ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isInvertedY ? "INVERTED" : "NORMAL"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-300">ax.set_aspect('equal')</span>
                    <button
                      onClick={() => setIsEqualAspect(!isEqualAspect)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        isEqualAspect ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isEqualAspect ? "EQUAL" : "AUTO"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-blue-400" />
                      Live Viewport Output
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-blue-300 border border-slate-800">
                      xlim=({xMin}, {xMax}) | ylim=({yMin}, {yMax})
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                      {/* Grid */}
                      {[50, 100, 150, 200].map((y) => (
                        <line key={y} x1="50" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                      ))}
                      <line x1="50" y1="200" x2="480" y2="200" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                      {/* Converging Accuracy Curve */}
                      <g transform={isInvertedY ? "scale(1, -1) translate(0, -220)" : ""}>
                        <path
                          d="M 50 190 C 180 180, 260 70, 480 45"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="3"
                        />
                        {/* 100% Ideal Line */}
                        <line x1="50" y1="40" x2="480" y2="40" stroke="#ef4444" strokeDasharray="4,4" strokeWidth="1.5" />
                        <text x="470" y="32" fill="#ef4444" fontSize="9" textAnchor="end">100% Target</text>
                      </g>

                      {/* Tick Labels showing current min/max bounds */}
                      <text x="50" y="215" fill="#94a3b8" fontSize="9" textAnchor="middle">{xMin}</text>
                      <text x="480" y="215" fill="#94a3b8" fontSize="9" textAnchor="middle">{xMax}</text>
                      <text x="40" y="203" fill="#94a3b8" fontSize="9" textAnchor="end">{isInvertedY ? yMax : yMin}%</text>
                      <text x="40" y="30" fill="#94a3b8" fontSize="9" textAnchor="end">{isInvertedY ? yMin : yMax}%</text>

                      {/* Axis Titles */}
                      <text x="265" y="235" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Epochs (ax.set_xlim)
                      </text>
                      <text x="15" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 15 110)">
                        {isLogScale ? "Accuracy (Log Scale)" : "Accuracy (Percentage)"}
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-blue-400" />
                    Generated Matplotlib Python Code:
                  </div>
                  <pre className="text-blue-300">
{`ax.set_xlim(${xMin}, ${xMax})
ax.set_ylim(${yMin}, ${yMax})
${isLogScale ? "ax.set_yscale('log')\n" : ""}${isInvertedY ? "ax.invert_yaxis()\n" : ""}${isEqualAspect ? "ax.set_aspect('equal')\n" : ""}ax.plot(epochs, accuracy, color='#38bdf8')`}
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
                  <Terminal className="text-blue-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore axis limits, aspect ratio normalization, and log/symlog scaling.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-blue-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-blue-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-blue-400 w-5 h-5" />
                Axis Limits, Margins &amp; Scaling Reference
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
                  <HelpCircle className="text-blue-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of axis limits, margins, aspect ratio, and symlog scales.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-300 text-sm font-bold">
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
                        btnStyle = "border-blue-500 bg-blue-950/50 text-blue-200 ring-1 ring-blue-500";
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
                      <strong className="text-blue-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-600/30"
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

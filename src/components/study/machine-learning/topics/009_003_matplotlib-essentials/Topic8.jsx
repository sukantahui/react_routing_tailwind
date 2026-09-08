import React, { useState } from "react";
import {
  Type,
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
  Tag
} from "lucide-react";
import pyCode1 from "./topic8_files/01_titles_labels_and_latex.py?raw";
import pyCode2 from "./topic8_files/02_legend_positioning_and_bbox.py?raw";
import pyCode3 from "./topic8_files/03_multiple_legends_and_handlers.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

export default function Topic8() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Studio Controls
  const [legendLoc, setLegendLoc] = useState("upper_left"); // "upper_left", "upper_right", "lower_right", "outside"
  const [numCols, setNumCols] = useState(1);
  const [selectedFormula, setSelectedFormula] = useState("sigmoid");
  const [titlePad, setTitlePad] = useState(14);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_titles_labels_and_latex.py", code: pyCode1, desc: "LaTeX mathematical notation, raw string formatting, and label padding" },
    2: { name: "02_legend_positioning_and_bbox.py", code: pyCode2, desc: "Legend placement strategies, multi-column layouts, and bbox_to_anchor" },
    3: { name: "03_multiple_legends_and_handlers.py", code: pyCode3, desc: "Pinning dual independent legends to a single Axes using ax.add_artist" }
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

  const formulas = {
    sigmoid: {
      name: "Logistic Sigmoid Activation",
      latexStr: "$\\sigma(z) = \\frac{1}{1 + e^{-z}}$",
      displayTitle: "Sigmoid Activation: σ(z) = 1 / (1 + e⁻ᶻ)"
    },
    bce: {
      name: "Binary Cross-Entropy Loss",
      latexStr: "$\\mathcal{L} = -[y \\log(\\hat{y}) + (1-y)\\log(1-\\hat{y})]$",
      displayTitle: "Binary Cross-Entropy: ℒ = -[y log(ŷ) + (1-y)log(1-ŷ)]"
    },
    gaussian: {
      name: "Gaussian Normal Distribution",
      latexStr: "$\\mathcal{N}(\\mu, \\sigma^2) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$",
      displayTitle: "Gaussian Normal PDF: N(μ, σ²)"
    }
  };

  // Helper for legend position inside SVG
  const getLegendCoords = () => {
    switch (legendLoc) {
      case "upper_right": return { x: 330, y: 35 };
      case "lower_right": return { x: 330, y: 145 };
      case "outside": return { x: 445, y: 35 };
      case "upper_left":
      default: return { x: 55, y: 35 };
    }
  };

  const legCoords = getLegendCoords();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-teal-900/40 via-cyan-900/30 to-sky-900/40 border border-teal-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 8: Adding Titles, Labels &amp; Legends
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Elevate your ML figures from raw plots to publication-grade figures. Master LaTeX mathematical formulas (<code className="text-teal-300 font-mono">r'$\sigma(z)$'</code>), figure super-titles, label padding, multi-column legends (<code className="text-teal-300 font-mono">ncol=2</code>), external placement (<code className="text-teal-300 font-mono">bbox_to_anchor</code>), and dual-legend pinning.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> LaTeX Math
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> bbox_to_anchor
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-teal-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "In data science research papers, figures without clear LaTeX math notation or with overlapping legends get rejected immediately. When Debangshu placed a legend with 8 model names directly over his test loss curves, it obscured the minimum error point! Moving it outside with <code className="text-teal-300 font-mono">bbox_to_anchor=(1.02, 1)</code> resolved the clutter instantly."
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Legend & Typography Studio", icon: Type },
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
                    ? "border-teal-500 text-teal-400 bg-teal-950/30"
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
                  <Sliders className="text-teal-400 w-5 h-5" />
                  Typography &amp; Legend Layout
                </h2>

                {/* Formula Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    LaTeX Math Title Formula
                  </label>
                  <div className="space-y-2">
                    {Object.keys(formulas).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedFormula(key)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition ${
                          selectedFormula === key
                            ? "border-teal-500 bg-teal-950/60 text-teal-300 ring-1 ring-teal-500"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className="font-semibold text-slate-200">{formulas[key].name}</div>
                        <div className="text-[11px] font-mono text-teal-400/80 mt-0.5">{formulas[key].latexStr}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legend Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Legend Placement (loc &amp; bbox_to_anchor)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "upper_left", label: "Upper Left" },
                      { id: "upper_right", label: "Upper Right" },
                      { id: "lower_right", label: "Lower Right" },
                      { id: "outside", label: "Outside (bbox_to_anchor)" }
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => setLegendLoc(loc.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition ${
                          legendLoc === loc.id
                            ? "border-teal-500 bg-teal-950/60 text-teal-300 ring-1 ring-teal-500"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Multi-Column Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Legend Columns (ncol)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((cols) => (
                      <button
                        key={cols}
                        onClick={() => setNumCols(cols)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border text-center transition ${
                          numCols === cols
                            ? "border-teal-500 bg-teal-950 text-teal-300 ring-1 ring-teal-500"
                            : "border-slate-800 bg-slate-950 text-slate-400"
                        }`}
                      >
                        {cols} {cols === 1 ? "Column" : "Cols"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Padding Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Title &amp; Label Padding (pad)</span>
                    <span className="text-teal-400 font-mono">{titlePad} px</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="24"
                    step="2"
                    value={titlePad}
                    onChange={(e) => setTitlePad(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-teal-400" />
                      Live Typography &amp; Legend Canvas
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-teal-300 border border-slate-800">
                      loc='{legendLoc}' | ncol={numCols}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 560 250" className="w-full max-w-lg h-56">
                      {/* Grid */}
                      {[50, 100, 150, 200].map((y) => (
                        <line key={y} x1="45" y1={y} x2={legendLoc === "outside" ? "435" : "510"} y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                      ))}
                      <line x1="45" y1="200" x2={legendLoc === "outside" ? "435" : "510"} y2="200" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="45" y1="25" x2="45" y2="200" stroke="#64748b" strokeWidth="1.5" />

                      {/* Main Function Curve */}
                      <path
                        d="M 45 190 Q 140 185 240 110 T 435 30"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                      />
                      {/* Secondary Curve */}
                      <path
                        d="M 45 40 Q 200 45 280 140 T 435 195"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="4,4"
                      />

                      {/* Title with live padding */}
                      <text
                        x={legendLoc === "outside" ? "240" : "280"}
                        y={25 - titlePad / 3}
                        fill="#f8fafc"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {formulas[selectedFormula].displayTitle}
                      </text>

                      {/* Dynamic Legend Box */}
                      <g transform={`translate(${legCoords.x}, ${legCoords.y})`}>
                        <rect
                          x="0"
                          y="0"
                          width={numCols === 1 ? (legendLoc === "outside" ? 110 : 130) : numCols === 2 ? 190 : 240}
                          height={numCols === 1 ? 50 : 35}
                          fill="#0f172a"
                          rx="4"
                          stroke="#334155"
                          opacity="0.95"
                        />
                        {numCols === 1 ? (
                          <>
                            <line x1="10" y1="18" x2="25" y2="18" stroke="#0ea5e9" strokeWidth="2.5" />
                            <text x="32" y="21" fill="#cbd5e1" fontSize="9">Model A: Sigmoid</text>
                            <line x1="10" y1="36" x2="25" y2="36" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3,3" />
                            <text x="32" y="39" fill="#cbd5e1" fontSize="9">Model B: Baseline</text>
                          </>
                        ) : (
                          <>
                            <line x1="10" y1="20" x2="22" y2="20" stroke="#0ea5e9" strokeWidth="2.5" />
                            <text x="28" y="23" fill="#cbd5e1" fontSize="8.5">Model A</text>
                            <line x1="90" y1="20" x2="102" y2="20" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3,3" />
                            <text x="108" y="23" fill="#cbd5e1" fontSize="8.5">Model B</text>
                          </>
                        )}
                      </g>

                      {/* Axis Labels */}
                      <text x={legendLoc === "outside" ? "240" : "280"} y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Feature Dimension $x \in \mathbb&#123;R&#125;$
                      </text>
                      <text x="15" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 15 110)">
                        Output Magnitude
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-teal-400" />
                    Generated Matplotlib Python Code:
                  </div>
                  <pre className="text-teal-300">
{`ax.set_title(r"${formulas[selectedFormula].latexStr}", fontsize=12, pad=${titlePad})
ax.set_xlabel(r"Feature Space $x \\in \\mathbb{R}$", labelpad=8)
${legendLoc === "outside" 
  ? `ax.legend(bbox_to_anchor=(1.02, 1), loc='upper left', ncol=${numCols}, frameon=True)` 
  : `ax.legend(loc='${legendLoc.replace("_", " ")}', ncol=${numCols}, shadow=True)`}`}
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
                  <Terminal className="text-teal-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore LaTeX mathtext, legend positioning with bbox_to_anchor, and multi-legend handlers.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-teal-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-teal-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-teal-400 w-5 h-5" />
                Typography &amp; Legend Placement Reference
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
                  <HelpCircle className="text-teal-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of LaTeX typography, bbox_to_anchor, and legend handlers.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-teal-950 border border-teal-500/40 text-teal-300 text-sm font-bold">
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
                        btnStyle = "border-teal-500 bg-teal-950/50 text-teal-200 ring-1 ring-teal-500";
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
                      <strong className="text-teal-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-teal-600/30"
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

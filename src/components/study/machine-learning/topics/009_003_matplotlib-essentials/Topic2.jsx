import React, { useState } from "react";
import {
  Layout,
  Terminal,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Maximize2,
  Sliders,
  Box,
  Code,
  Info
} from "lucide-react";
import pyCode1 from "./topic2_files/01_figure_axes_anatomy.py?raw";
import pyCode2 from "./topic2_files/02_subplots_layout_anatomy.py?raw";
import pyCode3 from "./topic2_files/03_axes_coordinates_and_transforms.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

export default function Topic2() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Anatomy state
  const [selectedElement, setSelectedElement] = useState("axes");

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_figure_axes_anatomy.py", code: pyCode1, desc: "Anatomy of Figure, Axes, Axis, Spines, and Ticks" },
    2: { name: "02_subplots_layout_anatomy.py", code: pyCode2, desc: "Multi-Axes subplots, 1D/2D array indexing, and layout management" },
    3: { name: "03_axes_coordinates_and_transforms.py", code: pyCode3, desc: "Coordinate transform systems (transData, transAxes, transFigure)" }
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

  const anatomyElements = {
    figure: {
      name: "Figure Container (fig)",
      role: "The overarching top-level window/canvas holding one or more subplots, titles, and global canvas properties.",
      methods: ["fig.suptitle()", "fig.savefig()", "fig.tight_layout()", "fig.colorbar()"],
      color: "border-purple-500 text-purple-300 bg-purple-950/40"
    },
    axes: {
      name: "Axes Object (ax)",
      role: "The coordinate bounding box (subplot) where data points, lines, bars, legends, and gridlines reside.",
      methods: ["ax.plot()", "ax.set_title()", "ax.set_xlabel()", "ax.set_ylim()", "ax.grid()"],
      color: "border-sky-500 text-sky-300 bg-sky-950/40"
    },
    spines: {
      name: "Spines (ax.spines)",
      role: "The four boundary lines enclosing the data area: 'top', 'bottom', 'left', 'right'. Can be hidden or colored.",
      methods: ["ax.spines['top'].set_visible(False)", "ax.spines['left'].set_color('gray')"],
      color: "border-emerald-500 text-emerald-300 bg-emerald-950/40"
    },
    axis: {
      name: "X-Axis / Y-Axis (ax.xaxis, ax.yaxis)",
      role: "Handles tick marks, tick locators, major/minor tick formatting, and data scale (linear, log).",
      methods: ["ax.xaxis.set_major_locator()", "ax.yaxis.set_major_formatter()", "ax.minorticks_on()"],
      color: "border-amber-500 text-amber-300 bg-amber-950/40"
    },
    annotation: {
      name: "Annotations & Text (ax.annotate / ax.text)",
      role: "Places contextual callouts, arrows, and KPI metric watermarks using Data or Axes coordinates.",
      methods: ["ax.annotate('Outlier', xy=(x,y), xytext=(x2,y2), arrowprops=...)", "ax.text(0.95, 0.95, 'KPI', transform=ax.transAxes)"],
      color: "border-rose-500 text-rose-300 bg-rose-950/40"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-sky-900/40 border border-indigo-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 2: Figure &amp; Axes Concept
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Deconstruct the visual anatomy of a Matplotlib chart. Master the distinction between the top-level <code className="text-indigo-300">Figure</code> container, the plotting <code className="text-sky-300">Axes</code>, <code className="text-emerald-300">Spines</code>, <code className="text-amber-300">Axis ticks</code>, and coordinate spaces.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" /> Figure Canvas
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> Axes Subplots
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
              "Students frequently confuse an <code className="text-sky-300">Axes</code> with the plural of the x-axis line! In Matplotlib, the <strong>Figure</strong> is the picture frame, the <strong>Axes</strong> is the canvas with coordinate systems where you paint graphs, and the <strong>Axis</strong> is the number line with ticks. Once Susmita and Debangshu understood this hierarchy, creating multi-subplot neural network metric dashboards became effortless."
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Visual Anatomy Explorer", icon: Layout },
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
              {/* Interactive SVG Diagram */}
              <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Box className="text-indigo-400 w-5 h-5" />
                      Visual Anatomy Interactive Diagram
                    </h2>
                    <span className="text-xs text-slate-400">
                      Click any element button or hotspot to inspect its role
                    </span>
                  </div>

                  {/* SVG Canvas Map */}
                  <div className="relative bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 540 280" className="w-full max-w-xl h-64">
                      {/* Figure Container (Outer Box) */}
                      <rect
                        x="10"
                        y="10"
                        width="520"
                        height="260"
                        fill="#0b0f19"
                        stroke={selectedElement === "figure" ? "#a855f7" : "#475569"}
                        strokeWidth={selectedElement === "figure" ? "3" : "1.5"}
                        strokeDasharray={selectedElement === "figure" ? "0" : "6,6"}
                        rx="10"
                        className="cursor-pointer transition-all"
                        onClick={() => setSelectedElement("figure")}
                      />
                      <text x="30" y="30" fill="#a855f7" fontSize="11" fontWeight="bold">
                        Figure Container (fig)
                      </text>

                      {/* Super Title */}
                      <text x="270" y="35" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                        fig.suptitle("Machine Learning Training Evaluation Dashboard")
                      </text>

                      {/* Axes Container (Inner Plot Box) */}
                      <rect
                        x="70"
                        y="60"
                        width="430"
                        height="170"
                        fill="#0f172a"
                        stroke={selectedElement === "axes" ? "#38bdf8" : "#334155"}
                        strokeWidth={selectedElement === "axes" ? "3" : "1.5"}
                        rx="4"
                        className="cursor-pointer transition-all"
                        onClick={() => setSelectedElement("axes")}
                      />
                      <text x="85" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        Axes (ax)
                      </text>

                      {/* Spines Highlight */}
                      <line
                        x1="70"
                        y1="230"
                        x2="500"
                        y2="230"
                        stroke={selectedElement === "spines" ? "#10b981" : "#64748b"}
                        strokeWidth={selectedElement === "spines" ? "4" : "2"}
                        className="cursor-pointer"
                        onClick={() => setSelectedElement("spines")}
                      />
                      <line
                        x1="70"
                        y1="60"
                        x2="70"
                        y2="230"
                        stroke={selectedElement === "spines" ? "#10b981" : "#64748b"}
                        strokeWidth={selectedElement === "spines" ? "4" : "2"}
                        className="cursor-pointer"
                        onClick={() => setSelectedElement("spines")}
                      />
                      {/* Top & Right Spines (Dimmed/Customized) */}
                      <line x1="70" y1="60" x2="500" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="500" y1="60" x2="500" y2="230" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Gridlines */}
                      {[100, 140, 180].map((y) => (
                        <line key={y} x1="70" y1={y} x2="500" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                      ))}
                      {[150, 240, 330, 420].map((x) => (
                        <line key={x} x1={x} y1="60" x2={x} y2="230" stroke="#1e293b" strokeDasharray="3,3" />
                      ))}

                      {/* Curve */}
                      <path
                        d="M 70 210 Q 180 190 280 120 T 500 80"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                      />

                      {/* Ticks & Labels on X Axis */}
                      {[
                        { x: 70, label: "0" },
                        { x: 150, label: "25" },
                        { x: 240, label: "50" },
                        { x: 330, label: "75" },
                        { x: 420, label: "100" },
                        { x: 500, label: "125" }
                      ].map((t, idx) => (
                        <g key={idx} className="cursor-pointer" onClick={() => setSelectedElement("axis")}>
                          <line x1={t.x} y1="230" x2={t.x} y2="236" stroke={selectedElement === "axis" ? "#f59e0b" : "#94a3b8"} strokeWidth="2" />
                          <text x={t.x} y="248" fill={selectedElement === "axis" ? "#f59e0b" : "#94a3b8"} fontSize="9" textAnchor="middle">
                            {t.label}
                          </text>
                        </g>
                      ))}

                      {/* Ticks on Y Axis */}
                      {[
                        { y: 230, label: "0.0" },
                        { y: 180, label: "0.3" },
                        { y: 140, label: "0.6" },
                        { y: 100, label: "0.9" },
                        { y: 60, label: "1.0" }
                      ].map((t, idx) => (
                        <g key={idx} className="cursor-pointer" onClick={() => setSelectedElement("axis")}>
                          <line x1="64" y1={t.y} x2="70" y2={t.y} stroke={selectedElement === "axis" ? "#f59e0b" : "#94a3b8"} strokeWidth="2" />
                          <text x="58" y={t.y + 3} fill={selectedElement === "axis" ? "#f59e0b" : "#94a3b8"} fontSize="9" textAnchor="end">
                            {t.label}
                          </text>
                        </g>
                      ))}

                      {/* Annotation Callout */}
                      <g className="cursor-pointer" onClick={() => setSelectedElement("annotation")}>
                        <circle cx="280" cy="120" r="5" fill="#f43f5e" />
                        <line x1="280" y1="120" x2="330" y2="90" stroke="#f43f5e" strokeWidth="1.5" />
                        <rect x="330" y="75" width="100" height="25" fill="#1e1b4b" stroke="#f43f5e" rx="4" />
                        <text x="380" y="91" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">
                          ax.annotate()
                        </text>
                      </g>

                      {/* Axis Titles */}
                      <text x="285" y="265" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                        Epochs (ax.set_xlabel)
                      </text>
                      <text x="25" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle" transform="rotate(-90 25 145)">
                        Accuracy (ax.set_ylabel)
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Hotspot buttons */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
                  {Object.keys(anatomyElements).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedElement(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${
                        selectedElement === key
                          ? anatomyElements[key].color + " ring-1"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inspector Details Panel */}
              <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <Info className="w-4 h-4 text-indigo-400" />
                    Artist Component Inspector
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {anatomyElements[selectedElement].name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {anatomyElements[selectedElement].role}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-2">
                    Key Methods &amp; Properties:
                  </span>
                  <div className="space-y-1.5">
                    {anatomyElements[selectedElement].methods.map((method, idx) => (
                      <div key={idx} className="bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-950/40 border border-indigo-500/30 p-3.5 rounded-xl text-xs text-indigo-200">
                  <strong className="font-semibold text-white">Pro Tip:</strong> When plotting 4 metrics (Loss, Accuracy, Precision, Recall), use <code className="text-sky-300">fig, axs = plt.subplots(2, 2)</code> and loop with <code className="text-sky-300">for ax in axs.flat:</code>.
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
                  Explore plot anatomy, multi-axes grid unpacking, and coordinate transformations.
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
                Technical Reference &amp; Hierarchy Notes
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
                  Test your understanding of Figure, Axes, Spines, and coordinate spaces.
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

import React, { useState } from "react";
import {
  TrendingUp,
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
import pyCode1 from "./topic3_files/01_line_plot_styling_and_formats.py?raw";
import pyCode2 from "./topic3_files/02_multiline_and_shading_fill_between.py?raw";
import pyCode3 from "./topic3_files/03_time_series_and_loss_curves.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Interactive Line Plot Customization State
  const [lineWidth, setLineWidth] = useState(2.5);
  const [lineStyle, setLineStyle] = useState("solid");
  const [markerType, setMarkerType] = useState("circle");
  const [markerSize, setMarkerSize] = useState(6);
  const [lineColor, setLineColor] = useState("#38bdf8");
  const [showConfidence, setShowConfidence] = useState(true);
  const [curveType, setCurveType] = useState("convergence");

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_line_plot_styling_and_formats.py", code: pyCode1, desc: "Format strings (fmt), colors, linewidths, and custom markers" },
    2: { name: "02_multiline_and_shading_fill_between.py", code: pyCode2, desc: "Multi-line series and shaded confidence intervals using fill_between" },
    3: { name: "03_time_series_and_loss_curves.py", code: pyCode3, desc: "Step plots, logarithmic scales, and dual-axis visualization with twinx()" }
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

  // SVG Data Points based on curveType
  const getDataPoints = () => {
    if (curveType === "convergence") {
      return [
        { x: 50, y: 190, upper: 175, lower: 205 },
        { x: 110, y: 140, upper: 125, lower: 155 },
        { x: 180, y: 100, upper: 85, lower: 115 },
        { x: 260, y: 75, upper: 62, lower: 88 },
        { x: 340, y: 60, upper: 48, lower: 72 },
        { x: 420, y: 52, upper: 42, lower: 62 },
        { x: 480, y: 48, upper: 38, lower: 58 }
      ];
    } else {
      return [
        { x: 50, y: 180, upper: 165, lower: 195 },
        { x: 110, y: 60, upper: 45, lower: 75 },
        { x: 180, y: 170, upper: 155, lower: 185 },
        { x: 260, y: 70, upper: 55, lower: 85 },
        { x: 340, y: 160, upper: 145, lower: 175 },
        { x: 420, y: 80, upper: 65, lower: 95 },
        { x: 480, y: 150, upper: 135, lower: 165 }
      ];
    }
  };

  const points = getDataPoints();
  const polylineStr = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Shaded polygon points
  const upperPath = points.map((p) => `${p.x},${p.upper}`).join(" ");
  const lowerPath = [...points].reverse().map((p) => `${p.x},${p.lower}`).join(" ");
  const polygonStr = `${upperPath} ${lowerPath}`;

  const getDashArray = () => {
    switch (lineStyle) {
      case "dashed": return "6,6";
      case "dotted": return "2,4";
      case "dashdot": return "6,3,2,3";
      default: return "none";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-indigo-900/40 border border-cyan-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 3: Line Plot with plt.plot()
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Master the workhorse of machine learning evaluation. Plot loss convergence, validation accuracy over epochs, model complexity curves, confidence intervals with <code className="text-cyan-300">fill_between</code>, and twin-axis metric overlays.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> plt.plot()
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Confidence Bands
            </span>
          </div>
        </div>

        {/* Mentor Narrative Box */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-cyan-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "In our Barrackpore ML batches, Tuhina and Mahima were analyzing cross-validation results across different regularization strengths. A simple line was not enough—they needed to visualize the variance with <code className="text-cyan-300">ax.fill_between()</code> to detect overfitting. Line plots are the bread and butter of hyperparameter tuning!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Line Plot Customizer", icon: Sliders },
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
                    ? "border-cyan-500 text-cyan-400 bg-cyan-950/30"
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
              {/* Studio Controls */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="text-cyan-400 w-5 h-5" />
                  Line &amp; Marker Customizer
                </h2>

                {/* Curve Pattern */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Metric Simulation Dataset
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCurveType("convergence")}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                        curveType === "convergence"
                          ? "border-cyan-500 bg-cyan-950/60 text-cyan-300 ring-1 ring-cyan-500"
                          : "border-slate-800 bg-slate-950 text-slate-400"
                      }`}
                    >
                      Training Loss Decay
                    </button>
                    <button
                      onClick={() => setCurveType("oscillating")}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                        curveType === "oscillating"
                          ? "border-cyan-500 bg-cyan-950/60 text-cyan-300 ring-1 ring-cyan-500"
                          : "border-slate-800 bg-slate-950 text-slate-400"
                      }`}
                    >
                      Stochastic Gradient Flow
                    </button>
                  </div>
                </div>

                {/* Line Style Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    linestyle (ls)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["solid", "dashed", "dotted", "dashdot"].map((style) => (
                      <button
                        key={style}
                        onClick={() => setLineStyle(style)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium border capitalize text-center transition ${
                          lineStyle === style
                            ? "border-cyan-500 bg-cyan-950 text-cyan-300"
                            : "border-slate-800 bg-slate-950 text-slate-400"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marker Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    marker shape
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: "circle", label: "Circle ('o')" },
                      { id: "square", label: "Square ('s')" },
                      { id: "triangle", label: "Triangle ('^')" },
                      { id: "diamond", label: "Diamond ('d')" }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMarkerType(m.id)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                          markerType === m.id
                            ? "border-cyan-500 bg-cyan-950 text-cyan-300"
                            : "border-slate-800 bg-slate-950 text-slate-400"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Swatches */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Line Color
                  </label>
                  <div className="flex gap-2">
                    {["#38bdf8", "#10b981", "#f43f5e", "#a855f7", "#f59e0b"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setLineColor(c)}
                        className={`w-8 h-8 rounded-full transition-transform ${
                          lineColor === c ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950" : "opacity-75 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>linewidth (lw)</span>
                      <span className="text-cyan-400 font-mono">{lineWidth} pt</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="0.5"
                      value={lineWidth}
                      onChange={(e) => setLineWidth(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>markersize (ms)</span>
                      <span className="text-cyan-400 font-mono">{markerSize} pt</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      step="1"
                      value={markerSize}
                      onChange={(e) => setMarkerSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>
                </div>

                {/* Confidence Band Toggle */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">ax.fill_between() Confidence Band</span>
                  <button
                    onClick={() => setShowConfidence(!showConfidence)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      showConfidence ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {showConfidence ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>

              {/* Dynamic SVG Plot Display */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-cyan-400" />
                      Live Matplotlib Visual Output
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                      ax.plot(x, y, color='{lineColor}', ls='{lineStyle}', marker='{markerType[0]}')
                    </span>
                  </div>

                  {/* Visual Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                      {/* Grid */}
                      {[50, 90, 130, 170, 210].map((y) => (
                        <line key={y} x1="45" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                      ))}
                      {[50, 110, 180, 260, 340, 420, 480].map((x) => (
                        <line key={x} x1={x} y1="30" x2={x} y2="210" stroke="#1e293b" strokeDasharray="3,3" />
                      ))}
                      <line x1="45" y1="210" x2="490" y2="210" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="45" y1="30" x2="45" y2="210" stroke="#64748b" strokeWidth="1.5" />

                      {/* Confidence Band Polygon */}
                      {showConfidence && (
                        <polygon
                          points={polygonStr}
                          fill={lineColor}
                          opacity="0.2"
                        />
                      )}

                      {/* Main Line Plot */}
                      <polyline
                        fill="none"
                        stroke={lineColor}
                        strokeWidth={lineWidth}
                        strokeDasharray={getDashArray()}
                        points={polylineStr}
                      />

                      {/* Markers */}
                      {points.map((p, idx) => {
                        const halfSize = markerSize / 2;
                        if (markerType === "square") {
                          return (
                            <rect
                              key={idx}
                              x={p.x - halfSize}
                              y={p.y - halfSize}
                              width={markerSize}
                              height={markerSize}
                              fill="#ffffff"
                              stroke={lineColor}
                              strokeWidth="2"
                            />
                          );
                        } else if (markerType === "triangle") {
                          return (
                            <polygon
                              key={idx}
                              points={`${p.x},${p.y - markerSize} ${p.x - markerSize},${p.y + halfSize} ${p.x + markerSize},${p.y + halfSize}`}
                              fill="#ffffff"
                              stroke={lineColor}
                              strokeWidth="2"
                            />
                          );
                        } else if (markerType === "diamond") {
                          return (
                            <polygon
                              key={idx}
                              points={`${p.x},${p.y - markerSize} ${p.x + markerSize},${p.y} ${p.x},${p.y + markerSize} ${p.x - markerSize},${p.y}`}
                              fill="#ffffff"
                              stroke={lineColor}
                              strokeWidth="2"
                            />
                          );
                        } else {
                          return (
                            <circle
                              key={idx}
                              cx={p.x}
                              cy={p.y}
                              r={markerSize / 2}
                              fill="#ffffff"
                              stroke={lineColor}
                              strokeWidth="2"
                            />
                          );
                        }
                      })}

                      {/* Labels */}
                      <text x="270" y="235" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Epochs / Hyperparameter Steps
                      </text>
                      <text x="20" y="120" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 120)">
                        Loss / Metric Score
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Generated Python Code */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    Generated Matplotlib Python Code:
                  </div>
                  <pre className="text-cyan-300">
{`fig, ax = plt.subplots(figsize=(8, 4))
${showConfidence ? `ax.fill_between(x, y_lower, y_upper, color='${lineColor}', alpha=0.2, label='Confidence Interval')\n` : ""}ax.plot(x, y, color='${lineColor}', linestyle='${lineStyle === "solid" ? "-" : lineStyle === "dashed" ? "--" : lineStyle === "dotted" ? ":" : "-."}', linewidth=${lineWidth}, marker='${markerType[0]}', markersize=${markerSize}, markerfacecolor='white', markeredgecolor='${lineColor}', label='Training Metric')
ax.set_title("Machine Learning Metric Progression")
ax.legend()
plt.show()`}
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
                  <Terminal className="text-cyan-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore line plot formatting, confidence bands with fill_between, and twinx dual-axis curves.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-cyan-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-cyan-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-cyan-400 w-5 h-5" />
                Line Plot Styling &amp; Customization Notes
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
                  <HelpCircle className="text-cyan-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your mastery of plt.plot, format strings, markers, and confidence intervals.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-sm font-bold">
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
                        btnStyle = "border-cyan-500 bg-cyan-950/50 text-cyan-200 ring-1 ring-cyan-500";
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
                      <strong className="text-cyan-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-cyan-600/30"
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

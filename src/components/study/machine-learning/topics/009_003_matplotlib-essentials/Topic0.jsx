import React, { useState } from "react";
import {
  Layers,
  Terminal,
  FileText,
  HelpCircle,
  Play,
  Copy,
  Check,
  Sparkles,
  Cpu,
  Monitor,
  Layout,
  RefreshCw,
  Code
} from "lucide-react";
import pyCode1 from "./topic0_files/01_matplotlib_intro_and_architecture.py?raw";
import pyCode2 from "./topic0_files/02_pyplot_workflow_and_philosophy.py?raw";
import pyCode3 from "./topic0_files/03_matplotlib_data_pipelines.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

export default function Topic0() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);
  const [activeLayer, setActiveLayer] = useState("artist");
  const [plotStyle, setPlotStyle] = useState("oo");
  const [chartType, setChartType] = useState("loss");

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_matplotlib_intro_and_architecture.py", code: pyCode1, desc: "Matplotlib 3-Layer Architecture (Backend, Artist, Scripting)" },
    2: { name: "02_pyplot_workflow_and_philosophy.py", code: pyCode2, desc: "Stateful pyplot state machine (gcf, gca, draw, close)" },
    3: { name: "03_matplotlib_data_pipelines.py", code: pyCode3, desc: "Interfacing Lists, NumPy Arrays, and Pandas DataFrames" }
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
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-sky-900/40 via-indigo-900/30 to-purple-900/40 border border-sky-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 0: Introduction to Matplotlib
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Master the foundational 2D visualization engine powering Python data science. Explore the three-layer architecture (Backend, Artist, Scripting), understand the stateful vs Object-Oriented paradigms, and build reliable visual ML pipelines.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Matplotlib 3.x
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Core Architecture
            </span>
          </div>
        </div>

        {/* Mentor Narrative Box */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-sky-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "Welcome students (Debangshu, Susmita, Swadeep, Tuhina, Sachin)! Before jumping into simple line plots, remember that Matplotlib is not just a library—it is an Artist-driven graphic rendering engine. If you master the distinction between the stateful <code className="text-sky-300">plt.plot()</code> shortcut and the production-grade Object-Oriented <code className="text-emerald-300">fig, ax = plt.subplots()</code> pattern, you will never struggle with misplaced subplots or memory leaks in your ML training loops."
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Visual Studio", icon: Layout },
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

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: INTERACTIVE STUDIO */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            {/* Architecture Hierarchy Component */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="text-sky-400 w-5 h-5" />
                Matplotlib Three-Layer Engine Explorer
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                Click each architectural layer below to inspect its responsibility, classes, and typical usage in ML systems.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setActiveLayer("scripting")}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    activeLayer === "scripting"
                      ? "bg-sky-950/60 border-sky-500 shadow-lg ring-1 ring-sky-500"
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sky-300">Layer 3: Scripting</span>
                    <span className="text-xs bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded">matplotlib.pyplot</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    High-level procedural interface that tracks state implicitly for rapid interactive exploration.
                  </p>
                </button>

                <button
                  onClick={() => setActiveLayer("artist")}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    activeLayer === "artist"
                      ? "bg-indigo-950/60 border-indigo-500 shadow-lg ring-1 ring-indigo-500"
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-indigo-300">Layer 2: Artist</span>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Figure, Axes, Line2D</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    The visual core. Every visible element (primitives and containers) is an Artist instance with properties.
                  </p>
                </button>

                <button
                  onClick={() => setActiveLayer("backend")}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    activeLayer === "backend"
                      ? "bg-purple-950/60 border-purple-500 shadow-lg ring-1 ring-purple-500"
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-purple-300">Layer 1: Backend</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Agg, TkAgg, PDF, SVG</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Hardware rendering target. Translates Artists into raster pixels, vectors, or GUI application surfaces.
                  </p>
                </button>
              </div>

              {/* Layer Deep Dive Details */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                {activeLayer === "scripting" && (
                  <div>
                    <h3 className="text-md font-bold text-sky-400 mb-2">Scripting Layer (<code className="text-sky-300">matplotlib.pyplot</code>)</h3>
                    <p className="text-sm text-slate-300 mb-3">
                      Designed to feel intuitive for users migrating from MATLAB. Exposes simple functions like <code className="text-sky-300">plt.plot()</code>, <code className="text-sky-300">plt.title()</code>, and <code className="text-sky-300">plt.show()</code>. Under the hood, it calls <code className="text-sky-300">plt.gca()</code> (get current axes) and forwards calls to the active Artist.
                    </p>
                    <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200 border border-slate-800">
                      import matplotlib.pyplot as plt<br />
                      plt.plot([1, 2, 3], [4, 5, 6])  # Implicitly creates Figure 1 &amp; Axes 1<br />
                      plt.title("Quick Plot")<br />
                      plt.show()
                    </div>
                  </div>
                )}

                {activeLayer === "artist" && (
                  <div>
                    <h3 className="text-md font-bold text-indigo-400 mb-2">Artist Layer (Object-Oriented Core)</h3>
                    <p className="text-sm text-slate-300 mb-3">
                      Comprises two sub-types: <strong>Primitives</strong> (Line2D, Text, Rectangle, Patch, Polygon) and <strong>Containers</strong> (Figure, Axes, Axis, Tick). All customizable properties (color, linewidth, alpha, transform) live here.
                    </p>
                    <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200 border border-slate-800">
                      fig, ax = plt.subplots(figsize=(8, 4))  # Explicit Container instantiation<br />
                      line, = ax.plot(x, y, color="#0284c7")  # Returns Line2D Primitive Artist<br />
                      ax.set_title("Precision ML Metric")<br />
                      ax.grid(True, linestyle="--", alpha=0.5)
                    </div>
                  </div>
                )}

                {activeLayer === "backend" && (
                  <div>
                    <h3 className="text-md font-bold text-purple-400 mb-2">Backend Layer (Rendering &amp; Export)</h3>
                    <p className="text-sm text-slate-300 mb-3">
                      Consists of three classes: <strong>FigureCanvas</strong> (area onto which figure is drawn), <strong>Renderer</strong> (the brush that draws on canvas), and <strong>Event</strong> (mouse/keyboard input handler).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                      <div className="bg-slate-900 p-3 rounded border border-slate-800">
                        <span className="font-bold text-purple-300">Interactive GUI Backends:</span>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-slate-400">
                          <li>TkAgg (Tkinter window)</li>
                          <li>Qt5Agg / PyQt6</li>
                          <li>WebAgg (Interactive web browser)</li>
                        </ul>
                      </div>
                      <div className="bg-slate-900 p-3 rounded border border-slate-800">
                        <span className="font-bold text-purple-300">Non-Interactive Hardcopy Backends:</span>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-slate-400">
                          <li>Agg (Anti-Grain Geometry - PNG raster)</li>
                          <li>PDF / PS (Vector documents)</li>
                          <li>SVG (Scalable Vector Graphics for web)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Interactive Plot Simulator */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Monitor className="text-emerald-400 w-5 h-5" />
                    Live Canvas Simulator: Stateful vs OO Paradigm
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Toggle coding styles and datasets to see how Matplotlib structures internal object state.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setPlotStyle("stateful")}
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        plotStyle === "stateful" ? "bg-sky-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Stateful (plt.plot)
                    </button>
                    <button
                      onClick={() => setPlotStyle("oo")}
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        plotStyle === "oo" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Object-Oriented (fig, ax)
                    </button>
                  </div>
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setChartType("loss")}
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        chartType === "loss" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      ML Loss Curve
                    </button>
                    <button
                      onClick={() => setChartType("students")}
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        chartType === "students" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Student Scores
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Plot Visualizer */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                  <div className="w-full text-center mb-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      {chartType === "loss" ? "Model Epochs vs Validation Loss" : "Coder & AccoTax ML Cohort Marks"}
                    </span>
                  </div>

                  {chartType === "loss" ? (
                    <svg viewBox="0 0 500 250" className="w-full max-w-lg h-56">
                      {/* Grid Lines */}
                      {[50, 100, 150, 200].map((y) => (
                        <line key={y} x1="50" y1={y} x2="470" y2={y} stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
                      ))}
                      {[50, 150, 250, 350, 450].map((x) => (
                        <line key={x} x1={x} y1="20" x2={x} y2="210" stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
                      ))}
                      {/* Axes lines */}
                      <line x1="50" y1="210" x2="470" y2="210" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="50" y1="20" x2="50" y2="210" stroke="#94a3b8" strokeWidth="2" />
                      
                      {/* Train Loss Curve (Red dashed) */}
                      <polyline
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeDasharray="4,4"
                        points="50,40 100,90 160,130 230,160 300,180 380,190 450,195"
                      />
                      {/* Val Loss Curve (Sky blue solid) */}
                      <polyline
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        points="50,55 100,105 160,140 230,165 300,175 380,178 450,182"
                      />
                      {/* Data Dots */}
                      {[[50,40], [100,90], [160,130], [230,160], [300,180], [380,190], [450,195]].map(([x, y], idx) => (
                        <circle key={`t-${idx}`} cx={x} cy={y} r="4" fill="#f43f5e" />
                      ))}
                      {[[50,55], [100,105], [160,140], [230,165], [300,175], [380,178], [450,182]].map(([x, y], idx) => (
                        <rect key={`v-${idx}`} x={x-3.5} y={y-3.5} width="7" height="7" fill="#38bdf8" />
                      ))}
                      
                      {/* Labels */}
                      <text x="260" y="235" fill="#94a3b8" fontSize="11" textAnchor="middle">Epoch (1 to 10)</text>
                      <text x="20" y="115" fill="#94a3b8" fontSize="11" textAnchor="middle" transform="rotate(-90 20 115)">Loss</text>

                      {/* Legend */}
                      <rect x="330" y="30" width="130" height="50" fill="#0f172a" rx="4" stroke="#334155" />
                      <line x1="340" y1="45" x2="365" y2="45" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                      <text x="375" y="49" fill="#f43f5e" fontSize="10">Train Loss</text>
                      <line x1="340" y1="65" x2="365" y2="65" stroke="#38bdf8" strokeWidth="2" />
                      <text x="375" y="69" fill="#38bdf8" fontSize="10">Val Loss</text>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 500 250" className="w-full max-w-lg h-56">
                      {/* Grid */}
                      {[50, 100, 150, 200].map((y) => (
                        <line key={y} x1="50" y1={y} x2="470" y2={y} stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
                      ))}
                      <line x1="50" y1="210" x2="470" y2="210" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="50" y1="20" x2="50" y2="210" stroke="#94a3b8" strokeWidth="2" />
                      
                      {/* Bars */}
                      {[
                        { name: "Debangshu", score: 88, x: 80, h: 140, color: "#38bdf8" },
                        { name: "Susmita", score: 94, x: 160, h: 160, color: "#10b981" },
                        { name: "Swadeep", score: 76, x: 240, h: 110, color: "#f59e0b" },
                        { name: "Tuhina", score: 91, x: 320, h: 150, color: "#ec4899" },
                        { name: "Sachin", score: 84, x: 400, h: 130, color: "#8b5cf6" },
                      ].map((item, idx) => (
                        <g key={idx}>
                          <rect
                            x={item.x - 20}
                            y={210 - item.h}
                            width="40"
                            height={item.h}
                            fill={item.color}
                            rx="4"
                            opacity="0.85"
                          />
                          <text x={item.x} y={200 - item.h} fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
                            {item.score}
                          </text>
                          <text x={item.x} y="225" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                            {item.name}
                          </text>
                        </g>
                      ))}
                      <text x="20" y="115" fill="#94a3b8" fontSize="11" textAnchor="middle" transform="rotate(-90 20 115)">Marks (%)</text>
                    </svg>
                  )}
                </div>

                {/* Code Representation Box */}
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-sky-400" />
                      {plotStyle === "stateful" ? "Pyplot Stateful Script" : "Object-Oriented (OO) Script"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">Python 3</span>
                  </div>

                  {plotStyle === "stateful" ? (
                    <pre className="text-sky-300 leading-relaxed overflow-x-auto">
{`import matplotlib.pyplot as plt

# 1. Stateful implicit canvas
plt.figure(figsize=(6, 3))
plt.plot(epochs, train_loss, 'r--', label='Train Loss')
plt.plot(epochs, val_loss, 'b-', label='Val Loss')

# 2. Stateful mutations
plt.title("Model Convergence")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.grid(True)
plt.show()`}
                    </pre>
                  ) : (
                    <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
{`import matplotlib.pyplot as plt

# 1. Explicit Container & Axes
fig, ax = plt.subplots(figsize=(6, 3))

# 2. Direct Artist methods
ax.plot(epochs, train_loss, 'r--', label='Train Loss')
ax.plot(epochs, val_loss, 'b-', label='Val Loss')

ax.set_title("Model Convergence")
ax.set_xlabel("Epoch")
ax.set_ylabel("Loss")
ax.legend()
ax.grid(True)
plt.show()`}
                    </pre>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-200">Key Takeaway:</strong> {plotStyle === "stateful" 
                      ? "Pyplot assumes an active global state. Can cause cross-axis mutation bugs when multiple figures are open."
                      : "OO approach uses explicit handles `fig` and `ax`, making it robust for subplots and multi-threaded ML servers."}
                  </div>
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
                  Explore production-ready runnable scripts covering architecture, state machine management, and data pipelines.
                </p>
              </div>

              {/* Script Switcher */}
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

            {/* Script Details */}
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

            {/* Code Display */}
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
                Comprehensive Technical Notes
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

        {/* TAB 4: MCQ QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="text-sky-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of Matplotlib architecture, state management, and OO interfaces.
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

import React, { useState } from "react";
import {
  Download,
  Settings,
  Terminal,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Palette,
  Layout,
  Code
} from "lucide-react";
import pyCode1 from "./topic1_files/01_install_import_and_backends.py?raw";
import pyCode2 from "./topic1_files/02_configuration_and_rcparams.py?raw";
import pyCode3 from "./topic1_files/03_built_in_styles_and_themes.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

export default function Topic1() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Theme & rcParams Interactive Controls
  const [selectedTheme, setSelectedTheme] = useState("dark_background");
  const [dpi, setDpi] = useState(100);
  const [lineWidth, setLineWidth] = useState(2.5);
  const [gridEnabled, setGridEnabled] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_install_import_and_backends.py", code: pyCode1, desc: "Installation, standard import aliases, and non-interactive backend selection" },
    2: { name: "02_configuration_and_rcparams.py", code: pyCode2, desc: "Global matplotlib.rcParams configuration and runtime resetting" },
    3: { name: "03_built_in_styles_and_themes.py", code: pyCode3, desc: "Built-in styles, theme exploration, and scoped context managers" }
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

  const getThemeStyles = () => {
    switch (selectedTheme) {
      case "dark_background":
        return {
          bg: "#090d16",
          cardBg: "#0f172a",
          gridColor: "#334155",
          axisColor: "#94a3b8",
          textColor: "#f8fafc",
          lineColor: "#38bdf8",
          line2Color: "#f43f5e"
        };
      case "seaborn_grid":
        return {
          bg: "#e2e8f0",
          cardBg: "#f1f5f9",
          gridColor: "#ffffff",
          axisColor: "#475569",
          textColor: "#0f172a",
          lineColor: "#2563eb",
          line2Color: "#059669"
        };
      case "ggplot":
        return {
          bg: "#d6d3d1",
          cardBg: "#e7e5e4",
          gridColor: "#ffffff",
          axisColor: "#57534e",
          textColor: "#1c1917",
          lineColor: "#dc2626",
          line2Color: "#2563eb"
        };
      case "classic":
      default:
        return {
          bg: "#ffffff",
          cardBg: "#ffffff",
          gridColor: "#e2e8f0",
          axisColor: "#000000",
          textColor: "#000000",
          lineColor: "#0000ff",
          line2Color: "#ff0000"
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-teal-900/40 border border-blue-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 1: Installing &amp; Importing Matplotlib
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Master the Python plotting ecosystem setup, standard <code className="text-blue-300 font-mono">import matplotlib.pyplot as plt</code> conventions, headless server backend configuration (<code className="text-blue-300 font-mono">Agg</code>), and global visual tuning with <code className="text-blue-300 font-mono">plt.rcParams</code> and themes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> pip / conda
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5" /> rcParams &amp; Styles
            </span>
          </div>
        </div>

        {/* Mentor Narrative Box */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "When Sachin and Swadeep first tried running Matplotlib on our Linux cloud server, their scripts crashed with <code className="text-rose-300">UserWarning: Matplotlib is currently using agg, which is a non-GUI backend</code> or <code className="text-rose-300">no display name and no $DISPLAY environment variable</code>. Understanding headless backends and centralizing chart aesthetics in <code className="text-sky-300">plt.rcParams</code> turns beginner scripts into robust ML pipelines!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive rcParams & Themes", icon: Layout },
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

      {/* Main Tab Panels */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: STUDIO */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            {/* Interactive Theme & rcParams Configurator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Panel */}
              <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="text-blue-400 w-5 h-5" />
                  Live rcParams Studio
                </h2>

                {/* Theme Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-blue-400" />
                    Style Sheet (plt.style.use)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "dark_background", label: "dark_background" },
                      { id: "seaborn_grid", label: "seaborn-whitegrid" },
                      { id: "ggplot", label: "ggplot (R-style)" },
                      { id: "classic", label: "classic (default)" }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition ${
                          selectedTheme === theme.id
                            ? "border-blue-500 bg-blue-950/60 text-blue-300 ring-1 ring-blue-500"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Width Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>lines.linewidth</span>
                    <span className="text-blue-400 font-mono">{lineWidth} pt</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* DPI Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>figure.dpi (Resolution)</span>
                    <span className="text-blue-400 font-mono">{dpi} DPI</span>
                  </div>
                  <input
                    type="range"
                    min="72"
                    max="200"
                    step="10"
                    value={dpi}
                    onChange={(e) => setDpi(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Grid Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">axes.grid</span>
                  <button
                    onClick={() => setGridEnabled(!gridEnabled)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      gridEnabled ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {gridEnabled ? "Enabled (True)" : "Disabled (False)"}
                  </button>
                </div>
              </div>

              {/* Dynamic Preview Canvas */}
              <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Rendered Canvas (Theme: {selectedTheme} | DPI: {dpi})
                    </span>
                    <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-mono">
                      plt.rcParams['figure.dpi'] = {dpi}
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div
                    className="w-full rounded-xl p-6 transition-colors duration-300 flex items-center justify-center border border-slate-800/80"
                    style={{ backgroundColor: themeStyle.bg }}
                  >
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg h-56">
                      {/* Grid */}
                      {gridEnabled && (
                        <>
                          {[40, 80, 120, 160, 200].map((y) => (
                            <line
                              key={y}
                              x1="45"
                              y1={y}
                              x2="475"
                              y2={y}
                              stroke={themeStyle.gridColor}
                              strokeDasharray="4,4"
                              strokeWidth="1"
                            />
                          ))}
                          {[45, 130, 215, 300, 385, 470].map((x) => (
                            <line
                              key={x}
                              x1={x}
                              y1="20"
                              x2={x}
                              y2="200"
                              stroke={themeStyle.gridColor}
                              strokeDasharray="4,4"
                              strokeWidth="1"
                            />
                          ))}
                        </>
                      )}

                      {/* Axes */}
                      <line x1="45" y1="200" x2="475" y2="200" stroke={themeStyle.axisColor} strokeWidth="1.5" />
                      <line x1="45" y1="20" x2="45" y2="200" stroke={themeStyle.axisColor} strokeWidth="1.5" />

                      {/* Sine & Cosine Waves */}
                      <path
                        d="M 45 110 Q 150 20 255 110 T 465 110"
                        fill="none"
                        stroke={themeStyle.lineColor}
                        strokeWidth={lineWidth}
                      />
                      <path
                        d="M 45 30 Q 150 190 255 30 T 465 30"
                        fill="none"
                        stroke={themeStyle.line2Color}
                        strokeWidth={lineWidth}
                        strokeDasharray="4,4"
                      />

                      {/* Legend */}
                      <rect x="330" y="25" width="135" height="50" fill={themeStyle.cardBg} rx="4" stroke={themeStyle.gridColor} />
                      <line x1="340" y1="40" x2="365" y2="40" stroke={themeStyle.lineColor} strokeWidth={lineWidth} />
                      <text x="375" y="44" fill={themeStyle.textColor} fontSize="10" fontWeight="bold">
                        Activation (Sigmoid)
                      </text>
                      <line x1="340" y1="60" x2="365" y2="60" stroke={themeStyle.line2Color} strokeWidth={lineWidth} strokeDasharray="3,3" />
                      <text x="375" y="64" fill={themeStyle.textColor} fontSize="10" fontWeight="bold">
                        Derivative
                      </text>

                      {/* Axis Labels */}
                      <text x="260" y="225" fill={themeStyle.textColor} fontSize="11" textAnchor="middle">
                        Input Feature (z)
                      </text>
                      <text x="20" y="110" fill={themeStyle.textColor} fontSize="11" textAnchor="middle" transform="rotate(-90 20 110)">
                        Probability
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Generated Python Equivalent */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-blue-400" />
                    Equivalent Matplotlib Python Code:
                  </div>
                  <pre className="text-blue-300">
{`import matplotlib.pyplot as plt

plt.style.use('${selectedTheme}')
plt.rcParams.update({
    'figure.dpi': ${dpi},
    'lines.linewidth': ${lineWidth},
    'axes.grid': ${gridEnabled ? "True" : "False"}
})`}
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
                  Explore installation, backend handling, rcParams management, and styles.
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
                Technical Installation &amp; Configuration Reference
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
                  Test your understanding of package setup, backends, and rcParams customizations.
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

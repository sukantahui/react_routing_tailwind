import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Palette,
  Eye,
  Layers,
  Scaling,
  Maximize2
} from "lucide-react";

import pyCode1 from "./topic10_files/01_set_theme_styles.py?raw";
import pyCode2 from "./topic10_files/02_plotting_contexts.py?raw";
import pyCode3 from "./topic10_files/03_custom_color_palettes.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

const paletteColors = {
  deep: ["#4c72b0", "#dd8452", "#55a868", "#c44e52"],
  muted: ["#4878d0", "#ee854a", "#6acc64", "#d65f5f"],
  bright: ["#023eff", "#ff7c00", "#1ac938", "#e8000b"],
  colorblind: ["#0173b2", "#de8f05", "#029e73", "#d55e00"],
  pastel: ["#a1c9f4", "#ffb482", "#8de5a1", "#ff9f9b"]
};

export default function Topic10() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive Theme controls
  const [themeStyle, setThemeStyle] = useState("darkgrid");
  const [themeContext, setThemeContext] = useState("notebook");
  const [themePalette, setThemePalette] = useState("deep");
  const [despine, setDespine] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_set_theme_styles.py", code: pyCode1 },
    { name: "02_plotting_contexts.py", code: pyCode2 },
    { name: "03_custom_color_palettes.py", code: pyCode3 }
  ];

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  // Compute theme colors for canvas
  const getThemeAesthetics = () => {
    let bg = "#0f172a";
    let grid = "#334155";
    let text = "#e2e8f0";
    let hasTicks = false;

    if (themeStyle === "darkgrid") {
      bg = "#1e293b";
      grid = "#334155";
      text = "#f8fafc";
    } else if (themeStyle === "whitegrid") {
      bg = "#ffffff";
      grid = "#e2e8f0";
      text = "#0f172a";
    } else if (themeStyle === "dark") {
      bg = "#0f172a";
      grid = "transparent";
      text = "#f8fafc";
    } else if (themeStyle === "white") {
      bg = "#ffffff";
      grid = "transparent";
      text = "#0f172a";
    } else if (themeStyle === "ticks") {
      bg = "#ffffff";
      grid = "transparent";
      text = "#0f172a";
      hasTicks = true;
    }

    // Context scaling
    let fontScale = 11;
    let pointRadius = 7;
    let lineWidth = 2;
    if (themeContext === "paper") {
      fontScale = 9;
      pointRadius = 5;
      lineWidth = 1.5;
    } else if (themeContext === "notebook") {
      fontScale = 11;
      pointRadius = 7;
      lineWidth = 2;
    } else if (themeContext === "talk") {
      fontScale = 13;
      pointRadius = 9;
      lineWidth = 3;
    } else if (themeContext === "poster") {
      fontScale = 15;
      pointRadius = 11;
      lineWidth = 3.5;
    }

    return { bg, grid, text, hasTicks, fontScale, pointRadius, lineWidth };
  };

  const currentAes = getThemeAesthetics();
  const activeColors = paletteColors[themePalette];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Palette className="w-4 h-4" />
                <span>Machine Learning Module • Topic 10</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Seaborn Themes and Styles
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master publication-grade aesthetic styling with sns.set_theme(). Configure styles, plotting contexts, color palettes, and spine despining.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Theme Customizer Studio", icon: Sparkles },
              { id: "code", label: "Python Code Lab", icon: Code2 },
              { id: "notes", label: "Revision Notes", icon: BookOpen },
              { id: "quiz", label: "Knowledge Check", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Studio */}
        {activeTab === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Theme Configuration Controls</span>
              </div>

              {/* Style Presets */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Style Preset (style=...):</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {["darkgrid", "whitegrid", "dark", "white", "ticks"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setThemeStyle(st)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        themeStyle === st
                          ? "bg-purple-600 text-white border border-purple-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Context Presets */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Plotting Context (context=...):</label>
                <div className="grid grid-cols-2 gap-2">
                  {["paper", "notebook", "talk", "poster"].map((ctx) => (
                    <button
                      key={ctx}
                      onClick={() => setThemeContext(ctx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                        themeContext === ctx
                          ? "bg-purple-600 text-white border border-purple-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {ctx}
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette choice */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Color Palette (palette=...):</label>
                <div className="grid grid-cols-2 gap-2">
                  {["deep", "muted", "bright", "colorblind", "pastel"].map((pal) => (
                    <button
                      key={pal}
                      onClick={() => setThemePalette(pal)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                        themePalette === pal
                          ? "bg-purple-600 text-white border border-purple-400 shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {pal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Despine toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 font-medium">sns.despine() (Remove Top/Right Spines):</div>
                <button
                  onClick={() => setDespine(!despine)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    despine ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {despine ? "ON" : "OFF"}
                </button>
              </div>

              {/* Python Snippet */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-purple-400 font-semibold mb-1"># Generated Code:</div>
                <div className="text-indigo-300">sns.set_theme(</div>
                <div className="pl-3 text-emerald-300">style="{themeStyle}",</div>
                <div className="pl-3 text-cyan-300">context="{themeContext}",</div>
                <div className="pl-3 text-amber-300">palette="{themePalette}"</div>
                <div className="text-indigo-300">)</div>
                {despine && <div className="text-purple-300">sns.despine()</div>}
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-purple-400" />
                  Live Themed Figure Canvas
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {themeStyle} • {themeContext}
                </span>
              </div>

              {/* SVG Canvas */}
              <div
                className="my-4 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto transition-colors duration-200"
                style={{ backgroundColor: currentAes.bg }}
              >
                <svg width="490" height="280" viewBox="0 0 490 280" className="max-w-full">
                  {/* Grid Lines */}
                  {currentAes.grid !== "transparent" && (
                    <>
                      {[50, 100, 150, 200, 250].map((y) => (
                        <line key={`hg-${y}`} x1="50" y1={y} x2="450" y2={y} stroke={currentAes.grid} strokeWidth="1" />
                      ))}
                      {[60, 150, 240, 330, 420].map((x) => (
                        <line key={`vg-${x}`} x1={x} y1="30" x2={x} y2="250" stroke={currentAes.grid} strokeWidth="1" />
                      ))}
                    </>
                  )}

                  {/* Axes lines */}
                  <line x1="50" y1="250" x2="450" y2="250" stroke={currentAes.text} strokeWidth={currentAes.lineWidth} />
                  <line x1="50" y1="30" x2="50" y2="250" stroke={currentAes.text} strokeWidth={currentAes.lineWidth} />

                  {/* Top & Right spines (if not despined) */}
                  {!despine && (
                    <>
                      <line x1="50" y1="30" x2="450" y2="30" stroke={currentAes.text} strokeWidth={currentAes.lineWidth} />
                      <line x1="450" y1="30" x2="450" y2="250" stroke={currentAes.text} strokeWidth={currentAes.lineWidth} />
                    </>
                  )}

                  {/* Ticks if style=='ticks' */}
                  {currentAes.hasTicks && (
                    <>
                      {[60, 150, 240, 330, 420].map((x) => (
                        <line key={`tx-${x}`} x1={x} y1="250" x2={x} y2="256" stroke={currentAes.text} strokeWidth="1.5" />
                      ))}
                      {[50, 100, 150, 200, 250].map((y) => (
                        <line key={`ty-${y}`} x1="44" y1={y} x2="50" y2={y} stroke={currentAes.text} strokeWidth="1.5" />
                      ))}
                    </>
                  )}

                  {/* Multi-category Scatter dots using active palette */}
                  {[
                    { x: 90, y: 190, cat: 0 },
                    { x: 140, y: 150, cat: 0 },
                    { x: 200, y: 120, cat: 1 },
                    { x: 250, y: 100, cat: 1 },
                    { x: 310, y: 80, cat: 2 },
                    { x: 360, y: 65, cat: 2 },
                    { x: 410, y: 45, cat: 3 }
                  ].map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={currentAes.pointRadius}
                      fill={activeColors[p.cat]}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      opacity="0.9"
                    />
                  ))}

                  {/* Trend line */}
                  <path
                    d="M 90 190 Q 250 110, 410 45"
                    fill="none"
                    stroke={activeColors[0]}
                    strokeWidth={currentAes.lineWidth}
                  />

                  {/* Labels with dynamic context font size */}
                  <text
                    x="250"
                    y="272"
                    fill={currentAes.text}
                    fontSize={currentAes.fontScale}
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    Context: {themeContext} (Scale: {currentAes.fontScale}px)
                  </text>
                  <text
                    x="-140"
                    y="20"
                    fill={currentAes.text}
                    fontSize={currentAes.fontScale}
                    fontWeight="600"
                    textAnchor="middle"
                    transform="rotate(-90)"
                  >
                    Feature Metric (Y)
                  </text>
                </svg>
              </div>

              {/* Palette Color Swatches */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold">Active Palette:</span>
                  <div className="flex gap-1.5">
                    {activeColors.map((col, idx) => (
                      <span
                        key={idx}
                        className="w-5 h-5 rounded-md border border-slate-700 shadow"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-purple-300 font-mono">
                  {despine ? "despine: Clean uncluttered top/right" : "despine=False: Enclosed box frame"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((sc, idx) => (
                  <button
                    key={sc.name}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-purple-600 text-white shadow"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-4 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 10 Summary &amp; Theoretical Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[520px] overflow-y-auto">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Check */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 10 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="font-medium text-sm text-slate-200">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-300";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-950/70 border-rose-500 text-rose-300";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-purple-600/30 border-purple-500 text-purple-200";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? "bg-emerald-950/40 text-emerald-300 border border-emerald-900/50"
                            : "bg-rose-950/40 text-rose-300 border border-rose-900/50"
                        }`}
                      >
                        <span className="font-semibold">{isCorrect ? "✓ Correct: " : "✗ Incorrect: "}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmittedQuiz(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Reset
              </button>
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all"
              >
                Submit Answers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

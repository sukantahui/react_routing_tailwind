import React, { useState } from "react";
import {
  Scale,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Activity,
  Maximize2,
  Minimize2,
  RefreshCw,
  BarChart3
} from "lucide-react";

import pyCode1 from "./topic5_files/01_standard_scaler_deepdive.py?raw";
import pyCode2 from "./topic5_files/02_minmax_scaler_deepdive.py?raw";
import pyCode3 from "./topic5_files/03_inverse_transform_and_comparison.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

const initialPoints = [
  { id: 1, name: "Debangshu", x: 10, y: 45 },
  { id: 2, name: "Susmita", x: 25, y: 75 },
  { id: 3, name: "Swadeep", x: 15, y: 55 },
  { id: 4, name: "Tuhina", x: 30, y: 85 },
  { id: 5, name: "Sachin", x: 20, y: 65 }
];

export default function Topic5() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Scaler interactive state
  const [activeScaler, setActiveScaler] = useState("standard"); // 'standard' | 'minmax'
  const [minBound, setMinBound] = useState(0);
  const [maxBound, setMaxBound] = useState(1);
  const [testSampleHours, setTestSampleHours] = useState(22);
  const [testSampleScore, setTestSampleScore] = useState(70);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_standard_scaler_deepdive.py", code: pyCode1 },
    { name: "02_minmax_scaler_deepdive.py", code: pyCode2 },
    { name: "03_inverse_transform_and_comparison.py", code: pyCode3 }
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

  // Math calculations
  const xVals = initialPoints.map((p) => p.x);
  const yVals = initialPoints.map((p) => p.y);

  // Mean & Std
  const xMean = xVals.reduce((a, b) => a + b, 0) / xVals.length;
  const yMean = yVals.reduce((a, b) => a + b, 0) / yVals.length;
  const xStd = Math.sqrt(xVals.map((v) => Math.pow(v - xMean, 2)).reduce((a, b) => a + b, 0) / xVals.length);
  const yStd = Math.sqrt(yVals.map((v) => Math.pow(v - yMean, 2)).reduce((a, b) => a + b, 0) / yVals.length);

  // Min & Max
  const xMin = Math.min(...xVals);
  const xMax = Math.max(...xVals);
  const yMin = Math.min(...yVals);
  const yMax = Math.max(...yVals);

  // Scale function
  const scalePoint = (x, y) => {
    if (activeScaler === "standard") {
      const zx = (x - xMean) / (xStd || 1);
      const zy = (y - yMean) / (yStd || 1);
      return { sx: zx, sy: zy };
    } else {
      const sx = ((x - xMin) / (xMax - xMin || 1)) * (maxBound - minBound) + minBound;
      const sy = ((y - yMin) / (yMax - yMin || 1)) * (maxBound - minBound) + minBound;
      return { sx, sy };
    }
  };

  const scaledPoints = initialPoints.map((p) => {
    const { sx, sy } = scalePoint(p.x, p.y);
    return { ...p, sx, sy };
  });

  const scaledTest = scalePoint(testSampleHours, testSampleScore);

  // Inverting scaled test point
  let invX = 0;
  let invY = 0;
  if (activeScaler === "standard") {
    invX = scaledTest.sx * xStd + xMean;
    invY = scaledTest.sy * yStd + yMean;
  } else {
    invX = ((scaledTest.sx - minBound) / (maxBound - minBound || 1)) * (xMax - xMin) + xMin;
    invY = ((scaledTest.sy - minBound) / (maxBound - minBound || 1)) * (yMax - yMin) + yMin;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Topic 5 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">StandardScaler &amp; MinMaxScaler</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              StandardScaler vs. MinMaxScaler Deep Dive
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the mathematical mechanics of Z-score standardization and Min-Max bound scaling.
          Examine learned parameters (<code className="text-emerald-300 font-mono">mean_</code>, <code className="text-emerald-300 font-mono">scale_</code>, <code className="text-emerald-300 font-mono">data_min_</code>),
          test data projection, and exact inverse transformations.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Scaler Transformation Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Code2 className="w-4 h-4" />
            Python Code Lab ({scripts.length})
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "notes"
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Revision Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "quiz"
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE SCALER STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Scaler Choice Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveScaler("standard")}
                className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between ${
                  activeScaler === "standard"
                    ? "bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-950/50"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200 font-mono text-sm">StandardScaler</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                      μ=0, σ=1
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Z-score standardization: <code className="text-emerald-300">z = (x - mean) / std</code>. Ideal for Gradient Descent &amp; Gaussian assumptions.
                  </div>
                </div>
                <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
              </button>

              <button
                onClick={() => setActiveScaler("minmax")}
                className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between ${
                  activeScaler === "minmax"
                    ? "bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-950/50"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200 font-mono text-sm">MinMaxScaler</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                      [{minBound}, {maxBound}]
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Linear range bound: <code className="text-emerald-300">(x - min) / (max - min)</code>. Ideal for image pixel scales &amp; KNN distances.
                  </div>
                </div>
                <BarChart3 className="w-5 h-5 text-emerald-400 shrink-0" />
              </button>
            </div>

            {/* Interactive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Parameter Inspector & Test Sample Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    Learned Parameters (Fitted on 5 Students)
                  </h3>

                  {activeScaler === "standard" ? (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="text-slate-400 mb-1 flex justify-between">
                          <span className="text-emerald-300 font-bold">scaler.mean_</span>
                          <span className="text-[11px] text-slate-500">Feature Means</span>
                        </div>
                        <div className="text-slate-200">
                          Hours: <strong className="text-emerald-400">{xMean.toFixed(2)}</strong> | Score:{" "}
                          <strong className="text-emerald-400">{yMean.toFixed(2)}</strong>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="text-slate-400 mb-1 flex justify-between">
                          <span className="text-emerald-300 font-bold">scaler.scale_</span>
                          <span className="text-[11px] text-slate-500">Standard Deviations (σ)</span>
                        </div>
                        <div className="text-slate-200">
                          Hours: <strong className="text-emerald-400">{xStd.toFixed(2)}</strong> | Score:{" "}
                          <strong className="text-emerald-400">{yStd.toFixed(2)}</strong>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="text-slate-400 mb-1 flex justify-between">
                          <span className="text-emerald-300 font-bold">scaler.var_</span>
                          <span className="text-[11px] text-slate-500">Feature Variances (σ²)</span>
                        </div>
                        <div className="text-slate-200">
                          Hours: <strong className="text-emerald-400">{(xStd * xStd).toFixed(2)}</strong> | Score:{" "}
                          <strong className="text-emerald-400">{(yStd * yStd).toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="text-slate-400 mb-1 flex justify-between">
                          <span className="text-emerald-300 font-bold">scaler.data_min_</span>
                          <span className="text-[11px] text-slate-500">Column Minimums</span>
                        </div>
                        <div className="text-slate-200">
                          Hours: <strong className="text-emerald-400">{xMin}</strong> | Score:{" "}
                          <strong className="text-emerald-400">{yMin}</strong>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="text-slate-400 mb-1 flex justify-between">
                          <span className="text-emerald-300 font-bold">scaler.data_max_</span>
                          <span className="text-[11px] text-slate-500">Column Maximums</span>
                        </div>
                        <div className="text-slate-200">
                          Hours: <strong className="text-emerald-400">{xMax}</strong> | Score:{" "}
                          <strong className="text-emerald-400">{yMax}</strong>
                        </div>
                      </div>

                      {/* Custom Range Sliders */}
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                        <div className="text-slate-300 font-semibold text-xs font-sans">
                          Custom feature_range: [{minBound}, {maxBound}]
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setMinBound(0);
                              setMaxBound(1);
                            }}
                            className={`px-2.5 py-1 rounded text-xs ${
                              minBound === 0 && maxBound === 1
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            [0, 1] Default
                          </button>
                          <button
                            onClick={() => {
                              setMinBound(-1);
                              setMaxBound(1);
                            }}
                            className={`px-2.5 py-1 rounded text-xs ${
                              minBound === -1 && maxBound === 1
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            [-1, 1] Tanh Range
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Test Sample Projection & Inverse Transform */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-3">
                    <RefreshCw className="w-4 h-4 text-emerald-400" />
                    Unseen Test Sample &amp; Inverse Transform
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>New Sample Study Hours:</span>
                        <span className="font-mono text-emerald-300">{testSampleHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="40"
                        value={testSampleHours}
                        onChange={(e) => setTestSampleHours(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>New Sample Score:</span>
                        <span className="font-mono text-emerald-300">{testSampleScore} pts</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="100"
                        value={testSampleScore}
                        onChange={(e) => setTestSampleScore(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5">
                    <div className="text-slate-400">1. transform(X_test):</div>
                    <div className="text-emerald-300 font-bold">
                      scaled = [{scaledTest.sx.toFixed(3)}, {scaledTest.sy.toFixed(3)}]
                    </div>
                    <div className="text-slate-400 pt-1 border-t border-slate-900">
                      2. inverse_transform(scaled):
                    </div>
                    <div className="text-slate-200">
                      recovered = [{invX.toFixed(1)}, {invY.toFixed(1)}] (Matches Original Input!)
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Comparison Table & Distribution */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-400" />
                      Training Set Transformation Table
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Active: {activeScaler === "standard" ? "StandardScaler" : "MinMaxScaler"}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Student</th>
                          <th className="p-2.5">Raw (Hrs, Score)</th>
                          <th className="p-2.5 text-emerald-400">Scaled Hours</th>
                          <th className="p-2.5 text-emerald-400">Scaled Score</th>
                          <th className="p-2.5 text-slate-400">Calculated Z / Ratio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {scaledPoints.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-2.5 font-sans font-medium text-slate-200">{row.name}</td>
                            <td className="p-2.5 text-slate-400">({row.x}, {row.y})</td>
                            <td className="p-2.5 text-emerald-300 font-bold bg-emerald-500/5">
                              {row.sx.toFixed(3)}
                            </td>
                            <td className="p-2.5 text-emerald-300 font-bold bg-emerald-500/5">
                              {row.sy.toFixed(3)}
                            </td>
                            <td className="p-2.5 text-[11px] text-slate-400 truncate">
                              {activeScaler === "standard"
                                ? `(${row.x} - ${xMean.toFixed(1)}) / ${xStd.toFixed(1)}`
                                : `(${row.x} - ${xMin}) / ${xMax - xMin}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Visual Feature Scatter SVG */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      2D Feature Space Representation
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      ● Training Points (Cyan) | ◆ Test Sample (Gold)
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex items-center justify-center">
                    <svg viewBox="-3 -3 6 6" className="w-full max-w-[340px] h-[220px]">
                      {/* Grid Lines */}
                      <line x1="-3" y1="0" x2="3" y2="0" stroke="#334155" strokeWidth="0.04" />
                      <line x1="0" y1="-3" x2="0" y2="3" stroke="#334155" strokeWidth="0.04" />

                      {/* Scaled Points */}
                      {scaledPoints.map((p) => {
                        // Normalize SVG coordinates: center is (0,0), scale standard ~ [-2, 2]
                        const px = activeScaler === "standard" ? p.sx : (p.sx - (maxBound + minBound) / 2) * 2;
                        const py = -(activeScaler === "standard" ? p.sy : (p.sy - (maxBound + minBound) / 2) * 2);
                        return (
                          <g key={p.id}>
                            <circle cx={px} cy={py} r="0.16" fill="#06b6d4" />
                            <text
                              x={px + 0.2}
                              y={py}
                              fill="#94a3b8"
                              fontSize="0.25"
                              fontFamily="monospace"
                            >
                              {p.name}
                            </text>
                          </g>
                        );
                      })}

                      {/* Test Point */}
                      {(() => {
                        const tx = activeScaler === "standard" ? scaledTest.sx : (scaledTest.sx - (maxBound + minBound) / 2) * 2;
                        const ty = -(activeScaler === "standard" ? scaledTest.sy : (scaledTest.sy - (maxBound + minBound) / 2) * 2);
                        return (
                          <g>
                            <polygon
                              points={`${tx},${ty - 0.22} ${tx + 0.22},${ty} ${tx},${ty + 0.22} ${tx - 0.22},${ty}`}
                              fill="#f59e0b"
                            />
                            <text
                              x={tx + 0.25}
                              y={ty + 0.08}
                              fill="#fde68a"
                              fontSize="0.28"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              Test ({testSampleHours}h, {testSampleScore}pts)
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 text-center">
                    Origin (0, 0) represents the feature centroid. Notice how distance metrics (Euclidean) become unbiased across dimensions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CODE LAB */}
        {activeTab === "code" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
              {scripts.map((script, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScript(idx)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    selectedScript === idx
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {script.name}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  {scripts[selectedScript].name}
                </span>
                <button
                  onClick={() => copyCode(scripts[selectedScript].code)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs md:text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[500px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION NOTES */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Classroom Revision Notes: StandardScaler vs MinMaxScaler
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Notes</span>
              </button>
            </div>
            <pre className="text-xs md:text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {noteText}
            </pre>
          </div>
        )}

        {/* TAB 4: KNOWLEDGE CHECK */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-400" />
                    Topic 5 Quiz: Scaler Concepts &amp; Transformations
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your mastery of Z-scores, Min-Max normalization, and inverse transforms.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-emerald-300 font-semibold">Your Score</div>
                    <div className="text-xl font-bold text-white">
                      {calculateScore()} / {questions.length}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const isSelected = selectedAnswers[q.id] !== undefined;
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <div className="text-sm font-semibold text-slate-200 mb-3 flex items-start gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono mt-0.5">
                          Q{idx + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2 mb-3">
                        {q.options.map((opt, optIdx) => {
                          const checked = selectedAnswers[q.id] === optIdx;
                          let optStyle = "bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900";
                          if (submittedQuiz) {
                            if (optIdx === q.correctAnswer) {
                              optStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
                            } else if (checked && !isCorrect) {
                              optStyle = "bg-rose-500/20 border-rose-500/50 text-rose-200";
                            }
                          } else if (checked) {
                            optStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition-all flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {submittedQuiz && optIdx === q.correctAnswer && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {submittedQuiz && (
                        <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-400">
                          <strong className="text-emerald-300 block mb-1">Explanation:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                {submittedQuiz ? (
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setSubmittedQuiz(false);
                    }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmittedQuiz(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-emerald-600/20"
                  >
                    Submit Answers
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

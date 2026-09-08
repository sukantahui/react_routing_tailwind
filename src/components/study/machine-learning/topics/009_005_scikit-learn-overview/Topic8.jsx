import React, { useState } from "react";
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  RotateCcw,
  Layers,
  ArrowRight,
  Activity,
  CheckCircle2,
  Percent,
  Compass
} from "lucide-react";

import pyCode1 from "./topic8_files/01_linear_regression_workflow.py?raw";
import pyCode2 from "./topic8_files/02_logistic_regression_workflow.py?raw";
import pyCode3 from "./topic8_files/03_regularized_linear_models.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

const regressionData = [
  { x: 2, y: 28 },
  { x: 4, y: 42 },
  { x: 6, y: 56 },
  { x: 8, y: 71 },
  { x: 10, y: 84 },
  { x: 12, y: 96 }
];

const logisticData = [
  { hours: 2, passed: 0 },
  { hours: 4, passed: 0 },
  { hours: 5, passed: 0 },
  { hours: 7, passed: 1 },
  { hours: 9, passed: 1 },
  { hours: 11, passed: 1 }
];

export default function Topic8() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Model Mode State: 'linear' | 'logistic'
  const [modelMode, setModelMode] = useState("linear");

  // Linear Regression Interactive State
  const [slope, setSlope] = useState(6.8);
  const [intercept, setIntercept] = useState(15.0);
  const [testInputLinear, setTestInputLinear] = useState(7.5);

  // Logistic Regression Interactive State
  const [logWeight, setLogWeight] = useState(1.2);
  const [logBias, setLogBias] = useState(-7.2);
  const [threshold, setThreshold] = useState(0.5);
  const [testInputLogistic, setTestInputLogistic] = useState(6.0);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_linear_regression_workflow.py", code: pyCode1 },
    { name: "02_logistic_regression_workflow.py", code: pyCode2 },
    { name: "03_regularized_linear_models.py", code: pyCode3 }
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

  // Linear calculations
  const linearPreds = regressionData.map((d) => ({
    ...d,
    pred: slope * d.x + intercept
  }));
  const linearMSE =
    linearPreds.reduce((sum, d) => sum + Math.pow(d.y - d.pred, 2), 0) / linearPreds.length;
  const testPredScore = slope * testInputLinear + intercept;

  // Logistic calculations: Sigmoid = 1 / (1 + exp(-(w*x + b)))
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));
  const testZ = logWeight * testInputLogistic + logBias;
  const testProb = sigmoid(testZ);
  const testPredClass = testProb >= threshold ? 1 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/30">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Topic 8 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.linear_model</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Linear Models: LinearRegression &amp; LogisticRegression
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the foundational linear family in Scikit-learn. Contrast continuous Least Squares curve fitting
          with Sigmoid probability classification, decision thresholds, and regularized variants (Ridge &amp; Lasso).
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Linear Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
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
                ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
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
                ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE LINEAR STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Top Mode Switcher */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setModelMode("linear")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  modelMode === "linear"
                    ? "bg-cyan-500/15 border-cyan-500/60 shadow-lg shadow-cyan-950/50"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200 font-mono text-sm">LinearRegression</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                    Regressor (Continuous y)
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Fits hyperplane minimizing Ordinary Least Squares (MSE). Outputs unbounded numbers.
                </div>
              </button>

              <button
                onClick={() => setModelMode("logistic")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  modelMode === "logistic"
                    ? "bg-cyan-500/15 border-cyan-500/60 shadow-lg shadow-cyan-950/50"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200 font-mono text-sm">LogisticRegression</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                    Classifier (Discrete Class)
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Applies Sigmoid curve <code className="text-cyan-300">1/(1+e^-z)</code> to output calibrated probabilities.
                </div>
              </button>
            </div>

            {/* Interactive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Sliders & Equations */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    {modelMode === "linear" ? "Linear Hyperplane Tuning" : "Logistic Sigmoid Parameters"}
                  </h3>

                  {modelMode === "linear" ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Slope (model.coef_[0]):</span>
                          <span className="font-mono text-cyan-300 font-bold">{slope.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="3.0"
                          max="12.0"
                          step="0.1"
                          value={slope}
                          onChange={(e) => setSlope(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Intercept (model.intercept_):</span>
                          <span className="font-mono text-cyan-300 font-bold">{intercept.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.0"
                          max="30.0"
                          step="0.5"
                          value={intercept}
                          onChange={(e) => setIntercept(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                        <div className="text-slate-400">Learned Equation:</div>
                        <div className="text-cyan-300 font-bold">
                          y_pred = {slope.toFixed(2)} * x + {intercept.toFixed(2)}
                        </div>
                        <div className="text-slate-400 pt-1 border-t border-slate-900 flex justify-between">
                          <span>Mean Squared Error:</span>
                          <span className="text-amber-400 font-bold">{linearMSE.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Inference Input */}
                      <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Predict for Study Hours:</span>
                          <span className="font-mono text-emerald-300 font-bold">{testInputLinear} hrs</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="14"
                          step="0.5"
                          value={testInputLinear}
                          onChange={(e) => setTestInputLinear(Number(e.target.value))}
                          className="w-full accent-emerald-400 cursor-pointer"
                        />
                        <div className="text-xs font-mono text-slate-200">
                          Predicted Score: <strong className="text-emerald-400 font-bold">{testPredScore.toFixed(2)} pts</strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Weight (coef_[0]):</span>
                          <span className="font-mono text-cyan-300 font-bold">{logWeight.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.2"
                          max="3.0"
                          step="0.1"
                          value={logWeight}
                          onChange={(e) => setLogWeight(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Bias (intercept_):</span>
                          <span className="font-mono text-cyan-300 font-bold">{logBias.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="-15.0"
                          max="0.0"
                          step="0.5"
                          value={logBias}
                          onChange={(e) => setLogBias(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Decision Threshold:</span>
                          <span className="font-mono text-amber-300 font-bold">{threshold.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="0.9"
                          step="0.05"
                          value={threshold}
                          onChange={(e) => setThreshold(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>

                      {/* Inference Input */}
                      <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-slate-300 font-sans">
                          <span>Evaluate Hours:</span>
                          <span className="font-mono text-emerald-300 font-bold">{testInputLogistic} hrs</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          step="0.5"
                          value={testInputLogistic}
                          onChange={(e) => setTestInputLogistic(Number(e.target.value))}
                          className="w-full accent-emerald-400 cursor-pointer"
                        />
                        <div className="text-slate-400">
                          1. z = ({logWeight} * {testInputLogistic}) + ({logBias}) ={" "}
                          <span className="text-cyan-300 font-bold">{testZ.toFixed(2)}</span>
                        </div>
                        <div className="text-slate-400">
                          2. P(Pass) = σ(z) ={" "}
                          <span className="text-emerald-300 font-bold">{(testProb * 100).toFixed(1)}%</span>
                        </div>
                        <div className="text-slate-200 pt-1 border-t border-slate-900">
                          3. Prediction:{" "}
                          <span
                            className={`font-bold px-1.5 py-0.5 rounded ${
                              testPredClass === 1
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-rose-500/20 text-rose-300"
                            }`}
                          >
                            {testPredClass === 1 ? "Class 1 (Pass)" : "Class 0 (Fail)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Visualization Canvas */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      {modelMode === "linear" ? "Least Squares Regression Line" : "Sigmoid Probability Curve"}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {modelMode === "linear" ? "y = wx + b" : "P = 1 / (1 + e^-z)"}
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex items-center justify-center">
                    {modelMode === "linear" ? (
                      <svg viewBox="0 0 400 240" className="w-full h-[220px]">
                        {/* Axes */}
                        <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="1.5" />
                        <line x1="40" y1="200" x2="380" y2="200" stroke="#475569" strokeWidth="1.5" />

                        {/* Axis Labels */}
                        <text x="380" y="215" fill="#94a3b8" fontSize="10" textAnchor="end">Hours (x)</text>
                        <text x="35" y="15" fill="#94a3b8" fontSize="10" textAnchor="end">Score (y)</text>

                        {/* Fitted Line: x in [0, 14], y in [0, 100] */}
                        {(() => {
                          const x1 = 40;
                          const y1 = 200 - ((slope * 0 + intercept) / 100) * 180;
                          const x2 = 360;
                          const y2 = 200 - ((slope * 14 + intercept) / 100) * 180;
                          return (
                            <line
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#06b6d4"
                              strokeWidth="2.5"
                              strokeDasharray="0"
                            />
                          );
                        })()}

                        {/* Data Points */}
                        {regressionData.map((d, i) => {
                          const px = 40 + (d.x / 14) * 320;
                          const py = 200 - (d.y / 100) * 180;
                          return (
                            <circle key={i} cx={px} cy={py} r="4.5" fill="#38bdf8" />
                          );
                        })}

                        {/* Test Point Marker */}
                        {(() => {
                          const tx = 40 + (testInputLinear / 14) * 320;
                          const ty = 200 - (testPredScore / 100) * 180;
                          return (
                            <g>
                              <circle cx={tx} cy={ty} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                              <text x={tx + 8} y={ty + 4} fill="#fde68a" fontSize="10" fontFamily="monospace">
                                ({testInputLinear}h, {testPredScore.toFixed(1)})
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    ) : (
                      <svg viewBox="0 0 400 240" className="w-full h-[220px]">
                        {/* Axes */}
                        <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="1.5" />
                        <line x1="40" y1="200" x2="380" y2="200" stroke="#475569" strokeWidth="1.5" />

                        {/* Labels */}
                        <text x="380" y="215" fill="#94a3b8" fontSize="10" textAnchor="end">Hours (x)</text>
                        <text x="35" y="15" fill="#94a3b8" fontSize="10" textAnchor="end">P(Pass)</text>

                        {/* Threshold line */}
                        {(() => {
                          const threshY = 200 - threshold * 180;
                          return (
                            <g>
                              <line
                                x1="40"
                                y1={threshY}
                                x2="380"
                                y2={threshY}
                                stroke="#f59e0b"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                              />
                              <text x="375" y={threshY - 4} fill="#f59e0b" fontSize="9" textAnchor="end" fontFamily="monospace">
                                Threshold = {threshold}
                              </text>
                            </g>
                          );
                        })()}

                        {/* Sigmoid Curve Path */}
                        {(() => {
                          const points = [];
                          for (let h = 0; h <= 14; h += 0.5) {
                            const z = logWeight * h + logBias;
                            const p = sigmoid(z);
                            const sx = 40 + (h / 14) * 320;
                            const sy = 200 - p * 180;
                            points.push(`${sx},${sy}`);
                          }
                          return (
                            <polyline
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2.5"
                              points={points.join(" ")}
                            />
                          );
                        })()}

                        {/* Data samples */}
                        {logisticData.map((d, i) => {
                          const px = 40 + (d.hours / 14) * 320;
                          const py = 200 - d.passed * 180;
                          return (
                            <circle
                              key={i}
                              cx={px}
                              cy={py}
                              r="5"
                              fill={d.passed === 1 ? "#34d399" : "#f43f5e"}
                            />
                          );
                        })}

                        {/* Active Test Point */}
                        {(() => {
                          const tx = 40 + (testInputLogistic / 14) * 320;
                          const ty = 200 - testProb * 180;
                          return (
                            <g>
                              <circle cx={tx} cy={ty} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                              <text x={tx + 8} y={ty + 4} fill="#fde68a" fontSize="10" fontFamily="monospace">
                                P = {(testProb * 100).toFixed(0)}%
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    )}
                  </div>
                </div>

                {/* Insight Callout */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Key Takeaway:</strong>
                  Use <strong className="text-cyan-300">LinearRegression</strong> when the target is an infinite continuous scale (e.g., salaries, house pricing). Use <strong className="text-emerald-300">LogisticRegression</strong> when the target is a discrete decision (e.g., Pass/Fail, Fraud/Legit), utilizing its probabilistic sigmoid curve.
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
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Classroom Revision Notes: Linear Models
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400"
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
                    <HelpCircle className="w-5 h-5 text-cyan-400" />
                    Topic 8 Quiz: Linear &amp; Logistic Models
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Check your comprehension of OLS, sigmoid transformations, and Ridge/Lasso regularization.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-cyan-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono mt-0.5">
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
                            optStyle = "bg-cyan-500/20 border-cyan-500/50 text-cyan-200";
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
                          <strong className="text-cyan-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-cyan-600/20"
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

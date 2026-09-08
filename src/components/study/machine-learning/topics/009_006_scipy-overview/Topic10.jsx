import React, { useState } from "react";
import {
  Maximize2,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Play,
  RotateCcw,
  Layers,
  Activity,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic10_files/01_1d_scalar_minimization.py?raw";
import pyCode2 from "./topic10_files/02_multivariate_minimize_bfgs.py?raw";
import pyCode3 from "./topic10_files/03_curve_fitting_nonlinear.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

export default function Topic10() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls (Loss function: L(w) = a*(w - w_opt)^2 + minLoss)
  const [wOpt, setWOpt] = useState(4);
  const [curvature, setCurvature] = useState(0.5);
  const [minLoss, setMinLoss] = useState(5);
  const [initW, setInitW] = useState(-3);
  const [currentStep, setCurrentStep] = useState(0);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_1d_scalar_minimization.py", code: pyCode1 },
    { name: "02_multivariate_minimize_bfgs.py", code: pyCode2 },
    { name: "03_curve_fitting_nonlinear.py", code: pyCode3 }
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

  // Loss evaluation
  const calcLoss = (w) => curvature * Math.pow(w - wOpt, 2) + minLoss;
  const calcGrad = (w) => 2 * curvature * (w - wOpt);

  // Gradient descent simulation steps
  const lr = 0.35;
  const history = [initW];
  let currW = initW;
  for (let i = 0; i < 10; i++) {
    const grad = calcGrad(currW);
    currW = currW - lr * grad;
    history.push(currW);
  }

  const activeW = history[Math.min(currentStep, history.length - 1)];
  const activeLoss = calcLoss(activeW);

  // SVG Parabola rendering
  const svgWidth = 500;
  const svgHeight = 180;
  const wMin = -6;
  const wMax = 10;
  const maxL = calcLoss(wMin) * 1.1;

  const mapX = (w) => ((w - wMin) / (wMax - wMin)) * svgWidth;
  const mapY = (l) => svgHeight - (l / maxL) * (svgHeight - 20);

  const curvePoints = [];
  for (let w = wMin; w <= wMax; w += 0.2) {
    curvePoints.push(`${mapX(w)},${mapY(calcLoss(w))}`);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Maximize2 className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 10</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                scipy.optimize: Minimization Concept
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                The core computational engine behind model training. Master loss function minimization (<code className="text-emerald-400 font-mono">minimize()</code>), BFGS, Nelder-Mead, and non-linear curve fitting (<code className="text-emerald-400 font-mono">curve_fit()</code>).
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Loss Minimizer Studio", icon: Sparkles },
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
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
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
            {/* Parameters Control Panel */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Maximize2 className="w-4 h-4" />
                <span>Loss Landscape Controls</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Optimal Parameter (<code className="text-emerald-400 font-mono">w^*</code>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{wOpt}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    value={wOpt}
                    onChange={(e) => {
                      setWOpt(Number(e.target.value));
                      setCurrentStep(0);
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Initial Weight Guess (<code className="text-emerald-400 font-mono">w_0</code>):</span>
                    <span className="font-mono text-cyan-400 font-bold">{initW}</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="2"
                    value={initW}
                    onChange={(e) => {
                      setInitW(Number(e.target.value));
                      setCurrentStep(0);
                    }}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Min Loss Value (<code className="text-emerald-400 font-mono">c</code>):</span>
                    <span className="font-mono text-slate-400 font-bold">{minLoss}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={minLoss}
                    onChange={(e) => {
                      setMinLoss(Number(e.target.value));
                      setCurrentStep(0);
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* Optimization Stepper Button */}
              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, history.length - 1))}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/30"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Step Iteration ({currentStep}/{history.length - 1})</span>
                </button>
                <button
                  onClick={() => setCurrentStep(0)}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Parabola SVG & Status Dashboard */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Activity className="w-4 h-4" />
                  <span>Loss Surface L(w) &amp; Optimization Trajectory</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  w = {activeW.toFixed(3)} | Loss = {activeLoss.toFixed(3)}
                </span>
              </div>

              {/* SVG Curve */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-center">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-44 overflow-visible">
                  {/* Parabola curve */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={curvePoints.join(" ")}
                  />

                  {/* Optimal Minimum Point (Star) */}
                  <circle cx={mapX(wOpt)} cy={mapY(minLoss)} r="5" fill="#38bdf8" />
                  <text x={mapX(wOpt) - 20} y={mapY(minLoss) + 18} fill="#38bdf8" fontSize="10" fontWeight="bold">
                    Minimum
                  </text>

                  {/* History Trajectory Line */}
                  <polyline
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    points={history.slice(0, currentStep + 1).map((w) => `${mapX(w)},${mapY(calcLoss(w))}`).join(" ")}
                  />

                  {/* Current Active Step Point */}
                  <circle cx={mapX(activeW)} cy={mapY(activeLoss)} r="6" fill="#f43f5e" />
                </svg>
              </div>

              {/* Status Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Current Weight (w)</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{activeW.toFixed(3)}</div>
                  <span className="text-[10px] text-slate-500">Target optimal: {wOpt}</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Current Loss L(w)</span>
                  <div className="text-lg font-bold text-teal-400 font-mono mt-0.5">{activeLoss.toFixed(3)}</div>
                  <span className="text-[10px] text-slate-500">Global minimum: {minLoss}</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Convergence Status</span>
                  <div className="text-sm font-bold font-mono mt-1">
                    {Math.abs(activeW - wOpt) < 0.05 ? (
                      <span className="text-emerald-400">✅ Converged!</span>
                    ) : (
                      <span className="text-amber-400">⚡ Optimizing...</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500">Iteration #{currentStep}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((script, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {script.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
              <pre>{scripts[selectedScript].code}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Classroom Printable Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Notes"}</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Quiz */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Validation &amp; Knowledge Check</span>
              </div>
              {submittedQuiz && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300";
                        if (selected === optIdx) {
                          btnClass = "bg-emerald-950 border-emerald-500 text-white";
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnClass = "bg-emerald-900/80 border-emerald-500 text-white font-semibold";
                          } else if (selected === optIdx && selected !== q.correctAnswer) {
                            btnClass = "bg-rose-950 border-rose-500 text-rose-200";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-emerald-400">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSubmittedQuiz(!submittedQuiz)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                {submittedQuiz ? "Reset Quiz" : "Submit Answers"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

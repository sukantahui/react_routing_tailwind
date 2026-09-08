import React, { useState } from "react";
import {
  Workflow,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Cpu
} from "lucide-react";

import pyCode1 from "./topic2_files/01_fit_predict_score_workflow.py?raw";
import pyCode2 from "./topic2_files/02_fit_transform_difference.py?raw";
import pyCode3 from "./topic2_files/03_predict_proba_and_decision_function.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

const trainingPoints = [
  { x: 2, y: 25 },
  { x: 4, y: 42 },
  { x: 6, y: 58 },
  { x: 8, y: 72 },
  { x: 10, y: 85 },
  { x: 12, y: 96 }
];

export default function Topic2() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Workflow Pipeline Stepper State
  const [activeStep, setActiveStep] = useState(2); // 0: Instantiate, 1: Fit, 2: Predict, 3: Score
  const [testInputHours, setTestInputHours] = useState(9);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_fit_predict_score_workflow.py", code: pyCode1 },
    { name: "02_fit_transform_difference.py", code: pyCode2 },
    { name: "03_predict_proba_and_decision_function.py", code: pyCode3 }
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

  // Linear Regression learned parameters: y = 7.1*x + 12.5
  const slope = 7.1;
  const intercept = 12.5;
  const predictedScore = Math.min(100, Math.max(0, slope * testInputHours + intercept));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Workflow className="w-4 h-4" />
                <span>Machine Learning Module • Topic 2</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Scikit-Learn API Pattern: fit, predict, score
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master the canonical 4-step Estimator lifecycle. Understand 2D feature matrix shapes, internal learned parameters, and data leakage prevention.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "API Lifecycle Stepper", icon: Sparkles },
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
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
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
            {/* 4-Stage Stepper Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Workflow className="w-4 h-4" />
                <span>The 4 Canonical API Stages</span>
              </div>

              {/* Step Navigation */}
              <div className="space-y-2">
                {[
                  { step: 0, title: "1. Instantiate", desc: "model = LinearRegression()" },
                  { step: 1, title: "2. .fit(X, y)", desc: "Learns coef_ & intercept_ weights" },
                  { step: 2, title: "3. .predict(X_new)", desc: "Generates inferences on test data" },
                  { step: 3, title: "4. .score(X, y)", desc: "Evaluates R² / Accuracy metrics" }
                ].map((s) => (
                  <div
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      activeStep === s.step
                        ? "bg-cyan-950/60 border-cyan-500 shadow"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{s.title}</span>
                      {activeStep >= s.step && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Prediction Input Test Slider */}
              {activeStep >= 2 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Test Input (X_new Hours):</span>
                    <span className="font-mono text-cyan-400">{testInputHours}h</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    step="1"
                    value={testInputHours}
                    onChange={(e) => setTestInputHours(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono flex items-center justify-between border border-slate-800">
                    <span className="text-slate-400">Predicted Mark:</span>
                    <span className="text-emerald-400 font-bold">{predictedScore.toFixed(1)} / 100</span>
                  </div>
                </div>
              )}

              {/* Code generator */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-cyan-400 font-semibold mb-1"># Live API Execution:</div>
                {activeStep >= 0 && <div className="text-slate-400">model = LinearRegression()</div>}
                {activeStep >= 1 && <div className="text-emerald-300">model.fit(X_train, y_train)</div>}
                {activeStep >= 2 && (
                  <div className="text-cyan-300">
                    y_pred = model.predict([[{testInputHours}]]) # -&gt; {predictedScore.toFixed(1)}
                  </div>
                )}
                {activeStep >= 3 && <div className="text-amber-300">r2 = model.score(X_train, y_train) # -&gt; 0.992</div>}
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  Live Regression Fitting Canvas
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeStep === 0 && "Step 1: Untrained Model"}
                  {activeStep === 1 && "Step 2: model.fit() Fitted Line"}
                  {activeStep === 2 && "Step 3: model.predict() Inference Point"}
                  {activeStep === 3 && "Step 4: model.score() R² Evaluation"}
                </span>
              </div>

              {/* SVG Canvas */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="490" height="280" viewBox="0 0 490 280" className="max-w-full">
                  {/* Grid */}
                  <line x1="50" y1="50" x2="450" y2="50" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="110" x2="450" y2="110" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="450" y2="170" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="50" y1="230" x2="450" y2="230" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#64748b" strokeWidth="1.5" />

                  {/* Y Axis ticks [0, 100] */}
                  <text x="40" y="234" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">0</text>
                  <text x="40" y="174" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">35</text>
                  <text x="40" y="114" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">70</text>
                  <text x="40" y="54" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">100</text>

                  {/* X Axis ticks [0, 14] */}
                  {[2, 4, 6, 8, 10, 12, 14].map((hrs) => {
                    const x = 50 + (hrs / 14) * 400;
                    return (
                      <g key={hrs}>
                        <line x1={x} y1="230" x2={x} y2="235" stroke="#94a3b8" />
                        <text x={x} y="250" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">{hrs}h</text>
                      </g>
                    );
                  })}

                  {/* Training Points */}
                  {trainingPoints.map((pt, i) => {
                    const cx = 50 + (pt.x / 14) * 400;
                    const cy = 230 - (pt.y / 100) * 180;
                    return (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="6"
                        fill="#38bdf8"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        opacity="0.9"
                      />
                    );
                  })}

                  {/* Learned Regression Line (Active after Step 1) */}
                  {activeStep >= 1 && (
                    <line
                      x1={50}
                      y1={230 - (intercept / 100) * 180}
                      x2={50 + 400}
                      y2={230 - ((slope * 14 + intercept) / 100) * 180}
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Active Prediction Point (Step 2 and above) */}
                  {activeStep >= 2 && (
                    <g>
                      <line
                        x1={50 + (testInputHours / 14) * 400}
                        y1="230"
                        x2={50 + (testInputHours / 14) * 400}
                        y2={230 - (predictedScore / 100) * 180}
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx={50 + (testInputHours / 14) * 400}
                        cy={230 - (predictedScore / 100) * 180}
                        r="8"
                        fill="#f43f5e"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </g>
                  )}

                  {/* Axis Label */}
                  <text x="250" y="270" fill="#e2e8f0" fontSize="11" fontWeight="600" textAnchor="middle">
                    Study Hours (Feature X)
                  </text>
                </svg>
              </div>

              {/* Status footer */}
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="font-mono text-cyan-300">
                  {activeStep >= 1 ? `model.coef_ = [${slope}] • model.intercept_ = ${intercept}` : "Model parameters uninitialized"}
                </span>
                <span className="font-mono text-emerald-400">
                  {activeStep >= 3 ? "R² Score: 0.992 (Excellent Fit)" : "Standard 2D Array Shape"}
                </span>
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
                        ? "bg-cyan-600 text-white shadow"
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
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 2 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 2 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-cyan-600/30 border-cyan-500 text-cyan-200";
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
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition-all"
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

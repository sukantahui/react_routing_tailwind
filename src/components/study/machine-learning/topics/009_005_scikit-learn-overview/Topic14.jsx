import React, { useState } from "react";
import {
  Calculator,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  RotateCcw,
  Activity,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Percent,
  Layers
} from "lucide-react";

import pyCode1 from "./topic14_files/01_regression_metrics_basics.py?raw";
import pyCode2 from "./topic14_files/02_r2_score_deepdive_and_negative_r2.py?raw";
import pyCode3 from "./topic14_files/03_outlier_impact_mae_vs_mse.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

const initialStudents = [
  { id: 1, name: "Debangshu", actual: 50, pred: 52 },
  { id: 2, name: "Susmita", actual: 75, pred: 70 },
  { id: 3, name: "Swadeep", actual: 90, pred: 95 },
  { id: 4, name: "Tuhina", actual: 40, pred: 35 },
  { id: 5, name: "Sachin", actual: 60, pred: 64 }
];

export default function Topic14() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Studio Interactive State
  const [students, setStudents] = useState(initialStudents);
  const [outlierActive, setOutlierActive] = useState(false);
  const [outlierError, setOutlierError] = useState(60); // large residual on last student

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_regression_metrics_basics.py", code: pyCode1 },
    { name: "02_r2_score_deepdive_and_negative_r2.py", code: pyCode2 },
    { name: "03_outlier_impact_mae_vs_mse.py", code: pyCode3 }
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

  const handleStudentPredChange = (id, newPred) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, pred: Number(newPred) } : s))
    );
  };

  // Compute active dataset
  const activeDataset = students.map((s) => {
    if (outlierActive && s.id === 5) {
      return { ...s, pred: s.actual + outlierError };
    }
    return s;
  });

  const actuals = activeDataset.map((s) => s.actual);
  const preds = activeDataset.map((s) => s.pred);
  const meanActual = actuals.reduce((a, b) => a + b, 0) / actuals.length;

  const residuals = activeDataset.map((s) => s.actual - s.pred);
  const absResiduals = residuals.map((r) => Math.abs(r));
  const sqResiduals = residuals.map((r) => Math.pow(r, 2));

  const mae = absResiduals.reduce((a, b) => a + b, 0) / absResiduals.length;
  const mse = sqResiduals.reduce((a, b) => a + b, 0) / sqResiduals.length;
  const rmse = Math.sqrt(mse);

  const ssRes = sqResiduals.reduce((a, b) => a + b, 0);
  const ssTot = actuals.reduce((sum, y) => sum + Math.pow(y - meanActual, 2), 0);
  const r2 = ssTot !== 0 ? 1 - ssRes / ssTot : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/30">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Topic 14 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.metrics</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Regression Metrics: MAE, MSE, RMSE &amp; R² Score
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the mathematical nuances of regression error functions. Compare linear vs quadratic outlier sensitivity
          and understand why and when <code className="text-blue-300 font-mono">r2_score</code> can plunge below zero.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Regression Metrics Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
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
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
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
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE METRICS STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* MAE */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Mean Absolute Error</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {mae.toFixed(2)} <span className="text-xs text-slate-500 font-sans">marks</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">(1/N) Σ |y - ŷ|</div>
              </div>

              {/* MSE */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Mean Squared Error</div>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {mse.toFixed(2)} <span className="text-xs text-slate-500 font-sans">marks²</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">(1/N) Σ (y - ŷ)²</div>
              </div>

              {/* RMSE */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Root Mean Squared Error</div>
                <div className="text-2xl font-bold font-mono text-sky-400">
                  {rmse.toFixed(2)} <span className="text-xs text-slate-500 font-sans">marks</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">√MSE</div>
              </div>

              {/* R2 */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">R-squared (R² Score)</div>
                <div
                  className={`text-2xl font-bold font-mono ${
                    r2 >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {r2.toFixed(3)}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">1 - (SS_res / SS_tot)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Sample Residual Table & Controls */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-400" />
                      Residual Adjuster
                    </h3>
                    <button
                      onClick={() => setStudents(initialStudents)}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                  </div>

                  {/* Outlier toggle */}
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 mb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Inject Massive Error Outlier on Sachin
                      </span>
                      <input
                        type="checkbox"
                        checked={outlierActive}
                        onChange={(e) => setOutlierActive(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700"
                      />
                    </div>
                    {outlierActive && (
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Outlier Error Offset:</span>
                          <span className="font-mono text-amber-300 font-bold">+{outlierError} marks</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={outlierError}
                          onChange={(e) => setOutlierError(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Student Residuals Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Student</th>
                          <th className="p-2.5">Actual (y)</th>
                          <th className="p-2.5">Pred (ŷ)</th>
                          <th className="p-2.5 text-emerald-400">|y - ŷ|</th>
                          <th className="p-2.5 text-amber-400">(y - ŷ)²</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {activeDataset.map((s) => {
                          const res = s.actual - s.pred;
                          return (
                            <tr key={s.id} className="hover:bg-slate-800/40">
                              <td className="p-2.5 font-sans font-medium text-slate-200">{s.name}</td>
                              <td className="p-2.5 text-slate-300">{s.actual}</td>
                              <td className="p-2.5 text-blue-300 font-bold">{s.pred}</td>
                              <td className="p-2.5 text-emerald-400">{Math.abs(res)}</td>
                              <td className="p-2.5 text-amber-400">{Math.pow(res, 2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Breakdown & Insight */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Metrics Behavior Analysis
                  </h3>

                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total SS_res (Squared Error Sum):</span>
                      <span className="font-mono text-amber-400 font-bold">{ssRes.toFixed(1)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total SS_tot (Variance from Mean):</span>
                      <span className="font-mono text-sky-400 font-bold">{ssTot.toFixed(1)}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center font-bold">
                      <span className="text-slate-200">R² = 1 - ({ssRes.toFixed(0)} / {ssTot.toFixed(0)}):</span>
                      <span className={`font-mono text-sm ${r2 >= 0 ? "text-emerald-300" : "text-rose-400"}`}>
                        {r2.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {/* Outlier impact alert */}
                  {outlierActive && (
                    <div className="mt-4 p-3.5 bg-amber-500/15 border border-amber-500/30 rounded-lg text-xs text-amber-200 leading-relaxed">
                      <strong className="block mb-0.5">⚠️ Outlier Effect Observed:</strong>
                      Because the error on Sachin is squared ({outlierError}² = {outlierError * outlierError}), MSE and RMSE explode dramatically, while MAE increases only linearly. This demonstrates why MAE is robust against corrupt sensor spikes.
                    </div>
                  )}

                  {r2 < 0 && (
                    <div className="mt-4 p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-xs text-rose-200 leading-relaxed">
                      <strong className="block mb-0.5">🚨 Negative R² Warning:</strong>
                      The model is performing worse than simply predicting the dataset mean (SS_res &gt; SS_tot). In production, replacing this model with a dummy mean line would improve performance!
                    </div>
                  )}
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
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-blue-400" />
                Classroom Revision Notes: Regression Metrics
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400"
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
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    Topic 14 Quiz: Regression Metrics
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your mastery of MAE, MSE, RMSE, and the R² coefficient of determination.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-blue-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono mt-0.5">
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
                            optStyle = "bg-blue-500/20 border-blue-500/50 text-blue-200";
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
                          <strong className="text-blue-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-blue-600/20"
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

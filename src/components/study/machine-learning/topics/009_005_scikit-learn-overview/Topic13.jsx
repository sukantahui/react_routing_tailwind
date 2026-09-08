import React, { useState } from "react";
import {
  CheckSquare,
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
  AlertOctagon,
  Percent,
  Grid,
  ShieldCheck
} from "lucide-react";

import pyCode1 from "./topic13_files/01_classification_metrics_basics.py?raw";
import pyCode2 from "./topic13_files/02_confusion_matrix_and_display.py?raw";
import pyCode3 from "./topic13_files/03_precision_recall_f1_tradeoff.py?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions.js";

const scenarios = [
  {
    id: "medical",
    name: "Medical Cancer Screening (High Recall Priority)",
    desc: "Crucial to catch every tumor; False Negatives are catastrophic.",
    tp: 45,
    fp: 15,
    fn: 2,
    tn: 138
  },
  {
    id: "spam",
    name: "Email Spam Filter (High Precision Priority)",
    desc: "Crucial to avoid filtering legitimate emails; False Positives are catastrophic.",
    tp: 80,
    fp: 2,
    fn: 18,
    tn: 200
  },
  {
    id: "imbalanced",
    name: "Severe Fraud Imbalance (Accuracy Trap)",
    desc: "99% Legit, 1% Fraud. Shows why raw accuracy is deceptive.",
    tp: 2,
    fp: 1,
    fn: 8,
    tn: 989
  },
  {
    id: "balanced",
    name: "Standard Balanced Student Evaluation",
    desc: "Even distribution of Pass and Fail instances.",
    tp: 45,
    fp: 5,
    fn: 5,
    tn: 45
  }
];

export default function Topic13() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Matrix Interactive State
  const [tp, setTp] = useState(45);
  const [fp, setFp] = useState(15);
  const [fn, setFn] = useState(2);
  const [tn, setTn] = useState(138);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_classification_metrics_basics.py", code: pyCode1 },
    { name: "02_confusion_matrix_and_display.py", code: pyCode2 },
    { name: "03_precision_recall_f1_tradeoff.py", code: pyCode3 }
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

  const applyPreset = (s) => {
    setTp(s.tp);
    setFp(s.fp);
    setFn(s.fn);
    setTn(s.tn);
  };

  // Calculations
  const total = tp + fp + fn + tn || 1;
  const accuracy = (tp + tn) / total;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const specificity = tn + fp > 0 ? tn / (tn + fp) : 0;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
            <CheckSquare className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Topic 13 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.metrics</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Model Evaluation: Confusion Matrix &amp; Classification Metrics
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the complete taxonomy of classification performance. Move beyond deceptive accuracy
          to evaluate Precision, Recall, F1-Score, Type I vs Type II errors, and macro vs weighted averages.
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
            Metrics &amp; Matrix Studio
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

        {/* TAB 1: INTERACTIVE METRICS STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Scenario Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => applyPreset(s)}
                  className="p-3.5 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 text-left transition-all"
                >
                  <div className="font-semibold text-slate-200 text-xs">{s.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{s.desc}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 2x2 Interactive Confusion Matrix */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Grid className="w-4 h-4 text-emerald-400" />
                      Interactive 2x2 Confusion Matrix
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Total: {total} samples
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* True Negative (TN) */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-emerald-300">True Negative (TN)</span>
                        <span className="font-mono text-emerald-400 font-bold">{tn}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Actual: 0, Pred: 0</div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={tn}
                        onChange={(e) => setTn(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>

                    {/* False Positive (FP) */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-amber-300">False Positive (FP)</span>
                        <span className="font-mono text-amber-400 font-bold">{fp}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Type I Error: Actual 0, Pred 1</div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={fp}
                        onChange={(e) => setFp(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    {/* False Negative (FN) */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-500/30 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-rose-300">False Negative (FN)</span>
                        <span className="font-mono text-rose-400 font-bold">{fn}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Type II Error: Actual 1, Pred 0</div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={fn}
                        onChange={(e) => setFn(Number(e.target.value))}
                        className="w-full accent-rose-400 cursor-pointer"
                      />
                    </div>

                    {/* True Positive (TP) */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-emerald-300">True Positive (TP)</span>
                        <span className="font-mono text-emerald-400 font-bold">{tp}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Actual: 1, Pred 1</div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={tp}
                        onChange={(e) => setTp(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Metric Gauges */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Live Computed Metric Indicators
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Accuracy */}
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400 flex justify-between">
                        <span>Accuracy</span>
                        <span className="font-mono text-emerald-400 font-bold">{(accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">(TP+TN) / Total</div>
                    </div>

                    {/* Precision */}
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400 flex justify-between">
                        <span>Precision</span>
                        <span className="font-mono text-sky-400 font-bold">{(precision * 100).toFixed(1)}%</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">TP / (TP + FP)</div>
                    </div>

                    {/* Recall */}
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400 flex justify-between">
                        <span>Recall (Sensitivity)</span>
                        <span className="font-mono text-pink-400 font-bold">{(recall * 100).toFixed(1)}%</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">TP / (TP + FN)</div>
                    </div>

                    {/* F1-Score */}
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400 flex justify-between">
                        <span>F1-Score</span>
                        <span className="font-mono text-amber-400 font-bold">{(f1 * 100).toFixed(1)}%</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">2 * (P*R) / (P+R)</div>
                    </div>
                  </div>

                  {/* Simulated Classification Report */}
                  <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-xs text-slate-300">
                    <div className="text-slate-400 mb-2 font-semibold">sklearn.metrics.classification_report Output:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-500">
                        <span>Class</span>
                        <span>Precision</span>
                        <span>Recall</span>
                        <span>F1-score</span>
                        <span>Support</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-200">Class 0 (Neg)</span>
                        <span>{(specificity).toFixed(2)}</span>
                        <span>{(tn / (tn + fp || 1)).toFixed(2)}</span>
                        <span>{((2 * specificity * (tn / (tn + fp || 1))) / (specificity + (tn / (tn + fp || 1)) || 1)).toFixed(2)}</span>
                        <span>{tn + fp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-200">Class 1 (Pos)</span>
                        <span>{precision.toFixed(2)}</span>
                        <span>{recall.toFixed(2)}</span>
                        <span>{f1.toFixed(2)}</span>
                        <span>{tp + fn}</span>
                      </div>
                    </div>
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
                Classroom Revision Notes: Classification Evaluation
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
                    Topic 13 Quiz: Classification Metrics
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluate your knowledge of Confusion Matrices, Precision, Recall, and F1-Scores.
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

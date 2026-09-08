import React, { useState } from "react";
import {
  Repeat,
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
  Play,
  Layers,
  BarChart2,
  ShieldCheck
} from "lucide-react";

import pyCode1 from "./topic15_files/01_cross_val_score_basics.py?raw";
import pyCode2 from "./topic15_files/02_stratified_kfold_and_cross_validate.py?raw";
import pyCode3 from "./topic15_files/03_cross_val_predict_and_scoring_metrics.py?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions.js";

const foldScoresBank = {
  3: [0.86, 0.92, 0.88],
  5: [0.88, 0.94, 0.90, 0.86, 0.92],
  10: [0.85, 0.90, 0.95, 0.88, 0.92, 0.87, 0.93, 0.89, 0.91, 0.90]
};

export default function Topic15() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Cross-validation Simulator State
  const [numFolds, setNumFolds] = useState(5);
  const [activeFoldView, setActiveFoldView] = useState(0); // index of active test fold

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_cross_val_score_basics.py", code: pyCode1 },
    { name: "02_stratified_kfold_and_cross_validate.py", code: pyCode2 },
    { name: "03_cross_val_predict_and_scoring_metrics.py", code: pyCode3 }
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

  const scores = foldScoresBank[numFolds] || foldScoresBank[5];
  const meanScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const stdScore = Math.sqrt(
    scores.map((s) => Math.pow(s - meanScore, 2)).reduce((a, b) => a + b, 0) / scores.length
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/30">
            <Repeat className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Topic 15 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.model_selection.cross_val_score</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              K-Fold Cross-Validation &amp; Generalization Bounds
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Eliminate single-split evaluation bias. Learn how K-Fold and Stratified K-Fold partitioning
          guarantee that every sample serves as a test point, generating reliable confidence intervals (<code className="text-indigo-300 font-mono">μ ± 2σ</code>).
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-indigo-400 text-indigo-400 bg-indigo-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            K-Fold Visual Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-indigo-400 text-indigo-400 bg-indigo-500/10"
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
                ? "border-indigo-400 text-indigo-400 bg-indigo-500/10"
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
                ? "border-indigo-400 text-indigo-400 bg-indigo-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE K-FOLD STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Fold Controls & Summary */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    Cross-Validation Configuration
                  </h3>

                  {/* Number of Folds */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Number of Folds (cv = K):</span>
                      <span className="font-mono text-indigo-300 font-bold text-sm">K = {numFolds}</span>
                    </div>
                    <div className="flex gap-2">
                      {[3, 5, 10].map((k) => (
                        <button
                          key={k}
                          onClick={() => {
                            setNumFolds(k);
                            setActiveFoldView(0);
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                            numFolds === k
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                              : "bg-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {k}-Fold CV
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary Metric Stats */}
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-400 font-sans">
                      <span>Mean Accuracy (μ):</span>
                      <span className="text-emerald-400 font-bold text-sm">{(meanScore * 100).toFixed(2)}%</span>
                    </div>

                    <div className="flex justify-between text-slate-400 font-sans">
                      <span>Standard Deviation (σ):</span>
                      <span className="text-indigo-300 font-bold">±{(stdScore * 100).toFixed(2)}%</span>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex justify-between text-slate-300 font-sans">
                      <span>95% Confidence Range:</span>
                      <span className="text-slate-200 font-mono">
                        [{((meanScore - 2 * stdScore) * 100).toFixed(1)}%, {((meanScore + 2 * stdScore) * 100).toFixed(1)}%]
                      </span>
                    </div>
                  </div>

                  {/* Per Fold Scores List */}
                  <div className="mt-4 space-y-1.5 font-mono text-xs">
                    <div className="text-slate-400 font-semibold font-sans mb-1">Fold Score Breakdown:</div>
                    {scores.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveFoldView(idx)}
                        className={`p-2 rounded border cursor-pointer transition-all flex items-center justify-between ${
                          activeFoldView === idx
                            ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-200"
                            : "bg-slate-950 border-slate-800/80 text-slate-400 hover:bg-slate-900"
                        }`}
                      >
                        <span className="font-semibold">Fold #{idx + 1}</span>
                        <span className="text-emerald-300 font-bold">{(s * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Fold Grid Representation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      K-Fold Iteration Architecture
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      ● Train ({numFolds - 1}/{numFolds}) | ◆ Validation (1/{numFolds})
                    </span>
                  </div>

                  {/* Multi-iteration fold bars */}
                  <div className="space-y-3">
                    {Array.from({ length: numFolds }).map((_, iterIdx) => (
                      <div
                        key={iterIdx}
                        onClick={() => setActiveFoldView(iterIdx)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          activeFoldView === iterIdx
                            ? "bg-slate-950 border-indigo-500/60 shadow-md shadow-indigo-950/50"
                            : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-950"
                        }`}
                      >
                        <div className="flex justify-between text-xs mb-2">
                          <span className="font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
                            Iteration #{iterIdx + 1}
                          </span>
                          <span className="text-emerald-400 font-mono font-bold">
                            Score: {(scores[iterIdx] * 100).toFixed(1)}%
                          </span>
                        </div>

                        {/* Fold segments */}
                        <div className="flex gap-1.5">
                          {Array.from({ length: numFolds }).map((_, chunkIdx) => {
                            const isTest = chunkIdx === iterIdx;
                            return (
                              <div
                                key={chunkIdx}
                                className={`flex-1 py-2 rounded text-center text-[10px] font-mono font-bold transition-all ${
                                  isTest
                                    ? "bg-amber-500 text-slate-950 shadow-sm"
                                    : "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                                }`}
                              >
                                {isTest ? "VAL" : "TRAIN"}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-400 mt-4 text-center">
                    Every partition is used for testing exactly once across the {numFolds} iterations.
                  </div>
                </div>

                {/* Insight Box */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Why Standard Deviation Matters (Barrackpore Lab):</strong>
                  If Model A scores 85% ± 1% and Model B scores 87% ± 12%, Model A is preferred in production because of its rock-solid stability and low variance across different customer cohorts!
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
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Classroom Revision Notes: Cross-Validation
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400"
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
                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                    Topic 15 Quiz: Cross-Validation
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your understanding of K-Fold splits, stratification, and variance estimation.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-indigo-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono mt-0.5">
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
                            optStyle = "bg-indigo-500/20 border-indigo-500/50 text-indigo-200";
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
                          <strong className="text-indigo-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-indigo-600/20"
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

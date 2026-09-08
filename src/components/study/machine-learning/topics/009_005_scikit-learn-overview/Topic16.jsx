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
  RotateCcw,
  Activity,
  CheckCircle2,
  ArrowRight,
  Database,
  Layers,
  Cpu,
  PackageCheck
} from "lucide-react";

import pyCode1 from "./topic16_files/01_pipeline_basics.py?raw";
import pyCode2 from "./topic16_files/02_pipeline_with_column_transformer.py?raw";
import pyCode3 from "./topic16_files/03_pipeline_in_gridsearch_and_cv.py?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions.js";

const pipelineStages = [
  {
    step: 0,
    name: "1. Raw Input Payload",
    type: "Input Data",
    desc: "Uncleaned raw query with missing values and mixed types.",
    dataState: "{ study_hours: null, score: 75, city: 'Barrackpore' }",
    details: "Raw request payload arriving at production API endpoint."
  },
  {
    step: 1,
    name: "2. SimpleImputer(strategy='median')",
    type: "Transformer",
    desc: "Replaces missing values (null) with learned training median (18.5).",
    dataState: "{ study_hours: 18.5, score: 75, city: 'Barrackpore' }",
    details: "Missing null replaced without throwing runtime exceptions."
  },
  {
    step: 2,
    name: "3. StandardScaler()",
    type: "Transformer",
    desc: "Normalizes numeric values to Z-scores using learned μ and σ.",
    dataState: "{ study_hours_z: 0.42, score_z: 0.85, city: 'Barrackpore' }",
    details: "Numeric features standardized to zero mean and unit variance."
  },
  {
    step: 3,
    name: "4. OneHotEncoder()",
    type: "Transformer",
    desc: "Expands nominal text into binary indicator columns.",
    dataState: "[ 0.42, 0.85, 1, 0, 0 ] (Dense 1x5 Feature Vector)",
    details: "Converted into purely numeric dense array ready for model tensors."
  },
  {
    step: 4,
    name: "5. LogisticRegression()",
    type: "Estimator / Classifier",
    desc: "Evaluates dot product w·x + b and computes sigmoid probability.",
    dataState: "P(Pass) = 87.4% ==> Predicted Class: 1 (Pass Exam)",
    details: "Final inference output returned to client!"
  }
];

export default function Topic16() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Pipeline Stepper State
  const [activeStage, setActiveStage] = useState(0);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_pipeline_basics.py", code: pyCode1 },
    { name: "02_pipeline_with_column_transformer.py", code: pyCode2 },
    { name: "03_pipeline_in_gridsearch_and_cv.py", code: pyCode3 }
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

  const currentStage = pipelineStages[activeStage];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/30">
            <Workflow className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Topic 16 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.pipeline.Pipeline</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Scikit-learn Pipelines &amp; End-to-End Orchestration
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the professional engineering workflow of Scikit-learn. Chain transformers and estimators
          into robust, leak-free pipelines ready for cross-validation, grid search, and production serving.
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
            Pipeline Flow Studio
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

        {/* TAB 1: INTERACTIVE PIPELINE STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Pipeline Stage Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {pipelineStages.map((stage, idx) => (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeStage === idx
                      ? "bg-cyan-500/15 border-cyan-500/60 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1">
                    {stage.type}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 truncate">{stage.name}</div>
                </button>
              ))}
            </div>

            {/* Pipeline Step Detail Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Stage Detail Card & Stepper */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-full font-semibold">
                      Step {currentStage.step + 1} of {pipelineStages.length}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{currentStage.type}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{currentStage.name}</h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">{currentStage.desc}</p>

                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="text-slate-400 font-sans font-semibold">Data Representation State:</div>
                    <div className="text-cyan-300 font-bold break-all bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
                      {currentStage.dataState}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                      disabled={activeStage === 0}
                      className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs font-semibold transition-all"
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={() => setActiveStage((prev) => Math.min(pipelineStages.length - 1, prev + 1))}
                      disabled={activeStage === pipelineStages.length - 1}
                      className="flex-1 py-2 px-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-cyan-600/20"
                    >
                      Next Step
                    </button>
                  </div>
                </div>

                {/* Pipeline Code Snippet */}
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 space-y-1">
                  <div className="text-slate-400 font-sans font-semibold mb-2">Equivalent Scikit-learn Code:</div>
                  <div className="text-purple-300">pipeline = Pipeline([</div>
                  <div className="pl-4 text-slate-300">('imputer', SimpleImputer(strategy='median')),</div>
                  <div className="pl-4 text-slate-300">('scaler', StandardScaler()),</div>
                  <div className="pl-4 text-slate-300">('encoder', OneHotEncoder()),</div>
                  <div className="pl-4 text-emerald-400">('clf', LogisticRegression())</div>
                  <div className="text-purple-300">])</div>
                  <div className="text-cyan-300 pt-2">pipeline.fit(X_train, y_train)</div>
                </div>
              </div>

              {/* Right Column: Visual Architecture Flow */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <PackageCheck className="w-4 h-4 text-cyan-400" />
                    Sequential Transformation Flow
                  </h3>

                  <div className="space-y-3">
                    {pipelineStages.map((stage, idx) => {
                      const isActive = activeStage === idx;
                      const isPast = activeStage > idx;
                      return (
                        <div
                          key={stage.step}
                          onClick={() => setActiveStage(idx)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                            isActive
                              ? "bg-cyan-500/20 border-cyan-500/60 shadow-md shadow-cyan-950/50 text-cyan-200"
                              : isPast
                              ? "bg-slate-950 border-emerald-500/30 text-slate-300"
                              : "bg-slate-950/40 border-slate-800/80 text-slate-500"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                                isActive
                                  ? "bg-cyan-500 text-slate-950"
                                  : isPast
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-slate-800 text-slate-500"
                              }`}
                            >
                              {isPast ? "✓" : idx + 1}
                            </div>
                            <div>
                              <div className="text-xs font-semibold">{stage.name}</div>
                              <div className="text-[10px] text-slate-400">{stage.details}</div>
                            </div>
                          </div>
                          {idx < pipelineStages.length - 1 && (
                            <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key takeaway */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Leakage Prevention Rule (Barrackpore Lab):</strong>
                  When <code className="text-cyan-300 font-mono">cross_val_score(pipeline, X, y)</code> runs, it executes <code className="text-cyan-300 font-mono">.fit_transform()</code> only on the 4 training folds, guaranteeing that the validation fold remains completely untouched!
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
                Classroom Revision Notes: Scikit-learn Pipeline
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
                    Topic 16 Quiz: Scikit-learn Pipeline
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluate your knowledge of Pipeline chaining, data leakage safeguards, and parameter routing.
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

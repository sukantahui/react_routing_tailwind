import React, { useState } from "react";
import {
  Cpu,
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
  Layers,
  Search,
  Box,
  Binary,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

import pyCode1 from "./topic3_files/01_estimator_base_class.py?raw";
import pyCode2 from "./topic3_files/02_inspecting_learned_attributes.py?raw";
import pyCode3 from "./topic3_files/03_custom_estimator_demo.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const estimatorTypes = [
  {
    id: "regressor",
    name: "LinearRegression (Regressor)",
    category: "Supervised Learning",
    initParams: { fit_intercept: true, positive: false },
    learnedParams: {
      "coef_": "[3.85, -1.42]",
      "intercept_": "12.45",
      "n_features_in_": "2",
      "feature_names_in_": "['study_hours', 'sleep_hours']",
      "rank_": "2"
    },
    methods: ["fit(X, y)", "predict(X_new)", "score(X_test, y_test)"],
    statusNote: "Predicts continuous target values (e.g. final exam score)."
  },
  {
    id: "classifier",
    name: "LogisticRegression (Classifier)",
    category: "Supervised Learning",
    initParams: { C: 1.0, max_iter: 100, solver: "lbfgs" },
    learnedParams: {
      "classes_": "[0, 1]",
      "coef_": "[[1.24, 0.88]]",
      "intercept_": "[-2.15]",
      "n_iter_": "[18]"
    },
    methods: ["fit(X, y)", "predict(X_new)", "predict_proba(X_new)", "score(X_test, y_test)"],
    statusNote: "Predicts categorical class labels & class probability estimates."
  },
  {
    id: "transformer",
    name: "StandardScaler (Transformer)",
    category: "Preprocessing",
    initParams: { with_mean: true, with_std: true },
    learnedParams: {
      "mean_": "[52.3, 7.1]",
      "var_": "[144.2, 2.5]",
      "scale_": "[12.01, 1.58]",
      "n_samples_seen_": "200"
    },
    methods: ["fit(X)", "transform(X)", "fit_transform(X)", "inverse_transform(X_scaled)"],
    statusNote: "Computes mean & std dev, transforms features into zero mean and unit variance."
  },
  {
    id: "clusterer",
    name: "KMeans (Clusterer)",
    category: "Unsupervised Learning",
    initParams: { n_clusters: 3, init: "k-means++", random_state: 42 },
    learnedParams: {
      "cluster_centers_": "[[2.1, 3.4], [8.5, 9.1], [5.0, 1.2]]",
      "labels_": "[0, 1, 1, 2, 0, 2, ...]",
      "inertia_": "142.85",
      "n_iter_": "6"
    },
    methods: ["fit(X)", "predict(X_new)", "fit_predict(X)", "transform(X)"],
    statusNote: "Discovers geometric centroid positions and partitions unlabeled data into K groups."
  }
];

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Estimator Simulator State
  const [selectedEstimatorIdx, setSelectedEstimatorIdx] = useState(0);
  const [isFitted, setIsFitted] = useState(false);
  const [isFitting, setIsFitting] = useState(false);
  const [attemptedEarlyAccess, setAttemptedEarlyAccess] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const currentEstimator = estimatorTypes[selectedEstimatorIdx];

  const scripts = [
    { name: "01_estimator_base_class.py", code: pyCode1 },
    { name: "02_inspecting_learned_attributes.py", code: pyCode2 },
    { name: "03_custom_estimator_demo.py", code: pyCode3 }
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

  const handleFit = () => {
    setAttemptedEarlyAccess(false);
    setIsFitting(true);
    setTimeout(() => {
      setIsFitting(false);
      setIsFitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsFitted(false);
    setIsFitting(false);
    setAttemptedEarlyAccess(false);
  };

  const handleEarlyInspect = () => {
    if (!isFitted) {
      setAttemptedEarlyAccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/30">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Topic 3 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.base.BaseEstimator</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              The Estimator Concept &amp; Architecture
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the foundational abstraction of Scikit-learn. Learn how the unified Estimator interface governs
          hyperparameters vs. learned attributes (trailing <code className="text-indigo-300 font-mono">_</code>), object state transitions,
          and seamless class extensibility.
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
            Estimator State Simulator
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

        {/* TAB 1: INTERACTIVE ESTIMATOR STATE SIMULATOR */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Top Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {estimatorTypes.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedEstimatorIdx(idx);
                    setIsFitted(false);
                    setAttemptedEarlyAccess(false);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedEstimatorIdx === idx
                      ? "bg-indigo-500/15 border-indigo-500/60 shadow-lg shadow-indigo-950/50"
                      : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                    {item.category}
                  </div>
                  <div className="font-semibold text-slate-200 text-sm">{item.name.split(" ")[0]}</div>
                  <div className="text-xs text-slate-400 mt-1 truncate">{item.name.split(" ")[1]}</div>
                </button>
              ))}
            </div>

            {/* Estimator Lifecycle Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Control Panel & Status */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-indigo-400" />
                      Estimator Lifecycle Controls
                    </h3>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-mono font-medium ${
                        isFitted
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {isFitted ? "STATE: FITTED" : "STATE: UNFITTED"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-4">{currentEstimator.statusNote}</p>

                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={handleFit}
                      disabled={isFitting || isFitted}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                        isFitted
                          ? "bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-700/50"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                      }`}
                    >
                      <Play className="w-4 h-4" />
                      {isFitting ? "Executing .fit(X, y)..." : isFitted ? "Model Already Fitted" : "Execute .fit(X, y)"}
                    </button>

                    <button
                      onClick={handleEarlyInspect}
                      className="w-full py-2.5 px-4 rounded-lg font-medium text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center gap-2 transition-all"
                    >
                      <Search className="w-3.5 h-3.5 text-indigo-400" />
                      Try Inspecting Learned Attributes Now
                    </button>

                    <button
                      onClick={handleReset}
                      className="w-full py-2 px-4 rounded-lg font-medium text-xs bg-slate-900 hover:bg-slate-800/50 text-slate-400 border border-slate-800 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Estimator State
                    </button>
                  </div>

                  {attemptedEarlyAccess && !isFitted && (
                    <div className="mt-4 p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-300 text-xs flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-rose-200">sklearn.exceptions.NotFittedError</div>
                        <div className="text-slate-400 mt-0.5">
                          This <code className="text-rose-300 font-mono">{currentEstimator.name.split(" ")[0]}</code> instance is not fitted yet.
                          Call <code className="text-rose-300 font-mono">.fit()</code> with appropriate arguments before using this estimator.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Available Methods */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Interface Methods
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentEstimator.methods.map((method, i) => (
                      <div
                        key={i}
                        className="px-2.5 py-1.5 bg-slate-950/80 rounded border border-slate-800/80 font-mono text-xs text-indigo-300 flex items-center justify-between"
                      >
                        <span>.{method}</span>
                        {isFitted || method.startsWith("fit") ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] text-slate-500">needs fit</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Attribute Inspector (Hyperparameters vs Learned Parameters) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Box className="w-4 h-4 text-indigo-400" />
                    Internal Attribute Inspector
                  </h3>

                  {/* Hyperparameters Section */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Binary className="w-3.5 h-3.5" />
                        1. Hyperparameters (Set at Instantiation - No Trailing Underscore)
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Always Accessible</span>
                    </div>
                    <div className="bg-slate-950/90 rounded-lg p-3 border border-slate-800/90 space-y-2 font-mono text-xs">
                      {Object.entries(currentEstimator.initParams).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between py-1 border-b border-slate-900 last:border-0">
                          <span className="text-amber-300">estimator.{key}</span>
                          <span className="text-slate-300 font-semibold">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learned Attributes Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        2. Learned Attributes (Populated during .fit() - Single Trailing Underscore <code className="text-emerald-300 font-mono">_</code>)
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {isFitted ? "Populated" : "Locked / Unset"}
                      </span>
                    </div>

                    {isFitted ? (
                      <div className="bg-slate-950/90 rounded-lg p-3 border border-emerald-500/30 space-y-2 font-mono text-xs transition-all animate-fadeIn">
                        {Object.entries(currentEstimator.learnedParams).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between py-1.5 border-b border-slate-900 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-semibold">estimator.{key}</span>
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/20">
                                learned
                              </span>
                            </div>
                            <span className="text-indigo-300 font-semibold">{val}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-slate-950/40 rounded-lg p-6 border border-dashed border-slate-800 text-center">
                        <div className="text-slate-500 text-xs font-mono mb-1">
                          No learned parameters available.
                        </div>
                        <div className="text-slate-400 text-xs">
                          Click <strong className="text-indigo-400">"Execute .fit(X, y)"</strong> above to estimate weights &amp; internal statistics.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pedagogy Callout */}
                <div className="p-4 bg-gradient-to-r from-indigo-950/40 to-slate-900/60 border border-indigo-500/20 rounded-xl flex items-start gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white block mb-1">Classroom Rule (Sukanta Hui, Barrackpore):</strong>
                    Whenever you see a single trailing underscore in Scikit-learn (e.g. <code className="text-emerald-300 font-mono">model.coef_</code>, <code className="text-emerald-300 font-mono">scaler.scale_</code>), it is a mathematically estimated parameter extracted from the data, not a user configuration!
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
                Classroom Revision Notes: The Estimator Concept
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
                    Concept Assessment
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Test your grasp of Scikit-learn's estimator rules, trailing underscores, and base classes.
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

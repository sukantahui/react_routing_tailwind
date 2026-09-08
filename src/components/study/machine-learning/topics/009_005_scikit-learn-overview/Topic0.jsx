import React, { useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Layers,
  Cpu,
  Target,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic0_files/01_intro_sklearn_ecosystem.py?raw";
import pyCode2 from "./topic0_files/02_first_classifier_demo.py?raw";
import pyCode3 from "./topic0_files/03_sklearn_architecture.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

const pillars = [
  { id: "classification", title: "1. Classification", desc: "Predict discrete categorical targets (Spam, Disease, Churn)", icon: Target, color: "#38bdf8", algos: ["LogisticRegression", "KNN", "DecisionTree", "RandomForest", "SVC"] },
  { id: "regression", title: "2. Regression", desc: "Predict continuous real-valued targets (Prices, Salaries)", icon: Cpu, color: "#818cf8", algos: ["LinearRegression", "Ridge", "Lasso", "SVR", "GradientBoosting"] },
  { id: "clustering", title: "3. Clustering", desc: "Unsupervised grouping of similar unlabeled observations", icon: Layers, color: "#34d399", algos: ["KMeans", "DBSCAN", "Agglomerative", "Spectral"] },
  { id: "dimensionality", title: "4. Dimensionality", desc: "Feature compression and variance extraction", icon: BrainCircuit, color: "#f472b6", algos: ["PCA", "TruncatedSVD", "FastICA", "t-SNE"] }
];

export default function Topic0() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [activePillar, setActivePillar] = useState(pillars[0]);
  const [kNeighbors, setKNeighbors] = useState(3);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_intro_sklearn_ecosystem.py", code: pyCode1 },
    { name: "02_first_classifier_demo.py", code: pyCode2 },
    { name: "03_sklearn_architecture.py", code: pyCode3 }
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <BrainCircuit className="w-4 h-4" />
                <span>Machine Learning Module • Topic 0</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Introduction to Scikit-Learn
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                The gold standard Machine Learning library in Python. Explore the 6 functional pillars, uniform Estimator API philosophy, and classical ML architecture.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Architecture Studio", icon: Sparkles },
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
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
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
            {/* Pillars Navigator */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Layers className="w-4 h-4" />
                <span>Scikit-Learn Core Pillars</span>
              </div>

              <div className="space-y-2.5">
                {pillars.map((pil) => (
                  <div
                    key={pil.id}
                    onClick={() => setActivePillar(pil)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      activePillar.id === pil.id
                        ? "bg-blue-950/60 border-blue-500 shadow-md"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{pil.title}</span>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pil.color }} />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{pil.desc}</p>
                  </div>
                ))}
              </div>

              {/* K-Neighbors Hyperparameter Slider */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">KNN Estimator Hyperparameter (k):</span>
                  <span className="font-mono text-blue-400">{kNeighbors}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="2"
                  value={kNeighbors}
                  onChange={(e) => setKNeighbors(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Live Sklearn Code Pattern */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-blue-400 font-semibold mb-1"># Universal Sklearn Pattern:</div>
                <div className="text-emerald-400">from sklearn.neighbors import KNeighborsClassifier</div>
                <div className="text-indigo-300">model = KNeighborsClassifier(n_neighbors={kNeighbors})</div>
                <div className="text-slate-400">model.fit(X_train, y_train)</div>
                <div className="text-cyan-300">y_pred = model.predict(X_test)</div>
                <div className="text-amber-300">score = model.score(X_test, y_test)</div>
              </div>
            </div>

            {/* SVG Visual Architecture Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-blue-400" />
                  Live Module Inspection: {activePillar.title}
                </span>
                <span className="text-xs font-mono text-slate-400">sklearn package architecture</span>
              </div>

              {/* SVG Visual Representation */}
              <div className="my-4 p-4 rounded-xl border border-slate-800 bg-slate-950 flex justify-center items-center overflow-x-auto">
                <svg width="490" height="280" viewBox="0 0 490 280" className="max-w-full">
                  {/* Central Estimator Hub */}
                  <rect x="175" y="100" width="140" height="80" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                  <text x="245" y="135" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Estimator API
                  </text>
                  <text x="245" y="155" fill="#93c5fd" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    .fit() &amp; .predict()
                  </text>

                  {/* Incoming Features X */}
                  <path d="M 40 140 L 175 140" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                  <text x="100" y="130" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                    X (Features 2D)
                  </text>

                  {/* Incoming Target y */}
                  <path d="M 245 30 L 245 100" stroke="#f472b6" strokeWidth="2.5" strokeDasharray="4 4" />
                  <text x="245" y="22" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">
                    y (Target 1D)
                  </text>

                  {/* Outgoing Prediction ŷ */}
                  <path d="M 315 140 L 450 140" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="390" y="130" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ŷ (Inference)
                  </text>

                  {/* Bottom Evaluation Score */}
                  <path d="M 245 180 L 245 240" stroke="#fbbf24" strokeWidth="2" />
                  <rect x="175" y="235" width="140" height="32" rx="6" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
                  <text x="245" y="255" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    .score() = 96.5%
                  </text>
                </svg>
              </div>

              {/* Algorithms in this pillar */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-300">
                  Key Classes in <span className="text-blue-400 font-mono">{activePillar.title}</span>:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePillar.algos.map((algo) => (
                    <span
                      key={algo}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 text-blue-300 border border-blue-900/60"
                    >
                      {algo}
                    </span>
                  ))}
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
                        ? "bg-blue-600 text-white shadow"
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
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 0 Summary &amp; Theoretical Notes</span>
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
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 0 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
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
                          btnStyle = "bg-blue-600/30 border-blue-500 text-blue-200";
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
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all"
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

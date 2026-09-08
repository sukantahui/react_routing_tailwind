import React, { useState } from "react";
import {
  Code,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  Activity,
  CheckCircle2,
  Terminal,
  Play,
  Lightbulb,
  FileCode,
  Cpu
} from "lucide-react";

import pyCode1 from "./topic20_files/01_problem1_stratified_split_and_scaling.py?raw";
import pyCode2 from "./topic20_files/02_problem2_classifier_benchmark.py?raw";
import pyCode3 from "./topic20_files/03_problem3_pipeline_and_gridsearch.py?raw";
import noteText from "./topic20_files/topic20_note.txt?raw";
import questions from "./topic20_files/topic20_questions.js";

const practiceProblems = [
  {
    id: 1,
    title: "Problem 1: Leak-Free Preprocessing with StandardScaler & Stratified Split",
    difficulty: "Medium",
    category: "Data Partitioning",
    prompt: "Given a 100-row student dataset with an imbalanced 80/20 target, implement a stratified 75/25 split and scale numerical features without leaking test set statistics into the preprocessor.",
    hint: "Call `scaler.fit_transform(X_train)` on training data, but only `scaler.transform(X_test)` on test data!",
    codeSnippet: `from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=42\n)\n\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test) # Leak free!`
  },
  {
    id: 2,
    title: "Problem 2: Fair 4-Classifier Benchmark with Stratified 5-Fold CV",
    difficulty: "Medium",
    category: "Model Comparison",
    prompt: "Write a clean benchmarking loop evaluating LogisticRegression, KNN (K=5), DecisionTree (depth=3), and GaussianNB on the Iris dataset. Report Mean Accuracy and Standard Deviation.",
    hint: "Use `cross_val_score(model, X, y, cv=StratifiedKFold(5, shuffle=True, random_state=42))`.",
    codeSnippet: `for name, model in models.items():\n    scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')\n    print(f"{name}: {scores.mean()*100:.2f}% (±{scores.std()*100:.2f}%)")`
  },
  {
    id: 3,
    title: "Problem 3: Leak-Free Pipeline with GridSearchCV Hyperparameter Tuning",
    difficulty: "Hard",
    category: "Pipelines & Tuning",
    prompt: "Build an end-to-end Pipeline chaining StandardScaler with Support Vector Classifier (SVC). Search over C=[0.1, 1, 10] and kernel=['linear', 'rbf'] using 5-fold cross-validation.",
    hint: "Remember to use the double underscore syntax in param_grid: `'svc__C': [0.1, 1, 10]`.",
    codeSnippet: `pipe = Pipeline([('scaler', StandardScaler()), ('svc', SVC())])\nparam_grid = {'svc__C': [0.1, 1, 10], 'svc__kernel': ['linear', 'rbf']}\ngrid = GridSearchCV(pipe, param_grid, cv=5)\ngrid.fit(X, y)`
  },
  {
    id: 4,
    title: "Problem 4: Handling Severe Class Imbalance (99:1 Fraud Scenario)",
    difficulty: "Hard",
    category: "Evaluation Metrics",
    prompt: "Evaluate a credit card transaction fraud detector where Fraud occurs in 1% of transactions. Generate Confusion Matrix, Precision, Recall, and F1-Score.",
    hint: "Do not trust `accuracy_score`! Use `classification_report(y_true, y_pred)`.",
    codeSnippet: `from sklearn.metrics import classification_report, confusion_matrix\nprint(confusion_matrix(y_test, y_pred))\nprint(classification_report(y_test, y_pred))`
  }
];

export default function Topic20() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Selected Problem
  const [selectedProbId, setSelectedProbId] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_problem1_stratified_split_and_scaling.py", code: pyCode1 },
    { name: "02_problem2_classifier_benchmark.py", code: pyCode2 },
    { name: "03_problem3_pipeline_and_gridsearch.py", code: pyCode3 }
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

  const currentProb = practiceProblems.find((p) => p.id === selectedProbId) || practiceProblems[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400 border border-purple-500/30">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Topic 20 • Hands-on Lab
              </span>
              <span className="text-xs text-slate-400 font-mono">Coding Practice &amp; Solutions</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Scikit-learn Practice Problems &amp; Coding Challenges
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Solidify your practical engineering skills through hands-on Scikit-learn exercises.
          Practice leak-free preprocessing, multi-model benchmarking loops, pipeline assembly, and GridSearchCV hyperparameter tuning.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Problem Solving Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
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
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
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
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE PRACTICE STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Problem Navigation Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {practiceProblems.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => {
                    setSelectedProbId(prob.id);
                    setShowHint(false);
                    setShowSolution(false);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedProbId === prob.id
                      ? "bg-purple-500/15 border-purple-500/60 shadow-lg shadow-purple-950/50"
                      : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-purple-400">
                      Problem #{prob.id}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        prob.difficulty === "Hard"
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-2">
                    {prob.title.split(": ")[1]}
                  </div>
                </button>
              ))}
            </div>

            {/* Problem Workspace Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                    Category: {currentProb.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Difficulty: {currentProb.difficulty}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{currentProb.title}</h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                  {currentProb.prompt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-700"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  {showHint ? "Hide Pedagogical Hint" : "Reveal Instructor Hint"}
                </button>

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  {showSolution ? "Hide Python Solution" : "Reveal Reference Solution"}
                </button>
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200 leading-relaxed animate-fadeIn">
                  <strong className="block mb-1 text-amber-300">💡 Barrackpore Lab Hint:</strong>
                  {currentProb.hint}
                </div>
              )}

              {/* Solution Code Block */}
              {showSolution && (
                <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden animate-fadeIn">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-400">Python Reference Implementation</span>
                    <button
                      onClick={() => copyCode(currentProb.codeSnippet)}
                      className="text-xs text-slate-400 hover:text-purple-400 flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Snippet</span>
                    </button>
                  </div>
                  <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    {currentProb.codeSnippet}
                  </pre>
                </div>
              )}
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
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-purple-400" />
                Classroom Revision Notes: Practice Problems
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-400"
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
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                    Topic 20 Quiz: Practical Scikit-learn Scenarios
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your understanding of leak-free splits, parallel grid searches, and model stability.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-purple-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono mt-0.5">
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
                            optStyle = "bg-purple-500/20 border-purple-500/50 text-purple-200";
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
                          <strong className="text-purple-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-purple-600/20"
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

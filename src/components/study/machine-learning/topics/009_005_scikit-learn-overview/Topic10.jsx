import React, { useState } from "react";
import {
  GitFork,
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
  TreeDeciduous,
  BarChart3,
  Network
} from "lucide-react";

import pyCode1 from "./topic10_files/01_decision_tree_classifier_basics.py?raw";
import pyCode2 from "./topic10_files/02_tree_pruning_and_hyperparameters.py?raw";
import pyCode3 from "./topic10_files/03_feature_importance_and_tree_export.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

export default function Topic10() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Tree Interactive State
  const [maxDepth, setMaxDepth] = useState(2);
  const [criterion, setCriterion] = useState("gini"); // 'gini' | 'entropy'
  const [queryAttendance, setQueryAttendance] = useState(72);
  const [queryProject, setQueryProject] = useState(1);
  const [queryQuiz, setQueryQuiz] = useState(65);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_decision_tree_classifier_basics.py", code: pyCode1 },
    { name: "02_tree_pruning_and_hyperparameters.py", code: pyCode2 },
    { name: "03_feature_importance_and_tree_export.py", code: pyCode3 }
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

  // Decision Tree Evaluation Logic
  // Root: Attendance <= 60
  // Left: Fail (Class 0)
  // Right: Project == 0 ?
  //   Left Child of Right: Quiz <= 55 ? Fail : Pass
  //   Right Child of Right: Pass (Class 1)
  const isLeftAtRoot = queryAttendance <= 60;
  let finalClass = 0;
  let activeNodePath = ["root"];

  if (isLeftAtRoot) {
    activeNodePath.push("leaf_fail_root");
    finalClass = 0;
  } else {
    activeNodePath.push("node_project");
    if (maxDepth === 1) {
      finalClass = 1;
    } else {
      const isNoProject = queryProject === 0;
      if (isNoProject) {
        activeNodePath.push("node_quiz");
        if (maxDepth === 2) {
          finalClass = 0;
        } else {
          if (queryQuiz <= 55) {
            activeNodePath.push("leaf_quiz_fail");
            finalClass = 0;
          } else {
            activeNodePath.push("leaf_quiz_pass");
            finalClass = 1;
          }
        }
      } else {
        activeNodePath.push("leaf_project_pass");
        finalClass = 1;
      }
    }
  }

  // Feature importances
  const importances = [
    { name: "Attendance %", value: 0.58 },
    { name: "Project Done", value: 0.28 },
    { name: "Prior Quiz Score", value: 0.14 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
            <TreeDeciduous className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Topic 10 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.tree.DecisionTreeClassifier</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Decision Trees &amp; Recursive Binary Splitting
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the transparent white-box model of machine learning. Learn how Gini impurity, information entropy,
          depth regularization, and feature importances drive decision logic.
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
            Tree Architecture Studio
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

        {/* TAB 1: INTERACTIVE TREE STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Sliders & Query */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    Tree Hyperparameters
                  </h3>

                  {/* Max Depth */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>max_depth:</span>
                      <span className="font-mono text-emerald-300 font-bold">{maxDepth}</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((d) => (
                        <button
                          key={d}
                          onClick={() => setMaxDepth(d)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                            maxDepth === d
                              ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                              : "bg-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Depth {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Criterion */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-300 mb-2">criterion:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCriterion("gini")}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-left ${
                          criterion === "gini"
                            ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-200"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="font-semibold">'gini'</div>
                        <div className="text-[10px] text-slate-500">Fast arithmetic</div>
                      </button>

                      <button
                        onClick={() => setCriterion("entropy")}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-left ${
                          criterion === "entropy"
                            ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-200"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="font-semibold">'entropy'</div>
                        <div className="text-[10px] text-slate-500">Information Gain</div>
                      </button>
                    </div>
                  </div>

                  {/* Query Sample Sliders */}
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-3 mb-4">
                    <div className="text-xs font-semibold text-slate-200">
                      Query Student Features (Inference)
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Attendance %:</span>
                        <span className="font-mono text-emerald-300 font-bold">{queryAttendance}%</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="100"
                        value={queryAttendance}
                        onChange={(e) => setQueryAttendance(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Project Completed:</span>
                        <span className="font-mono text-emerald-300 font-bold">
                          {queryProject === 1 ? "Yes (1)" : "No (0)"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setQueryProject(1)}
                          className={`flex-1 py-1 text-xs rounded ${
                            queryProject === 1 ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          Yes (1)
                        </button>
                        <button
                          onClick={() => setQueryProject(0)}
                          className={`flex-1 py-1 text-xs rounded ${
                            queryProject === 0 ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          No (0)
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Prior Quiz Marks:</span>
                        <span className="font-mono text-emerald-300 font-bold">{queryQuiz}</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={queryQuiz}
                        onChange={(e) => setQueryQuiz(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Final Output */}
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Tree Prediction:</span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold font-mono ${
                        finalClass === 1
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {finalClass === 1 ? "Class 1: Pass Exam" : "Class 0: Fail Exam"}
                    </span>
                  </div>
                </div>

                {/* Feature Importance Bar Chart */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                    feature_importances_ (Sum = 1.0)
                  </h4>
                  <div className="space-y-2 font-mono text-xs">
                    {importances.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>{item.name}</span>
                          <span className="text-emerald-300 font-bold">{(item.value * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div
                            style={{ width: `${item.value * 100}%` }}
                            className="bg-emerald-500 h-full rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Tree Diagram */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Network className="w-4 h-4 text-emerald-400" />
                      Live Hierarchical Decision Tree
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Glow indicates active traversal path
                    </span>
                  </div>

                  {/* Visual Node Tree */}
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
                    {/* Level 0: Root */}
                    <div className="flex justify-center">
                      <div
                        className={`p-3 rounded-lg border text-center transition-all ${
                          activeNodePath.includes("root")
                            ? "bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20 text-emerald-200"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="text-xs font-mono font-bold">Attendance &lt;= 60%</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {criterion === "gini" ? "gini = 0.489" : "entropy = 0.985"} | samples = 7
                        </div>
                      </div>
                    </div>

                    {/* Level 1 Split Branch */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left: Fail Leaf */}
                      <div className="flex flex-col items-center">
                        <div className="text-[11px] font-mono text-emerald-400 mb-1">True (&lt;= 60%)</div>
                        <div
                          className={`p-2.5 rounded-lg border text-center w-full max-w-[170px] ${
                            activeNodePath.includes("leaf_fail_root")
                              ? "bg-rose-500/20 border-rose-400 shadow-md shadow-rose-500/20 text-rose-200"
                              : "bg-slate-900 border-slate-800 text-slate-400"
                          }`}
                        >
                          <div className="text-xs font-bold font-mono">Class 0: Fail</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Pure Leaf (gini=0.0)</div>
                        </div>
                      </div>

                      {/* Right: Project Node */}
                      <div className="flex flex-col items-center">
                        <div className="text-[11px] font-mono text-emerald-400 mb-1">False (&gt; 60%)</div>
                        <div
                          className={`p-2.5 rounded-lg border text-center w-full max-w-[170px] ${
                            activeNodePath.includes("node_project")
                              ? "bg-emerald-500/20 border-emerald-400 shadow-md shadow-emerald-500/20 text-emerald-200"
                              : "bg-slate-900 border-slate-800 text-slate-400"
                          }`}
                        >
                          <div className="text-xs font-bold font-mono">
                            {maxDepth >= 2 ? "Project == 0 ?" : "Class 1: Pass"}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {maxDepth >= 2 ? "samples = 5" : "Depth Limit Reached"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Level 2 Sub-branch (Only if maxDepth >= 2) */}
                    {maxDepth >= 2 && (
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900">
                        <div />
                        <div className="grid grid-cols-2 gap-2">
                          <div
                            className={`p-2 rounded border text-center text-xs font-mono ${
                              activeNodePath.includes("node_quiz") || activeNodePath.includes("leaf_quiz_fail")
                                ? "bg-rose-500/20 border-rose-400 text-rose-200"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            }`}
                          >
                            <div className="text-[11px] font-bold">Quiz &lt;= 55 ?</div>
                            <div className="text-[9px] text-slate-500">Fail / Review</div>
                          </div>

                          <div
                            className={`p-2 rounded border text-center text-xs font-mono ${
                              activeNodePath.includes("leaf_project_pass")
                                ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            }`}
                          >
                            <div className="text-[11px] font-bold">Class 1: Pass</div>
                            <div className="text-[9px] text-slate-500">Pure Leaf</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pedagogy Callout */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Scale Invariance Note (Barrackpore Lab):</strong>
                  Notice how the thresholds (<code className="text-emerald-300 font-mono">Attendance &lt;= 60</code>, <code className="text-emerald-300 font-mono">Quiz &lt;= 55</code>) depend purely on relative order, NOT magnitude. This is why Decision Trees work flawlessly without StandardScaler or MinMaxScaler!
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
                Classroom Revision Notes: DecisionTreeClassifier
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
                    Topic 10 Quiz: Decision Trees
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Verify your understanding of recursive splits, pruning hyperparameters, and feature importance.
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

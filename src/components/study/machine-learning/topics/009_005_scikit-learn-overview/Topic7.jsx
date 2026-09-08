import React, { useState } from "react";
import {
  Scissors,
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
  Shuffle,
  ShieldCheck,
  CheckCircle2,
  PieChart
} from "lucide-react";

import pyCode1 from "./topic7_files/01_train_test_split_basics.py?raw";
import pyCode2 from "./topic7_files/02_stratified_split_for_imbalanced_classes.py?raw";
import pyCode3 from "./topic7_files/03_train_val_test_three_way_split.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

const samplePool = [
  { id: 1, name: "Debangshu", score: 45, label: "Pass" },
  { id: 2, name: "Susmita", score: 92, label: "Distinction" },
  { id: 3, name: "Swadeep", score: 38, label: "Pass" },
  { id: 4, name: "Tuhina", score: 78, label: "Distinction" },
  { id: 5, name: "Sachin", score: 62, label: "Pass" },
  { id: 6, name: "Mahima", score: 84, label: "Distinction" },
  { id: 7, name: "Abhronila", score: 55, label: "Pass" },
  { id: 8, name: "Rohan", score: 40, label: "Pass" },
  { id: 9, name: "Priya", score: 88, label: "Distinction" },
  { id: 10, name: "Sneha", score: 60, label: "Pass" },
  { id: 11, name: "Ayan", score: 52, label: "Pass" },
  { id: 12, name: "Sourav", score: 48, label: "Pass" }
];

export default function Topic7() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Split Simulator State
  const [testRatio, setTestRatio] = useState(0.25);
  const [useStratify, setUseStratify] = useState(true);
  const [randomSeed, setRandomSeed] = useState(42);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_train_test_split_basics.py", code: pyCode1 },
    { name: "02_stratified_split_for_imbalanced_classes.py", code: pyCode2 },
    { name: "03_train_val_test_three_way_split.py", code: pyCode3 }
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

  // Perform deterministic pseudorandom split
  const total = samplePool.length;
  const testCount = Math.round(total * testRatio);
  const trainCount = total - testCount;

  let trainList = [];
  let testList = [];

  if (useStratify) {
    // Stratified grouping
    const dist = samplePool.filter((p) => p.label === "Distinction");
    const pass = samplePool.filter((p) => p.label === "Pass");

    const testDistCount = Math.round(dist.length * testRatio);
    const testPassCount = testCount - testDistCount;

    // Simple deterministic pseudo-shuffle using seed
    const pseudoShuffle = (arr, seed) => {
      return [...arr].sort((a, b) => ((a.id * seed) % 7) - ((b.id * seed) % 7));
    };

    const shuffDist = pseudoShuffle(dist, randomSeed);
    const shuffPass = pseudoShuffle(pass, randomSeed);

    const testDist = shuffDist.slice(0, testDistCount);
    const trainDist = shuffDist.slice(testDistCount);

    const testPass = shuffPass.slice(0, testPassCount);
    const trainPass = shuffPass.slice(testPassCount);

    testList = [...testDist, ...testPass];
    trainList = [...trainDist, ...trainPass];
  } else {
    // Random split
    const pseudoShuffle = (arr, seed) => {
      return [...arr].sort((a, b) => ((a.id * seed) % 11) - ((b.id * seed) % 11));
    };
    const shuffled = pseudoShuffle(samplePool, randomSeed);
    testList = shuffled.slice(0, testCount);
    trainList = shuffled.slice(testCount);
  }

  // Proportions
  const getDistinctionPct = (list) => {
    if (!list.length) return 0;
    const count = list.filter((x) => x.label === "Distinction").length;
    return (count / list.length) * 100;
  };

  const overallDistPct = getDistinctionPct(samplePool);
  const trainDistPct = getDistinctionPct(trainList);
  const testDistPct = getDistinctionPct(testList);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-rose-500/20 rounded-xl text-rose-400 border border-rose-500/30">
            <Scissors className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Topic 7 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.model_selection.train_test_split</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Dataset Partitioning &amp; Stratification
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master the art of unbiased evaluation. Learn how <code className="text-rose-300 font-mono">train_test_split()</code>,
          random seeding (<code className="text-rose-300 font-mono">random_state</code>), and stratification (<code className="text-rose-300 font-mono">stratify=y</code>)
          safeguard against data leakage and class imbalance starvation.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-rose-400 text-rose-400 bg-rose-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Split Simulator &amp; Stratifier
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-rose-400 text-rose-400 bg-rose-500/10"
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
                ? "border-rose-400 text-rose-400 bg-rose-500/10"
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
                ? "border-rose-400 text-rose-400 bg-rose-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE SPLIT SIMULATOR */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Split Controls Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Test Size Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-2">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-rose-400" />
                      test_size: {Math.round(testRatio * 100)}%
                    </span>
                    <span className="font-mono text-rose-300">
                      Train: {trainCount} | Test: {testCount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="0.50"
                    step="0.05"
                    value={testRatio}
                    onChange={(e) => setTestRatio(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                {/* Stratification Toggle */}
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div>
                    <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      stratify=y
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Preserves exact class proportions
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={useStratify}
                    onChange={(e) => setUseStratify(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-500 bg-slate-900 border-slate-700"
                  />
                </div>

                {/* Random Seed Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRandomSeed((prev) => (prev * 17 + 5) % 999)}
                    className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-rose-400" />
                    Shuffle Seed (random_state={randomSeed})
                  </button>
                </div>
              </div>
            </div>

            {/* Class Proportion Visualizer Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-rose-400" />
                Class Proportions Across Partitions (Distinction vs Pass)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                {/* Overall Dataset */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>1. Overall Pool (12 samples)</span>
                    <span className="text-white font-bold">{overallDistPct.toFixed(1)}% Distinction</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${overallDistPct}%` }}
                      className="bg-amber-400 h-full"
                    />
                    <div
                      style={{ width: `${100 - overallDistPct}%` }}
                      className="bg-sky-500 h-full"
                    />
                  </div>
                </div>

                {/* Training Partition */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>2. X_train ({trainList.length} samples)</span>
                    <span className="text-emerald-400 font-bold">{trainDistPct.toFixed(1)}% Distinction</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${trainDistPct}%` }}
                      className="bg-amber-400 h-full"
                    />
                    <div
                      style={{ width: `${100 - trainDistPct}%` }}
                      className="bg-sky-500 h-full"
                    />
                  </div>
                </div>

                {/* Testing Partition */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>3. X_test ({testList.length} samples)</span>
                    <span className={`font-bold ${useStratify ? "text-emerald-400" : "text-rose-400"}`}>
                      {testDistPct.toFixed(1)}% Distinction
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${testDistPct}%` }}
                      className="bg-amber-400 h-full"
                    />
                    <div
                      style={{ width: `${100 - testDistPct}%` }}
                      className="bg-sky-500 h-full"
                    />
                  </div>
                </div>
              </div>

              {!useStratify && Math.abs(trainDistPct - testDistPct) > 5 && (
                <div className="mt-3 text-xs text-rose-300 font-sans flex items-center gap-2">
                  <span>⚠️ Imbalance Alert: Without stratification, test set class distribution deviates from training set!</span>
                </div>
              )}
            </div>

            {/* Split Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Training Set Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-emerald-300 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    X_train, y_train ({trainList.length} Students)
                  </h3>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">
                    {Math.round((trainList.length / total) * 100)}% of data
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {trainList.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 bg-slate-950 rounded border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-medium text-slate-200">{item.name}</span>
                        <div className="text-[11px] text-slate-400 font-mono">Score: {item.score}</div>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                          item.label === "Distinction"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-sky-500/20 text-sky-300"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testing Set Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-rose-300 text-sm flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    X_test, y_test ({testList.length} Students)
                  </h3>
                  <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded font-mono">
                    {Math.round((testList.length / total) * 100)}% of data
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {testList.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 bg-slate-950 rounded border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-medium text-slate-200">{item.name}</span>
                        <div className="text-[11px] text-slate-400 font-mono">Score: {item.score}</div>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                          item.label === "Distinction"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-sky-500/20 text-sky-300"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
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
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-rose-400" />
                Classroom Revision Notes: train_test_split()
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400"
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
                    <HelpCircle className="w-5 h-5 text-rose-400" />
                    Topic 7 Quiz: Data Partitioning &amp; Splitting
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluate your knowledge of random seeds, stratification, and dataset ratios.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-rose-500/20 border border-rose-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-rose-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono mt-0.5">
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
                            optStyle = "bg-rose-500/20 border-rose-500/50 text-rose-200";
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
                          <strong className="text-rose-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-rose-600/20"
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

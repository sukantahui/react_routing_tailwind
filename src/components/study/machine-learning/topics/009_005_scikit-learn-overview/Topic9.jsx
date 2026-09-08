import React, { useState } from "react";
import {
  Users,
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
  MapPin,
  Crosshair
} from "lucide-react";

import pyCode1 from "./topic9_files/01_knn_classification_basics.py?raw";
import pyCode2 from "./topic9_files/02_finding_optimal_k_and_distance_metrics.py?raw";
import pyCode3 from "./topic9_files/03_scaling_impact_on_knn.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

const trainingPoints = [
  { id: 1, name: "Debangshu", x: 20, y: 30, label: 0 },
  { id: 2, name: "Susmita", x: 35, y: 45, label: 0 },
  { id: 3, name: "Swadeep", x: 25, y: 55, label: 0 },
  { id: 4, name: "Tuhina", x: 45, y: 35, label: 0 },
  { id: 5, name: "Sachin", x: 70, y: 75, label: 1 },
  { id: 6, name: "Mahima", x: 80, y: 85, label: 1 },
  { id: 7, name: "Abhronila", x: 65, y: 90, label: 1 },
  { id: 8, name: "Rohan", x: 85, y: 65, label: 1 },
  { id: 9, name: "Priya", x: 50, y: 60, label: 0 },
  { id: 10, name: "Sneha", x: 60, y: 50, label: 1 }
];

export default function Topic9() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // KNN Studio State
  const [kValue, setKValue] = useState(3);
  const [weightMode, setWeightMode] = useState("uniform"); // 'uniform' | 'distance'
  const [queryX, setQueryX] = useState(55);
  const [queryY, setQueryY] = useState(58);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_knn_classification_basics.py", code: pyCode1 },
    { name: "02_finding_optimal_k_and_distance_metrics.py", code: pyCode2 },
    { name: "03_scaling_impact_on_knn.py", code: pyCode3 }
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

  // Compute Euclidean distances
  const pointsWithDist = trainingPoints.map((p) => {
    const d = Math.sqrt(Math.pow(p.x - queryX, 2) + Math.pow(p.y - queryY, 2));
    return { ...p, dist: d };
  });

  pointsWithDist.sort((a, b) => a.dist - b.dist);
  const kNearest = pointsWithDist.slice(0, kValue);

  // Calculate vote
  let voteClass0 = 0;
  let voteClass1 = 0;

  kNearest.forEach((p) => {
    const weight = weightMode === "distance" ? 1 / (p.dist || 0.001) : 1;
    if (p.label === 0) voteClass0 += weight;
    else voteClass1 += weight;
  });

  const totalVoteWeight = voteClass0 + voteClass1;
  const p0 = totalVoteWeight > 0 ? (voteClass0 / totalVoteWeight) * 100 : 50;
  const p1 = totalVoteWeight > 0 ? (voteClass1 / totalVoteWeight) * 100 : 50;
  const predictedClass = voteClass1 >= voteClass0 ? 1 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Topic 9 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.neighbors.KNeighborsClassifier</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              K-Nearest Neighbors (KNN) Classification
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Explore instance-based lazy learning in 2D space. Interactively adjust <code className="text-amber-300 font-mono">n_neighbors (K)</code>,
          query point coordinates, distance weighting, and visualize voting dynamics in real time.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            KNN Live Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
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
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
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
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE KNN STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Sliders & Voting Tally */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    KNN Hyperparameters &amp; Query
                  </h3>

                  {/* K Value Selector */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>n_neighbors (K):</span>
                      <span className="font-mono text-amber-300 font-bold text-sm">K = {kValue}</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 3, 5, 7, 9].map((k) => (
                        <button
                          key={k}
                          onClick={() => setKValue(k)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                            kValue === k
                              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                              : "bg-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Weight Mode */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-300 mb-2">weights:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setWeightMode("uniform")}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-left ${
                          weightMode === "uniform"
                            ? "bg-amber-500/15 border-amber-500/60 text-amber-200"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="font-semibold">'uniform'</div>
                        <div className="text-[10px] text-slate-500">Equal vote per neighbor</div>
                      </button>

                      <button
                        onClick={() => setWeightMode("distance")}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-left ${
                          weightMode === "distance"
                            ? "bg-amber-500/15 border-amber-500/60 text-amber-200"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="font-semibold">'distance'</div>
                        <div className="text-[10px] text-slate-500">Weight = 1 / distance</div>
                      </button>
                    </div>
                  </div>

                  {/* Query Coordinate Sliders */}
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <Crosshair className="w-3.5 h-3.5 text-amber-400" />
                      Query Sample Position (X_new)
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Feature X (Attendance %):</span>
                        <span className="font-mono text-amber-300 font-bold">{queryX}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={queryX}
                        onChange={(e) => setQueryX(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Feature Y (Exam Marks):</span>
                        <span className="font-mono text-amber-300 font-bold">{queryY}</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="90"
                        value={queryY}
                        onChange={(e) => setQueryY(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Voting Decision Box */}
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Predicted Class:</span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold font-mono ${
                          predictedClass === 1
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                        }`}
                      >
                        {predictedClass === 1 ? "Class 1 (Good Standing)" : "Class 0 (Academic Alert)"}
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>P(Class 0 / Blue):</span>
                        <span className="text-sky-400 font-bold">{p0.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>P(Class 1 / Emerald):</span>
                        <span className="text-emerald-400 font-bold">{p1.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ranked Neighbors List */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Top {kValue} Nearest Neighbors
                  </h4>
                  <div className="space-y-1.5 font-mono text-xs">
                    {kNearest.map((neighbor, idx) => (
                      <div
                        key={neighbor.id}
                        className="p-2 bg-slate-950 rounded border border-slate-800/80 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
                          <span className="text-slate-200 font-sans font-medium">{neighbor.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded ${
                              neighbor.label === 1
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-sky-500/20 text-sky-300"
                            }`}
                          >
                            C{neighbor.label}
                          </span>
                        </div>
                        <span className="text-amber-300 font-semibold">
                          d = {neighbor.dist.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 2D Spatial Canvas */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-400" />
                      2D Geometric Distance Canvas
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      ● Class 0 (Sky) | ● Class 1 (Emerald) | ★ Query (Amber)
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-[320px]">
                      {/* Grid */}
                      <line x1="10" y1="10" x2="10" y2="90" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="10" y1="90" x2="90" y2="90" stroke="#1e293b" strokeWidth="0.5" />

                      {/* Distance Lines from Query to K nearest */}
                      {kNearest.map((neighbor) => (
                        <line
                          key={neighbor.id}
                          x1={queryX}
                          y1={100 - queryY}
                          x2={neighbor.x}
                          y2={100 - neighbor.y}
                          stroke="#f59e0b"
                          strokeWidth="0.8"
                          strokeDasharray="1.5 1.5"
                        />
                      ))}

                      {/* Training Data Points */}
                      {trainingPoints.map((p) => {
                        const isSelected = kNearest.some((k) => k.id === p.id);
                        return (
                          <g key={p.id}>
                            <circle
                              cx={p.x}
                              cy={100 - p.y}
                              r={isSelected ? 2.5 : 1.8}
                              fill={p.label === 1 ? "#10b981" : "#0284c7"}
                              stroke={isSelected ? "#f59e0b" : "none"}
                              strokeWidth={isSelected ? 0.8 : 0}
                            />
                            <text
                              x={p.x + 2}
                              y={100 - p.y + 1}
                              fill="#94a3b8"
                              fontSize="2.5"
                              fontFamily="monospace"
                            >
                              {p.name}
                            </text>
                          </g>
                        );
                      })}

                      {/* Query Point */}
                      <g>
                        <circle
                          cx={queryX}
                          cy={100 - queryY}
                          r="3"
                          fill="#f59e0b"
                          stroke="#fff"
                          strokeWidth="0.8"
                        />
                        <text
                          x={queryX + 3}
                          y={100 - queryY + 1}
                          fill="#fde68a"
                          fontSize="3.2"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          Query ({queryX}, {queryY})
                        </text>
                      </g>
                    </svg>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 text-center">
                    Dashed gold lines highlight the {kValue} nearest neighbors participating in the classification vote.
                  </div>
                </div>

                {/* Key Insight */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Pedagogical Insight:</strong>
                  Notice how moving the query point closer to the cluster of Susmita &amp; Debangshu immediately flips the majority vote to Class 0, while moving near Sachin &amp; Mahima flips the prediction to Class 1. No parametric equation is learned; decisions are made on-the-fly geometrically!
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
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-amber-400" />
                Classroom Revision Notes: KNeighborsClassifier
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400"
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
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    Topic 9 Quiz: KNN Algorithm
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your understanding of lazy learners, distance weighting, and scaling requirements.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-amber-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono mt-0.5">
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
                            optStyle = "bg-amber-500/20 border-amber-500/50 text-amber-200";
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
                          <strong className="text-amber-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-amber-600/20"
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

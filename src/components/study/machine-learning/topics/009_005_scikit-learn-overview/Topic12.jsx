import React, { useState } from "react";
import {
  Boxes,
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
  TrendingDown,
  Target
} from "lucide-react";

import pyCode1 from "./topic12_files/01_kmeans_clustering_basics.py?raw";
import pyCode2 from "./topic12_files/02_elbow_method_and_inertia.py?raw";
import pyCode3 from "./topic12_files/03_kmeans_init_and_scaling_effects.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

const rawPoints = [
  { id: 1, name: "Debangshu", x: 15, y: 25 },
  { id: 2, name: "Susmita", x: 18, y: 30 },
  { id: 3, name: "Swadeep", x: 22, y: 20 },
  { id: 4, name: "Tuhina", x: 75, y: 80 },
  { id: 5, name: "Sachin", x: 82, y: 88 },
  { id: 6, name: "Mahima", x: 88, y: 75 },
  { id: 7, name: "Abhronila", x: 48, y: 52 },
  { id: 8, name: "Rohan", x: 55, y: 48 },
  { id: 9, name: "Priya", x: 50, y: 58 }
];

const clusterColors = ["#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

const inertiaCurve = [
  { k: 1, inertia: 18450 },
  { k: 2, inertia: 7800 },
  { k: 3, inertia: 1420 }, // Elbow!
  { k: 4, inertia: 920 },
  { k: 5, inertia: 650 },
  { k: 6, inertia: 480 }
];

export default function Topic12() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // KMeans Studio State
  const [kClusters, setKClusters] = useState(3);
  const [activeStep, setActiveStep] = useState(2); // 0: Init, 1: Assign, 2: Converged

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_kmeans_clustering_basics.py", code: pyCode1 },
    { name: "02_elbow_method_and_inertia.py", code: pyCode2 },
    { name: "03_kmeans_init_and_scaling_effects.py", code: pyCode3 }
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

  // Seed centroids based on K
  const getCentroids = (k) => {
    if (k === 1) return [{ x: 50, y: 53 }];
    if (k === 2) return [{ x: 25, y: 35 }, { x: 75, y: 75 }];
    if (k === 3) return [{ x: 18.3, y: 25.0 }, { x: 51.0, y: 52.7 }, { x: 81.7, y: 81.0 }];
    if (k === 4) return [{ x: 18.3, y: 25.0 }, { x: 51.0, y: 52.7 }, { x: 75, y: 80 }, { x: 85, y: 82 }];
    return [{ x: 15, y: 25 }, { x: 20, y: 25 }, { x: 51, y: 52 }, { x: 75, y: 80 }, { x: 88, y: 75 }];
  };

  const centroids = getCentroids(kClusters);

  // Assign each point to nearest centroid
  const assignedPoints = rawPoints.map((p) => {
    let bestIdx = 0;
    let bestDist = Infinity;
    centroids.forEach((c, idx) => {
      const d = Math.sqrt(Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2));
      if (d < bestDist) {
        bestDist = d;
        bestIdx = idx;
      }
    });
    return { ...p, cluster: bestIdx, dist: bestDist };
  });

  const activeInertia = inertiaCurve.find((item) => item.k === kClusters)?.inertia || 1200;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
            <Boxes className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Topic 12 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.cluster.KMeans</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              K-Means Clustering &amp; The Elbow Method
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Master unsupervised cluster discovery in Scikit-learn. Understand centroid initialization (<code className="text-amber-300 font-mono">k-means++</code>),
          Within-Cluster Sum of Squares (<code className="text-amber-300 font-mono">inertia_</code>), and identifying optimal cluster counts via the Elbow curve.
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
            Cluster &amp; Elbow Studio
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

        {/* TAB 1: INTERACTIVE CLUSTER STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Sliders & Diagnostics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    KMeans Hyperparameters
                  </h3>

                  {/* K Selector */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Number of Clusters (n_clusters):</span>
                      <span className="font-mono text-amber-300 font-bold text-sm">K = {kClusters}</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((k) => (
                        <button
                          key={k}
                          onClick={() => setKClusters(k)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                            kClusters === k
                              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                              : "bg-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inertia Metric Card */}
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-slate-400 font-sans">
                      <span>Model Inertia (inertia_):</span>
                      <span className="text-amber-400 font-bold text-sm">{activeInertia.toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans">
                      Within-Cluster Sum of Squares. Notice how K=3 reaches the natural inflection plateau!
                    </div>
                  </div>

                  {/* Centroids Table */}
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-slate-300 mb-2">
                      Centroid Coordinates (cluster_centers_):
                    </div>
                    <div className="space-y-1.5 font-mono text-xs">
                      {centroids.map((c, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-slate-950 rounded border border-slate-800 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: clusterColors[idx] }}
                            />
                            <span className="text-slate-300 font-semibold">Centroid #{idx}</span>
                          </div>
                          <span className="text-slate-200">
                            ({c.x.toFixed(1)}, {c.y.toFixed(1)})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Elbow Curve SVG Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                    Elbow Curve (Inertia vs K)
                  </h4>
                  <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-full h-[140px]">
                      {/* Grid */}
                      <line x1="25" y1="10" x2="25" y2="100" stroke="#334155" strokeWidth="0.8" />
                      <line x1="25" y1="100" x2="190" y2="100" stroke="#334155" strokeWidth="0.8" />

                      {/* Elbow Polyline */}
                      {(() => {
                        const pts = inertiaCurve.map((item) => {
                          const px = 25 + ((item.k - 1) / 5) * 160;
                          const py = 100 - (item.inertia / 19000) * 85;
                          return `${px},${py}`;
                        });
                        return (
                          <polyline
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            points={pts.join(" ")}
                          />
                        );
                      })()}

                      {/* Point Dots */}
                      {inertiaCurve.map((item) => {
                        const px = 25 + ((item.k - 1) / 5) * 160;
                        const py = 100 - (item.inertia / 19000) * 85;
                        const isCurrentK = item.k === kClusters;
                        const isElbow = item.k === 3;
                        return (
                          <g key={item.k}>
                            <circle
                              cx={px}
                              cy={py}
                              r={isCurrentK ? 4.5 : 2.5}
                              fill={isCurrentK ? "#10b981" : isElbow ? "#ec4899" : "#f59e0b"}
                              stroke={isCurrentK ? "#fff" : "none"}
                              strokeWidth={1}
                            />
                            <text x={px} y="112" fill="#94a3b8" fontSize="6" textAnchor="middle" fontFamily="monospace">
                              K={item.k}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2 text-center">
                    The sharp elbow bend occurs at <strong className="text-pink-400 font-mono">K = 3</strong>.
                  </div>
                </div>
              </div>

              {/* Right Column: 2D Spatial Scatter Plot */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-400" />
                      2D Cluster Space &amp; Centroid Voronoi Partitions
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      ◆ Centroids | ● Student Samples
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-[320px]">
                      {/* Grid */}
                      <line x1="5" y1="5" x2="5" y2="95" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="5" y1="95" x2="95" y2="95" stroke="#1e293b" strokeWidth="0.5" />

                      {/* Connection lines from samples to their assigned centroid */}
                      {assignedPoints.map((p) => {
                        const c = centroids[p.cluster];
                        return (
                          <line
                            key={p.id}
                            x1={p.x}
                            y1={100 - p.y}
                            x2={c.x}
                            y2={100 - c.y}
                            stroke={clusterColors[p.cluster]}
                            strokeWidth="0.5"
                            strokeDasharray="1.5 1.5"
                            strokeOpacity="0.7"
                          />
                        );
                      })}

                      {/* Samples */}
                      {assignedPoints.map((p) => (
                        <g key={p.id}>
                          <circle
                            cx={p.x}
                            cy={100 - p.y}
                            r="2.2"
                            fill={clusterColors[p.cluster]}
                          />
                          <text
                            x={p.x + 2}
                            y={100 - p.y + 1}
                            fill="#94a3b8"
                            fontSize="2.4"
                            fontFamily="monospace"
                          >
                            {p.name}
                          </text>
                        </g>
                      ))}

                      {/* Centroids */}
                      {centroids.map((c, idx) => (
                        <g key={idx}>
                          <polygon
                            points={`${c.x},${100 - c.y - 3} ${c.x + 3},${100 - c.y} ${c.x},${100 - c.y + 3} ${c.x - 3},${100 - c.y}`}
                            fill={clusterColors[idx]}
                            stroke="#fff"
                            strokeWidth="0.8"
                          />
                          <text
                            x={c.x}
                            y={100 - c.y - 4}
                            fill="#fff"
                            fontSize="3"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            C{idx}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 text-center">
                    Diamonds represent mathematically optimized cluster centroids (<code className="text-amber-300 font-mono">cluster_centers_</code>).
                  </div>
                </div>

                {/* Key takeaway */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Unsupervised Discovery:</strong>
                  K-Means never received any target labels (<code className="text-amber-300 font-mono">y</code>)! It uncovered the 3 student clusters (Foundational, Moderate, Advanced) purely through spatial proximity and coordinate variance minimization.
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
                Classroom Revision Notes: KMeans Clustering
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
                    Topic 12 Quiz: K-Means Clustering
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your mastery of WCSS inertia, k-means++ seeding, and elbow curve analysis.
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

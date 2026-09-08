import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Target,
  Layers,
  Activity,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic12_files/01_worked_example_knn_spatial.py?raw";
import pyCode2 from "./topic12_files/02_matrix_cdist_recommendation.py?raw";
import pyCode3 from "./topic12_files/03_cluster_centroid_distance.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

const trainingPoints = [
  { id: 1, name: "Susmita", x: 2, y: 3, label: 0 },
  { id: 2, name: "Sachin", x: 3, y: 4, label: 0 },
  { id: 3, name: "Abhronila", x: 4, y: 3, label: 0 },
  { id: 4, name: "Debangshu", x: 7, y: 8, label: 1 },
  { id: 5, name: "Swadeep", x: 8, y: 9, label: 1 },
  { id: 6, name: "Mahima", x: 9, y: 8, label: 1 },
  { id: 7, name: "Tuhina", x: 8, y: 7, label: 1 }
];

export default function Topic12() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [testPoint, setTestPoint] = useState({ x: 6, y: 6 });
  const [kVal, setKVal] = useState(3);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_worked_example_knn_spatial.py", code: pyCode1 },
    { name: "02_matrix_cdist_recommendation.py", code: pyCode2 },
    { name: "03_cluster_centroid_distance.py", code: pyCode3 }
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

  // Euclidean distances to all training points
  const computedDistances = trainingPoints
    .map((pt) => {
      const dist = Math.sqrt(Math.pow(pt.x - testPoint.x, 2) + Math.pow(pt.y - testPoint.y, 2));
      return { ...pt, dist };
    })
    .sort((a, b) => a.dist - b.dist);

  const nearestNeighbors = computedDistances.slice(0, kVal);
  const class0Votes = nearestNeighbors.filter((p) => p.label === 0).length;
  const class1Votes = nearestNeighbors.filter((p) => p.label === 1).length;
  const predictedClass = class1Votes >= class0Votes ? 1 : 0;

  // SVG Mapping
  const svgSize = 300;
  const mapCoord = (v) => 25 + v * 25; // 0-10 mapped to 25-275

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Compass className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 12</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Worked Example 2: Euclidean Distance with scipy.spatial
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Implement a complete K-Nearest Neighbors spatial classifier and recommendation engine using <code className="text-emerald-400 font-mono">scipy.spatial.distance.euclidean</code> and <code className="text-emerald-400 font-mono">cdist()</code>.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "KNN Spatial Classifier Studio", icon: Sparkles },
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
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
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
            {/* Query Point Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Target className="w-4 h-4" />
                <span>Test Query Coordinates</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Feature 1 (Study Hours/wk):</span>
                    <span className="font-mono text-emerald-400 font-bold">{testPoint.x}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={testPoint.x}
                    onChange={(e) => setTestPoint({ ...testPoint, x: Number(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Feature 2 (Coding Labs Count):</span>
                    <span className="font-mono text-emerald-400 font-bold">{testPoint.y}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={testPoint.y}
                    onChange={(e) => setTestPoint({ ...testPoint, y: Number(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Nearest Neighbors Count (K):</span>
                    <span className="font-mono text-cyan-400 font-bold">K = {kVal}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 3, 5].map((k) => (
                      <button
                        key={k}
                        onClick={() => setKVal(k)}
                        className={`flex-1 py-1.5 rounded-lg font-mono font-bold transition-all ${
                          kVal === k ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-400"
                        }`}
                      >
                        K = {k}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Majority Vote Result Box */}
              <div
                className={`p-4 rounded-xl border space-y-1 ${
                  predictedClass === 1
                    ? "bg-cyan-950/40 border-cyan-500"
                    : "bg-rose-950/40 border-rose-500"
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Majority Vote Prediction
                </div>
                <div className="text-sm font-bold text-white">
                  {predictedClass === 1 ? "Class 1: High Distinction" : "Class 0: Needs Support"}
                </div>
                <div className="text-xs text-slate-300">
                  Votes: {class1Votes} (Distinction) vs {class0Votes} (Support)
                </div>
              </div>
            </div>

            {/* Spatial Visualizer Canvas */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Compass className="w-4 h-4" />
                  <span>2D Spatial Feature Space &amp; Euclidean Neighbor Links</span>
                </div>
                <span className="text-xs font-mono text-slate-400">Query Point: ({testPoint.x}, {testPoint.y})</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-center">
                <svg viewBox="0 0 300 300" className="w-64 h-64 overflow-visible">
                  {/* Grid Lines */}
                  {[0, 2, 4, 6, 8, 10].map((v) => (
                    <g key={v}>
                      <line x1={mapCoord(v)} y1={mapCoord(0)} x2={mapCoord(v)} y2={mapCoord(10)} stroke="#1e293b" />
                      <line x1={mapCoord(0)} y1={mapCoord(v)} x2={mapCoord(10)} y2={mapCoord(v)} stroke="#1e293b" />
                    </g>
                  ))}

                  {/* Lines to K Nearest Neighbors */}
                  {nearestNeighbors.map((nn) => (
                    <line
                      key={nn.id}
                      x1={mapCoord(testPoint.x)}
                      y1={mapCoord(10 - testPoint.y)}
                      x2={mapCoord(nn.x)}
                      y2={mapCoord(10 - nn.y)}
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  ))}

                  {/* Training Points */}
                  {trainingPoints.map((pt) => (
                    <circle
                      key={pt.id}
                      cx={mapCoord(pt.x)}
                      cy={mapCoord(10 - pt.y)}
                      r="6"
                      fill={pt.label === 1 ? "#38bdf8" : "#f43f5e"}
                    />
                  ))}

                  {/* Test Point (Yellow/White Star) */}
                  <circle
                    cx={mapCoord(testPoint.x)}
                    cy={mapCoord(10 - testPoint.y)}
                    r="8"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Neighbor Distance Table */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300">Top {kVal} Nearest Neighbors (Ranked):</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {nearestNeighbors.map((nn, idx) => (
                    <div key={nn.id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs space-y-0.5">
                      <div className="flex justify-between font-bold text-white">
                        <span>#{idx + 1} {nn.name}</span>
                        <span className="font-mono text-emerald-400">{nn.dist.toFixed(2)}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {nn.label === 1 ? "🟦 Class 1 (Distinction)" : "🟥 Class 0 (Support)"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((script, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {script.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
              <pre>{scripts[selectedScript].code}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Classroom Printable Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Notes"}</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Quiz */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Validation &amp; Knowledge Check</span>
              </div>
              {submittedQuiz && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300";
                        if (selected === optIdx) {
                          btnClass = "bg-emerald-950 border-emerald-500 text-white";
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnClass = "bg-emerald-900/80 border-emerald-500 text-white font-semibold";
                          } else if (selected === optIdx && selected !== q.correctAnswer) {
                            btnClass = "bg-rose-950 border-rose-500 text-rose-200";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-emerald-400">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSubmittedQuiz(!submittedQuiz)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                {submittedQuiz ? "Reset Quiz" : "Submit Answers"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Move,
  Layers,
  Activity,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic8_files/01_distance_metrics_overview.py?raw";
import pyCode2 from "./topic8_files/02_pairwise_distances_cdist_pdist.py?raw";
import pyCode3 from "./topic8_files/03_kdtree_fast_nearest_neighbors.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

export default function Topic8() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls (Point A and Point B coordinates)
  const [ax, setAx] = useState(2);
  const [ay, setAy] = useState(3);
  const [bx, setBx] = useState(8);
  const [by, setBy] = useState(9);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_distance_metrics_overview.py", code: pyCode1 },
    { name: "02_pairwise_distances_cdist_pdist.py", code: pyCode2 },
    { name: "03_kdtree_fast_nearest_neighbors.py", code: pyCode3 }
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

  // Distance calculations
  const dx = Math.abs(bx - ax);
  const dy = Math.abs(by - ay);

  const euclidean = Math.sqrt(dx * dx + dy * dy);
  const manhattan = dx + dy;
  const chebyshev = Math.max(dx, dy);
  const minkowski3 = Math.pow(Math.pow(dx, 3) + Math.pow(dy, 3), 1 / 3);

  // Cosine distance
  const dotProduct = ax * bx + ay * by;
  const normA = Math.sqrt(ax * ax + ay * ay);
  const normB = Math.sqrt(bx * bx + by * by);
  const cosineDist = normA > 0 && normB > 0 ? 1 - dotProduct / (normA * normB) : 0;

  // SVG dimensions
  const svgSize = 300;
  const scale = 25; // 10 units = 250px
  const offsetX = 25;
  const offsetY = 275;

  const mapX = (val) => offsetX + val * scale;
  const mapY = (val) => offsetY - val * scale;

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
                <span>Machine Learning Module 009_006 • Topic 8</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                scipy.spatial: Distance Metrics
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master geometric and vector distances in Machine Learning. Compare Euclidean ($L_2$), Manhattan ($L_1$), Chebyshev, and Cosine distance, alongside batch <code className="text-emerald-400 font-mono">cdist()</code> and <code className="text-emerald-400 font-mono">KDTree</code>.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Spatial Distance Explorer Studio", icon: Sparkles },
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
            {/* Coordinates Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Move className="w-4 h-4" />
                <span>Feature Coordinate Controls</span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Point A */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Point A (u)</span>
                    <span className="font-mono text-emerald-300">({ax}, {ay})</span>
                  </div>
                  <div>
                    <span className="text-slate-400">X-coord: {ax}</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={ax}
                      onChange={(e) => setAx(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400">Y-coord: {ay}</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={ay}
                      onChange={(e) => setAy(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                {/* Point B */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">Point B (v)</span>
                    <span className="font-mono text-cyan-300">({bx}, {by})</span>
                  </div>
                  <div>
                    <span className="text-slate-400">X-coord: {bx}</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={bx}
                      onChange={(e) => setBx(Number(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400">Y-coord: {by}</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={by}
                      onChange={(e) => setBy(Number(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Canvas & Distance Table */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Compass className="w-4 h-4" />
                  <span>2D Coordinate Distance Canvas</span>
                </div>
                <span className="text-xs font-mono text-slate-400">Δx = {dx}, Δy = {dy}</span>
              </div>

              {/* Coordinate Grid SVG */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-center">
                <svg viewBox="0 0 300 300" className="w-64 h-64 overflow-visible">
                  {/* Grid Lines */}
                  {[0, 2, 4, 6, 8, 10].map((val) => (
                    <g key={val}>
                      <line
                        x1={mapX(val)}
                        y1={mapY(0)}
                        x2={mapX(val)}
                        y2={mapY(10)}
                        stroke="#1e293b"
                        strokeWidth="1"
                      />
                      <line
                        x1={mapX(0)}
                        y1={mapY(val)}
                        x2={mapX(10)}
                        y2={mapY(val)}
                        stroke="#1e293b"
                        strokeWidth="1"
                      />
                    </g>
                  ))}

                  {/* Manhattan L1 Grid Step Path (Orange) */}
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    points={`${mapX(ax)},${mapY(ay)} ${mapX(bx)},${mapY(ay)} ${mapX(bx)},${mapY(by)}`}
                  />

                  {/* Euclidean L2 Direct Vector Line (Emerald) */}
                  <line
                    x1={mapX(ax)}
                    y1={mapY(ay)}
                    x2={mapX(bx)}
                    y2={mapY(by)}
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />

                  {/* Point A Node */}
                  <circle cx={mapX(ax)} cy={mapY(ay)} r="6" fill="#10b981" />
                  <text x={mapX(ax) - 15} y={mapY(ay) - 8} fill="#10b981" fontSize="11" fontWeight="bold">
                    A
                  </text>

                  {/* Point B Node */}
                  <circle cx={mapX(bx)} cy={mapY(by)} r="6" fill="#38bdf8" />
                  <text x={mapX(bx) + 8} y={mapY(by) + 4} fill="#38bdf8" fontSize="11" fontWeight="bold">
                    B
                  </text>
                </svg>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Euclidean (L2)</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{euclidean.toFixed(3)}</div>
                  <span className="text-[10px] text-slate-500">Direct distance</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Manhattan (L1)</span>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">{manhattan.toFixed(3)}</div>
                  <span className="text-[10px] text-slate-500">Grid step sum</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Chebyshev (L∞)</span>
                  <div className="text-lg font-bold text-teal-400 font-mono mt-0.5">{chebyshev.toFixed(3)}</div>
                  <span className="text-[10px] text-slate-500">Max coordinate delta</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Cosine Distance</span>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">{cosineDist.toFixed(4)}</div>
                  <span className="text-[10px] text-slate-500">1 - Cosine similarity</span>
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

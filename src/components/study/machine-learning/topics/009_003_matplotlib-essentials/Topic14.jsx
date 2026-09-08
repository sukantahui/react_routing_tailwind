import React, { useState } from "react";
import {
  Crosshair,
  Terminal,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  Code,
  Box
} from "lucide-react";
import pyCode1 from "./topic14_files/01_multiclass_eda_scatter_matrix.py?raw";
import pyCode2 from "./topic14_files/02_decision_boundary_contour_scatter.py?raw";
import pyCode3 from "./topic14_files/03_pca_feature_projection_scatter.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

export default function Topic14() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Studio Mode
  const [edaMode, setEdaMode] = useState("iris"); // "iris", "boundary", "pca"

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_multiclass_eda_scatter_matrix.py", code: pyCode1, desc: "2D Multi-class feature separation, cluster boundaries, and separator lines (Iris dataset)" },
    2: { name: "02_decision_boundary_contour_scatter.py", code: pyCode2, desc: "Decision boundary visualization using np.meshgrid, ax.contourf, and overlaid scatter points" },
    3: { name: "03_pca_feature_projection_scatter.py", code: pyCode3, desc: "High-dimensional feature space reduction using PCA with explained variance metadata" }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionSelect = (qId, optionIdx) => {
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
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-pink-900/40 via-rose-900/30 to-indigo-900/40 border border-pink-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 14: Worked Example 3 — Feature Scatter &amp; Decision Boundaries
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              End-to-end practical machine learning case study. Explore pairwise continuous feature separations (Iris EDA), generate non-linear classifier decision boundaries with <code className="text-pink-300 font-mono">ax.contourf</code> and <code className="text-pink-300 font-mono">np.meshgrid</code>, and project 30-dimensional clinical datasets onto 2D PCA manifolds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5" /> Case Study 03
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" /> Decision Contours &amp; PCA
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-pink-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "When teaching Support Vector Machines (SVM) and Random Forests to Susmita and Debangshu, mathematical loss formulas alone don't build intuition. Generating 2D meshgrid contours with <code className="text-pink-300 font-mono">ax.contourf()</code> lets students visually watch how non-linear kernels bend decision boundaries around complex clusters!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Feature & Boundary Studio", icon: Crosshair },
            { id: "lab", label: "Python Code Lab (3 Scripts)", icon: Terminal },
            { id: "notes", label: "Revision Notes", icon: FileText },
            { id: "quiz", label: "MCQ Assessment", icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px rounded-t-lg ${
                  activeTab === tab.id
                    ? "border-pink-500 text-pink-400 bg-pink-950/30"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: STUDIO */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="text-pink-400 w-5 h-5" />
                  Machine Learning EDA Scenarios
                </h2>

                <div className="space-y-2.5">
                  {[
                    { id: "iris", title: "1. Iris 2D Feature Space EDA", desc: "Petal Length vs Width showing Setosa linear separation" },
                    { id: "boundary", title: "2. Non-Linear Decision Contour", desc: "np.meshgrid + ax.contourf circular decision boundary" },
                    { id: "pca", title: "3. PCA 2D Manifold Projection", desc: "30-Feature Breast Cancer dataset reduced to 2D" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setEdaMode(item.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition ${
                        edaMode === item.id
                          ? "border-pink-500 bg-pink-950/60 text-pink-200 ring-1 ring-pink-500 shadow-md"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-semibold text-white text-xs">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-pink-300 block mb-1">Key Takeaway:</strong>
                  {edaMode === "iris" && "Setosa (green) has petal length < 2.5cm, forming a 100% linearly separable cluster."}
                  {edaMode === "boundary" && "The red dashed line at contour level 0.5 marks the exact mathematical decision threshold between class 0 and 1."}
                  {edaMode === "pca" && "PC1 (64.2%) and PC2 (21.8%) together preserve 86.0% of the entire 30-dimensional variance."}
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-pink-400" />
                      Live Feature Space Visualizer
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-pink-300 border border-slate-800 uppercase">
                      Scenario: {edaMode}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    {edaMode === "iris" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="50" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="50" y1="200" x2="490" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {/* Linear Separator Threshold */}
                        <line x1="160" y1="20" x2="160" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
                        <text x="155" y="35" fill="#ef4444" fontSize="8" textAnchor="end">Setosa Linear Boundary</text>

                        {/* Setosa Cluster (Green, bottom-left) */}
                        {[
                          { x: 75, y: 185 }, { x: 90, y: 175 }, { x: 105, y: 180 }, { x: 120, y: 170 }, { x: 135, y: 182 }
                        ].map((p, idx) => (
                          <circle key={`s-${idx}`} cx={p.x} cy={p.y} r="5" fill="#10b981" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        {/* Versicolor Cluster (Blue, middle) */}
                        {[
                          { x: 230, y: 130 }, { x: 250, y: 115 }, { x: 270, y: 125 }, { x: 290, y: 110 }, { x: 310, y: 120 }
                        ].map((p, idx) => (
                          <rect key={`v-${idx}`} x={p.x - 4} y={p.y - 4} width="8" height="8" fill="#0284c7" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        {/* Virginica Cluster (Pink, top-right) */}
                        {[
                          { x: 360, y: 80 }, { x: 385, y: 65 }, { x: 410, y: 75 }, { x: 435, y: 55 }, { x: 460, y: 65 }
                        ].map((p, idx) => (
                          <polygon key={`vg-${idx}`} points={`${p.x},${p.y-5} ${p.x-5},${p.y+4} ${p.x+5},${p.y+4}`} fill="#ec4899" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        {/* Legend */}
                        <g transform="translate(320, 140)">
                          <rect x="0" y="0" width="160" height="50" fill="#0f172a" rx="4" stroke="#334155" />
                          <circle cx="15" cy="12" r="4" fill="#10b981" />
                          <text x="25" y="15" fill="#cbd5e1" fontSize="8">Setosa (Class 0)</text>
                          <rect x="11" y="22" width="7" height="7" fill="#0284c7" />
                          <text x="25" y="28" fill="#cbd5e1" fontSize="8">Versicolor (Class 1)</text>
                          <polygon points="15,35 11,43 19,43" fill="#ec4899" />
                          <text x="25" y="42" fill="#cbd5e1" fontSize="8">Virginica (Class 2)</text>
                        </g>

                        <text x="270" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Petal Length (cm)
                        </text>
                        <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">
                          Petal Width (cm)
                        </text>
                      </svg>
                    )}

                    {edaMode === "boundary" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {/* Background filled circular region */}
                        <circle cx="260" cy="125" r="75" fill="#3b82f6" opacity="0.25" />
                        <circle cx="260" cy="125" r="75" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,5" />
                        
                        {/* Inside points (Blue Class 1) */}
                        {[
                          { x: 240, y: 110 }, { x: 265, y: 130 }, { x: 280, y: 105 }, { x: 235, y: 145 }, { x: 270, y: 150 }
                        ].map((p, idx) => (
                          <circle key={`in-${idx}`} cx={p.x} cy={p.y} r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        {/* Outside points (Red Class 0) */}
                        {[
                          { x: 140, y: 60 }, { x: 380, y: 60 }, { x: 130, y: 190 }, { x: 390, y: 180 }, { x: 430, y: 120 }
                        ].map((p, idx) => (
                          <rect key={`out-${idx}`} x={p.x-4} y={p.y-4} width="8" height="8" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        <text x="260" y="235" fill="#94a3b8" fontSize="10" textAnchor="middle">Feature X1</text>
                        <text x="20" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 125)">Feature X2</text>
                      </svg>
                    )}

                    {edaMode === "pca" && (
                      <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                        {[50, 100, 150, 200].map((y) => (
                          <line key={y} x1="50" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        ))}
                        <line x1="50" y1="200" x2="490" y2="200" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                        {/* Benign (Green) */}
                        {[
                          { x: 120, y: 90 }, { x: 140, y: 110 }, { x: 160, y: 80 }, { x: 180, y: 120 }, { x: 200, y: 100 }
                        ].map((p, idx) => (
                          <circle key={`b-${idx}`} cx={p.x} cy={p.y} r="5" fill="#10b981" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        {/* Malignant (Red) */}
                        {[
                          { x: 330, y: 140 }, { x: 350, y: 160 }, { x: 370, y: 130 }, { x: 390, y: 170 }, { x: 410, y: 150 }
                        ].map((p, idx) => (
                          <polygon key={`m-${idx}`} points={`${p.x},${p.y-5} ${p.x-5},${p.y+4} ${p.x+5},${p.y+4}`} fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
                        ))}

                        {/* Metadata Box */}
                        <rect x="70" y="25" width="200" height="40" fill="#0f172a" rx="4" stroke="#334155" />
                        <text x="80" y="40" fill="#f8fafc" fontSize="8.5" fontWeight="bold">PC1: 64.2% | PC2: 21.8% Variance</text>
                        <text x="80" y="55" fill="#10b981" fontSize="8">Preserved Total Info: 86.0%</text>

                        <text x="270" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">Principal Component 1 (64.2%)</text>
                        <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">Principal Component 2 (21.8%)</text>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-pink-400" />
                    Python Matplotlib Code:
                  </div>
                  <pre className="text-pink-300">
{edaMode === "iris"
  ? `ax.scatter(setosa_x, setosa_y, color='#10b981', label='Setosa')\nax.scatter(versi_x, versi_y, color='#0284c7', label='Versicolor')\nax.scatter(virg_x, virg_y, color='#ec4899', label='Virginica')\nax.axvline(2.5, color='r', linestyle='--', label='Setosa Boundary')\nax.legend()`
  : edaMode === "boundary"
  ? `ax.contourf(xx, yy, zz, levels=1, cmap='coolwarm', alpha=0.3)\nax.contour(xx, yy, zz, levels=[0.5], colors='red', linewidths=2.5)\nax.scatter(x1, x2, c=y_labels, cmap='coolwarm', edgecolors='black')`
  : `ax.scatter(pc1_benign, pc2_benign, color='#10b981', label='Benign')\nax.scatter(pc1_malignant, pc2_malignant, color='#f43f5e', label='Malignant')\nax.set_aspect('equal')`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "lab" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Terminal className="text-pink-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore Iris EDA scatter, classifier decision boundary contours, and PCA projections.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-pink-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Script 0{num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-pink-400">{scripts[activeScript].name}</span>
                <p className="text-xs text-slate-300 mt-0.5">{scripts[activeScript].desc}</p>
              </div>
              <button
                onClick={() => copyCode(scripts[activeScript].code)}
                className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[500px]">
                {scripts[activeScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION NOTES */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-pink-400 w-5 h-5" />
                Case Study 3: Feature Space &amp; Decision Boundary Notes
              </h2>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {noteText}
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="text-pink-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of decision boundaries, contour plots, and PCA projections.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-pink-950 border border-pink-500/40 text-pink-300 text-sm font-bold">
                  Score: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, qIndex) => (
                <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-semibold text-white mb-3">
                    {qIndex + 1}. {q.question}
                  </h3>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedAnswers[q.id] === optIndex;
                      const isCorrect = q.correctAnswer === optIndex;
                      let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700";

                      if (showResults) {
                        if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
                        else if (isSelected && !isCorrect) btnStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                      } else if (isSelected) {
                        btnStyle = "border-pink-500 bg-pink-950/50 text-pink-200 ring-1 ring-pink-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => !showResults && handleOptionSelect(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-lg text-xs border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-400">
                      <strong className="text-pink-300">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                Reset
              </button>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-pink-600 text-white hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-pink-600/30"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

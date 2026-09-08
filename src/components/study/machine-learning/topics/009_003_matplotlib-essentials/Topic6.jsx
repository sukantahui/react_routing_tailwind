import React, { useState } from "react";
import {
  Maximize,
  Terminal,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  Code
} from "lucide-react";
import pyCode1 from "./topic6_files/01_scatter_plots_and_marker_properties.py?raw";
import pyCode2 from "./topic6_files/02_multiclass_decision_boundaries_scatter.py?raw";
import pyCode3 from "./topic6_files/03_handling_overplotting_alpha_and_hexbin.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

export default function Topic6() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Scatter Studio State
  const [datasetType, setDatasetType] = useState("regression"); // "regression" | "clusters"
  const [alpha, setAlpha] = useState(0.8);
  const [pointScale, setPointScale] = useState(6);
  const [enableSizeDim, setEnableSizeDim] = useState(true);
  const [enableColorDim, setEnableColorDim] = useState(true);
  const [showTrendline, setShowTrendline] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_scatter_plots_and_marker_properties.py", code: pyCode1, desc: "4D visualization mapping features to X, Y, Size (s), Color (c), and Colorbars" },
    2: { name: "02_multiclass_decision_boundaries_scatter.py", code: pyCode2, desc: "Classification clusters and OLS regression trendline fitting with np.polyfit" },
    3: { name: "03_handling_overplotting_alpha_and_hexbin.py", code: pyCode3, desc: "Overplotting solutions: transparency alpha tuning and 2D hexbinning" }
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

  // Synthetic housing regression data points
  const regressionPoints = [
    { x: 80, y: 175, beds: 1, dist: 30, color: "#3b82f6" },
    { x: 120, y: 160, beds: 2, dist: 25, color: "#06b6d4" },
    { x: 150, y: 140, beds: 2, dist: 20, color: "#10b981" },
    { x: 190, y: 130, beds: 3, dist: 18, color: "#10b981" },
    { x: 230, y: 110, beds: 3, dist: 15, color: "#84cc16" },
    { x: 270, y: 105, beds: 4, dist: 12, color: "#eab308" },
    { x: 310, y: 85, beds: 4, dist: 10, color: "#f97316" },
    { x: 360, y: 70, beds: 5, dist: 6, color: "#ef4444" },
    { x: 410, y: 55, beds: 5, dist: 4, color: "#ec4899" },
    { x: 450, y: 45, beds: 6, dist: 2, color: "#a855f7" },
    // Slight variance
    { x: 160, y: 155, beds: 1, dist: 28, color: "#3b82f6" },
    { x: 210, y: 125, beds: 2, dist: 22, color: "#06b6d4" },
    { x: 290, y: 95, beds: 3, dist: 14, color: "#84cc16" },
    { x: 390, y: 65, beds: 4, dist: 8, color: "#f97316" }
  ];

  // Synthetic cluster data
  const clusterPoints = [
    // Cohort 0 (Budget)
    { x: 90, y: 160, cluster: 0, color: "#10b981", shape: "circle" },
    { x: 110, y: 175, cluster: 0, color: "#10b981", shape: "circle" },
    { x: 130, y: 150, cluster: 0, color: "#10b981", shape: "circle" },
    { x: 100, y: 140, cluster: 0, color: "#10b981", shape: "circle" },
    // Cohort 1 (Premium)
    { x: 380, y: 60, cluster: 1, color: "#6366f1", shape: "triangle" },
    { x: 410, y: 80, cluster: 1, color: "#6366f1", shape: "triangle" },
    { x: 440, y: 50, cluster: 1, color: "#6366f1", shape: "triangle" },
    { x: 390, y: 95, cluster: 1, color: "#6366f1", shape: "triangle" },
    // Cohort 2 (Tech-Savvy)
    { x: 230, y: 70, cluster: 2, color: "#f59e0b", shape: "square" },
    { x: 250, y: 90, cluster: 2, color: "#f59e0b", shape: "square" },
    { x: 270, y: 60, cluster: 2, color: "#f59e0b", shape: "square" },
    { x: 240, y: 110, cluster: 2, color: "#f59e0b", shape: "square" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-rose-900/40 border border-amber-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 6: Scatter Plot with plt.scatter()
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Discover correlations, feature interactions, and cluster boundaries in continuous spaces. Master 4-dimensional visual mapping (X, Y, Size <code className="text-amber-300 font-mono">s</code>, Color <code className="text-amber-300 font-mono">c</code>), colorbars, regression trendlines, and overplotting solutions like 2D <code className="text-amber-300 font-mono">hexbin</code>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5" /> 4D Scatter Mapping
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Trendline &amp; Clustering
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-amber-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "When Sachin and Swadeep examined the Barrackpore real estate dataset, a simple 2D plot of SqFt vs Price missed the whole story. By encoding <code className="text-amber-300">Bedrooms</code> into marker size <code className="text-amber-300 font-mono">s=df['beds']*25</code> and <code className="text-amber-300">Distance_to_Metro</code> into color <code className="text-amber-300 font-mono">c=df['metro_dist']</code> with a colormap, they spotted non-linear luxury clusters immediately!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Scatter Studio", icon: Maximize },
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
                    ? "border-amber-500 text-amber-400 bg-amber-950/30"
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
                  <Sliders className="text-amber-400 w-5 h-5" />
                  Scatter Dimension Mapping
                </h2>

                {/* Dataset selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Dataset Scenario
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDatasetType("regression")}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition ${
                        datasetType === "regression"
                          ? "border-amber-500 bg-amber-950/60 text-amber-300 ring-1 ring-amber-500"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      Housing Regression (4D)
                    </button>
                    <button
                      onClick={() => setDatasetType("clusters")}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition ${
                        datasetType === "clusters"
                          ? "border-amber-500 bg-amber-950/60 text-amber-300 ring-1 ring-amber-500"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      K-Means 3 Clusters
                    </button>
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Opacity (alpha)</span>
                      <span className="text-amber-400 font-mono">{alpha}</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1.0"
                      step="0.1"
                      value={alpha}
                      onChange={(e) => setAlpha(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Base Marker Size</span>
                      <span className="text-amber-400 font-mono">{pointScale} pt</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="10"
                      step="1"
                      value={pointScale}
                      onChange={(e) => setPointScale(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>

                {/* Feature Toggles for Regression */}
                {datasetType === "regression" ? (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-xs text-slate-300">3rd Dim: Size by Bedrooms (s=...)</span>
                      <button
                        onClick={() => setEnableSizeDim(!enableSizeDim)}
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
                          enableSizeDim ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {enableSizeDim ? "ON" : "OFF"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-xs text-slate-300">4th Dim: Color by Metro Dist (c=...)</span>
                      <button
                        onClick={() => setEnableColorDim(!enableColorDim)}
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
                          enableColorDim ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {enableColorDim ? "ON" : "OFF"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-xs text-slate-300">OLS Regression Trendline</span>
                      <button
                        onClick={() => setShowTrendline(!showTrendline)}
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
                          showTrendline ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {showTrendline ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                    Cluster scenario renders 3 distinct cohorts with differentiated geometric marker shapes (circles, squares, triangles) and cluster centroid colors.
                  </div>
                )}
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-400" />
                      Live Scatter Canvas
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-300 border border-slate-800 capitalize">
                      {datasetType === "regression" ? "4D Feature Exploration" : "3-Class Clustered Space"}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 520 250" className="w-full max-w-lg h-56">
                      {[50, 100, 150, 200].map((y) => (
                        <line key={y} x1="50" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                      ))}
                      <line x1="50" y1="200" x2="480" y2="200" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="1.5" />

                      {datasetType === "regression" ? (
                        <>
                          {/* OLS Trendline */}
                          {showTrendline && (
                            <line
                              x1="70"
                              y1="180"
                              x2="460"
                              y2="40"
                              stroke="#ef4444"
                              strokeWidth="2.5"
                              strokeDasharray="5,5"
                            />
                          )}

                          {/* Scatter Points */}
                          {regressionPoints.map((p, idx) => {
                            const radius = enableSizeDim ? pointScale + p.beds * 2 : pointScale + 2;
                            const fill = enableColorDim ? p.color : "#38bdf8";
                            return (
                              <circle
                                key={idx}
                                cx={p.x}
                                cy={p.y}
                                r={radius}
                                fill={fill}
                                opacity={alpha}
                                stroke="#0f172a"
                                strokeWidth="1.2"
                              />
                            );
                          })}

                          {/* Colorbar Indicator */}
                          {enableColorDim && (
                            <g>
                              <defs>
                                <linearGradient id="cbarGrad" x1="0" y1="1" x2="0" y2="0">
                                  <stop offset="0%" stopColor="#3b82f6" />
                                  <stop offset="50%" stopColor="#10b981" />
                                  <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                              </defs>
                              <rect x="475" y="40" width="10" height="150" fill="url(#cbarGrad)" rx="2" stroke="#334155" />
                              <text x="495" y="45" fill="#cbd5e1" fontSize="8">Near (2km)</text>
                              <text x="495" y="190" fill="#cbd5e1" fontSize="8">Far (30km)</text>
                            </g>
                          )}

                          <text x="265" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                            Square Footage (sq ft)
                          </text>
                          <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">
                            Price (Lakh INR)
                          </text>
                        </>
                      ) : (
                        <>
                          {/* Cluster points */}
                          {clusterPoints.map((p, idx) => {
                            const size = pointScale + 4;
                            if (p.shape === "square") {
                              return (
                                <rect
                                  key={idx}
                                  x={p.x - size / 2}
                                  y={p.y - size / 2}
                                  width={size}
                                  height={size}
                                  fill={p.color}
                                  opacity={alpha}
                                  stroke="#0f172a"
                                  strokeWidth="1.2"
                                />
                              );
                            } else if (p.shape === "triangle") {
                              return (
                                <polygon
                                  key={idx}
                                  points={`${p.x},${p.y - size} ${p.x - size},${p.y + size / 2} ${p.x + size},${p.y + size / 2}`}
                                  fill={p.color}
                                  opacity={alpha}
                                  stroke="#0f172a"
                                  strokeWidth="1.2"
                                />
                              );
                            } else {
                              return (
                                <circle
                                  key={idx}
                                  cx={p.x}
                                  cy={p.y}
                                  r={size / 2}
                                  fill={p.color}
                                  opacity={alpha}
                                  stroke="#0f172a"
                                  strokeWidth="1.2"
                                />
                              );
                            }
                          })}

                          {/* Legend */}
                          <g>
                            <rect x="330" y="25" width="145" height="60" fill="#0f172a" rx="4" stroke="#334155" />
                            <circle cx="345" cy="38" r="4" fill="#10b981" />
                            <text x="358" y="41" fill="#cbd5e1" fontSize="9">Cohort 0 (Budget)</text>
                            <polygon points="345,48 341,56 349,56" fill="#6366f1" />
                            <text x="358" y="55" fill="#cbd5e1" fontSize="9">Cohort 1 (Premium)</text>
                            <rect x="341" y="62" width="8" height="8" fill="#f59e0b" />
                            <text x="358" y="69" fill="#cbd5e1" fontSize="9">Cohort 2 (Tech)</text>
                          </g>

                          <text x="265" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                            Feature 1: Spending Score
                          </text>
                          <text x="20" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 110)">
                            Feature 2: Engagement Frequency
                          </text>
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Generated Python Code */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-amber-400" />
                    Python Matplotlib Code:
                  </div>
                  <pre className="text-amber-300">
{datasetType === "regression"
  ? `scatter = ax.scatter(sqft, price, s=${enableSizeDim ? "bedrooms * 25" : "50"}, c=${enableColorDim ? "dist_to_metro" : "'#38bdf8'"}, cmap='viridis', alpha=${alpha})
${enableColorDim ? "cbar = fig.colorbar(scatter, ax=ax); cbar.set_label('Distance to Metro (km)')\n" : ""}${showTrendline ? "slope, intercept = np.polyfit(sqft, price, 1)\nax.plot(sqft, slope*sqft + intercept, 'r--', label='OLS Fit')\n" : ""}ax.legend()`
  : `ax.scatter(c0[:,0], c0[:,1], color='#10b981', marker='o', label='Cohort 0', alpha=${alpha})
ax.scatter(c1[:,0], c1[:,1], color='#6366f1', marker='^', label='Cohort 1', alpha=${alpha})
ax.scatter(c2[:,0], c2[:,1], color='#f59e0b', marker='s', label='Cohort 2', alpha=${alpha})
ax.legend()`}
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
                  <Terminal className="text-amber-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore 4D multi-feature mapping, regression overlays, and hexbin overplotting solutions.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-amber-600 text-white shadow-md"
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
                <span className="text-xs font-mono text-amber-400">{scripts[activeScript].name}</span>
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
                <FileText className="text-amber-400 w-5 h-5" />
                Scatter Plot Technical Reference Notes
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
                  <HelpCircle className="text-amber-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of multi-dimensional scatter mapping, colorbars, and hexbinning.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-300 text-sm font-bold">
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
                        btnStyle = "border-amber-500 bg-amber-950/50 text-amber-200 ring-1 ring-amber-500";
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
                      <strong className="text-amber-300">Explanation:</strong> {q.explanation}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-amber-600 text-white hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-amber-600/30"
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

import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic15_files/01_basic_aggregations_and_multi_agg.py?raw";
import pyCode2 from "./topic15_files/02_dictionary_and_named_aggregations.py?raw";
import pyCode3 from "./topic15_files/03_custom_udf_and_quantile_aggregations.py?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_basic_aggregations_and_multi_agg.py",
    title: "1. Global & Multi-Metric .agg() Lists",
    badge: ".agg(['mean', 'std'])",
    code: pyCode1,
    summary: "Compute global numeric summaries and multi-metric statistical reductions on single and multiple columns using list expressions.",
  },
  {
    id: "part2",
    fileName: "02_dictionary_and_named_aggregations.py",
    title: "2. Dictionary Mapping & Named Aggregations",
    badge: "Named Aggregations",
    code: pyCode2,
    summary: "Master column-specific dictionary mapping and modernize pipelines with Named Aggregation to eliminate clumsy MultiIndex headers.",
  },
  {
    id: "part3",
    fileName: "03_custom_udf_and_quantile_aggregations.py",
    title: "3. Custom Functions & Quantile Aggregations",
    badge: "UDFs & Quantiles",
    code: pyCode3,
    summary: "Build domain-specific summary functions (IQR, Score Spread) and evaluate precise percentiles (.quantile(0.90)) across cohorts.",
  },
];

const RAW_STUDENT_DATA = [
  { id: 101, name: "Debangshu", dept: "Computer Science", math: 85, sci: 90 },
  { id: 102, name: "Susmita",   dept: "Computer Science", math: 92, sci: 95 },
  { id: 103, name: "Swadeep",   dept: "Commerce",         math: 65, sci: 70 },
  { id: 104, name: "Tuhina",    dept: "Science",          math: 88, sci: 85 },
  { id: 105, name: "Sachin",    dept: "Commerce",         math: 78, sci: 80 },
  { id: 106, name: "Mahima",    dept: "Computer Science", math: 90, sci: 92 },
  { id: 107, name: "Abhronila", dept: "Science",          math: 84, sci: 88 },
  { id: 108, name: "Debangshu", dept: "Commerce",         math: 80, sci: 82 },
];

const Topic15 = () => {
  const [activeTab, setActiveTab] = useState("agg_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // Selected Metrics State
  const [showMean, setShowMean] = useState(true);
  const [showMedian, setShowMedian] = useState(true);
  const [showStd, setShowStd] = useState(false);
  const [showMinMax, setShowMinMax] = useState(true);
  const [showCount, setShowCount] = useState(true);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const departments = ["Computer Science", "Commerce", "Science"];

  // Statistical calculator helper
  const calcCohortStats = (deptName) => {
    const scores = RAW_STUDENT_DATA.filter((r) => r.dept === deptName).map((r) => r.math);
    const count = scores.length;
    const sum = scores.reduce((a, b) => a + b, 0);
    const mean = (sum / count).toFixed(1);

    const sorted = [...scores].sort((a, b) => a - b);
    const median =
      count % 2 === 1
        ? sorted[Math.floor(count / 2)]
        : ((sorted[count / 2 - 1] + sorted[count / 2]) / 2).toFixed(1);

    const variance = scores.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (count - 1 || 1);
    const std = Math.sqrt(variance).toFixed(2);
    const min = Math.min(...scores);
    const max = Math.max(...scores);

    return { count, mean, median, std, min, max };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Statistical Aggregations
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 15</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Aggregation Functions: sum, mean, count, and .agg()
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Distill massive datasets into actionable summary metrics. Discover how to compute multi-metric statistical reductions, apply column-specific dictionaries, and construct clean flat tables with Named Aggregations.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-emerald-500/20">
                ∑ μ
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("agg_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "agg_studio"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📊 Multi-Metric Aggregation Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: AGGREGATION STUDIO */}
        {activeTab === "agg_studio" && (
          <div className="space-y-6">
            {/* Metric Toggle Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🎛️</span> Select Summary Metrics for .agg([...])
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMean}
                    onChange={(e) => setShowMean(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-xs font-mono text-emerald-300 font-bold">'mean'</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMedian}
                    onChange={(e) => setShowMedian(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-xs font-mono text-emerald-300 font-bold">'median'</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showStd}
                    onChange={(e) => setShowStd(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-xs font-mono text-emerald-300 font-bold">'std' (Dispersion)</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMinMax}
                    onChange={(e) => setShowMinMax(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-xs font-mono text-emerald-300 font-bold">'min', 'max'</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCount}
                    onChange={(e) => setShowCount(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-xs font-mono text-emerald-300 font-bold">'count'</span>
                </label>
              </div>

              {/* Dynamic Code Preview */}
              <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                <span className="text-slate-500"># Generated Named Aggregation Pipeline:</span>
                <pre className="mt-1 text-emerald-400">
{`df.groupby('Department', as_index=False).agg(
${[
  showCount ? "    Total_Students=('StudentID', 'count')" : null,
  showMean ? "    Average_Math=('Math', 'mean')" : null,
  showMedian ? "    Median_Math=('Math', 'median')" : null,
  showStd ? "    StdDev_Math=('Math', 'std')" : null,
  showMinMax ? "    Min_Math=('Math', 'min'),\n    Max_Math=('Math', 'max')" : null,
]
  .filter(Boolean)
  .join(",\n")}
).round(2)`}
                </pre>
              </div>
            </div>

            {/* Aggregated Output Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <h3 className="text-md font-bold text-white flex items-center gap-2 mb-4">
                <span>📊</span> Resulting Summary DataFrame (Math Scores by Department)
              </h3>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                    <th className="p-3 text-emerald-300 font-bold">Department</th>
                    {showCount && <th className="p-3 text-slate-400">Total_Students</th>}
                    {showMean && <th className="p-3 text-cyan-300 font-bold">Average_Math</th>}
                    {showMedian && <th className="p-3 text-teal-300 font-bold">Median_Math</th>}
                    {showStd && <th className="p-3 text-amber-300">StdDev_Math</th>}
                    {showMinMax && <th className="p-3 text-rose-300">Min_Math</th>}
                    {showMinMax && <th className="p-3 text-emerald-300 font-bold">Max_Math</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {departments.map((dept) => {
                    const stats = calcCohortStats(dept);
                    return (
                      <tr key={dept} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 text-white font-sans font-bold">{dept}</td>
                        {showCount && <td className="p-3 text-slate-400">{stats.count}</td>}
                        {showMean && <td className="p-3 text-cyan-300 font-bold">{stats.mean}</td>}
                        {showMedian && <td className="p-3 text-teal-300 font-bold">{stats.median}</td>}
                        {showStd && <td className="p-3 text-amber-300">{stats.std}</td>}
                        {showMinMax && <td className="p-3 text-rose-300">{stats.min}</td>}
                        {showMinMax && <td className="p-3 text-emerald-300 font-bold">{stats.max}</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Named Aggregations vs MultiIndex Clutter"
              text="In legacy Pandas, calling df.groupby().agg({'Math': ['mean', 'max']}) created clumsy MultiIndex columns like ('Math', 'mean') that broke downstream visualization tools. Always adopt modern Named Aggregation: df.groupby().agg(Avg_Math=('Math', 'mean'), Max_Math=('Math', 'max')). This produces clean single-level column headers ready for presentation or model ingestion!"
            />
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "python_code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedScriptId === script.id
                      ? "bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                    {script.badge}
                  </div>
                  <div className="font-bold text-sm text-slate-100">{script.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">{script.summary}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <h3 className="text-md font-bold text-white font-mono">{activeScript.fileName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeScript.summary}</p>
                </div>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === "theory_notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <PlainTextPrint text={noteText} title="Topic 15 Revision Notes: Aggregation Functions" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 15 Knowledge Check: Aggregation Functions" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic15;

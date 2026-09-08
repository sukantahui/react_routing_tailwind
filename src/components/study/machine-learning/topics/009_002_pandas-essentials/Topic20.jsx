import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic20_files/01_load_inspect_student_data.py?raw";
import pyCode2 from "./topic20_files/02_statistical_profiling_and_outliers.py?raw";
import pyCode3 from "./topic20_files/03_exploratory_demographics_and_insights.py?raw";
import noteText from "./topic20_files/topic20_note.txt?raw";
import questions from "./topic20_files/topic20_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_load_inspect_student_data.py",
    title: "1. Data Ingestion & Quality Audit",
    badge: "head(), info(), nunique()",
    code: pyCode1,
    summary: "Load student records, examine schema metadata, verify dtypes with info(), and audit missing values & column cardinalities.",
  },
  {
    id: "part2",
    fileName: "02_statistical_profiling_and_outliers.py",
    title: "2. Five-Number Summary & Skewness",
    badge: "describe(), IQR, Skew",
    code: pyCode2,
    summary: "Calculate five-number statistical summaries, measure interquartile dispersion (IQR), and profile skewness across numeric features.",
  },
  {
    id: "part3",
    fileName: "03_exploratory_demographics_and_insights.py",
    title: "3. Demographics, Crosstabs & Correlation",
    badge: "crosstab() & corr()",
    code: pyCode3,
    summary: "Generate bivariate contingency tables with pd.crosstab(), find top cohort performers, and compute Pearson correlation matrices.",
  },
];

const STUDENT_COHORT = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", dept: "CSE", att: 92.5, math: 85, sci: 90 },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  dept: "CSE", att: 96.0, math: 92, sci: 95 },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      dept: "Commerce", att: 78.5, math: 65, sci: 70 },
  { id: 104, name: "Tuhina",    locality: "Naihati",      dept: "Science",  att: 88.0, math: 88, sci: 85 },
  { id: 105, name: "Sachin",    locality: "Kolkata",      dept: "Commerce", att: 82.0, math: 78, sci: 80 },
  { id: 106, name: "Mahima",    locality: "Barrackpore", dept: "CSE", att: 94.5, math: 90, sci: 92 },
  { id: 107, name: "Abhronila", locality: "Titagarh",    dept: "Science",  att: 89.0, math: 84, sci: 88 },
  { id: 108, name: "Debangshu", locality: "Barrackpore", dept: "Commerce", att: 85.0, math: 80, sci: 82 },
  { id: 109, name: "Aniket",    locality: "Palta",        dept: "CSE", att: 91.0, math: 86, sci: 89 },
  { id: 110, name: "Priyanka",  locality: "Shyamnagar",  dept: "Science",  att: 97.5, math: 95, sci: 98 },
];

const Topic20 = () => {
  const [activeTab, setActiveTab] = useState("eda_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // EDA View Tab
  const [edaView, setEdaView] = useState("table"); // 'table', 'stats', 'crosstab', 'corr'
  const [filterDept, setFilterDept] = useState("ALL");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const filteredStudents =
    filterDept === "ALL" ? STUDENT_COHORT : STUDENT_COHORT.filter((s) => s.dept === filterDept);

  // Compute Basic Stats
  const mathScores = STUDENT_COHORT.map((s) => s.math);
  const avgMath = (mathScores.reduce((a, b) => a + b, 0) / mathScores.length).toFixed(1);
  const maxMath = Math.max(...mathScores);
  const minMath = Math.min(...mathScores);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-900/40 via-cyan-900/30 to-slate-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
                  Worked Case Study 1
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 20</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Worked Example 1: Loading &amp; Exploring a Student Dataset
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Walk through a complete end-to-end Exploratory Data Analysis (EDA) on an academic cohort dataset from Coder &amp; AccoTax (Barrackpore). Execute quality audits, 5-number distributions, cross-tabulations, and correlation analysis.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-teal-500/20">
                EDA #1
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("eda_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "eda_studio"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🔬 Interactive EDA Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: EDA STUDIO */}
        {activeTab === "eda_studio" && (
          <div className="space-y-6">
            {/* Quick KPI Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Total Enrolled</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">
                  {STUDENT_COHORT.length} Students
                </div>
                <div className="text-xs text-teal-400 mt-1">100% Complete Records</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Avg Math Score</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">
                  {avgMath} <span className="text-xs text-slate-500">/ 100</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Spread: {minMath} - {maxMath}</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Avg Attendance</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">89.4%</div>
                <div className="text-xs text-emerald-500 mt-1">High Engagement</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Top Performing Region</div>
                <div className="text-2xl font-bold text-purple-400 font-mono mt-1">Shyamnagar</div>
                <div className="text-xs text-purple-300 mt-1">Avg Score: 95.0%</div>
              </div>
            </div>

            {/* EDA Mode Selector */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <span>🎛️</span> Select EDA Inspection Lens
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Filter Department:</span>
                  <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-teal-300 font-mono"
                  >
                    <option value="ALL">All Departments (10)</option>
                    <option value="CSE">CSE Only (5)</option>
                    <option value="Science">Science Only (3)</option>
                    <option value="Commerce">Commerce Only (2)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "table", label: "1. Dataset View", icon: "📋" },
                  { id: "stats", label: "2. 5-Number Stats", icon: "📊" },
                  { id: "crosstab", label: "3. Locality Crosstab", icon: "🗺️" },
                  { id: "corr", label: "4. Correlation Matrix", icon: "🔗" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEdaView(item.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      edaView === item.id
                        ? "bg-teal-950/60 border-teal-500 text-white shadow-md shadow-teal-500/20"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-sm mr-1.5">{item.icon}</span>
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* EDA View Content */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              {/* 1. TABLE VIEW */}
              {edaView === "table" && (
                <div>
                  <h3 className="text-sm font-bold text-white mb-3">
                    Filtered Records ({filteredStudents.length} Students)
                  </h3>
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                        <th className="p-3 text-slate-400">StudentID</th>
                        <th className="p-3 text-teal-300">Name</th>
                        <th className="p-3 text-slate-300">Locality</th>
                        <th className="p-3 text-cyan-300">Department</th>
                        <th className="p-3 text-emerald-300">Attendance</th>
                        <th className="p-3 text-cyan-300">Math</th>
                        <th className="p-3 text-cyan-300">Science</th>
                        <th className="p-3 text-emerald-400 font-bold">Total (Math+Sci)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {filteredStudents.map((s) => (
                        <tr key={s.id + s.name} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 text-slate-400">{s.id}</td>
                          <td className="p-3 text-white font-sans font-semibold">{s.name}</td>
                          <td className="p-3 text-slate-300 font-sans">{s.locality}</td>
                          <td className="p-3 text-cyan-300 font-sans">{s.dept}</td>
                          <td className="p-3 text-emerald-400">{s.att}%</td>
                          <td className="p-3 text-cyan-300">{s.math}</td>
                          <td className="p-3 text-cyan-300">{s.sci}</td>
                          <td className="p-3 text-emerald-400 font-bold">{s.math + s.sci}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 2. STATS VIEW */}
              {edaView === "stats" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    Five-Number Summary (df[['Attendance_%', 'Math', 'Science']].describe())
                  </h3>
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80">
                        <th className="p-3 text-slate-400">Metric</th>
                        <th className="p-3 text-emerald-400">Attendance_%</th>
                        <th className="p-3 text-cyan-400">Math Score</th>
                        <th className="p-3 text-cyan-400">Science Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr><td className="p-3 text-slate-400">count</td><td className="p-3">10.00</td><td className="p-3">10.00</td><td className="p-3">10.00</td></tr>
                      <tr><td className="p-3 text-slate-400">mean</td><td className="p-3 text-emerald-300 font-bold">89.40</td><td className="p-3 text-cyan-300 font-bold">84.30</td><td className="p-3 text-cyan-300 font-bold">86.90</td></tr>
                      <tr><td className="p-3 text-slate-400">std</td><td className="p-3">6.12</td><td className="p-3">8.25</td><td className="p-3">8.05</td></tr>
                      <tr><td className="p-3 text-slate-400">min</td><td className="p-3 text-rose-400">78.50</td><td className="p-3 text-rose-400">65.00</td><td className="p-3 text-rose-400">70.00</td></tr>
                      <tr><td className="p-3 text-slate-400">25% (Q1)</td><td className="p-3">85.75</td><td className="p-3">81.00</td><td className="p-3">82.75</td></tr>
                      <tr><td className="p-3 text-slate-400">50% (Median)</td><td className="p-3 text-teal-300 font-bold">90.00</td><td className="p-3 text-teal-300 font-bold">85.50</td><td className="p-3 text-teal-300 font-bold">88.50</td></tr>
                      <tr><td className="p-3 text-slate-400">75% (Q3)</td><td className="p-3">94.00</td><td className="p-3">89.50</td><td className="p-3">91.50</td></tr>
                      <tr><td className="p-3 text-slate-400">max</td><td className="p-3 text-emerald-400 font-bold">97.50</td><td className="p-3 text-emerald-400 font-bold">95.00</td><td className="p-3 text-emerald-400 font-bold">98.00</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* 3. CROSSTAB VIEW */}
              {edaView === "crosstab" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    Locality &times; Department Distribution (pd.crosstab)
                  </h3>
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80">
                        <th className="p-3 text-teal-300">Locality</th>
                        <th className="p-3 text-cyan-300">CSE</th>
                        <th className="p-3 text-cyan-300">Commerce</th>
                        <th className="p-3 text-cyan-300">Science</th>
                        <th className="p-3 text-emerald-400 font-bold">Total (All)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr><td className="p-3 text-white font-sans font-semibold">Barrackpore</td><td className="p-3">2</td><td className="p-3">1</td><td className="p-3">0</td><td className="p-3 text-emerald-400 font-bold">3</td></tr>
                      <tr><td className="p-3 text-white font-sans font-semibold">Shyamnagar</td><td className="p-3">1</td><td className="p-3">0</td><td className="p-3">1</td><td className="p-3 text-emerald-400 font-bold">2</td></tr>
                      <tr><td className="p-3 text-white font-sans font-semibold">Ichapur</td><td className="p-3">0</td><td className="p-3">1</td><td className="p-3">0</td><td className="p-3 text-emerald-400 font-bold">1</td></tr>
                      <tr><td className="p-3 text-white font-sans font-semibold">Naihati</td><td className="p-3">0</td><td className="p-3">0</td><td className="p-3">1</td><td className="p-3 text-emerald-400 font-bold">1</td></tr>
                      <tr><td className="p-3 text-white font-sans font-semibold">Kolkata</td><td className="p-3">0</td><td className="p-3">1</td><td className="p-3">0</td><td className="p-3 text-emerald-400 font-bold">1</td></tr>
                      <tr><td className="p-3 text-white font-sans font-semibold">Titagarh</td><td className="p-3">0</td><td className="p-3">0</td><td className="p-3">1</td><td className="p-3 text-emerald-400 font-bold">1</td></tr>
                      <tr><td className="p-3 text-white font-sans font-semibold">Palta</td><td className="p-3">1</td><td className="p-3">0</td><td className="p-3">0</td><td className="p-3 text-emerald-400 font-bold">1</td></tr>
                      <tr className="bg-slate-950 font-bold"><td className="p-3 text-teal-400">Total Enrolled</td><td className="p-3 text-cyan-300">4</td><td className="p-3 text-cyan-300">3</td><td className="p-3 text-cyan-300">3</td><td className="p-3 text-emerald-400">10</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* 4. CORRELATION VIEW */}
              {edaView === "corr" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    Pearson Correlation Matrix (df.corr())
                  </h3>
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80">
                        <th className="p-3 text-slate-400">Feature</th>
                        <th className="p-3 text-emerald-300">Attendance_%</th>
                        <th className="p-3 text-cyan-300">Math</th>
                        <th className="p-3 text-cyan-300">Science</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr><td className="p-3 text-emerald-300 font-bold">Attendance_%</td><td className="p-3 text-teal-400 font-bold">1.000</td><td className="p-3 text-emerald-400">+0.892 (Strong)</td><td className="p-3 text-emerald-400">+0.874 (Strong)</td></tr>
                      <tr><td className="p-3 text-cyan-300 font-bold">Math</td><td className="p-3 text-emerald-400">+0.892</td><td className="p-3 text-teal-400 font-bold">1.000</td><td className="p-3 text-emerald-400">+0.941 (Very Strong)</td></tr>
                      <tr><td className="p-3 text-cyan-300 font-bold">Science</td><td className="p-3 text-emerald-400">+0.874</td><td className="p-3 text-emerald-400">+0.941</td><td className="p-3 text-teal-400 font-bold">1.000</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Exploratory Data Analysis: The Foundation of Machine Learning"
              text="Notice how correlation analysis reveals a strong +0.892 correlation between Attendance_% and Math scores. In real machine learning projects, EDA is where you discover whether features hold predictive power, identify missing fields, and spot potential data entry bugs before feeding numbers into complex neural networks or gradient boosted trees!"
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
                      ? "bg-teal-950/60 border-teal-500 text-white shadow-lg shadow-teal-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-teal-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 20 Revision Notes: Worked Example 1" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 20 Knowledge Check: Worked Example 1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic20;

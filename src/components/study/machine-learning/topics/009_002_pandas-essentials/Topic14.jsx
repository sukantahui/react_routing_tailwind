import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic14_files/01_split_apply_combine_groupby.py?raw";
import pyCode2 from "./topic14_files/02_as_index_and_multi_column_grouping.py?raw";
import pyCode3 from "./topic14_files/03_transform_and_filter_groups.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_split_apply_combine_groupby.py",
    title: "1. Split-Apply-Combine & Group Operations",
    badge: "groupby(), get_group(), size()",
    code: pyCode1,
    summary: "Understand the DataFrameGroupBy lazy object, extract group subsets with .get_group(), iterate over cohorts, and compare size() vs count().",
  },
  {
    id: "part2",
    fileName: "02_as_index_and_multi_column_grouping.py",
    title: "2. Multi-Column Grouping & as_index=False",
    badge: "MultiIndex & as_index=False",
    code: pyCode2,
    summary: "Perform multi-level hierarchical grouping across multiple categorical keys and use as_index=False for SQL-like flat tabular results.",
  },
  {
    id: "part3",
    fileName: "03_transform_and_filter_groups.py",
    title: "3. Advanced Group .transform() & .filter()",
    badge: ".transform() & .filter()",
    code: pyCode3,
    summary: "Broadcast cohort statistics back to full-length DataFrames for ML feature engineering using .transform(), and prune cohorts using .filter().",
  },
];

const STUDENT_COHORT_DATA = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", dept: "Computer Science", math: 85, sci: 90 },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  dept: "Computer Science", math: 92, sci: 95 },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      dept: "Commerce",         math: 65, sci: 70 },
  { id: 104, name: "Tuhina",    locality: "Naihati",      dept: "Science",          math: 88, sci: 85 },
  { id: 105, name: "Sachin",    locality: "Kolkata",      dept: "Commerce",         math: 78, sci: 80 },
  { id: 106, name: "Mahima",    locality: "Barrackpore", dept: "Computer Science", math: 90, sci: 92 },
  { id: 107, name: "Abhronila", locality: "Titagarh",    dept: "Science",          math: 84, sci: 88 },
  { id: 108, name: "Debangshu", locality: "Barrackpore", dept: "Commerce",         math: 80, sci: 82 },
];

const Topic14 = () => {
  const [activeTab, setActiveTab] = useState("groupby_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // Interactive GroupBy State
  const [groupByKey, setGroupByKey] = useState("dept"); // 'dept' or 'locality'
  const [opMode, setOpMode] = useState("agg_mean"); // 'agg_mean', 'agg_sum', 'transform', 'get_group'
  const [selectedGroup, setSelectedGroup] = useState("Computer Science");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Unique groups
  const uniqueKeys = Array.from(new Set(STUDENT_COHORT_DATA.map((r) => r[groupByKey])));

  // Calculate Group Aggregations
  const getAggregatedData = () => {
    return uniqueKeys.map((key) => {
      const cohort = STUDENT_COHORT_DATA.filter((r) => r[groupByKey] === key);
      const count = cohort.length;
      const mathAvg = (cohort.reduce((acc, r) => acc + r.math, 0) / count).toFixed(1);
      const sciAvg = (cohort.reduce((acc, r) => acc + r.sci, 0) / count).toFixed(1);
      const mathSum = cohort.reduce((acc, r) => acc + r.math, 0);
      const sciSum = cohort.reduce((acc, r) => acc + r.sci, 0);

      return {
        groupKey: key,
        count,
        mathAvg: Number(mathAvg),
        sciAvg: Number(sciAvg),
        mathSum,
        sciSum,
      };
    });
  };

  // Calculate Transformed Broadcast Data
  const getTransformedData = () => {
    const aggMap = {};
    uniqueKeys.forEach((key) => {
      const cohort = STUDENT_COHORT_DATA.filter((r) => r[groupByKey] === key);
      aggMap[key] = (cohort.reduce((acc, r) => acc + r.math, 0) / cohort.length).toFixed(1);
    });

    return STUDENT_COHORT_DATA.map((r) => {
      const groupAvg = Number(aggMap[r[groupByKey]]);
      const diff = (r.math - groupAvg).toFixed(1);
      return {
        ...r,
        groupAvg,
        diff,
      };
    });
  };

  const aggResults = getAggregatedData();
  const transformResults = getTransformedData();
  const singleGroupResults = STUDENT_COHORT_DATA.filter((r) => r[groupByKey] === selectedGroup);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  Cohort &amp; Aggregation Engine
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 14</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Grouping Data with groupby() in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Harness the power of the Split-Apply-Combine architecture. Aggregate cohort metrics, isolate specific groups with{" "}
                <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">.get_group()</code>, and engineer group-broadcasted features with{" "}
                <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">.transform()</code>.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-indigo-500/20">
                ☷ G
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("groupby_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "groupby_studio"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧩 Split-Apply-Combine Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: GROUPBY STUDIO */}
        {activeTab === "groupby_studio" && (
          <div className="space-y-6">
            {/* Interactive Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚙️</span> Configure Split-Apply-Combine Parameters
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Group Key Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    1. Grouping Column (df.groupby)
                  </label>
                  <select
                    value={groupByKey}
                    onChange={(e) => {
                      setGroupByKey(e.target.value);
                      setSelectedGroup(
                        e.target.value === "dept" ? "Computer Science" : "Barrackpore"
                      );
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
                  >
                    <option value="dept">Department (3 Cohorts)</option>
                    <option value="locality">Locality (6 Towns)</option>
                  </select>
                </div>

                {/* Operation Mode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    2. Applied Operation
                  </label>
                  <select
                    value={opMode}
                    onChange={(e) => setOpMode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
                  >
                    <option value="agg_mean">Aggregation: .mean() (Collapsed Rows)</option>
                    <option value="agg_sum">Aggregation: .sum() (Total Points)</option>
                    <option value="transform">Transformation: .transform('mean') (Broadcasted)</option>
                    <option value="get_group">Subset Extraction: .get_group()</option>
                  </select>
                </div>

                {/* Specific Group Target for get_group */}
                {opMode === "get_group" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Target Group Key (.get_group)
                    </label>
                    <select
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
                    >
                      {uniqueKeys.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Dynamic Python Code Preview */}
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                <span className="text-slate-500"># Executed Pandas Operation:</span>
                <div className="mt-1">
                  {opMode === "agg_mean" && (
                    <span>{`df.groupby('${groupByKey === "dept" ? "Department" : "Locality"}', as_index=False)[['Math', 'Science']].mean()`}</span>
                  )}
                  {opMode === "agg_sum" && (
                    <span>{`df.groupby('${groupByKey === "dept" ? "Department" : "Locality"}', as_index=False)[['Math', 'Science']].sum()`}</span>
                  )}
                  {opMode === "transform" && (
                    <span className="text-purple-300">{`df['Group_Mean_Math'] = df.groupby('${groupByKey === "dept" ? "Department" : "Locality"}')['Math'].transform('mean')`}</span>
                  )}
                  {opMode === "get_group" && (
                    <span className="text-teal-300">{`df.groupby('${groupByKey === "dept" ? "Department" : "Locality"}').get_group('${selectedGroup}')`}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Results Table Section */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <h3 className="text-md font-bold text-white flex items-center gap-2 mb-4">
                <span>📊</span> Output DataFrame Preview
              </h3>

              {/* AGGREGATION VIEW */}
              {(opMode === "agg_mean" || opMode === "agg_sum") && (
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                      <th className="p-3 text-indigo-300 font-bold">
                        {groupByKey === "dept" ? "Department" : "Locality"}
                      </th>
                      <th className="p-3 text-slate-400">Student Count (.size())</th>
                      <th className="p-3 text-cyan-300 font-bold">
                        {opMode === "agg_mean" ? "Math Mean Score" : "Math Total Score"}
                      </th>
                      <th className="p-3 text-cyan-300 font-bold">
                        {opMode === "agg_mean" ? "Science Mean Score" : "Science Total Score"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {aggResults.map((row) => (
                      <tr key={row.groupKey} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 text-white font-sans font-bold">{row.groupKey}</td>
                        <td className="p-3 text-slate-400">{row.count} students</td>
                        <td className="p-3 text-cyan-300 font-bold">
                          {opMode === "agg_mean" ? row.mathAvg : row.mathSum}
                        </td>
                        <td className="p-3 text-cyan-300 font-bold">
                          {opMode === "agg_mean" ? row.sciAvg : row.sciSum}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TRANSFORM VIEW */}
              {opMode === "transform" && (
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                      <th className="p-3 text-slate-400">StudentID</th>
                      <th className="p-3 text-teal-300">Name</th>
                      <th className="p-3 text-indigo-300 font-bold">
                        {groupByKey === "dept" ? "Department" : "Locality"}
                      </th>
                      <th className="p-3 text-cyan-300">Math Score</th>
                      <th className="p-3 text-purple-300 font-bold bg-purple-950/20">
                        Cohort Group Mean (.transform)
                      </th>
                      <th className="p-3 text-emerald-400 font-bold bg-emerald-950/20">
                        Math - Group Mean (Feature)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {transformResults.map((row) => (
                      <tr key={row.id + row.name} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 text-slate-400">{row.id}</td>
                        <td className="p-3 text-slate-100 font-sans font-semibold">{row.name}</td>
                        <td className="p-3 text-indigo-300 font-sans">{row[groupByKey]}</td>
                        <td className="p-3 text-cyan-300 font-bold">{row.math}</td>
                        <td className="p-3 text-purple-300 font-bold bg-purple-950/10">{row.groupAvg}</td>
                        <td className={`p-3 font-bold bg-emerald-950/10 ${Number(row.diff) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {Number(row.diff) >= 0 ? `+${row.diff}` : row.diff}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* GET_GROUP VIEW */}
              {opMode === "get_group" && (
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                      <th className="p-3 text-slate-400">StudentID</th>
                      <th className="p-3 text-teal-300">Name</th>
                      <th className="p-3 text-indigo-300 font-bold">
                        {groupByKey === "dept" ? "Department" : "Locality"}
                      </th>
                      <th className="p-3 text-cyan-300">Math Score</th>
                      <th className="p-3 text-cyan-300">Science Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {singleGroupResults.map((row) => (
                      <tr key={row.id + row.name} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 text-slate-400">{row.id}</td>
                        <td className="p-3 text-slate-100 font-sans font-semibold">{row.name}</td>
                        <td className="p-3 text-indigo-300 font-sans">{row[groupByKey]}</td>
                        <td className="p-3 text-cyan-300">{row.math}</td>
                        <td className="p-3 text-cyan-300">{row.sci}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Why .transform() is a Game-Changer in Machine Learning"
              text="Most beginners only know df.groupby().mean(), which collapses all rows. But in predictive ML, you need feature engineering on individual rows! With .transform('mean'), Pandas computes cohort statistics and broadcasts them directly across each student row. This lets you calculate deviation features like (Math - Dept_Mean_Math) instantly without cumbersome table joins!"
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
                      ? "bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 14 Revision Notes: Grouping Data with groupby()" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 14 Knowledge Check: Grouping Data with groupby()" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic14;
